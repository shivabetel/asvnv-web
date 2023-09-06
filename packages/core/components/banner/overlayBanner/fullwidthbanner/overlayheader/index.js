/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Container, Devices, Space } from '@jds/core'
import React, { useCallback } from 'react'
import { getResponsiveProps } from '../../../../'
import JButton from '../../../../button'
import Caption from '../../../../caption'
import RichHeading from '../../../../richheading'
import RichText from '../../../../richtext'

const bgLinearGradientBanner = css`
background: linear-gradient(90deg,rgba(0,0,0,.33) 0,rgba(0,0,0,0) 50%);
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
    
`

const alignItemsCenter = css`
align-items: center;
`

const alignItemsFlexEnd = css`
align-items: flex-end;
`

const alignItemsFlexStart = css`
align-items: flex-start;
`

const bannerMaxContainer = css`
max-width: 520px;
`


const w100 = css`
width: 100%
`

const buttonWidthAuto = css`
 width: auto;
`

const contentContainerCss = css`
@media screen and (max-width: 61.9375rem){
    height: 100%;
    display: flex;
    align-items: flex-end;
}
`



const OverLayHeader = ({
    banner,
    primaryButton,
    secondaryButton,
    overideHeaderProps
}) => {
    const breakpoints = Devices.useMedia();
    const primaryCTA = primaryButton ? React.isValidElement(primaryButton) ?
        primaryButton : <JButton button={primaryButton} size="small" css={buttonWidthAuto} /> : null

    const secondaryCTA = secondaryButton ? React.isValidElement(secondaryButton) ?
        secondaryButton : <JButton css={buttonWidthAuto} size="small" button={secondaryButton} /> : null

    const getTitleTextAppearance = useCallback(() => {

        if (breakpoints.mobile) {
            return 'heading-l'
        }
        if (breakpoints.tablet)
            return 'heading-l'
        if (breakpoints.desktop)
            return 'heading-l'

    }, [breakpoints])

    const getDescriptionTextAppearance = useCallback(() => {

        if (breakpoints.mobile)
            return 'body-l'
        if (breakpoints.tablet)
            return 'body-l'
        if (breakpoints.desktop)
            return 'body-l'

    }, [breakpoints])
    const containerLayoutOverideProps = getResponsiveProps(breakpoints, overideHeaderProps?.container)
    const titleOverideProps = getResponsiveProps(breakpoints, overideHeaderProps?.title)
    const descriptionOverideProps = getResponsiveProps(breakpoints, overideHeaderProps?.description);
    const alignContent = getResponsiveProps(breakpoints, overideHeaderProps?.alignContent);

    let alignItems = alignContent?.alignItems;
    if (!alignItems) {
        if (breakpoints?.mobile) {
            alignItems = 'flexEnd'
        } else if (breakpoints?.desktop) {
            alignItems = 'center'
        }
    }


    let alignContentCss;
    if (alignItems == 'center') {
        alignContentCss = alignItemsCenter
    } else if (alignItems == 'flexEnd') {
        alignContentCss = alignItemsFlexEnd
    } else if (alignItems == 'flexStart') {
        alignContentCss = alignItemsFlexStart
    }



    return (
        <div className='gradient-div' css={bgLinearGradientBanner} data-mode="light">
            <Container
                as='div'
                layout='full'
                css={[fullwidthBannerContainer, alignContentCss]} 
                {...containerLayoutOverideProps}>
                <div css={[w100, contentContainerCss]}>
                    <Container 
                    as='div'
                    layout='max-width'
                    >

                        <Container as='div' css={bannerMaxContainer}>
                            {
                                banner?.caption && <Caption
                                    caption={banner?.caption}
                                    captionOverideProps={overideHeaderProps?.caption} />
                            }
                            {
                                banner?.headerText && (
                                    <div>
                                        <RichHeading as='h2'
                                            appearance={getTitleTextAppearance()}
                                            // color='white'
                                            heading={banner?.headerText}
                                            {...titleOverideProps} />
                                        <Space value='xs' dir='vertical' />
                                    </div>
                                )
                            }
                            {
                                banner?.footerText && <div>
                                    <RichText as='div'
                                        appearance={getDescriptionTextAppearance()}
                                        // color='primary-grey-40'
                                        text={banner?.footerText}
                                        {...descriptionOverideProps} />
                                    <Space value='xs' direction='vertical' />
                                </div>
                            }
                            {
                                (primaryCTA || secondaryCTA) && (
                                    <div className='j-button-group'>
                                        {primaryCTA}
                                        {secondaryCTA}
                                    </div>
                                )
                            }
                            {/* {
                                banner?.buttons && (
                                    <ButtonGroup
                                        content={banner}
                                        overideProps={overideHeaderProps?.buttonGroup}
                                        buttonProps={{
                                            playVideoButton: {
                                                video_url: banner?.bannerVideo,
                                                allLanguagesVideos: banner?.languagesBannerVideos
                                            }
                                        }}
                                    />
                                )
                            } */}
                            <Space className="l-breakpoint--tablet" value='l' />
                        </Container>

                    </Container>
                </div>
            </Container>
        </div>
    )
}

export default OverLayHeader