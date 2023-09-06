/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { Container, Heading, Text } from "@jds/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



const menulink = css`
color: var(--color-secondary-grey-100);
padding: 0.5rem 1rem;
position: relative;
display: block;
:hover {
    color: var(--color-primary-50);
}
:hover::after {
    background-color: var(--color-primary-50);
}
// ::after{
//     position: absolute;
//     height: 100%;
//     width: 2px;
//     background-color: var(--color-primary-grey-20);
//     left: 0;
//     top: 0;
//     content: "";
// }

`

const active = css`
color: var(--color-primary-50);
::after{
    background-color: var(--color-primary-50);
}
`

const QuickLinks = ({ quickLinks, updateSelectedLink, activeSchemeId}) => {
    const [activeLink, setActiveLink] = useState("all");
    const routerNavigate = useNavigate();
    useEffect(() => {
        setActiveLink(activeSchemeId)
    }, [activeSchemeId])


    const handleEventClick = (link) => {
        if (link?.id !== activeLink) {                      
            // allSectionRefs[link?.title]?.scrollIntoView({
            //     id: link?.title,
            //     behavior: "smooth"
            // })
            setActiveLink(link?.id)
            // updateSelectedLink && updateSelectedLink(link?.id);
            routerNavigate(`/schemes/${link?.id}`)
        }
    }


    return (
        <Container>
            <Container as="div">
                {
                    (quickLinks || []).map((quickLink, index) => (
                        <Container
                            key={index}
                            onClick={() => handleEventClick(quickLink)}
                            pad="s"
                            padPosition="vertical">
                            <li css={[menulink, activeLink == quickLink?.id ? active : '']} >
                                <Heading appearance="heading-xxs">{quickLink?.title}</Heading>
                            </li>
                        </Container>
                    ))
                }
            </Container>
        </Container>
    )
}


export default QuickLinks;