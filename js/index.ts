const _leafletApiClient = new LeafletApiModule.LeafletClient();
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
        processSearchCriteria(searchCriteria.toString());
    });

    initMap();
});

/**
 * Initialisation function to get the client's ip address and update the UI with the response data.
 */
const initMap = async () => {
    var clientIpAddress: IpifyModule.ClientIpAddress = await _ipifyApiClient.GetClientIP();
    processSearchCriteria(clientIpAddress.ip);
}

/**
 * Processes the search criteria by getting the location data of the passed in search criteria.
 * @param searchCriteria Either an IP Address or domain to get location data for.
 */
const processSearchCriteria = async (searchCriteria: string): Promise<void> => {
    var isIpAddress = ipIdentifier.test(searchCriteria);
    var ipifyResponse: IpifyModule.IpLocationResponse = await _ipifyApiClient.GetIPLocation(searchCriteria, isIpAddress);
    if (ipifyResponse.kind === IpifyModule.KindEnum.Error) {
        handleIpifyError(ipifyResponse);
        return;
    }

    await _leafletApiClient.updateMapLocation(ipifyResponse.location.lat, ipifyResponse.location.lng);
    updateIPLocationBar(ipifyResponse);
}

/**
 * Handles updating the UI with the response data.
 * @param ipLocationData The object that contains the response data about an IP Address or Domain.
 */
const updateIPLocationBar = (ipLocationData: IpifyModule.IPLocation): void => {
    $(`#${ipAddressResultID}`).text(ipLocationData.ip);
    $(`#${locationResultID}`).text(`${ipLocationData.location.city}, ${ipLocationData.location.region}`);
    $(`#${timezoneResultID}`).text(`UTC ${ipLocationData.location.timezone}`);
    $(`#${ispResultID}`).text(ipLocationData.isp);
}

/**
 * Handles displaying the error response to the UI.
 * @param error The error object that contains the reason why the API call failed.
 */
const handleIpifyError = (error: IpifyModule.Error): void => {
    $(`#${ipAddressResultID}`).text(error.messages);
    $(`#${locationResultID}`).text('');
    $(`#${timezoneResultID}`).text('');
    $(`#${ispResultID}`).text('');
}