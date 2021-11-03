function getBackUrl() {

    if (window.location.origin == "https://auxent-adrien-orinoco.netlify.app") {
        return "https://groupodb.herokuapp.com";
    } else {
        return "http://localhost:3000/api";
    }
}


const BACK_URL = "http://localhost:3000";
export { BACK_URL };