$(function() {

var p1Position = 0;
var p1left = 1;
var p1right = 1;
p1listenForKeys();
var p2Position = 0;
var p2left = 1;
var p2right = 1;
p2listenForKeys();

function p1listenForKeys() {
	$(document).keydown(function(e){
		if (e.keyCode === 65 && p1left == 1) {
		p1left = 0;
		p1right = 1;
		p1Position += 1;
		$("#p1Sprite").animate({"left": "+=2px"}, 100);
		$("#p1Sprite").css('background-image','url(images/Z1-left.png)');
		} else if (e.keyCode === 68 && p1right == 1) {
		p1right = 0;
		p1left = 1;
		p1Position += 1;
		$("#p1Sprite").animate({"left": "+=2px"}, 100);
		$("#p1Sprite").css('background-image','url(images/Z1-right.png)');
		}
		console.log(p1Position);
	});
}

function p2listenForKeys() {
	$(document).keydown(function(e){
		if (e.keyCode === 74 && p2left == 1) {
		p2left = 0;
		p2right = 1;
		p2Position += 1;
		$("#p2Sprite").animate({"left": "+=2px"}, 100);
		$("#p2Sprite").css('background-image','url(images/Z1-left.png)');
		} else if (e.keyCode === 76 && p2right == 1) {
		p2right = 0;
		p2left = 1;
		p2Position += 1;
		$("#p2Sprite").animate({"left": "+=2px"}, 100);
		$("#p2Sprite").css('background-image','url(images/Z1-right.png)');
		}
		console.log(p2Position);
	});
}





$(document).keydown(function(e){
	console.log(e.keyCode);
});



















// 1. Wireframes
// 2. Code logic ----click event, key presses, control flow
});