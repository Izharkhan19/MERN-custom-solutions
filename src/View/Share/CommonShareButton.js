import React, { useState } from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import googleImage from "../../assets/googleImage.jpg";
import facebook from "../../assets/socialmediaSVG/facebook.svg";
import instagram from "../../assets/socialmediaSVG/instagram.svg";
import linkedin from "../../assets/socialmediaSVG/linkedin.svg";
import twitter from "../../assets/socialmediaSVG/twitter.svg";
import whatsapp from "../../assets/socialmediaSVG/whatsapp.svg";

const ShareComponent = ({ imageUrl, linkUrl, title }) => {
  const [handleShare, setHandleShare] = useState(false);

  const handleWebShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          // title: title,
          text: title,
          url: linkUrl,
        });
      } else {
        console.log("Web Share API not supported");
      }
    } catch (error) {
      console.error("Error sharing:", error.message);
    }
  };

  const shareOnFacebook = () => {
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      linkUrl
    )}`;
    window.open(facebookShareUrl, "_blank");
    setHandleShare(false);
  };

  const shareOnTwitter = () => {
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      linkUrl
    )}&text=${encodeURIComponent(title)}`;
    window.open(twitterShareUrl, "_blank");
    setHandleShare(false);
  };

  const shareOnLinkedIn = () => {
    const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      linkUrl
    )}`;
    window.open(linkedInShareUrl, "_blank");
    setHandleShare(false);
  };

  const shareOnWhatsApp = () => {
    const whatsappShareUrl = `https://web.whatsapp.com/send?text=${encodeURIComponent(
      `${title} - ${linkUrl}`
    )}`;
    window.open(whatsappShareUrl, "_blank");
    setHandleShare(false);
  };
  const shareOnInstagram = () => {
    // Open Instagram website with pre-filled caption https://www.instagram.com/direct/inbox/

    const instagramShareUrl = `https://www.instagram.com/?url=${encodeURIComponent(
      "direct/inbox/"
    )}&title=${encodeURIComponent("direct/inbox/")}`;
    window.open(instagramShareUrl, "_blank");
    setHandleShare(false);
  };

  const shareOnInstagramChat = async () => {
    let uri = `https://api.instagram.com/oauth/authorize
    ?client_id=892572725339030
    &redirect_uri=http://localhost:3000/
    &scope=user_profile,user_media
    &response_type=code`;

    let uri1 = `https://api.instagram.com/oauth/authorize
  ?client_id={"892572725339030"}
  &redirect_uri={"http://localhost:3000/"}
  &scope={"user_profile,user_media"}
  &response_type=code`;

    debugger;
    try {
      const response = await fetch(uri1);

      const data = await response.json();
      console.log("Media shared successfully:", data);
    } catch (error) {
      console.error("Error sharing on Instagram:", error);
    }
  };

  return (
    <>
      <div className="d-flex">
        <Button
          style={{ width: "50px", border:"1px solid black" }}
          variant=""
          onClick={() => setHandleShare(!handleShare)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="25"
            height="25"
            viewBox="0 0 30 30"
          >
            <path d="M 23 3 A 4 4 0 0 0 19 7 A 4 4 0 0 0 19.09375 7.8359375 L 10.011719 12.376953 A 4 4 0 0 0 7 11 A 4 4 0 0 0 3 15 A 4 4 0 0 0 7 19 A 4 4 0 0 0 10.013672 17.625 L 19.089844 22.164062 A 4 4 0 0 0 19 23 A 4 4 0 0 0 23 27 A 4 4 0 0 0 27 23 A 4 4 0 0 0 23 19 A 4 4 0 0 0 19.986328 20.375 L 10.910156 15.835938 A 4 4 0 0 0 11 15 A 4 4 0 0 0 10.90625 14.166016 L 19.988281 9.625 A 4 4 0 0 0 23 11 A 4 4 0 0 0 27 7 A 4 4 0 0 0 23 3 z"></path>
          </svg>
        </Button>
        {handleShare && (
          <>
            <Button variant="" onClick={shareOnFacebook}>
              <img
                src={facebook}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                alt="My SVG Image"
              />
            </Button>
            <Button variant="" onClick={shareOnInstagram}>
              <img
                src={instagram}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                alt="My SVG Image"
              />
            </Button>
            <Button variant="" onClick={shareOnLinkedIn}>
              <img
                src={linkedin}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                alt="My SVG Image"
              />
            </Button>
            <Button variant="" onClick={shareOnTwitter}>
              <img
                src={twitter}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                alt="My SVG Image"
              />
            </Button>
            <Button variant="" onClick={shareOnWhatsApp}>
              <img
                src={whatsapp}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                alt="My SVG Image"
              />
            </Button>
          </>
        )}

        {/* <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={googleImage} />
        <Card.Body>
          <Card.Text>
            <Button
              variant="success"
              onClick={() => setHandleShare(!handleShare)}
            >
              Share with...
            </Button>
          </Card.Text>
          {handleShare && (
            <>
              <Button variant="" onClick={shareOnFacebook}>
                <img
                  src={facebook}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  alt="My SVG Image"
                />
              </Button>
              <Button variant="" onClick={shareOnInstagram}>
                <img
                  src={instagram}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  alt="My SVG Image"
                />
              </Button>
              <Button variant="" onClick={shareOnLinkedIn}>
                <img
                  src={linkedin}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  alt="My SVG Image"
                />
              </Button>
              <Button variant="" onClick={shareOnTwitter}>
                <img
                  src={twitter}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  alt="My SVG Image"
                />
              </Button>
              <Button variant="" onClick={shareOnWhatsApp}>
                <img
                  src={whatsapp}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  alt="My SVG Image"
                />
              </Button>
            </>
          )}
        </Card.Body>
      </Card> */}
      </div>
    </>
  );
};

export default ShareComponent;
