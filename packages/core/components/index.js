import isNil from 'lodash/isNil';

const getResponsiveProps = (breakpoints, props) => {
    if (breakpoints?.mobile) {
        if (isNil(props?.mobile)) {
            return props?.desktop || {};
        }
        return props?.mobile || {};
    }
    if (breakpoints?.tablet) {
        if (isNil(props?.tablet)) {
            return props?.desktop || {};
        }
        return props?.tablet || {}
    }
    if (breakpoints?.desktop) {
        return props?.desktop || {}
    }
}

const ErrorModal = ({ errorMessage }) => {
    // const [activateDialog, deActivateDialog] = useDialog()
    // useEffect(() => {
    //     activateDialog('errorDialog', {
    //         primaryCTA: { title: 'OK', onClick: () => deActivateDialog() },
    //         render: () => <Text>{errorMessage}</Text>
    //     })
    // }, [errorMessage])
    return <></>
}


export {
    getResponsiveProps,
    ErrorModal
}