// importar o mongodb
var mongo = require('mongodb');

//Metodo de wrapper colocando numa variavel a função de conexão para evitar Conexões desnecessarias
var connMongoDB = function(){
	//instaciando classe de conexão
	var db = new mongo.Db(
		'got',//nome do banco de dados
		 new mongo.Server(//objeto de conexão com o servidor
		 	'localhost',//string contendo o endereço do servidor
		 	27017,//porta de conexão
		 	{} //objeto com opçoes de configuração do servidor
		 ),
		 {}//configurações opcionais do banco
	);

	return db;
}

module.exports = function(){	
	return connMongoDB;
}