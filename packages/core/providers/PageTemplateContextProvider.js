import { useCallback } from "react"
import { ErrorModal } from "../components"
import CarouselBannerTemplate from "../components/templates/carouselbanner"
import PageTemplateContext from "../contexts/PageTemplateContext"
import EventsTemplate from "../components/templates/events"




const Templates = {
    "carouselBanners": CarouselBannerTemplate,
    "events": EventsTemplate
    // "mobileRechargeModal": MobileRechargeModal
}

const PageTemplateContextProvider = ({
    children
}) => {
    const getPageTemplate = useCallback(({ content, loading, preloader, errorMessage }) => {
        if (loading) {
            return preloader;
        }
        if (errorMessage) {
            return <ErrorModal errorMessage={errorMessage} />
        }
        return ({ analyticsEvents, overideProps}) => {
            return (
                <>
                    {
                        Object.entries(content || {}).map(([key, obj]) => {
                            if (Array.isArray(obj)) {
                                return obj.map(content => {
                                    const templateNames = Object.keys(content);
                                    return (templateNames || []).map(templateName => {
                                        const Template = Templates[templateName];
                                        return Template ? (
                                            <>
                                                {
                                                    templateName === 'header' ? <Template
                                                        header={content[templateName]}
                                                        loading={loading}
                                                        overideProps={overideProps?.[key]?.[templateName]}
                                                    // {...(overideProps?.[key] || {})}
                                                    /> : <Template
                                                        content={content[templateName]}
                                                        loading={loading}
                                                        analyticsEvents={analyticsEvents?.[key]}
                                                        overideProps={overideProps?.[key]?.[templateName]}
                                                    // {...(overideProps?.[key] || {})}
                                                    />
                                                }
                                            </>

                                        ) : <></>
                                    })
                                })
                            }
                        })
                    }
                </>
            )
        }
    }, [])
    return <PageTemplateContext.Provider value={{
        getPageTemplate
    }}>
        {
            children
        }
    </PageTemplateContext.Provider>
}

export default PageTemplateContextProvider;