import { genericCMSResponseTransformer, getAttributeValue } from '@asvnv/api/utils/transformUtils';
import { defaultProps } from './defaultProps';

const transformAboutPageApiResponse = (response) => {
    const { data } = (response || {});
    let result = {}
    if (data) {
        const bannerBlock = getAttributeValue(data, 'bannerBlock');
        const aboutContentBlock = getAttributeValue(data, 'aboutContentBlock');
        result = {
            bannerBlock: bannerBlock?.length > 0 ? genericCMSResponseTransformer(bannerBlock, defaultProps?.bannerBlock) : null,
            aboutContentBlock: aboutContentBlock?.length > 0 ? genericCMSResponseTransformer(aboutContentBlock, defaultProps?.aboutContentBlock) : null,

        }
    }

    console.log("result:", result);
    return result;
}


export default transformAboutPageApiResponse;