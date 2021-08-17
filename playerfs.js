//{
var svg0 = `<svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%"><path d="m 31,15 0,14 -20,0 0,-14 z m -18,2 16,0 0,10 -16,0 0,-10 z" fill="#fff" fill-rule="evenodd" id="ytp-id-31"></path><path fill="orange" d="m 26,10 0,14 -20,0 0,-14 z m -18,2 16,0 0,10 -16,0 0,-10 z" fill="#fff" fill-rule="evenodd" id="ytp-id-31"></path></svg>`;
var svg1 = `<svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%"><path d="m 31,15 0,14 -20,0 0,-14 z m -18,2 16,0 0,10 -16,0 0,-10 z" fill="#fff" fill-rule="evenodd" id="ytp-id-31"></path><path fill="#fff" d="m 26,10 0,14 -20,0 0,-14 z m -18,2 16,0 0,10 -16,0 0,-10 z" fill="#fff" fill-rule="evenodd" id="ytp-id-31"></path></svg>`;
//}

loadPlayerFS();

function autoScale2(_scale) {
	var players = document.querySelectorAll('#movie_player.html5-video-player');
	var videos = document.querySelectorAll('video');
	if (players.length > 0 && videos.length > 0) {
		var player = players[0];
		var video = videos[0];
		video.style.transform = 'scale(' + _scale + ')';//_scale + 0.14
	}
}

function loadPlayerFS() {
	var fullscreenmodes = document.querySelectorAll('#player #player-container #movie_player .ytp-chrome-bottom .ytp-right-controls .ytp-fullscreen-button.ytp-button');
	if (fullscreenmodes.length > 0) {
		var fullscreenmode = fullscreenmodes[0];
		fullscreenmode.addEventListener('click', function (event) {
			var fm = document.getElementById("ytp-enhanced-yt-mode");
			setTimeout(function () {
				if (fm != null) {
					var modes = document.querySelectorAll('#player #player-container #movie_player .ytp-chrome-bottom .ytp-right-controls .ytp-size-button.ytp-button');
					if (modes.length > 0)
						fm.style.display = modes[0].style.display;
				}
			}, 600);
		});
	}
	if (document.getElementById('ytp-enhanced-yt-mode') == null) {
		var controls = document.querySelectorAll('#player #player-container #movie_player .ytp-chrome-bottom .ytp-right-controls');
		if (controls.length > 0) {
			var control = controls[0];

			var fm = document.createElement("button");
			fm.setAttribute("class", "ytp-button");
			fm.setAttribute("id", "ytp-enhanced-yt-mode");
			fm.innerHTML = svg1;
			fm.addEventListener("click", ctl_fit);
			fm.addEventListener("mousemove", ctrl_hover);
			fm.addEventListener("mouseout", ctrl_out);

			var modes = document.querySelectorAll('#player #player-container #movie_player .ytp-chrome-bottom .ytp-right-controls .ytp-size-button.ytp-button');
			var fullscreenmodes = document.querySelectorAll('#player #player-container #movie_player .ytp-chrome-bottom .ytp-right-controls .ytp-fullscreen-button.ytp-button');
			if (modes.length > 0 && fullscreenmodes.length > 0) {
				var mode = modes[0];
				var fullscreenmode = fullscreenmodes[0];
				if (localStorage.getItem("ispop") !== undefined && localStorage.getItem("ispop") !== null && localStorage.getItem("ispop") == 1) {
					document.body.appendChild(createStylePlayer());
					fm.innerHTML = svg0;
					mode.style.display = "none";
					fullscreenmode.style.display = "none";
					autoScale2(1.363);
				} else {
					fm.innerHTML = svg1;
					autoScale2(1);
				}
			}
			control.appendChild(fm);
		}
	}
}

function ctl_fit(event) {
	event.preventDefault();
	var modes = document.querySelectorAll('#player #player-container #movie_player .ytp-chrome-bottom .ytp-right-controls .ytp-size-button.ytp-button');
	var fullscreenmodes = document.querySelectorAll('#player #player-container #movie_player .ytp-chrome-bottom .ytp-right-controls .ytp-fullscreen-button.ytp-button');
	if (modes.length > 0 && fullscreenmodes.length > 0) {
		var mode = modes[0];
		var fullscreenmode = fullscreenmodes[0];
		if (localStorage.getItem("ispop") === undefined || localStorage.getItem("ispop") === null || localStorage.getItem("ispop") == 0) {
			var svgmodes = document.querySelectorAll('#player #player-container #movie_player .ytp-chrome-bottom .ytp-right-controls .ytp-size-button.ytp-button svg path');
			if (svgmodes.length > 0) {
				if (svgmodes[0].getAttribute('d')==="m 26,13 0,10 -16,0 0,-10 z m -14,2 12,0 0,6 -12,0 0,-6 z")
					mode.click();
			}
			document.body.appendChild(createStylePlayer());
			var _fm = document.getElementById('ytp-enhanced-yt-mode');
			if (_fm !== null)
				_fm.innerHTML = svg0;
			localStorage.setItem("ispop", 1);
			mode.style.display = "none";
			fullscreenmode.style.display = "none";
			autoScale2(1.363);
		} else {
			if (document.getElementById('yt_vf_htcom_fs_windows') !== null)
				document.getElementById('yt_vf_htcom_fs_windows').remove();
			var _fm = document.getElementById('ytp-enhanced-yt-mode');
			if (_fm !== null)
				_fm.innerHTML = svg1;
			localStorage.setItem("ispop", 0);
			mode.style.display = "";
			fullscreenmode.style.display = "";
			autoScale2(1);
		}
	}
}

function createStylePlayer() {
	var style = document.createElement("style");
	style.id = "yt_vf_htcom_fs_windows";
	style.type = 'text/css';
	style.appendChild(document.createTextNode(`
		#player{
			position: absolute !important;
			top: 0px;
			left: 0px;
			width: `+ (window.innerWidth) + `px !important;
			height: `+ (window.innerHeight) + `px !important;
			z-index:9999;
			background:black;
		}
		#player #movie_player .ytp-iv-video-content{
			z-index:-1;
		}
		#player #movie_player .html5-video-container, #player #player-container-outer,  #player #player-container-outer #player-container-inner, #player #movie_player .html5-video-container video{
			width: `+ (window.innerWidth) + `px !important;
			height: `+ (window.innerHeight) + `px !important;
			top:0px !important;
			left:0px !important;
			position:unset !important;
		}
		body::-webkit-scrollbar {
		  width: 0px !important;
		  height: 0px !important;
		  background-color: black;
		}
		#player #player-container #movie_player .ytp-chrome-bottom{
			width: `+ (window.innerWidth - 26) + `px !important;
		}
	`));
	return style;
}

function ctrl_hover(event) {
	event.preventDefault();
	var dtitles = document.querySelectorAll("#player .html5-video-player .ytp-tooltip.ytp-bottom");
	var titles = document.querySelectorAll("#player .html5-video-player .ytp-tooltip.ytp-bottom .ytp-tooltip-text-wrapper .ytp-tooltip-text");
	if (titles.length > 0 && dtitles.length > 0) {
		var title = titles[0];
		var dtitle = dtitles[0];
		title.innerHTML = "Infinity Mode";
		dtitle.style.display = "inline";
		dtitle.style.left = event.target.offsetLeft;
		dtitle.style.paddingLeft = '10px';
	}
}
function ctrl_out(event) {
	event.preventDefault();
	var dtitles = document.querySelectorAll("#player .html5-video-player .ytp-tooltip.ytp-bottom");
	if (dtitles.length > 0) {
		var dtitle = dtitles[0];
		dtitle.style.display = "none";
	}
}
window.onresize = function () {
	if (localStorage.getItem("ispop") !== undefined && localStorage.getItem("ispop") !== null && localStorage.getItem("ispop") == 1) {
		if (document.getElementById('yt_vf_htcom_fs_windows') !== null)
			document.body.appendChild(createStylePlayer());
		var _fm = document.getElementById('ytp-enhanced-yt-mode');
		if (_fm !== null)
			_fm.innerHTML = svg0;
	} else {
		var _fm = document.getElementById('ytp-enhanced-yt-mode');
		if (_fm !== null)
			_fm.innerHTML = svg1;
	}
}
