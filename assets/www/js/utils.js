function getURLParameter(name) {
	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20')) || null;
}

function isWifiConnection() {
	var networkState = navigator.network.connection.type;

	var states = {};
	states[Connection.UNKNOWN] = 'Unknown connection';
	states[Connection.ETHERNET] = 'Ethernet connection';
	states[Connection.WIFI] = 'WiFi connection';
	states[Connection.CELL_2G] = 'Cell 2G connection';
	states[Connection.CELL_3G] = 'Cell 3G connection';
	states[Connection.CELL_4G] = 'Cell 4G connection';
	states[Connection.NONE] = 'No network connection';
	if (networkState == Connection.NONE || networkState == Connection.UNKNOWN) {
		return false;
	}
	return true;
	//alert('Connection type: ' + states[networkState]);
}

//get agent list
function getContacts() {
	var options = {};
	options.url = SERVER_URL + 'contacts';
	options.type = "GET";
	options.dataType = "json";
	options.success = function(contactList) {
		//alert('Successfully.' + agentList[0].Username);
		return contactList;
	};
	options.error = function() {
		alert('Error!!!');
		return null;
	};
	$.ajax(options);
}

function getQuotations() {
	var options = {};
	options.url = SERVER_URL + 'quotaions';
	options.type = "GET";
	options.dataType = "json";
	options.success = function(quotationList) {
		//alert('Successfully.' + agentList[0].Username);
		return quotationList;
	};
	options.error = function() {
		alert('Error!!!');
		return null;
	};
	$.ajax(options);
}

function createDatabase() {
	try {
		if (!db) {
			db = window.openDatabase("Database", "1.0", "PhoneGap Training", 200000);
		}
		db.transaction(populateDB2, function(err) {
			console.log("Error processing SQL:" + err.message);
			alert("Create DB error");
			//document.getElementById('quotation-list-result').innerHTML = "<STRONG>YOUR QUERY HAVE EXECUSED SUCCESSFULLY</STRONG>";
		}, function() {
			console.log("Database has been created successfully");
			//alert("Create DB Successful");
		});

	} catch(e) {
		alert(e.message);
	}
}

function populateDB2(tx) {
	tx.executeSql('CREATE TABLE IF NOT EXISTS Quotaion(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,Buyer,id_num,Agency,owner_id,Age,Sex,Insure_Amount,synched,synch_updated)');
	tx.executeSql('CREATE TABLE IF NOT EXISTS Contact(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,fname, lname, email, homePhone, mobiphone, addr,is_cmp,owner_id,synched,synch_updated)');
	tx.executeSql('CREATE TABLE IF NOT EXISTS User(id NOT NULL PRIMARY KEY,username, password)');
	/*//tx.executeSql('Delete from User');
	tx.executeSql('DROP TABLE IF EXISTS Quotaion');
	tx.executeSql('DROP TABLE IF EXISTS Contact');
	tx.executeSql('DROP TABLE IF EXISTS User');
	//
	// tx.executeSql('Delete from User');
	// tx.executeSql('Delete from Contact');
	// tx.executeSql('Delete from Quotaion');
	//
	isTableExists(tx, "Quotaion", function(status) {
		if (!status) {
			//alert("table not exist, creating one");
			//tx.executeSql('DROP TABLE IF EXISTS Quotaion');
			tx.executeSql('CREATE TABLE IF NOT EXISTS Quotaion(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,Buyer,id_num,Agency,owner_id,Age,Sex,Insure_Amount,synched,synch_updated)');
			//tx.executeSql('INSERT INTO Quotaion(Buyer,id_num,Agency,Age,Sex,Insure_Amount,synched,synch_updated) VALUES ("Hung Ho","4654657987","100003","28", "Male","3988899","0","0")');
			//tx.executeSql('INSERT INTO Quotaion(Buyer,id_num,Agency,Age,Sex,Insure_Amount,synched,synch_updated) VALUES ("Jin Ho","32668580004","35400003","29", "Male","908888899","0","0")');
			//tx.executeSql('DROP TABLE IF EXISTS Contact');
			tx.executeSql('CREATE TABLE IF NOT EXISTS Contact(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,fname, lname, email, homePhone, mobiphone, addr,is_cmp,owner_id,synched,synch_updated)');
			//tx.executeSql('INSERT INTO Contact(fname, lname, email, homePhone, mobiphone, addr,is_cmp,synched,synch_updated) VALUES ("Hung", "Ho","hung.ho@sai-it.com","063500132","0132444321","364 Cong Hoa","1","0","0")');
			//tx.executeSql('INSERT INTO Contact(fname, lname, email, homePhone, mobiphone, addr,is_cmp,synched,synch_updated) VALUES ("Phu", "Hoang","phu.hoang@sai-it.com","01256822","098568745","Tang Nhon Phu A","0","0","0")');
			tx.executeSql('CREATE TABLE IF NOT EXISTS User(id NOT NULL PRIMARY KEY,username, password)');

		} else {
			console.log("Database Existed");
			// alert("table exist, dropping for test");
			// tx.executeSql('DROP TABLE DEMO');
		}
	});
	*/
}

function isTableExists(tx, tableName, callback) {
	tx.executeSql('SELECT * FROM Quotaion', [], function(tx, resultSet) {
		if (resultSet.rows.length <= 0) {
			callback(false);
		} else {
			callback(true);
		}
	}, function(err) {
		callback(false);
	});
}

function print_r(arr, level) {
	var dumped_text = "";
	if (!level)
		level = 0;

	//The padding given at the beginning of the line.
	var level_padding = "";
	for (var j = 0; j < level + 1; j++)
		level_padding += "    ";

	if ( typeof (arr) == 'object') {//Array/Hashes/Objects
		for (var item in arr) {
			var value = arr[item];

			if ( typeof (value) == 'object') {//If it is an array,
				dumped_text += level_padding + "'" + item + "' ...\n";
				dumped_text += print_r(value, level + 1);
			} else {
				dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
			}
		}
	} else {//Stings/Chars/Numbers etc.
		dumped_text = "===>" + arr + "<===(" + typeof (arr) + ")";
	}
	return dumped_text;
}

function navNewContact() {
	window.location.replace('contact.html');
}

function navContactList() {
	window.location.replace('contact_list.html');
}

function navNewQuotaion() {
	window.location.replace('quotation.html');
}

function navQuotaionList() {
	window.location.replace('quotation_list.html');
}

