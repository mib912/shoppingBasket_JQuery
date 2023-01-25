(function($){
	
    var PAY_MEAN_CDS = {
    	"11": "11",		// 신용카드
    	"12": "12",		// 실시간계좌이체
    	"13": "13",		// 가상계좌
    	"14": "14",		// 휴대폰
    	"15": "15"		// 모카페이 신용카드
    };
    
	/**
	 * 이니시스 form fields
	 */
	var inicis_fields = {
		 _inicis_onoff: "",	
		 _inicis_idx: 0,
		 _inicis_gopaymethod: "",				//필수:결제수단 셋팅
		 _inicis_goodname: "",					//필수
		 _inicis_buyername: "",
		 _inicis_buyeremail: "",
		 _inicis_parentemail: "",
		 _inicis_buyertel: "",
		 _inicis_acceptmethod: "SKIN(ORIGINAL):HPP(2):no_receipt",
		 _inicis_currency: "WON",				//필수
		 _inicis_ini_logoimage_url: "",
		 _inicis_ini_menuarea_url: "",
		 _inicis_ini_encfield: "",
		 _inicis_ini_certid: "",
		 _inicis_uotainterest: "",
		 _inicis_paymethod: "",
		 _inicis_ini_onlycardcode: "",
		 _inicis_cardcode: "",
		 _inicis_cardquota: "", 
		 _inicis_rbankcode: "" ,
		 _inicis_reqsign: "DONE",
		 _inicis_encrypted: "", 
		 _inicis_sessionkey: "",
		 _inicis_uid: "",    
		 _inicis_sid: "",
		 _inicis_cardnumber: "",
		 _inicis_cardexpy: "",
		 _inicis_cardexpm: "",
		 _inicis_authfield1: "",
		 _inicis_authfield2: "",
		 _inicis_quotaInterest: "",
		 _inicis_cardcomp_no: "",
		 _inicis_noint_divi_cd: "",
		 _inicis_price: "",
		 _inicis_ssn: "",
		 _inicis_oid: "",	//상점 주문번호
		 _inicis_dtinput: "",	//입금예정일
		 _inicis_tminput: "2359",	//입금예정시간
		 _inicis_vcdbank: "",	//입금은행코드
		 _inicis_nminput: "",	//입금자이름
		 _inicis_cell_no: "",	//결제 휴대폰 번호
		 _inicis_hppauthnumber: "",	//휴대폰 인증번호
		 _inicis_hppcotype: "",
		 _inicis_hppsid: "",
		 _inicis_hppphoneid: "",
		 _inicis_hppauthserial: "",
		 _inicis_cmcm_divi_cd: "",
		 _inicis_version: "5000",
		 _inicis_promo_no: "",
		 _inicis_card_pnt_use_yn: "N"
	};
	
	
	/**
	 * 모카페이 form fields
	 */
	var mocapay_fields = {
		 _mocapay_onoff: "ON",	
		 _mocapay_idx: 0,
		 _mocapay_goodname: "",					//필수
		 _mocapay_buyername: "",
		 _mocapay_buyeremail: "",
		 _mocapay_parentemail: "",
		 _mocapay_buyertel: "",
		 _mocapay_currency: "WON",				//필수
		 _mocapay_uotainterest: "",
		 _mocapay_paymethod: "",
		 _mocapay_ini_onlycardcode: "",
		 _mocapay_cardcode: "",
		 _mocapay_cardquota: "", 
		 _mocapay_rbankcode: "" ,
		 _mocapay_reqsign: "DONE",
		 _mocapay_cardnumber: "",
		 _mocapay_cardexpy: "",
		 _mocapay_cardexpm: "",
		 _mocapay_authfield1: "",
		 _mocapay_authfield2: "",
		 _mocapay_quotaInterest: "",
		 _mocapay_cardcomp_no: "",
		 _mocapay_noint_divi_cd: "",
		 _mocapay_price: "",
		 _mocapay_ssn: "",
		 _mocapay_oid: "",	//상점 주문번호
		 _mocapay_dtinput: "",	//입금예정일
		 _mocapay_tminput: "2359",	//입금예정시간
		 _mocapay_vcdbank: "",	//입금은행코드
		 _mocapay_nminput: "",	//입금자이름
		 _mocapay_cell_no: "",	//결제 휴대폰 번호
		 _mocapay_hppauthnumber: "",	//휴대폰 인증번호
		 _mocapay_hppcotype: "",
		 _mocapay_hppsid: "",
		 _mocapay_hppphoneid: "",
		 _mocapay_hppauthserial: "",
		 _mocapay_cmcm_divi_cd: "",
		 _mocapay_promo_no: "",
		 _mocapay_card_pnt_use_yn: "N"
	};
	
	var mocapay_parameter = { 
		PG_SHOP_ID : "",			//	MOCA PAY PG에서 발급받은 가맹점 아이디.			*필수
		PG_SHOP_NAME : "웰스토리몰",	//	결제창이 보여지는 텍스트							
		CP_ORDER_ID	: "",			//	가맹점 주문번호.								*필수
		CP_ORDER_DATE : "",			//	결제요청일. 포맷:YYYYMMDD
		CP_ORDER_AMOUNT : "",		//	상품결제 금액. 1000원 이상.						*필수
		CP_ORDER_SELLER : "",		//	가맹점 영업담담당자 이름.
		CP_USER_ID : "",			//	고객 아이디. 가맹점의 회원아이디.					*필수
		CP_USER_NAME : "",			//	고객명										*필수
		CP_USER_IP : "",			//	고객 아이피									*필수
		CP_USER_PHONE : "",			//	사용자 연락처. 가맹점 회원의 연락처.
		CP_USER_EMAIL : "",			//	고객 이메일. 가맹점 회원의 이메일.
		SALE_FG : "01",				//	거래구분 (00:구분없음 01:신용카드 02:계좌이체)		*필수
		SVC_AMT : "0000000000",		//	봉사료(없으면0으로 채움)						*필수
		TAX : "0000000000",			//	세금(없으면0으로 채움)							*필수
		INS_MM : "00",				//	할부개월수(없으면 00)							*필수
		CARD_CD : "   ",			//	금융사코드( 없으면 스패이스(3자리) 채움)			*필수
		POINT_YN : "N",				//	포인트사용여부(N:미사용 Y:사용)					*필수
		POINT_FG : "00",			//	포인트구분(00:기본 01:제휴)					*필수
		USE_POINT : "0000000000",	//	사용포인트(기본:0000000000)					*필수
		CARD_SHOP_ID : "",			//	카드사에서 발급한 가맹점아이디
		ITEM_CNT : "",				//	구입품목수.									*필수
		SALE_INFO : "",				//	구매정보 상품코드|상품명|단가|수량|금액 + CR(0x0D)	*필수
		CP_GOODS_DATE : "",			//	상품배송예정일. 포맷:YYYYMMDD
		PG_PAYMENT_TYPE : "MS",		//	고정 ‘MS’									*필수
		//	OPENNER(value : opener_win) : 결과를 오프너에게 전달,	SELF(value : _UBIPAY_SELF) : 결과를 자신에게 전달,	OPENNER.TOP(value : top_win) : 결과를 오프너 최상 프레임에 전달
		CP_SUCCESS_URL : _SCHEME+_SERVER_NAME+"/payment/forward.dummy_ub.action",		//	결제요청 성공시 리턴받을 페이지 주소	중요. 결제요청성공시 리턴주소로 가맹점주문번호(CP_ORDER_ID), PG승인번로(PG_ORDER_ID)를 포함하여 파라미터 전달.
		CP_SUCCESS_TYPE : "_UBIPAY_SELF",// 리턴 타입
		CP_FAIL_URL : _SCHEME+_SERVER_NAME+"/payment/forward.dummy_fail.actionn",			//	결제요청 실패시 리턴받을 페이지 주소
		CP_FAIL_TYPE : "_UBIPAY_SELF",	// 리턴 타입
		CP_CANCEL_URL :  _SCHEME+_SERVER_NAME+"/payment/forward.dummy_cancel.action",			//	결제요청 취소시 리턴받을 페이지 주소	
		CP_CANCEL_TYPE : "_UBIPAY_SELF",	// 리턴 타입
		CP_AUTH_DATA : "", 			// MD5값(CP_ORDER_AMOUNT + CP_ORDER_ID + CP_HASH_CODE)	*필수
		expire_date_chk : "5",		//	구매만료시간 (선택없을시 가맹점등록시에 셋팅한 값으로 구성됨)  5 : 결제요청 후 5분, 10 : 결제요청 후 10분, 30 : 결제요청 후 30분, 60 : 결제요청 후 60분, 1440 : 결제요청 후 1440분	*필수
		SHOP_ADD : ""				//	가맹점추가사용필드 리턴시 ‘|’구분자로 해서 최대 10개를 묶어 다시 리턴해줌			*필수
	};
	


	var checkCommonValidation = function(f) {
		//공통 유효성 체크
		
		if (f.site_no.value == "") {
			alert("사이트번호를 입력하세요.");
			return false;
		};
		if (f.good_nm.value == "") {
			alert("상품명을 입력하세요.");
			return false;
		};
		if (f.orderer_nm == "") {
			alert("구매자명을 입력하세요.");
			return false;
		};
		
		var cell_no_1 = f.cell_no_1.value;
		var cell_no_2 = f.cell_no_2.value;
		var cell_no_3 = f.cell_no_3.value;
		var cell_no = "";
		
		var tel_no_1 = f.tel_no_1.value;
		var tel_no_2 = f.tel_no_2.value;
		var tel_no_3 = f.tel_no_3.value;
		var tel_no = "";
		
		if ( cell_no_1 != "" && cell_no_2 != "" && cell_no_3 != "" ) {
			cell_no = cell_no_1 + "-" + cell_no_2 + "-" + cell_no_3;
		};
		
		if ( tel_no_1 != "" && tel_no_2 != "" && tel_no_3 != "" ) {
			tel_no = tel_no_1 + "-" + tel_no_2 + "-" + tel_no_3;
		};
		
		if ( cell_no == "" && tel_no == "" ) {
			alert("전화번호를 입력하세요.");
			return false;
		};
		
		if (f.email.value == "") {
			alert("이메일을 입력하세요.");
			return false;
		};
		return true;
	};
	
	//이니시스 플러그인 호출
	var callPlugin = function(p) {

		if (p.pay_amt <= 0) {
			alert("금액이 0원 이하 입니다.");
			return false;
		};		
		
		//가상계좌일 경우
        if(p.pay_mean_cd == "13"){

    		//가상계좌일 경우 현금 영수증 미발급(차단)        	
        	p.acceptmethod = "no_receipt";

        	//결제금액이 오만원 이하일 경우 폼페이 방식으로 결제한다.
    		if (p.pay_amt < 50000) {
    			p.onoff ="OFF";
    		//오만원 이상일 경우 플러그인으로 에스크로 결제
    		}else{
    			p.onoff ="ON";
    			//입금 희망 날짜 설정 :  결제 다음날로 지정.    			
    			p.acceptmethod  = p.acceptmethod +":Vbank("+p.expiry_date+"):vbanknoreg";
    		};		
        }
        
        //삼성카드라면...
        if(p.cardcomp_no == 12){
			p.acceptmethod  = p.acceptmethod +":CardPoint";        	
        }
        

		var result = false;

		$.ajax({
			url: "/ifs/init.action",
			type: "POST",
			dataType: "json",
			data: { 
				price: p.pay_amt,
				noint_divi_cd: p.noint_mon == 0 || p.noint_mon == "" ? "10" : p.noint_divi_cd , 
			//	quotabase: p.noint_mon == 0 || p.noint_mon == "" ? "일시불" : p.noint_mon + "개월",
				quotabase: p.noint_mon == 0 || p.noint_mon == "" ? "일시불" : p.noint_mon,		
				pay_mean_cd: p.pay_mean_cd,
				cardcomp_no: p.cardcomp_no,
				acceptmethod: p.acceptmethod,
				card_pnt_use_yn: p.card_pnt_use_yn,
				site_no: p.site_no,
				cell_no: p.cell_no,
				ssn: p.ssn,
				buyername: p.buyername,
				buyeremail: p.buyeremail,
				goodname: p.goodname,
				onoff: p.onoff,				
				pay_idx: p.pay_idx
			},
			async: false,
			success : function(data) {	//이니페이 플러그인의 암호값 전달
				p.ini_encfield = data.ini_encfield;
				p.ini_certid = data.ini_certid;
				p.oid = data.oid;

				result = openPlugin(p);
			},
			error: function () {
				alert("죄송합니다. 결제모듈 실행시 오류가 발생하였습니다. 잠시후 다시 시도해 주세요.");
			}
		});
		return result;
	};
	
	var openPlugin = function(p) {
		var result = false;
		
		var fields = $.extend({}, inicis_fields, { 
			_inicis_goodname: p.goodname,
			_inicis_buyername: p.buyername,
			_inicis_buyeremail: p.buyeremail,
			_inicis_buyertel: p.buyertel,
			_inicis_onoff: p.onoff,
			_inicis_promo_no: p.promo_no,
			_inicis_card_pnt_use_yn: p.card_pnt_use_yn,
			_inicis_cardcomp_no: p.cardcomp_no,
			_inicis_noint_divi_cd: p.noint_divi_cd,
			_inicis_acceptmethod: p.acceptmethod,
			_inicis_price: p.pay_amt,
			_inicis_oid: p.oid
		});
		
		
		if (p.onoff == "ON") {	//플러그인 방식
			var inipay_form = $("<form />").attr({ method: "POST" });

			$.each(fields, function(name) {	//기본값 셋팅
				var input = $("<input type='hidden' name='"+name.replace("_inicis_", "")+"'  value='"+fields[name]+"' />");
				inipay_form.append(input);
			});

			inipay_form.each(function() {
				var f = this;
				f.ini_encfield.value = p.ini_encfield;
				f.ini_certid.value = p.ini_certid;
				f.gopaymethod.value = p.gopaymethod;
				
				//월렛일 경우 ini_onlycardcode 파라메터가 들어가면 결제 수단이 없다는 에러 
				if (p.gopaymethod != "onlyswallet") {
					f.ini_onlycardcode.value = p.cardcomp_no;
				}
				
				if (MakePayMessage(f)) {
					$.each(fields, function(name) {
						$(":input[name=" + name + "]", p.form).eq(p.pay_idx).val(f.elements[name.replace("_inicis_", "")].value);												
					});
					result = true;
				} else {
					if (IsPluginModule()) {
						alert("결제를 취소하셨습니다.");
					};
				};
			});
		} else {	//폼페이 방식
			if (p.pay_mean_cd == "11") {	//신용카드
				fields["_inicis_paymethod"] = "Card";
				fields["_inicis_cardnumber"] = p.card_no;
				fields["_inicis_cardexpy"] = p.aval_term.substring(2, 4);
				fields["_inicis_cardexpm"] = p.aval_term.substring(4);
				fields["_inicis_authfield1"] = p.ssn2;
				fields["_inicis_authfield2"] = p.card_pw1;
				fields["_inicis_cardquota"] = p.noint_mon.zf(2);
				fields["_inicis_quotaInterest"] = p.noint_divi_cd == "30" ? "1" : "0" ;
				fields["_inicis_price"] = p.pay_amt ;
			} else if (p.pay_mean_cd == "13") {	//가상계좌
				fields["_inicis_ssn"] = p.ssn;
				fields["_inicis_oid"] = p.oid;
				fields["_inicis_price"] = p.pay_amt ;
				fields["_inicis_dtinput"] = p.expiry_date;
				fields["_inicis_vcdbank"] = p.bank_cd;
				fields["_inicis_nminput"] = p.morc_nm;	
		/*	} else if (p.pay_mean_cd == "14") {	//휴대폰
				fields["_inicis_hppauthnumber"] = p.hppauthnumber;
				fields["_inicis_ssn"] = p.ssn;
				fields["_inicis_price"] = p.pay_amt ;				
				fields["_inicis_hppcotype"] = p.hppcotype;
				fields["_inicis_hppsid"] = p.hppsid;
				fields["_inicis_hppphoneid"] = p.hppphoneid;
				fields["_inicis_hppauthserial"] = p.hppauthserial;
				fields["_inicis_cell_no"] = p.cell_no;
				fields["_inicis_cmcm_divi_cd"] = p.cmcm_divi_cd;
			};
		*/	
				
			} else if (p.pay_mean_cd == "14") {	//삼성월앳 [everland는 14로사용]
				fields["_inicis_hppauthnumber"] = p.hppauthnumber;
				fields["_inicis_ssn"] = p.ssn;
				fields["_inicis_price"] = p.pay_amt ;				
				fields["_inicis_hppcotype"] = p.hppcotype;
				fields["_inicis_hppsid"] = p.hppsid;
				fields["_inicis_hppphoneid"] = p.hppphoneid;
				fields["_inicis_hppauthserial"] = p.hppauthserial;
				fields["_inicis_cell_no"] = p.cell_no;
				fields["_inicis_cmcm_divi_cd"] = p.cmcm_divi_cd;
			};
							
			$.each(fields, function(name, value) {
				$(":input[name=" + name + "]", p.form).eq(p.pay_idx).val(value);			
			});
			
			result = true;
		};
		return result;
	};
	
	preOrder = function(p) {
		p = $.extend({ form: null, pays: null }, p);
		if (p.form == null) {
			alert("form을 지정하세요!");
			return false;
		};
		
		if (p.form == "undefined" || p.form == null) {
			alert("올바른 form을 지정하세요!");
			return false;
		};
		if ($.type(p.pays) != "object") {
			alert("결제 정보가 올바르지 않습니다[0].");
			return false;
		}
		
		var f = p.form;
		
		var pay_mean_cds = $(":input[name=pay_mean_cd]", f);
		var pay_mean_cd_yns = $(":input[name=pay_mean_cd_yn]", f);
		var pay_mean_ids = $(":input[name=pay_mean_id]", f);
		var pay_amts = $(":input[name=pay_amt]", f);
		
		if (pay_mean_cds.length != pay_mean_cd_yns.length || pay_mean_cds.length != pay_mean_ids.length) {
			alert("결제 정보가 올바르지 않습니다[1].");
			return false;
		};
		
		//결제 공통 사항 검사
		if (!checkCommonValidation(f)) {
			return false;
		};
		
		var cell_no = f.cell_no_1.value + "" + f.cell_no_2.value + "" + f.cell_no_3.value; 
		var tel_no = f.tel_no_1.value + "" + f.tel_no_2.value + "" + f.tel_no_3.value;
		
		//form내의 모든 결제 수단에 대해서 이니시스 관련 field들을 생성
		var pays = [];
		for (var i = 0 ; i < pay_mean_cds.length ; i++ ) {
			
			var pay = $.extend({
				form: f,
				pay_mean_cd: pay_mean_cds[i].value,
				pay_mean_cd_yn: pay_mean_cd_yns[i].value,
				pay_amt: pay_amts[i].value,
				gopaymethod: "",
				goodname: f.good_nm.value,
				buyername: f.orderer_nm.value,
				buyeremail: f.email.value,
				buyertel: cell_no != "" ? cell_no : tel_no,
				noint_divi_cd: "", 
				noint_mon: "", 
				site_no: f.site_no.value, 
				pay_idx: i, 
				onoff: "ON",
				if_yn: "Y",
				promo_no: "",
				card_pnt_use_yn: "N"
			}, p.pays[pay_mean_ids[i].value]);
			
			if (pay.pay_mean_cd in PAY_MEAN_CDS && pay.pay_mean_cd_yn == "Y" && pay.if_yn == "Y") {	//유효성 검사 및 정보 셋팅
				if (pay.pay_mean_cd == "11") {	//신용카드
					pay.gopaymethod = "onlycard";
					
					/*if (pay.noint_mon == "") {
						alert("할부개월을 선택하세요.");
						return false;
					};	*/					
					if (pay.noint_divi_cd == "") {
						alert("무이자 구분을 선택하세요.");
						return false;
					};
					
					if (pay.onoff == "ON") {	//플러그인 방식
						if (pay.cardcomp_no == "") {
							alert("카드를 선택하세요.");
							return false;
						};						
					} else if (pay.onoff == "OFF") {	//Keyin방식
						if (pay.card_no == "") {
							alert("신용카드 번호를 입력하세요.");
							return false;
						};
						if (pay.aval_term == "") {
							alert("유효기간을 입력하세요.");
							return false;
						};
						if (pay.ssn2 == "") {
							alert("주민번호 뒷자리를 입력하세요.");
							return false;
						};
					};
				} else if (pay.pay_mean_cd == "12") {
					pay.gopaymethod = "onlydbank";	
				} else if (pay.pay_mean_cd == "13") {
					pay.gopaymethod = "onlyvbank";
					
					if(pay.onoff == "" || pay.onoff == null){
						pay.onoff = "OFF";
					}
					
					if(pay.onoff == "OFF") {

						if (pay.bank_cd == "") {
							alert("입금은행코드를 입력하세요.");
							return false;
						};						
					}

					if (pay.bank_cd == "") {
						alert("입금은행코드를 입력하세요.");
						return false;
					};
					if (pay.expiry_date == "") {
						alert("입금예정일을 입력하세요.");
						return false;
					}; 
					if (pay.morc_nm == "") {
						alert("입금자이름을 입력하세요.");
						return false;
					};
				} else if (pay.pay_mean_cd == "14") { //삼성 월앳
					pay.gopaymethod = "onlyswallet";
					if (pay.onoff == "OFF") {
						if (pay.cmcm_divi_cd == "") {
							alert("이동통신사를 입력하세요.");
							return false;
						};
						if (pay.ssn == "") {
							alert("주민등록번호를 입력하세요.");
							return false;
						};
						if (pay.cell_no == "") {
							alert("핸드폰번호를 입력하세요.");
							return false;
						};
						if (pay.cell_cert_no == "") {
							alert("인증번호를 입력하세요.");
							return false;
						};
					};
				};
			};
			pays.push(pay);
		};
		
		
		var result = false;
		
		//이 시점에서 form내의 이니시스 관련 필드들을 초기화 한다.
		$.each(inicis_fields, function(name, value) {
			$(":input[name=" + name + "]", f).remove();
		});
		
		//이니시스 결제 할때는 모카페이 필드를 전부 제거 한다.
		$.each(mocapay_fields, function(name, value) {
			$(":input[name=" + name + "]", f).remove();
		});
		
		var $f = $(p.form);
		
		for (var i = 0 ; i < pays.length ; i++) {
			var pay = pays[i];

			//이니시스 관련 필드값 삽입
			$.each(inicis_fields, function(name) {
				var input = $("<input name='"+name+"' type='hidden'/>");
				$f.append(input);
			});
			//인터페이스 여부 셋팅
			var input = $("<input name='_if_yn' value='"+pay.if_yn+"' type='hidden'/>");

			$f.append(input);

			if (pay.pay_mean_cd_yn == "Y" && pay.if_yn == "Y" && $.type(PAY_MEAN_CDS[pay.pay_mean_cd]) == "string") {
				result = callPlugin(pay);
				if (!result) {
					return false;
				};
			} else {
				result = true;
			};

		};
		
		return result;
	};
	
	var _cert_hpp = false;
	
	requestCellCertNo = function(p) {
		
		var result = null;
		
		if (_cert_hpp) {
			alert("인증번호 요청중 입니다.");
			return false;
		};
		
		p = $.extend({ form: null, cmcm_divi_cd: "", ssn: "", cell_no: "", pay_amt: "" }, p);
		if (p.form == null) {
			alert("form을 지정하세요!");
			return false;
		};
		
		if (p.form == "undefined" || p.form == null) {
			alert("올바른 form을 지정하세요!");
			return false;
		};
		
		if (p.cmcm_divi_cd == "") {
			alert("이동통신사를 입력하세요.");
			return false;
		};
		if (p.ssn == "") {
			alert("주민등록번호를 입력하세요.");
			return false;
		};
		if (p.cell_no == "") {
			alert("핸드폰번호를 입력하세요.");
			return false;
		};
		if (p.pay_amt == "") {
			alert("결제금액을 입력하세요.");
			return false;
		};	
		
		var f = p.form;
		
		//결제 공통 사항 검사
		if (!checkCommonValidation(f)) {
			return false;
		};
		
		_cert_hpp = true;
		
		$.ajax({
			url: "/ifs/requestCellCertNo.action",
			type: "POST",
			dataType: "json",
			data: {
				site_no: f.site_no.value,
				pay_amt: p.pay_amt,
				cell_no: p.cell_no,
				ssn: p.ssn,
				buyername: f.orderer_nm.value,
				buyeremail: f.email.value,
				goodname: f.good_nm.value
			},
			async: false,
			success : function(data) {	//이니페이 플러그인의 암호값 전달
				alert("인증번호가 전송되었습니다. 2분 안에 인증번호를 입력하세요.");
				result = {
					hppcotype: data.hppcotype,
					hppsid: data.hppsid,
					hppphoneid: data.hppphoneid,
					hppauthserial: data.hppauthserial
				};				
				_cert_hpp = false;
			},
			error: function () {
				alert("죄송합니다. 핸드폰 인증번호 요청중 오류가 발생하였습니다.");
				_cert_hpp = false;
			}
		});
		
		return result;
	};
	
	
	queryAccount = function(obj,callback) {
		
		/** 아이프레임 아이디 */
		var _IFRM_ID = "CALL_OVERPASS_IFRM_QUERY_ACCOUNT";
		
		/** 아이프레임에 보낼 폼 아이디 */
		var _TFORM_ID = "CALL_OVERPASS_TFORM_QUERY_ACCOUNT";
		
		
		/** 옵션 */
		var config = {
			url : "/ifs/queryResult.action",
			method : "post",
			data : {}
		};
		
		
		var createIfrm = function ($o) {

			var proxyIfrmName = getElementRename(_IFRM_ID);

			var ifrmHtml  = '';
			ifrmHtml += '<iframe id="'+proxyIfrmName+'" name="'+proxyIfrmName+'" ';
			ifrmHtml += ' style="display:none"></iframe> ';
			$(ifrmHtml).prependTo("body");

			createTempForm($o,proxyIfrmName);

		};
		
		var createTempForm = function ($o,ifrmId) {
			
			var proxyFormName = getElementRename(_TFORM_ID);
			var tFormHtml  = "";
			tFormHtml += "<form id=\""+proxyFormName+"\" ";
			tFormHtml += " action=\""+$o.url+"\" ";
			tFormHtml += " method=\""+$o.method+"\" target=\""+ifrmId+"\" > ";

			for ( var key in $o.data) {
				tFormHtml += "<input type=\"hidden\" name=\""+key+"\" value=\""+($o.data[key])+"\" /> ";
			}
			
			tFormHtml += "</form> ";
			$(tFormHtml).prependTo("body");
			
			var proxyTform = $("#"+proxyFormName);
			proxyTform.submit();

			var tIfrm = $("#"+ifrmId);
			

			
			tIfrm.load(function(){
				
				if (!JSON) {
					window.alert("JSON라이브 러리가 존재 하지 않습니다.");
					return;
				}
				
				callback(JSON.parse($(this).contents().text()));
				proxyTform.remove();
				tIfrm.remove();
				
			});

			//iframe onload 일때.. 엘리먼트를 지워줘야 하는데 안먹힘.. 일단 임시로.. 
			
		};
		
		
		var getElementRename = function (name) {
			
			var cdate = new Date();
			var h=addZero(cdate.getHours(),2);
			var m=addZero(cdate.getMinutes(),2);
			var s=addZero(cdate.getSeconds(),2);
			var ms=addZero(cdate.getMilliseconds(),3);
			var rename = name+h+m+s+ms;
	
			return rename
		};
		
		
		var addZero = function (x,n) {
			if (x.toString().length<n) 
			{
				x="0" + x;
			}
			return x;
		};
		
		
		var fncEnCode = function (param)
		 
		{		 
		    var encode = '';
		 
		    for(i=0; i<param.length; i++)
		 
		    {		 
		        var len  = ''+param.charCodeAt(i);		 
		        var token = '' + len.length;		 
		        encode  += token + param.charCodeAt(i);		 
		    }		 

		    return encode;		 
		};
		
		
		var $o = $.extend(config,obj);
		
		
		$.ajax({
			url:"/ifs/queryResult.action",
			dataType: "json",
			data: $o.data,
			async: false,
			success : function(data) {
				
				$o.url = data.url;
				$o.data.mid = data.mid;
				$o.data.rltURL = data.rltURL;
				createIfrm($o);

			},
			error:function(request,status,error){
		        alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		    }

		});
		
	}
	
	
	//모카페이 통신 URL
	var _MOCAPAY_URL = (_IS_REAL) ? "https://pg.ubpay.com/UBPAY_PAYMENT.ASP" : "http://tpg.ubpay.com/UBIPAY_PAYMENT.ASP";
	
	/**
	 * 모카페이 결제.
	 */
	mpPreOrder = function(p){
		
		p = $.extend({ form: null, pays: null }, p);
		if (p.form == null) {
			alert("form을 지정하세요!");
			return false;
		};
		
		if (p.form == "undefined" || p.form == null) {
			alert("올바른 form을 지정하세요!");
			return false;
		};
		if ($.type(p.pays) != "object") {
			alert("결제 정보가 올바르지 않습니다[0].");
			return false;
		}
		p.onoff="ON";
		
		var f = p.form;
		
		var pay_mean_cds = $(":input[name=pay_mean_cd]", f);
		var pay_mean_cd_yns = $(":input[name=pay_mean_cd_yn]", f);
		var pay_mean_ids = $(":input[name=pay_mean_id]", f);
		var pay_amts = $(":input[name=pay_amt]", f);
		
		if (pay_mean_cds.length != pay_mean_cd_yns.length || pay_mean_cds.length != pay_mean_ids.length) {
			alert("결제 정보가 올바르지 않습니다[1].");
			return false;
		};
		

		var cell_no = ""; 
		var tel_no = "";
		
		//form내의 모든 결제 수단에 대해서 이니시스 관련 field들을 생성
		var pays = [];
		for (var i = 0 ; i < pay_mean_cds.length ; i++ ) {
			
			var pay = $.extend({
				form: f,
				pay_mean_cd: pay_mean_cds[i].value,
				pay_mean_cd_yn: pay_mean_cd_yns[i].value,
				pay_amt: pay_amts[i].value,
				gopaymethod: "",
				goodname: f.good_nm.value,
				buyername: f.orderer_nm.value,
				//buyeremail: f.email.value,
				noint_divi_cd: "", 
				noint_mon: "", 
				site_no: f.site_no.value, 
				pay_idx: i, 
				onoff: "ON",
				if_yn: "Y",
				promo_no: "",
				card_pnt_use_yn: "N"
			}, p.pays[pay_mean_ids[i].value]);
			
			
			if (pay.pay_mean_cd in PAY_MEAN_CDS && pay.pay_mean_cd_yn == "Y" && pay.if_yn == "Y") {	//유효성 검사 및 정보 셋팅
				if (pay.pay_mean_cd == "15") {	//모카페이 신용카드
					pay.gopaymethod = "onlycard";					

				}
			};
			pays.push(pay);
		};
		
		
		var result = false;
		
		//이 시점에서 form내의 모카페이 관련 필드들을 초기화 한다. //기존에 있던 필드를 전부 날린다. 
		$.each(mocapay_fields, function(name, value) {
			$(":input[name=" + name + "]", f).remove();
		});
		
		//모카페이 결제 할때는 이니시스 필드를 전부 제거 한다.
		$.each(inicis_fields, function(name, value) {
			$(":input[name=" + name + "]", f).remove();
		});
		
		var $f = $(p.form);
		
		for (var i = 0 ; i < pays.length ; i++) {
			var pay = pays[i];

			//이니시스 관련 필드값 삽입
			$.each(mocapay_fields, function(name) {
				var input = $("<input name='"+name+"' type='hidden'/>");
				$f.append(input);
			});
			//인터페이스 여부 셋팅
			var input = $("<input name='_if_yn' value='"+pay.if_yn+"' type='hidden'/>");

			$f.append(input);

			if (pay.pay_mean_cd_yn == "Y" && pay.if_yn == "Y" && $.type(PAY_MEAN_CDS[pay.pay_mean_cd]) == "string") {

				$.ajax({
					url: "/ifs/mocapayInit.action",
					type: "POST",
					dataType: "json",
					async : false,
					data: { 
						price: pay.pay_amt,
						noint_divi_cd: pay.noint_mon == 0 || pay.noint_mon == "" ? "10" : pay.noint_divi_cd , 
						quotabase: pay.noint_mon == 0 || pay.noint_mon == "" ? "일시불" : pay.noint_mon,		
						pay_mean_cd: pay.pay_mean_cd,
						cardcomp_no: pay.cardcomp_no,
						acceptmethod: pay.acceptmethod,
						card_pnt_use_yn: pay.card_pnt_use_yn,
						site_no: pay.site_no,
						cell_no: pay.cell_no,
						ssn: pay.ssn,
						buyername: pay.buyername,
						buyeremail: pay.buyeremail,
						goodname: pay.goodname,
						onoff: pay.onoff,				
						pay_idx: pay.pay_idx,
						pay_no : pay.pay_no,
						ord_no : pay.ord_no
					},
					async: false,
					success : function(data) {	//이니페이 플러그인의 암호값 전달

						if(data != null){

							//상품(단품)에 따라 품목 갯수와 정보를 셋팅함.
							if(data.result_code=="01"){
								window.alert("중복된 주문 번호가 존재 합니다. 상품 주문을 다시 진행하여 주시기 바랍니다.");
								return;
							}
							
							var $goon_no = $("input[name=good_no]",$f);
							var $goon_nm = $("input[name=good_nm]",$f);
							var $item_no = $("input[name=item_no]",$f);
							var $item_nm = $("input[name=item_nm]",$f);
							var $org_ord_qty = $("input[name=org_ord_qty]",$f);
							var $sale_price= $("input[name=sale_price]",$f);

							var item_cnt = 0;
							var sale_info = "";
							
							
							if($goon_no.size() > 0){
								
								$goon_no.each(function(i,item){
							
									
									sale_info += $goon_no.eq(i).val()+"|";
									sale_info += $goon_nm.eq(0).val()+"("+$item_nm.eq(i).val()+")|";
									sale_info += $sale_price.eq(i).val()+"|";
									sale_info += $org_ord_qty.eq(i).val()+"|";

									if($goon_no.size() == (i+1)){
										sale_info += ($sale_price.eq(i).val() * $org_ord_qty.eq(i).val());								
									}else{
										sale_info += ($sale_price.eq(i).val() * $org_ord_qty.eq(i).val())+"\r";															
									}
								
									item_cnt = item_cnt+1;

								});
								
							}else{
								item_cnt = 1;
								sale_info="C0115|테스트용 의자|500|1|1000";								
							}
							

							//모카페이와 통신 할 파라메터 셋팅
							var mp_parameters = $.extend({}, mocapay_parameter, { 
								PG_SHOP_ID: data.PG_SHOP_ID,
								CP_ORDER_AMOUNT: data.CP_ORDER_AMOUNT,
								CP_ORDER_ID: data.CP_ORDER_ID,
								CP_USER_ID: pay.login_id,
								CP_USER_NAME: pay.buyername,
								CP_USER_IP: data.CP_USER_IP,
								CP_USER_PHONE: pay.cell_no,
								CP_USER_EMAIL: pay.buyeremail,
								ITEM_CNT: item_cnt,
								SALE_INFO : sale_info,
								CP_AUTH_DATA : data.CP_AUTH_DATA,
								SHOP_ADD: ""
							});


							window.name = "opener_win";		
							
							var popupParam = {
									url : "about:blank",
									width : "590",
									height : "300",
									top : "100",
									winname : "P_UBIPAY"
							};
							
							var win = popup(popupParam);

							var goform = $("<form />");
							goform.attr("target","P_UBIPAY");
							goform.attr("method","post");
							goform.attr("action",_MOCAPAY_URL);

							$.each(mp_parameters, function(name, value) {
								goform.append("<input type='hidden' name='"+name+"' value='"+value+"' />");
							});

							$("body").append(goform);
							goform.submit();			
							
							setTimeout(function(){
								goform.remove();
							},1000);
							
						}

					},
					error: function () {
						alert("죄송합니다. 결제모듈 실행시 오류가 발생하였습니다. 잠시후 다시 시도해 주세요.");
					}
				});
	
			}
		};		

	};
	
	
	/*
	 * 모카페이 메세지.
	 */
	mocaPayMessage = function (msg){
		
		window.alert(msg);
		return;		
	};
	
	/*
	 * 모카페이 메세지.
	 */
	checkmocaPaySuccess = function (cp_order_id){

		$.ajax({
			url: "/ifs/mpSuccessCheck.action",
			type: "POST",
			dataType: "json",
			async : false,
			data: { 
				CP_ORDER_ID : cp_order_id
			},
			async: false,
			success : function(data) {	//이니페이 플러그인의 암호값 전달
				
				if(data != null){
					parent.close();
					if(data.result_code == "00"){
						mocaPayMessage("결제처리가 완료 되었습니다.");
					}else if(data.result_code == "01"){
						mocaPayMessage("결제 처리 중 문제가 발생 하였습니다.");
					}else if(data.result_code == "02"){
						mocaPayMessage("결제가 진행 중이거나 결제 도중 취소하였을 수가 있으니  \n 결제 여부 체크 후 주문 내역을 확인 바랍니다.");
					}else if(data.result_code == "03"){
						mocaPayMessage("주문 내역이 존재 하지 않습니다.");
					}
				}
			},
			error: function () {
				alert("죄송합니다. 결제모듈 실행시 오류가 발생하였습니다. 잠시후 다시 시도해 주세요.");
			}
		});
	}
	
})(jQuery);