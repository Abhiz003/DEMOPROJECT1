import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    image:""
  });

  const { storeTokenInLS } = useAuth();

  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    // Assuming you want to handle a single file, you can access it using e.target.files[0]
    const file = e.target.files[0];

    // Do something with the selected file, like setting it to state
    setSelectedImage(file);
  };

  const handleInput = (e) => {
    console.log(e);
    let name = e.target.name;
    let value = e.target.value;
   

    setUser({
      ...user,
      [name]: value,//dynamic value bec koe bhi value ho skte ha charo me se
    });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("username", user.username);
      formData.append("email", user.email);
      formData.append("phone", user.phone);
      formData.append("password", user.password);
      formData.append("image", selectedImage);
      console.log(formData);
  
      const response = await fetch(`http://localhost:5000/api/auth/register`, {
        method: "POST",
        body: formData,
      });
  
      const res_data = await response.json();
  
      if (response.ok) {
        storeTokenInLS(res_data.token);
        setUser({
          username: "",
          email: "",
          phone: "",
          password: "",
          image: ""
        });
        toast.success("Registration Successful");
        navigate("/");
      } else {
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.msg);
      }
    } catch (error) {
      console.log("error from register", error);
    }
  };
  


  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image ">
                <img className="reg-img"
                  src="/images/141.jpg"
                  alt="a nurse with a cute look"
                  width="500"
                  height="400"
                />
              </div>
              {/* our main registration code  */}
              <div className="registration-form">
                <h1 className="main-heading mb-3">Registration form</h1>
                <br />
                <form onSubmit={handleSubmit} >
                  <div>
                    <label htmlFor="username">username</label>
                    <input
                      type="text"
                      name="username"
                      value={user.username}
                      onChange={handleInput}
                      placeholder="username"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="email"
                      name="email"
                      value={user.email}
                      onChange={handleInput}
                      placeholder="email"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone">phone</label>
                    <input
                      type="number"
                      name="phone"
                      value={user.phone}
                      onChange={handleInput}
                      placeholder="phone"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleInput}
                      placeholder="password"
                      required
                    />
                  </div>
                  <div>
                    <div>
                      <label htmlFor="image">Upload Image</label>
                      <input
                        type="file"
                        id="image"
                        name="image"
                        onInput={handleImageChange}
                        accept="image/*" // Only allow image files
                        required
                      />

                      {/* Display a preview of the selected image if available */}
                      {selectedImage && (
                        <div>
                          <p>Selected Image Preview:</p>
                          <img height={200} width={200} src={URL.createObjectURL(selectedImage)} alt="Preview" />
                        </div>
                      )}
                    </div>
                  </div>
                  <br />
                  <button type="submit" className="All-btn btn-submit">
                    Register <span> Now </span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};