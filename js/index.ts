const _leafletApiClient = new LeafletApiModule.LeafletApiClient();
const _ipifyApiClient = new IpifyModule.IpifyClient();
const inputButtonID = "InputBtn";
const ipIdentifier = /^[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}$/;
const ipAddressResultID = 'IPAddressResult';
const locationResultID = 'LocationResult';
const timezoneResultID = 'TimezoneResult';
const ispResultID = 'IspResult';
const SearchCriteriaID = 'SearchCriteria';

$(() => {

    $(`#${inputButtonID}`).on('click', () => {
        var searchCriteria = $(`#${SearchCriteriaID}`).val();
        if (!searchCriteria)
            return;
        findAddress(searchCriteria.toString());
    });

    initMap();
});

const initMap = async () => {
    await _leafletApiClient.initMap();
    var clientIpAddress: IpifyModule.ClientIpAddress = await _ipifyApiClient.GetClientIP();
    var ipLocationData: IpifyModule.IPLocation = await _ipifyApiClient.GetIPLocation(clientIpAddress.ip, true);
    await _leafletApiClient.updateMapLocation(ipLocationData.location.lat, ipLocationData.location.lng);
    updateIPLocationBar(ipLocationData);
}

const updateIPLocationBar = (ipLocationData: IpifyModule.IPLocation) => {
    $(`#${ipAddressResultID}`).text(ipLocationData.ip);
    $(`#${locationResultID}`).text(`${ipLocationData.location.city}, ${ipLocationData.location.region}`);
    $(`#${timezoneResultID}`).text(`UTC ${ipLocationData.location.timezone}`);
    $(`#${ispResultID}`).text(ipLocationData.isp);
}

const findAddress = async (searchCriteria: string) => {
    var isIpAddress = ipIdentifier.test(searchCriteria);
    var ipLocationData: IpifyModule.IPLocation = await _ipifyApiClient.GetIPLocation(searchCriteria, isIpAddress);
    await _leafletApiClient.updateMapLocation(ipLocationData.location.lat, ipLocationData.location.lng);
    updateIPLocationBar(ipLocationData);
}