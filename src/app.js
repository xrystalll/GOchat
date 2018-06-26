var fb = new Firebase("https://gochat-ac889.firebaseio.com/"),
messages = fb.child("messages"),
btn = $("button"),
wrap = $(".wrapper"),
input = $("input.message"),
usernameInput = $("input.username"),
userimageInput = $("input.image"),
user = [],
image = [];
function checkTime(e) { return e < 10 && (e="0"+e), e }

(function($) {
	$.sanitize = function(input) {
		var output = input.replace(/<script[^>]*?>.*?<\/script>/gi, '#@$!*6').
		replace(/<[\/\!]*?[^<>]*?>/gi, '&!2%=_^').
		replace(/<![\s\S]*?--[ \t\n\r]*>/gi, '@#%&7^').
		replace(/<style[^>]*?>.*?<\/style>/gi, '#^$!$&1').
		replace(/\[img\](.*?)\[\/img\]/gi, '<img class="pic" src="$1">').
		replace(/\[a\](.*?)\[\/a\]/gi, '<a href="$1">$1</a>').
		replace(/#a01/gi, '<img class="emoji" src="src/img/a01.png">').
		replace(/#a02/gi, '<img class="emoji" src="src/img/a02.png">').
		replace(/#a03/gi, '<img class="emoji" src="src/img/a03.png">').
		replace(/#a04/gi, '<img class="emoji" src="src/img/a04.png">').
		replace(/#a05/gi, '<img class="emoji" src="src/img/a05.png">').
		replace(/#a06/gi, '<img class="emoji" src="src/img/a06.png">').
		replace(/#a07/gi, '<img class="emoji" src="src/img/a07.png">').
		replace(/#a08/gi, '<img class="emoji" src="src/img/a08.png">').
		replace(/#a09/gi, '<img class="emoji" src="src/img/a09.png">').
		replace(/#b01/gi, '<img class="emoji" src="src/img/b01.png">').
		replace(/#b02/gi, '<img class="emoji" src="src/img/b02.png">').
		replace(/#b03/gi, '<img class="emoji" src="src/img/b03.png">').
		replace(/#b04/gi, '<img class="emoji" src="src/img/b04.png">').
		replace(/#z01/gi, '<img class="sticker" src="src/img/z01.png">').
		replace(/#z02/gi, '<img class="sticker" src="src/img/z02.png">').
		replace(/#z03/gi, '<img class="sticker" src="src/img/z03.png">').
		replace(/#z04/gi, '<img class="sticker" src="src/img/z04.png">').
		replace(/#z05/gi, '<img class="sticker" src="src/img/z05.png">').
		replace(/#z06/gi, '<img class="sticker" src="src/img/z06.png">').
		replace(/#z07/gi, '<img class="sticker" src="src/img/z07.png">').
		replace(/#x01/gi, '<img class="sticker" src="src/img/x01.png">').
		replace(/#x02/gi, '<img class="sticker" src="src/img/x02.png">').
		replace(/#x03/gi, '<img class="sticker" src="src/img/x03.png">').
		replace(/#x04/gi, '<img class="sticker" src="src/img/x04.png">').
		replace(/#y01/gi, '<img class="sticker" src="src/img/y01.png">');
		return output;
	};
	$.logcheck = function(input) {
		var output = input.replace(/<script[^>]*?>.*?<\/script>/gi, '#@$!*6').
		replace(/<[\/\!]*?[^<>]*?>/gi, '&!2%=_^').
		replace(/<![\s\S]*?--[ \t\n\r]*>/gi, '@#%&7^').
		replace(/<style[^>]*?>.*?<\/style>/gi, '#^$!$&1').
		replace(/\[img\](.*?)\[\/img\]/gi, '%37f@j').
		replace(/\[a\](.*?)\[\/a\]/gi, 'f*64$-');
		return output;
	};
})(jQuery);

document.getElementById("emoji_c").onpaste = function(e) {
	for (var t = (e.clipboardData || e.originalEvent.clipboardData).items, a = null, n = 0; n < t.length; n++) 0 === t[n].type.indexOf("image") && (a = t[n].getAsFile());
	if (null !== a) {
		var l = new FileReader;
		l.onload = function(e) {
			document.getElementById("pastedImage").src = e.target.result, document.getElementById("emoji_c").value="[img]" + e.target.result + "[/img]"
		}, l.readAsDataURL(a)
	}
};

$(document).ready(function() {
	$("#pastedImage, #send").click(function() {
		$("img#pastedImage").removeAttr("src")
	})
}),
document.getElementById("pastedImage").onclick=function(e) {
	document.getElementById("emoji_c").value=""
};

function checkValidity(){}
var elements = document.querySelectorAll("input#username");
for(i = 0; i < elements.length; i++)!function(e) {
	var t = e.getAttribute("id");
	if(e.value = localStorage.getItem(t), e.oninput = function() {
		localStorage.setItem(t,e.value), checkValidity()
	}, e.value.length > 1){
		var l = localStorage.getItem(t);
		user.push(l), $(".initModal").css("display","none"),
		localStorage.setItem('msb', 'my'),
		console.log(user)
	}
	usernameInput.on("keyup", function(l) {
		if(13 === l.keyCode && e.value.length > 1) {
			var n = localStorage.getItem(t);
			user.push(n), $(".initModal").css("display","none"),
			localStorage.setItem('msb', 'my'),
			console.log(user)
		}
	})
} (elements[i]);

var elements = document.querySelectorAll("input#image");
for(i = 0; i < elements.length; i++)!function(e) {
	var t = e.getAttribute("id");
	if(e.value = localStorage.getItem(t), e.oninput = function() {
		localStorage.setItem(t,e.value), checkValidity()
	}, e.value.length > 1){
		var l = localStorage.getItem(t);
		image.push(l), $(".chk").css("display","none")
	}
	userimageInput.on("keyup", function(l) {
		if(13 === l.keyCode && e.value.length > 1) {
			var n = localStorage.getItem(t);
			image.push(n), $(".chk").css("display","none")
		}
	})
}(elements[i]);

var submit = document.getElementById('send');
submit.onclick = function () {
	var curUsername = user.join();
	var curUserimage = image.join();
	var tm = new Date();
	var nowTime = checkTime(tm.getDate()) + '.' + checkTime(tm.getMonth()+1) + ' в ' + checkTime(tm.getHours()) + ':' + checkTime(tm.getMinutes());
	if (input.val().length > 1) {
		var getTxt = input.val();
		messages.push({
			time: nowTime,
			user: curUsername,
			image: curUserimage,
			message: getTxt
		});
		input.val('');
	}
}

input.on('keyup', function(e) {
	var curUsername = user.join();
	var curUserimage = image.join();
	var tm = new Date();
	var nowTime = checkTime(tm.getDate()) + '.' + checkTime(tm.getMonth()+1) + ' в ' + checkTime(tm.getHours()) + ':' + checkTime(tm.getMinutes());
	if (e.keyCode === 13 && input.val().length > 1) {
		var getTxt = input.val();
		messages.push({
			time: nowTime,
			user: curUsername,
			image: curUserimage,
			message: getTxt
		});
		input.val('');
	}
});

var goTyp = new Object, inTypping = !1;
$("input#emoji_c").keypress(function() {
	clearInterval(goTyp),
	inTypping||(document.getElementById("status").innerHTML='<img class="load" src="src/img/loader.gif" alt="load">',
	inTypping = !0,window.scrollTo(0,document.body.scrollHeight)), inTypping && (goTyp = setInterval(function() {
		document.getElementById("status").innerHTML="", inTypping = !1,
		clearInterval(goTyp)
	}, 1e3)
)});

wrap.append('<div class="empty ic"><div class="empty_words">Сообщений пока нет!</div></div>');
messages.limitToLast(69).on("child_added", function(i) {
	wrap.append('<div class="msb"><div  onclick="DoSmilie(&#39;' + $.logcheck(i.val().user) + ', &#39;);" class="cover" style="background-image: url(' + $.logcheck(i.val().image) + ');"></div><div class="cover_n">' + $.logcheck(i.val().user) + '</div><span>' + $.logcheck(i.val().user) + '</span> <time>' + $.logcheck(i.val().time) + '</time><div>' + $.sanitize(i.val().message) + '</div></div>'),
	window.scrollTo(0,document.body.scrollHeight);
	var s = new Audio;
	return s.src="src/sound/new_in.wav",
	void s.play()
});

function op_set() {
	document.getElementById("set-i").classList.toggle("opn")
}

function emoji_alert() {
	document.getElementById("emoji_b").classList.toggle("vis")
}

function login() {
	document.getElementById("step1").classList.toggle("oplog"),
	document.getElementById("step2").classList.toggle("cllog")
}

function x () {return;}
function FocusText() {
	document.getElementById('emoji_c').focus(),
	document.getElementById('emoji_c').select();
	return true;
}
function DoSmilie(addSmilie) {
	var revisedmsgage,
	    currentmsgage = document.getElementById('emoji_c').value;
	revisedmsgage = currentmsgage+addSmilie;
	document.getElementById('emoji_c').value = revisedmsgage;
	document.getElementById('emoji_c').focus();
	return;
}
function DoPrompt(action) {
	var revisedmsgage,
	    currentmsgage = document.getElementById('emoji_c').value;
}

function es_toggle() {
	document.getElementById("es_togg").classList.toggle("vis")
}

$(document).ready(function() {
	var menu = $(".menu"),
	    arrow = $(".arrow");

	$(".toggle").on('click', function() {
		$.each([menu, arrow], function() {
			this.toggleClass('out');
		});
	});
});

function gif_box() {
	document.getElementById("gif_box").classList.toggle("open")
}

function giphyApiSearch(search) {
	var url,
	    xmlHttp = new XMLHttpRequest();
	console.log ('https://github.com/xrystalll');

	search = search.split(' ').join('+');
	url = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=dc6zaTOxFJmzC&limit=9";

	xmlHttp.onreadystatechange = function() {
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200) addPics(xmlHttp.responseText);
	}
	xmlHttp.open("GET", url, true);  
	xmlHttp.send(null);
}

function addPics(gif) {
	document.querySelector(".pic-container").innerHTML = "";
	gif = JSON.parse(gif);
	if (gif.data.length > 0) {
		for (var x = 0; x < gif.data.length; x++) {
			var el = document.createElement("img");
			    el.setAttribute("id", "gifpasted")
			    el.setAttribute("src", gif.data[x].images.original.url);
			    el.setAttribute("onclick", "gif_box();DoSmilie('[img]" + gif.data[x].images.original.url + "[/img]');");
			document.querySelector(".pic-container").appendChild(el);
		}
	} else {
		document.querySelector(".error-container").innerHTML = "Ничего не найдено.<br>Попробуй поискать другое!";
	}
}

function startGiphySearch(e) {
	e.preventDefault();
	var userSearch = document.querySelector("#gif-search-input").value;
	document.querySelector("#gif-search-input").value = "";
	document.querySelector(".error-container").innerHTML = "";  
	giphyApiSearch(userSearch);
}

document.querySelector("#gif-search-form").addEventListener("submit", function(e){
	startGiphySearch(e)
});

document.querySelector("#search-btn").addEventListener("click", function(e){
	startGiphySearch(e)
}, false);

giphyApiSearch("cool");
