import castArray from "lodash/castArray"


const transformRichTextCMSResponse = (block, defaults = {}) => {
    const obj = castArray(block).find(obj => obj['__component'] == 'blocks.rich-text');
    return obj?.text
    
}

export {
    transformRichTextCMSResponse
}
