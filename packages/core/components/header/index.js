/** @jsxImportSource @emotion/react */
import { Container, Devices, Header, Heading, Icon, Button, Link } from "@jds/core";
import { css } from "@emotion/react";
import { default as RouterLink } from "next/link";
import { useEffect, useState } from "react";
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faCaretDown, faHouse } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import { Routes, Route, Outlet, NavLink, BrowserRouter } from "react-router-dom";

const headerCss = css`
height: 120px;
max-height: 140px;
// .header_logo-group-logo.l-breakpoint--desktop span{
//   --icon-size:7rem !important;
// }
.header_logo-group-logo.l-breakpoint--tablet span{
  --icon-size:4rem !important;
}
.header_logo-group-logo span img{
  border-radius: 100%;
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
`
const subNavCss = css`
.active button{
  border-bottom: 1px solid var(--color-white);
  border-radius: 0;
}
`
const AppHeader = (props) => {
  const { headerConfig } = props;
  const breakpoints = Devices.useMedia();
  const [activeLink, setActiveLink] = useState();
  const navigate = useNavigate();
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
        logo={<img src="https://storage.googleapis.com/asvnvs/logo.jpeg"></img>}
        pageTitle={(
          <Container
            as="div"
            layout="centered">
            {breakpoints?.desktop && <Heading as="div" appearance="heading-xs">ASVNV OLD STUDENTS ASSOCIATION</Heading>}
            <Heading as="div" appearance={breakpoints?.desktop ? 'heading-xs' : 'heading-xxs'}>ಎ ಎಸ್ ವಿ ಎನ್ ವಿ ಹಿರಿಯ ವಿದ್ಯಾರ್ಥಿಗಳ ಸಂಘ</Heading>
          </Container>
        )}
        links={
          (breakpoints.mobile && headerConfig?.links || []).map(({ name, href }, index) => ({
            newTab: false,
            title: name,
            provider: <Link provider={<RouterLink href={href} />} textAppearance="body-s" button={{ as: 'span', kind: 'primary', className: `j-tab header-tab ${index == activeLink ? 'active' : null}` }}></Link>,
            onClick: () => setActiveLink(index)
          })
          )}
      />
      {/* {
        breakpoints?.desktop && <Container layout="flex">
          <img src="/image1.jpeg"></img>
        </Container>
      }
      {
        breakpoints?.desktop && <Container layout="flex">
          <img src="/image2.jpeg"></img>
        </Container>
      } */}
      {
        breakpoints?.desktop && (
          <Container
            as="div"
            background="primary-50">
            <Container layout="max-width">
              {/* {
                (headerConfig?.links || []).map(({ name, href, subLinks }, index) => (
                  <>
                    {
                      subLinks?.length > 0 ? (
                        <Menu menuButton={<Button title={name} icon={<Icon
                          ic={<FontAwesomeIcon icon={faCaretDown} />}
                          color="white"
                          kind="icon-only"
                        />}></Button>}>
                          {
                            (subLinks?.length > 0 && subLinks.map(({ name, icon, href }, index) => (
                              <MenuItem 
                              value={href}
                              onClick={handleMenuClick}>
                                <Container
                                  layout="flex"
                                  pad="xs"
                                  padPosition="vertical"
                                >
                                  <Icon
                                    ic={<FontAwesomeIcon icon={icon} />}
                                    color="primary"
                                    kind="icon-only"
                                  />
                                  <Heading as="h6" color="primary-50">{name}</Heading>
                                </Container>
                              </MenuItem>
                            )))
                          }
                        </Menu>
                      ) : <Button title={name}></Button>
                    }
                  </>

                ))
              } */}


              {
                (menuLinks || []).map(({ name, uid }, index) => (
                  <>
                    {
                      (
                        <Button
                          data-mode={activeMenuLink == uid ? 'dark' : ''}
                          title={name}
                          onClick={() => handleEventTopMenuClick(uid)} />
                      )
                    }
                  </>

                ))
              }

            </Container>
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