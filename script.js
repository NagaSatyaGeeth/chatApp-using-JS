var sendBton = document.querySelector(".submit-btn");
var MsgContent = document.querySelector(".msg-text");
var sendMsgBtn = document.querySelector(".send-msg-bton");
var chatBody = document.querySelector(".chat-content");

sendBton.addEventListener("click", userNameBtnHandler);
sendMsgBtn.addEventListener("click", msgBtnHandler);

function userNameBtnHandler() {
	var textField = document.querySelector(".user-name");
	var textFieldValue = textField.value;
	console.log(textFieldValue);
	const username = {
		username: textFieldValue, // converting username to json
	};
	conn.send(JSON.stringify(username)); //sends username to the sevrer
	sendBton.disabled = true; //disables username submit button
	textField.disabled = true; //disables textfield for username
	MsgContent.disabled = false; //enagbles message textfield
	sendMsgBtn.disabled = false; //enables send msg button
}

function msgBtnHandler() {
	var textField = document.querySelector(".user-name");
	var textFieldValue = textField.value;
	var msgvalue = MsgContent.value; //gets the message value
	console.log("🚀 ~ file: script.js:24 ~ msgBtnHandler ~ msgvalue", msgvalue);
	const txtMsg = {
		username: textFieldValue,
		message: msgvalue, // converting messageto json
	};
	console.log(txtMsg);
	conn.send(JSON.stringify(txtMsg)); //send the message vai websocket
	chatBody.innerHTML += `<div class="d-flex flex-row justify-content-start mb-4">
		<div class="flex flex-col">
			<img
				src="blank-profile-picture.webp"
				alt="avatar 1"
				style="width: 45px; height: 100%"
			/>
			<p class="text-sm">user name</p>
		</div>
		<div
			class="p-3 ms-3"
			style="
				border-radius: 15px;
				background-color: rgb(96, 165, 250);
			"
		>
			<p class="text-white small mb-0">
				${msgvalue}
			</p>
		</div>
	</div>
	`;
	MsgContent.value = ""; //clear text field after pressing send msg
}

//connects to the server
const conn = new WebSocket("ws://localhost:8080");
conn.onopen = () => {
	console.log("Connected to WebSocket server");
};

conn.onmessage = (event) => {
	console.log(`Received message from server: ${event.data}`);
};

conn.onclose = () => {
	console.log("Disconnected from the server");
};

// conn.onmessage = (event) => {
// 	// Display the result in the result box
// 	console.log(event.data);
// 	console.log(typeof event.data);
// 	document.getElementById("output").innerHTML = event.data;
// };

// function sendNumbers() {
// 	// Get the values of the input boxes
// 	var num1 = document.getElementById("num1").value;
// 	var num2 = document.getElementById("num2").value;

// 	// Create a message object with the two numbers
// 	var message = {
// 		num1: parseInt(num1),
// 		num2: parseInt(num2),
// 	};

// 	// Send the message object to the WebSocket server
// 	conn.send(JSON.stringify(message));
// }
