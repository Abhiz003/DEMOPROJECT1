import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import '../Styles/Logs.css'
import axios from 'axios'
import { Button } from 'react-bootstrap'
import { isBlogger, getUserId, isAuthenticated } from '../utils/TokenUtil'
import { toast } from 'react-toastify'

const Logs = () => {
    const location = useLocation();
    const { blogId, bloggerId } = location.state;
    console.log("TEST:------> " + blogId);


    const [logs, setLogs] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/log/get-logs/${blogId}`);
                if (response.status === 200) {
                    setLogs(response.data);
                    console.log("isBlogger ----->  ", isBlogger());
                    console.log("BloggerID----> ", bloggerId);
                } else {
                    console.error('Failed to fetch logs:', response.statusMessage);
                }
            } catch (error) {
                console.error('Error fetching Logs: ', error);
            }
        }
        fetchLogs();
    }, []);

    const handleUpdate = (logId) => {
        console.log(logId);
        navigate(`/update-log`, { state: { logId, blogId } });
    }

    const handleDelete = (logId) => {
        const confirmDelete = window.confirm(`Are you sure  you want to delete the log- ${logId} !!!`);
        if (confirmDelete) {
            console.log(logId);
            try {

                axios.delete(`http://localhost:8080/log/delete/${logId}`)
                toast.success("log deleted successfully");
                // window.location.reload();
            } catch (error) {
                console.log('Failed to delete blog', error);
                toast.error("Unable to delete the blog, try reloading !!!");
            }
        }

    }


    const handleContextMenu = (event) => {
        event.preventDefault();
    };

    const handleTimeLine = () => {
        return logs.map((log, index) => {
            const side = index % 2 === 0 ? "left" : "right";

            return (
                <div key={index} className={`content-container ${side}-container`}>
                    <i className="fa-solid fa-gear"></i>
                    <div className="text-box">
                        <div className='img-box'>
                            <img
                                className="d-block w-90 log-image"
                                alt={`Log ${log.logId}`}
                                src={`Images/${log.imageUrl}`}
                                onContextMenu={handleContextMenu}
                            />
                        </div>
                        <h2 className="log-title">{log.placeName} </h2>
                        <small>{log.startTime} - {log.exitTime} <a href={log.location} target="_blank"><i className="fa-solid fa-location-dot fa-fade" style={{ color: "#ff6666" }}></i></a></small>
                        <p className="log-description">
                            {log.logDescription}
                        </p>
                        <span className={`${side}-container-arrow`}></span>
                        {isAuthenticated() && <>
                            <Button onClick={() => {
                                navigate("/trip-details", {
                                    state: { placeName: log.placeName, passAmount: log.passAmount, description: log.logDescription }
                                });
                                toast.success("You can take screenshots to access this info at low network areas !!!");
                            }}
                                className="btn btn-primary">
                                View more
                            </Button> &nbsp;
                        </>
                        }



                        {isBlogger() && getUserId() === bloggerId
                            ?
                            <>
                                <Button onClick={() => handleUpdate(log.logId)}>UPDATE </Button> &nbsp;
                                <Button onClick={() => handleDelete(log.logId)}>DELETE</Button>
                            </>
                            :
                            <>
                            </>
                        }

                    </div>
                </div>
            );
        });
    };


    return (
        <>
            <div className="container logs-container" >
                <div className="timeline " style={{ paddingBottom: '50px' }}>

                    {handleTimeLine()}

                    <i className="fa-solid fa-caret-down text-light"></i>
                </div>

            </div>

        </>
    )
}

export default Logs;


