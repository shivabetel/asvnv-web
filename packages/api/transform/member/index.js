import { getStrapiMediaPath } from "../../utils/strapiUtils"
import castArray from "lodash/castArray"
import get from "lodash/get"

const transformMembersCMSResponse = (block) => {
    const obj = castArray(block).find(obj => obj['__component'] == 'blocks.members')
    return obj ? (obj?.members || []).map(member => ({
        ...member,
        avatar: getStrapiMediaPath(get(member, 'avatar')),
    })) : null;
}


export {
    transformMembersCMSResponse
}