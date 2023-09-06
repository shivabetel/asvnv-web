import trim from 'lodash/trim'
import config from "../config"

const { getStrapiStoragePath } = config;

const getStrapiMediaPath = (image_url) => {
    return image_url ? (() => {
       if(!(image_url.includes('http') || image_url.includes('https'))){
            image_url = trim(image_url, '/')
            const basePath = trim(getStrapiStoragePath(), '/')
           return `${basePath}/${image_url}`
       }
       return image_url;
    })(): image_url
}


export {
    getStrapiMediaPath
}