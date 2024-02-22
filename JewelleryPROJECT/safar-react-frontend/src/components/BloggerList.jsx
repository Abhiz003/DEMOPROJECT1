import { Modal, Button, Container, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { deleteBlogger, deleteUser, getAllBlogger } from "../Services/UserService";

const BloggerList = () => {

    const [user, setUser] = useState([]);
    const [showDialog, setShowDialog] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState("");

    

    const openModalDialog = (bloggerId) => {
        setSelectedUserId(bloggerId);
        setShowDialog(true);
    }


    const closeModalDialog = () => {
        setShowDialog(false);
    }

    async function fetchUsersList() {
        try {
            const data = await getAllBlogger();
            setUser(data.list);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchUsersList();
    }, []);

    const handleDeleteClick = async () => {
        try {
            await deleteBlogger(selectedUserId);
            fetchUsersList();
            closeModalDialog();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
         
            <h1>Bloggers List</h1>
            <Container>
                {user.length !== 0 ? (
                    <Table className="mt-5">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user.map((s) => (
                                (s.artistStatus !== "DELETED") && (
                                    <tr key={s.bloggerId}>
                                        <td>{s.bloggerName}</td>
                                        <td>{s.bloggerPhone}</td>
                                        <td>{s.bloggerEmail}</td>
                                        <td>{s.bloggerStatus}</td>
                                        <td>
                                            <Button variant="danger" onClick={() => openModalDialog(s.bloggerId)}>
                                                Delete
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

                <Modal show={showDialog} onHide={closeModalDialog}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete {setSelectedUserId}?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={() => handleDeleteClick()}>
                            Yes
                        </Button>
                        <Button variant="danger" onClick={closeModalDialog}>
                            No
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>
    );
}
export default BloggerList;