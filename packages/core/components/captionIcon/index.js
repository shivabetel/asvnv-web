import { css, Global } from '@emotion/react'
import { Container, Devices, Icon } from '@jds/core'
import HTMLReactParser from 'html-react-parser'
import React, { useCallback } from 'react'
import { getResponsiveProps } from '..'

export const getCaptionIcon = (icon) => {
  const iconSvg = icon?.svg;
  const iconUrl = icon?.url
  return (iconUrl || iconSvg) ? {
    iconUrl,
    iconSvg
  } : null
}

const CaptionIcon = ({
  icon,
  defaultIcon,
  alt,
  captionIconOverideProps,
  ...restOfProps }) => {
  const breakpoints = Devices.useMedia();
  const iconProps = getCaptionIcon(icon);
  const defaultIconElement = defaultIcon ? React.isValidElement(defaultIcon) ? defaultIcon :
    <img
      class="l-radius--large"
      style={{ width: '100%' }}
      src={defaultIcon}
      alt={icon?.alttext || alt}>
    </img> : null

  const overideIconProps = getResponsiveProps(breakpoints, captionIconOverideProps)
  const containerLayoutProps = getResponsiveProps(breakpoints, captionIconOverideProps?.container)

  const getIconSize = useCallback(() => {
    if (icon?.size) {
      return icon?.size
    }
    return overideIconProps?.size || 'l'

  }, [breakpoints, overideIconProps, icon])

  return <>
    <Global styles={css`
      .caption-icon[data-mode=dark] {
        display: inline-flex;
                justify-content: center;
                align-items: center;
                width: 48px;
                height: 48px;
                background: #E8E8FC;
                border-radius: 50%;
      }
    `} />
    {
      (icon || defaultIconElement) && (
        <Container as='div' layout='flex' className='caption-icon' {...containerLayoutProps}>
          <Icon
            data-testid="caption-icon"
            ic={iconProps?.iconUrl ?
              <img
                role='img'
                class="l-radius--large"
                style={{ width: '100%' }}
                alt={icon?.alttext || alt}
                src={iconProps?.iconUrl}
              ></img>
              : iconProps?.iconSvg ? React.isValidElement(iconProps?.iconSvg) ? iconProps?.iconSvg : HTMLReactParser(iconProps?.iconSvg) : defaultIconElement}
            {...restOfProps}
            {...overideIconProps}            
            size={getIconSize()}></Icon>
        </Container>
      )
    }
  </>

}

export default CaptionIcon