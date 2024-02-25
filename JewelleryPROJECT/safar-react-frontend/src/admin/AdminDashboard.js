import React from "react";
import "./AdminDashboard.css";
import { Button, Card, Container } from "react-bootstrap";

const AdminDashboard = () => {
  return (
    <div className="temp">
      <Container className="mt-5">
      <h1 className="text-center">Welcome Admin...</h1>

        <Card className="card">
          <Card.Header className="card-header">
            <h3>Blogger Profile</h3>
          </Card.Header>
         
            <Card.Body className="card-body">
              <div className="text-center mb-4">
                <img
                  className="newImage"
                  src={`Images/Profiles/spidey.jpg`}

                  alt="Profile Pic"
                />
              </div>
              <div style={{ marginTop: '30px', borderTop: '1px solid #ddd', paddingTop: '20px' }}>
                <div style={{ marginTop: '20px' }}>
                  <div style={{ marginBottom: '20px' }}>
                    <h4 style={{ color: '#555' }}>Name</h4>
                    <p>Admin0001</p>
                  </div>
                  <div>
                    <h4 style={{ color: '#555' }}>Email</h4>
                    <p>admin@gmail.com</p>
                  </div>
                </div>
              </div>
              

              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <Button
                  variant="secondary"  
                >
                  Edit Account Details
                </Button>{'  '}
                
              </div>
            </Card.Body>
          
        </Card>

      </Container>
    </div>
  );
};

export default AdminDashboard;
