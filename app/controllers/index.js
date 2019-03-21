module.exports.index = function(aplication,req,res){
	res.render('index',{validacao:{},dadosForm:{},msg:{}});
}
module.exports.autenticar = function(aplication,req,res){


	var dadosForm = req.body;

	req.assert('usuario','Usuário não pode estar vazio!!').notEmpty();
	req.assert('senha','Senha não pode estar vazia!!').notEmpty();

	var erros = req.validationErrors();

	/*
	var msg = '';
	if(req.query.msg != ''){
		msg = req.query.msg;
	}
	*/

	if(erros){
		res.render("index",{validacao:erros,dadosForm:dadosForm,msg:{}});
		return;
	}

	var connection = aplication.config.dbConnection;
	var UsuarioDAO = new aplication.app.models.UsuariosDAO(connection);

	UsuarioDAO.autenticar(dadosForm,req,res);


	//res.send('tudo ok para criar a sessão');
}