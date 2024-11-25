import "./Testimonials.css";

const testimonialData = [
    {
        id: 1,
        feedback: "AJ is a remarkable software engineer with a keen eye for design. Their ability to bridge the gap between technical and creative aspects is unparalleled.",
        author: "Jane Doe, Project Manager at TechCorp"
    },
    {
        id: 2,
        feedback: "Working with AJ was a pleasure. Their dedication to user experience and attention to detail significantly improved our product.",
        author: "John Smith, UX Lead at DesignStudio"
    },
    // Add more testimonials as needed
];

export default function Testimonials() {
    return (
        <section id="testimonials" className="testimonialsSection">
            <h2 className="testimonialsTitle">Testimonials</h2>
            <div className="testimonialsContainer">
                {testimonialData.map((testimonial) => (
                    <div className="testimonial" key={testimonial.id}>
                        <p className="testimonialText">"{testimonial.feedback}"</p>
                        <p className="testimonialAuthor">- {testimonial.author}</p>
                    </div>
                ))}
            </div>
        </section>
    );
} 