import React from 'react'
import { useState } from 'react'


const ImageSlider = ({ slides }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const sliderStyles = {
        height: "100%",
        position: "relative",
    }

    const slideStyles = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        height: "100%",
        backgroundPosition: "center",
        backgroundSize: 'cover',
        backgroundImage: `url(${slides[currentIndex].url})`
    }

    const leftArrowStyle = {
        fontSize: '60px',
        color: '#fff',
        userSelect: 'none',
        zIndex: 2,
        cursor: 'pointer',
        marginLeft: "10px",
    };

    const rightArrowStyle = {
        fontSize: '60px',
        userSelect: 'none',
        color: '#fff',
        zIndex: 2,
        cursor: 'pointer',
        marginRight: "10px",
    };

    const goToPrevious = () =>{
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    }

    const goToNext = () =>{
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }

    /*
    const slideBtnContainer = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "5px",

    }

    const slideBtn = {
        marginLeft: "5px",
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        backgroundColor: "grey",
        cursor: "pointer",
    }
    
    const changeSlide = (index) =>{
        setCurrentIndex(index);
    }

     <div style={slideBtnContainer}>
                <button style={slideBtn} onClick={()=>changeSlide(0)}></button>
                <button style={slideBtn} onClick={()=>changeSlide(1)}></button>
                <button style={slideBtn} onClick={()=>changeSlide(2)}></button>
            </div>
    */

    return(
        <div style={sliderStyles}>
            
            <div style={slideStyles}>
                <div style={leftArrowStyle} onClick={goToPrevious}>{"<"}</div>
                <div style={rightArrowStyle} onClick={goToNext}>{">"}</div>
            </div>
           
            
        </div>
    )
}

export default ImageSlider