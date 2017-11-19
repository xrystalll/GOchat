var fb = new Firebase("https://gochat-ac889.firebaseio.com/");
var messages = fb.child("messages");
var btn = $('button');
var wrap = $('.wrapper');
var input = $('input.message');
var usernameInput = $('input.username');

var user = [];

(function($) {
	$.sanitize = function(input) {
		var output = input.replace(/<script[^>]*?>.*?<\/script>/gi, '#@$!*6').
					 replace(/<[\/\!]*?[^<>]*?>/gi, '&!2%=_^').
					 replace(/<style[^>]*?>.*?<\/style>/gi, '#^$!$&1').
					 replace(/<![\s\S]*?--[ \t\n\r]*>/gi, '@#%&7^').
					 replace(/#a01/gi, '<img class="emoji" src="src/img/a01.jpg">').
					 replace(/#a02/gi, '<img class="emoji" src="src/img/a02.jpg">').
					 replace(/#a03/gi, '<img class="emoji" src="src/img/a03.jpg">').
					 replace(/#a04/gi, '<img class="emoji" src="src/img/a04.jpg">').
					 replace(/#a05/gi, '<img class="emoji" src="src/img/a05.jpg">').
					 replace(/#a06/gi, '<img class="emoji" src="src/img/a06.jpg">').
					 replace(/#a07/gi, '<img class="emoji" src="src/img/a07.jpg">').
					 replace(/#a08/gi, '<img class="emoji" src="src/img/a08.jpg">').
					 replace(/#a09/gi, '<img class="emoji" src="src/img/a09.jpg">').
					 replace(/#z01/gi, '<img class="sticker" src="src/img/z01.png">');
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
    if (input.val().length > 0) {
        var getTxt = input.val();
        messages.push({
            user: curUsername,
            message: getTxt
        });
    input.val('');
    }
}

messages.limitToLast(100).on("child_added", function(snap) {
	wrap.append('<li><span>' + $.sanitize(snap.val().user) + ', </span> ' + $.sanitize(snap.val().message) + '</li>');
	window.scrollTo(0,document.body.scrollHeight);
});

function emoji_alert() {
   document.getElementById("emoji_b").classList.toggle("vis");
}

function x () {return;}
function FocusText() {
    document.ebt.emoji_c.focus();
    document.ebt.emoji_c.select();
    return true;
}
function DoSmilie(addSmilie) {
    var revisedmsgage;
    var currentmsgage = document.ebt.emoji_c.value;
    revisedmsgage = currentmsgage+addSmilie;
    document.ebt.emoji_c.value=revisedmsgage;
    document.ebt.emoji_c.focus();
    return;
}
function DoPrompt(action) {
	var revisedmsgage;
	var currentmsgage = document.ebt.qmsgage.value;
}
