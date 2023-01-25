document.write("<Script Language='JavaScript'>eMsEvent()<" + "/Script>");

function getEmsCookie(name) {
	var cname = name + "=";
	var dc = document.cookie;
	if (dc.length > 0) {
		begin = dc.indexOf(cname);
		if (begin != -1) {
			begin += cname.length;
			end = dc.indexOf(";", begin);
			if (end == -1) end = dc.length;
				return unescape(dc.substring(begin, end));
		}
	}
	return null;
}

function setEmsCookie(name, value, expires, path, domain, secure) {

 var todayDate = new Date();
 todayDate.setDate( todayDate.getDate() + expires );
	document.cookie = name + "=" + escape(value) +
	((expires == null || expires == "") ? "" : "; expires=" + todayDate.toGMTString()) +
	((path == null || path == "") ? "" : "; path=" + path) +
	((domain == null || domain == "") ? "" : "; domain=" + domain) +
	((secure == null || secure == "") ? "" : "; secure");
}
	
/*
onLoad EventHandler
*/
function eMsEvent() {

	if( document.location.hostname.indexOf('sfc.welstorymall.com') > 0 ) {
		alert("cookie_EMAMailYN => " + getEmsCookie("EMSMailYN") );
	}

	if( document.location.search.indexOf('WEBTRACK=') > 0 ){
		setEmsCookie("EMSMailYN", '1' ,null ,null ,null ,null );
		setEmsCookie("EHEMailCont", document.location.search.substring(document.location.search.indexOf('?')+1) ,null ,null ,null ,null );
	
		callWebServer("VISIT_"+document.location.hostname);
	}
	
	if(BROWSER_TYPE == "IE"){
			return ;
	}
	
	if( getEmsCookie("EMSMailYN") == '1' ){				
		setBrowserType();	
		checkUrl_IE();	
	}
}


var BROWSER_TYPE;	
var BROWSER_VERSION;	

function setBrowserType(){

var browserType = "";
var browserVersion = "";
		
if (navigator.appName == "Netscape") {
	browserType = "FF";
}else if ( navigator.appName == "Microsoft Internet Explorer" ) {
	browserType = "IE";
	if (navigator.appVersion.charAt(0) == "4" || navigator.appVersion.charAt(0) == "5") {
		if(navigator.appVersion.indexOf("MSIE 5") != -1) {
			browserVersion = "5";
		} else if(navigator.appVersion.indexOf("MSIE 6") != -1) {
			browserVersion = "6";
		} else if(navigator.appVersion.indexOf("MSIE 7") != -1) {
			browserVersion = "7";
		} else if(navigator.appVersion.indexOf("MSIE 8") != -1) {
			browserVersion = "8";
		} else if(navigator.appVersion.indexOf("MSIE 9") != -1) {
			browserVersion = "9";
		} else {
			browserVersion = "4";
		}
	} else if (navigator.appVersion.charAt(0) == "8") {
		browserVersion = "8";
	}
}

BROWSER_TYPE = browserType;
BROWSER_VERSION = browserVersion;
}



function checkUrl_IE(){

	try{
		var URL_LIST = new Array();
		var PREV_URL_LIST = new Array();
		var TEMP_URL_LIST = new Array();
		
		
		URL_LIST.push(location.href);
		
		for (var i=0; i<URL_LIST.length; i++){	
			TEMP_URL_LIST.push(URL_LIST[i]);
		}
			
		for (var i=0; i<URL_LIST.length; i++){	
			var currentUrl = URL_LIST.shift();
			var prevUrl = PREV_URL_LIST.shift();		
				
			if(currentUrl!=prevUrl){
				if(currentUrl.indexOf('?') == -1){
					callWebServer( currentUrl );
				}else{
					callWebServer( currentUrl.substring(0, currentUrl.indexOf('?')) );
				}
			}		
		}
		
		PREV_URL_LIST = TEMP_URL_LIST;
		//compareUrlList();
	
	}catch(e){
		//alert("Error on 'checkUrl_IE()'\n" + e.name + "\n" + e.msg);		
		//(new Image()).src = 'http://receive_mail.hmall.com:90/Check.html?checkUrl_IE_error='+e;
	}		
}


function callWebServer(URL){
	(new Image()).src = 'http://112.106.22.134:90/WebTrack.html?' + getEmsCookie('EHEMailCont') + '&URL=' + URL;
}

//////////////////////////////////////////////////////////////////////////////////////////////