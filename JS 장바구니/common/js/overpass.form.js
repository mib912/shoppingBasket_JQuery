(function ($) {

	_submitted = null;

	$.form = function(selector, context) {
		var _f = $(selector);
		
		//onsubmit시 자동으로 submit되는것 막음.
		$(selector).bind("submit", function() {
			return false;
		});
		
		/**
		 * {
		 * 	action: String,
		 *  target: String,
		 *  iframe: boolean	-> true : target은 무시되고 iframe 생성후 거기로
		 * }
		 */
		_f.submit = function(p) {
			p = $.extend(false, { target:"_self", iframe: false, valid: null, confirm: null }, p || {});
			return this.each(function() {
				var f = this;	//form object
				if (f._run == true) {
					return false;
				}
				f._run = true;
				var action = p.action||f.action;
				if (!action) {
					alert("action이 지정되어 있지 않습니다.");
					return false;
				};

				//유효성 체크
				if (!_f.check()) {
					_f.run(false);
					return false;
				};
				if (p.valid != null && !p.valid()) {
					_f.run(false);
					return false;
				};
				if (p.confirm != null && !p.confirm()) {
					_f.run(false);
					return false;
				};
				
				if (p.iframe) {
					var iframe = null;
					if ($("#_FORM_SUBMIT_TARGET").length == 0) {
						iframe = $("<iframe name=\"_FORM_SUBMIT_TARGET\" id=\"_FORM_SUBMIT_TARGET\" />");
						iframe.css({ position: 'absolute', top: '-1000px', left: '-1000px' });
						iframe.appendTo('body');
					} else {
						iframe = $("#_FORM_SUBMIT_TARGET")[0];
					};
					p.target = "_FORM_SUBMIT_TARGET";
					if ($("#_IFRAME", f).length == 0) {
						var hidden = $("<input />").attr("type", "hidden").attr("name", "_IFRAME").attr("id", "_IFRAME").val("Y");
						hidden.appendTo(f);
					}
				} else {
					$("#_IFRAME", f).remove();
				};

				f.action = action;
				f.target = p.target;
				f.method = "post";
				
				if ($.type(p.success) == "function") {
					f.success = function(result) {
						p.success(result);
					};
				} else {
					f.success = null;
				};

				if ($.type(p.error) == "function") {
					f.error = function(result) {
						f._run = false;
						p.error(result);
					};
				} else {
					f.error = null;
				};
				
				_submitted = f;
				f.submit();
			});
		};
		_f.run = function(b) {
			this.each(function() {
				var f = this;	//form object
				f._run = b;
			});
		};
		_f.reset = function(p) {
			p = p || {};
			this.each(function() {
				this.reset();
			});
			$(_f).find("input[type=hidden]").each(function(idx, hidden) {	//hidden필드는 reset시 reset되지 않는 브라우저들이 존재함.
				var def = $(hidden).attr("default");	//최초값이 존재한다면...
				hidden.value = $.type(def) == "string" ?  def : "" ;
			});
		};
		_f.check = function(p) {
			p = p || {};
			var valid = true;

			$(":input", this).each(function() {
				if (!valid) {
					return false;
				};
				if (this.type != "submit" && this.type != "button") {
					var input = this;
					if ($.type($(this).attr("validate")) == "string") {
						var message = $.type($(this).attr("message")) == "string" ? $(this).attr("message") : null ;
						var validate = $(this).attr("validate");
						if ($.trim(validate) != "") {
							switch (validate.toLowerCase()) {
								case "number":
									if (message == null || $.trim(message) == "") {
										message = "숫자형으로 입력하세요";
									};
									if (!isNumber(input)) {
										alert(message);
										input.focus();
										valid = false;
									};
									break;
								case "empty":
									if (message == null || $.trim(message) == "") {
										message = "값을 입력하세요";
									};
									if (isEmpty(input)) {
										alert(message);
										input.focus();
										valid = false;
									};
									break;
								default:
									break;
							};
						};
					};
				};
			});
			return valid;
		};
		return _f;
	};
})(jQuery);