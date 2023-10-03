import { Modal } from "@jds/core"
import EventFilters from "../../filter";

const EventFiltersModal = ({
    filterValues,
    applyFilter,
    handleEventClose
}) => {
    return (
        <Modal size="s"
            closed={false}
            header="ಫಿಲ್ಟರ್"
            onCloseCallback={handleEventClose}                        
            primaryCTA={{
                button: {
                    title: 'ಮುಚ್ಚಿ',  
                    onClick: handleEventClose                  
                }
            }}>
            <EventFilters
                filterValues={filterValues}
                applyFilter={applyFilter} />
        </Modal>
    )
}

export default EventFiltersModal;