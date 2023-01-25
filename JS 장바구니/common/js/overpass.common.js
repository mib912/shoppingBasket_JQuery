(function ($) {
	
	//ajax 셋팅
	$.ajaxSettings.cache = false;
	
	callback = null;
	
	getCommonForm = function() {	   	// 모든 페이지에서 공통으로 사용할 수 있는 form을 만든다.
		if ($.form("#_COMMON_FORM_").length == 0) {
			$("body").append($("<form name=\"_COMMON_FORM_\" id=\"_COMMON_FORM_\" method=\"post\"></form>"));
		};
		var f = $.form("#_COMMON_FORM_");
		f.find(":input").remove();
		return $.form("#_COMMON_FORM_");
	};
	
	popup = function(pin) {
		var defaultProps = {
			winname : "_POPUP_",
			params : {},
			method: "get",
			width: "400px",
			height: "400px",
			scrollbars : false,
			resizable : false,
			action : false
		};
		
		pin = $.extend(defaultProps, pin || {});
		
		var intLeft = (screen.width) / 2 - (pin.width + "").replace(/px/, '') / 2;
		var intTop = (screen.height) / 2 - (pin.height + "").replace(/px/, '') / 2;
		
		if(pin.left){
			intLeft = pin.left
		}
		
		if(pin.top){
			intTop = pin.top
		}
		
		var win = null;
		
		if (pin.method == "get") {
			var openUrl = pin.url;
			var params = "";
			var first = true;
			$.each(pin.params, function(name, value) {
				
				var amp = "";
				if (first) {
					first = false;
				} else {
					amp = "&";
				}
				
				if ($.isArray(value)) {
					$.each(value, function(index, value) {
						params += (amp + name + "=" + encodeURI(value));
					});

				} else if (typeof (value) == "object") {
					if(value != null ){
						$.each(value, function(name, value) {
							params += (amp + name + "=" + encodeURI(value));
						});
					}
				} else {
					params += (amp + name + "=" + encodeURI(value));
				};
			});
			
			openUrl += ("?" + params);
			win = window.open(openUrl, pin.winname, "menubar=no, scrollbars="
					+ (pin.scrollbars ? "yes" : "no") + ", resizable="
					+ (pin.resizable ? "yes" : "no") + ", status=yes, width="
					+ pin.width + ", height=" + pin.height + ",top=" + intTop
					+ ",left=" + intLeft + "");	
		} else if (pin.method == "post") { 
			var openUrl = "";
			
			win = window.open(openUrl, pin.winname, "menubar=no, scrollbars="
					+ (pin.scrollbars ? "yes" : "no") + ", resizable="
					+ (pin.resizable ? "yes" : "no") + ", status=yes, width="
					+ pin.width + ", height=" + pin.height + ",top=" + intTop
					+ ",left=" + intLeft + "");
			
			if (win != null) {
				//form을 만들자.
				$("#_POPUP_FORM_").remove();	//기존에 만들어진 폼이 있다면 일단 삭제....
				pin.params.title = pin.title;
				var form = $("<form id=\"_POPUP_FORM_\" method=\"post\" action=\"" + pin.url + "\" target=\"" + pin.winname + "\"></form>");
				$.each(pin.params, function(name, value) {
					var input = $("<input type=\"hidden\" />").attr("name", name).val(value);					
					form.append(input);
				});
				
				$("body").append(form);
				
				form.each(function() {
					this.submit();
				});				
			};
		} else {
			alert("죄송합니다. 팝업 정보가 올바르지 않습니다.");
			return false;
		};

		// 포커스
		if (win != undefined && win != null) {
			win.focus();
		};
		
		if ($.isFunction(pin.callback)) {
			callback = pin.callback;
		};
		
		return win;
	};
	
	$.fn.createAnchor = function (pin) {
		
		var $div = this;
		
		var ahref = null;
		
		pin = $.extend(false, {
			name: "page_no",
			prev_img: "/images/common/btn_page_prev.gif",
			next_img: "/images/common/btn_page_next.gif",
			fn: function(page, parameters) {
				var url = pin.url + "?" + pin.name + "=" + $(ahref).attr("value");
				if (parameters != "") {
					url += "&" + parameters;
				}
				window.location.href = url;
			}
		}, pin||{});
		
		$("a[current=false]", $div).addClass("num");
		$("a[current=true]", $div).addClass("select_num");
		$("img[name=prev]", $div).attr({ src: pin.prev_img });
		$("img[name=next]", $div).attr({ src: pin.next_img });
		
		$("a", $div).click(function(e) {
			ahref = this;
			if ($(ahref).attr("current") == "false" || $(ahref).attr("current") == "") {
				var parameters = $(ahref).attr("parameters");
				pin.fn($(ahref).attr("value"), parameters);				
			};
		});
	};
	
	/***
	 * 브라우져 버전 및 종류 체크
	 * browser.type : 브라우져 종류, browser.version : 브라우저 버전.
	 */
	browser = (function(){
		
		var returnObj = {};
	    returnObj.type ="";
	    returnObj.version= "";

		var browerAgent = navigator.userAgent;
		
		var browerType = ""; // 브라우져 종류
		// 브라우져 종류 설정.
		if (browerAgent.indexOf("Chrome") != -1) {
		    browerType = "Chrome";
		} else if (browerAgent.indexOf("Firefox") != -1) {
		    browerType = "Firefox";
		} else if (browerAgent.indexOf("Safari") != -1) {
		    browerType = "Safari";
		} else if (browerAgent.indexOf("MSIE") != -1) {
		    browerType = "MSIE";
		}else{
		    browerType = "Opera";       
		}
		
		returnObj.type = browerType;        
	        
		var rv = -1; // Return value assumes failure.      
		var ua = navigator.userAgent;
		var re = null;
		
		if (browerType == "MSIE") {
		    re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
		} else {
		    re = new RegExp(browerType + "/([0-9]{1,}[\.0-9]{0,})");
		}
		if (re.exec(ua) != null) {
		    rv = parseFloat(RegExp.$1);
		}
		
		returnObj.version = rv;
		
		return returnObj;
	})();
	
})(jQuery);

