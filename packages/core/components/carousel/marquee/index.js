import Marquee from 'react-fast-marquee'

const MarqueeSlider = ({children, ...restOfProps}) => {
    return (
        <Marquee className='slider-container' {...restOfProps}>
            {children}
        </Marquee>
    )
}

export default MarqueeSlider;