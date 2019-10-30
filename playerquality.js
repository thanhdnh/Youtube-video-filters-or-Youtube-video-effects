function selectVideoQuality() {
	var qual = "auto";
	if (localStorage.getItem("youtube_filter_video_quality") !== undefined && localStorage.getItem("youtube_filter_video_quality") !== null)
		qual = localStorage.getItem("youtube_filter_video_quality");

	var qlist = Array("auto", "hires", "hd2880", "hd2160", "hd1440", "hd1080", "hd720", "large", "medium", "small", "tiny");
	var player = document.getElementById('movie_player');

	if (player !== null) {
		var avl = player.getAvailableQualityLevels();
		if (avl !== undefined && avl !== null && avl.length > 0) {
			var avlist = Array.from(Object.keys(avl).map(function (key) { return avl[key]; }));
			if (avlist.indexOf(qual) >= 0) {
				player.setPlaybackQualityRange(qual);
			} else {
				var ind = qlist.indexOf(qual);
				for (var i = ind; i++; i < qlist.length) {
					if (avlist.indexOf(qlist[i]) >= 0) {
						player.setPlaybackQualityRange(qlist[i]);
						break;
					}
				}
			}
		}/*else{
			player.setPlaybackQualityRange(qual);
		}*/
	}
}

setTimeout(function(){selectVideoQuality();},1000);
/*var dfq = "auto";
if (localStorage.getItem("youtube_filter_video_quality") !== undefined && localStorage.getItem("youtube_filter_video_quality") !== null)
	dfq = localStorage.getItem("youtube_filter_video_quality");
setInterval(function () {
	var nfq = "auto";
	if (localStorage.getItem("youtube_filter_video_quality") !== undefined && localStorage.getItem("youtube_filter_video_quality") !== null)
		nfq = localStorage.getItem("youtube_filter_video_quality");
	if (nfq != dfq) {
		selectVideoQuality();
		dfq = nfq;
	}
}, 2000);*/