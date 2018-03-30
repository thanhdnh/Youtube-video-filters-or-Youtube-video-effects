chrome.runtime.onInstalled.addListener(function (object) {
	if(object.reason==='install')
		chrome.tabs.create({url: "https://sites.google.com/view/crx/youtube-video-filters"});
});

var filter = {
  url:
  [
    {hostContains: "youtube.com"}
  ]
}

var val = 0;
var state = false;

chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
    chrome.tabs.executeScript(null,{file:"content.js"});
	chrome.tabs.insertCSS(null,{file:"app_player.css"});
	chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
		if(localStorage.getItem("youtube_filter_selected_index")!==undefined && localStorage.getItem("youtube_filter_selected_index")!==null)
			val = localStorage.getItem("youtube_filter_selected_index");
		if(localStorage.getItem("youtube_darkmode_clicked")!==undefined && localStorage.getItem("youtube_darkmode_clicked")!==null)
			state = localStorage.getItem("youtube_darkmode_clicked");
		chrome.tabs.sendMessage(tabs[0].id, {"youtube_filter_selected_index": val, "youtube_darkmode_clicked": state});	
	});
}, filter);


chrome.webNavigation.onCompleted.addListener(function(details) {
    chrome.tabs.executeScript(null,{file:"content.js"});
	chrome.tabs.insertCSS(null,{file:"app_player.css"});
	chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
		if(localStorage.getItem("youtube_filter_selected_index")!==undefined && localStorage.getItem("youtube_filter_selected_index")!==null)
			val = localStorage.getItem("youtube_filter_selected_index");
		if(localStorage.getItem("youtube_darkmode_clicked")!==undefined && localStorage.getItem("youtube_darkmode_clicked")!==null)
			state = localStorage.getItem("youtube_darkmode_clicked");
		chrome.tabs.sendMessage(tabs[0].id, {"youtube_filter_selected_index": val, "youtube_darkmode_clicked": state});
	});
}, filter);