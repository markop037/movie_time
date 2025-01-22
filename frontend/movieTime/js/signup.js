document.querySelector("#signupForm").addEventListener("submit", async(e) => {
    e.preventDefault();

    const username = document.querySelector("#username").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const confirmPassword = document.querySelector("#confirmPassword").value;

    if(!username, !email, !password, !confirmPassword){
        alert('Please fill in all fields!');
        return;
    }

    if(password !== confirmPassword){
        alert('Passwords do not match');
        return;
    }
    
    const user = new User(email, username, password);

    try{
        const response = await fetch("http://localhost:8080/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
    
        if(response.ok){
            alert("User successfully created!");

            document.querySelector("#signupForm").reset();

            window.location.href = "./login.html";
        }
        else{
            const errorMessage = await response.text();
            alert(`${errorMessage}`);
        }
    } catch(error){
        console.log(`Network error: ${error}`);
    }
});