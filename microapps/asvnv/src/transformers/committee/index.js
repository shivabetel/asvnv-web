import { genericCMSResponseTransformer, getAttributeValue } from "@asvnv/api/utils/transformUtils";
import { defaultProps } from "./defaultProps";

const transformCommitteePageApiResponse = (response) => {
    const { data } = (response || {});
    let result = {}
    if (data) {
        const contentBlock = getAttributeValue(data, 'contentBlock');
        result = {
            contentBlock: contentBlock?.length > 0 ? genericCMSResponseTransformer(contentBlock, defaultProps?.contentBlock) : null,           

        }
    }

    console.log("result:", result);
    return result;
}

export default transformCommitteePageApiResponse;