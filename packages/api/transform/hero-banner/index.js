import { getStrapiMediaPath } from "../../utils/strapiUtils"
import castArray from "lodash/castArray"
import get from "lodash/get"
import { transformHeader } from "../header"
import { transformImage } from "../image"
import trim from 'lodash/trim'
import config from "../../config"
import { transformButton } from "../button"
import { transformCaption } from "../caption"

const getBanner = (banner, defaults) => {
    return banner ? {
        ...banner,
        caption: transformCaption(get(banner, 'caption'), defaults?.caption),
        bannerVideo: getStrapiMediaPath(get(banner, ['bannerVideo', 'url'])),
        bannerImage: (() => {
            const bannerImage = get(banner, ['bannerImage'], {})
            return transformImage(bannerImage)
        })(),
        bannerImages: get(banner, 'bannerImages', []).map(bannerImage =>  transformImage(bannerImage)),
        buttons: get(banner, 'buttons', []).map(button => transformButton(button)),
        target: (() => {
            let targetURL = banner?.target;            
            return targetURL ? (() => {
                if(!(targetURL.includes('http') || targetURL.includes('https'))){                    
                    targetURL = trim(targetURL, '/');                    
                     const basePath = trim(config.getApiBasePath(), '/')
                    return `${basePath}/${targetURL}`
                }
                return targetURL;
             })(): targetURL
        })(),
        languagesBannerVideos: (() => {
            const languagesBannerVideos = get(banner, ['languagesBannerVideos'], [])
            return (languagesBannerVideos|| []).map(bannerVideo =>  ({
                url: getStrapiMediaPath(get(bannerVideo, 'url')),
                language: get(bannerVideo, 'language')
            }))
        })(),
    } : null
}
const transformBanner = (block = []) => {
    const banner = castArray(block).find(obj => obj['__component'] == 'shared.hero-banner')
    return getBanner(banner);
}

const transformHeroCMSResponse = (block = [], defaults = {}) => {
    const banner = castArray(block).find(obj => obj['__component'] == 'blocks.hero')
    return banner ? {
        header: transformHeader(get(banner, 'header'), defaults?.header),
        banner: getBanner(get(banner, 'hero'))
    } : null
}

export {
    transformHeroCMSResponse,
    transformBanner,
    getBanner
}