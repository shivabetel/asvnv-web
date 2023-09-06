/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button, Container, Devices, Icon, Text } from '@jds/core';
import Slider from "react-slick";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { getResponsiveProps } from '../../../components';
import { useRef, useEffect, useCallback } from "react";

const overflowHidden = css`
overflow: hidden;
`

const overflowScrollMaxWidth = css`
@media screen and (max-width: 61.9375rem){
    margin-left: 0;
    margin-right: 0;
}
`

const equal_height_card = css`
 .slick-track{
    display: flex;
 }
 .slick-track .slick-slide{
    display: flex;
    height: auto;
 }
`

const carousel_card_wrap = css`
.slick-slide{
    // margin: 0 0.5rem;
    height: auto!important;
}
.slick-slide.slick-active{
    z-index: 1;
}
.slick-slide>div{
    width: 100%
}
`

const ulDots = css`
position: static;
li{
    width: 8px;
    height: 8px;
}
li button{
    padding: 0;
    width: 8px;
    height: 8px;
}
li button:before {
    line-height: 1;
    overflow: hidden;
    background-color: var(--color-primary-50);
    width: 8px;
    height: 8px;
    border-radius: 13px;
    content: "";
}

li.slick-active 
{
    width: 24px;
    height: 8px;
}

li.slick-active button:before {
    opacity: 1;
    color: var(--color-primary-50);
    background-color: var(--color-primary-50);
    border-radius: 13px;
    width: 24px;
    height: 8px;
}
`


const handleAccessbilityForHiddenSlides = (el) => {
    var hiddenSlides = el.querySelectorAll('.slick-slide[aria-hidden="true"]');
    hiddenSlides.forEach(function (slide) {
        // Prevent any interactive element on non-visible slides from receiving keyboard focus
        slide.setAttribute('tabindex', -1)
        slide.querySelectorAll('a, button').forEach(function (element) {
            element.setAttribute('tabindex', -1);
        });
    });
}


const handleAccessbilityForVisibleSlides = (el) => {
    var visibleSlides = el.querySelectorAll('.slick-slide[aria-hidden="false"]');
    visibleSlides.forEach(function (slide) {
        // Prevent any interactive element on non-visible slides from receiving keyboard focus
        slide.setAttribute('tabindex', 0)
        slide.querySelectorAll('a, button').forEach(function (element) {
            element.setAttribute('tabindex', 0);
        });
    });
}



const prevArrowContainerCss = css`
position: absolute;
bottom: 3rem;
z-index: 1;
right: 14rem;
display: flex;
align-items: center;
justify-content: center;
gap: 1rem;
@media screen and (max-width: 61.9375rem) {
    left: 1rem;
    right: auto;
}

`


const prevarrowCss = css`
border: 1px solid white !important;
`

const pauseArrowCss = css`
border: 1px solid white !important;
`

const rightArrowCss = css`
position: absolute;
    bottom: 3rem;
    right: 10rem;
    border: 1px solid white !important;
    @media screen and (max-width: 61.9375rem) {       
        left: 11rem;
        right: auto;
    }
`


const PrevArrow = (props) => {
    const { currentSlide, slideCount } = props;
    return (
        <Container css={prevArrowContainerCss} layout='flex'>
            <Button
                css={pauseArrowCss}
                kind='tertiary'
                size='small'
                icon={<Icon
                    size='s'
                    ic={<svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.66602 0.666992C1.4008 0.666992 1.14645 0.772349 0.958909 0.959885C0.771372 1.14742 0.666016 1.40178 0.666016 1.66699V10.3337C0.666016 10.5989 0.771372 10.8532 0.958909 11.0408C1.14645 11.2283 1.4008 11.3337 1.66602 11.3337C1.93123 11.3337 2.18559 11.2283 2.37312 11.0408C2.56066 10.8532 2.66602 10.5989 2.66602 10.3337V1.66699C2.66602 1.40178 2.56066 1.14742 2.37312 0.959885C2.18559 0.772349 1.93123 0.666992 1.66602 0.666992ZM6.33268 0.666992C6.06747 0.666992 5.81311 0.772349 5.62558 0.959885C5.43804 1.14742 5.33268 1.40178 5.33268 1.66699V10.3337C5.33268 10.5989 5.43804 10.8532 5.62558 11.0408C5.81311 11.2283 6.06747 11.3337 6.33268 11.3337C6.5979 11.3337 6.85225 11.2283 7.03979 11.0408C7.22732 10.8532 7.33268 10.5989 7.33268 10.3337V1.66699C7.33268 1.40178 7.22732 1.14742 7.03979 0.959885C6.85225 0.772349 6.5979 0.666992 6.33268 0.666992Z" fill="white" />
                    </svg>
                    } />} />
            <Container as='div'>
                 <Text color='white'>{`${currentSlide+1} of ${slideCount}`}</Text>
            </Container>
            <Button
                css={prevarrowCss}
                kind='tertiary'
                size='small'
                icon={<Icon
                    size='s'
                    ic={<svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.99931 11.3335C5.91157 11.334 5.8246 11.3171 5.74337 11.284C5.66215 11.2508 5.58827 11.2019 5.52597 11.1401L0.859308 6.47346C0.796823 6.41148 0.747227 6.33775 0.713381 6.25651C0.679535 6.17527 0.662109 6.08813 0.662109 6.00012C0.662109 5.91212 0.679535 5.82498 0.713381 5.74374C0.747227 5.6625 0.796823 5.58877 0.859308 5.52679L5.52597 0.860124C5.58813 0.797965 5.66193 0.748658 5.74314 0.715017C5.82436 0.681377 5.9114 0.664062 5.99931 0.664062C6.08721 0.664062 6.17426 0.681377 6.25547 0.715017C6.33669 0.748658 6.41048 0.797965 6.47264 0.860124C6.5348 0.922283 6.58411 0.996076 6.61775 1.07729C6.65139 1.15851 6.6687 1.24555 6.6687 1.33346C6.6687 1.42136 6.65139 1.50841 6.61775 1.58962C6.58411 1.67084 6.5348 1.74463 6.47264 1.80679L2.27264 6.00012L6.47264 10.1935C6.53513 10.2554 6.58472 10.3292 6.61857 10.4104C6.65241 10.4916 6.66984 10.5788 6.66984 10.6668C6.66984 10.7548 6.65241 10.8419 6.61857 10.9232C6.58472 11.0044 6.53513 11.0781 6.47264 11.1401C6.41035 11.2019 6.33647 11.2508 6.25525 11.284C6.17402 11.3171 6.08705 11.334 5.99931 11.3335Z" fill="white" />
                    </svg>
                    }></Icon>}>

            </Button>
        </Container>

    )
}

const NextArrow = (props) => {
    return (
        <Button
            css={rightArrowCss}
            kind='tertiary'
            size='small'
            icon={<Icon
                size='s'
                ic={<svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.00061 11.3335C0.912873 11.334 0.825898 11.3171 0.744673 11.284C0.663448 11.2508 0.58957 11.2019 0.527277 11.1401C0.464791 11.0781 0.415195 11.0044 0.38135 10.9232C0.347504 10.8419 0.330078 10.7548 0.330078 10.6668C0.330078 10.5788 0.347504 10.4916 0.38135 10.4104C0.415195 10.3292 0.464791 10.2554 0.527277 10.1935L4.72728 6.00012L0.527277 1.80679C0.401741 1.68125 0.331216 1.51099 0.331216 1.33346C0.331216 1.15592 0.401741 0.985659 0.527277 0.860123C0.652813 0.734588 0.823076 0.664063 1.00061 0.664062C1.17814 0.664062 1.34841 0.734588 1.47394 0.860123L6.14061 5.52679C6.20309 5.58877 6.25269 5.6625 6.28654 5.74374C6.32038 5.82498 6.33781 5.91212 6.33781 6.00012C6.33781 6.08813 6.32038 6.17527 6.28654 6.25651C6.25269 6.33775 6.20309 6.41148 6.14061 6.47346L1.47394 11.1401C1.41165 11.2019 1.33777 11.2508 1.25655 11.284C1.17532 11.3171 1.08835 11.334 1.00061 11.3335Z" fill="white" />
                </svg>

                }></Icon>}>

        </Button>
    )
}



const SlickCarousel = ({ children, dots = true, overideProps, ...restOfProps }) => {

    const breakpoints = Devices.useMedia();
    const slickCarouselOverideProps = getResponsiveProps(breakpoints, overideProps?.carousel);
    const ref = useRef();


    useEffect(() => {
        ref.current && handleAccessbilityForHiddenSlides(ref.current);
        ref.current && handleAccessbilityForVisibleSlides(ref.current);
    }, [ref.current]);

    const handleAfterChange = useCallback(() => {
        handleAccessbilityForHiddenSlides(ref.current);

    }, [ref.current])


    const handleBeforeChange = useCallback(() => {
        handleAccessbilityForVisibleSlides(ref.current);
    }, [ref.current])

    return (
        <Container
            ref={ref}
            as='div'>
            <Slider className='j-content-layout slick-slider slick-dotted h-100' css={[overflowScrollMaxWidth, equal_height_card, carousel_card_wrap]}
                dots={true}
                infinite={true}
                autoplay={true}
                draggable={true}
                appendDots={dots => <ul css={ulDots}>{dots}</ul>}
                afterChange={handleAfterChange}
                beforeChange={handleBeforeChange}
                // prevArrow={<PrevArrow />}
                // nextArrow={<NextArrow />}
                {...restOfProps}
                {...slickCarouselOverideProps}
            >
                {children}
            </Slider>
        </Container>
    )
}

export default SlickCarousel;