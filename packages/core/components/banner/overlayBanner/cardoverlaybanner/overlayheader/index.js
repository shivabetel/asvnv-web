/** @jsxImportSource @emotion/react */
import { css, Global } from '@emotion/react'
import { ContentBlock, Devices } from '@jds/core'
import React, { useCallback } from 'react'
import { getResponsiveProps } from '../../../../'
import JButton from '../../../../button'
import Caption from '../../../../caption'
import RichHeading from '../../../../richheading'
import RichText from '../../../../richtext'
const bgLinearGradientBanner = css`
background: linear-gradient(90deg,rgba(0,0,0,.33) 0,rgba(0,0,0,0) 100%);
position: absolute;
left: 0;
right: 0;
top: 0;
bottom: 0;
`

const fullwidthBannerContainer = css`
position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
& .j-button {
    width:auto;
}
@media screen and (max-width: 61.9375rem) {
 flex-direction:column;
 justify-content:flex-end;
 align-items: flex-start;
}

`
const maxInitial = css`
  max-width: initial;
`


const titleCss = css`
@media screen and (max-width: 61.9375rem){
    font-size: 2rem;
}
`

const subTitleCss = css`
@media screen and (max-width: 61.9375rem)
{
    font-size: 1.125rem;
}
`
const headerAlignRight = css`
  justify-content: flex-end;
`;

const headerAlignTop = css`
  justify-content: flex-start !important;
`;


const defaultOverHeaderStyles = {
    desktop: {
        maxWidth: '50%',
        alignItems: 'center'
    },
    tablet: {
        maxWidth: '60%',
        alignItems: 'flex-end'
    },
    mobile: {
        maxWidth: 'initial',
        alignItems: 'flex-end'
    }
}



const OverLayHeader = ({
    title,
    description,
    buttons,
    caption,
    bannerVideo,
    headerAlignDesktop,
    styles,
    logAnalytics,
    playVideoModalOverideProps,
    overideHeaderProps,
    headerAlignMobile
 }) => {
    const overlayHeaderStyles = {
        desktop: {
            ...(defaultOverHeaderStyles?.desktop || {}),
            ...(styles?.desktop || {})
        },
        tablet: {
            ...(defaultOverHeaderStyles?.tablet || {}),
            ...(styles?.tablet || {})
        },
        mobile: {
            ...(defaultOverHeaderStyles?.mobile || {}),
            ...(styles?.mobile || {})
        }
    }

    const breakpoints = Devices.useMedia();
    const containerLayoutOverideProps = getResponsiveProps(breakpoints, overideHeaderProps?.content?.container)
    const titleOverideProps = getResponsiveProps(breakpoints, overideHeaderProps?.title)
    const descriptionOverideProps = getResponsiveProps(breakpoints, overideHeaderProps?.description)
    const buttonGroupOverideProps = getResponsiveProps(breakpoints, overideHeaderProps?.buttonGroup)
    const contentBlockOverrideProps = getResponsiveProps(breakpoints, overideHeaderProps?.contentBlock)

    const getHeaderAlignCss = useCallback(() => {
        if (breakpoints['desktop']) {
            return headerAlignDesktop == "right" && headerAlignRight
        }
        if (breakpoints['mobile']) {
            return headerAlignMobile == "top" && headerAlignTop
        }
    }, [breakpoints])
    let captionElement = null;
    captionElement = caption ? React.isValidElement(caption) ? caption : (
        <Caption
            caption={caption}
            captionOverideProps={overideHeaderProps?.caption} />
    ) : null

    const titleElement = title ? React.isValidElement(title) ? title : (
        <RichHeading css={titleCss}
            as='div'
            appearance="heading-l"
            color='white' heading={title}
            {...titleOverideProps} />
    ) : null


    const descriptionElement = description ? React.isValidElement(description) ? description : (
        <RichText css={subTitleCss}
            as='div'
            appearance="body-l"
            color="primary-grey-40" text={description}
            {...descriptionOverideProps} />
    ) : null
    
    const bannerButtons = (buttons || []).map(button => {
        return (
            React.isValidElement(button) ? button :
            <JButton
            button={button}
            data-mode={button?.dataMode}
            handleLogAnalytics={logAnalytics?.button}
            overideButtonProps={overideHeaderProps?.button?.[button?.theme || 'primary']} />
        )
    })



    return (
        <div css={bgLinearGradientBanner} className="gradientDiv">
            <Global
                styles={css`
        @media screen and (max-width: 61.9375rem){
        .j-card .j-button-group {
            flex-wrap: unset!important;
        }
        }
        `}
            />
            <div css={[fullwidthBannerContainer, getHeaderAlignCss()]} {...containerLayoutOverideProps}>
                    <ContentBlock css={[
                        Devices.isDesktop() ?
                            overlayHeaderStyles.desktop :
                            Devices.isTabletOnly() ?
                                overlayHeaderStyles.tablet : maxInitial]} className='has-only__primary-cta  sp--l  pd--all overlay-header' size='l'
                        caption={captionElement}
                        title={titleElement}
                        description={descriptionElement}
                        {
                            ...contentBlockOverrideProps
                        }
                    >
                        {
                            bannerButtons?.length > 0 && <div className='j-button-group' {...buttonGroupOverideProps}>
                                {
                                    bannerButtons
                                }
                            </div>
                        }
                    </ContentBlock>
            </div>

        </div>
    )
}

export default OverLayHeader