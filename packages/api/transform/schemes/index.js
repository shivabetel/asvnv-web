import castArray from "lodash/castArray"
import get from "lodash/get"
const transformSchemesCMSResponse = (block) => {
    const obj = castArray(block).find(obj => obj['__component'] == 'blocks.schemes')
    return obj ? (() => {
        const schemes = get(obj, 'schemes');
        return (schemes || []).map(obj => {
            const scheme = get(obj, ['scheme', 'data']);
            return {
                ...(obj || {}),
                scheme: {
                    ...(scheme?.attributes || {})
                }
            }
        })
    })() : null
}

export {
    transformSchemesCMSResponse
}