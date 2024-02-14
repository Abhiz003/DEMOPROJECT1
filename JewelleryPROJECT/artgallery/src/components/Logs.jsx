import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Logs.css'
import axios from 'axios'
import CustomNavbar from './CustomNavbar'

const Logs = () => {
    const location = useLocation();
    const {blogId} = location.state; 
    console.log("TEST:------>"+blogId);

    const [logs, setLogs] = useState([]);

    useEffect(() => {
        getUserLogs();

    }, []);

    const getUserLogs = async () => {
        const result = await axios.get(`http://localhost:8080//log/get-logs/${blogId}`);
        setLogs(result.data);
    }

    const handleTimeLine = () => {
        return logs.map((log, index) => {
            const side = index % 2 === 0 ? "left" : "right"; // Set side dynamically
            const { placeName, startTime, exitTime, description } = log; // Adjust these based on your log data structure
            return (
                <div key={index} className={`content-container ${side}-container`}>
                    <i className="fa-solid fa-gear"></i>
                    <div className="text-box">
                        <img className="d-block w-100" src={`Images/${side === 'left' ? 'Antman' : 'Ironman'}.jpg`} alt={side} />
                        <h2>{log.placeName}</h2>
                        <small>{log.startTime} - {log.exitTime}</small>
                        <p>{log.description}</p>
                        <span className={`${side}-container-arrow`}></span>
                        <Link to="/triplog" className="btn btn-primary">View more</Link>
                    </div>
                </div>
            );
        });
    };


    return (
        <>
            <CustomNavbar/>
            <div className="timeline">

                {handleTimeLine()}

                <i className="fa-solid fa-caret-down text-light"></i>
            </div>

        </>
    )
}

export default Logs;


