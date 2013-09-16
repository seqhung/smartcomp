/**
 * @author Administrator
 */
function populateDB(tx) {
	//tx.executeSql('DROP TABLE IF EXISTS DEMO');
	tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO(id unique,data)');
	tx.executeSql('INSERT INTO DEMO(id,data) VALUES (1,"First Row")');
	tx.executeSql('INSERT INTO DEMO(id,data) VALUES (2,"SECOND ROW")');
}

function errorCB(err) {
	console.log("Error processing SQL:" + err.code);
	document.getElementById('sql-result').innerHTML = "<STRONG>Error processing SQL: " + err.code + "</STRONG>";
}

function successCreateCB() {
	console.log("Database has been created successfully");
	document.getElementById('sql-result').innerHTML = "<STRONG>DATABASE HAS BEEN CREATED SUCCESSFULLY</STRONG>";
}

var db = 0;
function createDB() {
	if (!db) {
		db = window.openDatabase("Database", "1.0", "PhoneGap Training", 200000);
	}
	db.transaction(populateDB, errorCB, successCreateCB);
}

function querySuccess(tx, results) {
	console.log("Rows Effected = " + results.rowEffected);
	console.log("No of Rows = " + results.rows.length);
	document.getElementById('sql-result').innerHTML = ("<STRONG>number of rows" + results.rows.length + "</STRONG>");
}

function queryDB(tx) {
	tx.executeSql('SELECT * FROM DEMO', [], querySuccess, errorCB);
}

function getSqlResultSet() {
	if (!db) {
		db = window.openDatabase("Database", "1.0", "PhoneGap Training", 200000);
	}
	db.transaction(queryDB, errorCB);
}

function writeLocalStorage() {
	window.localStorage.setItem("myKey", "vmSoftTech");
	var keyname = window.localStorage.key(0);
	document.getElementById('local-storage-result').innerHTML = "Wrote key: <strong>" + keyname + "</strong>";
}

function readLocalStorage() {
	var value = window.localStorage.getItem("myKey");
	if (!value) {
		document.getElementById('local-storage-result').innerHTML = "<strong>Null</strong> - Try Write first";
	} else {
		document.getElementById('local-storage-result').innerHTML = "Got value: <strong>" + value + "</strong>";
	}
}

function
 removeItemLocalStorage(){
window.localStorage.removeItem(
"myKey");
document.getElementById(
'local-storage-result').innerHTML = "Removed key/value: <strong>myKey/vmSoftTech</strong>";}

