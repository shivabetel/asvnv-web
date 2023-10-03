import { Container, Divider, Heading, Input } from "@jds/core"
import { useEffect, useState } from "react";

const EventFilters = ({
    filterValues,
    applyFilter
}) => {
    const [eventFilters, setEventFilters] = useState(filterValues);

    const handleEventFilter = (e, index) => {
        setEventFilters(filters => {
            const obj = filters[index]
            obj.checked = e?.target?.checked;
            filters.splice(index, 1, obj);
            const newState = filters.map(filter => filter)
            applyFilter && applyFilter(newState)
            return newState
        })

    }

    useEffect(() => {
        setEventFilters(filterValues)
    }, [filterValues])
    return (
        <Container
            as="div">            
            {
                (eventFilters || []).map((filter, index) => {
                    return (
                        <Container
                            key={index}
                            as="div"
                            pad="xs"
                            padPosition="vertical"
                        >
                            <Input
                                type="checkbox"
                                name="filter"
                                label={<Heading appearance="heading-xxs">{filter?.label}</Heading>}
                                checked={filter?.checked}
                                onChange={(e) => handleEventFilter(e, index)} />
                        </Container>
                    )
                })
            }
        </Container>
    )
}

export default EventFilters;