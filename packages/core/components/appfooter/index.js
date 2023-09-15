import { Footer, Icon } from "@jds/core";
import React from "react";
import useAppContext from "../../hooks/useAppContext";


const AppFooter = ({ sitesHeaderFooterLoaded }) => {
    const { getConfig } = useAppContext();
    const footer = getConfig('footer') || {}
    const appLogo = getConfig('appLogo')
    const { links = {}, visible } = footer;
    const {
        footerLinks,
        socialNetworkLinks,
        marketplace,
        // bottomLinks
    } = links;
    return (
        <Footer
                        sitesHeaderFooterLoaded={sitesHeaderFooterLoaded}
                        logo={<Icon ic={<img alt="logo" src="https://storage.googleapis.com/asvnvs/logo.jpeg"></img>}/>}
                        //bottomLinks={[...bottomLinks]}
                        copyright="Copyright © 2023 ASVNV old students association. All rights reserved."
                        links={[...footerLinks]}
                        marketplace={{ ...marketplace }}
                        marketplaceLinks={2}
                        social={{ ...socialNetworkLinks }}
                    />

    )
}

export default AppFooter