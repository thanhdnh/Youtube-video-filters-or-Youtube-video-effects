function autoScale() {
	var players = document.querySelectorAll('#movie_player.html5-video-player');
	var videos = document.querySelectorAll('video');
	if (players.length > 0 && videos.length > 0) {
		var player = players[0];
		var video = videos[0];
		var _scaleX = player.offsetWidth / video.offsetWidth;
		var _scaleY = player.offsetHeight / video.offsetHeight;
		var _scale = Math.max(_scaleX, _scaleY);//console.log(_scaleX+", "+_scaleY+","+_scale);
		//console.log(_scale);
		if (_scale > 1.05) {
			video.style.transform = 'scale(' + (_scale+0.04) + ')';//_scale + 0.14
		} /*else {
			video.style.transform = 'scale(1.363)';//1.51
		}*/
	}
}

function readyGo() {
	var noblackenable = false;
	var fsmode = document.getElementById('ytp-enhanced-yt-mode');
	
	if (fsmode != null) {
		fsmode.addEventListener('click', function () {//console.log("fullscale mode");
			setTimeout(function () { autoScale(); }, 500);
		});
	}
	
	var player = document.getElementById('movie_player');
	if (player != null && player != undefined) {
		player.addEventListener("onStateChange", function (state) {
			if (state === 0)
				setTimeout(function () { autoScale(); }, 500);
		});
		player.addEventListener("resize", function () {
			if (localStorage.getItem('youtube_filter_video_noblack') != null && localStorage.getItem('youtube_filter_video_noblack') != undefined)
				noblackenable = (localStorage.getItem('youtube_filter_video_noblack') == 'true' ? true : false);
			if (noblackenable)
				autoScale();
		});
	}
}


var _thread = setInterval(function () {
	if (document.querySelectorAll('#player.style-scope').length > 0) {
		clearInterval(_thread);
		autoScale();
		readyGo();
	}
}, 600);