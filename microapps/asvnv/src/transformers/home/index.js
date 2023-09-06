import { genericCMSResponseTransformer, getAttributeValue } from '@asvnv/api/utils/transformUtils';
import { defaultProps } from './defaultProps';
import get from "lodash/get"
import { transformHeaderCMSResponse } from '@asvnv/api/transform/header';

const transformHomePageApiResponse = (response) => {
    const { data } = (response || {});
    let result = {}
    if (data) {
        const carouselBlock = getAttributeValue(data, 'carouselBannerBlock');
        const schemesBlock = getAttributeValue(data, 'schemesBlock');
        const downloadAppBlock = getAttributeValue(data, 'downloadAppBlock');
        const schemes = getAttributeValue(data, ['schemes', 'data'])
        result = {
            carouselBlock: carouselBlock?.length > 0 ? genericCMSResponseTransformer(carouselBlock, defaultProps?.carouselBlock) : null,
            schemes: (schemes || []).map(scheme => {
                const obj = get(scheme, 'attributes')
                return {
                    ...(obj || {})
                }
            }),
            schemesBlock: schemesBlock?.length > 0 ? genericCMSResponseTransformer(schemesBlock, defaultProps?.schemesBlock) : null,
            downloadAppBlock: downloadAppBlock?.length > 0 ? genericCMSResponseTransformer(downloadAppBlock, defaultProps?.downloadAppBlock) : null,

        }
    }

    console.log("result:", result);
    return result;
}


export default transformHomePageApiResponse;