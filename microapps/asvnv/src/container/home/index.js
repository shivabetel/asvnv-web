/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import useFetch from "@asvnv/core/hooks/usefetch"
import apiList from "api";
import PageTemplateContext from "@asvnv/core/contexts/PageTemplateContext";
import React from "react";
import transformHomePageApiResponse from "transformers/home";
import { overideProps } from "./overideProps";
import mockData from "@asvnv/api/mock";
import { Button, Container, Devices, Heading, Icon, Space, Text, Theme } from "@jds/core";
import CarouselBannerTemplate from "@asvnv/core/components/templates/carouselbanner";
import MarqueeSlider from "@asvnv/core/components/carousel/marquee"
import { dFlex } from "@asvnv/core/styles";
import { faCalendar, faHandsHelping, faHouse, faInfo, faPerson, faS } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SectionHeading from "@asvnv/core/components/sectionheading";
import RichText from "@asvnv/core/components/richtext";
import Image from "@asvnv/core/components/image";
import JButton from "@asvnv/core/components/button";
import Carousel from "@asvnv/core/components/carousel";
import { useNavigate } from "react-router-dom";

const flexColumn = css`
  flex-direction: column;
`

const schemeCardCss = css`
  width: 300px;
  height: 50px;
`

const HomeContainer = () => {

    const { content, loading, errorMessage } = useFetch(apiList.getCMSApiUrl("HOME_PAGE"), transformHomePageApiResponse, mockData.HOME_PAGE);
    const { getPageTemplate } = React.useContext(PageTemplateContext)
    const PageTemplate = getPageTemplate({ content, loading, preloader: () => <>loading</>, errorMessage });
    const breakpoints = Devices.useMedia();
    const routerNavigate = useNavigate();
    return (
        <Container as="div">
            {
                (content?.carouselBlock || []).map((content, index) => (
                    <CarouselBannerTemplate
                        content={content?.carouselBanners}
                        overideProps={overideProps?.carouselBlock?.carouselBanners} />
                ))
            }
            {
                (content?.schemesBlock || []).map(({ header, schemes }, index) => (
                    <Container
                        as="div"
                        pad="l"
                        padPosition="bottom"
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
                                    speed={150}
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
                                                                    {/* <div>
                                                                            <RichText text={`${obj?.scheme?.description?.substring(0,50)}.....`}/>
                                                                        </div> */}
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
                                                                    {/* <div>
                                                                            <RichText text={`${obj?.scheme?.description?.substring(0,50)}.....`}/>
                                                                        </div> */}
                                                                </div>


                                                            </div>
                                                        </div>
                                                        <div className="j-card__footer">
                                                            <Button
                                                                size="small"
                                                                title="ಹೆಚ್ಚು ತಿಳಿಯಿರಿ"
                                                                data-mode="bold"
                                                                onClick={() => routerNavigate(`/schemes`)}
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
                        background="secondary-40"
                        key={index}>
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
    )
}

export default HomeContainer;