// CLASS TOGGLE 
function fnToggle(targetId, tabId) {
	var stat = $("#"+targetId).css('display');

	if (stat == 'none'){
		 if ( $("#"+tabId)[0] ) {$("#"+tabId)[0].className = $("#"+tabId)[0].className.replace("off", "on");}
		 if( navigator.userAgent.indexOf("MSIE 7.0") != -1 && $("#"+targetId).get(0).tagName == "TR" ){
			$("#"+targetId+","+"#"+targetId+" td"+","+"#"+targetId+" td").show();
		 }else{
			$("#"+targetId).show(); 
		 }
		
    }else{
		if ( $("#"+tabId)[0] ) {$("#"+tabId)[0].className = $("#"+tabId)[0].className.replace("on", "off");}
		
		if( navigator.userAgent.indexOf("MSIE 7.0") != -1 && $("#"+targetId).get(0).tagName == "TR" ){
			$("#"+targetId+","+"#"+targetId+" td"+","+"#"+targetId+" td").hide();
		}else{
			$("#"+targetId).hide();
		}
    }
}

var _target = null;
function fnToggle_evt(targetId, tabId) {
	if(_target != null){
		if(_target.target != targetId){
			fnToggle(_target.target, _target.tab);
			_target = {target : targetId,tab : tabId};
		}else{_target = null;}
	}else{_target = {target : targetId,tab : tabId};}
	fnToggle(targetId, tabId);
}

function classToggle(targetId) {
	$("#"+targetId).toggleClass('on');
}


function fnToggleImg(tabId, targetId){
    var stat = $("#"+targetId).css('display');

	if (stat == 'none'){
		$("#"+targetId).show();

		$("#"+tabId).attr("src", $("#"+tabId).attr("src").replace("_off", "_on"));
    }else{
		$("#"+targetId).hide();
        $("#"+tabId).attr("src", $("#"+tabId).attr("src").replace("_on", "_off"));
    }
}


// CATEGORY MENU
var _stat = null;
function fnToggleCatg(targetId, tabId){
	var stat = $("#"+targetId).height();

	if(_stat == null){
		$("#"+targetId).css('height', 'auto');
		$("#"+tabId).attr("src", $("#"+tabId).attr("src").replace("_off", "_on"));
		_stat = 'y';
	}else{
		$("#"+targetId).css('height', '80px'); 
        $("#"+tabId).attr("src", $("#"+tabId).attr("src").replace("_on", "_off"));
		_stat = null;
	}
}

/** SIDE CART */
jQuery(function($){
	$(".cart_fix_btn a.bt_open").click(function() {
		$(".cart_fix").animate({right:0}, 300);
		$(".cart_fix_btn").animate({right:75}, 300);
		$(".cart_fix .lately .dt .pos").css("width","100%");
		return false;
	});
	$(".cart_fix .close").click(function() {
		$(".cart_fix").animate({right:-120}, 300);
		$(".cart_fix_btn").animate({right:11}, 300);
		$(".cart_fix .lately .dt .pos").css("width","93px");
		return false;
	});	
});

// MAIN MENU
jQuery(function($){
	var vMenu = $('.m_menu');
	var vList = vMenu.find('ul>li');	
	var vSubCnt;

	//Show
	function show_vMenu(){
		vList.removeClass('active');
		vList.find('div.m_bn').fadeOut(300);
		vList.find('div.m_sub').hide();
		vMenu.find('div.m_evt').fadeOut(300);

		$(this).parent('li').addClass('active');
		$(this).parent('li').find('div.m_bn').fadeIn(300);
		$(this).parent('li').find('div.m_sub').show("slide", 100);

		vSubCnt = $(this).parent('li').find('div.m_sub dd').size();
		if(vSubCnt > 6){$(".s_bn").hide();}
		else{$(".s_bn").show();}
	}
	//Hide
	function hide_vMenu(){
		vList.removeClass('active');
		vList.find('div.m_bn').fadeOut();
		vList.find('div.m_sub').hide();
		vMenu.find('div.m_evt').fadeIn(300);
	}

	vList.find('>a').mouseover(show_vMenu).focus(show_vMenu);
	vMenu.mouseleave(hide_vMenu);
	vList.find('div.m_menu').mouseleave(hide_vMenu);	
});

// CATG MENU
jQuery(function($){
	var cMenu = $('div.cmenu');
	var cList = cMenu.find('>ul>li');
	var cList2 = cMenu.find('>ul>li>div.sub>ul>li');
	var cHeight = cMenu.height();
	var aHeight = 545;
	if(cMenu.parent().attr('class') == 'main_vi'){aHeight = 456;}

	//Show
	function show_cMenu(){
		ct = $(this);
		cList.removeClass('active');
		ct.parent('li').addClass('active');
		cs = ct.parent('li').find('>div.sub');
		cList.find('>div.sub').removeClass('scroll');

		// position set
		if(cs.height() >  aHeight){
			cs.css('top', -(ct.offset().top - cMenu.offset().top));
			cs.addClass('scroll').css({height:480,'overflow':'hidden','overflow-y':'scroll'});
		}
		else{
			var sPos = aHeight + cMenu.offset().top - ct.parent('li').offset().top;
			if(sPos < cs.height()){
				cs.css('top',  sPos - cs.height() - 40);
			}
		}
	}

	function show_cMenu2(){	
		ct = $(this);
		cList2.removeClass('active');
		ct.parent('li').addClass('active');
	}

	//Hide
	function hide_cMenu(){
		cList.removeClass('active');
		cList2.removeClass('active');
		cList.find('>div.sub').removeClass('scroll');
	}

	cList.find('>a').mouseover(show_cMenu).focus(show_cMenu);
	cList2.find('>a').mouseover(show_cMenu2).focus(show_cMenu2);

	cMenu.mouseleave(hide_cMenu);
	cList.find('div.sub>ul>ul').mouseleave(hide_cMenu);
});

// PNG24
function setPng24(obj) {
	obj.width=obj.height=1;
	obj.className=obj.className.replace(/\bpng24\b/i,''); 
	obj.style.filter =
	"progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+ obj.src +"',sizingMethod='image');"
	obj.src='about:blank;';
	return '';
}

// TAB CLASS
function fnTab(tabSize, tabId, idx, targetId) {
	
    for ( var i = 0; i < tabSize; i++ ) {
        if ( i == idx ) {
            $("#"+tabId+i)[0].className = $("#"+tabId+i)[0].className.replace("off", "on");
            if ( $("#"+targetId+i) ) { $("#"+targetId+i).show(); }
        }else{
            $("#"+tabId+i)[0].className = $("#"+tabId+i)[0].className.replace("on", "off");
            if ( $("#"+targetId+i) ) { $("#"+targetId+i).hide(); }
        }
    }
    
    if(typeof addImpression == 'function') {
    	addImpression($("#"+targetId+idx)); 	
    }
}

// TAB IMG
function fnTabImg(tabSize, tabId, idx, targetId) {

	 for ( var i = 0; i < tabSize; i++ ) {
        if ( i == idx ) {
			$("#"+tabId+i).attr("src", $("#"+tabId+i).attr("src").replace("_off", "_on"));
            if ( $("#"+targetId+i) ) { $("#"+targetId+i).show(); }
        }else{
			$("#"+tabId+i).attr("src", $("#"+tabId+i).attr("src").replace("_on", "_off"));
            if ( $("#"+targetId+i) ) { $("#"+targetId+i).hide(); }
        }
    }
}


// TAB ID
function fnTabId(tabSize, idx, targetId) {

	for ( var i = 0; i < tabSize; i++ ) {
		if ( i == idx ) {	
			if ( $("#"+targetId + i) ) {$("#"+targetId + i).show();}
		} else {
			if ( $("#"+targetId + i) ) {$("#"+targetId + i).hide();}
		}
	}
}

// IMG COLOR
function fnColor(targetId){

	if ($("#"+targetId+"[class *= off]")[0]){
		$("#"+targetId)[0].className = $("#"+targetId)[0].className.replace("off", "on");
		
		if ($("#"+targetId+"[class *= box]")[0]){
			$("#"+targetId).append("<img src='/images/category/ico_color_chk2.gif' />");
		 }else{
			$("#"+targetId).append("<img src='/images/category/ico_color_chk.gif' />");	
		}
    }else{
		$("#"+targetId)[0].className = $("#"+targetId)[0].className.replace("on", "off");
		$("#"+targetId).empty();
    }
}

// SHOW/HIDE
function showLayer(targetId) {
	$("#"+targetId).show();
	if ($("#"+targetId)[0].className == 'layer_lg'){
		$("#zoom").elevateZoom({
		  zoomType: "inner",
		  cursor: "move"
		});
		
		$(".layer_lg, .zoomContainer").css('z-index',100).show();
	}
}

function hideLayer(targetId) {
	$("#"+targetId).hide();

	// ZOOM HIDE.
	$(".layer_lg, .zoomContainer").css('z-index',-1).hide();
	
}

// IMAGE ROLLVER
$(function() {    
	$("img.rollover").hover(
	function() {
	this.src = this.src.replace("_off","_on");
	},
	function() { 
	this.src = this.src.replace("_on","_off");
	}); 
});

// IMG THUMBNAIL
function LargeImg(targetId, ImgSrc) {
	$("#"+targetId).attr("src", ImgSrc);
}

// IMG ZOOM
function ZoomImg(targetId, ImgSrc, ZoomSrc) {
	$("#"+targetId).attr("src", ImgSrc);
	$(".zoomWindow").css("background-image","url("+ZoomSrc+")");
}

// PREVIEW LAYER 
function lyrPreView(lyrId) {
	var stat = $("#"+lyrId).css('display');
	var doc = document.documentElement; body = document.body;
	
	if (stat == 'none'){

		$('#'+lyrId).show();
		//$('#'+lyrId).appendTo("body");

		var width = $("#"+lyrId).outerWidth();
		var height = $("#"+lyrId).outerHeight();
		
		var top = (doc.clientHeight/2)+(doc.scrollTop+body.scrollTop)-(height/2);
		var left = (body.clientWidth/2)-(width/2);

		$('#'+lyrId).css({top:top,left:left,zIndex:100});
		
    }else{
		$("#"+lyrId).hide();
    }
}

jQuery(function($){
	if ($(".layer_pv")){
		var doc = document.documentElement; body = document.body;

		var width = $(".layer_pv").outerWidth();
		var height = $(".layer_pv").outerHeight();
		
		var top = (doc.clientHeight/2)+(doc.scrollTop+body.scrollTop)-(height/2);
		var left = (body.clientWidth/2)-(width/2);

		$(".layer_pv").css({top:top,left:left,zIndex:100});
    }
});



// LAYER PREVIEW
jQuery(function($){
	$('.g_pic a, .g_img a').mouseover(function() {
		$(this).parent().find(".lyr_cart").show();
		$(this).parent().find(".lyr_pv").show();
		$(this).parent().find(".ctg_cart").show();
		$(this).parent().find(".ctg_pv").show();
	});

	$('.g_pic a, .g_img a').mouseout(function() {
		$(this).parent().find(".lyr_cart").hide();
		$(this).parent().find(".lyr_pv").hide();
		$(this).parent().find(".ctg_cart").hide();
		$(this).parent().find(".ctg_pv").hide();
	});
});

// LAYER RANK
jQuery(function($){
	$('.srank, .srank_lyr').mouseover(function() {
		$(".srank_lyr").show();
	});

	$('.srank, .srank_lyr').mouseout(function() {
		$(".srank_lyr").hide();
	});
});

// CATG PREVIEW
jQuery(function($){
	$('.catg_list .c_goods li a.ctg_pv').click(function() {
		var scrolls = $(window).scrollTop();
		var offset = $(this).parent().offset(); 
		$('html').animate({scrollTop:offset.top + 15}, 1000);
		if(scrolls != offset.top){
			$('.catg_pv').hide();			
			$('.catg_pv').slideDown(1000);
		}
		//$(this).parents("ul").after($('.catg_pv'));
		//$(".catg_pv").css('z-index',100);
	});

	$('.catg_pv .lyr_close a, .catg_pv .pv_close a').click(function() {
		$('.catg_pv').slideUp(600);
		//$(".catg_pv").css('z-index',-1);
		// ZOOM HIDE.
		//$(".layer_lg, .zoomContainer").css('z-index',-1).hide();
	});

}); 

function fnSelect(selectId) {
	var selectVal = $("#"+selectId).val();
	var optionVal;

	for ( var i = 0; i < $("#"+selectId+" option").size(); i++ ) {
		optionVal = $("#"+selectId+" option:eq("+i+")").val();
		if (optionVal == selectVal ) {	
			$("#"+optionVal).show();
		} else {
			$("#"+optionVal).hide();
		}
	}	
}

function fnChks(tabId, targetId) {

    for ( var i = 0; i < $("#"+tabId+"> li > input").length; i++ ) {
		if($("#"+tabId+"> li > input")[i].checked == true){
			if($("#"+targetId+i)){$("#"+targetId+i).show();}
		}
		else{
			if($("#"+targetId+i)){$("#"+targetId+i).hide();}
		}
    }
}

function setPlus(sid) {
	var value = $("#"+sid).val();
	value++;
	if(value > 9999999){return false;}
	$("#"+sid).val(value);
}

function setMinus(sid) {
	var value = $("#"+sid).val();
	value--;
	if(value < 1){return false;}
	$("#"+sid).val(value);
}

function selCheck(object){
	var schk = $(".schk input");
	if(object.checked == true && object == schk[0] || object.checked == true && object == schk[2]){
		schk[0].checked = true;
		schk[1].checked = false;
		schk[2].checked = true;
		schk[3].checked = false;
	}else if(object.checked == true && object == schk[1] || object.checked == true && object == schk[3]) {
		schk[0].checked = false;
		schk[1].checked = true;
		schk[2].checked = false;
		schk[3].checked = true;
	}else if(object.checked == false){
		schk[0].checked = false;
		schk[1].checked = false;
		schk[2].checked = false;
		schk[3].checked = false;
	}
} 

// ORDER BILL
function orderBill(targetId, currentPosition){
	var scp_top = parseInt($(".ord_wrap").offset().top);	//BILL TOP
	var target_h = $("#"+targetId).height();
	var ord_wrap_h = $(".ord_wrap").height();
	var foot_h = $(".footer").height();
	var foot_bn_h = $(".foot_bn").height();
	if(ord_wrap_h < target_h){$(".ord_wrap").css("min-height",  target_h + 63)}	

    $(window).scroll(function() {   
		var position = $(window).scrollTop(); // 현재 스크롤바의 위치값을 반환합니다.   
		var height = $(window).height();
		var min_scp_top = target_h - height + foot_h + foot_bn_h;
		if(scp_top < position){
			if(ord_wrap_h < position){position = parseInt(position - scp_top - min_scp_top)}
			else{position = parseInt(position - scp_top -  foot_bn_h)}
		}
		else{	
			position = currentPosition;
		}
		$("#"+targetId).stop().animate({"top":position+"px"},1000);
    });   
}  

function limitText(textid, limit, limitid){ 

	var text = $('#'+textid).val(); // 이벤트가 일어난 컨트롤의 value 값 
	var textlength = text.length; // 전체길이 
 
	// 변수초기화 
	var i = 0;				// for문에 사용 
	var li_byte = 0;		// 한글일경우는 2 그밗에는 1을 더함 
	var li_len = 0;			// substring하기 위해서 사용 
	var ls_one_char = "";	// 한글자씩 검사한다 
	var text2 = "";			// 글자수를 초과하면 제한할수 글자전까지만 보여준다. 
 
	for(i=0; i< textlength; i++) 
	{ 
		// 한글자추출 
		ls_one_char = text.charAt(i); 
	 
		// 한글이면 2를 더한다. 
		if (escape(ls_one_char).length > 4) { li_byte += 2;}
		else{li_byte++; } // 그밗의 경우는 1을 더한다. 
		
		// 전체 크기가 limit를 넘지않으면 
		if(li_byte <= limit){li_len = i + 1;} 
	} 
	
	$('#'+limitid).text(parseInt(li_byte/2));
	
	// 전체길이를 초과하면 
	if(li_byte > limit){ 
		alert("글자를 초과 입력할수 없습니다. 초과된 내용은 자동으로 삭제 됩니다."); 
		text2 = text.substr(0, li_len); 
		$('#'+textid).val(text2);
		$('#'+limitid).val(parseInt(limit/2));
	} 
	$('#'+textid).focus(); 
} 

function fnToggleLp(targetId, tval, offTarget) {
	
	if(offTarget){$(offTarget)[0].className = $(offTarget)[0].className.replace("on", "off");}

	if (tval == 'on'){
		 if ( $("#"+targetId)[0] ) {$("#"+targetId)[0].className = $("#"+targetId)[0].className.replace("off", "on");}
    }else{
		 if ( $("#"+targetId)[0] ) {$("#"+targetId)[0].className = $("#"+targetId)[0].className.replace("on", "off");}
    }
}


// ASIDE COUNT 
jQuery(function($){
	if($(".aside_wrap")){
		var swh = $(".sub_wrap").height();	//SUB CONTENTS
		var cph = $(".catg_pv").height();	//CATEGORY PREVIEW
		var asc = parseInt((swh-cph)/214);
		$(".aside li:gt("+(asc-1)+")").hide(); //ASIDE COUNT
	}
});


// SEARCH RANK 
function topRanking(target){
	this.dropListNum;
	this.oldActiveNum;
	this.activeNum=0;
	
	this.source = document.getElementById(target);
	this.sourceLi = this.source.getElementsByTagName("LI");
	this.sourceLiHeight= this.sourceLi[0].offsetHeight;
	this.sourceA = this.source.getElementsByTagName("A");
		
	var func = this;
	for(i=0; i<this.sourceLi.length; i++){
		this.sourceLi[i].style.top = this.sourceLiHeight + "px";
	
	}

	var sourceLiHeight = this.sourceLiHeight;
	var actionFunc = setInterval(function(){
		func.action();
	}, 50);
	var changeFunc = setInterval(function(){
		func.change();
	}, 3000);

}
topRanking.prototype.action = function(){
	var source = this.source;
	var sourceLi = this.sourceLi;
	var sourceLiHeight = this.sourceLiHeight;

	var activeNum = this.activeNum;
	var dropListNum = this.dropListNum;
	var oldActiveNum = this.oldActiveNum;

	if(oldActiveNum !== undefined){
		var gap1 = 0.2*(-sourceLiHeight - (parseFloat(sourceLi[oldActiveNum].style.top)));
		sourceLi[oldActiveNum].style.top = parseFloat(sourceLi[oldActiveNum].style.top) + Math.floor(gap1) + "px"; 
	}
	var gap2 = 0.2*(-parseInt(sourceLi[activeNum].style.top, 10));
	sourceLi[activeNum].style.top = parseFloat(sourceLi[activeNum].style.top) + Math.floor(gap2) + "px"; 
}
topRanking.prototype.change = function(){
	var sourceLi = this.sourceLi;
	var sourceLiHeight = this.sourceLiHeight;

	if(this.dropListNum !== undefined) sourceLi[this.dropListNum].style.top = sourceLiHeight + "px"; 
	this.oldActiveNum = this.activeNum;
	this.dropListNum = this.oldActiveNum;
	if(sourceLi.length-1 == this.activeNum) this.activeNum=0; 
	else ++this.activeNum;
}


function planTab(target){
	if($(document).find(target).length > 0){
		$(target+" ul li a").click(function(){
			$(this).parent().parent().find("a").removeClass("on");
			$(this).addClass("on");
		});
	}else{return false;}
}

function flashWrite(targetId,url,w,h,id,bg,vars,win){//타겟아이디,파일경로, 가로, 세로, 아이디, 배경색, 변수, 윈도우모드

	var flashStr=
	"<object classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' codebase='http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0' width='"+w+"' height='"+h+"' id='"+id+"' align='middle'>"+
	"<param name='allowScriptAccess' value='always' />"+
	"<param name='movie' value='"+url+"' />"+
	"<param name='FlashVars' value='"+vars+"' />"+
	"<param name='wmode' value='"+win+"' />"+
	"<param name='menu' value='false' />"+
	"<param name='quality' value='high' />"+
	"<param name='bgcolor' value='"+bg+"' />"+
	"<embed src='"+url+"' FlashVars='"+vars+"' wmode='"+win+"' menu='false' quality='high' bgcolor='"+bg+"' width='"+w+"' height='"+h+"' name='"+id+"' align='middle' allowScriptAccess='always' type='application/x-shockwave-flash' pluginspage='http://www.macromedia.com/go/getflashplayer' />"+
	"</object>";

	document.getElementById(targetId).innerHTML = flashStr;
}

function evtRoll(ta,han1,han2){
	this.ul = $(ta+" > ul");
	this.li = $(ta+" > ul li");
	this.hand = $(han1+","+han2);
	this.wi = $(ta).width();
	this.liWi = this.li.width();
	this.fiL = 1*this.liWi+5;
	this.leng = $(ta+" > ul li").length;

	$duration = 400;
	$cnt = 0;
	if (this.leng < 3) return false;
	this.init();
}

evtRoll.prototype.init = function(){
	var wd = this.leng*this.fiL;
	this.ul.css("width",wd+"px");
	this.ulWi = this.ul.width();
	this.evtRollHandle();
	this.evtRollEn();
}

evtRoll.prototype.hoverSrc = function(ta,src){
	var sr = $("img",ta).attr("src");
	sr = (src == "")?sr.replace("_on","_off"):sr.replace("_off","_on");

	$("img",ta).attr("src",sr);
}

evtRoll.prototype.evtRollHandle = function(){
	var that = this;

	this.hand
		.on("mouseover",function(){that.hoverSrc(this,"_on");})
		.on("focus",function(){that.hoverSrc(this,"_on");})
		.on("mouseout",function(){that.hoverSrc(this,"");})
		.on("blur",function(){that.hoverSrc(this,"");})
		.on("click",function(){that.evtRollEn(this.className.split("btn_evt_")[1]);return false;});
}

evtRoll.prototype.evtRollEn = function(va){
	var that = this;
	if(!va){
		var res = this.fiL*(this.leng-4);
		this.ul.animate({"left":"-="+res});
		$cnt = (1*this.leng)-4;
	}else{
		var chk = (1*this.leng)-4;

		if (($cnt <= 0 && va == "left") || ($cnt >= chk && va == "right")){
			return false;
		}else{
			$cnt = (va == "left")?$cnt-1:$cnt+1;

			var dir = -1*this.fiL*$cnt;
			this.ul.stop().animate({"left":dir},$duration);
		}
	}
}

// 이미지 Rolling
//----------------------------------------
function ImageRotation() {
	var scroll = {time:1, start:0, change:0, duration:25, timer:null};
	var originaltime = scroll.time;
	var objWidth = 0;
	var currentNum = 0;
	var tmpName, tmpWrap, tmpListId, tmpNext, tmpPrev, tmpNum, tmpTime, moveEvent, restNum, objNum, nowNum, totNum, cntTmp, nowTmp, totTmp, cntNum, tmpTit, tmpDir, tmpPage, cntRoll;
	this.GoodsSetTime = null;
	var cloneElement = [];

	this.setScrollType = function (obj) {}

	this.initialize = function () {
		tmpNum = this.listNum;
		tmpTime = this.GoodsSetTime;
		tmpDir = this.scrollDirection;
		tmpWrap = document.getElementById(this.wrapId);
		tmpListId = document.getElementById(this.listId);
		tmpNext = document.getElementById(this.btnNext);
		tmpPrev = document.getElementById(this.btnPrev);
		nowNum = document.getElementById(this.nowCnt);
		totNum = document.getElementById(this.totCnt);
		//tmpTit = document.getElementById(this.titName);
		tmpPage = document.getElementById(this.cntPage);
		cntRoll = this.sRoll;

		objNum = tmpListId.getElementsByTagName('li').length;
		cntNum = tmpNum;

		objWidth = tmpListId.getElementsByTagName('li')[0].offsetWidth * tmpNum;

		tmpListId.style.width = (objNum * tmpListId.getElementsByTagName('li')[0].offsetWidth) + 'px';
		//tmpWrap.style.width = objWidth + 'px';

		tmpListId.style.overflow = 'hidden';
		tmpWrap.style.overflow = 'hidden';

		tmpNext.onclick = setPrev;
		tmpPrev.onclick = setNext;


		if (this.autoScroll == 'none') {
			// do nothing.
		} else {
			clearInterval(tmpTime);
			if(tmpDir == 'direction'){moveEvent = 'setPrev';}
			else{moveEvent = 'setNext';}
			tmpTime = setInterval(function () { eval(moveEvent + '();'); }, this.scrollGap);
		}

		// count
		if(totNum){totNum.innerHTML= objNum/tmpNum;}

		//img name
		//if(tmpTit){tmpTit.innerHTML = tmpListId.getElementsByTagName("img")[0].alt;}

		// PAGES
		if(tmpPage){setPages(1);}

	}

	var setPages = function (pNum) {
		var pBtn;

		totNum = parseInt(objNum/tmpNum)

		if(totNum){
			for (var i=1; i<totNum+1; i++){
				if(pBtn == undefined){pBtn = "";}
				if(i == pNum){pBtn += "<strong  id='"+cntRoll+"_sBtn"+i+"' class='on'></strong>";}
				else{pBtn += "<strong id='"+cntRoll+"_sBtn"+i+"' class='off'></strong>";}
			}
			tmpPage.innerHTML = pBtn;
		}
		nowNum = pNum;
	}


	var setNext = function () {
		if (objNum <= tmpNum) return false;
		// count
		cntNum = cntNum - tmpNum;
		if(cntNum < 1){cntNum = objNum;}
		if(nowNum){nowNum.innerHTML = parseInt(cntNum/tmpNum);}

		// PAGES
		if(tmpPage){setPages(parseInt(cntNum/tmpNum));}

		//moveEvent = 'setNext';
		for (var i=0; i<tmpNum; i++) {
			var objLastNode = tmpListId.removeChild(tmpListId.getElementsByTagName('li')[objNum - 1]);
			tmpListId.insertBefore(objLastNode, tmpListId.getElementsByTagName('li')[0]);

			//img name
			//if(tmpTit){tmpTit.innerHTML = tmpListId.getElementsByTagName("img")[tmpNum-1].alt;}
		}

		tmpWrap.scrollLeft = objWidth;
		var position = getActionPoint('indirect');
		startScroll(position.start, position.end, 'next');
		return false;
	}

	var setPrev = function () {
		if (objNum <= tmpNum) return false;
		// count
		cntNum = cntNum + tmpNum;
		if(objNum < cntNum){cntNum = tmpNum;}
		if(nowNum){nowNum.innerHTML = parseInt(cntNum/tmpNum);}

		// PAGES
		if(tmpPage){setPages(parseInt(cntNum/tmpNum));}

		//moveEvent = 'setPrev';
		var position = getActionPoint('direct');
		startScroll(position.start, position.end, 'prev');
		return false;
	}

	var startScroll = function (start, end, location) {
		if (scroll.timer != null) {
			clearInterval(scroll.timer);
			scroll.timer = null;
		}

		scroll.start = start;
		scroll.change = end - start;
		scroll.timer = setInterval(function () {
			scrollHorizontal(location);
		}, 15);
	}

	var scrollHorizontal = function (location) {
		if (scroll.time > scroll.duration) {
			clearInterval(scroll.timer);
			scroll.time = originaltime;
			scroll.timer = null;
			if (location == 'prev') {
				for (var i=0; i<tmpNum; i++) {
					var objFirstNode = tmpListId.removeChild(tmpListId.getElementsByTagName('li')[0]);
					tmpListId.appendChild(objFirstNode);
					//img name
					//if(tmpTit){tmpTit.innerHTML = tmpListId.getElementsByTagName("img")[tmpNum-1].alt;}
				}

			}
			tmpWrap.scrollLeft = 0;
		} else {
			tmpWrap.scrollLeft = sineInOut(scroll.time, scroll.start, scroll.change, scroll.duration);
			scroll.time++;
		}
	}

	var getActionPoint = function (dir) {
		var end;

		if (dir == 'direct') end = tmpWrap.scrollLeft + objWidth;
		else end = tmpWrap.scrollLeft - objWidth;

		var start = tmpWrap.scrollLeft;

		var position = {start:0, end:0};
		position.start = start;
		position.end = end;

		return position;
	}

	var sineInOut = function (t, b, c, d) { return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b; }
	
	var findElementPos = function (elemFind) {
		var elemX = 0;
		elemX = tmpWidth*(elemFind/tmpNum);
		return elemX;
	}
}


// BG CATG_MENU
//jQuery(function($){

	//if($(".catg_menu")){
		//var cmh = $(".catg_menu").parents(".area_lv2").next(".area_lv2").css("height");
		//$(".catg_menu").parents(".area_lv2").css("height",cmh);
		//$(".catg_menu").parents(".area_lv2").css("background-image","url('/images/category/bg_catgmenu.gif')");
		//$(".catg_menu").parents(".area_lv2").css("background-repeat","no-repeat");
	//}
//});



// TAB CONTENT
function mainTabContent(tab,btn){
	var flag = 0;
	var sTime ;
	var scnt = $(tab).length -1;

	var lis = $(tab)
	var tab = $(tab).each(function(i){this.i = i}).bind('click focusin', function(){
		lis.removeClass('on').eq(this.i).addClass('on');
		flag = this.i;
		clearTimeout(sTime);
	});

	var tab = $(tab).each(function(i){this.i = i}).bind('click focusout', function(){
		clearTimeout(sTime);
		if ( flag >= 2 && flag <= scnt ) {
			sTime = setTimeout(move_next_content,3000)
		} else {
			sTime = setTimeout(move_next_content,3000)
		}
	});

	function move_next_content(present_number){
		var it_num = present_number;

		if(present_number == null){
			it_num = flag;
		}

		if (it_num >= scnt){
			lis.removeClass('on');
			lis.eq(0).addClass('on');
			flag = 0;
		}else {
			lis.removeClass('on');
			lis.eq(it_num+1).addClass('on');
			flag = it_num + 1;
		}

		clearTimeout(sTime);

		if ( flag >= 2 && flag <= scnt ) {
			sTime = setTimeout(move_next_content,3000)
		} else {
			sTime = setTimeout(move_next_content,3000)
		}
	}
	sTime = setTimeout(move_next_content,3000);
}

function popupAutoResize() {
    
	var thisX = parseInt(document.body.scrollWidth);
    var thisY = parseInt(document.body.scrollHeight);
    var maxThisX = screen.width - 50;
    var maxThisY = screen.height - 50;
    var marginY = 0;
    //alert(thisX + "===" + thisY);
    //alert("임시 브라우저 확인 : " + navigator.userAgent);
    // 브라우저별 높이 조절. (표준 창 하에서 조절해 주십시오.)
    if (navigator.userAgent.indexOf("MSIE 6") > 0) { marginX = 25; marginY = 57;} // IE 6.x
    else if(navigator.userAgent.indexOf("MSIE 7") > 0) {marginX = 37; marginY = 71;} // IE 7.x
	else if(navigator.userAgent.indexOf("MSIE 8") > 0) {marginX = 20; marginY = 71;} // IE 8.x
	else if(navigator.userAgent.indexOf("MSIE 9") > 0) {marginX = 16; marginY = 67;} // IE 9.x
	else if(navigator.userAgent.indexOf("MSIE 10") > 0) {marginX = 16; marginY = 67;} // IE 10.x
    else if(navigator.userAgent.indexOf("Firefox") > 0) {marginX = 18; marginY = 77;} // FF
    else if(navigator.userAgent.indexOf("Opera") > 0 ){marginX = 20; marginY = 57;} // Opera
	else if(navigator.userAgent.indexOf("Chrome") > 0) { marginX = 16; marginY = 70;} // Chrome 
	else if(navigator.userAgent.indexOf("Safari") > 0) {marginX = 16; marginY = 70; } // Safari

    if (thisX > maxThisX) {
        window.document.body.scroll = "yes";
        thisX = maxThisX;
    }
    if (thisY > maxThisY - marginY) {
        window.document.body.scroll = "yes";
        thisX += 19;
        thisY = maxThisY - marginY;
    }
    window.resizeTo(thisX+10, thisY+marginY);

    // 센터 정렬
    // var windowX = (screen.width - (thisX+10))/2;
    // var windowY = (screen.height - (thisY+marginY))/2 - 20;
    // window.moveTo(windowX,windowY);
}


// TEMP JS

// TOP MENU
jQuery(function($){
	var tMenu = $('.menu_catg');
	var tList = tMenu.find('ul>li');	

	//Show
	function show_tMenu(){
		tList.removeClass('active');
		tList.find('div.m_sub').hide();
		$(this).parent('li').addClass('active');
		$(this).parent('li').find('div.m_sub').show();
	}
	//Hide
	function hide_tMenu(){
		tList.removeClass('active');
		tList.find('div.m_sub').hide();
	}
	tList.find('>a').mouseover(show_tMenu).focus(show_tMenu);
	tMenu.mouseleave(hide_tMenu);
	tList.find('div.menu_catg').mouseleave(hide_tMenu);	
});
