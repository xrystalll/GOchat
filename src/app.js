var fb = new Firebase("https://gochat-ac889.firebaseio.com/");
var messages = fb.child("messages");
var btn = $('button');
var wrap = $('.wrapper');
var input = $('input.message');
var usernameInput = $('input.username');

var user = [];

usernameInput.on('keyup', function(e) {
	if (e.keyCode === 13 && usernameInput.val().length > 0) {
		var getTxt = usernameInput.val();
		user.push(getTxt);
		usernameInput.val('');
		$('.init').css('display', 'none');
		$('.message').css('display', 'block');
		console.log(user);
	}
});

input.on('keyup', function(e) {
	var curUsername = user.join();
	if (e.keyCode === 13 && input.val().length > 0) {
		var getTxt = input.val();
		messages.push({
			user: curUsername,
			message: getTxt
		});
		input.val('');
	}
});

messages.limitToLast(100).on("child_added", function(snap) {
	wrap.append('<li id="margin"><span>' + snap.val().name + '</span> ' + snap.val().text + '</li>');
	window.scrollTo(0,document.body.scrollHeight);
});

$(document).ready(function(){

	$(".nav_main").click(function () {
		$(".drawer").toggle();
	});

});
