import castArray from "lodash/castArray"
import get from "lodash/get"
import { getBanner } from "../hero-banner"


const transformCarouselBanner = (block) => {
    const carouselHeroBannerBlock = castArray(block).find(obj => obj['__component'] == 'blocks.carousel-hero-banner')
    const carouselDetails = get(carouselHeroBannerBlock, 'carouselDetails', [])

    return carouselDetails.map(carouselDetail => getBanner(carouselDetail))
}

export {
     transformCarouselBanner
}