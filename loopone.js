function loopOneVideo() {
	var player = document.getElementById('movie_player');
	var loopenable = false;

	if (player !== null) {
		player.addEventListener("onStateChange", function (state) {
			if (localStorage.getItem('youtube_filter_video_auto_loop_current_track') != null && localStorage.getItem('youtube_filter_video_auto_loop_current_track') !== undefined)
				loopenable = (localStorage.getItem('youtube_filter_video_auto_loop_current_track') == 'true' ? true : false);

			if (state === 0 && loopenable) {
				/*var replays = document.querySelectorAll('#player #player-container #movie_player .ytp-chrome-bottom .ytp-left-controls .ytp-play-button.ytp-button');
				if(replays.length>0)
					replays[0].click();*/
				player.seekTo(0);
			}
			if (state === 0 && !loopenable) {
				/*var nextvids = document.querySelectorAll('#player #player-container #movie_player .ytp-chrome-bottom .ytp-left-controls .ytp-next-button.ytp-button');
				if(nextvids.length>0)
					nextvids[0].click();*/
				player.nextVideo.call();
			}
		});
	}
}

loopOneVideo();