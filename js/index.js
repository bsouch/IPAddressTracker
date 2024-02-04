var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const initMap = () => __awaiter(this, void 0, void 0, function* () {
    yield _leafletApiClient.initMap();
    var clientIpAddress = yield _ipifyApiClient.GetClientIP();
    var ipLocationData = yield _ipifyApiClient.GetIPLocation(clientIpAddress.ip, true);
    yield _leafletApiClient.updateMapLocation(ipLocationData.location.lat, ipLocationData.location.lng);
    updateIPLocationBar(ipLocationData);
});
const updateIPLocationBar = (ipLocationData) => {
    $(`#${ipAddressResultID}`).text(ipLocationData.ip);
    $(`#${locationResultID}`).text(`${ipLocationData.location.city}, ${ipLocationData.location.region}`);
    $(`#${timezoneResultID}`).text(`UTC ${ipLocationData.location.timezone}`);
    $(`#${ispResultID}`).text(ipLocationData.isp);
};
const findAddress = (searchCriteria) => __awaiter(this, void 0, void 0, function* () {
    var isIpAddress = ipIdentifier.test(searchCriteria);
    var ipLocationData = yield _ipifyApiClient.GetIPLocation(searchCriteria, isIpAddress);
    yield _leafletApiClient.updateMapLocation(ipLocationData.location.lat, ipLocationData.location.lng);
    updateIPLocationBar(ipLocationData);
});
