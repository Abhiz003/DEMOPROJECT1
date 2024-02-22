import React from 'react'
import { Button, Card, Container } from 'react-bootstrap'

const AdminProfile = () => {



	return (
		<>
			<Container className="mt-5">
				<h2 className="mb-4 head">Welcome Admin...</h2>
				<Card className="card">
					<Card.Header className="card-header">
						<h3>Blogger Profile</h3>
					</Card.Header>
					<Card.Body className="card-body">
						<div className="text-center mb-4">
							<img
								className="newImage"
								src={`#`}
								alt="Profile Pic"

							/>
						</div>
						<div style={{ marginTop: '30px', borderTop: '1px solid #ddd', paddingTop: '20px' }}>
							<div style={{ marginTop: '20px' }}>
								<div style={{ marginBottom: '20px' }}>
									<p>Admin</p>
								</div>
								<div>
									<h4 style={{ color: '#555' }}>Email: <h5>admin@gmail.com</h5></h4>
									
								</div>
							</div>
						</div>
						<div style={{ textAlign: 'center', marginTop: '20px' }}>
							<div className="social-buttons">

								<a href="https://www.linkedin.com/in/abhijitb3/" target="_blank" className="social-buttons__button social-button social-button--linkedin" aria-label="LinkedIn">
									<span className="social-button__inner">
										<i className="fab fa-linkedin-in"></i>
									</span>
								</a>
								<a href="https://www.instagram.com/_magnum.__?igsh=MTg1cHZ3ejVzODdtMA==/" target="_blank" className="social-buttons__button social-button social-button--instagram" aria-label="InstaGram">
									<span className="social-button__inner">
										<i className="fab fa-instagram"></i>
									</span>
								</a>
								<a href="https://github.com/Abhiz003" target="_blank" className="social-buttons__button social-button social-button--github" aria-label="GitHub">
									<span className="social-button__inner">
										<i className="fab fa-github"></i>
									</span>
								</a>
								<a href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=new" target="_blank" className="social-buttons__button social-button social-button--gmail" title="abhijitbhangale3@gmail.com" aria-label="GitHub">
									<span className="social-button__inner">
										<i className="fa-solid fa-envelope fa-fade" ></i>
									</span>
								</a>
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

		</>
	)
}

export default AdminProfile