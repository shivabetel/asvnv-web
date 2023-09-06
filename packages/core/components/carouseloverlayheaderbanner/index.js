import { Container, Devices, Space } from "@jds/core";
import OverlayBanner from "../banner/overlayBanner";
import SlickCarousel from "../carousel/slick";
import { Global, css } from '@emotion/react'
import { getResponsiveProps } from "..";
import JButton from "../button";




const CarouselOverlayHeaderBanner = ({
    carouselDetails,
    type,
    renderPrimaryButton,
    renderSecondaryButton,
    logAnalytics,
    overideProps
}) => {
    const breakpoints = Devices.useMedia();
    const containerLayoutProps = getResponsiveProps(breakpoints, overideProps?.container);
    const spaceProps = getResponsiveProps(breakpoints, overideProps?.space);
    return (
        <>
            <Global styles={css`
           .slick-dotted.slick-slider{
            margin-bottom: 0;
           }
         `} />
            <Container
                // layout="max-width"
                as="div"
                pad='l'
                padPosition='top'
                data-testid="carousel-overlay-header-banner"
                style={{ overflow: 'hidden' }}
                {...containerLayoutProps}>
                <SlickCarousel
                    fade={true}
                    speed={1000}
                    dots={true}
                    overideProps={overideProps?.slickCarousel}>
                    {
                        carouselDetails.map((banner, index) => {                            
                            let primaryButton;
                            let secondaryButton;
                            if(renderPrimaryButton){
                                primaryButton = renderPrimaryButton(banner);
                            }else {
                                const button = (banner?.buttons || []).find(button => button?.theme == 'primary')
                                primaryButton = <JButton size="small" button={button}/>                               
                            }

                            if(renderSecondaryButton){
                                secondaryButton = renderSecondaryButton(banner);
                            }else {
                                const button = (banner?.buttons || []).find(button => button?.theme == 'secondary')  
                                secondaryButton = <JButton size="small" button={button}/>                   
                            }
                            return (
                                <OverlayBanner
                                    type={type}
                                    banner={banner}
                                    ariaLabel={banner?.headerText}
                                    key={index}
                                    logAnalytics={logAnalytics}
                                    primaryButton={primaryButton}
                                    secondaryButton={secondaryButton}
                                    overlayHeaderStyles={overideProps?.overlayHeaderStyles}
                                    overideBannerProps={overideProps?.banner}
                                />
                            )
                        })
                    }
                </SlickCarousel>
            </Container>
            <Space className="l-breakpoint--desktop" value='huge' {...spaceProps} />
            <Space className="l-breakpoint--tablet" value='xxl' {...spaceProps} />
        </>
    )
}

export default CarouselOverlayHeaderBanner;