(function ($) {
	
	_login_callback = null;

	loginPopup = function() {		
		isLogin({
			login: function() {
				if (top._login_callback != null) {
					top._login_callback();
				} else {
					top.location.href = top.location.href;						
				};
			},
			logout: openLoginPopup
		});		
	};
	
	var openLoginPopup = function(p) {
		
		p = $.extend(false, {
			nomember: false
		}, p || {});
		
		var win = popup({
			url: "https://" + _SERVER_NAME + "/secure/login/loginPop." + _EXT,
			width: "480",
			height: p.nomember ? "390" : "300",	
			method: "post",
			winname: "_LOGIN_POPUP_",
			params: { 
				scheme: _SCHEME,
				nomember: p.nomember ? "Y" : "N"
			}
		});
	};
	
	logout = function() {
		var f = getCommonForm();
		var logout_action = "";
		
		if (_SSL) {
			logout_action = "/secure/login/logout." + _EXT;
		} else {
			logout_action = "/login/logout." + _EXT;
		};
		
		f.submit({
			iframe: true,
			action: logout_action,
			success: function(p) {
				//SSO의 경우 해당 사이트들의 쿠키값 삭제
				if ($.type(p.sso_group) == "string") {
					var groups = $.parseJSON(p.sso_group);
					$.each(groups, function(i, g) {
						var iframe = $("<iframe name=\"SSO_" + g.sso_domain + "\" id=\"SSO_" + g.sso_domain + "\" />");
						iframe.css({ position: 'absolute', top: '-1000px', left: '-1000px' });
						iframe.appendTo("body");
						
						var sso_action = "";
						if (_SSL) {
							sso_action = _SCHEME + "://" + g.sso_domain + "/secure/login/ssoReset.action";
						} else {
							sso_action = _SCHEME + "://" + g.sso_domain + "/login/ssoReset.action";
						};
						
						var f = $("<form name=\"FORM_" + g.sso_domain + "\" id=\"FORM_" + g.sso_domain + "\" method=\"post\"></form>").attr({
							target: "SSO_" + g.sso_domain,							
							action: sso_action
						});
						
						f.appendTo("body");
						f.submit();
					});
				};
				window.location.href = "http://" + _SERVER_NAME;
			},
			error: function(p) {
				alert(p.error_message);	
			}
		});
	};
	
	/**
	 * 로그인 여부를 반드시 확인하고 업무를 진행할 경우 사용한다. 로그인 되어야지 사용할 수 있는 action들은 모드 isLogin을 통하도록 한다.
	 * 
	 * isLogin(다음에 실행함 함수) : isLogin(fnCallbkac());
	 * 
	 */
	isLogin = function(callback) {
		
//		
//		if(typeof(callback) != "function"){
//
//			window.alert("callback 함수를 넘겨주시기 바랍니다.");
//			return;
//		}

		var action = "";
		
		if (_SSL) {
			action = "/secure/login/isLoginFr." + _EXT;
		} else {
			action = "/login/isLoginFr." + _EXT;
		};

		$.ajax({
			url: action,
			dataType: "json",
			data: {},
			success : function(data) {
				
				//로그인이 아니면 로그인 페이지로 rtn_url 포함하여 이동 한다.
				if (!data.login) {
					//window.location.href = "https://"+_SERVER_NAME+"/secure/login/initLogin.action?rtn_url="+encodeURI(location.href);	
					window.alert("로그인이 되어 있지 않습니다.");
					return;
				}else{
					if(typeof(callback) == "function"){
						callback();						
					}
				}
			},
			error : function(e){
				alert("로그인 체크 중 에러 발생!");
			}
		});
	};
	
	sso = function (p) {
		if ($.type(p.sso_group) == "string") {
			var groups = $.parseJSON(p.sso_group);
			$.each(groups, function(i, g) {
				var iframe = $("<iframe name=\"SSO_" + g.sso_domain + "\" id=\"SSO_" + g.sso_domain + "\" />");
				iframe.css({ position: 'absolute', top: '-1000px', left: '-1000px' });
				iframe.appendTo("body");
				
				var f = $("<form name=\"FORM_" + g.sso_domain + "\" id=\"FORM_" + g.sso_domain + "\" method=\"post\"></form>").attr({
					target: "SSO_" + g.sso_domain,
					action: "https://" + g.sso_domain + "/secure/login/sso.action"
				});
				f.append("<input type=\"hidden\" name=\"sso_domain\" value=\"" + g.sso_domain + "\">")
				f.append("<input type=\"hidden\" name=\"sso_id\" value=\"" + g.sso_id + "\">")
				f.appendTo("body");
				
				f.submit();							
			});
		};
	};
	
	/**
	 * 싱글 로그인 = 로그인 페이지에서만 체크
	 */
	getSingleInfo = function (){
		try {
			var installx	= new ActiveXObject("EPADM2.EpAdm2Ctrl.1");        
		        if(installx)
		        	installed = true;            
		        else
	        	installed = false;
		} catch(ex) {
			installed = false;
		}

		if (installed == true) {
			$("#singleObj").html("<OBJECT ID='EpAdm2 Control' name='EpAdmC' CLASSID='CLSID:C63E3330-049F-4C31-B47E-425C84A5A725'></OBJECT>");
			var rrtn = EpAdmC.GetSecureBox();

			if(rrtn != "") {
				
				var form = $("#loginForm");
				
				//싱글 회원가입이 안된 상태로 메인화면에서 로그인 버튼을 눌렀 을때 싱글로 로그인이 되어 있으면 로그인 화면만 보여준다.
				if( $("#login_method").val()== "SU") {
					$("#total_data").val(rrtn);
					return;
				}

				//1.웰스토리 몰일 경우 checkMySingle 에서 회원이 없으면 회원 가입 페이지로 이동 하지만 아닌 경우 로그인 화면만 보여준다.
				//2.맨 처음 접속시 checkMySingle 페이지 이동 후 웰스토리 몰이 아니면 singleJoin 값을 셋팅 다시 login 페이지 이동 했을 때 N 인지 Y인지 값을 확인한다.

				if(getCookie("singleJoin") != "N" || (getCookie("singleJoin") != "N" && $("#rtn_url").val() == "")){
					
					form.attr("action","https://"+_SERVER_NAME+"/secure/login/checkMySingle.action");
					form.attr("method","post");
					form.append("<input type='hidden' name='total_data' value='"+rrtn+"' />");
					form.append("<input type='hidden' name='login_method' value='"+$("#login_method").val()+"' />");
					
					form.submit();
					
				}//else{
		//			setCookie({name : "singleJoin", value : ""});
			//	}

				
				//	window.location.href = "https://""/secure/login/checkMySingle.action?total_data="+encodeURI(rrtn);

		  	}
		}
	}
	
	/**
	 * 싱글 로그인 = 로그인 페이지를 제외한 전페이지에서 체크
	 */
	commSingleInfo = function (){
		
		//게이트 페이지 이고 둘다 싱글 오프일때..
		if($("#gate").val() == "Y" && !_IS_SINGLE && !_IS_SINGLE){
			location.href= $("#rtn_url").val();
			return;
		}
		if(browser.type != "MSIE"){

			if(!_IS_LOGIN){
				window.location.href = "https://"+_SERVER_NAME+"/secure/login/initLogin.action";					
			}
			return;
		}
		
		//싱글 로그인이 된상태면 더이상 진행하지 않는다.
		if(_IS_SINGLE){
			
			if($("#gate").val() == "Y"){
				location.href= $("#rtn_url").val();
			}
			
			return;
		}

		try {
			var installx	= new ActiveXObject("EPADM2.EpAdm2Ctrl.1");        
		        if(installx)
		        	installed = true;            
		        else
	        	installed = false;
		} catch(ex) {
			installed = false;
		}
		
		if (installed == true) {

			$("#singleObj").html("<OBJECT ID='EpAdm2 Control' name='EpAdmC' CLASSID='CLSID:C63E3330-049F-4C31-B47E-425C84A5A725'></OBJECT>");

			var rrtn = EpAdmC.GetSecureBox();
			
//			if($("#test_total_data").val() == "Y" ){
//				rrtn="";			
//				_IS_LOGIN = false;
//				alert(_IS_LOGIN)
//			}

			if(!_IS_LOGIN && rrtn != "") {

				 $("#single_data").val(rrtn);
				 $("#total_data").val(rrtn);
				
				if (_SSL) {
					action = "/secure/login/checkMySingleFr." + _EXT;
				} else {
					action = "/login/checkMySingleFr." + _EXT;
				};

				$.ajax({
					type: 'POST',
					url: action,
					dataType: "json",
					data: {total_data : rrtn},
					async: false,
					success : function(data) {

						//패스워드 초기화 여부. 초기화 되어 있으면 비밀번호 변경 페이지 이동.
						if(data.initPwd){
							var form = $("<form />");
							form.attr("action","https://"+_SERVER_NAME+"/secure/login/initPwdLogin.action");
							form.attr("method","post");
							form.append("<input type='hidden' name='pinit_code' value='"+data.initCode+"' />");
							form.append("<input type='hidden' name='login_id' value='"+data.loginId+"' />");	
							$("body").append(form);
							form.submit();							
							return;
						}		                
									
//						if($("#test_total_data").val() == "Y" ){
//							alert("싱글 처리 됌? ;as" +data.isSingle)
//						}
						//싱글 로그인이면.. 새로고침 해서 로그인 상태로 변경
						if (data.isSingle) {
							
							if($("#gate").val() == "Y"){
								location.href= $("#rtn_url").val();
							}else{
								location.reload();								
							}

						}else{
							//웰스토리몰  type_cd = 10
							//fc site_no=1304000759;

							if(data.biz_type == "20" && data.site_no != "1304000759" ){
								window.location.href = "https://"+_SERVER_NAME+"/secure/login/initLogin.action";	
							}
						}
						
						
					},
					error : function(e){
						alert("싱글 정보가 올바르지 않습니다. 브라우져 재 기동하시거나 로그인 페이지를 바랍니다.");
						window.location.href = "https://"+_SERVER_NAME+"/secure/login/initLogin.action";	
						return;
					}
				});
				
				
		  	}else if(!_IS_LOGIN & rrtn == ""){
		  		//로그인이 안되어 있을 경우 
				window.location.href = "https://"+_SERVER_NAME+"/secure/login/initLogin.action";	
		  	}else{
				if($("#gate").val() == "Y"){
					location.href= $("#rtn_url").val();
				}
		  	}
			
		}else{
			
			if($("#gate").val() == "Y"){
				location.href= $("#rtn_url").val();
			}
			
			if(!_IS_LOGIN){
				window.location.href = "https://"+_SERVER_NAME+"/secure/login/initLogin.action";	
			}
		}
	}	
	
	
	/***
	 * 로그인
	 */

	fnLogin = function(){

		
		if($("#login_id").val() == "아이디"){
			alert("아이디를 입력하세요!");
			return;
		}else if($("#pwd").val() == "비밀번호"){
			alert("비밀번호를 입력하세요!");
			return;
		}
		
		var form = $.form("#loginForm");
		form.submit({
			iframe: true,
			action: "https://"+_SERVER_NAME+"/secure/login/login.action",
			success: function(p) {
				
				if($("#rtn_url").val() != "") {
					window.location.href = $("#rtn_url").val();
					return;
				}
				
				//로그인 성공
				if(p.agree_yn == "N"){
					window.location.href = "https://"+_SERVER_NAME+"/secure/member/initMemberJoin.action";										
				}else{
					
					//if( _SITE_TYPE == 'SG' ){
					//	window.location.href = "http://"+_SERVER_NAME+"/main/abc.action";	
					//}else{
						window.location.href = "http://"+_SERVER_NAME+"/main/initMain.action";	
					//}
				}
			},
			error: function(p) {
				
				if(p.error_type == "kr.co.overpass.exception.UserException") {
					window.alert(p.error_message);
					
					if("회원으로 가입되어 있지 않습니다." == p.error_message && $("#total_data").val() != ""){
						form.attr("action","https://"+_SERVER_NAME+"/secure/login/joinMySingle.action");
						form.attr("method","post");				
						form.submit();
					}else{
						$("#login_id").val("");
						$("#pwd").val("");
					}		
					
					return;
				}else if(p.error_type == "kr.co.overpass.frm.exception.PasswordInitException") {
					
					form.attr("action","/secure/login/initPwdLogin.action");
					form.attr("method","post");
					form.append("<input type='hidden' name='pinit_code' value='"+p.error_message+"' />");
					form.append("<input type='hidden' name='login_id' value='"+$("#login_id").val()+"' />");	
					form.submit();
					return;

				}
			}
		});
	}	
	
	login = function(){
		window.location.href = "https://"+_SERVER_NAME+"/secure/login/initLogin.action?rtn_url=/main/initMain.action&login_method=SU";		
	}
	
})(jQuery);
