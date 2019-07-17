var mysql = require('mysql');
const db_config = require('../../db-config');

var DatabaseManager = {

    //Table Model
    connection : null,
    emotionResultModel: null,

    //Init DatabaseManager
    init: function(){
		
		var self = this;
		
        // Connection to our chat database
        console.log("Connecting mariaDB ");

        self.connection = mysql.createConnection({
            host    : db_config.host,
            port    : db_config.port,
            user    : db_config.user,
            password : db_config.password,
            database : db_config.database,
        });

        self.connection.connect(function(err) {
            if (err) {
                console.error('mysql connection error');
                console.error(err);
                throw err;
            }else
            {
                console.log("mysql connection success");
                self.setupSchema();
            }
        });
    },

    setupSchema : function(){

        this.emotionResultModelo = require('./model/emotionResultModel').init(this.connection);
    }

}

module["exports"] = DatabaseManager;