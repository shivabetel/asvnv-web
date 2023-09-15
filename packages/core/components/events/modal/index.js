/** @jsxImportSource @emotion/react */
import { Container, ContentBlock, Modal, Space } from "@jds/core";
import RichText from "../../richtext";
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
            onCloseCallback={handleEventClose}
            kind="informational" >
            <Container
                as="div">
                <ContentBlock
                    title={content?.title}
                />
                <Space value="xl"/>
                <RichText
                    text={content?.description}
                    style={{ textAlign: 'left' }} />
            </Container>
        </Modal>
    )
}

export default EventInfoModal;