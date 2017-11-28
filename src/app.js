var fb = new Firebase("https://gochat-ac889.firebaseio.com/");
var messages = fb.child("messages");
var btn = $('button');
var wrap = $('.wrapper');
var input = $('input.message');
var usernameInput = $('input.username');
function checkTime(i) { if (i<10) { i="0" + i; } return i; }

var user = [];

(function($) {
	$.sanitize = function(input) {
		var output = input.replace(/<script[^>]*?>.*?<\/script>/gi, '#@$!*6').
					 replace(/<[\/\!]*?[^<>]*?>/gi, '&!2%=_^').
					 replace(/<style[^>]*?>.*?<\/style>/gi, '#^$!$&1').
					 replace(/<![\s\S]*?--[ \t\n\r]*>/gi, '@#%&7^').
					 replace(/#a01/gi, '<img class="emoji" src="src/img/a01.png">').
					 replace(/#a02/gi, '<img class="emoji" src="src/img/a02.png">').
					 replace(/#a03/gi, '<img class="emoji" src="src/img/a03.png">').
					 replace(/#a04/gi, '<img class="emoji" src="src/img/a04.png">').
					 replace(/#a05/gi, '<img class="emoji" src="src/img/a05.png">').
					 replace(/#a06/gi, '<img class="emoji" src="src/img/a06.png">').
					 replace(/#a07/gi, '<img class="emoji" src="src/img/a07.png">').
					 replace(/#a08/gi, '<img class="emoji" src="src/img/a08.png">').
					 replace(/#a09/gi, '<img class="emoji" src="src/img/a09.png">').
					 replace(/#z01/gi, '<img class="sticker" src="src/img/z01.png">').
					 replace(/#z02/gi, '<img class="sticker" src="src/img/z02.png">').
					 replace(/#z03/gi, '<img class="sticker" src="src/img/z03.png">').
					 replace(/#z04/gi, '<img class="sticker" src="src/img/z04.png">').
					 replace(/#z05/gi, '<img class="sticker" src="src/img/z05.png">').
					 replace(/#z06/gi, '<img class="sticker" src="src/img/z06.png">').
					 replace(/#z07/gi, '<img class="sticker" src="src/img/z07.png">');
	    return output;
	};
})(jQuery);


usernameInput.on('keyup', function(e) {
	if (e.keyCode === 13 && usernameInput.val().length > 0) {
		var getTxt = usernameInput.val();
		user.push(getTxt);
		usernameInput.val('');
		$('.initModal').css('display', 'none');
		console.log(user);
	}
});

var submit = document.getElementById('send');
submit.onclick = function () {
    var curUsername = user.join();
    var tm = new Date();
    var nowTime = checkTime(tm.getHours()) + ':' + checkTime(tm.getMinutes());
    if (input.val().length > 0) {
        var getTxt = input.val();
        messages.push({
		time: nowTime,
        	user: curUsername,
        	message: getTxt
	});
    input.val('');
    }
}

input.on('keyup', function(e) {
	var curUsername = user.join();
        var tm = new Date();
        var nowTime = checkTime(tm.getHours()) + ':' + checkTime(tm.getMinutes());
	if (e.keyCode === 13 && input.val().length > 0) {
		var getTxt = input.val();
		messages.push({
		        time: nowTime,
			user: curUsername,
			message: getTxt
		});
		input.val('');
	}
});

var goTyp = new Object();
var inTypping = false;
$('input#emoji_c').keypress(function(){
	clearInterval(goTyp);
	if(!inTypping){
		document.getElementById('status').innerHTML='<img class="load" src="https://gardenlife.com.au/wp-content/themes/garden-life/images/loader.png" alt="load">';
		inTypping = true;						
	}
	if(inTypping){
		goTyp = setInterval(function(){
			document.getElementById('status').innerHTML='Пользователь не пишет';
			inTypping = false;	
			clearInterval(goTyp);
		}, 1000);
	}
});

messages.limitToLast(100).on("child_added", function(snap) {
	wrap.append('<div class="msb"><div class="cover">' + $.sanitize(snap.val().user) + '</div><span>' + $.sanitize(snap.val().user) + '</span> <time>' + $.sanitize(snap.val().time) + '</time><div>' + $.sanitize(snap.val().message) + '</div></div>');
	window.scrollTo(0,document.body.scrollHeight);
});

function emoji_alert() {
   document.getElementById("emoji_b").classList.toggle("vis");
}

function x () {return;}
function FocusText() {
    document.getElementById('emoji_c').focus();
    document.getElementById('emoji_c').select();
    return true;
}
function DoSmilie(addSmilie) {
    var revisedmsgage;
    var currentmsgage = document.getElementById('emoji_c').value;
    revisedmsgage = currentmsgage+addSmilie;
    document.getElementById('emoji_c').value=revisedmsgage;
    document.getElementById('emoji_c').focus();
    return;
}
function DoPrompt(action) {
	var revisedmsgage;
	var currentmsgage = document.getElementById('emoji_c').value;
}

function es_toggle() {
   document.getElementById("es_togg").classList.toggle("vis");
}

$(document).ready(function() {
    var menu = $(".menu");
    var arrow = $(".arrow");

    $(".toggle").on('click', function() {
      $.each([menu, arrow], function() {
          this.toggleClass('out');
      });
    });
});
