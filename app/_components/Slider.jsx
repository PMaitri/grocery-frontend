import React from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
  import Image from "next/image";

  
  function Slider({ sliderList }) {
    return (
      <Carousel>
        <CarouselContent>
          {sliderList.map((slider, index) => {
            const imageUrl =
              process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
              slider.attributes?.image?.data?.[0]?.attributes?.url;
  
            console.log("Image URL:", imageUrl); // Debugging
  
            return (
              <CarouselItem key={index}>
                <Image
  src={imageUrl}
  width={1000}
  height={500}
  alt="slider"
  className="w-full h-200px md:h-[530px] object-cover rounded-2xl"
  unoptimized={true} // 🚀 Fix Internal Server Error
/>

              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="absolute top-1/2 left-4 z-10 transform -translate-y-1/2" />
        <CarouselNext className="absolute top-1/2 right-4 z-10 transform -translate-y-1/2" />
      </Carousel>
    );
  }
  

export default Slider;
