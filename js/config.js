const local_api = "http://127.0.0.1:8000";
const remote_api = "https://api.advancedtechspace.com";

const api_url = window.location.protocol === "https:" ? remote_api : local_api;

const title = "PASTAS";

document.querySelector(".logo h2").innerHTML = title;

document.querySelector("title").innerHTML = title;
