(function($){

	/**
	 * <pre>
	 * 날짜 검사 (yyyy-mm-dd)검사
	 * </pre>
	 */
	isDate = function (field) {
		
		if ($.type(field) == "undefined") {
			alert("날짜 필드가 아닙니다.");
			return false;
		};		
		
		var val = "";
		
		if ($.type(field.val) == "function") {
			val = field.val();
		} else {
			val = field.value;
		};
		
		var matches;
		/**
		 * 9999-12-31 날짜형식이 맞지 않다는 오류가 발생하여 처리
		 */ 
		if(matches = val.match(/^(\d{4})-(\d{2})-(\d{2})$/)) {
			if(!checkDate(matches[1], matches[2], matches[3])) {
				field.focus();
				return false;
			};
			return true;
		} else {
			alert("날짜 형식이 올바르지 않습니다.\n\n2010-01-01형식으로 입력해 주십시요.");
			field.focus();
			return false;
		};
	};
	
	/**
	 * 날짜 형식 검사
	 */
	checkDate = function(yyyy, mm, dd) {
		if (typeof(yyyy) == "undefined" || yyyy == null || yyyy == "" || yyyy.length != 4) {
			alert("날짜 형식이 올바르지 않습니다.");
			return false;
		};
		if (typeof(mm) == "undefined" || mm == null || mm == "" || mm.length > 2) {
			alert("날짜 형식이 올바르지 않습니다.");
			return false;
		};
		if (typeof(dd) == "undefined" || dd == null || dd == "" || dd.length > 2) {
			alert("날짜 형식이 올바르지 않습니다.");
			return false;
		};
		mm =  mm.length == 1 ? "0" + mm : mm;
		dd =  dd.length == 1 ? "0" + dd : dd;
		var date = new Date(yyyy +"/"+ mm +"/"+ dd);
		if (yyyy - date.getFullYear() != 0) {
			alert("날짜 형식이 올바르지 않습니다.");
			return false;
		};
		if (mm - date.getMonth() - 1 != 0) {
			alert("날짜 형식이 올바르지 않습니다.");
			return false;
		};
		if (dd - date.getDate() != 0) {
			alert("날짜 형식이 올바르지 않습니다.");
			return false;
		};
		return true;
	};
	
	/**
	 * 필드값의 공백여부 체크(스페이스 포함) 필드가 empty이면 true 리턴
	 */
	isEmpty = function(field) {
		
		var val = "";
		
		if ($.type(field.val) == "function") {
			val = field.val();
		} else {
			val = field.value;
		};
		
		if (val.trim() == "") {
			return true;
		} else {
			return false;
		};
	};
	
	/**
	 * 필드가 숫자인지 체크한다.
	 */
	isNumber = function(field) {
		
		var val = "";
		
		if ($.type(field.val) == "function") {
			val = field.val();
		} else {
			val = field.value;
		};
		
		if (val == null || val == "") {
    		return false ;
    	};
    	for (var i = 0 ; i < val.length ; i++){
	    	var c = val.charCodeAt(i);
	       	if ( !(0x30 <= c && c <= 0x39)) {
	       		return false ;
	       	};
    	};
    	return true;
	};
	
	/** 
     * 메세지 공통처리 하기 
     * @param Gubun : C , U , D , S  
     * @return true : 확인 , false : 취소
     */
   msgConfirm = function(gubun) {
       var msg  = "처리하시겠습니까?";
       var pin = {};
       pin["C"] = "등록하시겠습니까?";
       pin["U"] = "수정하시겠습니까?";
       pin["D"] = "삭제하시겠습니까?";
       pin["S"] = "저장하시겠습니까?";
       if (typeof(gubun) != "undefined" && gubun != "") {
    	   if (typeof(pin[gubun]) != "undefined") {
    		   msg =  pin[gubun];
    	   }
       }
       //메세지 알림창 노출
       if (confirm(msg)) {
    	   return true;
       }
       return false;
	};
	
	/** 
     * 그리드의 처리후 성공 되면 알림창 띄어주기
     * @param Gubun : C , U , D , S  
     */
   msgSuccess = function(gubun) {
       var msg  = "처리되었습니다.";
       var pin = {};
       pin["C"] = "등록되었습니다.";
       pin["U"] = "수정되었습니다.";
       pin["D"] = "삭제되었습니다.";
       pin["S"] = "저장되었습니다.";
       if (typeof(gubun) != "undefined" && gubun != "") {
    	   if (typeof(pin[gubun]) != "undefined") {
    		   msg =  pin[gubun];
    	   };
       };
       //메세지 알림창 노출
       alert(msg);
   };
   
	/**
	 *  E-Mail Check
	 * @param field form.element
	 * @return boolean
	 */
	isNotValidEmail = function(field, message) {
		var checkflag = true;
		var retvalue;
		var val = "";
		
		if ($.type(field.val) == "function") {
			val = field.val();
		} else {
			val = field.value;
		};
		

		if(val == "") {
			retvalue = false;
		} else {
			if (window.RegExp) {
				var tempstring = "a";
				var exam = new RegExp(tempstring);
				if (tempstring.match(exam)) {
					var ret1 = new RegExp("(@.*@)|(\\.\\.)|(@\\.)|(^\\.)");
					var ret2 = new RegExp("^.+\\@(\\[?)[a-zA-Z0-9\\-\\.]+\\.([a-zA-Z]{2,3}|[0-9]{1,3})(\\]?)$");
					retvalue = (!ret1.test(val) && ret2.test(val));
				} else {
					checkflag = false;
				}
			} else {
				checkflag = false;
			}
			if (!checkflag) {
				retvalue = ( (val != "") && (val.indexOf("@")) > 0 && (val.index.Of(".") > 0) );
			}
		}
		if(retvalue) {
			return false;
		} else {
			if (message) {
				alert(message);
			} else {
				alert("이메일주소를 입력해주십시오.");
			}
			try {
				field.focus();
				field.select();
			} catch(e) {}
			return true;
		}
	};
	
	/**
	 *  주민번호 체크
	 * @param field form.element
	 * @return boolean
	 */
	isValidSsn = function(field, message){
    	var sum=0;
    	var val = "";
		
		if ($.type(field.val) == "function") {
			val = field.val();
		} else {
			val = field.value;
		};
    	
    	for(i=0;i<8;i++) { sum+=val.substring(i,i+1)*(i+2); }
    	
    	for(i=8;i<12;i++) { sum+=val.substring(i,i+1)*(i-6); }
    	
    	sum=11-(sum%11);
    	
    	if (sum>=10) { sum-=10; }
    	
    	if (val.substring(12,13) != sum || (val.substring(6,7) !=1 && val.substring(6,7) != 2)){
    	    if (message) {
				alert(message);
			} else {
				alert("주민등록번호에 오류가 있습니다. 다시 확인하십시오.");
			}
			try {
				field.focus();
				field.select();
			} catch(e) {}
	        return true;
    	}else{
    		return false;
    	}
	};
	
	/**
	 *  사업자 번호 체크
	 * @param field form.element
	 * @return boolean
	 */
	isValidPermit = function(field, message){
    	var sum=0;
    	var val = "";
		
		if ($.type(field.val) == "function") {
			val = field.val();
		} else {
			val = field.value;
		};
    	
		var sum = 0; 
		var getlist =new Array(10); 
		var chkvalue =new Array("1","3","7","1","3","7","1","3","5"); 
		for(var i=0; i<10; i++) { getlist[i] = val.substring(i, i+1); } 
		for(var i=0; i<9; i++) { sum += getlist[i]*chkvalue[i]; } 
		sum = sum + parseInt((getlist[8]*5)/10);  
		sidliy = sum % 10; 
		sidchk = 0; 
		if(sidliy != 0) { sidchk = 10 - sidliy; } 
		else { sidchk = 0; } 
    	
		if(sidchk != getlist[9]) {
    	    if (message) {
				alert(message);
			} else {
				alert("사업자등록번호에 오류가 있습니다. 다시 확인하십시오.");
			}
			try {
				field.focus();
				field.select();
			} catch(e) {}
	        return true;
    	}else{
    		return false;
    	}
	}
   
})(jQuery);