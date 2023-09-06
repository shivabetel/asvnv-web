import { Container } from "@jds/core"
import Events from "../../events";
const EventsTemplate = ({
    content,
    overideProps
}) => {

    return (
        <Container>
            <Events
            events={content}
            overideProps={overideProps}
            />
        </Container>
    )

}

export default EventsTemplate;