/** @jsxImportSource @emotion/react */
import { Container, Devices, Header, Heading, Icon, Button, Link, Text } from "@jds/core";
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faCaretDown, faHouse } from '@fortawesome/free-solid-svg-icons';
import { Routes, Route, Outlet, NavLink, BrowserRouter } from "react-router-dom";
import useNavigation from "../../hooks/useNavigation";
import { NavLink as RouterLink } from "react-router-dom"

const headerCss = css`
height: 80px;
max-height: 80px;
// .header_logo-group-logo.l-breakpoint--desktop span{
//   --icon-size:7rem !important;
// }
.header_logo-group-logo.l-breakpoint--tablet .j-icon{
  --icon-size:4rem !important;
}
.header_logo-group-logo span img{
  border-radius: 100%;
}
.header_logo-group-logo.l-breakpoint--desktop .j-icon{
  --icon-size: 3.5rem !important;
}
.header_spacer{
  display: none;
}
.j-header__wrapper{
  display: flex;
  justify-content: center;
  align-items: center;
}
.j-header__inner {
  justify-content: center;
}
@media screen and (max-width: 61.9375rem) {
  .j-header__inner {
    display: flex;
    // flex-direction: column;
    gap: 0.5rem;
    justify-content: center;
    align-items: center;
  }
  .header_pageTitle-group{
    // text-align: center;
  }
}


.header-page-menu .item:not(:last-child){
  border-bottom: 1px solid var(--color-primary-grey-40);
  padding: 0.5rem 0;
}
`
const subNavCss = css`
.active button{
  border-bottom: 1px solid var(--color-white);
  border-radius: 0;
}
`

const logo = css`
.j-icon{

}
`
const AppHeader = (props) => {
  const { headerConfig } = props;
  const breakpoints = Devices.useMedia();
  const [activeLink, setActiveLink] = useState();
  const { navigate } = useNavigation();
  const [menuLinks, setMenuLinks] = useState();
  const [activeMenuLink, setActiveMenuLink] = useState("link1");
  const [subLinks, setSubLinks] = useState([]);

  const handleMenuClick = (href) => {
    navigate(href)
  }

  const handleEventTopMenuClick = (uid) => {
    setActiveMenuLink(uid);

  }

  useEffect(() => {
    setMenuLinks((headerConfig?.links || []).map(menu => menu))
  }, [headerConfig?.links]);

  useEffect(() => {
    const selectedTopMenu = (menuLinks || []).find(obj => obj?.uid == activeMenuLink);
    if (selectedTopMenu?.subLinks?.length > 0) {
      setSubLinks(selectedTopMenu?.subLinks);
    } else {
      setSubLinks([])
      navigate(selectedTopMenu?.href)
    }
  }, [activeMenuLink, menuLinks]);


  return (
    <Container as="div">
      <Header
        css={headerCss}
        logo={<Icon size="fill" ic={<img src="https://storage.googleapis.com/asvnvs/logo.jpeg"></img>} />}
        logoLink={{
          onClick: () => navigate("/")
        }}
        pageTitle={(
          <Container
            as="div"
            layout="centered">
            {breakpoints?.desktop && <Heading as="div" appearance="heading-s">ASVNVS OLD STUDENTS ASSOCIATION</Heading>}
            <Heading as="div" appearance={breakpoints?.desktop ? 'heading-s' : 'heading-xxs'}>ಎ ಎಸ್ ವಿ ಎನ್ ವಿ ಎಸ್ ಹಿರಿಯ ವಿದ್ಯಾರ್ಥಿಗಳ ಸಂಘ</Heading>
          </Container>
        )}
        links={
          (breakpoints.tablet && headerConfig?.links?.[0]?.subLinks || []).map(({ name, href, icon }, index) => ({
            newTab: false,
            titleEl: {
              prefix: (
                <Icon
                  ic={<FontAwesomeIcon icon={icon} />}
                  color="primary"
                  kind="icon-only"
                />
              ),
              titleBlock: {
                text: <Text appearance="body-m-bold" color="primary-50">{name}</Text>
              }
            },
            provider: (
              <Link
                provider={<RouterLink to={href} />}
                textAppearance="body-m-bold"
                button={{ as: 'span', kind: 'tertiary', className: `j-tab header-tab custom-menu-item ${index == activeLink ? 'active' : null}` }}
              >
              </Link>
            ),
            onClick: () => setActiveLink(index)
          })
          )}
      />
      {
        breakpoints?.desktop && (
          <Container
            as="div"
            background="primary-50">
            <Container
              as="div"
              layout="max-width"
              pad="xxs"
              padPosition="vertical"
              css={subNavCss}>
              {
                ((subLinks || []).map(({ name, icon, href }, index) => (
                  <NavLink
                    key={index}
                    to={href}
                    className={({ isActive, isPending }) =>
                      isPending ? "pending" : isActive ? "active" : ""
                    }>{
                      <Button
                        title={name}
                        iconLeft={<Icon
                          ic={<FontAwesomeIcon icon={icon} />}
                          color="white"
                          kind="icon-only"
                        />}

                      />
                    }</NavLink>

                )))
              }
            </Container>
          </Container>
        )
      }
    </Container>
  )
}

export default AppHeader;