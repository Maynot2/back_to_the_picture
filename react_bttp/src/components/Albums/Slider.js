import {FaArrowAltCircleRight, FaArrowAltCircleLeft} from 'react-icons/fa'
import React, { useState } from 'react';


const ImageSlider = ({ pictures }) => {
    const [current, setCurrent] = useState(0);
    const length = pictures.length;
    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1)
    }
    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1)
    }
    if (length <= 0){
        return null;
    }
    return (
        <div className="relative">
            <FaArrowAltCircleLeft onClick={prevSlide} className="absolute z-10 top-60 left-5"/>
            <FaArrowAltCircleRight onClick={nextSlide} className="absolute z-10 top-60 right-5"/>
            {
                pictures.map((slide, index) => {
                    return (
                        <div>
                            {index === current && (
                                <img className=" border-2 rounded hover:scale-150 m-2 border-2 border-tertiary " src={slide.image}></img>
                            )}
                        </div>
                    )
                })
            }
        </div>
    )
}
export default ImageSlider;
