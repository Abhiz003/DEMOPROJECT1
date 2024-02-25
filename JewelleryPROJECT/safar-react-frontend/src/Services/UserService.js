import axios from "axios";
import { toast } from 'react-toastify'



const baseURL = `http://localhost:8080`
// const baseURL = process.env.REACT_APP_BASEPATH;

//----------------------------------Blogger Api-------------------------

//================= CREATE  ONE BLOGGER===============================
export async function register(creditials) {
    try {
        const response = await axios.post('http://localhost:8080/register-blogger', creditials, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
}







//==================BLOGGER  LOGIN ===============================
export async function bloggerLogin(creditials) {
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
export async function getBloggerDetails(id) {
    try {
        const response = await axios.get(`http://localhost:8080/blogger/fetch/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching bloggerDetails", error);
        throw error;
    }
}

//===================READ ALL BLOGGERS ===================== 
export async function getAllBlogger() {
    try {
        const response = await axios.get(`http://localhost:8080/get-bloggers`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

//====================UPDATE ONE BLOGGER===============
export async function updateBlogger(credentials) {
    const response = await axios.post(`http://localhost:8080/update-blogger`, credentials);
    return response.data;
}

//===================DELETE ONE Blogger ==============
export async function deleteBlogger(id) {
    try {
        const response = await axios.delete(`http://localhost:8080/delete-blogger/${id}`)
        return response.data;
    } catch (error) {
        console.log(error);
    }
}



//--------------------------------User Api----------------------------------------


//====================USER LOGIN =========================
export async function login(credentials) {
    const response = await axios.post(`http://localhost:8080/login-user`, credentials);
    return response.data;
}

//=================READ ONE==========================
export async function getUserDetails(id) {
    try {
        const response = await axios.get(`http://localhost:8080/user/fetch/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}


//===================USER SIGNUP========================
export async function userSignUp(credentials) {
    const response = await axios.post(`http://localhost:8080/register-user`, credentials);
    return response.data;
}

//====================UPDATE ONE USER===============
export async function updateUser(credentials) {
    const response = await axios.patch(`http://localhost:8080/user-update`, credentials);
    return response.data;
}


//=================== READ USER======================
export async function getUsers() {
    try {
        const response = await axios.get(`http://localhost:8080/all-users`);
        return response.list;
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
