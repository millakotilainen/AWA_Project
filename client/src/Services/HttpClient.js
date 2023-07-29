import axios from "axios";

// Function that creates and returns an instance of Axios with default options
export default function () {
    // Get the token from the local storage
    const token = localStorage.getItem("token");
    //console.log(token);
    // Set the default options for headers
    const defaultOptions = {
        headers:{
            // Set the 'Authorization' header with the token
            Authorization: token ? `Bearer ${token}` : ''
        }
    };

    return {
        // 'get' method to perform a GET request
        get: (url, options = {}) => axios.get(url, {...defaultOptions, ...options}),
        // 'post' method to perform a POST request
        post: (url, data, options = {}) => axios.post(url, data, {...defaultOptions, ...options}),
    };
}
