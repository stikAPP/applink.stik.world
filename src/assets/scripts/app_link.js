import MobileOS from './check_mobile_os';
import {getCampaignCodes, routesStores} from './campaign_codes.js';

const appLinkFn = async () =>  {
    const campaignCodes = await getCampaignCodes();
    const url = new URL(window.location.href);
    const paramsQuery = new URLSearchParams(url.search);

    let campaignCode = paramsQuery.get('cc');

    if (!campaignCode || !campaignCodes[campaignCode]) {
        campaignCode = 'web';
    }
    let params = [];
    const mobileOs = MobileOS.detect();
    let storesLink  = document.body.dataset.stikworldurl + 'download-app';
    if(mobileOs === MobileOS.ANDROID) {
        storesLink = routesStores[MobileOS.ANDROID];
        params = campaignCodes[campaignCode][MobileOS.ANDROID];
    } else if(mobileOs === MobileOS.IOS) {
        storesLink = routesStores[MobileOS.IOS];
        params = campaignCodes[campaignCode][MobileOS.IOS];
    } else {
        storesLink += `/?cc=${campaignCode}`;
    }
    if (params.length > 0) {
        params.forEach((param) => {
            storesLink += `&${param.key}=${param.value}`;
        });
    }
    window.location.replace(storesLink);
}

export default appLinkFn;
