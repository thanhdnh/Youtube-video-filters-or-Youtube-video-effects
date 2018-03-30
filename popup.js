var radio = document.querySelectorAll("input[type=radio]");
var val = 0;
var state = false;

for(i=0; i<radio.length; i++)
	radio[i].addEventListener("change", function(){
		val = this.value;
		localStorage.setItem("youtube_filter_selected_index", val);
		chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
			chrome.tabs.sendMessage(tabs[0].id, {"youtube_filter_selected_index": val});
		});
		for(j=0; j<radio.length; j++)
			radio[j].parentElement.style.color="white";
		radio[val].parentElement.style.color="lime";
	});
	
document.addEventListener("DOMContentLoaded", function() {
	val = 0;
	if(localStorage.getItem("youtube_filter_selected_index")!==undefined && localStorage.getItem("youtube_filter_selected_index")!==null)
		val = localStorage.getItem("youtube_filter_selected_index");
	for(i=0; i<radio.length; i++)
		radio[i].checked = false;
	radio[val].checked = true;
	radio[val].parentElement.style.color="lime";
	if(val<19)
		radio[val].scrollIntoView(false);
	else if(val>36)
		radio[val].scrollIntoView(true);
	else
		radio[val-5].scrollIntoView(true);
	
	if(localStorage.getItem("youtube_darkmode_clicked")!==undefined && localStorage.getItem("youtube_darkmode_clicked")!==null)
		state = (localStorage.getItem("youtube_darkmode_clicked")==="true"?true:false);
	document.getElementById('switchdm').checked = state;
});

document.getElementById('switchdm').addEventListener('change', function(){
	state = document.getElementById('switchdm').checked;
	localStorage.setItem("youtube_darkmode_clicked", state);
	chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
		chrome.tabs.sendMessage(tabs[0].id, {"youtube_darkmode_clicked": state});
	});
});