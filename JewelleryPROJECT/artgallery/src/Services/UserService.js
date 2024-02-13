import axios from "axios";


//----------------------------------Blogger Api-------------------------

//================= CREATE  ONE BLOGGER===============================
export async function register(creditials) {
    try {
        const response = await axios.post(`http://localhost:8080/register-blogger`, creditials);
        return response.data;
    } catch (error) {
        console.error('Error during registration:', error);
        throw error; 
    }
}



//==================BLOGGER  LOGIN ===============================
export async function bloggerLogin(creditials){

    try {
        const response = await axios.post(`http://localhost:8080/login-blogger`, creditials);
        console.log("Response Data:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}


//===================READ ONE BLOGGER==================
export async function getBloggerDetails(id){
    try {
       const response = await axios.get(`http://localhost:8080/blogger/fetch/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

//===================READ ALL BLOGGERS ===================== 
export async function getBlogger(){
    try {
       const response = await axios.get("http://localhost:8080/all-bloggers");
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

//====================UPDATE ONE BLOGGER===============
export async function updateBlogger(creditials){
    const response = await axios.post(`http://localhost:8080/update-blogger`,creditials);
    return response.data;
}

//===================DELETE ONE ==============
export async function deleteBlogger(id){
    try {
        const response = await axios.delete(`http://localhost:8080/delete-blogger/${id}`)
        return response.data;
    } catch (error) {
        console.log(error);
    }
}



//--------------------------------User Api----------------------------------------


//====================USER LOGIN =========================
export async function login(creditials){
    const response =await axios.post(`http://localhost:8080/login-user`,creditials);
    return response.data;
}

//=================READ ONE==========================
export async function getUserDetails(id){
    try {
       const response = await axios.get(`http://localhost:8080/user/fetch/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}


//===================USER SIGNUP========================
export async function signup(creditials){
    const response = await axios.post(`http://localhost:8080/register-user`,creditials);
    return response.data;
}

//====================UPDATE ONE USER===============
export async function updateUser(creditials){
    const response = await axios.patch(`http://localhost:8080/user-update`,creditials);
    return response.data;
}


//=================== READ USER======================
export async function getUsers(){
    try {
       const response = await axios.get("http://localhost:8080/all-users");
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

//=====================DELETE ONE USER=========================

export async function deleteUser(userId) {
    try {
        const response = await axios.delete(`http://localhost:8080/delete-user/${userId}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
