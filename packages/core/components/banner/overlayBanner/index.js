
import CardOverLayBanner from "./cardoverlaybanner";
import FullWidthOverlayBanner from './fullwidthbanner';



const OverlayBanner = ({ type, ...restOfProps }) => {

    switch (type) {
        case 'card':
            return <CardOverLayBanner {...restOfProps} />
        default:
            return <FullWidthOverlayBanner {...restOfProps} />
    }

}


export default OverlayBanner;