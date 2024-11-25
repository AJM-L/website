import "./Contact.css";
import { useState } from "react";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        fetch("https://formspree.io/f/xyzydogk", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
        .then(response => {
            if (response.ok) {
                alert("Thank you for reaching out!");
                setFormData({ name: "", email: "", message: "" });
            } else {
                alert("Oops! There was a problem submitting your form");
            }
        })
        .catch(error => {
            alert("Oops! There was a problem submitting your form");
        });
    };

    return (
        <section id="contact" className="contactSection">
            <h2 className="contactTitle">Get in Touch</h2>
            <form className="contactForm" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Your Name" 
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Your Email" 
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <textarea 
                    name="message" 
                    placeholder="Your Message" 
                    value={formData.message}
                    onChange={handleChange}
                    required
                ></textarea>
                <button type="submit" className="submitButton">Send Message</button>
            </form>
        </section>
    );
} 