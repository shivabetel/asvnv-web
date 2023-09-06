import { Heading } from "@jds/core";
import HTMLReactParser from "html-react-parser";

const RichHeading = ({ heading, ...restOfProps }) => {
    return <Heading {...restOfProps}>{heading && HTMLReactParser(heading)}</Heading>
}

export default RichHeading