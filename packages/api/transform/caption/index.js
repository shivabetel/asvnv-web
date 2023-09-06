import { getStrapiMediaPath } from "../../utils/strapiUtils";
import get from "lodash/get"

const transformCaption = (caption, defaults) => {

    return caption ? {
        ...caption,
        icon: caption.icon ? {
            ...caption.icon,
            size: (() => {
                const size = get(caption.icon, 'size')
                return size ? size : defaults?.icon?.size
            })(),
            url: getStrapiMediaPath(get(caption.icon, 'url'))
        } : null
    } : null
}

export {
    transformCaption
}
