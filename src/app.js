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
					 replace(/#001/gi, '<img class="emoji" src="http://v9116084.bget.ru/design/emoji/001.jpg">').
					 replace(/#002/gi, '<img class="emoji" src="http://v9116084.bget.ru/design/emoji/002.jpg">').
					 replace(/#003/gi, '<img class="emoji" src="http://v9116084.bget.ru/design/emoji/003.jpg">').
					 replace(/#004/gi, '<img class="emoji" src="http://v9116084.bget.ru/design/emoji/004.jpg">').
					 replace(/#005/gi, '<img class="emoji" src="http://v9116084.bget.ru/design/emoji/005.jpg">').
					 replace(/#006/gi, '<img class="emoji" src="http://v9116084.bget.ru/design/emoji/006.jpg">').
					 replace(/#007/gi, '<img class="emoji" src="http://v9116084.bget.ru/design/emoji/007.jpg">').
					 replace(/#008/gi, '<img class="emoji" src="http://v9116084.bget.ru/design/emoji/008.jpg">').
					 replace(/#009/gi, '<img class="emoji" src="http://v9116084.bget.ru/design/emoji/010.jpg">');
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
