import "./Services.css";
import { FaLaptopCode, FaPalette, FaCloud } from "react-icons/fa";

function Services() {
  return (
    <section id="services" className="services">

      <h2>
        Our <span>Services</span>
      </h2>

      <p className="services-text">
        We provide innovative digital solutions to help businesses
        grow faster and smarter.
      </p>

      <div className="service-container">

        <div className="service-card">

          <div className="icon">
            <FaLaptopCode />
          </div>

          <h3>Web Development</h3>

          <p>
            Responsive and modern websites using React, HTML, CSS,
            JavaScript and the latest technologies.
          </p>

        </div>

        <div className="service-card">

          <div className="icon">
            <FaPalette />
          </div>

          <h3>UI / UX Design</h3>

          <p>
            Beautiful interfaces with modern layouts that improve
            user experience.
          </p>

        </div>

        <div className="service-card">

          <div className="icon">
            <FaCloud />
          </div>

          <h3>Cloud Solutions</h3>

          <p>
            Secure cloud deployment, hosting and scalable business
            solutions.
          </p>

        </div>

      </div>

    </section>
  );
}

export default Services;