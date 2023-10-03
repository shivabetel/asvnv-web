import castArray from 'lodash/castArray';
import get from 'lodash/get';
import set from 'lodash/set';
import { useCallback, useEffect, useState } from 'react';

import AppContext from '../contexts/AppContext';
import AppHeader from '../components/header';
import AppFooter from '../components/appfooter';
import { faCalendar, faHandsHelping, faHouse, faInfo, faPerson, faS, faSitemap } from '@fortawesome/free-solid-svg-icons';



const footerLinks = [
    {
        subLinks: [
            {
                href: '',
                newTab: true,
                title: 'ಮಾತೃ ಸಂಸ್ಥೆ'
            },
            {
                href: '',
                newTab: true,
                title: 'ಮನೆ ದೇವಾಲಯಗಳು'
            }
        ],
        title: 'ಸಂಬಂಧಿತ ಲಿಂಕ್‌ಗಳು'
    }
];




const socialNetworkLinks = {
    links: [       
        
        {
            href: 'https://www.facebook.com/profile.php?id=100007680559170&__cft__[0]=AZXEJ4AxWRWv3Rxrr8ZwFWZok-sg8k--Cu1u3LYta3jJP4To3Y2sqROsjo6K6DPW33GjuhbgwDqgoSi9fXdJMPqoQbIz3VL8eTL-YF2YbJkaRfscdPWx-Q2pnp1ClHM0qwE&__tn__=-UC%2CP-R',
            icon: <svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.25995 21.1098C4.67495 20.7198 0.589946 15.7948 0.764946 10.9198C0.969946 5.19977 5.38495 0.884766 11.0349 0.884766C16.4749 0.884766 21.0249 5.18976 21.2349 10.5698C21.4799 16.7648 16.7199 20.6298 12.7449 21.1198C12.7449 18.7548 12.7449 16.3998 12.7449 13.9648C13.4749 13.9648 14.2349 13.9648 15.0599 13.9648C15.2199 13.0048 15.3749 12.1048 15.5349 11.1298C14.5899 11.1298 13.6949 11.1298 12.7199 11.1298C12.6749 10.2198 12.5699 9.36977 12.8249 8.53977C13.0049 7.94477 13.5099 7.72477 14.0899 7.69477C14.5349 7.66976 14.9849 7.68976 15.4749 7.68976C15.4749 6.79476 15.4749 5.96477 15.4749 5.09977C14.1749 4.85477 12.8849 4.67477 11.6049 5.14977C10.2099 5.66477 9.34995 6.96477 9.31495 8.59977C9.29495 9.40977 9.30995 10.2198 9.30995 11.0948C8.43995 11.0948 7.63495 11.0948 6.78995 11.0948C6.78995 12.0498 6.78995 12.9448 6.78995 13.9048C7.60495 13.9048 8.40995 13.9048 9.25995 13.9048C9.25995 16.3298 9.25995 18.6948 9.25995 21.1098Z" fill="currentColor"></path>
            </svg>,
            newTab: true,
            title: 'IcFacebook'
        },
        {
            href: 'https://www.youtube.com/@asvnvsoldstudentsassociati1477',
            icon: <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.012 34.070c-0.095 0-10.435-0.098-13.598-0.407-0.115-0.023-0.247-0.038-0.4-0.055l-0.137-0.017c-1.51-0.051-2.867-0.664-3.877-1.635l0.002 0.002c-0.821-1.113-1.385-2.464-1.58-3.931l-0.005-0.044v-0.020c-0.239-1.917-0.385-4.158-0.405-6.428l-0-0.027v-3.030c0.020-2.297 0.166-4.538 0.433-6.741l-0.028 0.286v-0.020c0.2-1.508 0.764-2.855 1.602-3.988l-0.017 0.023c0.959-0.984 2.28-1.611 3.746-1.666l0.010-0h0.010c0.057 0 0.11 0 0.167-0.013l0.088-0.010c5.5-0.4 13.902-0.407 13.987-0.407h0.022c0.085 0 8.478 0 14 0.407l0.092 0.010c0.048 0 0.102 0.010 0.157 0.013h0.010c1.474 0.056 2.792 0.684 3.747 1.665l0.001 0.001c0.819 1.111 1.383 2.457 1.58 3.921l0.005 0.044v0.020c0.239 1.917 0.385 4.158 0.405 6.428l0 0.027v3.030c-0.020 2.297-0.166 4.538-0.433 6.741l0.028-0.286v0.020c-0.2 1.511-0.765 2.861-1.602 3.999l0.017-0.024c-0.956 0.983-2.274 1.61-3.738 1.666l-0.010 0h-0.010c-0.055 0-0.107 0-0.158 0.013l-0.090 0.010c-5.532 0.395-13.947 0.422-14.020 0.422zM15.885 13.947v11.24l10.805-5.602z" fill="currentColor"></path>
            </svg>,
            newTab: true,
            title: 'IcYoutube'
        }       
    ],
    title: 'Connect with Us'
}



const headerLinks = [
    {
        name: 'ಓ.ಎಸ್.ಎ ಸಂಘ',
        uid: 'link1',
        href: '/mobile',
        subLinks: [
            {
                name: '',                
                href: '/',
                icon: faHouse
            },
            {
                name: 'ಸಂಘದ ಪರಿಚಯ',
                href: '/about',
                icon: faInfo
            },
            {
                name: 'ದೇಣಿಗೆ',
                href: '/donate',//'/selfcare/plans/mobility/prepaid-plans-home/',
                icon: faHandsHelping

            },
            {
                name: 'ಇವೆಂಟ್ಸ್',
                href: '/events',
                icon: faCalendar
            },
            {
                name: 'ದಾನಿಗಳು',
                href: '/donors',
                icon: faPerson                

            },
            {
                name: 'ಯೋಜನೆಗಳು',
                href: '/schemes',
                icon: faS
            },
            {
                name: 'ಕಾರ್ಯಕಾರಿ ಸಮಿತಿ',
                href: '/committee',
                icon: faSitemap
            }         
        ]
    },
    {
        name: 'ಮಾತೃ ಸಂಸ್ಥೆ',
        uid: 'link2',
        href: '/jiofiber'       
    },
    {
        name: 'ಮನೆ ದೇವಾಲಯಗಳು',
        uid: 'link3',
        href: '/business'
    } 
]

const appConfiguration = {
    appConfigData: {},
    appLogo: 'https://storage.googleapis.com/asvnvs/logo.jpeg',
    header: {
        links: headerLinks,
        visible: false,
        loader: false
    },
    footer: {
        links: {
            footerLinks,
            socialNetworkLinks
        },
        visible: false,
        loader: false
    }
}




const AppContextProvider = ({
    children
}) => {

    const [configuration, setConfiguration] = useState(appConfiguration);

    const setConfig = useCallback((propertyName, value) => {
        const modifiedObj = set(configuration, castArray(propertyName), value);
        setConfiguration(modifiedObj)
    }, [configuration])

    const getConfig = useCallback((propertyName) => {
        return get(configuration, castArray(propertyName));
    }, [configuration])





    return (
        <AppContext.Provider value={{
            setConfig,
            getConfig
        }}>
            <AppHeader
                headerConfig={configuration?.header} />
            {children}
            <AppFooter/>

        </AppContext.Provider>
    )
}

export default AppContextProvider