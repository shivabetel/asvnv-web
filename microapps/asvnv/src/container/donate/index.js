/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Image from "@asvnv/core/components/image";
import RichText from "@asvnv/core/components/richtext";
import SectionHeading from "@asvnv/core/components/sectionheading";
import useFetch from "@asvnv/core/hooks/usefetch";
import { Container, Devices, Heading, Space, Text } from "@jds/core";
import apiList from "api";
import transformDonatePageApiResponse from "transformers/donate";
import mockDonatePageApiResponse from "@asvnv/api/mock/donate"

const imageContainer = css`
img{
    width:  auto !important;
    @media screen and (max-width: 61.9375rem){
        width:  100% !important;
    }
}

`

const DonateHomeContainer = () => {
    const { content, loading, errorMessage } = useFetch(apiList.getCMSApiUrl("DONATE_PAGE"), transformDonatePageApiResponse, mockDonatePageApiResponse);
    const breakpoints = Devices?.useMedia();
    return (
        <Container layout="max-width">
            {
                (content?.contentBlock || []).map((cont, index) => {
                    return (
                        <Container
                            as="div"
                            pad="l"
                            padPosition="vertical"
                            key={index}>
                            {
                                cont?.header && (
                                    <SectionHeading header={cont?.header} />
                                )
                            }
                            <>
                                {
                                    cont?.accountDetails?.length > 0 && (cont?.accountDetails || []).map((accountDetail, index) => (
                                        <Container
                                            key={index}
                                            as="div"
                                            pad="s"
                                            padPosition="vertical"
                                            layout="max-width-narrow"
                                            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Container 
                                            as="div"
                                            style={{flex: `1 1 60%`}}>
                                                {
                                                    breakpoints?.desktop && (
                                                        <Heading as="h5">{accountDetail?.key}</Heading>
                                                    )
                                                }
                                                {
                                                    breakpoints?.tablet && (
                                                        <Text appearance="body-m-bold">{accountDetail?.key}</Text>
                                                    )
                                                }
                                            </Container>
                                            <Container
                                                as="div"
                                                style={{textAlign: 'right'}}
                                            >
                                                <RichText
                                                    text={accountDetail?.value}
                                                    appearance="body-s-bold" />
                                            </Container>
                                        </Container>
                                    ))
                                }
                                <Space value="l" />
                            </>
                            {
                                cont?.image && (
                                   <Container
                                   as="div"
                                   layout="centered"
                                   css={imageContainer}
                                   pad="s"
                                   padPosition="vertical">                                     
                                     <Image image={cont?.image} />
                                   </Container>
                                   
                                )
                            }
                            {
                                cont?.richText && (
                                    <Container
                                    as="div"
                                    pad="base"
                                    layout="centered"
                                    padPosition="vertical">
                                        <Heading as="h5" appearance="heading-xxs">{`ಸೂಚನೆ: ${cont?.richText}`}</Heading>
                                    </Container>
                                )
                            }

                        </Container>
                    )

                })
            }
        </Container>
    )
}

export default DonateHomeContainer;