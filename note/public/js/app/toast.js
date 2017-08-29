var $ = require('jquery');


function toast(msg){
  this.msg = msg;
  this.dismissTime = 1000; 


  this.createToast = function(){
    var tpl = '<div class="toast">'+this.msg+'</div>';
    this.$toast = $(tpl);
    $('body').append(this.$toast);  
  },

  this.showToast = function(){
    var self = this;
    this.$toast.fadeIn(300, function(){
      setTimeout(function(){
         self.$toast.fadeOut(300,function(){
           self.$toast.remove();
         });
      }, self.dismissTime);
    })
  }

  this.createToast();
  this.showToast();
}


function Toast(msg){
  new toast(msg);
};


module.exports = Toast;