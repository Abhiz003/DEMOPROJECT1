import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './Logs.css'
import axios from 'axios'
import CustomNavbar from './CustomNavbar'
import { Button } from 'react-bootstrap'

const Logs = () => {
    const location = useLocation();
    const { blogId } = location.state;
    console.log("TEST:------>" + blogId);

    const [logs, setLogs] = useState([]);

    const navigate = useNavigate();
    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/log/get-logs/${blogId}`);
                if (response.status === 200) {
                    setLogs(response.data);
                } else {
                    console.error('Failed to fetch logs:', response.statusMessage);
                }
            } catch (error) {
                console.error('Error fetching Logs: ', error);
            }
        }

        fetchLogs();
    }, []);

    const handleContextMenu = (event) => {
        event.preventDefault();
    };


    const WORDS_LIMIT = 30;

    const truncateDescription = (logDescription) => {
        const words = logDescription.split(' ');
        if (words.length > WORDS_LIMIT) {
            return words.slice(0, WORDS_LIMIT);
        }
        return logDescription;
    };

    const handleTimeLine = () => {
        return logs.map((log, index) => {
            const side = index % 2 === 0 ? "left" : "right";
            const { placeName, startTime, exitTime, logDescription } = log;
            return (
                <div key={index} className={`content-container ${side}-container`}>
                    <i className="fa-solid fa-gear"></i>
                    <div className="text-box">

                        <img
                            className="d-block w-100"
                            alt={`Log ${log.logId}`}
                            src={`Images/${log.imageUrl}`}
                            onContextMenu={handleContextMenu}
                        />
                        <h2>{log.placeName}</h2>
                        <small>{log.startTime} - {log.exitTime}</small>
                        <p className="log-description" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {truncateDescription(log.logDescription)}{' '}
                            {log.logDescription.length > WORDS_LIMIT && (
                                <span className="read-more-link">...</span>
                            )}
                        </p>
                        <span className={`${side}-container-arrow`}></span>
                        <Button onClick={() => navigate("/trip-details")} className="btn btn-primary">View more</Button>
                    </div>
                </div>
            );
        });
    };


    return (
        <>
            <CustomNavbar />
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


