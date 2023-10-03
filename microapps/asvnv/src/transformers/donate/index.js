import { genericCMSResponseTransformer, getAttributeValue } from "@asvnv/api/utils/transformUtils";
import { defaultProps } from "./defaultProps";

const transformDonatePageApiResponse = (response) => {
    const { data } = (response || {});
    let result = {}
    if (data) {
        const contentBlock = getAttributeValue(data, 'contentBlock');
        // const schemesBlock = getAttributeValue(data, 'schemesBlock');
        // const downloadAppBlock = getAttributeValue(data, 'downloadAppBlock');
        // const schemes = getAttributeValue(data, ['schemes', 'data'])
        result = {
            contentBlock: contentBlock?.length > 0 ? genericCMSResponseTransformer(contentBlock, defaultProps?.contentBlock) : null,           

        }
    }

    console.log("result:", result);
    return result;
}

export default transformDonatePageApiResponse;