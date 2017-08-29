var $ = require('jquery');


function waterFall($ct){

	this.init = function(){
		this.$ct = $ct;
		this.$items = $ct.children();
		this.column = [];
		this.columnWidth = $ct.width();
		this.itemsWidth = $ct.children().outerWidth(true);
	    var length = Math.floor(this.columnWidth/this.itemsWidth);
		$ct.css({width:length*this.itemsWidth})

	    for (var i = 0; i < length; i++) {
	    	this.column[i] = 0;
	    }
	}


	this.render = function($node){
    	var min = this.column[0];
    	var minIndex = 0;
    	for (var k = 0;k<this.column.length;k++){
    		if( min>column[k] ){
    			min = column[k];
    			minIndex = k;
    		}
    	}
    	$node.css({
    		left: this.itemsWidth*minIndex,
        	top: min
    	})
    	this.column[minIndex] += $node.outerHeight(true);
    	var max = Math.max.apply(null,this.column)
    	this.$ct.css({height:max})
    }

	this.init();
	for (var i = 0; i < this.$items.length; i++) {
		this.render(this.$items.eq(i));
	}
};

module.exports = waterFall;