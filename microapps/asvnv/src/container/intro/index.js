import mockCommitteePageApiResponse from "@asvnv/api/mock/committee-page";
import RichText from "@asvnv/core/components/richtext";
import SectionHeading from "@asvnv/core/components/sectionheading";
import useFetch from "@asvnv/core/hooks/usefetch";
import { Container, Heading } from "@jds/core";
import apiList from "api";
import gsap, { Power0 } from "gsap";
import { useEffect, useRef } from "react";
import transformCommitteePageApiResponse from "transformers/committee";
import sessionStorage from "@asvnv/core/utils/sessionstorage"

console.log("sessionStorage::",sessionStorage);

const IntroContainer = ({
    onAnimationComplete
}) => {

    const { content: membersContent, loading } = useFetch(apiList.getCMSApiUrl("COMMITTEE_PAGE"), transformCommitteePageApiResponse, mockCommitteePageApiResponse);
    const ref = useRef();

    useEffect(() => {
        let context;
        console.log("ref?.current?.children:", ref?.current);
        setTimeout(() => {
            ref?.current && (
                context = gsap.context(() => {
                    const t = gsap.timeline({
                        onComplete: () => {                            
                            onAnimationComplete && onAnimationComplete();
                            sessionStorage.set("introShown", true)
                        }
                        //duration: 5
                    });
                    Array.prototype.slice.call(ref?.current?.children).reduce((acc, child, index) => {
                        acc.to(child, {
                            css: {
                                position: 'relative',
                                left: 0,
                                top: 0

                            },
                            ease: Power0.easeIn
                        })
                        return acc;
                    }, t)
                    // t.to(ref?.current, { css: { display: 'none' }, ease: Power0.easeIn, delay: 1 })                               

                }, ref?.current)
            )
        }, 1000)

        return () => context?.revert();
    }, [ref?.current])

    return (
        <Container
            as="div">
            {
                (membersContent?.contentBlock || []).map(content => (
                    <Container
                        layout="max-width"
                        ref={ref}
                        style={{ height: '100vh', position: 'relative', overflow: 'hidden'}}
                    >
                        {
                            <Container
                                pad="m"
                                padPosition="vertical"
                                id="header"
                                style={{
                                    position: 'absolute',
                                    left: '-100%',
                                    top: 0
                                }}>
                                <SectionHeading
                                    header={{
                                        title: '2022-2025ನೇ ಸಾಲಿನ ಪ್ರಸ್ತುತ ಕಾರ್ಯಕಾರಿ ಸಮಿತಿ',
                                        textAlignDesktop: 'center'
                                    }} />
                            </Container>
                        }
                         {
                                (content?.members || []).map((member, index) => (
                                    <Container
                                        as="div"
                                        pad="s"
                                        padPosition="vertical"
                                        style={{ position: 'absolute', zIndex: index, bottom: '50%', left: '-200px', display: 'inline-flex', flexDirection: 'column', width: '15%', alignItems: 'center', textAlign: 'center' }}>
                                        <img src={member?.avatar} style={{ width: '150px', height: '150px' }} />
                                        <div>
                                            <Heading appearance="heading-xxs">{member?.name}</Heading>
                                        </div>
                                        <RichText as="div" appearance="body-xs" text={member?.role} />
                                    </Container>
                                ))
                            }
                    </Container>
                ))
            }
        </Container>
    )
}

export default IntroContainer;