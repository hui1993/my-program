var $ = require('jquery');
var Toast = require('./toast.js');
var  waterFall = require('./waterfall.js');
var note = require('./note.js');

function add(){
	var $newNote = $('.note').eq(0).clone();
	var $username = $('#name').text();
	$newNote.children('.context').attr('contenteditable',"true");
	$newNote.children('.context').text('input here');
	$newNote.children('span').text('--' + $username);
	$.ajax({
	       url:'/api/notes/add',
	       method:'post',
	       data:{
	        note:$newNote.children('.context').text()
	       }}).done(function(res){
	        if(res.status === 0){
				Toast("添加成功");
				$newNote.attr('id',res.id);
				$newNote.appendTo($('.container'));
				new note($newNote);
	        }else{
	        	Toast(res.errorMsg)
	        }
	       }).fail(function(){
				Toast("服务器出错")
	       })
}

module.exports = add;