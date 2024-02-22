import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { getUsers } from '../Services/UserService';

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    // const [bloggers, setBloggers] = useState([])

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const response = await getUsers();
                setUsers(response.list);
                console.log(response.list);
            } catch (error) {
                console.error('Failed to fetch users/bloggers :', error)
            }
        };

        fetchAllUsers();
    }, [])

    return (
        <>
            <div className="container">
                {users.length === 0 ? (
                    <p>No users registered.</p>
                ) : (
                    <>
                    {users.map((user,index) => (
                        <Card key={user.id} style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="Images/dummyUser.png" />
                        <Card.Body>
                            <Card.Title>{user.userName}</Card.Title>
                            <Card.Text>
                                <p>Email: {user.userEmail}</p>
                                <p>Phone: {user.userPhone}</p>
                                userDescription
                            </Card.Text>
                            <Button variant="primary" onClick={() => (alert("Profile unavailable"))}>View Profile</Button>
                        </Card.Body>
                    </Card>
                        )) }

                    </>
                )}
            </div>
        </>
    )
}

export default AllUsers