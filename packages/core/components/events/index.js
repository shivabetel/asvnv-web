/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Button, Card, Container, Devices, Grid, Heading, Icon, Input, Space, Text, Divider } from "@jds/core";
import Image from "../image";
import { lAlignCenter } from "../../styles";
import ImageGallery from "react-image-gallery";
import { useCallback, useEffect, useState } from "react";
import { IcClose } from "@jds/core-icons";
import RichText from "@asvnv/core/components/richtext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import EventInfoModal from "./modal/info";
import EventFilters from "./filter"
import EventFiltersModal from "./modal/filter"



const imagesContainer = css`
--overlay-rgb: 11,20,26;
display: flex;
    flex-flow: wrap;
    // width: max-content;
    // max-width: 500px;
`

const card = css`
margin-bottom: 1rem;

`

const imageContainer = css`
flex-basis: 50%;
padding: 2px;
position: relative;
width: 165px;
    height: 168px;
`

const gradient = css`
:before{
    content: "";
    background: rgba(var(--overlay-rgb),.6);
    width: 100%;
    height: 100%;
    position: absolute;
    border-radius: var(--radius-medium);
}
`

const image = css`
height: 100%;
border-radius: var(--radius-medium);
object-fit: cover;
`

const countCss = css`
position: absolute;
top: 0;
height: 100%;
width: 100%;
display: flex;
justify-content: center;
align-items: center;

`

const fullViewImageGalleryCss = css`
position: fixed;
    top: 0;
    width: 100%;
    height: 100vh;
    background: hsla(0,0%,100%,0.96);
    @media screen and (max-width: 61.9375rem){
        display: flex;
        align-items: center;
    }
`

const closeIconContainerCss = css`
position: absolute;
right: 5rem;
z-index: 5;
span{
    cursor: pointer;
}
@media screen and (max-width: 61.9375rem){
    top: 1rem;
    right: 1rem;
}
`
const FullViewImageGallery = ({
    images,
    toggleShowImageGallery
}) => {
    return (
        <Container
            pad="l"
            padPosition="all"
            css={fullViewImageGalleryCss}>
            <div css={closeIconContainerCss}
                onClick={toggleShowImageGallery}>
                <Icon
                    ic={<IcClose />}
                    size="xl"
                    color="primary" />
            </div>
            <ImageGallery
                items={images}
                showPlayButton={false} />
        </Container>
    )
}
const EventImages = ({
    thumbnails,
    images,
    ...rest
}) => {

    const showFullViewImageGallery = useCallback(() => {
        rest?.showFullViewImageGallery && rest?.showFullViewImageGallery(images);
    }, [images, rest?.showFullViewImageGallery])
    return (
        <>
            {
                <div css={imagesContainer}>
                    {
                        (thumbnails || []).slice(0, 4).map((thumbnail, index) => {
                            const remainingImages = parseInt(images?.length) - 4;
                            return (
                                <>
                                    <div
                                        css={[imageContainer, index == 3 && remainingImages > 4 && gradient]}>
                                        <a onClick={showFullViewImageGallery}>
                                            <Image
                                                image={thumbnail}
                                                css={image} />
                                            {
                                                index == 3 && remainingImages > 4 && (
                                                    <div css={countCss}>
                                                        <Heading color="white">{`+${remainingImages}`}</Heading>
                                                    </div>
                                                )
                                            }
                                        </a>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
            }
        </>
    )
}


const Events = ({
    events,
    overideProps
}) => {

    const [showImageGallery, setShowImageGallery] = useState(false);
    const [selectedEventImages, setSelectedEventImages] = useState([]);
    const [eventFilters, setEventFilters] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState();
    const [allEvents, setAllEvents] = useState(events);
    const [showEventFiltersModal, setShowEventFiltersModal] = useState(false)

    useEffect(() => {
        events?.length > 0 && (() => {
            const filters = (events || []).map(({ title }) => ({
                label: title,
                checked: false
            }))
            setEventFilters(filters)
        })()
    }, [events])

    const toggleShowImageGallery = useCallback(() => {
        setShowImageGallery(!showImageGallery);
    }, [showImageGallery])

    const showFullViewImageGallery = useCallback((images) => {
        setSelectedEventImages(images);
        toggleShowImageGallery();
    }, [showImageGallery, selectedEventImages])
    


    const breakpoints = Devices.useMedia();


    const handleApplyFilter = (eventFilters) => {
        if (eventFilters?.filter(filter => filter?.checked).length == 0) {
            setAllEvents(events)
        } else {
            setAllEvents(events.filter(event => eventFilters.some(filter => filter?.checked && filter?.label == event?.title)))
        }
    }



    const handleEventInfoClick = (event) => {
        setSelectedEvent(event)
    }

    const onCloseEventInfoModal = () => {
        setSelectedEvent(null)
    }

    const toggleFilterModal = () => {
        setShowEventFiltersModal(!showEventFiltersModal)
    }


    return (
        <>
            <Container
                // layout="max-width"
                pad="l"
                padPosition="all"
                as="div">
                <Grid template="15% 80%"
                    templateMobile="1fr"
                    templateTablet="1fr"
                    style={{ alignItems: 'flex-start' }}>
                    <Container>
                        {
                            breakpoints?.tablet && (
                                <Container
                                    layout="flex"
                                    style={{ justifyContent: 'flex-end' }}>
                                    <Button
                                        kind="secondary"
                                        onClick={toggleFilterModal}
                                        title="ಫಿಲ್ಟರ್"
                                        icon={<Icon ic={<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 11H7a1 1 0 000 2h10a1 1 0 000-2zm-3 6h-4a1 1 0 000 2h4a1 1 0 000-2zm6-12H4a1 1 0 000 2h16a1 1 0 100-2z" fill="currentColor"></path></svg>} />} />
                                </Container>
                            )
                        }
                        {
                            breakpoints.desktop && (
                                <>
                                    <Container
                                        as="div"
                                        pad="s"
                                        padPosition="bottom"
                                        layout="centered"
                                    >
                                        <Heading as="h5">ಫಿಲ್ಟರ್</Heading>
                                    </Container>
                                    <Divider />
                                    <EventFilters
                                        filterValues={eventFilters}
                                        applyFilter={handleApplyFilter} />
                                </>

                            )

                        }
                        {
                            breakpoints.tablet && showEventFiltersModal && (
                                <EventFiltersModal
                                    filterValues={eventFilters}
                                    handleEventClose={toggleFilterModal}
                                    applyFilter={handleApplyFilter} />
                            )

                        }
                    </Container>
                    <Grid
                        template="repeat(3,1fr)"
                        templateMobile="1fr"
                        templateTablet="repeat(2,1fr)">
                        {

                            (allEvents || []).map((event, index) => {
                                const { thumbnails, images, title, shortDescription, description } = event;
                                return (

                                    <Container
                                        key={index}
                                        className="j-card j-card__shadow no-top-padding h-100"
                                        layout="flex"
                                        css={[card]}
                                    >
                                        <EventImages
                                            thumbnails={thumbnails}
                                            images={images}
                                            showFullViewImageGallery={showFullViewImageGallery} />
                                        <Container
                                            as="div"
                                            layout="flex"
                                            pad="s"
                                            padPosition="horizontal"
                                            style={{ alignItems: 'center', justifyContent: 'space-between', width: '100%', flexWrap: 'nowrap' }}>
                                            <div>
                                                <Container
                                                    as="div"
                                                    pad="s"
                                                    padPosition="bottom"
                                                    style={{ flex: 1 }}>
                                                    <Heading appearance="heading-xs">{title}</Heading>
                                                </Container>
                                                <Text appearance="body-s">{shortDescription}</Text>
                                            </div>
                                            {
                                                description && (
                                                    <div>
                                                        <Icon
                                                            kind="background"
                                                            size="xl"
                                                            color="primary"
                                                            ic={<FontAwesomeIcon
                                                                icon={faInfoCircle}
                                                                style={{ cursor: 'pointer' }} />}
                                                            onClick={() => handleEventInfoClick(event)} />
                                                    </div>
                                                )
                                            }
                                        </Container>
                                    </Container>
                                )
                            })
                        }
                    </Grid>
                </Grid>
            </Container>
            {
                showImageGallery && (
                    <FullViewImageGallery
                        images={(selectedEventImages || []).map(image => ({
                            original: image?.desktop
                        }))}
                        toggleShowImageGallery={toggleShowImageGallery} />
                )
            }
            {
                selectedEvent && <EventInfoModal content={selectedEvent} handleEventClose={onCloseEventInfoModal} />
            }
        </>


    )



}

export default Events;