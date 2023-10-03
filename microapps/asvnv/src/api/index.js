import createApiRoutes from '@asvnv/api/createApiRoutes'
const cmsApiRoutes= {
    HOME_PAGE: '/v1-home-page',
    SCHEMES_PAGE: '/v1-schemes-page',
    ABOUT_PAGE: '/v1-about-page',
    EVENTS_PAGE: '/v1-events-page',
    DONATE_PAGE: '/v1-donate-page',
    COMMITTEE_PAGE: '/v1-committee-page'
}

const apiList = createApiRoutes({cmsApiRoutes})


export default apiList;