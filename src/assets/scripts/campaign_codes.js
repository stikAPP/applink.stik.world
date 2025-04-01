export const routesStores = {
    'Android': 'https://play.google.com/store/apps/details?id=world.stik.app',
    'iOS': 'https://apps.apple.com/us/app/stik-app/id6503289533?platform=iphone'
}

export async function getCampaignCodes() {
    const response = await fetch(document.body.dataset.stikworlds3url + 'data/campaign_codes.json');
    return await response.json();
}
