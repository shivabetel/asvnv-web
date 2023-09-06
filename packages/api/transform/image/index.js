import { getStrapiMediaPath } from "../../utils/strapiUtils"
import castArray from "lodash/castArray"
import get from "lodash/get"

const transformImage = (imageObj) => {
    return imageObj ? {
        ...imageObj,
        desktop: getStrapiMediaPath(get(imageObj, 'desktop')),
        mobile: getStrapiMediaPath(get(imageObj, 'mobile')),
    } : null
}
const transformImageCMSResponse = (block) => {
    const imageObj = castArray(block).find(obj => obj['__component'] == 'shared.image')
    return transformImage(imageObj)
}


export {
    transformImageCMSResponse,
    transformImage
}