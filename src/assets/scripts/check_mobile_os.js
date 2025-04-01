export default class MobileOS {
    static ANDROID = "Android";
    static IOS = "iOS";
    static UNKNOWN = "Unknown";

    static detect() {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        if (/android/i.test(userAgent)) {
            return MobileOS.ANDROID;
        }

        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            return MobileOS.IOS;
        }

        return MobileOS.UNKNOWN;
    }
}
