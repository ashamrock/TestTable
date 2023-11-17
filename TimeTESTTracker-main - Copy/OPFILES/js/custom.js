var pp = console.log
var time_in_minutes = 0;
var current_time = 0;
var seconds = 0;
var minutes = 0;
var hours = 0;
var onTheClock = 0;
var totalSeconds = 0;
var tableUpdate = 0;
var newTaskAdd = 0;
var newJobAdd = 0;
var JobNameValue;

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
var date = mm + '_' + dd + '_' + yyyy;
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var years = []
var dt;
var due;
var netDays = 60;
var tempDate = today;
var startTime = 0;
var stopTime = 0;
var paused = 0
var startJobTime = 0;
var timeTable = [];

var file = document.getElementById('inputfile');

var allData = [];
var webData = [];
var clData = [];

var jobList = [];
var users = [];
var dbData = [];
var clientDB=[];
var newWork = [{ client: "", invoice: "", date: "", employee: "", hours: "", job: "", job_ID: "", rate: "", task: "", total: "" }];
var arrayA = [];

var invoiceNumber;
var invoiceNum;
var invoiceDate;
var invoiceDueDate;
var invoiceTitle;

var hourTotals;
var subTotals;

var clientNumber;
var clientData;
var projects = []
var taskData = [];
var clientsNames = [];
var clientSheet = [];

var workingFileName = "";
var header = ["Client", "Invoice", "Date", "Employee", "Task", "Rate", "Job", "Job #", "Hours", "SubTotal"];
var taskHeader = ["Client", "Task", "Job", "Elapsed_Time"]
var taskList = ["Prints", "3D Print", "Design", "Field Work", "Customer Service", "Travel", "Consulting", "Added Fee"]
var dddRate=130
var printRate=150
var defaultRate = [150, 0, 75, 100, 50, 50, 300, 0]
// var userList = ["A.Shamrock","Lucky development"]
var currentTask = [];
var headTitle = [];

var showHold = 0;
var priceOn = 0;
var pastdue = 0;
var whiteLines = 0;
var ddd = "N"
var billingHours = [];
var billingTotal = [];
var billingHoldHours = [];
var billingHoldTotal = [];

var castleKey = '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';

var table = document.getElementById("workTable");
var topHeadRow = document.getElementById("topHeadRow");
var plate = document.getElementById("invoiceTable");
var tophead = document.createElement("thead");
var topRow = document.createElement("tr");
var stBtn = document.getElementById('confirmText');

// window.addEventListener('beforeunload', function (e) {
//     e.preventDefault();
//     e.returnValue = '';
// });

workData = "https://raw.githubusercontent.com/ashamrock/TestTable/main/db.csv"
d3.csv(workData, function (result) {
	webData.push(result)
})
clientData = "https://raw.githubusercontent.com/ashamrock/TestTable/main/cl.csv"
d3.csv(clientData, function (result) {
	clData.push(result)
})

setTimeout(() => {
	for (var i = 0; i < webData.length; i++) {
		dbData.push(
			[
				webData[i].client,
				webData[i].invoice,
				webData[i].date,
				webData[i].employee,
				webData[i].task,
				webData[i].rate,
				webData[i].job,
				webData[i].job_ID,
				webData[i].hours,
				webData[i].total])
	}

		for (var i = 0; i < clData.length; i++) {
		clientDB.push(
			[
				clData[i].cl_num,
				clData[i].inv_num,
				clData[i].name,
				clData[i].street,
				clData[i].city,
				clData[i].phone,
				clData[i].attention,
				clData[i].email,
				clData[i].alt_email])
	}
}
	, 500);

console.log(dbData)
console.log(clientDB)

function selectMonthYear() {
	var thisMonth = (today.getMonth()) + 1;
	var thisYear = (today.getFullYear());
	var selectMonth = document.getElementById("monthDrop");
	var selectYear = document.getElementById("yearDrop");
	for (var m = 0; m < 12; m++) {
		var element = document.createElement("option");
		element.textContent = months[m];
		element.value = months[m];
		element.id = (m + 1)
		selectMonth.appendChild(element);

		if (m + 1 === thisMonth) {
			element.selected = true;
		}
	}

	for (var y = 2020; y <= thisYear; y++) {
		years.push(y)
		var element = document.createElement("option");
		element.textContent = y;
		element.value = y;
		element.id = y;
		selectYear.appendChild(element);

		if (thisYear === y) {
			element.selected = true;
		}
	}
}
selectMonthYear()

function clientDrop() { // populates client drop down
	var select = document.getElementById("clientDrop");
	var selLength = select.options.length;

	if (selLength <= 1) {
		for (var c = 0; c < clData.length; c++) {
			var selectName = clData[c].name
			var element = document.createElement("option");
			element.textContent = selectName;
			element.value = selectName;
			select.appendChild(element);
			element.setAttribute("id", clData[c].cl_num);
		}
	}
}
function modWorkDrop() { // populates client drop down
	var select = document.getElementById("modClientDrop");
	var selLength = select.options.length;

	if (selLength <= 1) {
		for (var c = 0; c < clData.length; c++) {
			var selectName = clData[c].name
			var element = document.createElement("option");
			element.textContent = selectName;
			element.value = selectName;
			select.appendChild(element);
			element.setAttribute("id", clData[c].cl_num);
		}
	}
}

function modTaskDrop() {
	var select = document.getElementById("modTaskDrop");
	var selLength = select.options.length;
	if (selLength <= 1) {
		for (var c = 0; c < taskList.length; c++) {
			var selectTask = taskList[c]
			var element = document.createElement("option");
			element.textContent = selectTask;
			element.value = selectTask;
			element.id = selectTask
			select.appendChild(element);

		}
	}
}

function modJobDrop() { // populates client drop down
	var select = document.getElementById("modJobDrop");
	var selLength = select.options.length;

	// var modSelClient = document.getElementById("modClientDrop");
	// var modSelTask = document.getElementById("modTaskDrop");
	// var modSelJob = document.getElementById("modJobDrop");
	// var modClientId = modSelClient.options[modSelClient.selectedIndex].id;
	// var modTaskId = modSelTask.options[modSelTask.selectedIndex].id;
	// var modJobtId = modSelJob.options[modSelJob.selectedIndex].id;
	// pp(modSelClient.value)
	// pp(modClientId)
	// pp(modTaskId)
	// pp(modJobtId)

	if (selLength <= 2) {
		for (var c = 0; c < webData.length; c++) {
			var selectJob = webData[c].job
			if (!jobList.find(selectJob => selectJob === webData[c].job)) { // search by id
				jobList.push(selectJob)
			}
		}
	}
	if (selLength <= 2) {
		for (var c = 0; c < jobList.length; c++) {
			var selectTask = jobList[c]
			var element = document.createElement("option");
			element.textContent = selectTask;
			element.value = selectTask;
			element.id = selectTask
			select.appendChild(element);
		}
	}
}

function selectionDrop(clicked_id) { // populates client drop down
	var selection = document.getElementById(clicked_id);
	var dataName = selection.id;
	var selLength = selection.options.length;
	var d = [];
	if (selLength <= 1) {
		for (var c = 0; c < webData.length; c++) {

			var cutName = dataName.slice(0, -4)
			var selector = webData[c][cutName]
			if (selector === undefined) {
				break
				//fix me------------ if there is a blank space it will stop processing. change to ignore blank spaces.
				//but test first. it may work
			}
			if (!d.find(cutName => cutName === selector)) { // search by id
				d.push(selector)
			}
		}
		d.sort()
		d.sort(function (a, b) {
			return a - b;
		});
		for (var e = 0; e < d.length; e++) {
			var element = document.createElement("option");
			element.textContent = d[e];
			element.value = d[e];
			element.id = d[e]
			selection.appendChild(element);
		}
	}
}


function goBtn() {
	closeNav()

	table.innerHTML = "";
	plate.innerHTML = "";

	var a = [];
	var b = [];
	var c = [];
	var e = [];
	var r = 0

	//client-----------------
	var selClient = document.getElementById("clientDrop");
	var selClientID = selClient.options[selClient.selectedIndex].id;
	for (var d = 0; d < webData.length; d++) {
		foundClient = webData[d].client
		var clientName = clData[foundClient].name
		if (selClientID === "N/A") {
			a[r] = [
				clientName,
				webData[d].invoice,
				webData[d].date,
				webData[d].employee,
				webData[d].task,
				webData[d].rate,
				webData[d].job,
				webData[d].job_ID,
				webData[d].hours,
				webData[d].total
			]
			r++
		} else if (Number(foundClient) === Number(selClientID)) {
			a[r] = [
				clientName,
				webData[d].invoice,
				webData[d].date,
				webData[d].employee,
				webData[d].task,
				webData[d].rate,
				webData[d].job,
				webData[d].job_ID,
				webData[d].hours,
				webData[d].total
			]
			r++
		}
	}
	r = 0
	//month-----------------
	var selMonth = document.getElementById("monthDrop");
	var selMonthID = selMonth.options[selMonth.selectedIndex].id;
	for (var d = 0; d < a.length; d++) {
		if (selMonthID === "N/A") {
			b[r] = [a[d][0], a[d][1], a[d][2], a[d][3], a[d][4], a[d][5], a[d][6], a[d][7], a[d][8], a[d][9]]
			r++
		}
		else if (String(selMonthID) == Number(a[d][2].slice(0, 2))) {
			b[r] = [a[d][0], a[d][1], a[d][2], a[d][3], a[d][4], a[d][5], a[d][6], a[d][7], a[d][8], a[d][9]]
			r++
		}
	}
	r = 0
	a = b
	b = []
	//year-----------------
	var selYear = document.getElementById("yearDrop");
	var selYearID = selYear.options[selYear.selectedIndex].id;
	for (var d = 0; d < a.length; d++) {
		if (selYearID === "N/A") {
			b[r] = [a[d][0], a[d][1], a[d][2], a[d][3], a[d][4], a[d][5], a[d][6], a[d][7], a[d][8], a[d][9]]
			r++
		}
		else if (String(selYearID) === String(a[d][2].slice(-4))) {
			b[r] = [a[d][0], a[d][1], a[d][2], a[d][3], a[d][4], a[d][5], a[d][6], a[d][7], a[d][8], a[d][9]]
			r++
		}
	}
	r = 0
	a = b
	b = []
	// invoice-----------------
	var selInvoice = document.getElementById("invoiceDrop");
	var selInvoiceID = selInvoice.options[selInvoice.selectedIndex].id;
	for (var d = 0; d < a.length; d++) {
		if (selInvoiceID === "N/A") {
			b[r] = [a[d][0], a[d][1], a[d][2], a[d][3], a[d][4], a[d][5], a[d][6], a[d][7], a[d][8], a[d][9]]
			r++;
		}
		else if (selInvoiceID === a[d][1]) {
			b[r] = [a[d][0], a[d][1], a[d][2], a[d][3], a[d][4], a[d][5], a[d][6], a[d][7], a[d][8], a[d][9]]
			r++
		}
	}
	r = 0
	a = b
	b = []
	// employee-----------------
	var selEmp = document.getElementById("employeeDrop");
	var selEmpId = selEmp.options[selEmp.selectedIndex].id;
	for (var d = 0; d < a.length; d++) {
		if (selEmpId === "N/A") {
			b[r] = [a[d][0], a[d][1], a[d][2], a[d][3], a[d][4], a[d][5], a[d][6], a[d][7], a[d][8], a[d][9]]
			r++
		}
		else if (selEmpId === a[d][3]) {
			b[r] = [a[d][0], a[d][1], a[d][2], a[d][3], a[d][4], a[d][5], a[d][6], a[d][7], a[d][8], a[d][9]]
			r++
		}
	}
	r = 0
	a = b
	b = []
	// task-----------------
	var selTask = document.getElementById("taskDrop");
	var selTaskId = selTask.options[selTask.selectedIndex].id;
	for (var d = 0; d < a.length; d++) {
		if (selTaskId === "N/A") {
			b[r] = [a[d][0], a[d][1], a[d][2], a[d][3], a[d][4], a[d][5], a[d][6], a[d][7], a[d][8], a[d][9]]
			r++
		}
		else if (selTaskId === a[d][4]) {
			b[r] = [a[d][0], a[d][1], a[d][2], a[d][3], a[d][4], a[d][5], a[d][6], a[d][7], a[d][8], a[d][9]]
			r++
		}
	}
	r = 0
	a = b
	b = []
	// rate-----------------
	// var selTask = document.getElementById("taskDrop");
	// var selTaskId = selTask.options[selTask.selectedIndex].id;
	// pp(selTask +" - " + selTaskId)
	// 	for (var d = 0; d < a.length; d++) {
	// 		if(selTaskId==="N/A"){
	// 			b[r]=[a[d][0],a[d][1],a[d][2],a[d][3],a[d][4],a[d][5],a[d][6],a[d][7],a[d][8],a[d][9]]
	// 			r++
	// 		}
	// 		else if(selTaskId===a[d][4]){
	// 			b[r]=[a[d][0],a[d][1],a[d][2],a[d][3],a[d][4],a[d][5],a[d][6],a[d][7],a[d][8],a[d][9]]
	// 			r++
	// 		}
	// 		pp(selTaskId+" - "+a[d][4])
	// 		}
	// 		r=0
	// 		a=b
	// 		b=[]



	// var hourTotals;
	// var subTotals;
	if(a.length<=0){
		table.innerHTML = "-- NO DATA FOUND --";
		plate.innerHTML = "-- NO DATA FOUND --";
		return
	}

	for (var d = 0; d < a.length; d++) {
		c.push(Number(a[d][8]))
	}
	hourTotals = c.reduce(function (a, b) {
		return a + b;
	});

	for (var d = 0; d < a.length; d++) {
		e.push(Number(a[d][9]))
	}
	subTotals = e.reduce(function (a, b) {
		return a + b;
	});

	arrayA = a
}

function clearTable() {
	// // if (workingFileName === "") {
	// 	// 	alert("Please choose a file")
	// 	// 	return
	// 	// }

	// 	// if (person == null || person == "") {
	// 	//   text = "User cancelled the prompt.";
	// 	// } else {
	// 	//   text = "Hello " + person + "! How are you today?";
	// 	// }

	// 	// let nm = prompt("Invoice Number ", invoiceNum+1);
	// 	// console.log(nm)






	// 	let dt = prompt("Invoice Date", date);
	// 	var y = Number(dt.slice(6, 10))
	// 	var m = (Number(dt.slice(0, 2)) + 2)
	// 	var d = Number(dt.slice(3, 5))

	// 	// invoiceNumber = clientNumber+nm;

	// if (isNaN(m)) {
	// 	alert("Please enter a valid format mm_dd_yyy")
	// 	return
	// }

	// if (m === 13) {
	// 	m = 1
	// 	y = y + 1
	// } else if (m === 14) {
	// 	m = 2
	// 	y = y + 1
	// } else if (m > 14) {
	// 	alert("Please enter a valid format mm_dd_yyy")
	// 	return
	// }

	closeNav()

	// due = m + '_' + d + '_' + y;
	var element = document.getElementById("workPage");
	element.style.display = "none";

	openTab(event, 'invoice')
	// allData[2][0] = dt
	// allData[3][0] = due

	// document.getElementById("invoiceNum").innerHTML = "Invoice #: " + invoiceNumber
	// document.getElementById("clientInvoiceDate").innerHTML = "Invoice Date: " + allData[2][0]
	// document.getElementById("clientInvoiceDue").innerHTML = "Due: " + allData[3][0]

	// document.title = "INVOICE " + dt + " - " + invoiceNumber + " Lucky_Development"
	// console.log(document.title)
	// openTab(event, 'invoice')
	// hide()
	// poping()

}

function taskTable() {
	goBtn()
	table.innerHTML = "";

	var columnCount = header.length;
	var row = table.insertRow(-1);

	for (var i = 0; i < columnCount; i++) {
		var headerCell = document.createElement("TH");
		headerCell.innerHTML = header[i];
		row.appendChild(headerCell);
		header[8] = "Hours<br>" + Math.round(hourTotals * 100) / 100
		header[9] = "Total<br>" + "$" + Math.floor(subTotals).toLocaleString('en-IN')
	}

	for (var k = 0; k < arrayA.length; k++) {
		var row = document.createElement('tr');

		for (var j = 0; j < arrayA[k].length; j++) {
			var cell = document.createElement('td');
			cell.textContent = arrayA[k][j];
			row.appendChild(cell);
		}
		table.appendChild(row);
	}

}

function invoiceTable() {
	var selClient = document.getElementById("clientDrop");
	var selClientID = selClient.options[selClient.selectedIndex].id;

	if(selClient.value === "N/A"){
		alert("Please Enter Client Name")
		return
	}

	goBtn()
	var arrayB = [];
	table.innerHTML = "";

	var columnCount = header.length;
	var row = plate.insertRow(-1);

	for (var i = 0; i < arrayA.length; i++) {
		sliceAndDice = arrayA[i].slice(2);
		arrayB.push(sliceAndDice)
	}

	for (var i = 2; i < columnCount; i++) {
		var headerCell = document.createElement("TH");
		headerCell.innerHTML = header[i];
		row.appendChild(headerCell);
		header[8] = "Hours<br>" + Math.round(hourTotals * 100) / 100
		header[9] = "Total<br>" + "$" + Math.floor(subTotals).toLocaleString('en-IN')
	}

	for (var k = 0; k < arrayB.length; k++) {
		var row = document.createElement('tr');

		for (var j = 0; j < arrayB[k].length; j++) {
			var cell = document.createElement('td');
			cell.textContent = arrayB[k][j];
			row.appendChild(cell);
		}
		plate.appendChild(row);
	}

	invoiceData()
	clearTable()
}

function updateClient(){
	var selClient = document.getElementById("clientDrop");
	var selClientID = selClient.options[selClient.selectedIndex].id;
	upLoadTable=[];
	finalTable=[];

	clientDB[selClientID][1]=invoiceNum

	console.log(clientDB)

	for (var i = 0; i < clData.length; i++) {
		upLoadTable.push(clientDB[i].join(","));
	}

	upLoadTable.unshift("cl_num,inv_num,name,street,city,phone,attention,email,alt_email");
	finalTable = upLoadTable.join('\n');
console.log(finalTable)

	var github = new GitHub({ //<---------- error is here
		// token: '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'
		token: castleKey
	});

	var repository = github.getRepo('ashamrock', 'TestTable');
	console.log(repository)
	// dbData = []


	repository.writeFile(
		'main', // e.g. 'master'
		'cl.csv', // e.g. 'blog/index.md'
		finalTable, // e.g. 'Hello world, this is my new content'
		'Updating Client list', // e.g. 'Created new index'
	).then((response) => {
		// Success///////////////////////////////////////////////////////////////
		alert("Client Invoice Number Updated")

	})
		.catch((error) => {
			// Error
			if (error.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
				console.log(error.response.data);
				console.log(error.response.status);
				console.log(error.response.headers);
			} else if (error.request) {
				// The request was made but no response was received
				// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
				// http.ClientRequest in node.js
				console.log(error.request);
			} else {
				// Something happened in setting up the request that triggered an Error
				console.log('Error', error.message);
			}
			alert(error.response.status + " - Upload Error. Please Consult A Professional");

		});

}

function confirmClientUpdate () {
	const response = confirm("Do you want to update the clients invoice number in the database?");

	if (response) {
		alert("Ok Updating Client");
		updateClient()
	} 

}

function invoiceData(){
	var selClient = document.getElementById("clientDrop");
	var selClientID = selClient.options[selClient.selectedIndex].id;

	dt = prompt("Invoice Date", date);
	invoiceNum = prompt("Use the following invoice number?", Number(clData[selClientID].inv_num));
  
  console.log(
invoiceNum, clientDB[selClientID][1]
)
  if (clientDB[selClientID][1] != invoiceNum) {
confirmClientUpdate ()
  }else(
	invoiceNum=clData[selClientID].inv_num
  )

	var y = Number(dt.slice(6, 10))
	var m = (Number(dt.slice(0, 2)) + 2)
	var d = Number(dt.slice(3, 5))

	if (isNaN(m)) {
		alert("Please enter a valid format mm_dd_yyy")
		return
	}

	if (m === 13) {
		m = 1
		y = y + 1
	} else if (m === 14) {
		m = 2
		y = y + 1
	} else if (m > 14) {
		alert("Please enter a valid format mm_dd_yyy")
		return
	}

	due = m + '_' + d + '_' + y;

clientPopulate()
}

function clientPopulate() {
	var selClient = document.getElementById("clientDrop");
	var selClientID = selClient.options[selClient.selectedIndex].id;

	document.getElementById("totalDue").innerHTML = "$" + Math.floor(subTotals).toLocaleString('en-IN')

	document.getElementById("clientName").innerHTML = clData[selClientID].name;
	document.getElementById("clientStreet").innerHTML = clData[selClientID].street;
	document.getElementById("clientCity").innerHTML = clData[selClientID].city;
	document.getElementById("clientPhone").innerHTML = clData[selClientID].phone;
	document.getElementById("clientAttn").innerHTML = "Attn: " + clData[selClientID].attention;
	document.getElementById("clientEmail").innerHTML = clData[selClientID].email;
	document.getElementById("clientTitle").innerHTML = clData[selClientID].name;
	document.getElementById("invPage").innerHTML = "0"+selClientID+"0"+invoiceNum+(" INVOICE");

	document.getElementById("invoiceNum").innerHTML = "Invoice #: " + "0"+selClientID+"0"+invoiceNum
	document.getElementById("clientInvoiceDate").innerHTML = "Invoice Date: " + dt
	document.getElementById("clientInvoiceDue").innerHTML = "Due: " + due

}

function workStatus(clicked_id) {

	const d = new Date();
	var paused = d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })

	console.log(clicked_id)
	console.log(onTheClock)
	if (clicked_id === "clockManager") {
		if (onTheClock === 1) {
			$('#stopWorkModal').modal('show');
			// console.log("first")
			var hideMe = document.getElementById("stopResumeWork");
			var showMe = document.getElementById("stopPauseWork");
			showMe.style.display = "block";
			hideMe.style.display = "none";
		} else if (onTheClock === 2) {
			$('#stopWorkModal').modal('show');
			var showMe = document.getElementById("stopResumeWork");
			var hideMe = document.getElementById("stopPauseWork");
			showMe.style.display = "block";
			hideMe.style.display = "none";
			// console.log("second")
		} else if (onTheClock === 3) {
			$('#addWorkModal').modal('show');
			// var showMe = document.getElementById("stopResumeWork");
			// var hideMe = document.getElementById("stopPauseWork");
			// showMe.style.display = "block";
			// hideMe.style.display = "none";
		} else {
			$('#startWorkModal').modal('show');
			// console.log("third")
		}
	}

	if (clicked_id === "stopPauseWork") {
		for (var i = 0; i < table.rows.length; i++) {
			var x = table.rows[i].cells[3].innerHTML;
		}
		table.rows[1].cells[3].innerHTML = "PAUSED " + paused
		stBtn.innerHTML = " Paused Job At " + paused
		// console.log("fifth")
	}

	if (clicked_id === "stopResumeWork") {
		for (var i = 0; i < table.rows.length; i++) {
			var x = table.rows[i].cells[3].innerHTML;
		}
		table.rows[1].cells[3].innerHTML = "WORKING " + startJobTime
		stBtn.innerHTML = "Started Job At" + startJobTime
		// console.log("sixth")
	}

	if (clicked_id === "stopNewTask") {
		$('#startWorkModal').modal('show');
		// console.log("fourth")
	}

	// if()
	// clockManager

	// startStartJob
	// startSaveBtn 
	// startNewClient
	// startChangeRates

	// stopPauseWork
	// stopResumeWork
	// stopNewTask
	// stopSaveWork

	// pauseResumeWork
	// pauseNewTask
	// pauseSaveWork

}

function taskSelect() {
	var modSelClient = document.getElementById("modClientDrop");
	var modSelTask = document.getElementById("modTaskDrop");
	var modSelJob = document.getElementById("modJobDrop");

	var printTask = document.getElementById("printTask");
	var jobTask = document.getElementById("jobTask");
	var jobInput = document.getElementById("jobNameInput");

	var svbtn = document.getElementById('startStartJob');
	// var currentUserId = currentUser.options[currentUser.selectedIndex].id;

	//task
	if(modSelTask.value==="3D Print"){
		printTask.style.display = "block";
		svbtn.innerHTML = "Post Job" //Start Job
		newTaskAdd = 1
	}else{
		printTask.style.display = "none";
		svbtn.innerHTML = "Start Job"
		newTaskAdd = 0
	}
	//job
	if(modSelJob.value==="New Job"){
		jobTask.style.display = "block";
		newJobAdd = 1
	}else{
		jobTask.style.display = "none";
		newJobAdd = 0
	}	

	if(modSelClient.value==="N/A"){
		modSelClient.classList.remove("goodFill");
	}else{
		modSelClient.classList.add("goodFill");
	}

	if(modSelTask.value==="N/A" || modSelTask.value==="3D Print"){
		modSelTask.classList.remove("goodFill");
	}else{
		modSelTask.classList.add("goodFill");
	}

	if(modSelJob.value==="N/A" || modSelJob.value==="New Job"){
		modSelJob.classList.remove("goodFill");
	}else{
		modSelJob.classList.add("goodFill");
	}

	if(jobInput.value === ""){
		jobInput.classList.remove("goodFill");
	}else{
		jobInput.classList.add("goodFill");
	}

}

function getTime() {
	const d = new Date();
	// let sinceseconds = d.getSeconds();
	// let sinceminutes = d.getMinutes();
	// let sincehours = d.getHours();
	var table = document.getElementById('workTable');
	for (var i = 0; i < table.rows.length; i++) {
		var x = table.rows[i].cells[3].innerHTML;
	}
	startJobTime = d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
	table.rows[1].cells[3].innerHTML = "WORKING " + startJobTime
	stBtn.innerHTML = "WORKING - Started Job At " + startJobTime
}

function addPrintJob(){

	if (jobNumber === undefined){
		jobNumber = ""
	}
	console.log("#DPRINTING MOTHERFUCKER")

	chargedAmt = Math.ceil( Number(setupCost) + (printQtyInput * (filamentCost / filamentWeight * weightInput) + (printQtyInput * buildFee)))
	
	var currentUserId = currentUser.options[currentUser.selectedIndex].id;
	var modClientid = modSelClient.options[modSelClient.selectedIndex].id;

	for (var i = 0; i < clData.length; i++) {
		if (clData[i].cl_num === modClientid) {
			var currentInvoiceNum = clData[i].inv_num
		}
	}

	for (var i = 0; i < webData.length; i++) {
		if (webData[i].job === modSelJob.value) {
			var jobNumber = webData[i].job_ID
			if (jobNumber === "") {
				jobNumber = ""
			}
		}

	}

	for (var i = 0; i < clData.length; i++) {
		if (clData[i].cl_num === modClientid) {
			var currentInvoiceNum = clData[i].inv_num
		}
	}
}

function startWork() {
	var setupCost = document.getElementById("setupCost").value;
	var filamentCost = document.getElementById("filamentCost").value;
	var weightInput = document.getElementById("weightInput").value;
	var filamentWeight = document.getElementById("filamentWeight").value;
	var buildFee = document.getElementById("buildFee").value;
	var printQtyInput = document.getElementById('printQtyInput').value;

	var currentUser = document.getElementById("currentUser");
	var modSelClient = document.getElementById("modClientDrop");
	var modSelTask = document.getElementById("modTaskDrop");
	var modSelJob = document.getElementById("modJobDrop");
	var modJobInput = document.getElementById("jobNameInput");

	var currentUserId = currentUser.options[currentUser.selectedIndex].id;
	var modClientid = modSelClient.options[modSelClient.selectedIndex].id;
	var currentInvoiceNum;
	// var jobNumberInput = document.getElementById('jobNumberInput').value;
	var hoursInput = document.getElementById('hoursInput').value;
	var svbtn = document.getElementById('startStartJob');

	JobNameValue = modSelJob.value;

	if(modSelJob.value=== "N/A"){
		// modSelJob=""
		alert("Please select a job")
		return
	}else
	if(modSelJob.value=== "New Job"){
		if(modJobInput.value === ""){
			alert("Please enter a job name")
			return
		}
		JobNameValue=modJobInput.value
	}

	onTheClock = 1
	stopTime = 0;
	startTime = Date.now() / 1000
	seconds = today.getSeconds();
	minutes = today.getMinutes();
	hours = today.getHours();
	table.innerHTML = "";

	closeNav()

	for (var i = 0; i < clData.length; i++) {
		if (clData[i].cl_num === modClientid) {
			currentInvoiceNum = clData[i].inv_num
		}
	}

		currentTask.splice(0, 0, [
			modSelClient.value,
			modSelTask.value,
			JobNameValue,
			0,//elapsedTime,
		])

		var columnCount = taskHeader.length;
		var row = table.insertRow(-1);

		for (var i = 0; i < columnCount; i++) {
			var headerCell = document.createElement("TH");
			headerCell.innerHTML = taskHeader[i];
			row.appendChild(headerCell);
		}

		for (var k = 0; k < currentTask.length; k++) {
			var row = document.createElement('tr');

			for (var j = 0; j < currentTask[k].length; j++) {
				var cell = document.createElement('td');
				cell.textContent = currentTask[k][j];
				row.appendChild(cell);
			}
			table.appendChild(row);
		}

	if(newTaskAdd === 1){
		chargedAmt = Math.ceil( Number(setupCost) + (printQtyInput * (filamentCost / filamentWeight * weightInput) + (printQtyInput * buildFee)))
		svbtn.innerHTML = "Start Job"
		newTaskAdd = 0
		onTheClock = 0
		hoursTime = hoursInput
		// addPrintJob()
		// return
		table.rows[1].cells[3].innerHTML = hoursTime
		currentTask[0][3] = (hoursTime)

	for (var i = 0; i < clData.length; i++) {
		if (clData[i].cl_num === modClientid) {
			var currentInvoiceNum = clData[i].inv_num
		}
	}

	for (var i = 0; i < webData.length; i++) {
		if (webData[i].job === modSelJob.value) {
			var jobNumber = webData[i].job_ID
			if (jobNumber === "" || "N/A") {
				jobNumber = ""
			}
		}

	}

	for (var i = 0; i < clData.length; i++) {
		if (clData[i].cl_num === modClientid) {
			var currentInvoiceNum = clData[i].inv_num
		}
	}

	if (jobNumber === undefined){
		jobNumber = ""
	}

	dbData.push([
		modClientid,
		currentInvoiceNum,
		date,
		currentUser.value,
		modSelTask.value,
		weightInput+"g",
		JobNameValue,
		jobNumber,
		hoursInput,
		chargedAmt,
	])
	console.log(dbData)
	stBtn.innerHTML = "Time Clock Manager"
	$('#startWorkModal').modal('hide');
	onTheClock = 3;
	return
	}else{
		getTime()
	}
$('#startWorkModal').modal('hide');
}

function pauseWork() {
	var hideMe = document.getElementById("stopPauseWork");
	var showMe = document.getElementById("stopResumeWork");
	onTheClock = 2
	stopTime = Date.now() / 1000
	timeTable.push(stopTime - startTime)
}

function resumeWork() {
	var hideMe = document.getElementById("stopResumeWork");
	var showMe = document.getElementById("stopPauseWork");
	onTheClock = 1
	startTime = Date.now() / 1000
}

function stopWork() {
	onTheClock = 0
	stopTime = Date.now() / 1000
	timeTable.push(stopTime - startTime)
	timeValue = timeTable.reduce(function (a, b) {
		return a + b;
	});
	//---------------------------------------------------------------------
	var hoursTime = (timeValue / 3600).toFixed(1)   	//||
	//	var hoursTime = timeValue							//||
	//---------------------------------------------------------------------
	table.rows[1].cells[3].innerHTML = hoursTime
	currentTask[0][3] = (hoursTime)

	var currentUser = document.getElementById("currentUser");
	var modSelClient = document.getElementById("modClientDrop");
	var modSelTask = document.getElementById("modTaskDrop");
	var modSelJob = document.getElementById("modJobDrop");

	console.log()
	
	var currentUserId = currentUser.options[currentUser.selectedIndex].id;
	var modClientid = modSelClient.options[modSelClient.selectedIndex].id;

	for (var i = 0; i < clData.length; i++) {
		if (clData[i].cl_num === modClientid) {
			var currentInvoiceNum = clData[i].inv_num
		}
	}

	for (var i = 0; i < webData.length; i++) {
		if (webData[i].job === modSelJob.value) {
			var jobNumber = webData[i].job_ID
			if (jobNumber === "") {
				jobNumber = ""
			}
		}

	}

	for (var i = 0; i < clData.length; i++) {
		if (clData[i].cl_num === modClientid) {
			var currentInvoiceNum = clData[i].inv_num
		}
	}

	dbData.push([
		modClientid,
		currentInvoiceNum,
		date,
		currentUser.value,
		modSelTask.value,
		defaultRate[0],
		JobNameValue,
		jobNumber,
		hoursTime,//hours
		(hoursTime * defaultRate[0]),//total
	])
	timeTable = [];
}

function saveWork() {

	const response = confirm("Do you want to save your work to the database?");

	if (response) {
		alert("Ok saving work to database");
		upLoad()
	} 

}

function upLoad() {
	if (onTheClock === 1 || 2) {
		stopWork()
	}
	onTheClock = 0
	currentTask = []
	table.innerHTML = ""

	upLoadTable = []
	finalTable = []

	for (var i = 0; i < dbData.length; i++) {
		upLoadTable.push(dbData[i].join(","));
	}

	upLoadTable.unshift("client,invoice,date,employee,task,rate,job,job_ID,hours,total");
	finalTable = upLoadTable.join('\n');
	console.log(upLoadTable)
	// console.log(finalTable)

	var github = new GitHub({ //<---------- error is here
		// token: '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'
		token: castleKey
	});

	var repository = github.getRepo('ashamrock', 'TestTable');
	console.log(repository)
	// dbData = []


	repository.writeFile(
		'main', // e.g. 'master'
		'db.csv', // e.g. 'blog/index.md'
		finalTable, // e.g. 'Hello world, this is my new content'
		'Adding Job list', // e.g. 'Created new index'
	).then((response) => {
		// Success///////////////////////////////////////////////////////////////
		var element = document.getElementById("retryUpload");
		element.style.display = "none";


		stBtn.innerHTML = "Time Clock Manager"
		$("#confirmText").fadeOut(1000)

		setTimeout(function () {
			stBtn.innerHTML = "-- DATABASE UPDATED --"
			$("#confirmText").fadeIn(1000)
		}, 1000);
		setTimeout(function () {
			$("#confirmText").fadeOut(1000)
		}, 1100);
		setTimeout(function () {
			stBtn.innerHTML = "Time Clock Manager"
			$("#confirmText").fadeIn(1500)
		}, 3000);


	})
		.catch((error) => {
			// Error
			if (error.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
				console.log(error.response.data);
				console.log(error.response.status);
				console.log(error.response.headers);
			} else if (error.request) {
				// The request was made but no response was received
				// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
				// http.ClientRequest in node.js
				console.log(error.request);
			} else {
				// Something happened in setting up the request that triggered an Error
				console.log('Error', error.message);
			}
			alert(error.response.status + " - Upload Error. Please Consult A Professional");
			stBtn.innerHTML = "!!!-!!! DATABASE ERROR !!!-!!!"

			var element = document.getElementById("retryUpload");
			element.style.display = "block";

			setTimeout(function () {
				stBtn.innerHTML = "Time Clock Manager"
				// stBtn.innerHTML="fuck all"
			}, 4000);

		});

}































































document.getElementById("fileDate").innerHTML = date

getClients()

function openNav() {
	document.getElementById("mySidebar").style.width = "240px";
	document.getElementById("page").style.marginLeft = "240px";
}

function closeNav() {
	document.getElementById("mySidebar").style.width = "0";
	document.getElementById("page").style.marginLeft = "0";
}

function openTab(evt, tabName) {
	var i, tabcontent, tablinks;
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}
	document.getElementById(tabName).style.display = "block";
	evt.currentTarget.className += " active";

}

function cleanSlate() {
	var div2 = document.getElementById("Projects");
	div2.remove();

	var selectElement = document.getElementById("updateprojectlist");
	var i, L = selectElement.options.length;
	for (i = L; i >= 1; i--) {
		selectElement.remove(i);
	}

	client = []
	projects = []
	taskData = [];
	allData = [];
	billingHours = [];
	billingTotal = [];
	clientNumber = [];

	timeTable = [];
	clientsNames = [];
	clientSheet = [];

	document.getElementById("jobs").innerHTML = "";
	document.getElementById("buffetTable").innerHTML = "";
}

function getClients() {
	for (var c = 0; c < clientList.length; c++) {
		var select = document.getElementById("cnames");
		data = clientList[c][2]
		if (clientList[c][0] === clientNumber) {
			clientData = (clientList[c])
		}
		clientsNames.push(data);
		var element = document.createElement("option");
		var option = clientsNames[c];
		element.textContent = option;
		element.value = option;
		select.appendChild(element);
		element.setAttribute("id", clientList[c][0]);
	}
}

function addProjects() {
	var p = document.getElementById("Projects");
	var option = document.createElement("option");
	option.text = projects[projects.length - 1][0];
	p.add(option);
	option.setAttribute("value", projects[projects.length - 1][0]);
	option.setAttribute("id", projects[projects.length - 1][1]);
}

document.getElementById('cnames').onchange = function () {
	var index = this.selectedIndex;
	var clientId = this.children[index].id;
	for (var c = 0; c < clientList.length; c++) {
		if (clientList[c][0] == clientId) {
			clientSheet = clientList[c]
		}
	}
}

document.getElementById('updateprojectlist').onchange = function () {
	var cl = document.getElementById("updateprojectlist").value;
	var cn = document.getElementById("updateprojectlist");
	var cnvalue = cn.options[cn.selectedIndex].id;
	list = document.getElementById("jobName");
	nlist = document.getElementById("jobNumber");
	list.value = cl
	nlist.value = cnvalue
}

// file.addEventListener('change', () => {
// 	var fr = new FileReader();
// 	fr.onload = function () {

// 		var lines = this.result.split('\n');

// 		for (var line = 0; line < lines.length; line++) {
// 			if(lines[line]=== "\r"){
// 				break
// 			}
// 			if(lines[line]=== ""){
// 				break
// 			}
// 			allData.push(lines[line].split(","));
// 		}

// 		clientNumber=allData[0][0]
// 		invoiceNum=allData[1][0]
// 		invoiceDate=allData[2][0]
// 		invoiceDueDate=allData[3][0]
// 		invoiceNumber = "0"+clientNumber+"0"+invoiceNum;

// 		for (var c = 0; c < clientList.length; c++) {
// 			if (clientList[c][0]===Number(clientNumber)){
// 				clientData=(clientList[c])
// 			}
// 		}

// 		document.getElementById("pickedTask").innerHTML = workingFileName
// 		document.getElementById("clientBrief0").innerHTML = workingFileName
// 		document.getElementById("clientBrief1").innerHTML = clientData[2]
// 		document.getElementById("clientBrief2").innerHTML = clientData[3]
// 		document.getElementById("clientBrief3").innerHTML = clientData[4]
// 		document.getElementById("clientBrief4").innerHTML = clientData[5]
// 		document.getElementById("clientBrief5").innerHTML = clientData[7]
// 		document.getElementById("clientBrief6").innerHTML = clientData[8]
// 		document.getElementById("clientBrief7").innerHTML = (clientData[0])
// 		document.getElementById("clientBrief8").innerHTML = (invoiceNum)

// 		document.getElementById("clientSheet1").value = (Number(invoiceNum)+1)

// 		var getProjects = document.getElementById("projectlist");
// 		var newDiv = document.createElement("select");
// 		getProjects.appendChild(newDiv);
// 		newDiv.setAttribute("id", "Projects");

// 		var allClients = document.getElementById("cnames");
// 		var newDiv = document.createElement("select");
// 		allClients.appendChild(newDiv);
// 		newDiv.setAttribute("id", "clientNames");

// 		for (var line = 17; line < allData.length; line++) {
// 			taskData.push(lines[line].split(","));
// 		}

// 		for (var i = 4; i < 16; i++) {	
// 			var select = document.getElementById("Projects");
// 			var cl = document.getElementById("updateprojectlist");
// 			data = allData[i][0]
// 		if (data===""){
// 			break;
// 		}
// 			projects.push([data,allData[i][1]]);
// 			var element = document.createElement("option");
// 			var option = projects[i-4][0];
// 			    element.textContent = option;
//     			element.value = option;
//     			select.appendChild(element);
// 				element.setAttribute("id", allData[i][1]);
// 			 var cloption = document.createElement("option");
// 			 cloption.text = option;
// 			 cloption.setAttribute("id", projects[i-4][1]);
// 			 cl.add(cloption);
// 		}

// 		clientPopulate()
// 		generate_table()
// 	}

// 	workingFileName = document.getElementById("inputfile").files[0].name;
// 	fr.readAsText(file.files[0]);

// openTab(event, 'timesheet')
// 	// var fn = document.getElementById("fileload")
// 	// document.getElementById("fileload").innerHTML = workingFileName
// 	// document.getElementById("pickedTask").innerHTML = workingFileName
// 	// document.getElementById("pickedTask").innerHTML = workingFileName
// });


function runclock() {
	if (workingFileName === "") {
		alert("no time to be added")
		return
	}

	// if (startTime!==0){
	// 	var element2 = document.getElementById("addhours");
	// 	element2.style.display = "block";
	// }else{
	// 	var element = document.getElementById("addhours");
	// 	element.style.display = "none";
	// }

	if (onTheClock === 0) {
		onTheClock = 1
		var element1 = document.getElementById("working");
		var element2 = document.getElementById("addhours");
		element1.style.display = "block";
		element2.style.display = "block";
		startTime = Date.now() / 1000
	} else if (onTheClock === 1) {
		onTheClock = 0;
		stopTime = Date.now() / 1000
		timeTable.push(stopTime - startTime)
		var element = document.getElementById("working");
		element.style.display = "none";
	}
}

function reset() {
	onTheClock = 0;
	timeTable = [];
	// document.getElementById("addwork").style.color = 'black';
	var element = document.getElementById("addhours");
	element.style.display = "none";
	startTime = 0
	stopTime = 0
}

function addWork() {
	var addData;

	if (workingFileName === "") {
		alert("No work to add")
		return
	}

	timeValue = timeTable.reduce(function (a, b) {
		return a + b;
	});

	if (timeValue === 0) {
		alert("No time to add")
		return;
	}

	addingup()

	var empvalue = document.getElementById("nameInput").value;
	var workvalue = document.getElementById("workInput").value;
	var ratevalue = document.getElementById("rateInput").value;
	var taskvalue = document.getElementById("Projects").value;
	var taskNumber = document.getElementById("Projects");
	var jobvalue = taskNumber.options[taskNumber.selectedIndex].id;
	var hoursTime = (timeValue / 3600).toFixed(1)
	// hoursTime=1.5;
	// console.log("hello again")
	var totalvalue = hoursTime * ratevalue;

	if (empvalue.length === 0) {
		alert("Enter your name")
		return;
	} else if (ratevalue.length === 0) {
		alert("Enter your rate")
		return;
	} else if (taskvalue.length == 0) {
		alert("Enter your task")
		return;
	}

	var table = document.getElementById("taskTable");
	var row = table.insertRow(0);
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
	var cell4 = row.insertCell(3);
	var cell5 = row.insertCell(4);
	var cell6 = row.insertCell(5);
	var cell7 = row.insertCell(6);
	var cell8 = row.insertCell(7);
	cell1.innerHTML = date;
	cell2.innerHTML = empvalue;
	cell3.innerHTML = workvalue;
	cell4.innerHTML = ratevalue;
	cell5.innerHTML = taskvalue;
	cell6.innerHTML = jobvalue;
	cell7.innerHTML = hoursTime;
	cell8.innerHTML = totalvalue;
	client = clientNumber
	invoice = invoiceNum
	date = date
	employee = empvalue
	task = workvalue
	rate = ratevalue
	job = taskvalue
	job_ID = jobvalue
	hours = hoursTime
	total = totalvalue
	newRow = [date, empvalue, workvalue, ratevalue, taskvalue, jobvalue, hoursTime, totalvalue];
	addData = { client, invoice, date, employee, task, rate, job, job_ID, hours, total };
	taskData.unshift(newRow)
	allData.splice(17, 0, newRow);
	webData.push(addData)
	console.log(addData)

	whiteLines++
	addingup()

	reset();
}

function addingup() {
	billingHours = [];
	billingTotal = [];
	hourTotals = "";
	subTotals = "";

	for (let i = 0; i < taskData.length; i++) {
		if (showHold === 0 && taskData[i][5] === "HOLD") {
			billingHoldHours.push(parseFloat(taskData[i][6]))
			billingHoldTotal.push(parseFloat(taskData[i][7]))
		} else {
			billingHours.push(parseFloat(taskData[i][6]))
			billingTotal.push(parseFloat(taskData[i][7]))
		}
		hourTotals = billingHours.reduce(function (a, b) {
			return a + b;
		});

		addBills = billingTotal.reduce(function (a, b) {
			return a + b;
		});

		hourTotals = "Hours= " + hourTotals.toFixed(1);
		subTotals = "SubTotal= $" + addBills.toFixed(0);
		finalTotal = "$" + addBills.toFixed(2);

		const demo1 = (addBills).toLocaleString('en-US', {
			style: 'currency',
			currency: 'USD'
		});

		// console.log(demo1)

		document.getElementById("totalDue").innerHTML = demo1
		tophead.rows[0].cells[6].innerHTML = String(hourTotals);
		tophead.rows[0].cells[7].innerHTML = String(subTotals);
		allData[16][6] = String(hourTotals);;
		allData[16][7] = String(subTotals);
	}

	// console.log(billingHours)
	// console.log(billingHoldTotal)
	// const demo1 = (addBills).toLocaleString('en-US', {
	// 	style: 'currency',
	// 	currency: 'USD'
	// });
}

function poping() {
	var noDiv = document.getElementById("invoiceTable");
	if (noDiv === null) {
		var elem = document.querySelector('#jobs');
		var base = document.querySelector('#plop');
		var clone = elem.cloneNode(true);
		clone.id = 'invoiceTable';
		base.after(clone);
	} else {
		noDiv.parentNode.removeChild(noDiv);
		cloneTable()
	}
}

function cloneTable() {
	var elem = document.querySelector('#jobs');
	var base = document.querySelector('#plop');
	var clone = elem.cloneNode(true);
	clone.id = 'invoiceTable';
	base.after(clone);
}

function erase_table() {
	var noInvoiceTable = document.getElementById("invoiceTable");
	noInvoiceTable.parentNode.removeChild(noInvoiceTable);
}

function generate_table() {

	// document.getElementById(elementID).innerHTML = ""

	var body = document.getElementById("jobs");
	var tbl = document.createElement("table1");
	tophead = document.createElement("thead");
	var tblBody = document.createElement("tbody");
	var topRow = document.createElement("tr");

	body.appendChild(tbl);
	tbl.appendChild(tophead);
	tbl.appendChild(tblBody);

	tbl.setAttribute("id", "buffetTable");
	tblBody.setAttribute("id", "taskTable");

	for (var j = 0; j < header.length; j++) {
		allData[16][j] = header[j];
		var cell = document.createElement("th");
		var cellText = document.createTextNode(header[j]);
		cell.appendChild(cellText);
		topRow.appendChild(cell);
		tophead.appendChild(topRow);
	}

	addingup()

	// creating all cells
	for (var i = 0; i < taskData.length; i++) {
		var row = document.createElement("tr");
		for (var j = 0; j < header.length; j++) {
			var cell = document.createElement("td");
			var cellText = document.createTextNode(taskData[i][j]);
			cell.appendChild(cellText);
			row.appendChild(cell);
			tblBody.appendChild(row);
		}
	}

	var tds = $("tbody").find("td");
	var trs = $("tbody").find("tr");
	// console.log(trs)
	var tr, i;
	var td, i;
	for (i = 0; i < tds.size(); i++) {
		td = tds.eq(i);
		tr = trs.eq(i);
		//   console.log(tr)
		// //   console.log(td)
		//   if (td.text().indexOf("HOLD")!=-1) {
		// 	console.log(td.next().next()[0])
		// 	td.next()[0].classList.add("noAdd");
		// 	td.next().next()[0].classList.add("noAdd");
		//   }
		if (tr.text().indexOf("HOLD") != -1) {
			tr[0].classList.add("noAdd");
		}
	}

	// 	const paragraphs  = document.getElementsByTagName("td");
	// const secondParagraph = paragraphs[1];
	// // console.log (paragraphs)
	// console.log (secondParagraph)
	// if(secondParagraph === "A Shamrock"){
	// 	console.log("yes")
	// }else{
	// 	console.log("no")
	// }
	// // secondParagraph.style.color = "red";
	// // secondParagraph.classList.add("noAdd");

}

function updateInvoiceAlert() {
	// if (workingFileName === "") {
	// 	alert("Please choose a file")
	// 	return
	// }

	// if (person == null || person == "") {
	//   text = "User cancelled the prompt.";
	// } else {
	//   text = "Hello " + person + "! How are you today?";
	// }

	// let nm = prompt("Invoice Number ", invoiceNum+1);
	// console.log(nm)
	let dt = prompt("Invoice Date", date);
	var y = Number(dt.slice(6, 10))
	var m = (Number(dt.slice(0, 2)) + 2)
	var d = Number(dt.slice(3, 5))

	// invoiceNumber = clientNumber+nm;

	if (isNaN(m)) {
		alert("Please enter a valid format mm_dd_yyy")
		return
	}

	if (m === 13) {
		m = 1
		y = y + 1
	} else if (m === 14) {
		m = 2
		y = y + 1
	} else if (m > 14) {
		alert("Please enter a valid format mm_dd_yyy")
		return
	}

	closeNav()

	due = m + '_' + d + '_' + y;

	allData[2][0] = dt
	allData[3][0] = due

	document.getElementById("invoiceNum").innerHTML = "Invoice #: " + invoiceNumber
	document.getElementById("clientInvoiceDate").innerHTML = "Invoice Date: " + allData[2][0]
	document.getElementById("clientInvoiceDue").innerHTML = "Due: " + allData[3][0]

	document.title = "INVOICE " + dt + " - " + invoiceNumber + " Lucky_Development"
	console.log(document.title)
	openTab(event, 'invoice')
	hide()
	poping()
}

// $('#save-link').click(function saveLink() {

// var github = new GitHub({ //<---------- error is here
// 	token: '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'
// });

// var repository = github.getRepo('ashamrock', 'TestTable');

// 	// if (clientNumber === "") {
// 	// alert("No file loaded")
// 	// return
// 	// }

// 	saveTable=[]
// 	asstable=[]
// 	tableText=""

// 		for (var i = 0; i < allData.length; i++) {
// 			saveTable.push( allData[i].join(","));
// 		}

// 		for (var i = 0; i < dbData[0].length; i++) {
// 			asstable.push(dbData[0][i]);
// 		}


// 	tableText = saveTable.join('\n');

// console.log(asstable)
// console.log(saveTable)
// console.log(tableText)


// // repository.writeFile(
// //    'main', // e.g. 'master'
// //    'dbtest.csv', // e.g. 'blog/index.md'
// //    tableText, // e.g. 'Hello world, this is my new content'
// //    'Testing commit', // e.g. 'Created new index'
// //    function(err) {}
// // );

// // console.log(repository)

// 	},

// )

$('#newClientSave').click(function save() {

	var newClient = [];
	var newClientText;
	var clientName = document.getElementById("cnames").value
	var newInvoiceNum = document.getElementById("clientSheet1").value
	var newJobName = document.getElementById("clientSheet0").value.replace(/\s/g, '')

	if (newInvoiceNum === " ") {
		newInvoiceNum = "0" + "1"
	}
	// cnames
	if (clientName === "Name") {
		alert("Please add a Client Name")
		return
	} else if (newJobName === "") {
		alert("Please add a Job")
		return
	} else {
		console.log(newJobName)
	}

	newClient.push(
		// 1
		clientSheet[0] + ",,,,,,,",
		// 2
		newInvoiceNum + ",,,,,,,",
		// 3
		date + ",,,,,,,",
		// 4
		"Due Date TBD" + ",,,,,,,",
		// 5
		document.getElementById('clientSheet0').value + ",,,,,,,",
		// 6
		",,,,,,,",
		// 7
		",,,,,,,",
		// 8
		",,,,,,,",
		// 9
		",,,,,,,",
		// 0
		",,,,,,,",
		// 10
		",,,,,,,",
		// 11
		",,,,,,,",
		// 12
		",,,,,,,",
		// 13
		",,,,,,,",
		// 14
		",,,,,,,",
		// 15
		",,,,,,,",
		// 16
		",,,,,,,",
		// 17
		// "Date,Employee,Task,Rate,Job,Job #"
	)
	newClientText = newClient.join('\n');

	var file = new Blob([newClientText], { type: 'text/plain' });
	var btn = $('#newClientSave');
	// console.log(date + "_" + (clientSheet[0]+100)+ (clientSheet[1]+1) + "_" + clientSheet[2])
	btn.attr("href", URL.createObjectURL(file));
	btn.prop("download", date + "_" + clientSheet[2] + "_0" + clientSheet[0] + "0" + newInvoiceNum + ".csv");
}
)

$('#editClientSave').click(function save() {

	var updateprojectlist = document.getElementById("updateprojectlist").value
	var newJob = document.getElementById("jobName").value
	var newJobNUmber = document.getElementById("jobNumber").value

	if (newJob === "") {
		alert("Please enter Job Name")
		return
	}

	confirm("Update " + newJob + " with job number " + newJobNUmber)

	for (var i = 0; i < taskData.length; i++) {
		if (taskData[i][4] == updateprojectlist) {
			// console.log(newJob)
			// console.log(updateprojectlist)
			// console.log(newJob)
			taskData[i][4] = newJob
			taskData[i][5] = newJobNUmber
			allData[17 + i][4] = newJob
			allData[17 + i][5] = newJobNUmber
		}
	}

	document.getElementById("jobs").innerHTML = "";
	generate_table()

	for (var d = 0; d < projects.length; d++) {

		if (updateprojectlist === projects[d][0]) {

			projects[d][0] = newJob
			allData[4 + d][0] = newJob

			projects[d][1] = newJobNUmber
			allData[4 + d][1] = newJobNUmber

		}
	}

	if (updateprojectlist === "") {
		projects.push([newJob, newJobNUmber])
		allData[3 + projects.length][0] = newJob
		allData[3 + projects.length][1] = newJobNUmber

		addProjects()
	}

	console.log(projects)
	console.log(allData)

	$("#confirmText").fadeIn(1500)
	$("#confirmText").fadeOut(1500)

}
)

function hide() {
	var element = document.getElementById("workPage");
	element.style.display = "none";
}

function show() {
	var element = document.getElementById("workPage");
	element.style.display = "block";
}

function showNewClientWorkSheet() {
	var showMe = document.getElementById("newClientWorkSheet");
	var hideIt = document.getElementById("editClient");
	// var nope = document.getElementById("clientInfo");
	showMe.style.display = "block";
	hideIt.style.display = "none";
	// nope.style.display = "none";
}

function showEditClient() {
	var showMe = document.getElementById("editClient");
	var hideIt = document.getElementById("newClientWorkSheet");
	// var nope = document.getElementById("clientInfo");
	showMe.style.display = "block";
	hideIt.style.display = "none";
	// nope.style.display = "none";
}

function showRow() {
	var showMe = document.getElementById("extrarow");
	if (showMe.style.display === "none") {
		showMe.style.display = "block";
	} else {
		showMe.style.display = "none";
	}
}

function addRow() {
	//employee-----------
	var emp = document.getElementById("nameInput").value;
	//task---------
	var taskvalue = document.getElementById("workInput").value;
	//rate--------
	var ratevalue = document.getElementById("rateInput").value;
	//job---------
	var jobvalue = document.getElementById("Projects").value;
	//job#-------
	var jobNumber = document.getElementById("addJobNum").value;
	//hours-------
	var jobHours = document.getElementById("addHoursInput").value;
	//qty-------
	var setupPrice = document.getElementById("setupPrice").value;
	var prtinQty = document.getElementById("PrintQty").value;
	var filamentPrice = document.getElementById("filamentPrice").value;
	var filamentWeight = document.getElementById("filamentWeight").value;
	var buildFee = document.getElementById("buildFee").value;
	var actualRate = 0;
	var chargedAmt = 0;
	// 	console.log(emp)
	// 	console.log(taskvalue)
	// 	console.log(ratevalue)
	// 	console.log(jobvalue)
	// 	console.log(jobNumber)
	// 	console.log(jobHours)
	// 	console.log(ddd)
	if (jobHours === "") {
		jobHours = 1
	}

	if (taskvalue === "3DPrinting") {
		actualRate = ratevalue + "g";
	}
	else {
		actualRate = ratevalue;
	};

	if (taskvalue === "3DPrinting") {
		chargedAmt = Number(setupPrice) + (prtinQty * (filamentPrice / filamentWeight * ratevalue) + (prtinQty * buildFee))
		// console.log(Number(setupPrice)+(prtinQty*(filamentPrice/filamentWeight*ratevalue)+(prtinQty*buildFee)))
}
	else {
		chargedAmt = ratevalue * jobHours;
	};


	var table = document.getElementById("taskTable");
	var row = table.insertRow(0);
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
	var cell4 = row.insertCell(3);
	var cell5 = row.insertCell(4);
	var cell6 = row.insertCell(5);
	var cell7 = row.insertCell(6);
	var cell8 = row.insertCell(7);
	cell1.innerHTML = date;
	cell2.innerHTML = emp;
	cell3.innerHTML = taskvalue;
	cell4.innerHTML = actualRate;
	// if (taskvalue==="3DPrinting"){
	// 	cell4.innerHTML = ratevalue+ "g";
	// }else{
	// 	cell4.innerHTML = ratevalue;
	// };
	cell5.innerHTML = jobvalue;
	cell6.innerHTML = jobNumber;
	cell7.innerHTML = jobHours;
	cell8.innerHTML = chargedAmt;
	// if (taskvalue==="3DPrinting"){
	// 	cell8.innerHTML = Number(setupPrice)+(prtinQty*(filamentPrice/filamentWeight*ratevalue)+(prtinQty*buildFee))
	// 	// console.log(Number(setupPrice)+(prtinQty*(filamentPrice/filamentWeight*ratevalue)+(prtinQty*buildFee)))
	// }else{
	// 	cell8.innerHTML = ratevalue*jobHours;
	// };
	client = clientNumber
	invoice = invoiceNum
	date = date
	employee = emp
	task = taskvalue
	rate = actualRate
	job = jobvalue
	job_ID = jobNumber
	hours = jobHours
	total = chargedAmt

	newRow = [date, emp, taskvalue, actualRate, jobvalue, jobNumber, jobHours, chargedAmt]
	addData = { client, invoice, date, employee, task, rate, job, job_ID, hours, total };

	taskData.unshift(newRow)
	allData.splice(17, 0, newRow);

	webData.push(addData)
	console.log(addData)

	whiteLines++

	addingup()

}

function modifyPrice() {
	var showMe = document.getElementById("extrarow1");
	if (showMe.style.display === "none") {
		showMe.style.display = "block";
	} else {
		showMe.style.display = "none";
	}
}

function noAdd() {
	if (showHold === 0) {
		showHold = 1
	} else {
		showHold = 0
	}

	var trs = $("tbody").find("tr");
	var tr, i;
	for (i = 0; i < trs.size(); i++) {
		tr = trs.eq(i);
		if (tr.text().indexOf("HOLD") != -1 && showHold === 1) {
			tr[0].classList.remove("noAdd");
		}
		else if (tr.text().indexOf("HOLD") != -1 && showHold === 0) {
			tr[0].classList.add("noAdd");
		}
	}
	addingup()
}

function chgbkg(clicked_id) {
	var element = document.getElementById(clicked_id);
	var elem = document.getElementById("past_due");

	if (clicked_id != "3" && element.classList[1] === ("btn-outline-danger")) {
		element.classList.remove("btn-outline-danger");
		element.classList.add("btn-danger");
	} else if (clicked_id != "3" && element.classList[1] === ("btn-danger")) {
		element.classList.remove("btn-danger");
		element.classList.add("btn-outline-danger");
	} else if (clicked_id === "3" && pastdue === 0) {
		console.log("yes")
		element.classList.remove("btn-outline-danger");
		element.classList.add("btn-danger");
		elem.style.display = "block";
		pastdue = 1
	} else if (clicked_id === "3" && pastdue === 1) {
		console.log("no no")
		element.classList.remove("btn-danger");
		element.classList.add("btn-outline-danger");
		elem.style.display = "none";
		pastdue = 0
	}
}

function taskChange() {
	// var elem = document.getElementById("chargeHours");
	var taskVal = document.getElementById("workInput").value;
	var getRate = document.getElementById("chargeRate");

	if (taskVal === "3DPrinting") {
		getRate.innerHTML = "Grams"
		// ddd= "Y" 
		showRow()
	} else {
		getRate.innerHTML = "Rate"
		// ddd= "N" 
	}

}