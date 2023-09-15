/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Button, Card, Container, Devices, Grid, Heading, Icon, Input, Space, Text } from "@jds/core";
import Image from "../image";
import { lAlignCenter } from "../../styles";
import ImageGallery from "react-image-gallery";
import { useCallback, useEffect, useState } from "react";
import { IcClose } from "@jds/core-icons";
import RichText from "@asvnv/core/components/richtext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import EventInfoModal from "./modal";



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
`

const closeIconContainerCss = css`
position: absolute;
right: 5rem;
z-index: 5;
span{
    cursor: pointer;
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
                                        css={[imageContainer, index == 3 && gradient]}>
                                        <a onClick={showFullViewImageGallery}>
                                            <Image
                                                image={thumbnail}
                                                css={image} />
                                            {
                                                index == 3 && (
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

    const handleEventFilter = (e, index) => {
        setEventFilters(filters => {
            const obj = filters[index]
            obj.checked = e?.target?.checked;
            filters.splice(index, 1, obj);
            return filters;
        })
    }


    const handleEventInfoClick = (event) => {
        setSelectedEvent(event)
    }

    const onCloseEventInfoModal = () => {
        setSelectedEvent(null)
    }


    console.log("setSelectedEvent:",selectedEvent);


    return (
        <>
            <Container
                // layout="max-width"
                pad="l"
                padPosition="all"
                as="div">
                <Space className="l-breakpoint--desktop" value='huge' />
                <Space className="l-breakpoint--tablet" value='xxl' />
                <Grid template="15% 80%"
                    templateMobile="1fr"
                    templateTablet="1fr"
                    style={{ alignItems: 'flex-start' }}>
                    <Container>

                        {
                            breakpoints.desktop && (eventFilters || []).map((filter, index) => (
                                <Container
                                    as="div"
                                    pad="s"
                                    padPosition="vertical">
                                    <Input
                                        type="checkbox"
                                        name="filter"
                                        label={<Heading appearance="heading-xxs">{filter?.label}</Heading>}
                                        checked={filter?.checked}
                                        onChange={(e) => handleEventFilter(e, index)} />
                                </Container>
                            ))
                        }
                    </Container>
                    <Grid
                        template="repeat(3,1fr)"
                        templateMobile="1fr"
                        templateTablet="repeat(2,1fr)">
                        {
                            (events || []).map((event, index) => {
                                const { thumbnails, images, title, description, shortDescription } = event;
                                return (
                                    <Container
                                        key={index}
                                        className="j-card j-card__shadow no-top-padding"
                                        layout="flex"
                                        css={[card, lAlignCenter]}
                                    >
                                        <EventImages
                                            thumbnails={thumbnails}
                                            images={images}
                                            showFullViewImageGallery={showFullViewImageGallery} />
                                        <Container
                                            as="div"
                                            pad="s"
                                            padPosition="horizontal"
                                            layout="flex"
                                            style={{ alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
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
                                            <div>
                                                <Icon
                                                    kind="background"
                                                    size="xl"
                                                    color="primary"
                                                    ic={<FontAwesomeIcon
                                                        icon={faInfoCircle}
                                                        style={{ cursor: 'pointer' }} />} 
                                                    onClick={() => handleEventInfoClick(event)}    />
                                            </div>
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
               selectedEvent && <EventInfoModal content={selectedEvent} handleEventClose={onCloseEventInfoModal}/>
            }
        </>


    )



}

export default Events;