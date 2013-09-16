function createContact() {
	alert('Test 1123');
	var lname = document.getElementById('last_name').value;
	if (lname.length == 0) {
		alert('Please input Last name');
		return;
	}

	if (!db) {
		db = window.openDatabase("Database", "1.0", "PhoneGap Training", 200000);
	}
	db.transaction(queryCreateContact, errorCB, successCreateCB);
}

function queryCreateContact(tx) {
	var fname, lname, email, addr, homePhone, mobiphone;
	fname = document.getElementById('first_name').value;
	lname = document.getElementById('last_name').value;
	email = document.getElementById('email').value;
	addr = document.getElementById('address').value;
	homePhone = document.getElementById('homephone').value;
	mobiphone = document.getElementById('mobile').value;

	var sql = 'INSERT INTO Contact(fname, lname, email, homePhone, mobiphone, addr) VALUES ' + '(' + fname + ',' + lname + ',' + email + ',' + addr + ',' + homePhone + ',' + mobiphone + ')';
	alert(sql);

	tx.executeSql();

}
