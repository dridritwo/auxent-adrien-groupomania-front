function getBackUrl() {

    if (window.location.origin == "https://adrien-auxent-groupomania.herokuapp.com/" || window.location.origin == "https://quirky-booth-4f8e97.netlify.app") {
        return "https://groupodb.herokuapp.com";
    } else {
        return "http://localhost:3000/api";
    }
}


const BACK_URL = getBackUrl();
export { BACK_URL };