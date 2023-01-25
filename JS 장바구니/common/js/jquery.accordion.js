/**
* Title : Vertical Accordion
* Version : v1.0
* Description :
*
* i_width : 이미지 한개의 너비
* width : 레이어 너비
* height : 레이어 높이
* speed : 애니메이션 속도
* delay : 애니메이션 딜레이 시간
* start : 시작 시 on 이 적용될 상자(최초로 보여짐, 0부터 시작)
**/

(function($){
	$.fn.accordion_ad = function(o){
		o = $.extend({
			i_width : 250,
			width : 300,
			height : 60,
			speed : 500,
			delay : 2000,
			start : 0
		}, o || {});

		return this.each(function(){
			var e = $(this);
			var len = e.find('ul li').length-1;
			if(o.start > len) o.start = 0;
			var no = o.start;
			var h_width = (o.width - o.i_width) / len;
			var pause = false;
			var ani = function(num){
				for(i = 1; i <= len; i++){
					if(i > num)e.find('ul li:eq('+i+')').animate({'left' : h_width*(i-1)+o.i_width}, o.speed, 'linear');
					else e.find('ul li:eq('+i+')').animate({'left' : h_width*i}, o.speed, 'linear');
					
					if(i== num){
						e.find('ul li:eq('+num+') .bn_off').hide();
						e.find('ul li:eq('+num+') .bn_on').show();
					}
					else{
						e.find('ul li:eq('+i+') .bn_on').hide();
						e.find('ul li:eq('+i+') .bn_off').show();
					}

				}
				e.find('ul li.on').removeClass('on');
				e.find('ul li:eq('+num+')').addClass('on');
				no = num + 1;
				if(no > len) no = 0;
			}

			e.find('ul').css({'width' : o.width, 'overflow' : 'hidden', 'position' : 'relative', 'height' : o.height});
			e.find('ul li').each(function(i){
				 $(this).css({'position' : 'absolute' , 'overflow' : 'hidden', 'width' : o.i_width, 'height' : o.height});
				if(i > o.start) $(this).css({'position' : 'absolute', 'left' : h_width*(i-1)+o.i_width});
				else $(this).css({'position' : 'absolute', 'left' : h_width*i});
				e.find('ul li:eq('+o.start+')').addClass('on');
			});
			//return;
			e.find('ul li').each(function(i){
				$(this).click(function(){
					pause = true;
					if(e.find(':animated').length == 0 && !$(this).hasClass('on')){
						ani(i);
					}
				}).mouseleave(function(){pause = false;});
			});
			//setInterval(function(){ if(pause == false) ani(no); },o.delay);
		});
	}
})(jQuery);
