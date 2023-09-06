import isNil from "lodash/isNil"
import castArray from "lodash/castArray"
import get from "lodash/get"
import { transformButton } from "../button"

const transformButtonGroup = (obj, defaults) => {
    return obj ? {
        buttons: obj?.buttons && obj?.buttons?.length > 0 ? obj?.buttons.map(button => transformButton(button)) : undefined,
        alignDesktop: (() => {
            const value = get(obj, 'alignDesktop')
           return isNil(value) ? (defaults?.alignDesktop || 'center') : value
        })(),
        alignTablet: (() => {
            const value = get(obj, 'alignTablet')
           return isNil(value) ? (defaults?.alignTablet  || 'center') : value
        })(),
        alignMobile: (() => {
            const value = get(obj, 'alignMobile')
            return isNil(value) ? (defaults?.alignMobile  || 'center') : value
        })()
    } : null
}

const transformButtonGroupCMSResponse = (block, defaults = {}) => {
    const obj = castArray(block).find(obj => obj['__component'] == 'blocks.button-group')
    return transformButtonGroup(obj, defaults?.buttonGroup)
    
}

export {
    transformButtonGroupCMSResponse,
    transformButtonGroup
}