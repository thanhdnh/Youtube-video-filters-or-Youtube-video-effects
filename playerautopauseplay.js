function setAutoPausePlay2(isautopp) {
	var player = document.getElementById('movie_player');
	var autoppenable = false;

	if (localStorage.getItem('youtube_filter_video_auto_pause_play') !== null && localStorage.getItem('youtube_filter_video_auto_pause_play') !== undefined)
		autoppenable = (localStorage.getItem('youtube_filter_video_auto_pause_play') == "true" ? true : false);

	if (player !== null) {
		if (autoppenable)
			if (isautopp) {
				player.playVideo.call();
			} else {
				player.pauseVideo.call();
			}
	}
}

window.addEventListener('focus', windowfocus);
window.addEventListener('blur', windowblur);

function windowblur() {
	setAutoPausePlay2(false);
}
function windowfocus() {
	setAutoPausePlay2(true);
}

window.blur();
window.focus();
setAutoPausePlay2(false);