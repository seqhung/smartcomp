/**
 * @author Administrator
 */
var table_name = "Quotaion";
function errorCB(err) {
	console.log("Error processing SQL:" + err.message);
	alert(err.message);
}

function successCreateCB() {
	console.log("Database has been created successfully");
}

function updateQuotaion(id) {

	var Buyer, Agency, Age, Sex, Insure_Amount, id_num;
	Buyer = document.getElementById('Buyer').value;
	if (Buyer.length == 0) {
		alert('Please input Buyer');
		return;
	}

	if (!db) {
		db = window.openDatabase("Database", "1.0", "PhoneGap Training", 200000);
	}
	db.transaction(function(tx) {
		id_num = document.getElementById('id_num').value;
		Age = document.getElementById('Age').value;
		Sex = document.getElementById('Sex').value;
		Insure_Amount = document.getElementById('Insure_Amount').value;

		var sql = 'Update Quotaion set Buyer = ?, id_num = ?, Age = ?, Sex= ?, Insure_Amount= ?';
		sql += ' Where id = ?';

		tx.executeSql(sql, [Buyer, id_num, Age, Sex, Insure_Amount, id]);

	}, function(err) {
		console.log("Error processing SQL:" + err.message);
	}, function() {
		console.log("quotation have updated successful");
		alert('Your quotation have updated successful.');
	});
}

function bindQuotaion(id) {
	if (!db) {
		db = window.openDatabase("Database", "1.0", "PhoneGap Training", 200000);
	}
	db.transaction(function(tx) {
		var sql = "SELECT * FROM Quotaion q where q.id = " + id;
		tx.executeSql(sql, [], function(tx, results) {
			var i;
			if (results.rows.length > 0) {
				var childArr = results.rows.item(0);

				document.getElementById('Buyer').value = childArr.Buyer;
				document.getElementById('id_num').value = childArr.id_num;
				document.getElementById('Age').value = childArr.Age;
				document.getElementById('Sex').value = childArr.Sex;
				document.getElementById('Insure_Amount').value = childArr.Insure_Amount;

				//document.getElementById('contact-list-result').innerHTML = (myHtml);
			}

		}, errorCB);
	}, errorCB);
}

function createQuotaion() {
	var Buyer, id_num, Age, Sex, Insure_Amount;
	Buyer = document.getElementById('Buyer').value;
	if (Buyer.length == 0) {
		alert('Please input Buyer');
		return;
	}

	if (!db) {
		db = window.openDatabase("Database", "1.0", "PhoneGap Training", 200000);
	}
	db.transaction(function(tx) {

		id_num = document.getElementById('id_num').value;
		Age = document.getElementById('Age').value;
		Sex = document.getElementById('Sex').value;
		Insure_Amount = document.getElementById('Insure_Amount').value;

		var sql = 'INSERT INTO Quotaion(Buyer,id_num,Age,Sex,Insure_Amount) VALUES ' + '(?,?,?,?,?)';

		//tx.executeSql(sql, [e.id, e.firstName, e.lastName, e.managerId, e.title, e.city, e.officePhone, e.cellPhone, e.email],
		//alert(sql);

		tx.executeSql(sql, [Buyer, id_num, Age, Sex, Insure_Amount]);
	}, errorCB, function() {
		console.log("Quotation created successfully");
		alert('Your quotation have created successful.');
	});
}

function quotaionDetail(id) {
	var param = 'id=' + id;
	window.location.replace('quotation.html?' + param);
}

function queryQuotaionSuccess(tx, results) {
	console.log("Rows Effected = " + results.rowEffected);
	console.log("No of Rows = " + results.rows.length);
	//document.getElementById('contact-list-result').innerHTML = "<STRONG>YOUR QUERY HAVE EXECUSED SUCCESSFULLY</STRONG>";
	//alert(print_r(results.rows.item(0)));
	var i;
	if (results.rows.length > 0) {
		var myHtml = '<ul >';
		for ( i = 0; i < results.rows.length; i++) {
			var childArr = results.rows.item(i);
			var id, Buyer, id_num, Age, Sex, Insure_Amount;
			id = childArr.id;

			myHtml += '<li><a href="#" onclick="quotaionDetail(' + id + ');" data-transition="slide">';
			// myHtml += '<span style="float: left;">'+childArr.Buyer +'</span>';
			// myHtml += '<span style="float: right;">'+childArr.Agency +'</span>';

			myHtml += childArr.Buyer + '<br/>' + childArr.Insure_Amount;

			myHtml += '</a></li>';
		}
		myHtml += '</ul>';
		//alert(myHtml);
		document.getElementById('quotation-list-result').innerHTML = (myHtml);
	} else {
		document.getElementById('quotation-list-result').innerHTML = "There are no record.";
	}
}

function getQuotaionList() {
	if (!db) {
		db = window.openDatabase("Database", "1.0", "PhoneGap Training", 200000);
	}
	db.transaction(function(tx) {
		tx.executeSql('SELECT * FROM Quotaion', [], queryQuotaionSuccess, errorCB);
	}, errorCB);
}

var db = 0;
/*function createQuotaionDB() {
 if (!db) {
 db = window.openDatabase("Database", "1.0", "PhoneGap Training", 200000);
 }
 db.transaction(function(tx) {
 //tx.executeSql('DROP TABLE IF EXISTS Quotaion');
 tx.executeSql('CREATE TABLE IF NOT EXISTS Quotaion(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,Buyer,Agency,Age,Sex,Insure_Amount)');
 //tx.executeSql('INSERT INTO Quotaion(Buyer,Agency,Age,Sex,Insure_Amount) VALUES ("Hung Ho","100003","28", "Male","3988899")');
 //tx.executeSql('INSERT INTO Quotaion(Buyer,Agency,Age,Sex,Insure_Amount) VALUES ("Jin Ho","35400003","29", "Male","908888899")');
 }, function(err) {
 console.log("Error processing SQL:" + err.message);
 //document.getElementById('quotation-list-result').innerHTML = "<STRONG>YOUR QUERY HAVE EXECUSED SUCCESSFULLY</STRONG>";
 }, function() {
 console.log("Database has been created successfully");
 //alert("Create DB Successful");
 });
 }
 */
