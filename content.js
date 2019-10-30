//{
var filters = new Array("rgba(0,0,0,0)",
	"rgba(0,255,0,.1)",//memory
	"rgba(255,255,0,.1)",//moonlight
	"rgba(0, 255, 255, .15)",//ice
	"rgba(255,0,0,.15)",//blood
	"rgba(252, 162, 16,.15)",//sunrise
	"rgba(0,0,255,.1)",//sadness
	"rgba(255,255,255,.1)",//brighter
	"rgba(0,0,0,.2)",//darker
	"rgba(235,207,35,.18)",//autumn
	"rgba(199,21,133,.15)",//war
	"rgba(255,0,255, 0.17)",//love
	`url('`+chrome.extension.getURL('audio/images/fisheye.png')+`')`,//crystal
	"rgba(62, 32, 34, .22)",//chocolate
	`url('`+chrome.extension.getURL('audio/images/abstract.png')+`')`,//focus 2
	"radial-gradient(ellipse at center, #f7313400 0%,#ff000000 7%,#ff000000 7%,#12121200 7%,#121212 70%)",//focus 5
	`url('`+chrome.extension.getURL('audio/images/old.png')+`')`,//focus 2
	`url('`+chrome.extension.getURL('audio/images/light.png')+`')`,//focus 3
	`url('`+chrome.extension.getURL('audio/images/drop.png')+`')`,//focus 4
	`url('`+chrome.extension.getURL('audio/images/neon.png')+`')`,//focus 4
	"repeating-radial-gradient(circle at 120% 120%,rgba(255, 190, 0, 0.2),rgba(255, 190, 0, 0.15) 20px,rgba(255, 190, 0, 0.15) 20px,rgba(255, 190, 0, 0.2) 20px), repeating-radial-gradient(circle at 0% 120%,rgba(255, 190, 0, 0.2),rgba(255, 190, 0, 0.15) 20px,rgba(255, 190, 0, 0.15) 20px,rgba(255, 190, 0, 0.2) 20px)",//Autumn curve
	"repeating-radial-gradient(circle at 120% 120%,rgba(0, 0, 255, 0.2),rgba(0, 0, 255, 0.15) 20px,rgba(0, 0, 255, 0.15) 20px,rgba(0, 0, 255, 0.2) 20px), repeating-radial-gradient(circle at 0% 120%,rgba(0, 0, 255, 0.2),rgba(0, 0, 255, 0.15) 20px,rgba(0, 0, 255, 0.15) 20px,rgba(0, 0, 255, 0.2) 20px)",//Ice curve
	"radial-gradient(circle, rgba(255, 255, 0, 0.1), rgba(0, 153, 102, .2), rgba(128, 0, 128, .3))",
	"radial-gradient(circle, rgba(255, 255, 255, 0.1), rgba(101, 0, 153, 0.2), rgba(0, 170, 251, 0.3))",
	"-webkit-linear-gradient(60deg, rgba(232, 150, 0, 0.2) 12%, rgba(0,0,0,0) 12.5%, rgba(0,0,0,0) 87%, rgba(252, 163, 0, 0.2) 87.5%, rgba(153, 153, 153, .1) 0), -webkit-linear-gradient(-60deg, rgba(255, 106, 0, 0.1) 12%, rgba(0,0,0,0) 12.5%, rgba(255, 249, 0, 0) 87%, rgba(255, 166, 4, 0.1) 87.5%, rgba(153, 153, 153, .1) 0), -webkit-linear-gradient(60deg, rgba(0, 55, 255, 0.1) 12%, rgba(0,0,0,0) 12.5%, rgba(0,0,0,0) 87%, rgba(153, 153, 153, .1) 87.5%, rgba(153, 153, 153, .1) 0), -webkit-linear-gradient(-60deg, rgba(254, 177, 2, 0.1) 12%, rgba(0,0,0,0) 12.5%, rgba(0,0,0,0) 87%, rgba(0, 255, 255, 0.1) 87.5%, rgba(228, 255, 0, 0.1) 0), -webkit-linear-gradient(30deg, rgba(249, 159, 159, 0.1) 25%, rgba(0,0,0,0) 25.5%, rgba(0,0,0,0) 75%, rgba(187, 187, 187, .1) 75%, rgba(255, 171, 46, 0.1) 0), -webkit-linear-gradient(30deg, rgba(187, 187, 187, .1) 25%, rgba(0,0,0,0) 25.5%, rgba(0,0,0,0) 75%, rgba(255, 0, 0, 0.1) 75%, rgba(63, 255, 0, 0.1) 0), rgba(222, 247, 9, 0.1)",
	"-webkit-linear-gradient(90deg, rgba(0, 220, 255, 0) 20%, rgba(0, 196, 255, 0.098) 20%, rgba(169, 255, 0, 0.098) 40%, rgba(0, 220, 255, 0.1) 40%, rgba(0, 173, 255, 0.05) 60%, rgba(0, 149, 255, 0.15) 60%, rgba(0, 184, 255, 0.05) 80%, rgba(0, 255, 173, 0.1) 80%), -webkit-linear-gradient(180deg, rgba(255, 0, 102, 0) 20%, rgba(255, 212, 0, 0.098) 20%, rgba(0, 255, 255, 0.098) 40%, rgba(255, 188, 0, 0.05) 40%, rgba(0, 243, 255, 0.05) 60%, rgba(0, 184, 255, 0.13) 60%, rgba(0, 149, 255, 0.1) 80%, rgba(0, 208, 255, 0.14) 80%), rgba(255, 204, 0, 0.01)",
	"-webkit-linear-gradient(90deg, rgba(255,100,102,0) 20%, rgba(255,100,102,0.0980392) 20%, rgba(255,100,102,0.0980392) 40%, rgba(255,100,102,.1) 40%, rgba(255,100,102,0.05) 60%, rgba(255, 47, 0, 0.15) 60%, rgba(255,100,102,0.05) 80%, rgba(255,100,102,0.1) 80%), -webkit-linear-gradient(180deg, rgba(255,100,102,0) 20%, rgba(255,100,102,0.0980392) 20%, rgba(255,100,102,0.0980392) 40%, rgba(255,100,102,0.05) 40%, rgba(255,100,102,0.05) 60%, rgba(255,100,102,0.13) 60%, rgba(255,100,102,0.1) 80%, rgba(255,100,102,0.14) 80%), rgba(255, 204, 0,.01)",
	`url('`+chrome.extension.getURL('audio/images/imagination.png')+`')`,
	`url('`+chrome.extension.getURL('audio/images/hearts.svg')+`')`,
	`url('`+chrome.extension.getURL('audio/images/fog.png')+`')`,
	`url('`+chrome.extension.getURL('audio/images/waterflow.png')+`')`,
	`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"><rect width="5" height="5" style="fill:rgba(255,255,0,.1);" /><rect x="5" y="5" width="5" height="5" style="fill:rgba(255,255,0,.1);"/><rect x="5" y="0" width="5" height="5" style="fill:rgba(0,0,0,0);"/><rect x="0" y="5" width="5" height="5" style="fill:rgba(0,0,0,0);"/></svg>')`
);
var svgfilter = new Array(
	`<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs><filter id="myfilter"  filterUnits="objectBoundingBox" x="0%" y="0%" width="100%" height="100%"><feColorMatrix type="matrix" in="SourceGraphic" values=".63 0 .63 0 0  .63 .63 0.63 0 0 .63 0 0.63 0 0 .63 0 .63 0 0"/>    </filter></defs></svg>`,/*gamma*/
	`<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs><filter in="SourceGraphic" id="myfilter"><feColorMatrix type="saturate" in="SourceGraphic" values="0.7"/></filter></defs></svg>`,/*sat-*/
	`<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs><filter in="SourceGraphic" id="myfilter"><feColorMatrix type="saturate" in="SourceGraphic" values="1.3"/></filter></defs></svg>`,/*sat+*/
	`<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs><filter in="SourceGraphic" id="myfilter"><feColorMatrix type="saturate" in="SourceGraphic" values="0.4"/></filter></defs></svg>`,/*sat--*/
	`<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs><filter in="SourceGraphic" id="myfilter"><feColorMatrix type="saturate" in="SourceGraphic" values="1.6"/></filter></defs></svg>`,/*sat++*/
	`<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs><filter in="SourceGraphic" id="myfilter"><feConvolveMatrix preserveAlpha="true" kernelMatrix="1 0 0 0 0 0 0 0 -1" bias="0.5"/></filter></defs></svg>`,/*map1*/
	`<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs><filter in="SourceGraphic" id="myfilter"><feConvolveMatrix preserveAlpha="true" kernelMatrix="1 0 0 0 0 0 0 0 -1" bias="0.5"/></filter></defs></svg>`,/*map2*/
	`<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs><filter in="SourceGraphic" id="myfilter"><feConvolveMatrix preserveAlpha="true" kernelMatrix="1 0 0 0 0 0 0 0 -1" bias="0.5"/></filter></defs></svg>`,/*map3*/
	`<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs><filter in="SourceGraphic" id="myfilter"><feConvolveMatrix preserveAlpha="true" kernelMatrix="0 -1 0 -1 5 -1 0 -1 0" /></filter></defs></svg>`,/*sharpen*/
	`<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs><filter in="SourceGraphic" id="myfilter"><feConvolveMatrix preserveAlpha="true" kernelMatrix="-2 -1 0 -1 1 1 0 1 2" /></filter></defs></svg>`,/*emboss*/
	`<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs><filter in="SourceGraphic" id="myfilter"><feTurbulence type="fractalNoise" baseFrequency="0.01 0.04" numOctaves="1" result="warp" />      <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="20" in="SourceGraphic" in2="warp" /></filter></defs></svg>`,/*underwater*/
	`<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs><filter id="myfilter"><feColorMatrix type="saturate" in="SourceGraphic" values="0.4"/><feMorphology operator="erode" radius="2"/></filter></defs></svg>`,/*drawing*/
	`<svg width="0" height="0" xmlns="http://www.w3.org/2000/svg"><defs><filter in="SourceGraphic" id="myfilter"><feConvolveMatrix preserveAlpha="true" kernelMatrix="0 -1 0 -1 4 -1 0 -1 0" /><feConvolveMatrix preserveAlpha="true" kernelMatrix="-1 -1 -1 -1 10 -1 -1 -1 -1" /><feConvolveMatrix preserveAlpha="true" kernelMatrix=".11 .11 .11 .11 .11 .11 .11 .11 .11" /></filter></defs></svg>`,/*contour--*/
	`<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs><filter id = "myfilter">    <feSpecularLighting result="specOut" specularExponent="10" lighting-color="orange"><fePointLight x="0" y="0" z="60"/></feSpecularLighting><feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0"/></filter></defs></svg>`,/*phongshading*/
	`<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs><filter id="myfilter"><feColorMatrix type="hueRotate" values="30"/></filter></defs></svg>`,
	`<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs><filter id="myfilter"><feColorMatrix type="hueRotate" values="50"/></filter></defs></svg>`,
	`<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs><filter id="myfilter"><feColorMatrix type="hueRotate" values="100"/></filter></defs></svg>`,
	`<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs><filter id="myfilter"><feColorMatrix type="hueRotate" values="150"/></filter></defs></svg>`,
	`<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs><filter id="myfilter"><feColorMatrix type="hueRotate" values="200"/></filter></defs></svg>`,
	`<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs><filter in="SourceGraphic" id="myfilter"><feComponentTransfer><feFuncR type="linear" slope="2" intercept="-.03"/><feFuncG type="linear" slope="2" intercept="-.03"/><feFuncB type="linear" slope="2" intercept="-.03"/></feComponentTransfer></filter></defs></svg>`,/*Contrast*/
	`<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs><filter in="SourceGraphic" id="myfilter"><feComponentTransfer><feFuncR type="linear" slope="10" intercept="-.03"/><feFuncG type="linear" slope="10" intercept="-.03"/><feFuncB type="linear" slope="10" intercept="-.03"/></feComponentTransfer></filter></defs></svg>`/*exposure*/
);
//}

var selected = 0;
var state = null;

var _thread_mask = setInterval(function(){
	var video = document.getElementsByTagName("video");
	if(video.length>0){
		clearInterval(_thread_mask);
		addMask();
	}
}, 50);

window.addEventListener('keydown', function(kevent){
	if(kevent.keyCode==120){//F9
		P2P();
	}
});

function addMask(){
	if(location.href.indexOf("youtube.com")>0 || location.href.indexOf("youtube-nocookie.com")>0)
		if (document.getElementById('ytp-video-filters-htcom') == null) {
			var video = document.getElementsByTagName("video");
			if (video.length > 0) {
				var holder = video[0].parentElement.parentElement;
				var filter = document.createElement("div");

				filter.setAttribute("id", "ytp-video-filters-htcom");
				filter.style.position = "absolute";
				filter.style.width = "100%";
				filter.style.height = "100%";
				filter.style.top = 0;
				filter.style.left = 0;
				filter.style.zIndex = "10";
				filter.style.pointerEvents = "none";
				filter.style.background = filters[selected];
				holder.appendChild(filter);
			}
		}
}

function applyFilter(index, manual) {
	var videos = document.getElementsByTagName("video");
	if (videos.length > 0) {
		var video = videos[0];
		var y = videos[0].parentElement;
		var filter = document.getElementById("ytp-video-filters-htcom");
		var len = filters.length;
		if (filter != null && filter != undefined) {
			if (index < len) {
				video.style.filter = "";
				filter.style.background = filters[index];
				y.style.filter = '';
				filter.style.backgroundSize = 'cover';
				if(index==16)
					y.style.filter = 'sepia(90%) hue-rotate(30deg)';
				if(index==31)
					filter.style.backgroundSize = 'unset';
			} else if (index == len) {
				filter.style.background = "";
				filter.style.backgroundSize = 'unset';
				video.style.filter = "sepia(100%)";
				y.style.filter = '';
			} else if (index == len + 1) {
				filter.style.background = "";
				filter.style.backgroundSize = 'unset';
				video.style.filter = "grayscale(100%)";
				y.style.filter = '';
			} else if (index == len + 3) {
				filter.style.background = "";
				filter.style.backgroundSize = 'unset';
				video.style.filter = "blur(1px)";
				y.style.filter = '';
			} else if (index == len + 2) {
				filter.style.background = "";
				filter.style.backgroundSize = 'unset';
				video.style.filter = "blur(2px)";
				y.style.filter = '';
			} else if (index == 57){//scanline
				filter.style.background = "";
				filter.style.background = `url('`+chrome.extension.getURL('audio/images/scanline.png')+`')`;
				filter.style.backgroundSize = 'cover';
				video.style.filter = "";
				y.style.filter = '';
			} else if(index==58){
				filter.style.background = "";
				filter.style.backgroundSize = 'unset';
				var man = new Array("0", "0", "0", "0", "0", "0", "0");
				if(manual!=null)
					man = JSON.parse(manual);
				var fil = '';
				if(man[0]!=0)
					fil += ' contrast('+(((parseInt(man[0])+10)*10)*(parseInt(man[0])/10+1))+'%)';
				if(man[1]!=0)
					fil += ' saturate('+(((parseInt(man[1])+10)*10)*(parseInt(man[1])/10+1))+'%)';
				if(man[2]!=0)
					fil += ' brightness('+(((parseInt(man[2])+10)*10)*(parseInt(man[2])/10+1))+'%)';
				if(man[3]!=0)
					fil += ' grayscale('+((parseInt(man[3]))*10)+'%)';
				if(man[4]!=0)
					fil += ' invert('+((parseInt(man[4]))*10)+'%)';
				if(man[5]!=0)
					fil += ' sepia('+((parseInt(man[5]))*10)+'%)';
				if(man[6]!=0)
					fil += ' hue-rotate('+((parseInt(man[6]))*36)+'deg)';

				video.style.filter = fil;
				y.style.filter = '';
			}else {
				filter.innerHTML = svgfilter[index - len - 4];
				video.style.filter = "url(#myfilter)";
				filter.style.background = "";
				filter.style.backgroundSize = 'unset';
				y.style.filter = '';
				if(index==41||index==42||index==43){
					if(index==41)
						y.style.filter = 'invert(100%)';
					else if(index==42)
						y.style.filter = 'sepia(100%) brightness(50%) hue-rotate(280deg)';
					else if(index==43)
						y.style.filter = 'sepia(100%) brightness(50%) hue-rotate(180deg)';
				}
			}
		}
	}
}

chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		if (request.youtube_filter_selected_index !== undefined) {
			selected = request.youtube_filter_selected_index;
			var manual = null;
			if(request.youtube_video_filters_manual!==undefined)
				manual = request.youtube_video_filters_manual; 
			var _thread_apply_filter = setInterval(function(){
				if (document.getElementById('ytp-video-filters-htcom') != null){
					clearInterval(_thread_apply_filter);
					applyFilter(selected, manual);
				}
			}, 50);
		}
		if (request.youtube_darkmode_clicked !== undefined) {
			state = ((request.youtube_darkmode_clicked === "true") || (request.youtube_darkmode_clicked === true) ? true : false);
			if(window.self == window.top && window.location.hostname.indexOf(".youtube.com")>=0){//not in iframe
				toggleDarkMode(state);
			}
		}
	}
);

function toggleDarkMode(s) {
	if (s == true) {
		document.documentElement.removeAttribute("style");
		document.documentElement.setAttribute("style", "font-size: 10px; font-family: Roboto, Arial, sans-serif; background-color: rgb(19, 19, 19);");
		document.documentElement.setAttribute("dark", "true");

		var masthead = document.getElementById('masthead');
		if(masthead!=null&&masthead!=undefined){
			masthead.setAttribute("style", "--yt-swatch-primary:rgb(35,35,35); --yt-swatch-primary-darker:rgb(32,32,32); --yt-swatch-text:rgb(255,255,255); --yt-swatch-important-text:rgb(255,255,255); --yt-swatch-input-text:rgba(255,255,255,1); --yt-swatch-textbox-bg:rgba(19,19,19,1); --yt-swatch-logo-override:rgb(255,255,255); --yt-swatch-icon-color:rgba(136,136,136,1);");
			masthead.setAttribute("dark", "");
		}
	} else {
		document.documentElement.removeAttribute("style");
		document.documentElement.setAttribute("style", "font-size: 10px; font-family: Roboto, Arial, sans-serif; background-color: rgb(255, 255, 255);");
		document.documentElement.removeAttribute("dark");

		var masthead = document.getElementById('masthead');
		if(masthead!=null&&masthead!=undefined){
			masthead.setAttribute("style", "--yt-swatch-primary:rgb(255,255,255); --yt-swatch-primary-darker:rgb(230,230,230); --yt-swatch-text:rgba(17,17,17,0.4); --yt-swatch-input-text:rgba(17,17,17,1); --yt-swatch-textbox-bg:rgba(255,255,255,1); --yt-swatch-icon-color:rgba(136,136,136,1)");
			masthead.removeAttribute("dark");
		}
	}
	forceMasthead2Dark(state);
}

function forceMasthead2Dark(s){
	var _mh = document.getElementById('forceMasthead2Dark');
	if(_mh!=null){
		_mh.remove();
	}
	var style = document.createElement('style');
	style.setAttribute('id', 'forceMasthead2Dark');
	style.type = "text/css";
	if(s==true){
		var css = `
			ytd-masthead#masthead{
				--yt-swatch-primary:rgb(35,35,35) !important; 
				--yt-swatch-primary-darker:rgb(32,32,32) !important; 
				--yt-swatch-text:rgb(255,255,255) !important; 
				--yt-swatch-important-text:rgb(255,255,255) !important; 
				--yt-swatch-input-text:rgba(255,255,255,1) !important; 
				--yt-swatch-textbox-bg:rgba(19,19,19,1) !important; 
				--yt-swatch-logo-override:rgb(255,255,255) !important; 
				--yt-swatch-icon-color:rgba(136,136,136,1) !important;
			}
			paper-button, ytd-guide-entry-renderer[active], ytd-topbar-logo-renderer#logo{filter:hue-rotate(45deg) !important;}
		`;
		style.appendChild(document.createTextNode(css));
	}else{
		var css = `
			ytd-masthead#masthead{
				--yt-swatch-primary:rgb(255,255,255) !important; 
				--yt-swatch-primary-darker:rgb(230,230,230) !important; 
				--yt-swatch-text:rgba(17,17,17,0.4) !important; 
				--yt-swatch-input-text:rgba(17,17,17,1) !important; 
				--yt-swatch-textbox-bg:rgba(255,255,255,1) !important; 
				--yt-swatch-icon-color:rgba(136,136,136,1) !important;
			}
		`;
		style.appendChild(document.createTextNode(css));
	}
	document.body.appendChild(style);
}

function P2P(){//F9
	//if(document.pictureInPictureEnabled){	
		video = document.querySelector('video');	
		video.requestPictureInPicture();
	//}
}

/*function P2POff(){//Alt+Q
	if(document.pictureInPictureEnabled){	
		video = document.querySelector('video');	
		document.exitPictureInPicture();
	}
}*/