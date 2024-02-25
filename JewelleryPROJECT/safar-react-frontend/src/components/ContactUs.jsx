import React from 'react';
import Slider from 'react-slick';
import '../Styles/ContactUs.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { toast } from 'react-toastify';

const  ContactUs = () => {
    const initialData = {
        name: '',
        email: '',
        message: '',
    };



    const [formStatus, setFormStatus] = React.useState('Send');
    const [formValues, setFormValues] = React.useState(initialData);

    const resetForm = () => {
        setFormValues(initialData);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setFormStatus('Submitting...');

        try {
            const formData = new FormData(e.target);
            const jsonData = {};
            formData.forEach((value, key) => {
                jsonData[key] = value;
            });

             toast.warning("Do you want to sent the message?");
            console.log("message sent")
            // const response = await messagesend(jsonData);

            // if (response.status === true) {
            //     setFormStatus('Sent');
            //     resetForm();

            //     setTimeout(() => {
            //         setFormStatus('Send');
            //     }, 2000);
            // } else {
            //     throw new Error('Failed to submit message');
            // }
            throw new Error('Failed to submit message');
        } catch (error) {
            console.error('Error submitting message:', error);
            setFormStatus('Send');
        }
    };

    const contactInfoData = [
        {
            title: 'Get in Touch',
            content: (
                <>
                    <h3>Get in Touch</h3>
                    <p>Feel free to reach out to us anytime!</p>
                    <p>We are here to assist you with any inquiries or concerns you may have.</p>
                    <p>Your satisfaction is our priority.</p>
                </>
            ),
        },
        {
            title: 'Our Location',
            content: (
                <>
                    <h3>Our Location</h3>
                    <p>SAFAR </p>
                    <p>456 Wanderlust, Artville, Pune, Maharashtra, 411001, India</p>
                    
                </>
            ),
        },
        {
            title: 'Customer Support',
            content: (
                <>
                    <h3>Customer Support</h3>
                    <p>Our dedicated customer support team is available 24/7 to assist you.</p>
                    <p>Contact us through email, phone for prompt and friendly service.</p>
                    <p>Your satisfaction is our success!</p>
                </>
            ),
        },
    ];
    

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 1500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
    };

    return (
        <>
            <div className="row justify-content-center mt-5 mb-5">
                <div className="col-md-8 contact-form">
                    <div className="text-center mb-4"></div>
                    <h2 className="mb-4 text-center">Get in Touch</h2>
                    <form onSubmit={onSubmit}>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="name">
                                Name
                            </label>
                            <input
                                className="form-control"
                                type="text"
                                id="name"
                                name="name"
                                value={formValues.name}
                                onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="form-control"
                                type="email"
                                id="email"
                                name="email"
                                value={formValues.email}
                                onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="message">
                                Message
                            </label>
                            <textarea
                                className="form-control"
                                id="message"
                                name="message"
                                rows="4"
                                value={formValues.message}
                                onChange={(e) => setFormValues({ ...formValues, message: e.target.value })}
                                required
                            />
                        </div>
                        <div className="text-center">
                            <button className="btn btn-success" type="submit" disabled={formStatus === 'Sent'}>
                                {formStatus}
                            </button>
                        </div>
                        <br />
                    </form>
                    {formStatus === 'Sent' && (
                        <div className="alert alert-success mt-3" role="alert" style={{ fontSize: '18px' }}>
                            Thank you for reaching out! We will get back to you soon.
                        </div>
                    )}
                </div>
            </div>

            <Slider {...sliderSettings}>
                {contactInfoData.map((item, index) => (
                    <div key={index} className="mt-5 additional-info">
                        {item.content}
                    </div>
                ))}
            </Slider>
        </>
    );
}

export default ContactUs;