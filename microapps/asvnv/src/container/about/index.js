import { Container } from "@jds/core";
import PromoBanner from "@asvnv/core/components/banner/promobanner";
import PromoCardBannerVariant1 from "@asvnv/core/components/banner/promocardbanner/variant1"
import useFetch from "@asvnv/core/hooks/usefetch";
import apiList from "api";
import transformAboutPageApiResponse from "transformers/about";
import SectionHeading from "@asvnv/core/components/sectionheading";
import mockData from "@asvnv/api/mock";

const AboutHomeContainer = () => {
    const { content, loading, errorMessage } = useFetch(apiList.getCMSApiUrl("ABOUT_PAGE"), transformAboutPageApiResponse, mockData.ABOUT_PAGE);
    return (
        <Container
        as="div"
        layout="max-width"
        pad="l"
        padPosition="vertical">
         {/* <PromoBanner banner={{}}/> */}
         {
            content?.bannerBlock?.length > 0 ? (content?.bannerBlock || []).map(content => <PromoCardBannerVariant1 banner={content?.banner}/>) : null
         }
         {
            content?.aboutContentBlock?.length > 0 ? (content?.aboutContentBlock || []).map(content => <SectionHeading header={content?.header}/>) : null
         }
         
        </Container>
    )
}

export default AboutHomeContainer;