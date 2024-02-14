import axios from "axios";

export async  function getBlogImage(blogId) {
    try{
        const resImage = await axios.get(`http://localhost:8080/blogger/fetch/pic/${blogId}`)

        return resImage.data;
    } catch(error) {
        console.error('Error fetching the image:', error);
        throw error; 

    }
}

