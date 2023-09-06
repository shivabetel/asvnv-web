import { getAttributeValue } from "@asvnv/api/utils/transformUtils";
import get from "lodash/get"

const transformSchemesPageApiResponse = (response) => {
    const { data } = (response || {});
    let result = {}
    if (data) {
        const schemes = getAttributeValue(data, ['schemes', 'data']);

        result = {
            schemes: (schemes || []).map(scheme => {
                const obj = get(scheme, 'attributes')
                return {
                    ...(obj || {})
                }
            })

        }
    }

    console.log("result:", result);
    return result;
}


export default transformSchemesPageApiResponse;