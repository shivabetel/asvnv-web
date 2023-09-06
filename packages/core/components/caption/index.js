import { Container, Devices, ListBlock } from "@jds/core";
import { getResponsiveProps } from "..";
import CaptionIcon, { getCaptionIcon } from "../captionIcon";
import RichHeading from "../richheading";

const Caption = ({
    caption,
    captionOverideProps }) => {
    const breakpoints = Devices.useMedia();
    const containerLayoutProps = getResponsiveProps(breakpoints, captionOverideProps?.container);
    const captionProps = getResponsiveProps(breakpoints, captionOverideProps);
    const titleOverideProps = getResponsiveProps(breakpoints, captionOverideProps?.title);

    return (
        <Container {...containerLayoutProps}>
        <ListBlock {...captionProps}
            role="figure" 
            prefix={getCaptionIcon(caption?.icon) && (
                <CaptionIcon 
                icon={caption?.icon}
                captionIconOverideProps={captionOverideProps?.icon} />
            )}
            title={caption?.title && <RichHeading
                role="caption"
                as="h5"
                color="primary-grey-80"
                appearance="heading-xs"
                heading={caption?.title}
                aria-label={caption?.title}
                {...titleOverideProps}
            />}
        />
    </Container>
    )
}

export default Caption