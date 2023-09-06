/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Container, Devices } from "@jds/core";
import { useCallback } from "react";
import Image from '../../../image';
import OverLayHeader from './overlayheader';
import useNavigation from '../../../../hooks/useNavigation';

const imageViewPort = css`
min-height: 350px;
img,video{
    grid-area: 1/1/-1/-1;
    min-width: 100%;
    min-height: 350px;
    object-fit: cover;
    z-index: -1;
    background-color: #000; 
}
img{
    object-position: center;
}
`
const imageViewPortDesktop = css`
    height: 52vh;
    max-height: 52vh;    
    img,video{
        height: 52vh;
        max-height: 52vh;
    }
`

const imageViewPortMobile = css`
height: 66vh;
max-height: 66vh;    
img,video{
    height: 66vh;
    max-height: 66vh;
}
`


const imageViewPortTablet = css`
height: 76vh;
max-height: 76vh;    
img,video{
    height: 76vh;
    max-height: 76vh;
}
`


const FullWidthOverlayBanner = ({
    banner,
    primaryButton,
    secondaryButton,
    ariaLabel,
    overideBannerProps
}) => {
    // const media = banner?.bannerImage ? <Image image={banner?.bannerImage} alt={banner?.headerText} /> : banner?.bannerVideo ? <Video url={banner?.bannerVideo?.url} /> : null
    const breakpoints = Devices.useMedia();
    const { navigateBanner } = useNavigation();
    const getMediaElement = useCallback(() => {
        if (banner?.bannerImage)
            // return <img src='https://storage.googleapis.com/asvnvs/2nd-sneha-sammilana/1.jpeg'></img>
            return <Image alt={banner?.headerText} image={banner?.bannerImage} />
        if (banner.bannerImages?.length > 0)
            return <Image alt={banner?.headerText} image={banner?.bannerImages[0]} />
        // if (banner.bannerVideo)
        //     return <Video url={banner?.bannerVideo} />
        // if (banner.bannerVideos?.length > 0)
        //     return <Video url={banner?.bannerVideos[0]?.url} />

    }, [breakpoints, banner]);


    const onBannerClick = useCallback(() => {
        // logAnalytics && logAnalytics(banner);  
        navigateBanner && navigateBanner(banner);
    }, [navigateBanner, banner])

    const bannerElement = (
        <Container layout="full" style={{ position: 'relative' }} role="banner" aria-label={ariaLabel}>
            <Container as='div' layout="flex"
                css={[imageViewPort, Devices.isDesktop() ? imageViewPortDesktop : Devices.isTabletOnly() ? imageViewPortTablet : imageViewPortMobile]}>
                {getMediaElement()}
            </Container>
            <Container as='div'>
                <OverLayHeader
                    banner={banner}
                    primaryButton={primaryButton}
                    secondaryButton={secondaryButton}
                    overideHeaderProps={overideBannerProps?.header}
                />
            </Container>

        </Container>
    )

    return (
        <>
            {
                (banner?.target) ? <a onClick={onBannerClick} tabIndex={0}>
                    {bannerElement}
                </a> : bannerElement
            }
        </>
    )
}


export default FullWidthOverlayBanner;