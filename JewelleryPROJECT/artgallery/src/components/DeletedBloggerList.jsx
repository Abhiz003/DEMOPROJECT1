import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal } from 'react-bootstrap';
import { getBlogger, deleteBloggerPermanently, reactivateBlogger } from '../Services/UserService';
import AdminNavbar from './AdminNavbar';

const DeletedBloggerList = () => {
  const [bloggers, setBloggers] = useState([]);
  const [deleteBloggerId, setDeleteBloggerId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showReactivateModal, setShowReactivateModal] = useState(false);

  async function fetchBloggersList() {
    try {
      const data = await getBlogger();
      setBloggers(data.list);
    } catch (error) {
      console.log(error);
    }
  }

  const handleShowDeleteModal = (bloggerId) => {
    setDeleteBloggerId(bloggerId);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteBloggerId(null);
    setShowDeleteModal(false);
  };

  const handleShowReactivateModal = (bloggerId) => {
    setDeleteBloggerId(bloggerId);
    setShowReactivateModal(true);
  };

  const handleCloseReactivateModal = () => {
    setDeleteBloggerId(null);
    setShowReactivateModal(false);
  };

  const handlePermanentlyDelete = async () => {
    try {
      const response = await deleteBloggerPermanently(deleteBloggerId);

      if (response !== null) {
        fetchBloggersList();
        alert('Blogger permanently deleted successfully');
      } else {
        console.error('Failed to permanently delete blogger');
      }
    } catch (error) {
      console.error('Error permanently deleting blogger:', error);
    }

    handleCloseDeleteModal();
  };

  const handleReactivateAccount = async () => {
    try {
      const response = await reactivateBlogger(deleteBloggerId);

      if (response !== null) {
        fetchBloggersList();
        alert('Blogger account reactivated successfully');
      } else {
        console.error('Failed to reactivate blogger account');
      }
    } catch (error) {
      console.error('Error reactivating blogger account:', error);
    }

    handleCloseReactivateModal();
  };

  useEffect(() => {
    fetchBloggersList();
  }, []);

  return (
    <>
      <AdminNavbar />
      <h1>Deleted Blogger List</h1>
      <Container>
        {bloggers.length !== 0 ? (
          <Table className="mt-5">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Status</th>
                <th>Action</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bloggers.map((blogger) => (
                blogger.bloggerStatus === 'DELETED' && (
                  <tr key={blogger.bloggerId}>
                    <td>{blogger.bloggerName}</td>
                    <td>{blogger.bloggerPhone}</td>
                    <td>{blogger.bloggerEmail}</td>
                    <td>{blogger.bloggerStatus}</td>
                    <td>
                      <Button variant="danger" onClick={() => handleShowDeleteModal(blogger.bloggerId)}>
                        Permanently Delete
                      </Button>
                    </td>
                    <td>
                      <Button variant="secondary" onClick={() => handleShowReactivateModal(blogger.bloggerId)}>
                        Reactivate Account
                      </Button>
                    </td>
                  </tr>
                )
              ))}
            </tbody>
          </Table>
        ) : (
          <h4>Currently, You Don't Have Any bloggers...</h4>
        )}
      </Container>

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to permanently delete this blogger? This action cannot be undone.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handlePermanentlyDelete}>
            Permanently Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showReactivateModal} onHide={handleCloseReactivateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to reactivate this blogger account?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseReactivateModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleReactivateAccount}>
            Reactivate Account
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeletedBloggerList;




























// import { useState, useEffect } from 'react';
// import { Container, Table, Button, Modal } from 'react-bootstrap';
// import { getBlogger, deleteBloggerPermanently, reactivateBlogger } from '../Services/UserService';
// import AdminNavbar from './AdminNavbar';

// const DeletedBloggerList = () => {
//   const [bloggers, setBloggers] = useState([]);
//   const [deleteBloggerId, setDeleteBloggerId] = useState(null);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [showReactivateModal, setShowReactivateModal] = useState(false);

//   async function fetchArtistsList() {
//     try {
//       const data = await getBlogger();
//       setBloggers(data.list);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   const handleShowDeleteModal = (bloggerId) => {
//     setDeleteBloggerId(bloggerId);
//     setShowDeleteModal(true);
//   };

//   const handleCloseDeleteModal = () => {
//     setDeleteBloggerId(null);
//     setShowDeleteModal(false);
//   };

//   const handleShowReactivateModal = (bloggerId) => {
//     setDeleteBloggerId(bloggerId);
//     setShowReactivateModal(true);
//   };

//   const handleCloseReactivateModal = () => {
//     setDeleteBloggerId(null);
//     setShowReactivateModal(false);
//   };

//   const handlePermanentlyDelete = async () => {

//     try {
//       const response = await deleteBloggerPermanently(deleteBloggerId);

//       if (response !== null) {

//         fetchArtistsList();
//         alert('Blogger permanently deleted successfully');
//       } else {
//         console.error('Failed to permanently delete blogger');
//       }
//     } catch (error) {
//       console.error('Error permanently deleting blogger:', error);
//     }

//     handleCloseDeleteModal();
//   };

//   const handleReactivateAccount = async () => {

//     try {
//       const response = await reactivateBlogger(deleteBloggerId);
//       console.log(response);
//       if (response !== null) {

//         fetchArtistsList();
//         alert('Artist account reactivated successfully');
//       } else {
//         console.error('Failed to reactivate artist account');
//       }
//     } catch (error) {
//       console.error('Error reactivating artist account:', error);
//     }

//     handleCloseReactivateModal();
//   };

//   useEffect(() => {
//     fetchArtistsList();
//   }, []);

//   return (
//     <>
//       <AdminNavbar />
//       <h1>Deleted Artist List</h1>
//       <Container>
//         {bloggers.length !== 0 ? (
//           <Table className="mt-5">
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Phone</th>
//                 <th>Email</th>
//                 <th>Status</th>
//                 <th>Action</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {artists.map((s) => (
//                 s.artistStatus === 'DELETED' && (
//                   <tr key={s.artistId}>
//                     <td>{s.artistName}</td>
//                     <td>{s.artistPhone}</td>
//                     <td>{s.artistEmail}</td>
//                     <td>{s.artistStatus}</td>
//                     <td>

//                       <Button variant="danger" onClick={() => handleShowDeleteModal(s.bloggerId)}>
//                         Permanently Delete
//                       </Button>
//                     </td>
//                     <td>

//                       <Button variant="secondary" onClick={() => handleShowReactivateModal(s.bloggerId)}>
//                         Reactivate Account
//                       </Button>
//                     </td>
//                   </tr>
//                 )
//               ))}
//             </tbody>
//           </Table>
//         ) : (
//           <h4>Currently, You Don't Have Any artists...</h4>
//         )}
//       </Container>

//       <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Confirmation</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>Are you sure you want to permanently delete this artist? This action cannot be undone.</p>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseDeleteModal}>
//             Cancel
//           </Button>
//           <Button variant="danger" onClick={handlePermanentlyDelete}>
//             Permanently Delete
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       <Modal show={showReactivateModal} onHide={handleCloseReactivateModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Confirmation</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>Are you sure you want to reactivate this blogger account?</p>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseReactivateModal}>
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={handleReactivateAccount}>
//             Reactivate Account
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// }

// export default DeletedBloggerList;