document.addEventListener("DOMContentLoaded", function () {
	if (localStorage.getItem("youtube_filter_video_quality") !== null && localStorage.getItem("youtube_filter_video_quality") !== undefined) {
		document.getElementById(localStorage.getItem("youtube_filter_video_quality")).checked = true;
	}

	var radio = document.querySelectorAll("input[type=radio][name=quality]");
	for (i = 0; i < radio.length; i++)
		radio[i].addEventListener("change", function () {
			ql = this.id;
			localStorage.setItem("youtube_filter_video_quality", ql);
			chrome.runtime.sendMessage({ "youtube_filter_video_quality": ql });
		});

	if (localStorage.getItem("youtube_filter_video_fullscreen") !== undefined && localStorage.getItem("youtube_filter_video_fullscreen") !== null) {
		document.getElementById('fwin').checked = ((localStorage.getItem("youtube_filter_video_fullscreen") === "true") ? true : false);
	}
	document.getElementById('fwin').addEventListener("change", function () {
		fs = this.checked;
		localStorage.setItem("youtube_filter_video_fullscreen", fs);
		chrome.runtime.sendMessage({ "youtube_filter_video_fullscreen": fs });
	});

	if (localStorage.getItem("youtube_filter_video_noblack") !== undefined && localStorage.getItem("youtube_filter_video_noblack") !== null) {
		document.getElementById('vscale').checked = ((localStorage.getItem("youtube_filter_video_noblack") === "true") ? true : false);
	}
	document.getElementById('vscale').addEventListener("change", function () {
		nb = this.checked;
		localStorage.setItem("youtube_filter_video_noblack", nb);
		chrome.runtime.sendMessage({ "youtube_filter_video_noblack": nb });
	});

	if (localStorage.getItem("youtube_filter_video_auto_pause_play") !== undefined && localStorage.getItem("youtube_filter_video_auto_pause_play") !== null) {
		document.getElementById('switcher').checked = ((localStorage.getItem("youtube_filter_video_auto_pause_play") === "true") ? true : false);
	}
	document.getElementById('switcher').addEventListener("change", function () {
		app = this.checked;
		localStorage.setItem("youtube_filter_video_auto_pause_play", app);
		chrome.runtime.sendMessage({ "youtube_filter_video_auto_pause_play": app });
	});

	if (localStorage.getItem("youtube_filter_video_auto_loop_current_track") !== undefined && localStorage.getItem("youtube_filter_video_auto_loop_current_track") !== null) {
		document.getElementById('autoloop').checked = ((localStorage.getItem("youtube_filter_video_auto_loop_current_track") === "true") ? true : false);
	}
	document.getElementById('autoloop').addEventListener("change", function () {
		lct = this.checked;
		localStorage.setItem("youtube_filter_video_auto_loop_current_track", lct);
		chrome.runtime.sendMessage({ "youtube_filter_video_auto_loop_current_track": lct });
	});
	
	/*if (localStorage.getItem("youtube_filter_video_adblock") !== undefined && localStorage.getItem("youtube_filter_video_adblock") !== null) {
		document.getElementById('adblock').checked = ((localStorage.getItem("youtube_filter_video_adblock") === "true") ? true : false);
	}
	document.getElementById('adblock').addEventListener("change", function () {
		adb = this.checked;
		localStorage.setItem("youtube_filter_video_adblock", adb);
		chrome.runtime.sendMessage({ "youtube_filter_video_adblock": adb });
	});*/
	
	/*P2P*/
	document.getElementById('fvideo').addEventListener("change", function () {
		this.checked = true;
	});
	
	if(localStorage.getItem("youtube_filter_video_upgrade_YT") === undefined || localStorage.getItem("youtube_filter_video_upgrade_YT") === null){
		document.getElementById('htcom_YTMD').addEventListener('click', function(){
			chrome.runtime.sendMessage({"youtube_filter_video_upgrade_YT": true });
			document.getElementById('msg_upgrade_YT').innerHTML = "<center style='color:yellow;'>Please refresh YouTube to get the latest YouTube with the material design!</center>";
			localStorage.setItem("youtube_filter_video_upgrade_YT", true);
		});
	}else{
		document.getElementById('msg_upgrade_YT').innerHTML = "3) YouTube Video Effects&#8482; only works on the latest YouTube (Material Design).";
	}
});