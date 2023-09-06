import useFetch from "@asvnv/core/hooks/usefetch"
import { Container, Grid } from "@jds/core"
import apiList from "api"
import transformSchemesPageApiResponse from "transformers/schemes";
import DetailsHome from "./detail";
import mockData from "@asvnv/api/mock";

const SchemesHomeContainer = () => {
    const { content, loading, errorMessage } = useFetch(apiList.getCMSApiUrl("SCHEMES_PAGE"), transformSchemesPageApiResponse, mockData.SCHEMES_PAGE);

   
    return (
       <DetailsHome 
       content={content}/>
    )
}

export default SchemesHomeContainer