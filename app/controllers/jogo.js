module.exports.jogo = function(aplication,req,res){
	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	if(req.session.autorizado !== true){
		res.send('Usuário precisa fazer login');
		return;	
	}
	
	var msg = '';
	if(req.query.msg != ''){
		msg = req.query.msg;
	}

	var usuario = req.session.usuario;
	var casa = req.session.casa;

	var connection = aplication.config.dbConnection;
	var JogoDAO = new aplication.app.models.JogoDAO(connection);


	JogoDAO.iniciaJogo(res,usuario,casa,msg);
	
}

module.exports.sair = function(aplication,req,res){
	req.session.destroy(function(erro){
		res.render('index',{validacao:{},dadosForm:{},msg:{}});
	});
}

module.exports.suditos = function(aplication,req,res){
	if(req.session.autorizado !== true){
		res.send('Usuário precisa fazer login');
		return;	
	}
	
	res.render('aldeoes',{validacao:{},dadosForm:{}});
}

module.exports.pergaminhos = function(aplication,req,res){
	if(req.session.autorizado !== true){
		res.send('Usuário precisa fazer login');
		return;	
	}

	//recuperar as acoes inseridas no banco de dados

	var connection = aplication.config.dbConnection;
	var JogoDAO = new aplication.app.models.JogoDAO(connection);

	var usuario = req.session.usuario;

	JogoDAO.getAcoes(usuario,res);

	
}

module.exports.ordernar_acao_sudito = function(aplication,req,res){
	if(req.session.autorizado !== true){
		res.send('Usuário precisa fazer login');
		return;	
	}

	var dadosForm = req.body;

	req.assert('acao','Ação deve ser informada').notEmpty();
	req.assert('quantidade','Quantidade deve ser informada').notEmpty();

	var erro = req.validationErrors();

	if(erro){
		res.redirect('jogo?msg=A'); //A para comando invalido
		return;
	}

	var connection = aplication.config.dbConnection;
	var JogoDAO = new aplication.app.models.JogoDAO(connection);

	dadosForm.usuario = req.session.usuario; //criando chave usuario dentro do Json dadosForm
	JogoDAO.acao(dadosForm);

	res.redirect('jogo?msg=B');  //B para comando com sucesso

}

module.exports.revogar_acao = function(aplication,req,res){
	var url_query = req.query;

	var connection = aplication.config.dbConnection;
	var JogoDAO = new aplication.app.models.JogoDAO(connection);

	var _id = url_query.id_acao;
	JogoDAO.revogarAcao(_id, res);
}

