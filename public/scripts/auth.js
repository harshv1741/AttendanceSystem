const userDetails = document.querySelector(".userDetails");
const title = document.querySelector(".title")
const msg = document.querySelector(".msg");
const editProfile = document.querySelector("#editProfile");
let unsubscribe
const myModal = document.querySelectorAll(".modal");

// Signup Event
async function signup(e) {
	e.preventDefault();
	const email = document.querySelector("#signupEmail");
	const password = document.querySelector("#signupPassword");

	try {
		const result = await firebase
			.auth()
			.createUserWithEmailAndPassword(email.value, password.value);
		await result.user.updateProfile({
			displayName: "User",
		});
		createUserCollection(result.user);
		// await result.user.sendEmailVerification();
		console.log(result);
		M.toast({ html: `welcome ${result.user.email}`, classes: "green" });
	} catch (err) {
		console.log(err);
		M.toast({ html: err.message, classes: "red" });
	}
	email.value = "";	
	password.value = "";
	M.Modal.getInstance(myModal[0]).close();
}

// Login Event
async function login(e) {
	e.preventDefault();
	const email = document.querySelector("#loginEmail");
	const password = document.querySelector("#loginPassword");

	try {
		const result = await firebase
			.auth()
			.signInWithEmailAndPassword(email.value, password.value);
		console.log(result);
		M.toast({ html: `welcome ${result.user.email}`, classes: "green" });
	} catch (err) {
		console.log(err);
		M.toast({ html: err.message, classes: "red" });
	}
	email.value = "";
	password.value = "";
	M.Modal.getInstance(myModal[1]).close();
}

// Logout Event
function logout() {
	firebase.auth().signOut();
	unsubscribe();
}

// Listener function for auth state changed
firebase.auth().onAuthStateChanged((user) => {
	if (user) {
		document.querySelector("#login").style.display = "none";
		document.querySelector("#signup").style.display = "none";
		document.querySelector("#logout").style.display = "block";
		// console.log(user);
		getUserInfoRealtime(user.uid);
		if(user.uid == "tsWtvG6iSSPRaYaqv47yJYXVaG73"){
			allUserDetails();
		}
	} else {
		getUserInfoRealtime(null);
		document.querySelector(".title").innerHTML = 'Welcome To Attendance System';
		document.querySelector("#logout").style.display = "none";
		document.querySelector("#login").style.display = "block";
		document.querySelector("#signup").style.display = "block";
		document.querySelector("#user").style.display = 'none';
		document.querySelector("#allUser").style.display='none';
	}
});

// Login With Google Functionality
async function loginWithGoogle() {
	try {
		var provider = new firebase.auth.GoogleAuthProvider();
		const result = firebase.auth().signInWithPopup(provider);
		M.toast({ html: `welcome ${result.user.email}`, classes: "green" });
		createUserCollection(result);
	} catch (err) {
		console.log(err);
		M.toast({ html: err.message, classes: "red" });

	}
}
