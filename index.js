(function(window, $){
	//define
	var width = 320,
		height = 480;

	//background image
	var bgImage = new Image(),bgReady = false;
	bgImage.src = 'img/bg.jpg';
	bgImage.onload = function(){
		bgReady = true;
		if(bgReady && spriteReady){
			render();
		}
	};

	//other image
	var spriteImg = new Image(), spriteReady = false;
	spriteImg.src = 'img/sprite.png';
	spriteImg.onload = function(){
		spriteReady = true;
		if(bgReady && spriteReady){
			render();
		}
	}


	//canvas
	var canvas = document.getElementById('j_canvas');
	ctx = canvas.getContext('2d');

	//game objects
	var dart = {
		step : 40,
		width : 50,
		height : 80,
		x : 0,
		y : 400
	};

	var balloon = {
		direct : 'right',
		speed : 100,
		step : 10,
		width : 50,
		height : 100,
		x : 0,
		y : 50
	};

	//draw canvas
	var render = function(){
		ctx.drawImage(bgImage, 0, 0);
		//drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight,destX, destY, destWidth, destHeight)
		//dart
		ctx.drawImage(spriteImg, 50, 0, dart.width, dart.height, dart.x, dart.y, dart.width, dart.height);
		//balloon
		ctx.drawImage(spriteImg, 0, 0, balloon.width, balloon.height, balloon.x, balloon.y, balloon.width, balloon.height);
		if(keyCodeObj.keyUp === true){
			ctx.drawImage(spriteImg, 50, 0, dart.width, dart.height, dart.x + 10, dart.y - 30, 30, 30);
		}
	};

	//balloon move
	var balloonMove = function(){
		if(balloon.direct === 'right'){
			balloon.x += balloon.step;
		}else if(balloon.direct === 'left'){
			balloon.x -= balloon.step;
		}
		if(balloon.x > (width - balloon.width)){
			balloon.direct = 'left';
		}else if(balloon.x < 0){
			balloon.direct = 'right';
		}
		render();
	};
	var balloonMoveInterval = setInterval(balloonMove,balloon.speed);

	//keyboard control
	var keyCodeObj = {};
	$(window).on('keydown',function(e){
		var keyCode = e.keyCode;
		//right
		if(keyCode === 39){
			dart.x = dart.x + dart.step;
			if(dart.x > (width - dart.width)) {
				dart.x = width - dart.width;
			}
		//left
		}else if(keyCode === 37){
			dart.x = dart.x - dart.step;
			if(dart.x < 0) {
				dart.x = 0;
			}
		//up
		}else if(keyCode === 38){
			keyCodeObj.keyUp = true;
		}
		render();
	})

})(window, $)