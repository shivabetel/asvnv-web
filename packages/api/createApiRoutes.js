import config from "./config";

const outputUrls = (urls, prefix) => {
    const keys = Object.keys(urls);
    const ret = {};

    for (let key of keys) {
        ret[key] = prefix + urls[key];
    }
    return ret;
};


const createURLS = (cmsApiRoutes = {}, apiRoutes = {}) => {
    return {
        CMS: {
            API_BASE_PATH: config.getCmsBasePath(),
            URLS: outputUrls(Object.assign({}, cmsApiRoutes ), config.getCmsBasePath())
        }
    }

}


// export const getAzureStoragePath = () => {
//     return config.getStrapiStoragePath();
// }

const createApiRoutes = ({cmsApiRoutes = {}, apiRoutes = {}}) => {
    const APIs =  createURLS(cmsApiRoutes, apiRoutes)
      return {
          getCMSApiUrl(key) {
              return APIs['CMS']?.['URLS']?.[key]
          }
      }
  }


export default createApiRoutes;
