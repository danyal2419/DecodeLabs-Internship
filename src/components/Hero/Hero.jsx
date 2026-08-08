import hero from "../../assets/images/hero.png";
import "./Hero.css";

function Hero() {

  return (

    <section id="home" className="hero">


      <div className="hero-content">


        <h1>

          Build Your Future With 
          <span> NexaTech</span>

        </h1>


        <p>

          We help businesses grow with modern websites, powerful web
          applications, and innovative digital solutions using the latest
          technologies.

        </p>


        <div className="hero-buttons">


          <button className="primary-btn">

            Get Started

          </button>


          <button className="secondary-btn">

            Learn More

          </button>


        </div>


      </div>



      <div className="hero-image">


        <div className="hero-glow"></div>


        <img src={hero} alt="Hero" />


      </div>



    </section>

  );

}

export default Hero;