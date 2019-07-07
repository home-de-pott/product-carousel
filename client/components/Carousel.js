import React from 'react';
import Slider from 'react-slick';
import Item from './Item';
import Arrow from './Arrow';

function Carousel() {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    initialSlide: 0,
    prevArrow: <Arrow />,
    nextArrow: <Arrow />,
    // arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 580,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
        },
      },
    ],
  };
  return (
    <Slider {...settings}>
      <div>
        <Item />
      </div>
      <div>
        <Item />
      </div>
      <div>
        <Item />
      </div>
      <div>
        <Item />
      </div>
      <div>
        <Item />
      </div>
      <div>
        <Item />
      </div>
    </Slider>
  );
}

export default Carousel;
