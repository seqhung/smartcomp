var db = 0;
var SERVER_URL = 'http://smartcomp.sai-it.com/api/';
var CONTACT_URL = SERVER_URL + 'contacts/';
var QUOTATION_URL = SERVER_URL + 'quotations/';

var USER_URL = SERVER_URL + 'agents/';

function parse_user_list(userList) {

	db.transaction(function(tx) {

		var sql = "INSERT OR REPLACE INTO User(id, username, password) VALUES (?,?,?)";
		var length = userList.length;

		//alert(print_r(userList));
		for (var i = 0; i < length; i++) {
			var e = userList[i];
			tx.executeSql(sql, [e.Id, e.Username, e.Password]);
		}

	}, function(err) {
		console.log('Sync user error: ');
		alert(print_r(err));
	}, function() {
		console.log('Synch user success ');
		//alert('Synch user success 6456456');
	});

}

function parse_contact_list(contactList) {
	//var sql = "INSERT INTO Contact(fname, lname, email, homePhone, mobiphone, addr,is_cmp) VALUES (?,?,?,?,?,?, ?)";
	var sql = "INSERT OR REPLACE INTO Contact(id, fname, lname, email, homePhone, mobiphone, addr,is_cmp,owner_id) VALUES (?,?,?,?,?,?,?,?,?)";
	var length = contactList.length;
	//alert("contact leng :" + length);
	//alert(print_r(contactList));
	if (!db) {
		db = window.openDatabase("Database", "1.0", "PhoneGap Training", 200000);
	}

	db.transaction(function(tx) {
		for (var i = 0; i < length; i++) {
			var e = contactList[i];
			tx.executeSql(sql, [e.Id, e.FirstName, e.LastName, e.Email, e.Phone, e.Phone, e.Address, e.ContactType, e.AgentId]);
		}

	}, function(err) {
		console.log('Sync contact error: ');
		alert('Synch contact fails 45234 ');
	}, function() {
		console.log('Synch contact success ');
		//alert('Synch contact success 6456456');
	});

}

function parse_quotation_list(quotationList) {
	var sql = "INSERT OR REPLACE INTO Quotaion(id, Buyer,id_num,Age,Sex,Insure_Amount,owner_id) VALUES (?,?,?,?,?,?,?)";
	var length = quotationList.length;

	//alert(print_r(quotationList));
	if (!db) {

	}
	db = window.openDatabase("Database", "1.0", "PhoneGap Training", 200000);
	db.transaction(function(tx) {
		for (var i = 0; i < length; i++) {
			var e = quotationList[i];

			var sex = "Male";
			if (e.Sex == "0" || e.Sex == "false") {
				sex = "Female";
			}
			tx.executeSql(sql, [e.Id, e.BuyerName, e.IdentityNumber, e.Age, sex, e.Amount, e.AgentId]);
		}

	}, function(err) {
		console.log('Sync quotation error: ');
		alert(print_r(err));
	}, function() {
		console.log('Synch quotation success ');
		//alert('Synch quotation success 6456456');
	});

}

function sync_user(callback) {
	//alert('94872389534');
	var options = {};
	options.url = USER_URL;
	//alert(USER_URL);
	options.type = "GET";
	options.dataType = "json";

	options.success = function(userList) {
		callback(userList);
	};
	options.error = function(err) {

		alert("sync_user: " + print_r(err));

	};
	$.ajax(options);
}

function sysn_contact(callback_cont) {
	//alert('98798798');
	var options = {};
	options.url = CONTACT_URL;
	options.type = "GET";
	options.dataType = "json";

	options.success = function(contactList) {
		callback_cont(contactList);
	};
	options.error = function(err) {

		alert(print_r(err));

	};
	$.ajax(options);
}

function sync_db_quotation(callback_quot) {

	//alert('werwerwerwer324534543');

	var quotations = {};
	quotations.url = QUOTATION_URL;
	quotations.type = "GET";
	quotations.dataType = "json";

	quotations.success = function(quotationList) {
		callback_quot(quotationList);
	};
	quotations.error = function(err) {
		//alert('erer 55555');
		alert(print_r(err));
	};
	$.ajax(quotations);

}

function sync_add_contact(cont) {
	//alert(print_r(cont));

	var options = {};
	options.url = CONTACT_URL + 'create';
	//alert(cont.owner_id);
	options.type = "POST";
	options.data = {

		firstName : cont.fname,
		lastName : cont.lname,
		phone : cont.mobiphone,
		address : cont.addr,
		email : cont.email,
		contactType : cont.is_cmp,
		birthday : '9/1/1985',
		note : '',
		agentId : cont.owner_id
	};
	options.dataType = "json";
	options.success = function(newId) {
		console.log('Sync Create new contact successfully. ID: ' + newId);
		//alert('Sync Create new contact successfully. ID: ' + newId);
		alert('Your contact have created successful.');
	};
	options.error = function(err) {
		//alert(print_r(err));
		//alert('742543');
		console.log('Sync Create new contact error. ID: ' + print_r(err));
	};
	$.ajax(options);

}

function sync_add_quotation(quot) {

	var sex = 0;
	if (quot.sex == 'Male' || quot.sex == 'male') {
		sex = 1;
	}
	var options = {};
	options.url = QUOTATION_URL + 'create';
	options.type = "POST";
	options.data = {
		BuyerName : quot.Buyer,
		IdentityNumber : quot.id_num,
		Age : quot.Age,
		sex : sex,
		Amount : quot.Insure_Amount,
		AgentId : quot.owner_id
	};
	options.dataType = "json";
	options.success = function(newId) {
		//alert('Sync Create new quotation successfully. ID: ' + newdfadfasdfadsfId);
	};
	options.error = function(err) {
		//alert(print_r(err));
		console.log('Sync Create new quotation error. ID: ' + print_r(err));
	};
	$.ajax(options);
}

function sync_update_quotation(quot) {
	var sex = 0;
	if (quot.sex == "male" || quot.sex == "Male") {
		sex = 1;
	}
	alert(print_r(quot));
	var options = {};
	options.url = QUOTATION_URL + 'edit?id=' + quot.id;
	options.type = "PUT";
	options.data = {
		BuyerName : quot.Buyer,
		IdentityNumber : quot.id_num,
		Age : quot.Age,
		sex : sex,
		Amount : quot.Insure_Amount,
		AgentId : quot.owner_id
	};
	options.dataType = "json";
	options.success = function() {
		console.log('Contact update Synch Successful.');
		alert('Quation sysn update successful');
	};
	options.error = function(err) {
		console.log('Contact update Synch Error! ' + err.message);

	};
	$.ajax(options);

}

//edit an agent
function sync_update_contact(cont) {
	//alert(print_r(cont));
	var options = {};
	options.url = CONTACT_URL + 'edit?id=' + cont.id;
	options.type = "POST";
	options.data = {
		//Id : cont.id,
		FirstName : cont.fname,
		LastName : cont.lname,
		Email : cont.email,
		Phone : cont.mobiphone,
		//mobiphone : cont.mobiphone,
		Address : cont.addr,
		ContactType : cont.is_cmp,
		birthday : '9/1/1985',
		agentId : cont.owner_id
	};
	options.dataType = "json";
	options.success = function() {
		//alert('Sync Update contact successfully.');
	};
	options.error = function(err) {
		alert(print_r(err));
	};
	$.ajax(options);

}

/*function sync_quotation(tx) {
var quotations = getQuotations();
var l = quotations.length;

//var sql = 'INSERT INTO Quotaion(Buyer,Agency,Age,Sex,Insure_Amount) VALUES ' + '(?,?,?,?,?)';
var sql = "INSERT OR REPLACE INTO Quotaion " + "(id, Buyer,Agency,Age,Sex,Insure_Amount) " + "VALUES (?,?,?,?,?,?)";
var e;
for (var i = 0; i < l; i++) {
e = quotations[i];
tx.executeSql(sql, [e.id, e.Buyer, e.Agency, e.Age, e.Sex, e.Insure_Amount], function() {
console.log('Synch quotation success');
}, function(tx, error) {
console.log('Sync quotation error: ' + error.message);
});
}
}
*/

//edit an agent

function get_server_contacts() {
	var options = {};
	options.url = CONTACT_URL;
	options.type = "GET";
	options.dataType = "json";
	var re_arr_cont = new Array();
	options.success = function(contactList) {
		var l = contactList.length;
		var e;
		for (var i = 0; i < l; i++) {
			e = contactList[i];
			var contact = new Array();
			contact["addr"] = e.Address;
			contact["is_cmp"] = e.ContactType;
			contact["Email"] = e.Email;
			contact["fname"] = e.FirstName;
			contact["lname"] = e.LastName;
			contact["mobiphone"] = e.Phone;
			contact["homePhone"] = e.Phone;
			contact["id"] = e.Id;
			re_arr_cont[i] = contact;
		}

		return re_arr_cont;
		alert(print_r(re_arr_cont));

	};
	options.error = function() {

		alert('Error!!!');
		return null;
	};
	$.ajax(options);
}