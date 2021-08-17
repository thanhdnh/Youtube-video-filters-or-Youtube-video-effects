chrome.runtime.onInstalled.addListener(function (object) {
	if (object.reason === 'install'){
		//chrome.runtime.openOptionsPage();
		chrome.tabs.create({url: "https://fontkeyboard.org/try-our-chrome-extensions?utm_source=htvieff_install"});
		chrome.tabs.create({ url: "https://casechanger.net/videoeffects" });
		chrome.tabs.create({url: "https://sites.google.com/view/crx/toucan"});
		setRatingTime();
	}
});

//chrome.runtime.setUninstallURL("https://goo.gl/forms/u9kZy3QBHDGXIfu53");
chrome.runtime.setUninstallURL("https://fontkeyboard.org/try-our-chrome-extensions?utm_source=htvieff_uninstall");
chrome.runtime.setUninstallURL("https://sites.google.com/view/crx/toucan");

var filter = {
	url:
		[
			{ hostContains: "youtube.com" }
		]
}

var val = 0;
var state = false;
var manual = null;

chrome.webNavigation.onHistoryStateUpdated.addListener(function (details) {
	updateOnChanging();
}, filter);


chrome.webNavigation.onCompleted.addListener(function (details) {
	updateOnChanging();
}, filter);

//new
chrome.tabs.onActivated.addListener(function(activeInfo) {
	if (localStorage.getItem("youtube_filter_selected_index") !== undefined && localStorage.getItem("youtube_filter_selected_index") !== null)
		val = localStorage.getItem("youtube_filter_selected_index");
	if (localStorage.getItem("youtube_video_filters_manual") !== undefined && localStorage.getItem("youtube_video_filters_manual") !== null)
			manual = localStorage.getItem("youtube_video_filters_manual");
	chrome.tabs.sendMessage(activeInfo.tabId, { "youtube_filter_selected_index": val,"youtube_video_filters_manual": manual});
});

function updateOnChanging() {
	
	chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
		if (localStorage.getItem("youtube_filter_selected_index") !== undefined && localStorage.getItem("youtube_filter_selected_index") !== null)
			val = localStorage.getItem("youtube_filter_selected_index");
		if (localStorage.getItem("youtube_darkmode_clicked") !== undefined && localStorage.getItem("youtube_darkmode_clicked") !== null)
			state = localStorage.getItem("youtube_darkmode_clicked");
		if (localStorage.getItem("youtube_video_filters_manual") !== undefined && localStorage.getItem("youtube_video_filters_manual") !== null)
			manual = localStorage.getItem("youtube_video_filters_manual");
		if (localStorage.getItem("youtube_filter_video_fullscreen") !== undefined && localStorage.getItem("youtube_filter_video_fullscreen") !== null)
			if (localStorage.getItem("youtube_filter_video_fullscreen") === "true")
				setFSMode(true);
		if (localStorage.getItem("youtube_filter_video_noblack") !== undefined && localStorage.getItem("youtube_filter_video_noblack") !== null)
			if (localStorage.getItem("youtube_filter_video_noblack") === "true")
				setNoBlackScale(true);
		if (localStorage.getItem("youtube_filter_video_auto_pause_play") !== undefined && localStorage.getItem("youtube_filter_video_auto_pause_play") !== null)
			if (localStorage.getItem("youtube_filter_video_auto_pause_play") === "true")
				setAutoPausePlay(true);
		if (localStorage.getItem("youtube_filter_video_auto_loop_current_track") !== undefined && localStorage.getItem("youtube_filter_video_auto_loop_current_track") !== null)
			if (localStorage.getItem("youtube_filter_video_auto_loop_current_track") === "true")
				setLoopCurrentVideo(true);
		if (localStorage.getItem("youtube_filter_video_quality") !== undefined && localStorage.getItem("youtube_filter_video_quality") !== null)
			setVideQuality(localStorage.getItem("youtube_filter_video_quality"));
		if(tabs[0]!==null && tabs[0]!==undefined)
			chrome.tabs.sendMessage(tabs[0].id, { "youtube_filter_selected_index": val, "youtube_darkmode_clicked": state , "youtube_video_filters_manual": manual});
	});
}

function onMsg(request){
	if (request.youtube_filter_video_quality !== undefined) {
		setVideQuality(request.youtube_filter_video_quality);
	}
	if (request.youtube_filter_video_fullscreen !== undefined) {
		setFSMode(request.youtube_filter_video_fullscreen);
	}
	if (request.youtube_filter_video_noblack !== undefined) {
		setNoBlackScale(request.youtube_filter_video_noblack);
	}
	if (request.youtube_filter_video_auto_pause_play !== undefined) {
		setAutoPausePlay(request.youtube_filter_video_auto_pause_play);
	}
	if (request.youtube_filter_video_auto_loop_current_track !== undefined) {
		setLoopCurrentVideo(request.youtube_filter_video_auto_loop_current_track);
	}
	if (request.youtube_filter_video_upgrade_YT !== undefined) {
		upgradeYouTube(request.youtube_filter_video_upgrade_YT);
	}
}

function upgradeYouTube(bl){
	if(bl){
		chrome.tabs.query({ url: ['*://*.youtube.com/*'] }, function (tabs) {
			var c = `document.cookie="VISITOR_INFO1_LIVE=Qa1hUZu3gtk;path=/;domain=.youtube.com";`;
			for (i = 0; i < tabs.length; i++) {
				chrome.tabs.executeScript(tabs[i].id, { code: c });
			}
		});
	}
}

function setVideQuality(vq) {
	chrome.tabs.query({ url: ['*://*.youtube.com/*'] }, function (tabs) {
		var c = `localStorage.setItem("youtube_filter_video_quality","` + vq + `");
				if(document.getElementById("youtube_filter_video_quality")==null){
					var script = document.createElement("script");
					script.src = chrome.extension.getURL("playerquality.js");
					script.id = "youtube_filter_video_quality";
					document.head.appendChild(script);
				}else{
					var script5 = document.createElement("script");
					script5.appendChild(document.createTextNode("setTimeout(function(){selectVideoQuality();},1000);"));
					script5.id = "youtube_filter_video_quality_call";
					if(location.href.indexOf('youtube.com/watch?v=')>0){
						if(document.getElementById("youtube_filter_video_quality_call")!==null){
							document.getElementById("youtube_filter_video_quality_call").remove();
							setTimeout(function(){document.body.appendChild(script5);}, 1000);
						}else
							setTimeout(function(){document.body.appendChild(script5);}, 1000);
					}
				}`;

		for (i = 0; i < tabs.length; i++) {
			chrome.tabs.executeScript(tabs[i].id, { code: c });
		}
	});
}

function setLoopCurrentVideo(clv_enable) {
	if (clv_enable == true)//checked
		chrome.tabs.query({ url: ['*://*.youtube.com/*'] }, function (tabs) {
			var c = `localStorage.setItem('youtube_filter_video_auto_loop_current_track', true);
					if(document.getElementById("youtube_filter_video_auto_loop_current_track")==null){
						var script4 = document.createElement("script");
						script4.src = chrome.extension.getURL("loopone.js");
						script4.id = "youtube_filter_video_auto_loop_current_track";
						document.head.appendChild(script4);
					}else{
						var script4 = document.createElement("script");
						script4.appendChild(document.createTextNode("loopOneVideo();"));
						script4.id = "youtube_filter_video_auto_loop_current_track_call";
						if(location.href.indexOf('youtube.com/watch?v=')>0){
							if(document.getElementById("youtube_filter_video_auto_loop_current_track_call")==null){
								document.body.appendChild(script4);
							}
						}
					}`;

			for (i = 0; i < tabs.length; i++) {
				chrome.tabs.executeScript(tabs[i].id, { code: c });
			}
		});
	else
		chrome.tabs.query({ url: ['*://*.youtube.com/*'] }, function (tabs) {
			var c = `localStorage.setItem('youtube_filter_video_auto_loop_current_track', false);
					var script4 = document.getElementById("youtube_filter_video_auto_loop_current_track");
					if(script4!==null) script4.remove();`;

			for (i = 0; i < tabs.length; i++) {
				chrome.tabs.executeScript(tabs[i].id, { code: c });
			}
		});
}


function setAutoPausePlay(app_enable) {
	if (app_enable == true)//checked
		chrome.tabs.query({ url: ['*://*.youtube.com/*'] }, function (tabs) {
			var c = `localStorage.setItem('youtube_filter_video_auto_pause_play', true);
					if(document.getElementById("youtube_filter_video_auto_pause_play")==null){
						var script = document.createElement("script");
						script.src = chrome.extension.getURL("playerautopauseplay.js");
						script.id = "youtube_filter_video_auto_pause_play";
						document.head.appendChild(script);
					}`;

			for (i = 0; i < tabs.length; i++) {
				chrome.tabs.executeScript(tabs[i].id, { code: c });
			}
		});
	else
		chrome.tabs.query({ url: ['*://*.youtube.com/*'] }, function (tabs) {
			var c = `localStorage.setItem('youtube_filter_video_auto_pause_play', false);
					var script = document.getElementById("youtube_filter_video_auto_pause_play");
					if(script!==null) script.remove();`;

			for (i = 0; i < tabs.length; i++) {
				chrome.tabs.executeScript(tabs[i].id, { code: c });
			}
		});
}

function setFSMode(fs) {
	if (fs == true)
		chrome.tabs.query({ url: ['*://*.youtube.com/*'] }, function (tabs) {
			var c = `if(document.getElementById("youtube_filter_video_fullscreen")==null){
						var script2 = document.createElement("script");
						script2.src = chrome.extension.getURL("playerfs.js");
						script2.id = "youtube_filter_video_fullscreen";
						document.head.appendChild(script2);
					}else{
						var script2 = document.createElement("script");
						script2.appendChild(document.createTextNode("loadPlayerFS();"));
						script2.id = "youtube_filter_video_fullscreen_call";
						if(location.href.indexOf('youtube.com/watch?v=')>0){
							if(document.getElementById("youtube_filter_video_fullscreen_call")==null){
								document.body.appendChild(script2);
							}
						}
					}`;

			for (i = 0; i < tabs.length; i++) {
				chrome.tabs.executeScript(tabs[i].id, { code: c });
			}
		});
	else
		chrome.tabs.query({ url: ['*://*.youtube.com/*'] }, function (tabs) {
			var c = `var script2 = document.getElementById("youtube_filter_video_fullscreen");
					var fsbt = document.getElementById("ytp-enhanced-yt-mode");
					if(fsbt!==null) fsbt.remove();
					if(script2!==null) script2.remove();`;

			for (i = 0; i < tabs.length; i++) {
				chrome.tabs.executeScript(tabs[i].id, { code: c });
			}
		});
}

function setNoBlackScale(nb) {
	if (nb == true)
		chrome.tabs.query({ url: ['*://*.youtube.com/*'] }, function (tabs) {
			var d = `localStorage.setItem('youtube_filter_video_noblack', true);
					if(document.getElementById("youtube_filter_video_noblack")==null){
						var script1 = document.createElement("script");
						script1.src = chrome.extension.getURL("playernoblack.js");
						script1.id = "youtube_filter_video_noblack";
						document.head.appendChild(script1);
					}else{
						var script1 = document.createElement("script");
						script1.appendChild(document.createTextNode("var _thread = setInterval(function(){if(document.querySelectorAll('#player.style-scope.ytd-watch').length>0){clearInterval(_thread);autoScale();readyGo();}}, 500);"));
						script1.id = "youtube_filter_video_noblack_call";
						if(location.href.indexOf('youtube.com/watch?v=')>0){
							if(document.getElementById("youtube_filter_video_noblack_call")==null){
								document.body.appendChild(script1);
							}
						}
					}`;

			for (i = 0; i < tabs.length; i++) {
				chrome.tabs.executeScript(tabs[i].id, { code: d });
			}
		});
	else
		chrome.tabs.query({ url: ['*://*.youtube.com/*'] }, function (tabs) {
			var d = `localStorage.setItem('youtube_filter_video_noblack', false);
					var script1 = document.getElementById("youtube_filter_video_noblack");
					if(script1!==null) script1.remove();
					var videos = document.querySelectorAll('video');
					if(videos.length>0){
						var video = videos[0];
						video.style.transform = '';
					}`;

			for (i = 0; i < tabs.length; i++) {
				chrome.tabs.executeScript(tabs[i].id, { code: d });
			}
		});
}

function setRatingTime(){
	var d = (new Date()).getTime();
	chrome.storage.local.set({"htcom_yve__time_installed": d}, function(){});
}

/* var time_rating = window.setInterval(function(){
	chrome.storage.local.get("htcom_yve__time_installed", function(e){
		if(e["htcom_yve__time_installed"]!==undefined){
			var curr = (new Date()).getTime();
			var installed = e["htcom_yve__time_installed"];
			var time_diff = curr - installed;
			if(time_diff>2*24*60*60*1000){
				clearInterval(time_rating);
				app.tab.open("https://sites.google.com/view/crx/yve-rating", true);
				chrome.storage.local.remove("htcom_yve__time_installed", function(){});
			}
		}
	});
}, 500); */

chrome.runtime.onStartup.addListener(function(){
	//console.log('On startup');
	chrome.storage.local.get("htcom_yve__time_installed", function(e){
		if(e["htcom_yve__time_installed"]!==undefined){
			var curr = (new Date()).getTime();
			var installed = e["htcom_yve__time_installed"];
			var time_diff = curr - installed;
			if(time_diff>2*24*60*60*1000){
				app.tab.open("https://sites.google.com/view/crx/yve-rating", true);
				chrome.storage.local.remove("htcom_yve__time_installed", function(){});
			}
		}
	});
});