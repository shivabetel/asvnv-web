import castArray from "lodash/castArray";
import get from "lodash/get";
import { transformButtonCMSResponse } from "../transform/button";
import { transformButtonGroupCMSResponse } from "../transform/button-group";
import { transformCarouselBanner } from "../transform/carousel-banner";
import { transformHeaderCMSResponse } from "../transform/header";
import { transformBanner, transformHeroCMSResponse } from "../transform/hero-banner";
import { transformImageCMSResponse } from "../transform/image";
import { transformEventsCMSResponse } from "../transform/events"
import { transformSchemesCMSResponse } from "../transform/schemes"
import { transformAccountDetailsCMSResponse } from "../transform/account-detaills"
import { transformRichTextCMSResponse } from "../transform/rich-text"
import { transformImagesCMSResponse } from "../transform/image"
import { transformMembersCMSResponse } from "../transform/member"

const componentTransformerMap = {
  "shared.header": {
    key: "header",
    transformer: (data, defaults) => transformHeaderCMSResponse(data ? [data] : [], defaults),
  },
  "shared.hero-banner": {
    key: "banner",
    transformer: (data, defaults) => transformBanner(data ? [data] : [], defaults),
  },
  "shared.button": {
    key: "button",
    transformer: (data, defaults) => transformButtonCMSResponse(data ? [data] : [], defaults),
  },
  "shared.image": {
    key: "image",
    transformer: (data, defaults) => transformImageCMSResponse(data ? [data] : [], defaults),
  },
  "blocks.hero": {
    key: "heroBanner",
    transformer: (data, defaults) => transformHeroCMSResponse(data ? [data] : [], defaults),
  },
  "blocks.carousel-hero-banner": {
    key: "carouselBanners",
    transformer: (data, defaults) => transformCarouselBanner(data ? [data] : [], defaults),
  },
  "blocks.button-group": {
    key: "buttonGroup",
    transformer: (data, defaults) => transformButtonGroupCMSResponse(data ? [data] : [], defaults),
  },
  "blocks.events": {
    key: "events",
    transformer: (data, defaults) => transformEventsCMSResponse(data ? [data] : [], defaults),
  },
  "blocks.schemes": {
    key: "schemes",
    transformer: (data, defaults) => transformSchemesCMSResponse(data ? [data] : [], defaults),
  },
  'blocks.account-detaills': {
    key: 'accountDetails',
    transformer: (data, defaults) => transformAccountDetailsCMSResponse(data ? [data] : {}, defaults)
  },
  'blocks.rich-text': {
    key: 'richText',
    transformer: (data, defaults) => transformRichTextCMSResponse(data ? [data] : {}, defaults)
  },
  'blocks.images': {
    key: 'images',
    transformer: (data, defaults) => transformImagesCMSResponse(data ? [data] : {}, defaults)
  },
  "blocks.members": {
    key: 'members',
    transformer: (data, defaults) => transformMembersCMSResponse(data ? [data] : {}, defaults)
  }
};

const groupItemsByComponent = (block) => {
  return (block || []).reduce((acc, block) => {
    if (acc[block["__component"]]) {
      acc[block["__component"]].push(block);
    } else {
      acc[block["__component"]] = [block];
    }
    return acc;
  }, {});
};


export const genericCMSResponseTransformer = (block, defaults = {}) => {
  return block
    ? (() => {
      const groupedItems = groupItemsByComponent(block);
      const blockToLoop = Object.keys(groupedItems)
        .map((key) => groupedItems[key])
        .sort((a, b) => b.length - a.length)[0];

      let result = [];
      for (let i = 0; i < blockToLoop.length; ++i) {
        result.push(
          Object.keys(groupedItems).reduce((acc, key) => {
            return {
              ...acc,
              [componentTransformerMap[key]?.["key"]]: componentTransformerMap[key]?.transformer(groupedItems?.[key]?.[i], defaults),
            };
          }, {})
        );
      }
      return result;
    })()
    : null;
};

export const getAttributeValue = (data, property, defaultValue) => get(data, ['attributes', ...castArray(property)], defaultValue)
