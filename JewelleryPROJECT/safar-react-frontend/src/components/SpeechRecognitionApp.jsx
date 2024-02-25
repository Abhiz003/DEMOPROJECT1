import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'



const SpeechRecognitionApp = () => {
 
        const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }


  const showModal = true;

  const handleCloseModal = () => {
      // navigate to whichever page it was called
  }
  return (
    <>
      {/* <Modal show={showDeleteConfirmation} onHide={cancelDelete}> */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            Text to  Speech
            <h6>Speak and copy the text</h6>
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          <p>Microphone: {listening ? 'on' : 'off'}</p>
          <p className='text p-4 border'>{transcript}</p>
            
          </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={SpeechRecognition.startListening}>Start</Button>
          <Button variant="danger" onClick={SpeechRecognition.stopListening}>Stop</Button>
          <Button variant="warning" onClick={resetTranscript}>RESET</Button>
        </Modal.Footer>
      </Modal>
    </>


    // <section className="">
    //   <p>Microphone: {listening ? 'on' : 'off'}</p>
    //   <button onClick={SpeechRecognition.startListening}>Start</button>
    //   <button onClick={SpeechRecognition.stopListening}>Stop</button>
    //   <button onClick={resetTranscript}>Reset</button>
    //   <p>{transcript}</p>
    // </section>
  );
    
}

export default SpeechRecognitionApp