import { Devices } from "@jds/core";
import { mockRouter, mockUseMedia } from '@jiocms/test/utils';
import { render, screen, waitForElement } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import JButton from "../../../button";
import OverlayBanner from "..";
import RichHeading from "../../../richheading";
import RichText from "../../../richtext";

Devices.useMedia = jest.fn(mockUseMedia)

const content = {
    "banner": {
        "id": 24,
        "__component": "shared.hero-banner",
        "headerText": "Supercharge your business",
        "footerText": "End-to-end digital solutions to streamline processes and accelerate growth.",
        "target": null,
        headerAlignDesktop: 'right',
        "buttons": [
            {
                "id": 99,
                "theme": "primary",
                "label": "Explore JioBusiness",
                "target": "https://www.jio.com/business/",
                "iconPosition": "right",
                "isExternal": null,
                "targetModal": "playvideo-modal-1",
                "myjioTarget": null,
                "icon": null
            }
        ],
        "bannerImage": {
            "desktop": "https://jep-asset.akamaized.net/cms/assets/home/Supercharge-horiontal.png",
            "mobile": "https://jep-asset.akamaized.net/cms/assets/home/Supercharge.png"
        },
        "caption": null
    }
}

const renderCardOverlayBanner = () => render(
    <RouterContext.Provider value={mockRouter}>
        <OverlayBanner banner={{
            ...content?.banner,
            caption: {
                title: 'test',
                icon: {
                    svg: '',
                    url: 'https://jep-asset.akamaized.net/jio/svg/logo/myjio-n.svg'
                }
            }
        }} 
        type="card" 
        ariaLabel={content?.banner?.headerText} 
        overlayHeaderStyles={{}}/>
    </RouterContext.Provider>
)


describe("Carousel overlay header banner", () => {
    it("should be rendered properly with type as card", async () => {
        renderCardOverlayBanner();
        const banner = await waitForElement(() => screen.queryByRole("banner", { name: "Supercharge your business" }))
        expect(banner).toBeInTheDocument();
    })

    it("should be rendered properly with type as card in mobile", async () => {
        Devices.useMedia = jest.fn(() => ({
            desktop: false,
            mobile: true,
            tablet: false
        }))
        renderCardOverlayBanner();
        const banner = await waitForElement(() => screen.queryByRole("banner", { name: "Supercharge your business" }))
        expect(banner).toBeInTheDocument();
    })

    it("should be rendered properly with type as card in tablet", async () => {
        Devices.useMedia = jest.fn(() => ({
            desktop: false,
            mobile: false,
            tablet: true
        }))
        renderCardOverlayBanner();
        const banner = await waitForElement(() => screen.queryByRole("banner", { name: "Supercharge your business" }))
        expect(banner).toBeInTheDocument();
    })
    

    it('should render properly if caption, title , description are passed as element', () => {
        render(<RouterContext.Provider value={mockRouter}>
            <OverlayBanner banner={{
                "id": 24,
                "__component": "shared.hero-banner",
                "caption":  <RichHeading heading="test" />,
                "headerText": <RichHeading heading="Supercharge your business" />,
                "footerText": <RichText text="End-to-end digital solutions to streamline processes and accelerate growth." />,
                "target": null,
                "buttons": [
                    {
                        "id": 99,
                        "theme": "primary",
                        "label": "Explore JioBusiness",
                        "target": "https://www.jio.com/business/",
                        "iconPosition": "right",
                        "isExternal": null,
                        "targetModal": null,
                        "myjioTarget": null,
                        "icon": null
                    }
                ],
                "bannerImage": {
                    "desktop": "https://jep-asset.akamaized.net/cms/assets/home/Supercharge-horiontal.png",
                    "mobile": "https://jep-asset.akamaized.net/cms/assets/home/Supercharge.png"
                }
            }} type="card" ariaLabel={content?.banner?.headerText} />
        </RouterContext.Provider>)

        const banner = screen.queryByRole("banner", { name: "Supercharge your business" })
        expect(banner).toBeInTheDocument();


    })

    it('should render properly if button is passed as a element', () => {
        render(<RouterContext.Provider value={mockRouter}>
            <OverlayBanner banner={{
                "id": 24,
                "__component": "shared.hero-banner",
                "caption":  <RichHeading heading="test" />,
                "headerText": <RichHeading heading="Supercharge your business" />,
                "footerText": <RichText text="End-to-end digital solutions to streamline processes and accelerate growth." />,
                "target": null,
                "buttons": [
                    <JButton button={{
                        "id": 99,
                        "theme": "primary",
                        "label": "Explore JioBusiness",
                        "target": "https://www.jio.com/business/",
                        "iconPosition": "right",
                        "isExternal": null,
                        "targetModal": null,
                        "myjioTarget": null,
                        "icon": null
                    }}/>
                ],
                "bannerImage": {
                    "desktop": "https://jep-asset.akamaized.net/cms/assets/home/Supercharge-horiontal.png",
                    "mobile": "https://jep-asset.akamaized.net/cms/assets/home/Supercharge.png"
                }
            }} type="card" ariaLabel={content?.banner?.headerText} />
        </RouterContext.Provider>)

        const banner = screen.queryByRole("banner", { name: "Supercharge your business" })
        expect(banner).toBeInTheDocument();


    })


})
