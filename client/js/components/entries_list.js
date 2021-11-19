
function renderUser(user_id) {
    const el = document.createElement('p')
    axios.get(`/api/users/${user_id}`)
        .then(response => {
            el.innerHTML = `<b>${response.data.name}</b>`
        })
    return el;
}

function renderEntry(entry) {
    const el = document.createElement('div')
    el.classList.add('challenge')
    
    const user = renderUser(entry.user_id)
    
    const desc = document.createElement('p')
    desc.textContent = entry.content 

    el.append(user, desc)
    return el
}

function renderEntriesList() {
    const page = document.getElementById('page');
    const paragraph = document.createElement('p');
    paragraph.textContent = "Loading";
    page.replaceChildren(paragraph);
    axios.get(`/api/entries`)
        .then(response => {
            const listElements = response.data.map(row => renderEntry(row))
            if (listElements.length === 0) {
                page.innerHTML = '<p>No entries yet</p>'
                return
            }
            page.replaceChildren(...listElements)
        }).catch((err) => {
            console.warn(err)
        })
}