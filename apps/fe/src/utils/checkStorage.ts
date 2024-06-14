export const checkStorage = (): boolean => {
    let currentLoginData = localStorage.getItem("loginData");

    if (currentLoginData) {
        // setIsAdmin(true);
        console.log("everything is ok");
        return true;
    } else {
        // navigate("/");
        return false;
    }
};
