

function loginAjax(event) {
    const username = document.getElementById("username").value; // Get the username from the form
    const password = document.getElementById("password").value; // Get the password from the form
    alert(username + " " + password)
    // Make a URL-encoded string for passing POST data:
    const data = { 'username': username, 'password': password };

    fetch("http://ec2-18-223-135-67.us-east-2.compute.amazonaws.com/login_ajax.php", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'content-type': 'application/json' }
        })
        .then(response => response.json())
        .then(data => console.log(data.success ? "You've been logged in!" : `You were not logged in ${data.message}`));
        
}

document.getElementById("login_btn").addEventListener("click", loginAjax, false); // Bind the AJAX call to button click