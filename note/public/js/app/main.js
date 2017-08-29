var $ = require('jquery');
var Toast = require('./toast.js');
var  waterFall = require('./waterfall.js');
var add = require('./add.js');
var note = require('./note.js');

function reLoad(){
	$.get('/api/notes')
	.done(function(res){
	    if(res.status == 0){
	      $.each(res.data, function(i,e) {
	        new renderNote(e.id, e.text, e.name);  
		    waterFall($('.container'));
		    Toast('加载完成')
			})
	    }else{
		   Toast(res.errorMsg);
		}
	}).fail(function(){
		 Toast('网络异常');
	});

	function renderNote(id, text, name){
		var $newNote = $('.note').eq(0).clone();
		var $username = $('#name').text();
		$newNote.children('.context').attr('contenteditable',"true");
		$newNote.children('span').text('--' + name);
		$newNote.attr('id',id);
		$newNote.children('.context').text(text);
		$newNote.appendTo($('.container'));
		new note($newNote);
	}	
}


$(document).ready(function(){
	waterFall($('.container'));
	reLoad();

	new note($('.note').eq(0));
	new note($('.note').eq(1));
	new note($('.note').eq(2));


	$('#addmore').on('click',function(){
		add();
	});
})



