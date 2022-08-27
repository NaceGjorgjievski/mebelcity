import Carousel from "react-bootstrap/Carousel";
import image1 from "../Images/slideshow1.png";
import image2 from "../Images/slideshow2.png";
import image3 from "../Images/slideshow3.png";
function CarouselFadeExample() {
  return (
    <Carousel fade>
      <Carousel.Item>
        <img className="d-block w-100" src={image1} alt="First slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={image2} alt="Second slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={image3} alt="Third slide" />
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselFadeExample;
