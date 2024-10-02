function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Only allow login with the specific credentials
            if (email === 'sbnotic2308@gmail.com' && password === 'Sbnotic2308#') {
                window.location.href = 'admin.html';
            } else {
                alert('Incorrect credentials!');
                firebase.auth().signOut();
            }
        })
        .catch((error) => {
            console.error('Error logging in:', error);
        });
}
