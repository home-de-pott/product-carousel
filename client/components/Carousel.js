import React from 'react';
import Slider from 'react-slick';
import Item from './Item';
import Arrow from './Arrow';

function Carousel({ products }) {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    initialSlide: 0,
    prevArrow: <Arrow />,
    nextArrow: <Arrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2,
          infinite: false,
        },
      },
      {
        breakpoint: 580,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          centerMode: true,
        },
      },
    ],
  };
  return (
    <Slider {...settings}>
      {products.map(product => (
        <Item key={product.ID} product={product} />
      ))}
    </Slider>
  );
}

export default Carousel;
