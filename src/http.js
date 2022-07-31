import axios from "axios";
export default axios.create({
    baseURL: "https://gramworkx.pranavkamble.in/api",
    headers:{
        "Content-type":"application/json"
    }
})