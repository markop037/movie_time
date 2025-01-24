class Session{
    constructor(username){
        this.username = username;
    }

    startSession(){
        const d = new Date();
        d.setTime(d.getTime() + (2 * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();

        document.cookie = "username=" + this.username + ";" + expires;
    }

    getSession(){
        const cookies = document.cookie.split(";").reduce((acc, cookie) => {
            let [key, value] = cookie.trim().split("=");
            if(key === "username"){
                acc = value;
            }
            return acc;
        });

        return cookies;
    }

    destroySession(){
        document.cookie = "username=;expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    }
}