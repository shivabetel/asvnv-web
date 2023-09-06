import CarouselOverlayHeaderBanner from '../../carouseloverlayheaderbanner';


const CarouselCardBanner = ({ content, type, logAnalytics, overideProps }) => (
    <CarouselOverlayHeaderBanner
        type={type}
        carouselDetails={content}
        logAnalytics={logAnalytics}
        overideProps={overideProps}
    />
)

const CarouselBannerTemplate = ({ content, loading, analyticsEvents, overideProps, ...otherProps }) => {
    const { bannerType, ...restOfProps } = overideProps; 
    switch (bannerType) {
        default:
            return (
                <CarouselCardBanner
                    content={content}
                    logAnalytics={analyticsEvents?.banner}
                    overideProps={restOfProps?.carouselOverlayBanner} />
            )
    }
}

export default CarouselBannerTemplate;