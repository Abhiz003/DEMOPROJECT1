import axios from "axios";


//Artist Api
export async function register(creditials){
    const response = await axios.post(`http://localhost:8080/register-artist`,creditials);
    return response.data;
}

export async function bloggerlogin(creditials){

    try {
        const response = await axios.post(`http://localhost:8080/login-artist`, creditials);
        console.log("Response Data:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}


export async function getBloggerDetails(id){
    try {
       const response = await axios.get(`http://localhost:8080/artist/fetch/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getBlogger(){
    try {
       const response = await axios.get("http://localhost:8080/all-artists");
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function deleteBlogger(id){
    try {
        const response = await axios.delete(`http://localhost:8080/delete-artist/${id}`)
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function deleteBloggerPermanently(id){
    try {
        const response = await axios.delete(`http://localhost:8080/permanently-delete/${id}`)
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function reactivateBlogger(id){
    try {
        const response = await axios.post(`http://localhost:8080/reactive-artist/${id}`)
        return response.data;
    } catch (error) {
        console.log(error);
    }
}




//User Api
export async function login(creditials){
    const response =await axios.post(`http://localhost:8080/login-user`,creditials);
    return response.data;
}


export async function getUserDetails(id){
    try {
       const response = await axios.get(`http://localhost:8080/user/fetch/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function signup(creditials){
    const response = await axios.post(`http://localhost:8080/register-user`,creditials);
    return response.data;
}

export async function updateUser(creditials){
    const response = await axios.patch(`http://localhost:8080/user-update`,creditials);
    return response.data;
}

export async function updateBlogger(creditials){
    const response = await axios.post(`http://localhost:8080/artist-update`,creditials);
    return response.data;
}

export async function getUsers(){
    try {
       const response = await axios.get("http://localhost:8080/all-users");
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function deleteUser(userId) {
    try {
        const response = await axios.delete(`http://localhost:8080/delete-user/${userId}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function deleteUserPermanently(userId) {
    try {
        const response = await axios.delete(`http://localhost:8080/permanently-delete-user/${userId}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function reactivateUser(userId) {
    try {
        const response = await axios.post(`http://localhost:8080/reactive-user/${userId}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
