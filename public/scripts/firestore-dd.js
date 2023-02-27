

// Getting Current Date
const date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1; // since month indexing starts from 0
let year = date.getFullYear()
let currentDate = `${day}-${month}-${year}`;


function createUserCollection(user) {
	firebase.firestore().collection("users").doc(user.uid).set({
		uid: user.uid,
		name: user.displayName,
		email: user.email,
		date: currentDate,
		phone: 0,
		attendance: "",
		wages: 0,
	});
}

async function getUserInfoRealtime(userID) {
	if (userID) {
		const userDocReference = await firebase
			.firestore()
			.collection("users")
			.doc(userID);

		unsubscribe = userDocReference.onSnapshot((doc) => {
			if (doc.exists) {
				const userInfo = doc.data();

				if (userInfo) {
					document.querySelector("#currentUser").style.display = 'block';
					document.querySelector('.msg').style.display = "none";
					document.querySelector('.title').innerHTML=`Your Info`;
					userDetails.innerHTML = `
                    <td>${userInfo.name}</td>
                    <td>${userInfo.phone}</td>
                    <td>${userInfo.email}</td>  
                    <td><button
					class="btn waves-effect #1e88e5 blue darken-1 modal-trigger"
					style="margin-top: 0.5rem"
					href="#modal3"
				>
                <i class="material-icons">edit</i>
				</button></td>
                    `;

                editProfile["name"].value = userInfo.name;
                editProfile["phoneNumber"].value = userInfo.phone;
				editProfile["email"].value = userInfo.email;
				editProfile["attendance"].value = userInfo.attendance;
				} 
			}
            
		});
	}else {
        if (msg.style.display == "none") {
            msg.style.display = "block";
        }
        userDetails.innerHTML = ``;
    }
}


function updateUserProfile(e){
    e.preventDefaulet();
    const userDocReference = firebase.firestore().
    collection('users')
    .doc(firebase.auth().currentUser.uid)
    
    userDocReference.update({
        name: editProfile["name"].value,
        phone: editProfile["phoneNumber"].value,
		date: currentDate,
		attendance: editProfile["attendance"].value,
    })

    M.Modal.getInstance(myModal[2]).close();
}


function allUserDetails(){
	document.querySelector("#allUser").style.display='block';
	const userReference = firebase.firestore().collection('users');

	unsubscribe = userReference.onSnapshot(querysnap =>{
		querysnap.docs.forEach(doc=>{
			const info = doc.data()
			document.querySelector('#userData').innerHTML += `
			<tr>
			<td>${info.name}</td>
			<td>${info.phone}</td>
			<td>${info.email}</td>
			<td>${info.date}</td>
			<td>${info.attendance}</td>
			<td>${info.wages}</td>
			</tr>
			`;

		})
	})
}