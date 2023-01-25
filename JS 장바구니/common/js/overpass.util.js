(function($){
	
	/**
	 * data : 주어진 데이타를 배열로 전환한다. 이미 배열이면 변화없고 배열이 아닐경우 length 1인 배열로 변환.
	 */
	makeArray = function(data) {
		return $.makeArray(data);
	};
	
	toCurrency = function(amount) {
		amount = String(amount);
		var data = amount.split('.');
		var sign = "";
		var firstChar = data[0].substr(0,1);
		if(firstChar == "-"){
			sign = firstChar;
			data[0] = data[0].substring(1, data[0].length);
		};
		data[0] = data[0].replace(/\D/g,"");
		if(data.length > 1){
			data[1] = data[1].replace(/\D/g,"");
		};
		firstChar = data[0].substr(0,1);
		//0으로 시작하는 숫자들 처리
		if(firstChar == "0"){
			if(data.length == 1){
				return sign + parseFloat(data[0]);
			};
		};
		var comma = new RegExp('([0-9])([0-9][0-9][0-9][,.])');
		data[0] += '.';
		do {
			data[0] = data[0].replace(comma, '$1,$2');
		} while (comma.test(data[0]));

		if (data.length > 1) {
			return sign + data.join('');
		} else {
			return sign + data[0].split('.')[0];
		};
	};
	
	/**
	 * Cookie값 가져오기
	 */
	getCookie = function(name){
		var nameOfCookie = name + "=";
		var x = 0;
		while ( x <= document.cookie.length ){
			var y = (x+nameOfCookie.length);
			if ( document.cookie.substring( x, y ) == nameOfCookie ) {
				if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 )
					endOfCookie = document.cookie.length;
				return unescape( document.cookie.substring( y, endOfCookie ) );
			}
			x = document.cookie.indexOf( " ", x ) + 1;
			if ( x == 0 )
				break;
		}
		return "";
	};
	
	/**
	 * Cookie값 저장하기
	 */
	setCookie = function(p) {
		
		p = $.extend(false, {
			age: null,
			path: "/",
			domain: null,
			secure: false
		}, p);
		
		var date = new Date();
		date.setDate( date.getDate() + p.age );
			
		document.cookie = 
				p.name + "=" + escape (p.value) + 
				((p.age == null) ? "" : ("; expires=" + date.toGMTString())) + 
				((p.path == null) ? "" : ("; path=" + p.path)) + 
				((p.domain == null) ? "" : ("; domain=" + p.domain)) + 
				((p.secure == true) ? "; secure" : "");
	};
	
	/**
	 * 앞뒤 빈공간 삭제
	 * @param str stirng
	 * @return string
	 */
	String.prototype.trim = function() { 
		return this.replace(/^\s+/g,'').replace(/\s+$/g,''); 
	};
	
	trim = function(str) {
		if(typeof(str) == "undefined") return "";
		return str.replace(/(^\s*)|(\s*$)/gi, "");
	};
	
	String.prototype.replaceAll = function(from, to) {
	    return this.replace(new RegExp(from, "g"), to);
	};
	
	/**
	 * input element의 hidden type object를 생성하여 해당 parent_obj에 넣는다.
	 *
	 * @param parent_obj 생성되는 object를 넣을 부모 object object타입으로 넘겨준다.
	 * @param elemName element의 이름
	 * @param elemValue element의 값
	 */
	 putDomInput = function(parent_obj, elemName, elemValue){
		var input = document.createElement("input");
		input.setAttribute("type", "hidden");
		input.setAttribute("name", elemName);
		input.setAttribute("value", elemValue);
		parent_obj.appendChild(input);
	}
	 
	/**
	 * Date format 지원
	 */ 
	Date.prototype.format = function(f) {    
		if (!this.valueOf()) {
			return " ";     
		};
		
		var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];    
		var d = this;         
		return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {        
			switch ($1) {            
				case "yyyy": 
					return d.getFullYear();            
				case "yy": 
					return (d.getFullYear() % 1000).zf(2);            
				case "MM": 
					return (d.getMonth() + 1).zf(2);            
				case "dd": 
					return d.getDate().zf(2);            
				case "E": 
					return weekName[d.getDay()];            
				case "HH": 
					return d.getHours().zf(2);            
				case "hh": 
					return ((h = d.getHours() % 12) ? h : 12).zf(2);            
				case "mm": 
					return d.getMinutes().zf(2);            
				case "ss": 
					return d.getSeconds().zf(2);            
				case "a/p": 
					return d.getHours() < 12 ? "오전" : "오후";            
				default: 
					return $1;        
			}    
		});
	};
	
	String.prototype.string = function(len) {
		var s = '', i = 0; 
		while (i++ < len) { 
			s += this; 
		} 
		return s;
	};
	String.prototype.zf = function(len) {
		return "0".string(len - this.length) + this;
	};
	
	Number.prototype.zf = function(len) {
		return this.toString().zf(len);
	};
	
	encodeURI = function(value) {
		return encodeURIComponent(value).replace(/%20/g, "+");
	};
	
    /**
	 * 패스워드 유효성 검사
	 * 1.6자 이상 ~ 15자 이하
	 * 2.영대문자, 영소문자, 숫자, 특수기호중 2가지 이상이ㅡ 조합
	 * 3.동일문자 3회이상 반복 불가
	 * 4.키보드상 연속문자열 4자 이상 사용불가
	 * 5.사용자ID와 연속 3문자 이상 중복 불가
	 * 6.연속된 숫자/문자 3자 이상 사용불가
	 *
	 * 패스워드가 부적합하면 true 리턴
	 */
	checkPassword = function(passwd, usr_id) {

		//숫자/문자의 순서대로 3자 이상 사용금지
		var strights = ['012345678901', '987654321098', 'abcdefghijklmnopqrstuvwxyzab', 'zyxwvutsrqponmlkjihgfedcbazy'];

		//연속된 키보드 조합
		var keypads = [
			       		'`1234567890-=', 	'=-0987654321`', 	'~!@#$%^&*()_+', 	'+_)(*&^%$#@!~',
			       		'qwertyuiop[]\\', 	'\\][poiuytrewq', 	'QWERTYUIOP{}|',	'|}{POIUYTREWQ',
			       		'asdfghjkl;\'', 	'\';lkjhgfdsa', 	'ASDFGHJKL:"', 		'":LKJHGFDSA',
			       		'zxcvbnm,./', 		'/.,mnbvcxz', 		'ZXCVBNM<>?', 		'?><MNBVCXZ'
			       		];

		var getPattern = function(str, casesensitive) {

			//정규식 생성전에 예약어를 escape 시킨다.
			var reserves = ['\\', '^', '$', '.', '[', ']', '{', '}', '*', '+', '?', '(', ')', '|'];

			$.each(reserves, function(index, reserve){
				var pattern = new RegExp('\\' + reserve, 'g');
				if (pattern.test(str)) {
					str = str.replace(pattern, '\\' + reserve);
				}
			});
			var pattern = null;
			if (casesensitive == false) {
				pattern = new RegExp(str, 'i');
			} else {
				pattern = new RegExp(str);
			}

			return pattern;
		}

		if (passwd.match(/^.{6,15}$/g) == null) {
			alert('패스워드는 6자리 이상 15자리 미만으로 입력하세요.');
			return true;
		}

		var valid_count = 0;
		if (passwd.match(/[a-z]/) != null) {
			valid_count++;
		}
		if (passwd.match(/[A-Z]/) != null) {
			valid_count++;
		}
		if (passwd.match(/[0-9]/) != null) {
			valid_count++;
		}
		if (passwd.match(/\W/) != null) {
			valid_count++;
		}

		if(valid_count < 2) {
			alert('패스워드는 영문대문자/영문소문자/숫자/특수기호중 2가지 이상을 혼합하여 입력하세요.');
			return true;
		}

		for (var i = 0 ; i < passwd.length ; i++) {
			if (passwd.charAt(i+1) != '' && passwd.charAt(i+2) != '') {
				if (passwd.charCodeAt(i) == passwd.charCodeAt(i+1) && passwd.charCodeAt(i+1) == passwd.charCodeAt(i+2)) {	//동일문자 3회 반복
					alert('패스워드는 동일문자를 연속3회이상 반복 하실 수 없습니다.');
					return true;
				}
				var str = passwd.charAt(i)+''+passwd.charAt(i+1)+''+passwd.charAt(i+2);

				var pattern = getPattern(str, false);

				for (var j = 0 ; j < strights.length ; j++) {
					if (pattern.exec(strights[j]) != null) {
						alert('패스워드는 연속된 알파벳/숫자 조합을 사용할 수 없습니다.');
						return true;
					}
				}

				//아이디와 3자 이상 중복 불가
				if (pattern.exec(usr_id) != null) {
					alert('패스워드는 아이디와 3자 이상 중복될 수 없습니다.');
					return true;
				}
			}
		}

		for (var i = 0 ; i < passwd.length ; i++) {
			if (passwd.charAt(i+1) != '' && passwd.charAt(i+2) != '' && passwd.charAt(i+3) != '') {
				var str = passwd.charAt(i)+''+passwd.charAt(i+1)+''+passwd.charAt(i+2) +''+ passwd.charAt(i+3);

				var pattern = getPattern(str);

				for (var j = 0 ; j < keypads.length ; j++) {
					if (pattern.exec(keypads[j]) != null) {
						alert('연속된 키보드 조합을 사용할 수 없습니다.');
						return true;
					}
				}
			}
		}
		return false;
	};
	
})(jQuery);