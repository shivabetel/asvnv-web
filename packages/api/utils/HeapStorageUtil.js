import canUseDOM from 'can-use-dom';

let heapStore = {};
const defaultExpiryTime = 5; // in minutes
const maxExpiryTime = 30;

export const HeapStorageUtil = {
    // opt.expireAt value is considered to be in minutes
    set(key, val, opt = {}) {
        if (!canUseDOM) {
            return;
        }
        try {
            const valToStore = val;
            const expireAt = -1;
            const currentDate = new Date();
            opt.expireAt = (opt.expireAt && opt.expireAt > maxExpiryTime) ? maxExpiryTime : 0;
            opt.expireAt ? (currentDate.setMinutes(currentDate.getMinutes() + opt.expireAt))
                : (currentDate.setMinutes(currentDate.getMinutes() + defaultExpiryTime));
            // expireAt = currentDate.getTime()
            heapStore[key] = {
                val: valToStore,
                expireAt
            };
        } catch (e) {
            // console.warn('couldnot store value in HEAP')
        }
    },

    get(key) {
        if (!canUseDOM) {
            return false;
        }
        const data = heapStore[key];
        const currentDate = new Date().getTime();
        if (typeof data !== 'object') {
            return false;
        }
        if (data.expireAt === -1 || data.expireAt >= currentDate) {
            return data.val;
        }
        this.clear(key);
        return null;
    },

    exists(key) {
        if (!canUseDOM) {
            return false;
        }
        return this.get(key) !== undefined;
    },

    clear(key) {
        if (!canUseDOM) {
            return;
        }
        delete heapStore[key];
    },

    clearAll() {
        if (!canUseDOM) {
            return;
        }
        heapStore = {};
    }
};