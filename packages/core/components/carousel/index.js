/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Container, Devices } from "@jds/core";
import Carousel from "react-multi-carousel";
// import Carousel from '../multi-carousel'
import "react-multi-carousel/lib/styles.css";
import { getResponsiveProps } from '..';
import React, { useRef, useEffect } from "react"

{/* <Global styles={css`
.caption-icon[data-mode=dark] {
  display: inline-flex;
          justify-content: center;
          align-items: center;
          width: 48px;
          height: 48px;
          background: #E8E8FC;
          border-radius: 50%;
}
`} /> */}

const carousel = css`
ul .react-multi-carousel-item:last-child{
    padding-right: 1rem;
}
ul .react-multi-carousel-item{
    padding-left: 1rem;
}

.react-multi-carousel-dot-list li .active, 
.react-multi-carousel-dot-list li .inactive {
    height: 8px;
    border-radius: 13px;
    border: none;
    margin: 24px 4px;
    width: 8px;
    background: #b5b5b5;
    display: block;
    cursor: pointer;
    padding:0; 
  }
.react-multi-carousel-dot-list li .active{
    width: 24px !important;
    background: #000093 !important;
   
  }

  .react-multi-carousel-dot-list li[data-mode=dark] .active{
    background: #fff !important;
   
  }  
.react-multi-carousel-dot-list{
    position: static !important;
  }
`

const CustomDot = ({ onClick, active, carouselState = {}, index, ...restOfProps }) => {

    // const carouselItems = [CarouselItem1, CaourselItem2, CarouselItem3];
    // onMove means if dragging or swiping in progress.
    // active is provided by this lib for checking if the item is active or not.
    const { totalItems, slidesToShow } = carouselState;
    return (
        <>
            {
                slidesToShow == totalItems ? null : (
                    <li data-mode={restOfProps?.['data-mode']}>
                        <button
                            type='button'
                            className={active ? "active" : "inactive"}
                            onClick={() => onClick()}
                            aria-label={active ? `current active slide is ${index + 1} of ${slidesToShow}` : `go to carousel slide ${index + 1} of ${slidesToShow}`}
                        >
                            {/* {React.Children.toArray(carouselItems)[index]} */}
                        </button>
                    </li>
                )
            }
        </>

    );
};

const defaultResponsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
        slidesToSlide: 1,// optional, default to 1.
        //partialVisibilityGutter: 20
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1, // optional, default to 1.
        partialVisibilityGutter: 30
    }
};

const handleAfterChange = () => {
    var hiddenSlides = document.querySelectorAll('.react-multi-carousel-item[aria-hidden="true"]');
    hiddenSlides.forEach(function (slide) {
        // Prevent any interactive element on non-visible slides from receiving keyboard focus
        slide.querySelectorAll('a, button').forEach(function (element) {
            element.setAttribute('tabindex', -1);
        });
    });

}


const handleBeforeChange = () => {
    var visibleSlides = document.querySelectorAll('.react-multi-carousel-item');
    visibleSlides.forEach(function (slide) {
        // Prevent any interactive element on non-visible slides from receiving keyboard focus
        slide.querySelectorAll('a, button').forEach(function (element) {
            element.setAttribute('tabindex', 0);
        });
    });
}

const CarouselComponent = React.forwardRef((props, forwardRref) => {

    const {
        children,
        partialVisible = false,
        responsive = {},
        autoPlay = false,
        infinite = false,
        dataMode,
        beforeChange,
        afterChange,
        overideProps,
        ...restOfProps
    } = props;

    const ref = forwardRref || useRef();

    const breakpoints = Devices.useMedia()

    useEffect(() => {
        var hiddenSlides = document.querySelectorAll('.react-multi-carousel-item[aria-hidden="true"]');
        hiddenSlides.forEach(function (slide) {
            // Prevent any interactive element on non-visible slides from receiving keyboard focus
            slide.querySelectorAll('a, button').forEach(function (element) {
                element.setAttribute('tabindex', -1);
            });
        });
    }, [ref.current])

    const containerLayoutProps = getResponsiveProps(breakpoints, overideProps?.container)
    const carouselDotsOverideProps = getResponsiveProps(breakpoints, overideProps?.dots)
    const carouselOverideProps = getResponsiveProps(breakpoints, overideProps);    

    const overrideResponsive = {
        desktop: {
            ...defaultResponsive['desktop'],
            ...(responsive['desktop'] || {}),
            ...(overideProps?.responsive?.['desktop'] || {})

        },
        tablet: {
            ...defaultResponsive['tablet'],
            ...(responsive['tablet'] || {}),
            ...(overideProps?.responsive?.['tablet'] || {})

        },
        mobile: {
            ...defaultResponsive['mobile'],
            ...(responsive['mobile'] || {}),
            ...(overideProps?.responsive?.['mobile'] || {})

        }

    }

    if (overideProps?.shouldReset) {
        /* sets first index as active slide on re-render */
        ref?.current?.goToSlide(0)
    }

    const handleEventBeforeChange = (nextSlide, state) => {
        beforeChange && typeof(beforeChange) == 'function' && beforeChange(nextSlide, state);
        handleBeforeChange();
    }

    const handleEventAfterChange = (previousSlide, state) => {
        afterChange && typeof(afterChange) == 'function' && afterChange(previousSlide, state);
        handleAfterChange();
    }

    return (
        <Container css={carousel} aria-label={'carousel'} {...containerLayoutProps}>
            <Carousel ref={el => ref.current = el}
                beforeChange={handleEventBeforeChange}
                afterChange={handleEventAfterChange}
                swipeable={true}
                draggable={true}
                showDots={true}
                arrows={false}
                responsive={overrideResponsive}
                ssr={false} // means to render carousel on server-side.
                infinite={infinite}
                autoPlay={autoPlay}
                // autoPlaySpeed={1000}
                // autoPlay={false}
                keyBoardControl={true}
                // customTransition="all .5"
                transitionDuration={500}
                containerClass="carousel-container"
                //  removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
                // deviceType={this.props.deviceType}
                // dotListClass="custom-dot-list-style"
                // itemClass="carousel-item-padding-40-px"
                renderDotsOutside={true}
                partialVisible={partialVisible}
                customDot={(
                    <CustomDot
                        dataMode={dataMode}
                        {...carouselDotsOverideProps} />
                )}
                {...restOfProps}
                {...carouselOverideProps}
            >
                {
                    children
                }

            </Carousel>
        </Container>
    )
})


export default CarouselComponent;