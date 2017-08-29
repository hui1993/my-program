
var Sequelize = require('sequelize');
var path = require('path');

var sequelize = new Sequelize(undefined, undefined, undefined,{
	host: 'localhost',
	dialect:'sqlite',
	storage: path.join(__dirname, '../database/database.sqlite') 
});


var Note = sequelize.define('note', {
  text: {
    type: Sequelize.STRING
  },
  uid: {
    type: Sequelize.STRING
  },
  name:{
  	type: Sequelize.STRING
  }
});

Note.sync()
/*.then(function(){
	Note.create({text:"hello"})
}).then(function(){
	Note.findAll({raw:true}).then(function(notes){
		console.log(notes);//查询是异步的，需要调用then方法
	})	
});*/

module.exports = Note;
