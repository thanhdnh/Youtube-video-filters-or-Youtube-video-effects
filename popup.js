var radio = document.querySelectorAll("input[type=radio]");
var val = 0;
var state = false;
var number = document.querySelectorAll('input[type=number]');
var vl = new Array(number.length);

for (i = 0; i < radio.length-1; i++)
	radio[i].addEventListener("change", function () {
		val = this.value;
		localStorage.setItem("youtube_filter_selected_index", val);
		chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
			chrome.tabs.sendMessage(tabs[0].id, { "youtube_filter_selected_index": val });
		});
		for (j = 0; j < radio.length; j++)
			radio[j].parentElement.style.color = "white";
		radio[val].parentElement.style.color = "lime";
		if(val==58){
			document.getElementById('manualfilter').style.display = '';
			document.getElementById('mfcontainer').style.height = 'auto';
		}else{
			document.getElementById('manualfilter').style.display = 'none';
			document.getElementById('mfcontainer').style.height = '29px';
		}
	});
radio[radio.length-1].addEventListener("change", function () {
	val = this.value;
	localStorage.setItem("youtube_filter_selected_index", val);
	for(q=0; q<number.length; q++){
		var vdom = document.getElementById('manual'+(q+1));
		if(vdom!=null)
			vl[q] = vdom.value;
		else
			vl[q] = 0;
	}
	localStorage.setItem('youtube_video_filters_manual', JSON.stringify(vl));
	chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
		chrome.tabs.sendMessage(tabs[0].id, { "youtube_filter_selected_index": val, "youtube_video_filters_manual": JSON.stringify(vl)});
	});
	for (j = 0; j < radio.length; j++)
		radio[j].parentElement.style.color = "white";
	radio[val].parentElement.style.color = "lime";
	document.getElementById('manualfilter').style.display = '';
	document.getElementById('mfcontainer').style.height = 'auto';
});

	
document.getElementById('setvalue').addEventListener("click", function(){
	for (p = 0; p<number.length; p++){
		if(parseInt(number[p].value)>parseInt(number[p].max))
			number[p].value=number[p].max;
		if(parseInt(number[p].value)<parseInt(number[p].min))
			number[p].value=number[p].min;
	}
	for(q=0; q<number.length; q++){
		var vdom = document.getElementById('manual'+(q+1));
		if(vdom!=null)
			vl[q] = vdom.value;
		else
			vl[q] = 0;
	}
	localStorage.setItem('youtube_video_filters_manual', JSON.stringify(vl));
	chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
		chrome.tabs.sendMessage(tabs[0].id, { "youtube_filter_selected_index": radio[radio.length-1].value, "youtube_video_filters_manual": JSON.stringify(vl) });
	});
});

document.getElementById('manualfilter').addEventListener('keydown', function(ev){
	if(ev.code == "Enter" && ev.key == "Enter")
		document.getElementById('setvalue').click();
});

document.addEventListener("DOMContentLoaded", function () {
	val = 0;
	if (localStorage.getItem("youtube_filter_selected_index") !== undefined && localStorage.getItem("youtube_filter_selected_index") !== null)
		val = localStorage.getItem("youtube_filter_selected_index");
	for (i = 0; i < radio.length; i++)
		radio[i].checked = false;
	radio[val].checked = true;
	radio[val].parentElement.style.color = "lime";
	if (val < 16)
		radio[val].scrollIntoView(false);
	else
		radio[val - 5].scrollIntoView(true);
	if(val==58){
		document.getElementById('manualfilter').style.display = '';
		document.getElementById('mfcontainer').style.height = 'auto';
	}else{
		document.getElementById('manualfilter').style.display = 'none';
		document.getElementById('mfcontainer').style.height = '29px';
	}
	if (localStorage.getItem("youtube_video_filters_manual") !== undefined && localStorage.getItem("youtube_video_filters_manual") !== null){
		vl = JSON.parse(localStorage.getItem('youtube_video_filters_manual'));
		for(q=0; q<number.length; q++){
			var vdom = document.getElementById('manual'+(q+1));
			if(vdom!=null)
				vdom.value = vl[q];
		}
	}

	/* if (localStorage.getItem("youtube_darkmode_clicked") !== undefined && localStorage.getItem("youtube_darkmode_clicked") !== null)
		state = (localStorage.getItem("youtube_darkmode_clicked") === "true" ? true : false);
	document.getElementById('switchdm').checked = state; */
});

/* document.getElementById('switchdm').addEventListener('change', function () {
	state = document.getElementById('switchdm').checked;
	localStorage.setItem("youtube_darkmode_clicked", state);
	chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
		chrome.tabs.sendMessage(tabs[0].id, { "youtube_darkmode_clicked": state });
	});
}); */

document.getElementById('moption').addEventListener('click', function () {
	chrome.runtime.openOptionsPage();
});

document.getElementById('showhidenote').addEventListener('click', function(){
	var note = document.querySelectorAll('.note');
	if(note.length>0)
		for(k=0; k<note.length; k++)
			if(note[k].style.display!=='-webkit-box'){
				note[k].style.display = '-webkit-box';
				this.setAttribute('title', 'Close it');
				document.getElementById('showhidenote').innerHTML="Close";
			}
			else{
				note[k].style.display = 'none';
				this.setAttribute('title', 'Read more');
				document.getElementById('showhidenote').innerHTML="&laquo; Tips &raquo;";
			}
	this.scrollIntoView();
});