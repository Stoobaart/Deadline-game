$(function() {
// =======================================START=SCREEN=======================================================
	$("#theme").get(0).play();
	$("#gameArea").hide();
	$("#restart").hide();

	$(document).keydown(function(e) {
		if (e.keyCode === 32) { //When space bar is pressed, do this..
			$("#startScreen").slideUp();
			$("#gameArea").show();
			$("#theme").get(0).pause();
			$("#game").get(0).play();
			$("#ambience").get(0).play();
		}
	})
// =======================================GLOBAL=VARIABLES===================================================
	var p1left = 1;
	var p1right = 1;
	p1listenForKeys();
	var p2left = 1;
	var p2right = 1;
	p2listenForKeys();
	var positionScale = 1500;
	var v1 = $(".vSprite");
	var v1Position = v1.offset();
	var p1 = $("#p1Sprite");
	var p1Position = p1.offset();
	var p2 = $("#p2Sprite");
	var p2Position = p2.offset();
	var v1Bitten = false;
	var lastPosition = 0;
	var sprites = [];
// =======================================GAME=LOGIC=======================================================

	function p1listenForKeys() { //key pressing event listeners for player one
		$(document).keydown(function(e) {
			refreshSprites();
			console.log(sprites);
			if (e.keyCode === 65 && p1left == 1 && (parseInt(p1Stamina.innerHTML)) > 1) {
				p1left = 0;
				p1right = 1;
				$("#levelImage").animate({"left": "-=3px"}, 100);
				$("#p2Sprite").animate({"left": "-=2px"}, 100);
				$(".vSprite").animate({"left": "-=40px"}, 50);
				$("#p1Sprite").animate({"left": "+=1px"}, 100).css('background-image','url(images/Z1-left.png)');
				$("#p1Stamina").html(parseInt(p1Stamina.innerHTML) -2);
				fillStaminaBar(1);
			} else if (e.keyCode === 68 && p1right == 1 && (parseInt(p1Stamina.innerHTML)) > 1) {
				p1right = 0;
				p1left = 1;
				$("#p1Sprite").animate({"left": "+=1px"}, 100).css('background-image','url(images/Z1-right.png)');
				onOrOffScreen();
				winCheck();
			} else if (e.keyCode === 87 && (bitePoint()) === 1 && (sprites[0].alive)) {
				v1bitten();
				$("#p1Sprite").animate({"left": "+=100px"}, 100);
			}
			checkPosition();
		});
	}

	function refreshSprites() {
		sprites = [...$(".vSprite.alive")].map(function(sprite) {
			console.log(sprite);
			return {
				offset: $(sprite).offset().left,
				alive: ($(sprite).attr("class").split(" ")[1] === "alive")
			} 	
		}).sort();
	}

	function p2listenForKeys() { //key pressing event listeners for player two
		$(document).keydown(function(e){
			refreshSprites();
			if (e.keyCode === 74 && p2left == 1 && (parseInt(p2Stamina.innerHTML)) > 1) {
				p2left = 0;
				p2right = 1;
				$("#levelImage").animate({"left": "-=3px"}, 100);
				$("#p1Sprite").animate({"left": "-=2px"}, 100);
				$(".vSprite").animate({"left": "-=40px"}, 50);
				$("#p2Sprite").animate({"left": "+=1px"}, 100).css('background-image','url(images/Z2-left.png)');
				$("#p2Stamina").html(parseInt(p2Stamina.innerHTML) -2);
				fillStaminaBar(2);
			} else if (e.keyCode === 76 && p2right == 1 && (parseInt(p2Stamina.innerHTML)) > 1) {
				p2right = 0;
				p2left = 1;
				$("#p2Sprite").animate({"left": "+=1px"}, 100).css('background-image','url(images/Z2-right.png)');
				winCheck();
			} else if (e.keyCode === 73 && (bitePoint()) === 2 && (sprites[0].alive)) {
				v1bitten();
				$("#p2Sprite").animate({"left": "+=100px"}, 100);
			}
			checkPosition();
		});
	}
//===========================================BITE=LOGIC======================================================
	function bitePoint() { // Find out which player is near the next victim
		if (p1Position.left <= sprites[0].offset && p1Position.left >= sprites[0].offset - 100) {
			return 1;
		} else if (p2Position.left <= sprites[0].offset && p2Position.left >= sprites[0].offset - 100) {
			return 2; 
		} else {
			return 0;
		}
	}

	function checkPosition() { //find the positions of all sprites for bitePoint function
		var p1 = $("#p1Sprite");
		p1Position = p1.offset();
		var p2 = $("#p2Sprite");
		p2Position = p2.offset();	
	}

	function v1bitten() { //What happens to Victim when bitten
		$("#scream").get(0).play();
			if (sprites[0].alive) {
				$(".vSprite.alive").first().css('animation', 'movingBitten 500ms infinite').removeClass('alive').addClass('dead');
				return sprites.shift();
			} 
	}

	function onOrOffScreen() { //when the Victim sprites go off screen run the function to generate new sprites
	    $(".vSprite").each(function(index) {
	    	var $this = $(this);
	       if (($this.position().left) < -1600) {
	       		spriteGenerator();
	           	$this.remove();
	           	
	       } //loop through and generate these dynamically.
	    });
	}
	var interval = self.setInterval(function(){onOrOffScreen()},2000);

	function spriteGenerator() { //function to generate new sprites at random spacing apart distances
		for (var i = 0; i < 1; i++) {
			var lastSprite = $("#v1Sprite");
			var lastPosition = parseInt(lastSprite.css("margin-left")); //grabbing last known start position.
			var newPosition = lastPosition + Math.floor(Math.random()*300);
			var newPosition2 = lastPosition + Math.floor(Math.random()*300);
			$("#gameScreen").append($("<div id='v1Sprite' class='vSprite alive' style='margin-left:" + newPosition + "px; margin-top: 150px'></div>"));
			$("#gameScreen").append($("<div id='v1Sprite' class='vSprite alive' style='margin-left:" + newPosition2 + "px; margin-top: 150px'></div>"));
		}    	
	}
//===========================================STAMINA=BAR=LOGIC================================================
	function fillStaminaBar(player) {
		var element = player === 1 ? $('#p1Stamina') : $('#p2Stamina'); //Ternary operators to dry up code and find which stamina bar to fill for which player
		element.each(function() {
			var $this = $(this);
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
		  		}
		  	);  
		});
	}
//===========================================WIN=LOGIC===================================================
	function winCheck() {
		if (p1Position.left >= 650) {
			$("#winnerMsg").html("Zombie 1 delivers the goods! His plans for infection growth will be actioned on Monday!");
			console.log(p1Position.left)
			stopGame();
		} else if (p2Position.left >= 650) {
			$("#winnerMsg").html("Zombie 2 delivers the goods! His plans for infection growth will be actioned on Monday!");
			stopGame();
		}
	}

	function stopGame() {
		p1left = 0;
		p1right = 0;
		p2left = 0;
		p2right = 0;
		$("#winMessageArea").fadeIn( 3000, function() {
			$("#winnerMsg").fadeIn (100 );
		});
		$("#restart").toggle();
	}
});
