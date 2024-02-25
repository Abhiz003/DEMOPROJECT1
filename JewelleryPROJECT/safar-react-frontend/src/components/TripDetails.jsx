import React, { useState, useEffect, useRef } from 'react'
import CustomNavbar from './CustomNavbar'
import '../Styles/TripDetails.css'
import { Button, Container, Table } from 'react-bootstrap'
import { useLocation } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { toast } from 'react-toastify';


const TripDetails = () => {
  const location = useLocation();
  const { placeName, passAmount, description } = location.state;


  const componentPDF = useRef();
 const handleDownload = useReactToPrint({
  content: () => componentPDF.current,
  documentTitle:"TripLogs",
  onAfterPrint: () => toast.success("Pdf downloaded !!!")
 });


  return (
    <>
      <Container>

        <div ref={componentPDF}>
        <Table striped bordered hover >
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
        </div>
        <Button onClick={handleDownload} className='mb-3'>Download PDF</Button>

      </Container>
    </>
  )
}

export default TripDetails