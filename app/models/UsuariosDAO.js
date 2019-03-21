// importar o modulo do crypto

var crypto = require('crypto');

function UsuarioDAO(connection){
	this._connection = connection();
}

UsuarioDAO.prototype.inserirUsuario = function(usuario){
	this._connection.open(function(erro, mongoclient){//objeto do lado cliente que  vai manipular o banco de dados
		mongoclient.collection("usuarios",function(erro, collection){
			
			//setando o algoritmo utilizado
			var senha_criptografada = crypto.createHash("md5").update(usuario.senha).digest("hex");//tipo de retorno da função digest

			//sobreescrevendo senha
			usuario.senha = senha_criptografada;

			collection.insert(usuario);

			mongoclient.close();
		});
	});
}

UsuarioDAO.prototype.autenticar = function(usuario, req, res){
	this._connection.open(function(erro, mongoclient){//objeto do lado cliente que  vai manipular o banco de dados
		mongoclient.collection("usuarios",function(erro, collection){
			
			var senha_criptografada = crypto.createHash("md5").update(usuario.senha).digest("hex");//tipo de retorno da função digest
			usuario.senha = senha_criptografada;
			
			collection.find(usuario).toArray(function(erro,result){//recupera o cursor gerado por find e retorna um array atraves da function

				if(result[0] != undefined){
					//criando variaveis de sessão
					req.session.autorizado = true;
					req.session.usuario = result[0].usuario;
					req.session.casa = result[0].casa;
				}else {
				    req.session.autorizado = false;
				    req.session.usuario = undefined;
				    req.session.casa = undefined;
				}

				if(req.session.autorizado){
					res.redirect('jogo');
				} else{
					var msg = 'A';
					res.render('index',{validacao: {},dadosForm: usuario,msg : msg}); //erro de usuario ou senha
				}

			});
			mongoclient.close();
		});
	});
}

module.exports = function(){
	return UsuarioDAO;
}