import "./ContactForm.css"

const ContactForm = () => {
    return (
      <div>
        <h1 className="mainTitle">Contact</h1>
        <div className="contactInfo">
        <p className="heading">Email me!</p>
        <p> School: <a href="mailto:amatheson53@cmc.edu" className="emailAddress">amatheson53@cmc.edu</a></p>
        <p> Personal: <a href="mailto:amatheson53@cmc.edu" className="emailAddress">mathesonliebera@gmail.com</a></p>
        </div>
      </div>
    );
};
  export default ContactForm;