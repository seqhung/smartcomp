var db = 0;
function isValidLogin(username, password) {
	var sql = "SELECT * FROM Contact";
	// c where c.username = ? and c.password = ?
	//alert(sql + username + password);
	if (!db) {
		db = window.openDatabase("Database", "1.0", "PhoneGap Training", 200000);
	}
	db.transaction(function(tx) {
		tx.executeSql(sql, [], function(tx, results) {
			var i;
			if (results.rows.length > 0) {
				var childArr = results.rows.item(i);
				return childArr.id;
			} else {
				return 0;
			}
		}, function(err) {
			alert("Login err: " + print_r(err));
		});
	}, function(err) {
		console.log('isValidLogin error: ');
		alert(print_r(err));
	}, function() {
		console.log('isValidLogin success ');
		//alert('Synch user success 6456456');
	});

}

function check_user_login(callback, username, password) {
	//alert('983457928349832');
	//
	if (!db) {
		db = window.openDatabase("Database", "1.0", "PhoneGap Training", 200000);
	}
	db.transaction(function(tx) {
		var sql = "SELECT * FROM User u where username=? and password=?";
		tx.executeSql(sql, [username, password], function(tx, results) {
			callback(results);
			/*alert("length " + results.rows.length);
			 //var i;

			 if (results.rows.length > 0) {
			 return 1;
			 }else
			 {
			 return 0;
			 }
			 */
		}, acc_errorCB);
	}, acc_errorCB);
}

// function queryLoginSuccess(tx, results) {
// alert('985789435734');
// var i;
// if (results.rows.length > 0) {
// return 1;
// }
// return 0;
//
// }

function acc_errorCB(err) {
	console.log("Error processing SQL:");
	alert(print_r(err));
	//alert(err.message);
}
