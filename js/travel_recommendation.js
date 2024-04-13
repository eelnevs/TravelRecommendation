function fetchHTML(file) {
    fetch(file)
        .then(Response => {
            return Response.text();
        })
        .then(html => {
            document.querySelector('#main-content').innerHTML = html;
        })
        .catch(error => {
            console.error("Error loading content:", error);
        })
}

document.querySelector('#homeBtn').addEventListener('click', () => fetchHTML('home.html'))

document.querySelector('#aboutUsBtn').addEventListener('click', () => fetchHTML('about_us.html'))

document.querySelector('#contactUsBtn').addEventListener('click', () => fetchHTML('contact_us.html'))

function bookButtonClick() {
    window.open("https://www.expedia.com/", '_blank').focus();
}