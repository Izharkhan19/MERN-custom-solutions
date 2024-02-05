import React from "react";
import BreadcrumPath from "../../CommonComponents/BreadCrum";
import "./home.css";
import { useNavigate } from "react-router-dom";
import { Button, Carousel } from "react-bootstrap";
import facebook from "../../assets/socialmediaSVG/facebook.svg";
import instagram from "../../assets/socialmediaSVG/instagram.svg";
import linkedin from "../../assets/socialmediaSVG/linkedin.svg";
import twitter from "../../assets/socialmediaSVG/twitter.svg";
import whatsapp from "../../assets/socialmediaSVG/whatsapp.svg";
import logo from "../../assets/logo.jpg";
import Chatlogin from "../../assets/ChatAppPics/Chatlogin.png";
import ChatScreen from "../../assets/ChatAppPics/ChatScreen.png";
import ChatProfile from "../../assets/ChatAppPics/ChatProfile.png";
import ChatHome from "../../assets/ChatAppPics/ChatHome.png";
import arjCourse from "../../assets/ArjunGrpPics/arjCourse.png";
import arjDetails from "../../assets/ArjunGrpPics/arjDetails.png";
import arjEvent from "../../assets/ArjunGrpPics/arjEvent.png";
import arjHome from "../../assets/ArjunGrpPics/arjHome.png";
import arjLogin from "../../assets/ArjunGrpPics/arjLogin.png";

const Home = () => {
  let navigate = useNavigate();
  const pageNav = [
    {
      name: "Home",
      link: "/home",
      active: true,
    },
  ];

  function CalChange(data) {
    console.log(data);
    new Date();
  }

  return (
    <>
      <BreadcrumPath pageNav={pageNav} />
      <section id="one">
        <div class="content">
          <div class="text-content">
            <h1 class="white">
              Learn and implement{" "}
              <strong>
                {" "}
                &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Your
                Knowledge...!
              </strong>
            </h1>
            {/* <h4 class="blackish">We make your future better.</h4> */}
            <div class="two-button">
              {/* <button class="w-btn btn">View Our Services</button> */}
              {/* <button class="t-btn btn">Hire Us</button> */}
            </div>
          </div>
        </div>
      </section>

      <section id="one-half" class="goblack">
        <span>
          <img
            src="https://img.freepik.com/free-photo/about-as-service-contact-information-concept_53876-138509.jpg"
            alt=""
          />
        </span>

        <div class="half-content">
          <div class="half__text">
            <h1>About Us</h1>
            <p>
              We specialize in custom component design and development. Our
              dedicated team crafts tailored solutions, ensuring precision and
              innovation. From hardware to software, we collaborate closely with
              clients to exceed expectations. Trust us to bring your unique
              component ideas to life with expertise and commitment.
            </p>
          </div>
          <div class="half__boxes">
            <div class="box">
              <span href="#">
                <i class="fas fa-paw logo"></i>
              </span>
              <h2>Our Mission</h2>
              <p>
                Our Mission is to Precision and creativity in custom solutions.
                We aim to exceed expectations, empower innovation, and bring
                unique visions to life.
              </p>
            </div>
            <div class="box">
              <span href="#">
                <i class="fas fa-paw logo"></i>
              </span>
              <h2>Our Vision</h2>
              <p>
                Our vision is to be a pioneer in innovative solutions, shaping a
                future where customized excellence drives progress and exceeds
                expectations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="two">
        <div class="heading ">
          <h1>What We Do</h1>
          <p class="lightblack">
            We are dedicated to designing and building personalized, custom
            solutions to meet your specific needs and preferences.
          </p>
        </div>

        <div class="container">
          <div class="info">
            <span>
              <img
                src="https://png.pngtree.com/png-clipart/20210803/ourmid/pngtree-headphones-listening-to-music-melody-png-image_3774398.jpg"
                alt=""
              />
            </span>
            <div class="info__text">
              <h1>Music Play List</h1>

              <p>Where you can create your own liked song's playlist.</p>
              <h5
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/playlist")}
              >
                VISIT PAGE
              </h5>
            </div>
          </div>
          <div class="info">
            <span>
              <img
                src="https://printify.com/wp-content/uploads/2022/11/Custom-Calendars-Printify.jpg"
                alt=""
              />
            </span>
            <div class="info__text">
              <h1>Custom Calender</h1>

              <p>
                Callender that allows you to check dates in Day, Week and Month
                wise.
              </p>
              <h5
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/calendar")}
              >
                VISIT PAGE
              </h5>
            </div>
          </div>
          <div class="info">
            <span>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLqvBYlDPJD95EmMauRHxD0k13wS4GhUB20rLjRVXniA&s"
                alt=""
              />
            </span>
            <div class="info__text">
              <h1>The Map</h1>

              <p>It allows user to view or reach anywhere in the word.</p>

              <h5
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/map")}
              >
                VISIT PAGE
              </h5>
            </div>
          </div>
        </div>
      </section>

      <section id="gallery">
        <div className="container">
          <div className="heading">
            <h1>Our Products</h1>
            <p className="lightblack">
              Discover excellence with our products. From innovative tech to
              user-friendly designs, we're dedicated to enhancing your
              lifestyle. Explore efficiency and reliability that exceeds
              expectations.
            </p>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="gallery__container">
                <Carousel data-bs-theme="dark">
                  <Carousel.Item>
                    <img
                      src={Chatlogin}
                      alt=""
                      width={"100%"}
                      height={"400vh"}
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      src={ChatHome}
                      alt=""
                      width={"100%"}
                      height={"400vh"}
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      src={ChatProfile}
                      alt=""
                      width={"100%"}
                      height={"400vh"}
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      src={ChatScreen}
                      alt=""
                      width={"100%"}
                      height={"400vh"}
                    />
                  </Carousel.Item>
                </Carousel>
              </div>
              <div class="info__text">
                <a
                  style={{ textDecoration: "none", cursor: "pointer" }}
                  href="https://eazzy-chat.onrender.com/"
                  target="_blank"
                >
                  <h5>VISIT SITE... ></h5>
                </a>
              </div>
            </div>
            <div className="col-md-6">
              <div className="gallery__container">
                <Carousel data-bs-theme="dark">
                  <Carousel.Item>
                    <img
                      src={arjCourse}
                      alt=""
                      width={"100%"}
                      height={"400vh"}
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      src={arjDetails}
                      alt=""
                      width={"100%"}
                      height={"400vh"}
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      src={arjEvent}
                      alt=""
                      width={"100%"}
                      height={"400vh"}
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img src={arjHome} alt="" width={"100%"} height={"400vh"} />
                    <Carousel.Caption>
                      <h5>Second slide label</h5>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      src={arjLogin}
                      alt=""
                      width={"100%"}
                      height={"400vh"}
                    />
                  </Carousel.Item>
                </Carousel>
              </div>
              <div class="info__text">
                <a
                  style={{ textDecoration: "none", cursor: "pointer" }}
                  href="https://arjun-group.vercel.app/"
                  target="_blank"
                >
                  <h5>VISIT SITE... ></h5>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="seven" class="goblack">
        <div class="heading ">
          <h1>Customise With Us</h1>
          <p class="lightblack">"Crafting Uniqueness, Tailoring Innovation."</p>
        </div>

        {/* <div class="container container__bg goblack">
          <div class="info goblack">
            <span>
              <img
                src="https://raw.githubusercontent.com/Nis-chal/dog_website_clone/main/images/blog3.jpg"
                alt=""
              />
            </span>
            <div class="info__text">
              <pre> May 5, 2021</pre>
              <h1>Hello world!</h1>

              <h5 class="">READ MORE ></h5>
            </div>
          </div>
          <div class="info goblack">
            <span>
              <img
                src="https://raw.githubusercontent.com/Nis-chal/dog_website_clone/main/images/blog2.jpg"
                alt=""
              />
            </span>
            <div class="info__text">
              <pre> May 5, 2021</pre>
              <h1>How to keep your dog cool this summer</h1>

              <h5 class="">READ MORE ></h5>
            </div>
          </div>
          <div class="info goblack">
            <span>
              <img
                src="https://raw.githubusercontent.com/Nis-chal/dog_website_clone/main/images/blog1.jpg"
                alt=""
              />
            </span>
            <div class="info__text">
              <pre> May 5, 2021</pre>
              <h1>Solution for grooming behavior problems</h1>

              <h5 class="">READ MORE ></h5>
            </div>
          </div>
        </div> */}
      </section>

      <footer id="eight">
        <div class="footer__container">
          <div class="dog__care ">
            <h3>CUSTOM COMP.</h3>

            <p>
              We created Music playlist, Live Callender, Live Word map, User
              related CRUP Opperaion component with the use of (MERN)
              Technology.
            </p>
          </div>
          <div class="dog__categories">
            <h3>CATEGORIES</h3>
            <div class="categories">
              <ul>
                <li> Music</li>
                <li> Organization or Productivity</li>
                <li> Navigation</li>
                <li> Data Management</li>
              </ul>
              {/* <ul>
                <li> May 2021</li>
                <li> April 2021</li>
              </ul> */}
            </div>
          </div>
          <div class="newsletter">
            <img src={logo} alt="" width={"100%"} height={"170vh"} />
          </div>
        </div>
        <div class="copyright">
          <p>
            &#169; Design and Developed by -<strong> Izhar khan.</strong>{" "}
          </p>
          <div class="share">
            <p>You Can find me on : &nbsp;</p>
            <a
              href="https://www.linkedin.com/in/izhar-khan-715705206/"
              target="_blank"
              rel="noreferrer"
              className="icon-colour  home-social-icons"
            >
              <img
                src={linkedin}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                alt="My SVG Image"
              />
            </a>
            &nbsp;&nbsp;
            <a
              href="https://twitter.com/Izharkhan0030"
              target="_blank"
              rel="noreferrer"
              className="icon-colour  home-social-icons"
            >
              <img
                src={twitter}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                alt="My SVG Image"
              />
            </a>
            &nbsp;&nbsp;
            <a
              href="https://wa.me/7737510030"
              target="_blank"
              rel="noreferrer"
              className="icon-colour home-social-icons"
            >
              <img
                src={whatsapp}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                alt="My SVG Image"
              />
            </a>
            &nbsp; &nbsp;
            <a
              href="https://www.instagram.com/izhaarkhaan"
              target="_blank"
              rel="noreferrer"
              className="icon-colour home-social-icons"
            >
              <img
                src={instagram}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                alt="My SVG Image"
              />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;
