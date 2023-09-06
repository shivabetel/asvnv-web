import { getStrapiMediaPath } from "../../utils/strapiUtils"
import get from "lodash/get"


const transformIcon = (icon) => {
    return icon ? {
        svg: icon?.svg,
        url: getStrapiMediaPath(get(icon, ['url']))
    } : null
}


export {
    transformIcon
}
