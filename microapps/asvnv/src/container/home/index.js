/** @jsxImportSource @emotion/react */
import mockData from "@asvnv/api/mock";
import JButton from "@asvnv/core/components/button";
import Carousel from "@asvnv/core/components/carousel";
import MarqueeSlider from "@asvnv/core/components/carousel/marquee";
import Image from "@asvnv/core/components/image";
import SectionHeading from "@asvnv/core/components/sectionheading";
import PageTemplateContext from "@asvnv/core/contexts/PageTemplateContext";
import useFetch from "@asvnv/core/hooks/usefetch";
import { css } from "@emotion/react";
import { Button, Container, Devices, Heading, Text, Theme } from "@jds/core";
import apiList from "api";
import React, { useCallback, useRef, useState } from "react";
import ImageGallery from "react-image-gallery";
import { useNavigate } from "react-router-dom";
import transformHomePageApiResponse from "transformers/home";

const flexColumn = css`
  flex-direction: column;
`

const schemeCardCss = css`
  width: 300px;
  height: 50px;
`

const imageCardCarouselContainerDesktopCss = css`
overflow: hidden;
position: relative;
height: 500px;
width: 100%;
.image-gallery{
    height: 100%;    
    .image-gallery-content{
        height: 100%;
        .image-gallery-slide-wrapper{
            height: 100%;            
            .image-gallery-swipe {
                height: 100%;
                .image-gallery-slides {
                    height: 100%;                    
                    .image-gallery-slide{
                        height: 100%;
                        .image-gallery-image {
                            height: 100%;
                            object-fit: cover;
                            
                        }
                    }
                }
            }
        }
    }
}
`

const imageCardCarouselContainerMobileCss = css`
overflow: hidden;
position: relative;
height: 300px;
width: 100%;
.image-gallery{
    height: 100%;
    .image-gallery-content{
        height: 100%;
        // top: -20px;
        .image-gallery-slide-wrapper{
            height: 100%;
            .image-gallery-swipe {
                height: 100%;
                .image-gallery-slides {
                    height: 100%;
                    .image-gallery-slide{
                        height: 100%;
                        .image-gallery-image {
                            // height: 100%;
                            object-fit: contain;
                            
                        }
                    }
                }
            }
        }
    }
}
`


const HomeContainer = () => {

    const { content, loading, errorMessage } = useFetch(apiList.getCMSApiUrl("HOME_PAGE"), transformHomePageApiResponse, mockData.HOME_PAGE);

    const { getPageTemplate } = React.useContext(PageTemplateContext)
    const PageTemplate = getPageTemplate({ content, loading, preloader: () => <>loading</>, errorMessage });
    const breakpoints = Devices.useMedia();
    const routerNavigate = useNavigate();
    const appDownloadSectionRef = useRef();
    const main = useRef();
    const [showMainContent, setShowMainContent] = useState(false);

    // useEffect(() => {
    //     sessionStorage.get("introShown") == "true" && setShowMainContent(true)
    //     breakpoints.tablet && setShowMainContent(true)
    // }, [sessionStorage, breakpoints])


    const handleEventAppDownload = useCallback(() => {
        appDownloadSectionRef.current && appDownloadSectionRef?.current?.scrollIntoView({
            behavior: "smooth"
        })
    }, [appDownloadSectionRef.current])

    const handleRenderPrimaryButton = useCallback((banner) => {
        const primaryButton = (banner?.buttons || []).find(button => button['theme'] == 'primary')
        if (primaryButton?.targetFragment == 'appDownloadSection' && breakpoints?.desktop) {
            return (
                <JButton
                    button={primaryButton}
                    onClick={handleEventAppDownload} />
            );
        }
        return <JButton button={primaryButton} />;
    }, [handleEventAppDownload]);




    return (
        <Container as="div">


            {/* {
                (content?.carouselBlock || []).map((content, index) => (
                    <CarouselOverlayHeaderBanner
                        key={index}
                        carouselDetails={content?.carouselBanners}
                        renderPrimaryButton={(banner) => handleRenderPrimaryButton(banner)}
                        overideProps={overideProps?.carouselBlock?.carouselBanners?.carouselOverlayBanner} />
                ))
            } */}
            <Container
                as="div"
                id="main"
                ref={main}                
            >
                {
                    (content?.carouselimagesBlock || []).map((obj, index) => {
                        const items = (obj.images || []).map(image => ({
                            original: breakpoints?.desktop ? image?.desktop : image?.mobile
                        }))
                        return (
                            <Container
                                background={breakpoints?.mobile ? null : 'primary-grey-20'}
                                layout="full"
                                // pad="m"
                                // padPosition={"bottom"}
                                key={index}>
                                <Container
                                    layout={breakpoints?.desktop ? "max-width" : "full"}
                                    css={breakpoints.mobile ? imageCardCarouselContainerMobileCss : imageCardCarouselContainerDesktopCss}>
                                    <ImageGallery
                                        autoPlay={true}
                                        showPlayButton={false}
                                        showFullscreenButton={false}
                                        // showNav={false}
                                        infinite={true}
                                        slideInterval={3000}
                                        slideDuration={1500}
                                        items={items}
                                    />
                                </Container>
                            </Container>
                        )
                    })
                }

                {
                    (content?.schemesBlock || []).map(({ header, schemes }, index) => (
                        <Container
                            as="div"
                            pad={breakpoints?.mobile ? 'xxs' : 'l'}
                            padPosition="vertical"
                            key={index}>
                            {
                                header && (
                                    <SectionHeading
                                        header={header}
                                        overideProps={{
                                            container: {
                                                desktop: {
                                                    layout: 'max-width'
                                                }
                                            }
                                        }} />
                                )
                            }
                            {
                                schemes?.length > 0 && breakpoints?.desktop && (
                                    <MarqueeSlider
                                        speed={100}
                                        gradient={false}
                                        pauseOnHover={true}
                                        pauseOnClick={true}>
                                        {
                                            (schemes || []).map((obj, index) => (

                                                <Container
                                                    as="div"
                                                    pad="s"
                                                    padPosition="horizontal">

                                                    <Theme className='h-100' theme={obj?.theme} key={index}>
                                                        <div className='j-card size--xxs card-vertical j-card__shadow bg--primary-50 h-100 w-100'>

                                                            <div className='j-card__flex' css={schemeCardCss}>
                                                                <div className='j-card__content h-100'>
                                                                    <div className='j-contentBlock j-contentBlock__size-xxs has-only__primary-cta h-100'>
                                                                        <div className='j-contentBlock__body'>
                                                                            <div className='j-contentBlock__content j-color-primary-inverse'>
                                                                                <Heading as='h4' appearance='heading-xs'>{obj?.scheme?.title}</Heading>
                                                                            </div>
                                                                        </div>

                                                                    </div>


                                                                </div>
                                                            </div>
                                                            <div className="j-card__footer">
                                                                <Button
                                                                    size="small"
                                                                    title="ಹೆಚ್ಚು ತಿಳಿಯಿರಿ"
                                                                    data-mode="bold"
                                                                    onClick={() => routerNavigate(`/schemes/${obj?.scheme?.uid}`)}
                                                                >
                                                                    <Text
                                                                        as="span"
                                                                        color="primary-inverse">{"ಹೆಚ್ಚು ತಿಳಿಯಿರಿ"}</Text>
                                                                </Button>

                                                            </div>
                                                        </div>
                                                    </Theme>
                                                </Container>
                                            ))
                                        }
                                    </MarqueeSlider>
                                )

                            }
                            {
                                schemes?.length > 0 && breakpoints?.tablet && (
                                    <Carousel
                                        autoPlay={true}
                                        infinite={true}
                                        partialVisible={true}
                                        responsive={{
                                            tablet: {
                                                items: 2,
                                                partialVisibilityGutter: 30
                                            },
                                            mobile: {
                                                partialVisibilityGutter: 80
                                            }
                                        }}>
                                        {
                                            (schemes || []).map((obj, index) => (

                                                <Container
                                                    as="div"
                                                    pad="s"
                                                    padPosition="horizontal">

                                                    <Theme className='h-100' theme={obj?.theme} key={index}>
                                                        <div className='j-card size--xxs card-vertical j-card__shadow bg--primary-50 h-100 w-100'>

                                                            <div className='j-card__flex' css={schemeCardCss}>
                                                                <div className='j-card__content h-100'>
                                                                    <div className='j-contentBlock j-contentBlock__size-xxs has-only__primary-cta h-100'>
                                                                        <div className='j-contentBlock__body'>
                                                                            <div className='j-contentBlock__content j-color-primary-inverse'>
                                                                                <Heading as='h4' appearance='heading-xs'>{obj?.scheme?.title}</Heading>
                                                                            </div>
                                                                        </div>
                                                                    </div>


                                                                </div>
                                                            </div>
                                                            <div className="j-card__footer">
                                                                <Button
                                                                    size="small"
                                                                    title="ಹೆಚ್ಚು ತಿಳಿಯಿರಿ"
                                                                    data-mode="bold"
                                                                    onClick={() => routerNavigate(`/schemes/${obj?.scheme?.uid}`)}
                                                                >
                                                                    <Text
                                                                        as="span"
                                                                        color="primary-inverse">{"ಹೆಚ್ಚು ತಿಳಿಯಿರಿ"}</Text>
                                                                </Button>

                                                            </div>
                                                        </div>
                                                    </Theme>
                                                </Container>
                                            ))
                                        }
                                    </Carousel>
                                )

                            }
                        </Container>
                    ))
                }
                {
                    (content?.downloadAppBlock || []).map(({ header, image, button }, index) => (
                        <Container
                            as="div"
                            pad="l"
                            padPosition="vertical"
                            background="primary-20"
                            key={index}
                            ref={appDownloadSectionRef}>
                            <Container
                                as="div"
                                layout="max-width">
                                {
                                    header && (
                                        <SectionHeading
                                            header={header} />
                                    )
                                }

                                <Container
                                    as="div"
                                    layout="centered"

                                >
                                    {
                                        image && breakpoints?.desktop && (
                                            <span className="l-radius--large overflow-initial sp--s pd--all d-inline-flex" style={{ background: 'white' }}>
                                                <Image
                                                    image={image}
                                                    alt={"qr code"} />
                                            </span>
                                        )
                                    }

                                    {
                                        button && breakpoints?.tablet && (
                                            <JButton button={button} />
                                        )
                                    }
                                </Container>

                            </Container>
                        </Container>
                    ))
                }
            </Container>





        </Container>
    )
}

export default HomeContainer;