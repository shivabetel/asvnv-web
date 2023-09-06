/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Card, Container, Devices, Space } from "@jds/core";
import { getResponsiveProps } from '../../../';
import Image from '../../../image';
import { useMemo } from 'react'

import OverLayHeader from './overlayheader';

const pad0 = css`
padding: 0
`



const CardOverLayBanner = ({
    banner = {},
    ariaLabel,
    overlayHeaderStyles,
    logAnalytics,
    overideBannerProps
}) => {
    const { bannerImage, buttons = [] } = banner;
    const breakpoints = Devices.useMedia();
    const topContainerLayoutProps = getResponsiveProps(breakpoints, overideBannerProps?.container)
    const bannerImageProps = getResponsiveProps(breakpoints, overideBannerProps?.bannerImage)
    const handleOverlayHeaderAnalytics = useMemo(() => ({
        button: (button) => logAnalytics?.button && logAnalytics?.button(button, banner)
    }), [logAnalytics, banner])
    const spaceProps = getResponsiveProps(breakpoints, overideBannerProps?.space)

    return (
        <>
            <Container role="banner" aria-label={ariaLabel || banner?.headerText} {...topContainerLayoutProps}>
                <div className="j-card" css={pad0}>
                    {
                        bannerImage && <Container as='div' layout="flex">
                            <Image
                                image={bannerImage}
                                alt={banner?.headerText}
                                {...bannerImageProps}
                                imageStyles={{ 'border-radius': 'var(--radius-large)', ...bannerImageProps?.imageStyles }} />
                        </Container>
                    }
                    <OverLayHeader title={banner?.headerText}
                        description={banner?.footerText}
                        buttons={buttons}
                        bannerVideo={banner?.bannerVideo}
                        headerAlignDesktop={banner?.headerAlignDesktop}
                        caption={banner?.caption}
                        styles={(overlayHeaderStyles)}
                        overideHeaderProps={overideBannerProps}
                        logAnalytics={handleOverlayHeaderAnalytics}
                        headerAlignMobile={banner?.headerAlignMobile}
                    />
                </div>

            </Container>
            <Space className="l-breakpoint--desktop" value='huge' {...spaceProps} />
            <Space className="l-breakpoint--tablet" value='xxl' {...spaceProps} />
        </>
    )
}

export default CardOverLayBanner;