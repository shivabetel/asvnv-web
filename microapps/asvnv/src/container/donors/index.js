import { Container } from "@jds/core"
const DonorsHomeContainer = () => {
    return (
        <Container
        as="div">
            <iframe src="https://storage.googleapis.com/asvnvs/donors/donors.pdf" style={{height: '100vh', width: '100%'}}/>
        </Container>
    )
}

export default DonorsHomeContainer;