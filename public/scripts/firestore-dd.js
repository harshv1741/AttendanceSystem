const userDetails = document.querySelector(".userDetails");
const editProfile = document.querySelector("#editProfile");
const addProfile = document.querySelector("#addProfile");
const deleteProfile = document.querySelector("#deleteProfile");
const updateProfile = document.querySelector("#updateProfile");

// Getting Current Date
const date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1; // since month indexing starts from 0
let year = date.getFullYear();
let currentDate = `${day}-${month}-${year}`;

function createUserCollection(user) {
	firebase.firestore()
	.collection("users")
	.doc(user.uid)
	.set({
		uid: user.uid,
		name: user.displayName,
		email: user.email,
		phone: 0,
	});
}

async function getUserInfoRealtime(userID) {
	if (userID) {
		const userDocReference = await firebase.firestore()
		.collection("users")
		.doc(userID);

		unsubscribe = userDocReference.onSnapshot((doc) => {
			if (doc.exists) {
				const userInfo = doc.data();

				if (userInfo) {
					document.querySelector("#user").style.display = "block";
					document.querySelector(".msg").style.display = "none";
					document.querySelector(".title").innerHTML = `Your Info`;
					userDetails.innerHTML = `
                    <td>${userInfo.name}</td>
                    <td>${userInfo.email}</td>  
                    <td><button
					class="btn waves-effect #1e88e5 blue darken-1 modal-trigger"
					href="#modal3"
				>
                <i class="material-icons">edit</i>
				</button></td>
                    `;

					editProfile["name"].value = userInfo.name;
					editProfile["email"].value = userInfo.email;
				}
			}
		});
	} else {
		if (msg.style.display == "none") {
			msg.style.display = "block";
		}
		userDetails.innerHTML = ``;
	}
}

// Updating User Profile
function updateUserProfile(e) {
	e.preventDefaulet();
	const userDocReference = firebase.firestore()
		.collection("users")
		.doc(firebase.auth().currentUser.uid);

	userDocReference.update({
		name: editProfile["name"].value,
		phone: editProfile["phone"].value,
		email: editProfile["email"].value,
	});

	M.Modal.getInstance(myModal[2]).close();
}

// Adding New data
function addDataProfile(e) {
	e.preventDefault();
	let id = Math.floor(Math.random() * 999999).toString();
	console.log(id);
	const userDocReference = firebase.firestore()
		.collection("users")
		.doc(firebase.auth().currentUser.uid)
		.collection("attendance")
		.doc(id);


	userDocReference.set({
		refno: id,
		firstname: addProfile["firstname"].value,
		lastname: addProfile["lastname"].value,
		phone: addProfile["phoneNumber"].value,
		date: currentDate,
		attendance: addProfile["attendance"].value,
		wages: addProfile["wages"].value
	});
	M.Modal.getInstance(myModal[3]).close();
}

// Updating data of user
function updateDataProfile(e) {
	e.preventDefault();
	const userDocReference = firebase.firestore()
		.collection("users")
		.doc(firebase.auth().currentUser.uid)
		.collection("attendance")
		.doc(updateProfile["id"].value);

		userDocReference.update({
			firstname: updateProfile["firstname"].value,
			lastname: updateProfile["lastname"].value,
			phone: updateProfile["phoneNumber"].value,
			date: currentDate,
			attendance: updateProfile["attendance"].value,
			wages: updateProfile["wages"].value
		})
		M.Modal.getInstance(myModal[4]).close();
}

// Deleting Data
function deleteDataProfile(e){
	e.preventDefault();
	const userDocReference = firebase.firestore()
	.collection("users")
	.doc(firebase.auth().currentUser.uid)
	.collection("attendance")
	.doc(deleteProfile["id"].value)

	userDocReference.delete();
	M.Modal.getInstance(myModal[5]).close();
}

// Displaying All Data
function allDataDetails() {
	document.querySelector("#allData").style.display = "block";
	const userReference = firebase.firestore()
	.collection("users")
	.doc(firebase.auth().currentUser.uid)
	.collection("attendance");
	
	unsubscribe = userReference.onSnapshot((querysnap) => {
		querysnap.docs.forEach((doc) => {
			const info = doc.data();
			document.querySelector("#userData").innerHTML += `
			<tr>
			<td>${info.refno}</td>
			<td>${info.firstname} ${info.lastname}</td>
			<td>${info.date}</td>
			<td>${info.phone}</td>
			<td>${info.attendance}</td>
			<td>${info.wages}</td>
			</tr>
			`;
		});
	});
}