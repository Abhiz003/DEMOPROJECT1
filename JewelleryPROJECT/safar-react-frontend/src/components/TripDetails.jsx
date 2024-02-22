import React, { useState, useEffect } from 'react'
import '../Styles/TripDetails.css'
import { Container, Table } from 'react-bootstrap'
import { useLocation } from 'react-router-dom';

const TripDetails = () => {
  const location = useLocation();
  const { placeName, passAmount, description } = location.state;

  useEffect(() => {
  
      alert("You can take screenshots to access this info at low network areas !!!");
  }, []);
  


  return (
    <>
      <Container>

      <Table striped  bordered hover >
        <tbody>
          <tr>
            <td> <h2>{placeName} </h2> </td>
            <td> passAmount: <h4>{passAmount}</h4></td>
          </tr>
          <tr>
            <td colSpan={2}>
              <p>{description}</p>
            </td>
          </tr>
        </tbody>
      </Table>

      </Container>
    </>
  )
}

export default TripDetails