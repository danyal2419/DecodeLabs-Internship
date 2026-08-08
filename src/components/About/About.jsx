import about from "../../assets/images/about.png";
import "./About.css";

function About() {
  return (
    <section id="about" className="about">

      <div className="about-image">
        <img src={about} alt="About" />
      </div>


      <div className="about-content">

        <h2>
          About <span>NexaTech</span>
        </h2>


        <p>
          NexaTech is a modern software company dedicated to building
          high-quality websites, web applications, and digital products.
          We help businesses grow with innovative technologies,
          clean design, and powerful software solutions.
        </p>


        <div className="about-boxes">


          <div className="box">
            <h3>50+</h3>
            <p>Projects Completed</p>
          </div>


          <div className="box">
            <h3>25+</h3>
            <p>Happy Clients</p>
          </div>


          <div className="box">
            <h3>5+</h3>
            <p>Years Experience</p>
          </div>


        </div>


        <button className="about-btn">
          Read More
        </button>


      </div>

    </section>
  );
}

export default About;