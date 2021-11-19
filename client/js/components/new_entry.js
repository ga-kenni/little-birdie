
function renderNewEntryForm() {
    const page = document.getElementById('page');
    const heading = document.createElement('h1')
    heading.textContent = "New Post"
    const form = document.createElement('form')
    form.innerHTML = `
    <section id="errors"></section>
    <fieldset>
      <label for="content">What do you want to say? </label><br>
      <textarea name="content"></textarea>
    </fieldset>
    <button>Post</button>
    `
    form.addEventListener('submit', (event) => {
        event.preventDefault()
        const data = Object.fromEntries(new FormData(form))
        axios.post('/api/entries', data)
            .then(response => {
                renderEntriesList()
            }).catch(err => {
              document.getElementById('errors').textContent = err.response.data.message
            })
    })
    page.replaceChildren(heading, form)
}