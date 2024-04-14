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

function searchBar(enable) {
    document.querySelector('#searchBar').style.visibility = enable;
}

document.querySelector('#homeBtn').addEventListener('click', () => {
    fetchHTML('home.html');
    searchBar('visible');
});
document.querySelector('#aboutUsBtn').addEventListener('click', () => {
    fetchHTML('about_us.html');
    searchBar('hidden');
});
document.querySelector('#contactUsBtn').addEventListener('click', () => {
    fetchHTML('contact_us.html');
    searchBar('hidden');
});

function bookButtonClick() {
    window.open("https://www.expedia.com/", '_blank').focus();
}