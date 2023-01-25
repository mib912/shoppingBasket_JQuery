(function ($) {

	var _stckImg2 =[];
	   fireClick = function(area_no,conts_dist_no,conts_divi_cd)
	{
		if( conts_dist_no != null ) {
			if( isValidTrcCode(conts_dist_no) ) {
				
				var img = new Image();
				_stckImg2.push(img);
				if( document.location.href.indexOf( "https" ) == 0 )
				{
					
				}
				else
				{
					img.src = '/tracking/clickTracking.action?&area_no=' + area_no + '&conts_dist_no='+ conts_dist_no + '&conts_divi_cd=' + conts_divi_cd;
				}

		    }
		}		
	}
	   
	isValidTrcStrChar = function(str){
		// 문자코드 영역 체크
		var result = true;
		var tempVal;
		var loop = str.length;
		for( var i=0; i < loop; i++ )
		{
			
			tempVal = str.charCodeAt( i );
	
			if( tempVal < 48 || 122 < tempVal )
			{
				result = false;
				break;
			}
	
			if(  57 < tempVal && tempVal < 65 )
			{
				result = false;
				break;
			}
	
			if(  90 < tempVal && tempVal < 97 )
			{
				result = false;
				break;
			}
		}
	  
		return result;
	 }	
     isValidTrcCode = function(code) {
		var result = true;
		if( code.length < 1 ||
			code.substr( 0, 2 ) == "-1" )
		{
			result = false;
		}
	
		if( !isValidTrcStrChar( code ) )
		{
			result = false;
		}
	
		try
		{
			
			if( isNaN( code.substring(1) ) )
			{
				result = false;
			}
		}
		catch( exp )
		{
			result = false;
		}
		return result;
	}
}
)(jQuery);
