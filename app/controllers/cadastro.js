module.exports.cadastro = function(aplication,req,res){
	res.render('cadastro',{validacao: {}, dadosForm: {}});
}

module.exports.cadastrar = function(aplication,req,res){

	var dadosForm = req.body;

	req.assert('nome','Nome não pode ser vazio').notEmpty();
	req.assert('usuario','Usuario não pode ser vazio').notEmpty();
	req.assert('senha','Senha não pode ser vazio').notEmpty();
	req.assert('casa','Casa não pode ser vazio').notEmpty();

	var erros = req.validationErrors();

	if(erros){
		res.render('cadastro',{validacao : erros, dadosForm: dadosForm});
		return;
	}

	//recuperando conexão com banco de dados
	var connection = aplication.config.dbConnection;

	var UsuariosDAO = new aplication.app.models.UsuariosDAO(connection);
	var JogoDAO = new aplication.app.models.JogoDAO(connection);

	UsuariosDAO.inserirUsuario(dadosForm);
	JogoDAO.gerarParametros(dadosForm.usuario);
	//geração dos parametros

	res.render('sucesso_cadastro');		

}



