/** @jsxImportSource @emotion/react */
import { Container, ContentBlock, Devices } from "@jds/core";
import React, { useCallback } from "react";
import { fnTextAlignCss } from "../../styles";

import { getResponsiveProps } from "..";
import Caption from "../caption";
import RichHeading from "../richheading";
import RichText from "../richtext";



const SectionHeading = ({
    header = {},
    contentBlockSize,
    defaultIcon,
    titleElement,
    descriptionElement,
    captionElement,
    titleAs,
    overideProps,
    ...restOfProps
}) => {
    
    const { caption, title, description, textAlignDesktop, textAlignTablet, textAlignMobile } = (header || {})

    const breakpoints = Devices.useMedia();

    const textAlignCss = fnTextAlignCss({ textAlignDesktop, textAlignTablet, textAlignMobile });
    const getTextAlignCss = useCallback(() => {
        if (breakpoints['mobile']) {
            return textAlignCss['mobile']
        } if (breakpoints['tablet']) {
            return textAlignCss['tablet']
        } if (breakpoints['desktop']) {
            return textAlignCss['desktop']
        }

        return textAlignCss[breakpoints['mobile']]

    }, [breakpoints, textAlignCss])


    const containerLayoutProps = getResponsiveProps(breakpoints,overideProps?.container)
    const headingContentBlockProps = getResponsiveProps(breakpoints,overideProps?.contentBlock)
    const titleOverideProps = getResponsiveProps(breakpoints, overideProps?.title)
    const descriptionOverideProps = getResponsiveProps(breakpoints,overideProps?.description)

    const titleEl = React.isValidElement(titleElement) ? titleElement : (
        <RichHeading
            as={titleAs || 'h3'}
            appearance="heading-m"
            heading={title}
            {...titleOverideProps} />
    )
    const descriptionEl = React.isValidElement(descriptionElement) ?
        descriptionElement : description ? (
            <RichText
                as="p"
                color="primary-grey-80"
                appearance="body-m"
                text={description}
                {...descriptionOverideProps} />
        ) : null;

    return (
        <Container 
        as="div" 
        {...containerLayoutProps}>
            <ContentBlock caption={captionElement || (
               caption && <Container layout="flex" css={getTextAlignCss()}>
                    <Caption
                        caption={caption}
                        captionOverideProps={overideProps?.caption}
                    />
                </Container>
            )}
                title={titleEl}
                css={getTextAlignCss()}
                description={descriptionEl}
                size={contentBlockSize || "m"}
                {...headingContentBlockProps}
                {...restOfProps}
            />
        </Container>
    )
}

export default SectionHeading;