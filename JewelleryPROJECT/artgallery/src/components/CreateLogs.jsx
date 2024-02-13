import React,{useState} from 'react'
import axios from 'axios'

const CreateLogs = () => {
    const [log, setLog] = useState({
        placeName: '',
        startTime: '',
        exitTime: '',
        images: '',
        description: '',
        passAmount: 0,
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setLog((prevLog) => ({ ...prevLog, [name]: value }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          // Send data to the backend using axios.post
          const result = await axios.post('http://localhost:8080/blogs/addLog', log);
    
          console.log('Log added successfully:', result.data);
    
          // Clear the form after successful submission if needed
          setLog({
            placeName: '',
            startTime: '',
            exitTime: '',
            images: '',
            description: '',
            passAmount: 0
          });
    
          alert('Log added successfully');
        } catch (error) {
          console.error('Error adding log:', error.message);
        }
      };

  return (
    <>
      <div className="container mt-2">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mini-log-parent">
            <div className="log-child1">
              <label>
                Place Name: <input type="text" placeholder="Enter place name" name="placeName" value={log.placeName} onChange={handleChange} />
              </label>
            </div>
            <div className="log-child2">
              <label>
                Start time: <input type="datetime-local" name="startTime" value={log.startTime} onChange={handleChange} />
              </label>
            </div>
            <div className="log-child3">
              <label>
                Exit time: <input type="datetime-local" name="exitTime" value={log.exitTime} onChange={handleChange} />
              </label>
            </div>
            <div className="log-child4">
              <label>
                Images: <input type="text" name="images" onChange={handleChange} />
              </label>
            </div>
            <div className="log-child5">
              <p>Selected images:</p>
              {/* {log.images.length > 0 && (
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="selectedImagesDropdown"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    View Images
                  </button>
                  <div className="dropdown-menu" aria-labelledby="selectedImagesDropdown">
                    {log.images.map((image, index) => (
                      <div key={index} className="d-flex justify-content-between align-items-center">
                        <span>{image.name}</span>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )} */}
            </div>
            <div className="log-child6">
              <label>
                Description:
                <br />
                <textarea name="description" cols="50" rows="10" value={log.description} onChange={handleChange}></textarea>
              </label>
            </div>
            <div className="log-child7">
              <button type="submit" className="btn btn-success">
                Submit Log
              </button>
            </div>
            <div className="log-child8">
              <label>
                Pass Amount:&nbsp;
                
                  <input
                    type="number"
                    placeholder="Enter amount of pass"
                    className="passMoney"
                    name="passAmount"
                    value={log.passAmount}
                    onChange={handleChange}
                  />
                
              </label>
            </div>
            <div className="log-child9">
              <label>
                Location:&nbsp;
                
                  <input
                    type="number"
                    placeholder="Enter amount of pass"
                    className="passMoney"
                    name="passAmount"
                    value={log.passAmount}
                    onChange={handleChange}
                  />
                
              </label>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default CreateLogs