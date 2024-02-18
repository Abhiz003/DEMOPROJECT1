import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import CustomNavbar from './CustomNavbar';
import { Container, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';


const BloggerContainer = styled.div`
  display: flex;
  border: 2px solid #ddd;
  border-radius: 20px;
  overflow: hidden;
  margin: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  background-color: rgba(248, 248, 248, 0.9);
  background-image: url('../img-art/Diwar.jpg'); /* Add your background image path here */
  background-size: cover;
   /* Adjust the opacity as needed */

  &:hover {
    background-color:#ffdb58;
    transform: scale(1.05);
  }
`;

const BloggerImage = styled.img`
  width: 200px;
  height: auto;
  border-radius: 20px 0 0 20px;
`;

const BloggerInfo = styled.div`
  
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const BloggerName = styled.h2`
  margin-bottom: 8px;
  color: #333;
  font-size: 1.5em;
`;

const BloggerDescription = styled.p`
  color: #666;
  font-size: 1.2em;
`;

const SocialMediaContainer = styled.div`
  margin-top: 10px;
  display: flex;
  gap: 10px;
`;

const SocialMediaButton = styled(Button)`
  background-color: #55acee; /* Twitter Blue */
  border: none;
  &:hover {
    background-color: #007bb5; /* Darker Twitter Blue */
  }
`;

const Header = styled.h1`
  font-size: 3em;
  color: #333;
  text-align: center;
  margin-top: 30px;
  font-weight: bold;
`;


const Subtitle = styled.p`
  text-align: center;
  color: #666;
  font-size: 1.2em;
`;

const Blogger = () => {

// bloggerName: '',
  // bloggerEmail: '',
  // bloggerPhone: '',
  // bloggerPassword: '',
  // profilePic: '',
  // blogsCreated: ''
  const [bloggers, setBloggers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/get-blogger');
        console.log(response);
        setBloggers(response.data.list);
      } catch (error) {
        console.error('Error fetching bloggers:', error);
      }
    };

    fetchData();
  }, []);



  return (
    <>
      {/* <CustomNavbar /> */}
      <Container>
        <Header>Our Contributors</Header>
        
        <div className="artists-list">
          {bloggers.map(blogger => (
            <BloggerContainer key={blogger.bloggerId}>
              <BloggerImage src={`http://localhost:8080/blogger/fetch/profilePic/${blogger.bloggerId}`} alt={blogger.bloggerName} />
              <BloggerInfo>
                <BloggerName>{blogger.bloggerName}</BloggerName>
                <BloggerDescription>{blogger.bloggerDescription}</BloggerDescription>
                <SocialMediaContainer>
                  <SocialMediaButton href={blogger.socialMedia.youtube} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faYoutube} /> Youtube
                  </SocialMediaButton>
                  <SocialMediaButton href={blogger.socialMedia.instagram} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faInstagram} /> Instagram
                  </SocialMediaButton>
                </SocialMediaContainer>
              </BloggerInfo>
            </BloggerContainer>
          ))}
        </div>
      </Container>
    </>
  );
};

export default Blogger;