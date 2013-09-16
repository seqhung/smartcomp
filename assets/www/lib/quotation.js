/**
 * @author Administrator
 */
function InitializeService() {
	alert('test1');
	service.useService(http://smartcomp.sai-it.com/Service1.asmx?wsdl, "Service1");
}

var id, Buyer, Agency, Age, Sex, InsureAmt, Identify;

function CreateQuotation() {
	alert('test2');
	Buyer = document.getElementById("txtQuoBuyer").value;
	Agency = document.getElementById("txtQuoAgency").value;
	Age = document.getElementById("txtQuoAge").value;
	Sex = document.getElementById("ddlQuoSex").value;
	InsureAmt = document.getElementById("txtInsureAmt").value;
	Identify = document.getElementById("txtQuoIdentify").value;	
		
	// StrYear = document.DemoForm.StringYear.value;	
						
	service.Service1.callService("CreateQuotation", Buyer, Agency, Age, Sex, InsureAmt, Identify);
	
}

function ShowCreateQuotationResult() {
	alert(event.result.value);
}