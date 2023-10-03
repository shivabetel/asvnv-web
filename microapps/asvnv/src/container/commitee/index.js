/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import useFetch from "@asvnv/core/hooks/usefetch";
import apiList from "api";
import transformCommitteePageApiResponse from "transformers/committee";
import mockCommitteePageApiResponse from "@asvnv/api/mock/committee-page"
import { Card, Container, Grid, Heading, Text } from "@jds/core";
import SectionHeading from "@asvnv/core/components/sectionheading";
import { useEffect, useState } from "react";
import RichText from "@asvnv/core/components/richtext";


const membersGridCss = css`
  padding-bottom: 2rem;
`

const memberCardCss = css`
 .j-card__content{
    text-align: center;
 }
`

export const Members = ({
    members
}) => {
    const [levels, setLevels] = useState([]);
    useEffect(() => {

        let start = 0;
        let end = 4;
        const levels = [];
        let index = 0;
        while (start < members?.length) {

            const batch = (members || []).slice(start, end)
            levels.push(batch)
            setLevels(levels);
            start = end;            
            end = end + (index >= 2  ? 3 : 4);
            index = index + 1;
        }

    }, [members])


    return (
        <Container>
            {
                (levels || []).map((members, index) => (
                    <Grid
                        template={`repeat(${index >=3 ? 3 : 4},1fr)`}
                        templateMobile="1fr"
                        templateTablet="repeat(2, 1fr)"
                        key={index}
                        css={membersGridCss}>
                        {
                            (members || []).map((member, index) => (
                                <Card
                                    css={memberCardCss}
                                    className="h-100"
                                    background="white"
                                    image={(
                                        <img
                                            src={member?.avatar}
                                            alt="avatar"
                                            style={{ objectFit: 'contain', backgroundColor: 'white' }}
                                        />
                                    )}
                                    imageRatio="landscape"
                                    imageFocus="center"
                                    title={<Heading appearance="heading-xxs">{member?.name}</Heading>}
                                    description={<RichText appearance="body-xs" text={member?.role}/>}>

                                </Card>                                
                            ))
                        }
                    </Grid>
                ))
            }
        </Container>
    )
}
const ExecutiveCommitteeContainer = () => {
    const { content, loading, errorMessage } = useFetch(apiList.getCMSApiUrl("COMMITTEE_PAGE"), transformCommitteePageApiResponse, mockCommitteePageApiResponse);

    return (
        <Container layout="max-width">
            {
                (content?.contentBlock || []).map((cont, index) => {
                    return (
                        <Container
                            as="div"
                            key={index}>
                            {
                                cont?.header && (
                                    <Container
                                        as="div"
                                        pad="l"
                                        padPosition="vertical">
                                        <SectionHeading
                                            header={cont?.header} />
                                    </Container>
                                )
                            }
                            <Members members={cont?.members} />
                        </Container>
                    )

                })
            }
        </Container>
    )
}

export default ExecutiveCommitteeContainer;