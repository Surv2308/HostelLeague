// Firebase configuration
const db = firebase.firestore();

// Fetch team data and display
function fetchTeams() {
    db.collection('teams').orderBy('points', 'desc').onSnapshot(snapshot => {
        let teamCards = '';
        snapshot.forEach(doc => {
            const team = doc.data();
            teamCards += `
                <div class="team-card">
                    <img src="${team.logo}" alt="${team.title}">
                    <div>
                        <h3>${team.title}</h3>
                        <p>Points: ${team.points}</p>
                    </div>
                </div>
            `;
        });
        document.getElementById('team-cards').innerHTML = teamCards;
    });
}

// Fetch blog data and display
function fetchBlogs() {
    db.collection('blogs').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
        let blogPosts = '';
        snapshot.forEach(doc => {
            const blog = doc.data();
            blogPosts += `
                <div class="blog-post">
                    <img src="${blog.imageUrl}" alt="Blog Image">
                </div>
            `;
        });
        document.getElementById('blogs').innerHTML = blogPosts;
    });
}

// Initial fetch on page load
fetchTeams();
fetchBlogs();
