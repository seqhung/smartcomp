var USER_ID_SESSIION = "user_id";

function writeLocalStorage(myKey, myValue) {
	window.localStorage.setItem(myKey, myValue);
	var keyname = window.localStorage.key(0);
	//document.getElementById('contact-list-result').innerHTML = "Wrote key: <strong>" + keyname + "</strong>";
}

function readLocalStorage(myKey) {
	var value = window.localStorage.getItem(myKey);
	if (!value) {
		return 0;
		//document.getElementById('contact-list-result').innerHTML = "<strong>Null</strong> - Try Write first";
	} else {
		//document.getElementById('contact-list-result').innerHTML = "Got value: <strong>" + value + "</strong>";
		return value;
	}
}

function removeItemLocalStorage(myKey) {
	window.localStorage.removeItem(myKey);
	//document.getElementById('contact-list-result').innerHTML = "Removed key/value: <strong>myKey/vmSoftTech</strong>";
}
