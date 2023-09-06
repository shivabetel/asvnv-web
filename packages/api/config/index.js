import { CMS_BASE_PATH, API_BASE_PATH, STRAPI_MEDIA_STORAGE_ENDPOINT } from "./api-base-paths"
export default {
    getCmsBasePath(){
        return CMS_BASE_PATH[process.env.NODE_ENV];
    },
    getStrapiStoragePath(){
        return STRAPI_MEDIA_STORAGE_ENDPOINT[process.env.NODE_ENV];
    }
}