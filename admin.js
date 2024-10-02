const db = firebase.firestore();
const storage = firebase.storage();

// Upload team logo, name, and points
function uploadTeam() {
    const teamName = document.getElementById('team-name').value;
    const teamPoints = document.getElementById('team-points').value;
    const teamLogo = document.getElementById('team-logo').files[0];

    if (teamLogo) {
        const storageRef = storage.ref('teams/' + teamLogo.name);
        const uploadTask = storageRef.put(teamLogo);

        uploadTask.on('state_changed', 
            function progress(snapshot) {
                console.log('Upload is in progress...');
            }, 
            function error(err) {
                console.error('Error uploading team logo:', err);
            }, 
            function complete() {
                storageRef.getDownloadURL().then((url) => {
                    // Store team data in Firestore
                    db.collection('teams').add({
                        title: teamName,
                        points: parseInt(teamPoints),
                        logo: url
                    }).then(() => {
                        alert('Team uploaded successfully');
                    }).catch((error) => {
                        console.error('Error saving team data:', error);
                    });
                });
            }
        );
    }
}

// Upload blog image
function uploadBlogImage() {
    const blogImage = document.getElementById('blog-image').files[0];

    if (blogImage) {
        const storageRef = storage.ref('blogs/' + blogImage.name);
        const uploadTask = storageRef.put(blogImage);

        uploadTask.on('state_changed', 
            function progress(snapshot) {
                console.log('Upload is in progress...');
            }, 
            function error(err) {
                console.error('Error uploading blog image:', err);
            }, 
            function complete() {
                storageRef.getDownloadURL().then((url) => {
                    // Store blog image in Firestore
                    db.collection('blogs').add({
                        imageUrl: url,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    }).then(() => {
                        alert('Blog image uploaded successfully');
                    }).catch((error) => {
                        console.error('Error saving blog data:', error);
                    });
                });
            }
        );
    }
}
