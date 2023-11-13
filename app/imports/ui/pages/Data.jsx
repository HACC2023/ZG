import React from 'react';
import { Carousel, Image } from 'react-bootstrap';

const Data = () => (
  <Carousel>
    <Carousel.Item style={{ height: '750px' }}>
      <Image src="/images/Fire-map.png" width="90%" alt="fire-map" />
    </Carousel.Item>
    <Carousel.Item style={{ height: '750px' }}>
      <Image src="/images/lahaina-sale-data.png" width="90%" alt="lahaina-sale" />
    </Carousel.Item>
  </Carousel>
);

export default Data;
