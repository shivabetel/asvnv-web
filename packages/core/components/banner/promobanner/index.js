/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Container, Devices, PromoCard } from '@jds/core';
import { getButtonProps } from '../../button';
import useNavigation from '../../../hooks/useNavigation';
import PropTypes from 'prop-types';
import { useCallback } from "react";
import Image from '../../image';
import RichHeading from '../../richheading';
import RichText from '../../richtext';
import { getResponsiveProps } from '../../';


const container = css`
    border-radius: var(--radius-xl);
    & .j-promo-card-block {
        border-radius: var(--radius-xl);
    }

`


const promoBanner = css`
    border-radius: var(--radius-xl);
    .j-promo-card-block{
        border-radius: var(--radius-xl);
    }
    .j-contentBlock{
        height: 100%;
    }
    .j-contentBlock__body{
        height: 100%;
    }
    .j-contentBlock__content{
        display: flex;
        flex-direction: column;
        height: 100%;
    }
    .j-contentBlock__content .j-contentBlock__title{
        flex: 1 0 auto;
    }
    .j-promo-card-block.j-promo-card-block__shadow, .j-promo-card {
        border-radius: var(--radius-large);
    }
`
const promoBannerWithButton = css`
    border-radius: var(--radius-xl);
    .j-contentBlock__content {
        padding-top: var(--local-sp,var(--spacing-base));
        padding-bottom: var(--local-sp,var(--spacing-base));
        --local-sp: var(--spacing-m);
        @media screen and (max-width: 38.6875rem) {
                padding-top: 0;
        } 
        @media screen and (max-width: 619px) {
            & .j-contentBlock.j-contentBlock__size-s {
            flex-direction: column;
        }  
    }
`
const PromoBanner = ({
    banner,
    getTitle,
    orientation,
    getDescription,
    getPrimaryCTA = primaryCTA => primaryCTA,
    handleBannerClick,
    logAnalytics,
    isCentrexService,
    overideBannerProps,
    ...restOfProps
}) => {
    const { headerText, footerText, bannerImage, bannerImages, buttons } = banner;
    const { navigateBanner } = useNavigation();
    const breakpoints = Devices.useMedia();
    let primaryButton;
    if (buttons && buttons?.length > 0) {
        if (buttons.length == 1) {
            primaryButton = buttons[0]
        } else {
            primaryButton = buttons.find(button => button['theme'] == 'primary')
        }
    }
    orientation = orientation || breakpoints.mobile ? 'vertical' : 'horizontal'

    const onBannerClick = useCallback(() => {
        logAnalytics && logAnalytics(banner, isCentrexService);
        handleBannerClick ? handleBannerClick() : (navigateBanner && navigateBanner(banner))
    }, [navigateBanner, handleBannerClick, logAnalytics, banner, isCentrexService])

    const getTitleTextAppearance = useCallback(() => {
        if (breakpoints.mobile)
            return 'heading-xs'
        if (breakpoints.tablet)
            return 'heading-l'
        if (breakpoints.desktop)
            return 'heading-l'

    }, [breakpoints, banner])

    const getDescriptionTextAppearance = useCallback(() => {

        if (breakpoints.mobile)
            return 'body-s'
        if (breakpoints.tablet)
            return 'body-l'
        if (breakpoints.desktop)
            return 'body-l'

    }, [breakpoints, banner])


    const getImageElement = useCallback(() => {
        return <img src='/asvnv-osa-banner.jpg'></img>
        // if (bannerImage)
        //     return <Image image={bannerImage} />
        // if (bannerImages?.length > 0)
        //     return <Image image={bannerImages[0]} />
    }, [bannerImage, bannerImages])


    const titleOverideProps = getResponsiveProps(breakpoints, overideBannerProps?.title)
    const descriptionOverideProps = getResponsiveProps(breakpoints, overideBannerProps?.description)
    const bannerOverideProps = getResponsiveProps(breakpoints, overideBannerProps)


    const promocardElement = <PromoCard css={primaryButton ? promoBannerWithButton : promoBanner}
        role="banner"
        aria-label={headerText}
        className='promo-card'
        size="s"
        title={(getTitle && getTitle(banner)) || (
            <RichHeading as="span"
                appearance={getTitleTextAppearance()}
                color="primary-grey-100"
                heading={headerText}
                {...titleOverideProps} />
        )}
        description={(getDescription && getDescription(banner)) || (
            <RichText
                as="span"
                appearance={getDescriptionTextAppearance()}
                color="primary-grey-80" text={footerText}
                {...descriptionOverideProps} />
        )}
        primaryCTA={getPrimaryCTA((primaryButton && {
            button: getButtonProps({ button: primaryButton, overideButtonProps: getResponsiveProps(breakpoints, overideBannerProps?.button?.primary) })
        }))}
        orientation={orientation}
        imageFocus="top"
        imageRatio={breakpoints.mobile ? '' : 'landscape'}
        shadow={true}
        image={getImageElement()}
        {...restOfProps}
        {...bannerOverideProps} />
    return (
        <Container as='div' className={`h-100`} css={container}>
            {
                (banner?.target || handleBannerClick) ? <a onClick={onBannerClick} tabIndex={0}>
                    {promocardElement}
                </a> : promocardElement
            }

        </Container>
    )
}


PromoBanner.propTypes = {
    banner: PropTypes.object,
    getTitle: PropTypes.func,
    getDescription: PropTypes.func,
    // primaryCTA: PropTypes.object,
    handleBannerClick: PropTypes.func
}


export default PromoBanner