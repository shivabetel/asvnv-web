/** @jsxImportSource @emotion/react */
import { Container, ContentBlock, Modal, Space } from "@jds/core";
import RichText from "../../../richtext";
import { css } from "@emotion/react";

const modalCss = css`
.j-modal-container{
    width: var(--modal-container-width-m) !important;
}
`

const EventInfoModal = ({
    handleEventClose,
    content
}) => {
    return (
        <Modal size="s"
            css={modalCss}
            closed={false}
            header={content?.title}
            onCloseCallback={handleEventClose}
            kind="informational" >
            <RichText
                    text={content?.description}
                    style={{ textAlign: 'left' }} />
        </Modal>
    )
}

export default EventInfoModal;