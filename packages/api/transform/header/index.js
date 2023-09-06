import isNil from "lodash/isNil"
import get from "lodash/get"
import castArray from "lodash/castArray"
import { transformCaption } from "../caption"


const transformHeader = (header, defaults) => {
    return header ? {
        ...header,
        caption: transformCaption(header?.caption),
        textAlignDesktop: (() => {
            const value = get(header, 'textAlignDesktop')
           return isNil(value) ? (defaults?.textAlignDesktop || 'center') : value
        })(),
        textAlignTablet: (() => {
            const value = get(header, 'textAlignTablet')
           return isNil(value) ? (defaults?.textAlignTablet  || 'center') : value
        })(),
        textAlignMobile: (() => {
            const value = get(header, 'textAlignMobile')
            return isNil(value) ? (defaults?.textAlignMobile  || 'center') : value
        })()
    } : null
}

const transformHeaderCMSResponse = (block = [], defaults) => {
    const header = castArray(block).find(obj => obj['__component'] == 'shared.header')
    return transformHeader(header, defaults?.header)
}

export {
    transformHeaderCMSResponse,
    transformHeader
}