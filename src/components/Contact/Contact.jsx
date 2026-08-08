import { useState, useEffect } from "react";
import "./Contact.css";

import {
    FaEnvelope,
    FaPhoneAlt,
    FaMapMarkerAlt
} from "react-icons/fa";

function Contact({
    selectedContact,
    setSelectedContact
}) {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const [loading, setLoading] = useState(false);

  
    // LOAD SELECTED CONTACT
  

    useEffect(() => {

        if (selectedContact) {

            setFormData({
                name: selectedContact.name || "",
                email: selectedContact.email || "",
                message: selectedContact.message || ""
            });

        }

    }, [selectedContact]);


    // HANDLE INPUT


    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    // VALIDATION

    const validateForm = () => {

        const name = formData.name.trim();
        const email = formData.email.trim();
        const message = formData.message.trim();

        if (!name) {
            alert("Please enter your name.");
            return false;
        }

        if (!email) {
            alert("Please enter your email.");
            return false;
        }

        if (!email.includes("@")) {
            alert("Please enter a valid email address.");
            return false;
        }

        if (!message) {
            alert("Please enter your message.");
            return false;
        }

        return true;

    };

    // SUBMIT FORM

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (loading) return;

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {

            let response;

            // UPDATE CONTACT

            if (selectedContact) {

                response = await fetch(
                    `http://localhost:5000/contact/${selectedContact._id}`,
                    {
                        method: "PUT",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify({
                            name: formData.name.trim(),
                            email: formData.email.trim(),
                            message: formData.message.trim()
                        })
                    }
                );

            }

            // NEW CONTACT

            else {

                response = await fetch(
                    "http://localhost:5000/contact",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify({
                            name: formData.name.trim(),
                            email: formData.email.trim(),
                            message: formData.message.trim()
                        })
                    }
                );

            }

            // SERVER RESPONSE

            const data = await response.text();

            if (!response.ok) {

                throw new Error(
                    data || "Something went wrong."
                );

            }

            // SUCCESS
            
            alert(data);

            setFormData({
                name: "",
                email: "",
                message: ""
            });

            setSelectedContact(null);

        }

        catch (error) {

            console.log(
                "Contact Form Error:",
                error
            );

            alert(
                "Unable to connect to the server. Please try again."
            );

        }

        finally {

            setLoading(false);

        }

    };


    return (

        <section
            id="contact"
            className="contact-section"
        >

            {/*LEFT SIDE*/}

            <div className="contact-left">

                <h2>
                    Contact <span>Us</span>
                </h2>

                <p>
                    Have a project in mind?
                    Let's build something amazing together.
                </p>


                <div className="contact-info">

                    <div className="info-box">

                        <FaEnvelope className="info-icon" />

                        <span>
                            info@nexatech.com
                        </span>

                    </div>


                    <div className="info-box">

                        <FaPhoneAlt className="info-icon" />

                        <span>
                            +92 300 1234567
                        </span>

                    </div>


                    <div className="info-box">

                        <FaMapMarkerAlt className="info-icon" />

                        <span>
                            Lahore, Pakistan
                        </span>

                    </div>

                </div>

            </div>


            {/*RIGHT SIDE FORM*/}

            <div className="contact-right">

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={loading}
                        required
                    />


                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={loading}
                        required
                    />


                    <textarea
                        rows="6"
                        name="message"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleChange}
                        disabled={loading}
                        required
                    ></textarea>


                    <button
                        type="submit"
                        disabled={loading}
                    >

                        {loading
                            ? "Sending..."
                            : selectedContact
                                ? "Update Contact"
                                : "Send Message"
                        }

                    </button>

                </form>

            </div>

        </section>

    );

}

export default Contact;