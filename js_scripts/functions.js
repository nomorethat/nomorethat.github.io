$(document).ready(function(){
	$("#container #to_encrypt").bind("click", to_encrypt);
	generate_vigener_square();
	
	function generate_vigener_square(){
		var the_beginning_of_the_alphabet_in_the_encoding = 97;
		
		var alphabet = new Array();
		for(var i = 0; i < 26; i++){
			alphabet[i] = String.fromCharCode(the_beginning_of_the_alphabet_in_the_encoding + i);
		}
		
		vigener_square = new Array();
		alphabet = alphabet.concat(alphabet);
		var shift = 0;
		for(var i = 0; i < 26; i++){
			vigener_square[i] = new Array();
			for(var j = 0; j < 26; j++){
				vigener_square[i][j] = alphabet[j + shift];
			}
			shift++;
		}
	}
	
	function to_encrypt(){
		$("#container #result").empty();
		$("#container textarea").css("border", "1px solid #bbb");
		$("#container input[name='key']").css("border", "1px solid #bbb");
		
		var open_message = $("#container textarea").val();
		if(open_message.length < 1){
			$("#container #result").append("<span>Шифрование невозможно (открытый текст отсутствует)</span>");
			$("#container textarea").css("border", "1px solid #f00");
			return;
		}
		
		var key = $("#container input[name='key']").val();
		if(key.length < 1){
			$("#container #result").append("<span>Шифрование невозможно (ключ не указан)</span>");
			$("#container input[name='key']").css("border", "1px solid #f00");
			return;
		}
		
		open_message = normalize_of_open_message(open_message);
		key = normalize_of_key(key); // нормализация ключа
		var key_suquence = form_a_key_sequence(open_message, key);

		var ciphertext = "";
		for(var i = 0; i < open_message.length; i++){
			var symbol_of_open_message = open_message.charAt(i);
			var symbol_of_key_suquence = key_suquence.charAt(i);
			
			for(var j = 0; j < vigener_square[0].length; j++){
				if(vigener_square[0][j] === symbol_of_open_message)
					x = j;
			}
			
			for(var j = 0; j < vigener_square[0].length; j++){
				
				if(vigener_square[j][0] === symbol_of_key_suquence)
					y = j;
			}
			ciphertext = ciphertext + vigener_square[x][y];
		}
		
		$("#container #result").append("<br /><span><b>Сообщение: </b>" + open_message + "</span><br />");
		$("#container #result").append("<span><b>Ключ: </b>" + key_suquence + "</span><br />");
		$("#container #result").append("<span><b>Шифротекст: </b>" + ciphertext + "</span>");
	}
	
	function normalize_of_open_message(open_message){
		open_message = open_message.toLowerCase();
		for(var i = 0; i < open_message.length; i++){
			var code_of_symbol = open_message.charCodeAt(i);
			if((code_of_symbol < 97)  || (code_of_symbol > 123)){
				open_message = open_message.replace(open_message.charAt(i), "");
				i--;
			}
		}
		return open_message;
	}
	
	function normalize_of_key(key){
		key = key.toLowerCase();
				for(var i = 0; i < key.length; i++){
			var code_of_symbol = key.charCodeAt(i);
			if((code_of_symbol < 97)  || (code_of_symbol > 123)){
				key = key.replace(key.charAt(i), "");
				i--;
			}
		}
		return key;
	}
	
	function form_a_key_sequence(open_message, key){
		var key_suquence = "";
		while(1){
			key_suquence = key_suquence + key;
			if(open_message.length < key_suquence.length){
				key_suquence = key_suquence.slice(0, open_message.length);
				break;
			}
		}
		return key_suquence;
	}
});