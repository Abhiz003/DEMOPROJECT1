import axios from "axios";
import { toast } from "react-toastify";

export async  function getBlogImage(blogId) {
    try{
        const resImage = await axios.get(`http://localhost:8080/blogger/fetch/pic/${blogId}`)

        return resImage.data;
    } catch(error) {
        console.error('Error fetching the image:', error);
        throw error; 

    }
}


export const getAllBlogs = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/blog/fetchAllBlogs`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
      throw error;
    }
  };
  
  export const deleteBlog = async (blogId) => {
    try {
      const response = await axios.delete(`http://localhost:8080/blog/delete/${blogId}`);
      if(response.status ===200) {
        toast.success("Blog deleted successfully !")
        return response.data;
      } else{
        toast.error("Failed to delete blog")
      }
    } catch (error) {
      console.error('Failed to delete blog:', error);
      throw error;
    }
  };




