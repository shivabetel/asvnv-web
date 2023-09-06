
/** @jsxImportSource @emotion/react */
import { useRef } from "react";
import { Container, Devices, Grid, Icon, Space } from "@jds/core";
import IcScrollTop from "@asvnv/core/icons/IcScrollTop"
import { InView } from "react-intersection-observer";
import SectionHeading from "@asvnv/core/components/sectionheading";
import React, { useState, useCallback, useEffect } from "react"
import { css } from "@emotion/react";
import QuickLinks from "../quick-links";
import canUseDOM from "can-use-dom";
import { useParams } from 'react-router-dom';


const quickLinksContainerDesktop = css`
margin-left: 1rem;
position: sticky;
top: 10px;
`



const scrollTopIconContainer = css`
@media screen and (max-width: 61.9375rem){
    position: fixed;
    bottom: 2rem;
    right: 1rem;
    cursor: pointer;
    z-index: 1;
    transition: all 2s ease;
    display: block;
    z-index: 2;
}

display: none;

`


const detailHeaderOverideProps = {
    title: {
        desktop: {
            as: 'h3',
            appearance: 'heading-xs',
            // color: 'primary-50'
        }
    },
    description: {
        desktop: {
            appearance: '',
            className: 'j-rich-text',
            color: '',
            as: 'div'
        }
    }
}

const topHeaderOverideProps = {
    container: {
        desktop: {
            className: 'j-rich-text'
        }
    },
    title: {
        desktop: {
            as: 'h2',
            appearance: 'heading-l',
        }
    },
}

const Detail = React.forwardRef(({ content, setRefs, updateQuickLink }, ref) => {
    const inViewRef = useRef();
    const setRef = useCallback((node) => {
        setRefs(node);
        inViewRef.current = node
    }, [setRefs]);




    const header = {
        title: content?.title,
        description: content?.description
    }

    return (
        <Container
            ref={setRef}
        >
            <SectionHeading
                header={header}
                overideProps={detailHeaderOverideProps} />
        </Container>
    )
})


const Details = ({ content }) => {
    const refs = useRef({})
    const breakpoints = Devices.useMedia();
    const [schemes, setSchemes] = useState({});
    const [quickLinks, setQuickLinks] = useState([]);
    const [selectedLink, setSelectedLink] = useState("all");
    let { uid } = useParams();     


    useEffect(() => {
        if (content?.schemes && content?.schemes?.length > 0) {
            let schemes = {};
            const quickLinks = [{
                id: 'all',
                title: 'ಎಲ್ಲಾ ಯೋಜನೆಗಳು'
            }];
            schemes['all'] = content?.schemes.slice(0);
            (content?.schemes || []).forEach(scheme => {
                quickLinks.push({
                    id: scheme?.uid,
                    title: scheme?.title
                })
                schemes[scheme?.uid] = new Array(scheme)
            })

            setSchemes(schemes);
            setQuickLinks(quickLinks);
        }
    }, [content?.schemes])

    const setRefs = useCallback((node, current) => {
        const identifier = current?.title
        const obj = (content?.schemes || []).find(scheme => {
            return scheme.title == identifier
        })
        if (obj) {
            refs.current[identifier] = node
        }
    }, [refs, content])




    return (
        <Container
            as="div"
            pad="l"
            padPosition="top">
            {
                content?.header && (
                    <SectionHeading
                        header={content?.header}
                        overideProps={topHeaderOverideProps} />
                )
            }
            <Grid template="30% 68%"
                templateMobile="100%"
                templateTablet="100%"
                align="flex-start">
                <Container as="div" style={{ order: 2 }}>
                    {

                        (schemes?.[uid || 'all'] || []).map((scheme, index) => {
                            return (
                                <Container
                                    as="div"
                                    key={index}
                                >
                                    {
                                        <>
                                            <Detail
                                                content={scheme}
                                                setRefs={(node) => setRefs(node, scheme)}
                                            />
                                            <Space value="l" />
                                        </>
                                    }
                                </Container>
                            )
                        })
                    }
                </Container>
                <div css={breakpoints?.desktop && quickLinksContainerDesktop}
                    style={{ order: 1 }}>
                    <QuickLinks
                        quickLinks={quickLinks}
                        activeSchemeId={uid}
                        // updateSelectedLink={setSelectedLink}
                    // allSectionRefs={refs.current}
                    // activeQuickLink={activeQuickLink} 
                    />
                </div>

            </Grid>
            <Space className="l-breakpoint--desktop" value='huge' />
            <Space className="l-breakpoint--tablet" value='xxl' />
        </Container>
    )
}


const DetailsHome = (props) => {
    const { content, ...rest } = props;
    const [showScrollToTop, setShowScrollToTop] = useState(false);

    const handleScrollToTop = useCallback(() => {
        if (canUseDOM) {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            })
        }
    }, [])
    return (
        <Container
            layout="max-width"
            as="div">
            <InView
                as="div"
                onChange={(inView, entry) => {
                    inView && setShowScrollToTop(false)
                    !inView && setShowScrollToTop(true)
                }}>
            </InView>
            <Container
                as="div">
                <Details content={content} />
            </Container>
            {
                showScrollToTop && (
                    <div css={scrollTopIconContainer} onClick={handleScrollToTop}>
                        <Icon
                            kind="background"
                            color="primary"
                            size="xxl"
                            ic={<IcScrollTop />} />
                    </div>
                )
            }

        </Container>
    )
}

export default DetailsHome;