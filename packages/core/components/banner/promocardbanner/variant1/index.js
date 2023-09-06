/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ContentBlock, Devices, Heading, makeClass } from "@jds/core";
import { getResponsiveProps } from "../../../../components";
import JButton from "../../../button";
import Caption from "../../../caption";
import Image from "../../../image";

const promoCardVariant1 = css`
display: flex;
position: relative;
// height: 480px;
// max-height: 480px;
.promo-card-variant1-block {
    position: relative;
    outline: none;
    overflow: hidden;
    flex: 1 1;
    display: flex;
    flex-direction: column;
    border-radius: var(--radius-xl);
}

.promo-card-variant1-block-shadow {
    box-shadow: var(--shadow-s);
}
.promo-card-variant1-card{
    position: relative;
    outline: none;
    overflow: hidden;
    flex: 1 1;
    display: flex;
    flex-direction: column;
    /* background-color: var(--card-background,var(--color-primary-50)); */
    border-radius: var(--radius-xl);
}

// .promo-card-variant1-card.bg--primary {
//      background-color: var(--color-primary-50);
// }





 .promo-card-variant1-image.ratio--landscape{
    --aspect-ratio: var(--aspect-ratio-landscape);
 }
 .promo-card-variant1-image.ratio--wide{
    --aspect-ratio: var(--aspect-ratio-wide);
 }

 .promo-card-variant1-image.ratio--portrait{
    --aspect-ratio: var(--aspect-ratio-portrait);
 }

 .promo-card-variant1-image.ratio--square{
    --aspect-ratio: var(--aspect-ratio-square);
 }

.promo-card-variant1-image {
    --image-focus: top;
    line-height: 0;
    width: 100%;
    overflow: hidden;
    aspect-ratio: var(--aspect-ratio,unset);
    height: 100%;
}

.promo-card-variant1-image img {
    aspect-ratio: var(--aspect-ratio,unset);
    width: 100%;
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover;
    -o-object-position: var(--image-focus,center);
    object-position: var(--image-focus,center);
    border-radius: var(--radius-xl);
}

.promo-card-variant1-content-block{
    position: absolute;
    display: flex;
    width: 100%;
    height: 100%;
    
}
.promo-card-variant1-content-block.gradient{
    background: linear-gradient(90deg, rgba(0, 0, 0, 0.70) 0%, rgba(0, 0, 0, 0.00) 100%);
}
.promo-card-variant1-content-block .promo-card-variant1-content{
    flex: 0 0 40%;
    padding:  var(--spacing-m);
}

.promo-card-variant1-content-block.align-content--flexStart {
    align-items: flex-start;
}

.promo-card-variant1-content-block.align-content--flexEnd {
    align-items: flex-end;
}

@media screen and (max-width: 61.9375rem) {
    .promo-card-variant1-content-block.gradient{
        background: linear-gradient(165deg, rgba(0, 0, 0, 0.80) 0%, rgba(0, 52, 81, 0.00) 100%);
    }
    .promo-card-variant1-content-block .promo-card-variant1-content{
        flex: 0 0 90%;
        
    }
}



`

const CardBannerVariant1 = (props) => {
    const {
        theme,
        // orientation = 'horizontal',
        // imageRatio = 'portrait',
        // alignContent = 'flexStart',
        image,
        caption,
        title,
        primaryCTA,
        gradient,
        dataMode = 'dark',        
    } = props;
    const breakpoints = Devices.useMedia();
    let captionElem;
    if (caption) {
        captionElem = caption
    }
    let alignContent = props.alignContent;
    alignContent = alignContent || 'flexStart'
    if(!alignContent){
        breakpoints?.desktop ? (alignContent = 'flexStart') : (alignContent = 'flexEnd')        
    }

    const promoCardClasses = makeClass([
        "promo-card-variant1-card"
    ]);

    const promoCardImageContainerClasses = makeClass([
        'promo-card-variant1-image'
    ])

    let themeClass;
    if (theme) {
        themeClass = `theme--${theme}`
    }

    const promoCardContentBlockClassess = makeClass([
        'promo-card-variant1-content-block',
        // 'gradient',
        alignContent && `align-content--${alignContent}`
    ])

    return (
        <div css={promoCardVariant1} className={themeClass}>
            <div className="promo-card-variant1-block promo-card-variant1-block-shadow">
                <div className={promoCardClasses}>
                    <div className={promoCardImageContainerClasses}>
                        {image}
                    </div>
                    <div className={promoCardContentBlockClassess} data-mode={dataMode}>
                        <div className="promo-card-variant1-content">
                            <ContentBlock
                                caption={captionElem}
                                title={(
                                    <Heading
                                        appearance={breakpoints?.desktop ? 'heading-m' : 'heading-s'}>{title}</Heading>
                                )}
                                primaryCTA={primaryCTA} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const PrimaryButton = ({
    button,
    children,
    ...rest
}) =>  {    
    return (
        <JButton button={button} {...rest}/>
    )
}

const PromoCardBannerVariant1 = ({
    banner,
    overideProps
}) => {
    const primaryCTA = (banner?.buttons || []).find(button => button.theme == 'primary');
    const breakpoints = Devices.useMedia();
    const cardBannerOverideProps = getResponsiveProps(breakpoints, overideProps)
    return (
        <CardBannerVariant1
            theme={banner?.theme}
            caption={(
                <Caption
                    caption={banner?.caption}
                    captionOverideProps={overideProps?.caption} />
            )}
            title={banner?.headerText}
            description={banner?.footerText}
            image={<Image image={banner?.bannerImage} />}
            dataMode={banner?.['content-dataMode']}
            primaryCTA={{
                provider: (
                    <PrimaryButton 
                    button={primaryCTA} 
                    style={{width: 'auto'}}/>
                )
            }}
            {...cardBannerOverideProps}
        />
    )
}


export default PromoCardBannerVariant1;