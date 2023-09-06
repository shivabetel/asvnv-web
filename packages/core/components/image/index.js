import { Devices } from "@jds/core";
import React from "react";


const Image = ({ image, alt, imageStyles, ...restOfProps }) => {
    let image_url;
    let alttext;
    alttext = (image && image?.alttext )? image?.alttext : (alt ? alt : 'image');
    imageStyles = imageStyles || {}

    image && (Devices.isDesktop() && (image_url = image?.desktop),
        Devices.isTablet() && (image_url = image?.mobile ? image?.mobile : image?.desktop))

    if(!image_url){
        return <></>;
    }    
    return <img role="img" style={{width: '100%', ...imageStyles}} src={image_url} alt={alttext} title={alttext} {...restOfProps}></img>
}

export default Image;