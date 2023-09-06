import commonUtils from "../../utils";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";


const useNavigation = () => {
    const routerNavigate = useNavigate();
    const navigateButton = useCallback((button) => {
        const evTarget = button?.target
        const isExternal = button?.external;
        const isTargetAbsoluteURL = commonUtils.isAbsoluteURL(evTarget);
        evTarget
            ? isExternal
                ? window.open(evTarget, '__blank')
                : isTargetAbsoluteURL
                    ? window.open(evTarget, '_self')
                    : routerNavigate(evTarget)
            : null
    }, [routerNavigate]);


    const navigateBanner = useCallback((banner) => {
        const button = banner?.buttons?.[0];
        const evTarget = button?.target
        const isExternal = button?.external;
        const isTargetAbsoluteURL = commonUtils.isAbsoluteURL(evTarget)
       

        evTarget
            ? isExternal
                ? window.open(evTarget, '__blank')
                : isTargetAbsoluteURL
                    ? window.open(evTarget, '_self')
                    : routerNavigate(evTarget)
            : null;
    }, [routerNavigate]);


    const navigate = useCallback((url) => {
        const evTarget = url;
        const isTargetAbsoluteURL = commonUtils.isAbsoluteURL(evTarget)

        evTarget
            ? isTargetAbsoluteURL
                ? window.open(evTarget, '_self')
                : routerNavigate(evTarget)
            : null;
    }, [routerNavigate]);


    return { navigate, navigateButton, navigateBanner }
}


export default useNavigation;