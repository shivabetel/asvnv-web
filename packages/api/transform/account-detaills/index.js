import castArray from "lodash/castArray"


const transformAccountDetailsCMSResponse = (block, defaults = {}) => {
    const obj = castArray(block).find(obj => obj['__component'] == 'blocks.account-detaills');
    return (obj?.details || []).map(detail => detail)
    
}

export {
    transformAccountDetailsCMSResponse
}
