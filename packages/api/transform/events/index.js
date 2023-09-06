import castArray from "lodash/castArray"
import get from "lodash/get"
import { transformImage } from "../image"


const transformEventsCMSResponse = (block) => {
    const eventsObj = castArray(block).find(obj => obj['__component'] == 'blocks.events')
    return eventsObj ? (() => {
        const events = get(eventsObj, 'events', []);
        return (events || []).map(event => {
            const images = get(event, 'images', []);
            const thumbnails = get(event, 'thumbnails', [])
            return {
                ...(event||{}),
                images: (images || []).map(image => transformImage(image)),
                thumbnails: (thumbnails || []).map(thumbnail => transformImage(thumbnail))
            }
        })
    })() : null;
}

export {
    transformEventsCMSResponse
}