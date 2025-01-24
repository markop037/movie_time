document.querySelector("#loginForm").addEventListener("submit", async(e) => {
    e.preventDefault();

    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    const login = new UserLoginRequest(username, password);

    try{
        const response = await fetch("http://localhost:8080/users/check-user", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(login)
        });

        if(response.ok){
            const session = new Session(username);
            session.startSession();
            window.location.href = "index.html"
        }
        else{
            const errorMesage = await response.text();
            alert(`${errorMesage}`);
        }
    } catch (error){
        console.log("Error: ", error);
    }
});