function loopOneVideo() {
	var player = document.getElementById('movie_player');
	var loopenable = false;

	if (player !== null) {
		player.addEventListener("onStateChange", function (state) {
			if (localStorage.getItem('youtube_filter_video_auto_loop_current_track') != null && localStorage.getItem('youtube_filter_video_auto_loop_current_track') !== undefined)
				loopenable = (localStorage.getItem('youtube_filter_video_auto_loop_current_track') == 'true' ? true : false);

			if (state === 0 && loopenable) 
				player.seekTo(0);
		
			if (state === 0 && !loopenable) 
				player.nextVideo.call();
		});
	}
}

loopOneVideo();
