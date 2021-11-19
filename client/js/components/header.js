function logout() {
    axios.delete('/api/sessions').then((respose) => {
        window.location = "/login.html"
    })
}

function login() {
    window.location = "/login.html"
}

function renderHeader() {
    const header = document.getElementById('header-nav');

    axios.get('/api/sessions').then(response => {
        console.log(response)
        if (response.data.loggedIn) {
            header.innerHTML = `
            <h1>Little Birdie</h1>
            <span id="status"></span>
            <ul id="navlist">
                <li onClick="renderEntriesList()">Home</li>
                <li onClick="renderNewEntryForm()">New Post</li>
                <li onClick="logout()">Logout</li>
            </ul>
            `
            const statusEl = document.getElementById('status')
            statusEl.textContent = `logged in as ${response.data.name}`
        } else {
            header.innerHTML = `
            <h1>Little Birdie</h1>
            <span id="status">not logged in</span>
            <ul id="navlist">
                <li onClick="renderEntriesList()">Home</li>
                <li onClick="renderNewEntryForm()">New Post</li>
                <li onClick="login()">Login</li>
            </ul>
            `
        }
    })



}