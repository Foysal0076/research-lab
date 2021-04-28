import React from 'react'
import { Carousel, CarouselItem, Image } from 'react-bootstrap'

const HomeCarousel = () => {
    return (
        <Carousel pause='hover' className='bg-dark' >
            <CarouselItem>
                <Image src='images/carousel3.png' alt='Carousel Image' fluid></Image>
            </CarouselItem>
            <CarouselItem>
                <Image src='images/carousel2.png' alt='Carousel Image' fluid></Image>
            </CarouselItem>
            <CarouselItem>
                <Image src='images/carousel1.png' alt='Carousel Image' fluid></Image>
            </CarouselItem>
        </Carousel>
    )
}

export default HomeCarousel