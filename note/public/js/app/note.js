var $ = require('jquery');
var Toast = require('./toast.js');
var  waterFall = require('./waterfall.js');



function note($note) {


	/*双击钉子删除标签*/
	$note.children('.nail').on('dblclick',function(){
    var noteId = $note.attr('id');
    var note = $note.children('.context').text();
		$.ajax({
      url:'/api/notes/delete',
      method:'post',
      data:{note:note,id:noteId}
      }).done(function(res){
        if(res.status === 0){
          $note.fadeOut('slow',function(){
            console.log("删除");
            $note.remove();
            waterFall($('.container'));
          })
        }else{
          Toast(res.errorMsg)
        }
      }).fail(function(){
        Toast("服务器出错");
      })
	})

	/*鼠标按住钉子拖动标签*/
/*	$note.children('.nail').on('mousedown', function(e){
      var evtX = e.pageX - $note.offset().left,   //evtX 计算事件的触发点在 dialog内部到 dialog 的左边缘的距离
          evtY = e.pageY - $note.offset().top;
      $note.addClass('draggable').data('evtPos', {x:evtX, y:evtY}); //把事件到 dialog 边缘的距离保存下来
    }).on('mouseup', function(){
       $note.removeClass('draggable').removeData('pos');
    });

    $('body').on('mousemove', function(e){
      $('.draggable').length && $('.draggable').offset({
        top: e.pageY-$('.draggable').data('evtPos').y,    // 当用户鼠标移动时，根据鼠标的位置和前面保存的距离，计算 dialog 的绝对位置
        left: e.pageX-$('.draggable').data('evtPos').x
      });
      waterFall($('.container'));
    });*/

    /*修改标签内容*/
    var $context = $note.children('.context')
    $context.on('focus', function() {
      $context.data('before', $context.text());
      $context.text('');
    }).on('blur paste', function() {
      var noteId = $note.attr('id');
      var note = $context.text();
      console.log(noteId,note)
      if(!$context.text()){
        $context.text($context.data('before'));
        return;
      };
      if( $context.data('before') != $context.text() ) {
        $.ajax({
            url:'/api/notes/edit',
            method:'post',
            data:{note:note,id:noteId}
            }).done(function(res){
              if (res.status === 0) {
                Toast("修改成功");
                waterFall($('.container'));
              }else{
                Toast(res.errorMsg);
                $context.text($context.data('before'));
              }
            }).fail(function(){
                Toast("网络连接有问题");
                $context.text($context.data('before'));
            })
      }else{
        Toast("重复的话，你要写两遍吗？")
      }
    });
};


module.exports = note;