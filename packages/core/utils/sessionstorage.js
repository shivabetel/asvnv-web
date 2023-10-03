import { WINDOW } from "@jds/core";
import canUseDOM from "can-use-dom";

class BrowserSessiontorage {
    get(key) {
        return canUseDOM && WINDOW.sessionStorage.getItem(key)
    }

    set(key, value) {
        canUseDOM && WINDOW.sessionStorage.setItem(key, value)
    }
    remove(key) {
        canUseDOM && WINDOW.sessionStorage.removeItem(key)
    }
}

const sessionStorage = new BrowserSessiontorage()
export default sessionStorage;