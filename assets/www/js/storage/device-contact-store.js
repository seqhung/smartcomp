var DeviceContactStore = function (successCallback, erorrCallback) {

    this.findByName = function (searchKey, callback) {
        if (!navigator.contacts) {
            alert("Not On Mobile Device", "Error");
            return;
        }
        var options = new ContactFindOptions();
        options.filter = searchKey;
        options.multiple = true;
        var fields = ["*"];
        
        navigator.contacts.find(fields, function (contacts) {
            callLater(callback, contacts);
        }, onFail, options);
        
    };

    this.findById = function (id, callback) {
        var options = new ContactFindOptions();
        options.filter = id;
        options.multiple = true;
        var fields = ["*"];

        navigator.contacts.find(fields, function (contacts) {
            for (var i = 0; i < contacts.length; i++) {
                if (contacts[i].id == id) {
                    callLater(callback, contacts[i]);
                    break;
                }
            }
        }, onFail, options);
    };

    var onFail = function (contactError) {
        alert("contact.find() error: " + contactError);
    };

    // Used to simulate async calls. This is done to provide a consistent interface with stores (like WebSqlStore)
    // that use async data access APIs
    var callLater = function (callback, data) {
        if (callback) {
            setTimeout(function () {
                callback(data);
            });
        }
    };

    callLater(successCallback);
}