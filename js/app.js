$(function() {
	window.onload = function() {
		$("#theme").get(0).play();
	};
	$("#gameArea").hide();
	var p1Position = 0;
	var p1left = 1;
	var p1right = 1;
	p1listenForKeys();
	var p2Position = 0;
	var p2left = 1;
	var p2right = 1;
	p2listenForKeys();
	var v1Position = 0;
	console.log(v1Position);

	$(document).keydown(function(e) {
		if (e.keyCode === 32) {
			$("#startScreen").slideUp();
			$("#gameArea").show();
			$("#theme").get(0).pause();
			$("#game").get(0).play();
		}
	})
	function p1listenForKeys() {
		$(document).keydown(function(e) {
			if (e.keyCode === 65 && p1left == 1 && (parseInt(p1Stamina.innerHTML)) > 1) {
				p1left = 0;
				p1right = 1;
				p1Position += 1;
				$("#levelImage").animate({"left": "-=2px"}, 100);
				$("#p2Sprite").css({'margin-left': "-=2px"});
				$("#p1Sprite").animate({"left": "+=2px"}, 100);
				$("#p1Sprite").css('background-image','url(images/Z1-left.png)');
				$("#p1Stamina").html(parseInt(p1Stamina.innerHTML) -2);
				p1fillStaminaBar();
				} else if (e.keyCode === 68 && p1right == 1 && (parseInt(p1Stamina.innerHTML)) > 1) {
				p1right = 0;
				p1left = 1;
				p1Position += 1;
				$("#p1Sprite").animate({"left": "+=2px"}, 100);
				$("#p1Sprite").css('background-image','url(images/Z1-right.png)');
				winCheck();
			}
			console.log(p1Position);
		});
	}
	function p2listenForKeys() {
		$(document).keydown(function(e){
			if (e.keyCode === 74 && p2left == 1 && (parseInt(p2Stamina.innerHTML)) > 1) {
				p2left = 0;
				p2right = 1;
				p2Position += 1;
				$("#levelImage").animate({"left": "-=2px"}, 100);
				$("#p1Sprite").css({'margin-left': "-=2px"});
				$("#p2Sprite").animate({"left": "+=2px"}, 100);
				$("#p2Sprite").css('background-image','url(images/Z2-left.png)');
				$("#p2Stamina").html(parseInt(p2Stamina.innerHTML) -2);
				p2fillStaminaBar();
				} else if (e.keyCode === 76 && p2right == 1 && (parseInt(p2Stamina.innerHTML)) > 1) {
				p2right = 0;
				p2left = 1;
				p2Position += 1;
				$("#p2Sprite").animate({"left": "+=2px"}, 100);
				$("#p2Sprite").css('background-image','url(images/Z2-right.png)');
				winCheck();
			}
			console.log(p2Position);
		});
	}
	function p1fillStaminaBar() {
		$('#p1Stamina').each(function() {
			var $this = $(this), 
		  	countTo = $this.attr('data-count');
		  	$({ countNum: $this.text()}).animate({ countNum: countTo },
		  	{
		  	duration: 8000,
		    easing:'linear',
		    step: function() {
		      $this.text(Math.floor(this.countNum));
		    },
		    complete: function() {
		      $this.text(this.countNum);
		    }
		  });  
		});
	}
	function p2fillStaminaBar() {
		$('#p2Stamina').each(function() {
			var $this = $(this), 
		  	countTo = $this.attr('data-count');
		  	$({ countNum: $this.text()}).animate({ countNum: countTo },
		  	{
		  	duration: 8000,
		    easing:'linear',
		    step: function() {
		      $this.text(Math.floor(this.countNum));
		    },
		    complete: function() {
		      $this.text(this.countNum);
		    }
		  });  
		});
	}
	function p1staminaStop() {
		if ((parseInt(p1Stamina.innerHTML)) <= 0) {
			p1left = 0;
			p1right = 0;
		} else {
			p1left = 1;
			p1right = 1;
		}
	}
	function p2staminaStop() {
		if ((parseInt(p2Stamina.innerHTML)) <= 0) {
			p2left = 0;
			p2right = 0;
		} else {
			p2left = 1;
			p2right = 1;
		}
	}

	do {
		if (Math.abs(v1Position % 2) == 1) {
			$("#v1Sprite").animate({"left": "-=2px"}, 100).css('background-image','url(images/Z2-left.png)');
			v1Position +=1;
		} else if (v1Position % 2 == 0) {
			$("#v1Sprite").animate({"left": "-=2px"}, 100).css('background-image','url(images/V1-left.png)');
			v1Position +=1;
			console.log(v1Position);
		}
	}
	while (v1Position < 81); //{ Add && (p1Position > 50 || p2Position > 50) }


	function winCheck() {
		if (p1Position >= 350) {
			stopGame();
			alert("Zombie 1 delivers the goods! His plans for infection growth will be actioned on Monday!");
		} else if (p2Position >= 350) {
			stopGame();
			alert("Zombie 2 delivers the goods! His plans for infection growth will be actioned on Monday!");
		}
	}
	function stopGame() {
		p1left = 0;
		p1right = 0;
		p2left = 0;
		p2right = 0;
	}

});