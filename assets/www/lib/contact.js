function contactPlugin() {
}

function showContact() {

	window.plugins.contactPlugin = new contactPlugin();

	window.location.href = window.plugins.contactPlugin;
}

function createNewContact() {
	alert('test funciton e5435');
	var startDate = new Date();
	var endDate = new Date();

	endDate.setDate(startDate.getDate() + 1);
	var title = "";
	var location = "";
	var notes = "";
	var success = function() {
		alert("Your event have created successful!");
	};
	var error = function(message) {
		alert("Your event have created fail!");
	};
	window.plugins.contactPlugin.createContact(title, location, notes, startDate, endDate, success, error);
}

contactPlugin.prototype.createContact = function(title, location, notes, startDate, endDate, successCallback, errorCallback) {
	if ( typeof errorCallback != "function") {
		console.log("calendarPlugin.createEvent failure: errorCallback parameter must be a function");
		return;
	}

	if ( typeof successCallback != "function") {
		console.log("calendarPlugin.createEvent failure: successCallback parameter must be a function");
		return;
	}
	cordova.exec(successCallback, // called when signature capture is successful
	errorCallback, // called when signature capture encounters an error
	'CalendarPlugin', // Tell cordova that we want to run "PushNotificationPlugin"
	'addToCalendar', // Tell the plugin the action we want to perform
	[{
		"title" : title,
		"description" : notes,
		"eventLocation" : location,
		"startTimeMillis" : startDate.getTime(),
		"endTimeMillis" : endDate.getTime()
	}]);
	// List of arguments to the plugin
};

contactPlugin.install = function() {
	if (!window.plugins) {
		window.plugins = {};
	}

	window.plugins.contactPlugin = new contactPlugin();
	return window.plugins.contactPlugin;
};

cordova.addConstructor(contactPlugin.install);
