import createApiRoutes from '@asvnv/api/createApiRoutes'
const cmsApiRoutes= {
    HOME_PAGE: '/v1-home-page',
    SCHEMES_PAGE: '/v1-schemes-page',
    ABOUT_PAGE: '/v1-about-page',
    EVENTS_PAGE: '/v1-events-page'
}

const apiList = createApiRoutes({cmsApiRoutes})


export default apiList;