import { getStrapiMediaPath } from "./../../utils/strapiUtils";
import config from "../../config"
import castArray from "lodash/castArray"
import get from "lodash/get";
import trim from 'lodash/trim'

const transformButton = (button) => {
    return button ? {
        ...button,
        icon: button?.icon ? {
            ...button.icon,
            url: getStrapiMediaPath(get(button, ['icon', 'url']))
        } : null,
        dataMode: get(button, "dataMode"),
        ariaLabel: get(button, "ariaLabel") || get(button, 'label'),
        // target: (() => {
        //     let targetURL = button?.target;            
        //     return targetURL ? (() => {
        //         if(!(targetURL.includes('http') || targetURL.includes('https'))){                    
        //             targetURL = trim(targetURL, '/');                    
        //              const basePath = trim(config.getApiBasePath(), '/')
        //             return `${basePath}/${targetURL}`
        //         }
        //         return targetURL;
        //      })(): targetURL
        // })(),
        propagateBrowserUrlParams: get(button, "propagateBrowserUrlParams", false),
    } : null
}

const transformButtonCMSResponse = (block) => {
    const button = castArray(block).find(obj => obj['__component'] == 'shared.button')
    return transformButton(button)
}


export {
    transformButtonCMSResponse,
    transformButton
}