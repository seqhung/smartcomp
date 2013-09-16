function calendarPlugin() {
}

function showCalender() {

	window.plugins.calendarPlugin = new calendarPlugin();

	window.location.href = window.plugins.calendarPlugin;
}

function createNewEvent() {
	var startDate = new Date();
	var endDate = new Date();

	endDate.setDate(startDate.getDate() + 1);
	var title = "";
	var location = "";
	var notes = "";
	var success = function() {
		//alert("Your event have created successful!");
	};
	var error = function(message) {
		//alert("Your event have created fail!");
	};
	window.plugins.calendarPlugin.createEvent(title, location, notes, startDate, endDate, success, error);
}

function createNewContact() {
	var startDate = new Date();
	var endDate = new Date();

	endDate.setDate(startDate.getDate() + 1);
	var title = "";
	var location = "";
	var notes = "";
	var contactSuccess = function() {
		//alert("Your contact have created successful!");
	};
	var contactError = function(message) {
		//alert("Your contact have created fail!");
	};
	window.plugins.calendarPlugin.addContactEvent(title, location, notes, startDate, endDate, contactSuccess, contactError);
}

function viewContactList() {
	var startDate = new Date();
	var endDate = new Date();

	endDate.setDate(startDate.getDate() + 1);
	var title = "";
	var location = "";
	var notes = "";
	var contactSuccess = function() {
		//alert("Your contact have created successful!");
	};
	var contactError = function(message) {
		//alert("Your contact have created fail!");
	};
	window.plugins.calendarPlugin.viewContactList(title, location, notes, startDate, endDate, contactSuccess, contactError);
}

function viewCalendarEvent() {
	var startDate = new Date();
	var endDate = new Date();

	endDate.setDate(startDate.getDate() + 1);
	var title = "";
	var location = "";
	var notes = "";
	var contactSuccess = function() {
		//alert("Your contact have created successful!");
	};
	var contactError = function(message) {
		//alert("Your contact have created fail!");
	};
	window.plugins.calendarPlugin.viewCalendarEvent(title, location, notes, startDate, endDate, contactSuccess, contactError);
}


calendarPlugin.prototype.createEvent = function(title, location, notes, startDate, endDate, successCallback, errorCallback) {
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

calendarPlugin.prototype.viewCalendarEvent = function(title, location, notes, startDate, endDate, successCallback, errorCallback) {
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
	'viewCalendarEvent', // Tell the plugin the action we want to perform
	[{
		"title" : title,
		"description" : notes,
		"eventLocation" : location,
		"startTimeMillis" : startDate.getTime(),
		"endTimeMillis" : endDate.getTime()
	}]);
	// List of arguments to the plugin
};

calendarPlugin.prototype.addContactEvent = function(title, location, notes, startDate, endDate, successCallback, errorCallback) {
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
	'addToContact', // Tell the plugin the action we want to perform
	[{
		"title" : title,
		"description" : notes,
		"eventLocation" : location,
		"startTimeMillis" : startDate.getTime(),
		"endTimeMillis" : endDate.getTime()
	}]);
	// List of arguments to the plugin
};



calendarPlugin.prototype.viewContactList = function(title, location, notes, startDate, endDate, successCallback, errorCallback) {
	/*if ( typeof errorCallback != "function") {
		console.log("calendarPlugin.createEvent failure: errorCallback parameter must be a function");
		return;
	}

	if ( typeof successCallback != "function") {
		console.log("calendarPlugin.createEvent failure: successCallback parameter must be a function");
		return;
	}*/
	cordova.exec(successCallback, // called when signature capture is successful
	errorCallback, // called when signature capture encounters an error
	'CalendarPlugin', // Tell cordova that we want to run "PushNotificationPlugin"
	'viewContactList', // Tell the plugin the action we want to perform
	[{
		"title" : title,
		"description" : notes,
		"eventLocation" : location,
		"startTimeMillis" : startDate.getTime(),
		"endTimeMillis" : endDate.getTime()
	}]);
	// List of arguments to the plugin
};


calendarPlugin.prototype.deleteEvent = function(title, location, notes, startDate, endDate, deleteAll, successCallback, errorCallback) {
	throw "NotImplemented";
};

calendarPlugin.prototype.findEvent = function(title, location, notes, startDate, endDate, successCallback, errorCallback) {
	throw "NotImplemented";
};

calendarPlugin.prototype.modifyEvent = function(title, location, notes, startDate, endDate, newTitle, newLocation, newNotes, newStartDate, newEndDate, successCallback, errorCallback) {
	throw "NotImplemented";
};

calendarPlugin.install = function() {
	if (!window.plugins) {
		window.plugins = {};
	}

	window.plugins.calendarPlugin = new calendarPlugin();
	return window.plugins.calendarPlugin;
};

cordova.addConstructor(calendarPlugin.install);
