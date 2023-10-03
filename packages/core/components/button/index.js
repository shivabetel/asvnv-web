import { Button, Devices, Icon } from "@jds/core";
import HTMLReactParser from "html-react-parser";
import PropTypes from 'prop-types';
import React, { useCallback } from "react";
import { getResponsiveProps } from "..";
import useNavigation from "../../hooks/useNavigation";


export const getButtonProps = ({ button, onClick = () => { }, overideButtonProps, ...restOfProps }) => {
    const { label, theme, ariaLabel } = button
    return {
        'aria-label': ariaLabel || label,
        title: label,
        onClick,
        kind: theme,        
        ...restOfProps,
        ...(overideButtonProps || {})

    }
}
const JButton = (props) => {    
    const { button, iconElement, onClick, handleLogAnalytics, getTargeturlParamValues, overideButtonProps, ...restOfProps } = props;

    let { iconPosition = 'right' } = (button || {});
    iconPosition = iconPosition || 'right';
    const { label, theme, icon, ariaLabel } = (button || {})
    const { navigateButton } = useNavigation();

    const onButtonClick = useCallback((e) => {
        e.stopPropagation();
        if (button?.target) {            
            if (getTargeturlParamValues) {
               const urlsearchParams = getTargeturlParamValues(urlsearchParams);
               if (urlsearchParams){
                 if(button.target.indexOf("?") !== -1){
                    button.target = `${ button.target}&${urlsearchParams.toString()}`
                 }else{
                    button.target = `${ button.target}?${urlsearchParams.toString()}`
                 }
               }
            }
           
        }
        handleLogAnalytics && handleLogAnalytics(button);
        onClick ? onClick(button) : (navigateButton && navigateButton(button));
    }, [onClick, button, handleLogAnalytics, navigateButton, getTargeturlParamValues])

    const breakpoints = Devices.useMedia();
    const buttonOverides = getResponsiveProps(breakpoints, overideButtonProps)


    let iconEle;

    if (icon?.svg) {
        iconEle = HTMLReactParser(icon?.svg)
    } else if (icon?.url) {
        iconEle = <Icon size="s" ic={<img src={icon.url} />} />
    } else if (icon?.jds) {
        iconEle = icon.jds
    } else if (React.isValidElement(iconElement)) {
        iconEle = iconElement;
    }


    if(buttonOverides?.iconPosition){
        iconPosition = buttonOverides?.iconPosition
    }
    

    return (
        <Button title={label}
            aria-label={ariaLabel || label}
            kind={theme}
            iconLeft={iconPosition == 'left' && iconEle}
            icon={iconPosition == 'right' && iconEle}
            onClick={onButtonClick}
            data-mode={button?.dataMode}
            {...restOfProps}
            {...buttonOverides}></Button>
    )
}

JButton.propTypes = {
    button: PropTypes.object && PropTypes.object.isRequired,
    onClick: PropTypes.func,
    iconPosition: PropTypes.string
}

JButton.defaultProps = {
    iconPosition: 'left'
}

export default JButton