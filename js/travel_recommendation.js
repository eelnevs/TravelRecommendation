document.querySelector('#homeBtn').addEventListener('click', function() {
    fetch("home.html")
        .then(Response => {
            return Response.text();
        })
        .then(html => {
            document.querySelector('#main-content').innerHTML = html;
        })
        .catch(error => {
            console.error("Error loading content:", error);
        })
})

document.querySelector('#aboutUsBtn').addEventListener('click', function() {
    fetch("about_us.html")
        .then(Response => {
            return Response.text();
        })
        .then(html => {
            document.querySelector('#main-content').innerHTML = html;
        })
        .catch(error => {
            console.error("Error loading content:", error);
        })
})

document.querySelector('#contactUsBtn').addEventListener('click', function() {
    fetch("contact_us.html")
        .then(Response => {
            return Response.text();
        })
        .then(html => {
            document.querySelector('#main-content').innerHTML = html;
        })
        .catch(error => {
            console.error("Error loading content:", error);
        })
})