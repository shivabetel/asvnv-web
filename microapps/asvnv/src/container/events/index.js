import PageTemplateContext from "@asvnv/core/contexts/PageTemplateContext";
import useFetch from "@asvnv/core/hooks/usefetch";
import apiList from "api";
import React from "react";
import transformEventsPageApiResponse from "transformers/events";
import { overideProps } from "./overideProps";
import mockData from "@asvnv/api/mock"

const EventsContainer = () => {
    const { content, loading, errorMessage } = useFetch(apiList.getCMSApiUrl("EVENTS_PAGE"), transformEventsPageApiResponse, mockData?.EVENTS_PAGE);
    const { getPageTemplate } = React.useContext(PageTemplateContext)
    const PageTemplate = getPageTemplate({ content, loading, preloader: () => <>loading</>, errorMessage })
    return (
        <PageTemplate
            overideProps={overideProps} />
    )
}

export default EventsContainer;