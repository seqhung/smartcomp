/**
 * @author Administrator
 */

function errorCB(err) {
	console.log("Error processing SQL:");
	//alert(print_r(err));
	//document.getElementById('contact-list-result').innerHTML = "<STRONG>Error processing SQL: " + err.message + "</STRONG>";
	//alert(print_r(err));
}

function successCreateCB() {
	console.log("Database has been created successfully");
	//document.getElementById('contact-list-result').innerHTML = "<STRONG>YOUR QUERY HAVE EXECUSED SUCCESSFULLY</STRONG>";
}

function queryCreateContact(tx) {
	var fname, lname, email, addr, homePhone, mobiphone, is_cmp;
	var owner_id = readLocalStorage(USER_ID_SESSIION);
	fname = document.getElementById('first_name').value;
	lname = document.getElementById('last_name').value;
	email = document.getElementById('email').value;
	addr = document.getElementById('address').value;
	homePhone = document.getElementById('homephone').value;
	mobiphone = document.getElementById('mobile').value;
	is_cmp = document.getElementById('is_cmp').value;
	var synched = (isWifiConnection() == true) ? "0" : "1";
	//alert(synched);

	var sql = "INSERT INTO Contact(fname, lname, email, homePhone, mobiphone, addr,is_cmp,owner_id,synched) VALUES (?,?,?,?,?,?,?,?,?)";
	//return true;
	tx.executeSql(sql, ['' + fname, '' + lname, '' + email, '' + homePhone, '' + mobiphone, '' + addr, is_cmp, owner_id, synched], function() {
		//alert("insert success 98wru8943");
	}, function(err) {
		//alert('insert locol error ' + print_r(err));
	});

}

function createContact(callback_sync_add_contact) {

	var fname, lname, email, addr, homePhone, mobiphone, is_cmp, owner_id;
	lname = document.getElementById('last_name').value;
	email = document.getElementById('email').value;
	fname = document.getElementById('first_name').value;
	addr = document.getElementById('address').value;
	homePhone = document.getElementById('homephone').value;
	mobiphone = document.getElementById('mobile').value;
	is_cmp = document.getElementById('is_cmp').value;
	owner_id = readLocalStorage(USER_ID_SESSIION);

	//alert(fname + lname + email + addr + homePhone + mobiphone + is_cmp + owner_id);
	//alert('9875324957349857983495');

	if (lname.length == 0) {
		alert('Please input Last name');
		return;
	}
	if (email.length == 0) {
		alert('Please input Email');
		return;
	}
	if (mobiphone.length == 0) {
		alert('Please input Mobile Phone');
		return;
	}
	if (!db) {
		db = window.openDatabase("Database", "1.0", "PhoneGap Training", 200000);
	}
	db.transaction(queryCreateContact, function(err) {
		alert('errro 1111' + print_r(err));
	}, function() {//tx, results
		console.log("Database has been created successfully");

		//var client_id = results.insertId;
		//alert(client_id);
		if (isWifiConnection()) {
			var cont = {
				"fname" : fname,
				"lname" : lname,
				"email" : email,
				"addr" : addr,
				"is_cmp" : is_cmp,
				"homephone" : homePhone,
				"mobiphone" : mobiphone,
				"owner_id" : owner_id
				//"client_id" : client_id
			};
			//alert(print_r(cont));
			//alert(USER_ID_SESSIION + owner_id);

			callback_sync_add_contact(cont);
		} else {
			alert('Your account have created successful.');
		}
		window.location.replace('contact_list.html?f=cont_list12');
		//clearContactGui();
	});

}

function updateContact(id, callback_sync) {

	var fname, lname, email, addr, homePhone, mobiphone, is_cmp, owner_id;
	fname = document.getElementById('first_name').value;
	lname = document.getElementById('last_name').value;
	email = document.getElementById('email').value;
	addr = document.getElementById('address').value;
	homePhone = document.getElementById('homephone').value;
	mobiphone = document.getElementById('mobile').value;
	is_cmp = document.getElementById('is_cmp').value;
	lname = document.getElementById('last_name').value;
	owner_id = readLocalStorage(USER_ID_SESSIION);

	if (lname.length == 0) {
		alert('Please input Last name');
		return;
	}
	if (email.length == 0) {
		alert('Please input Email');
		return;
	}
	//alert(id);
	if (!db) {
		db = window.openDatabase("Database", "1.0", "PhoneGap Training", 200000);
	}
	db.transaction(function(tx) {

		var sql = 'Update Contact set fname = ?, lname = ?, email = ?, homePhone= ?, mobiphone= ?, addr= ?';
		sql += ' Where id = ?';

		tx.executeSql(sql, [fname, lname, email, homePhone, mobiphone, addr, id]);

	}, function(err) {
		console.log("Error processing SQL:" + err.message);
	}, function() {
		console.log("Database has been created successfully");

		var cont = {
			"id" : id,
			"fname" : fname,
			"lname" : lname,
			"email" : email,
			"addr" : addr,
			"is_cmp" : is_cmp,
			"homephone" : homePhone,
			"mobiphone" : mobiphone,
			"owner_id" : owner_id

		};
		if (isWifiConnection()) {
			callback_sync(cont);
		}
		alert('Your contact have updated successful!');
	});
}

var db = 0;
// function createDB() {
// if (!db) {
// db = window.openDatabase("Database", "1.0", "PhoneGap Training", 200000);
// }
// db.transaction(initDB, errorCB, successCreateCB);
// }

function contactDetail(id) {

	var param = 'id=' + id;
	window.location.replace('contact.html?' + param);
}

function querySuccess(tx, results) {
	//alert(print_r(results.rows));

	console.log("No of Rows = " + results.rows.length);

	var i;
	if (results.rows.length > 0) {
		//alert(results.rows.length);
		var myHtml = '<ul >';
		for ( i = 0; i < results.rows.length; i++) {
			var childArr = results.rows.item(i);
			var id, fname, lname, email, homePhone, mobiphone, addr, is_comp;
			id = childArr.id;

			var param = id + ',' + fname + ',' + lname + ',' + email + ',' + homePhone + ',' + mobiphone + ',' + addr;
			myHtml += '<li><a href="#" onclick="contactDetail(' + id + ');" data-transition="slide">';
			//childArr.is_cmp + "-----" +
			myHtml += childArr.fname + ' ' + childArr.lname + '<br/>' + childArr.mobiphone;
			//+ '----' + childArr.owner_id + '------';
			myHtml += '</a></li>';
		}
		myHtml += '</ul>';
		//alert(myHtml);
		document.getElementById('contact-list-result').innerHTML = (myHtml);
	} else {
		document.getElementById('contact-list-result').innerHTML = "There are no record.";
	}

}

function queryContactList(tx) {
	//var search_text = document.getElementById('search-text').value;
	var sql = 'SELECT * FROM Contact c where c.is_cmp = ?';
	var is_cmp = document.getElementById('is_cmp').value;
	var cont_type = 0;
	if (is_cmp == "1") {
		cont_type = 1;
		tx.executeSql(sql, [1], querySuccess, function(err) {
			alert('error 33 ' + print_r(err));
		});
	} else {

		var user_id = readLocalStorage(USER_ID_SESSIION);
		//alert(user_id);
		var id = Number(user_id);
		//alert(id);
		sql = 'SELECT * FROM Contact c where  c.owner_id =? and c.is_cmp = 0';
		// and  and c.is_cmp = 0

		tx.executeSql(sql, [id], querySuccess, function(err) {
			alert('error 34 ' + print_r(err));
		});
		//tx.executeSql(sql, [id]);
	}

	//alert(is_cmp);

	//tx.executeSql('SELECT * FROM Contact c', [], querySuccess, errorCB);
	/*if (search_text.length > 0) {

	 search_text = "%" + search_text + "%";
	 alert(search_text);
	 sql += " WHERE c.lname LIKE " + search_text;
	 //+ " ORDER BY c.lname, c.fname"
	 tx.executeSql(sql, [], querySuccess, errorCB);

	 } else {

	 }
	 */
}

function getContactList() {
	if (!db) {
		db = window.openDatabase("Database", "1.0", "PhoneGap Training", 200000);
	}

	//db.transaction(queryContactList, querySuccess, function(err) {
	db.transaction(queryContactList, function() {
	}, function(err) {
		//alert('err 201' + print_r(err));
	});

}

function clearContactGui() {
	document.getElementById('first_name').value = '';
	document.getElementById('last_name').value = '';
	document.getElementById('email').value = '';
	document.getElementById('homephone').value = '';
	document.getElementById('mobile').value = '';
	document.getElementById('address').value = '';

	document.getElementById('is_cmp').value = '0';
	$("#is_cmp").selectmenu('refresh', true);

}

function bindContact(id) {
	if (!db) {
		db = window.openDatabase("Database", "1.0", "PhoneGap Training", 200000);
	}
	db.transaction(function(tx) {
		var sql = "SELECT * FROM Contact c where c.id = " + id;
		tx.executeSql(sql, [], function(tx, results) {
			var i;

			if (results.rows.length > 0) {
				var childArr = results.rows.item(0);
				//alert(childArr.is_cmp);
				document.getElementById('first_name').value = childArr.fname + '';
				document.getElementById('last_name').value = childArr.lname + '';
				document.getElementById('email').value = childArr.email + '';
				document.getElementById('homephone').value = childArr.homePhone + '';
				document.getElementById('mobile').value = childArr.mobiphone + '';
				document.getElementById('address').value = childArr.addr + '';
				// if (childArr.is_cmp != null) {
				// document.getElementById('is_cmp').value = childArr.is_cmp;
				// }
				document.getElementById('is_cmp').value = childArr.is_cmp;
				$("#is_cmp").selectmenu('refresh', true);
			}

		}, errorCB);
	}, errorCB);
}

