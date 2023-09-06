import { genericCMSResponseTransformer, getAttributeValue } from '@asvnv/api/utils/transformUtils';
import { defaultProps } from './defaultProps';

const transformEventsPageApiResponse = (response) => {
    const { data } = (response || {});
    let result = {}
    if (data) {
        const eventsBlock = getAttributeValue(data, 'eventsBlock');
        result = {
            eventsBlock: eventsBlock?.length > 0 ? genericCMSResponseTransformer(eventsBlock, defaultProps?.eventsBlock) : null            

        }
    }

    console.log("result:", result);
    return result;
}


export default transformEventsPageApiResponse;