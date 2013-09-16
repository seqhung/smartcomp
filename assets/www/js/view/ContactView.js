var ContactView = function (contact) {
    this.initialize = function() {
        this.el = $("<div/>");
        this.el.on("click", ".add-contact-btn", this.addToContacts);
    };

    this.render = function () {
        this.el.html(ContactView.tplContact(contact));
        return this;
    };

    this.addToContacts = function (event) {
        event.preventDefault();
        console.log('addToContacts');
        if (!navigator.contacts) {
            app.showAlert("Contacts API not supported", "Error");
            return;
        }
        var contactObj = navigator.contacts.create();
        contactObj.name = { givenName: contact.firstName, familyName: contact.lastName };
        var phoneNumbers = [];
        phoneNumbers[0] = new ContactField('work', contact.officePhone, false);
        phoneNumbers[1] = new ContactField('mobile', contact.cellPhone, true); // preferred number
        contactObj.phoneNumbers = phoneNumbers;
        contactObj.save();
        return false;
    };

    this.initialize();
}

ContactView.tplContact = Handlebars.compile($("#tpl-contact-detail").html());