import trim from 'lodash/trim';

const commonUtils = {
    evaluateMobilePlatform() {
        var isIos = (/iPhone|iPad|iPod| Phone/i.test(navigator.userAgent)) ? true : false;
        var isAndroid = (/Android| Phone/i.test(navigator.userAgent)) ? true : false;
        var isMac = (/(macintosh|macintel|macppc|mac68k|macos)/i.test(navigator.userAgent)) ? true : false;
        var isWindows = (/(win32|win64|windows|wince)/i.test(navigator.userAgent)) ? true : false;

        return {
            ios: isIos,
            android: isAndroid,
            windows: isWindows,
            mac: isMac
        }
    },
    isAbsoluteURL(url) {
        let result = false;
        try {
            return new URL(url).origin ? true : false;

        } catch (e) {

        }
        return result;
    },
    startNativeBack(value) {
        this.externalCall(btoa(
            JSON.stringify({
                type: 'handleWebviewBack',
                value: value
            })
        ));
    },
    closeWebView() {
        this.externalCall(btoa(

            JSON.stringify({
                type: 'close'
            })
        ));
    },
    externalCall(data) {
        try {
            if (window.android && window.android.__externalCall) {
                window.android.__externalCall(data);
            }
            if (window.__externalCall) {
                window.__externalCall(data);
            }
            webkit.messageHandlers.callback.postMessage(data);
        } catch (e) {
            //console.log('external call failed ' + e);
        }
    },
    constructURL(url, urlParams) {
        try {
            if (url) {
                if (!(url.includes('http') || url.includes('https'))) {
                    url = trim(url, '/')
                    url = `${window.location.origin}/${url}`
                }
                if (urlParams) {
                    const urlSearchParams = new URLSearchParams(urlParams);
                    url = `${url}?${urlSearchParams?.toString()}`;
                }

                return new URL(url)
            }
        } catch (error) {

        }

    },
    populateURLParamValues(urlsearchParams, values = {}) {
        if (urlsearchParams) {
            Object.entries((values || {})).forEach(([key, value]) => {
                if (urlsearchParams.has(key)) {
                    const keyValue = urlsearchParams.get(key);
                    (!keyValue || keyValue == "null") && urlsearchParams.set(key, value);
                }
            })
            return urlsearchParams;
        }
    }
}
export default commonUtils