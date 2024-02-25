import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { getUsers } from '../Services/UserService';
import { toast } from 'react-toastify';
import axios from 'axios';

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/all-users');
        // const result = await getUsers();
        // setUsers(result);
        // console.log(result);

        setUsers(response.data.list);
        console.log(response.data.list);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchAllUsers();
  }, []); // Empty dependency array to ensure useEffect runs only once after the initial render

  return (
    <>
      <div className="container">
        {/* {users.length === 0 ? ( */}
        {Array.isArray(users) && users.length === 0 ? (
          <p>No users registered.</p>
        ) : (
          <>
            {/* {users.map((user, index) => ( */}

            {Array.isArray(users) && users.map((user, index) => (
              <Card key={user.id} style={{ width: '18rem' }}>
                <Card.Img variant="top" src="Images/dummyUser.png" />
                <Card.Body>
                  <Card.Title>{user.userName}</Card.Title>
                  <Card className="text p-2">
                    <p>Email: {user.userEmail}</p>
                    <p>Phone: {user.userPhone}</p>
                    <span>This is the user's description</span>
                  </Card>
                  <Button variant="primary" onClick={() => toast.warning('Profile unavailable')}>
                    View Profile
                  </Button>
                </Card.Body>
              </Card>
            ))}
           
          </>
        )}
      </div>
    </>
  );
};

export default AllUsers;





// import React, { useState, useEffect } from 'react'
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import { getUsers } from '../Services/UserService';
// import { toast } from 'react-toastify';
// import axios from 'axios';

// const AllUsers = () => {
//     const [users, setUsers] = useState([]);



//     useEffect(() => {
//         const fetchAllUsers = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:8080/all-users`);
//                 setUsers(response.data);
//                 console.log(response.data);
//             } catch (error) {
//                 console.error('Failed to fetch users :', error)
//             }
//         };

//         fetchAllUsers();
//     }, [])

//     return (
//         <>
//             <div className="container">
//                 {users.length === 0 ? (
//                     <p>No users registered.</p>
//                 ) : (
//                     <>
//                     {users.map((user,index) => (
//                         <Card key={user.id} style={{ width: '18rem' }}>
//                         <Card.Img variant="top" src="Images/dummyUser.png" />
//                         <Card.Body>
//                             <Card.Title>{user.userName}</Card.Title>
//                             <Card className='text p-2'>
//                                 <p>Email: {user.userEmail}</p>
//                                 <p>Phone: {user.userPhone}</p>
//                                 userDescription
//                             </Card>
//                             <Button variant="primary" onClick={() => (toast.warning("Profile unavailable"))}>View Profile</Button>
//                         </Card.Body>
//                     </Card>
//                         )) }

//                     </>
//                 )}
//             </div>
//         </>
//     )
// }

// export default AllUsers