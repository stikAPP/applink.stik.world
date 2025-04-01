import {getCampaignCodes, routesStores} from "./campaign_codes.js";
import MobileOS from "./check_mobile_os.js";

const redirectAppStoresFn = async () => {
    //const campaignCode = sessionStorage.getItem('cc') || 'web';
    const url = new URL(window.location.href);
    const paramsQuery = new URLSearchParams(url.search);
    const campaignCodes = await getCampaignCodes();
    let campaignCode = paramsQuery.get('cc');
    if (!campaignCode || !campaignCodes[campaignCode]) {
        campaignCode = sessionStorage.getItem('cc') || 'web';
    } else {
        sessionStorage.setItem('cc', campaignCode);
    }
    const $appleLinks = document.querySelectorAll('a[href^="https://apps.apple.com"]');
    const $playStoreLinks = document.querySelectorAll('a[href^="https://play.google.com"]');
    const $downloadEn = document.querySelectorAll('a[href^="/download-app"]');
    const $downloadEs = document.querySelectorAll('a[href^="/es/descarga-app"]');
    const $combinedLinksDownload = [...$downloadEs, ...$downloadEn];
    if ($appleLinks.length === 0 && $playStoreLinks.length === 0 && $downloadEn.length === 0 && $downloadEs.length === 0) {
        return;
    }
    if ($appleLinks.length > 0) {
        const appleParams = campaignCodes[campaignCode][MobileOS.IOS];
        $appleLinks.forEach(($link) => {
            $link.addEventListener('click', (e) => {
                e.preventDefault();
                let storesLink = $link.href;
                appleParams.forEach((param) => {
                    storesLink += `&${param.key}=${param.value}`;
                });
                window.location.href = storesLink;
            });
        });
    }
    if ($playStoreLinks.length > 0) {
        const androidParams = campaignCodes[campaignCode][MobileOS.ANDROID];
        $playStoreLinks.forEach(($link) => {
            $link.addEventListener('click', (e) => {
                e.preventDefault();
                let storesLink = $link.href;
                androidParams.forEach((param) => {
                    storesLink += `&${param.key}=${param.value}`;
                });
                window.location.href = storesLink;
            });
        });
    }
    if ($combinedLinksDownload.length > 0) {
        const devicesOs = MobileOS.detect();
        if (devicesOs === MobileOS.IOS || devicesOs === MobileOS.ANDROID) {
            const paramsCode = campaignCodes[campaignCode][devicesOs];
            $combinedLinksDownload.forEach(($link) => {
                $link.addEventListener('click', (e) => {
                    e.preventDefault();
                    let storesLink = routesStores[devicesOs];
                    paramsCode.forEach((param) => {
                        storesLink += `&${param.key}=${param.value}`;
                    });
                    window.location.href = storesLink;
                });
            });
        }
    }
}

export default redirectAppStoresFn;
