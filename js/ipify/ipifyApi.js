var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * Wrapper module that contains all objects required to interact with the IPIFY API.
 */
var IpifyModule;
(function (IpifyModule) {
    /**
     * The IPIFY Api Client used to handle requests to the IPIFY Library.
     */
    class IpifyClient {
        constructor() {
            this._ipifyConfig = new IpifyConfig();
            this._clientIpUrl = 'ClientIpUrl';
            this._ipLocationUrl = 'IPLocationUrl';
            this._ipSearch = 'ipAddress';
            this._domainSearch = 'domain';
            /**
             * Obtains the client's IP Address.
             * @returns An object that contains the Client's IP Address.
             */
            this.GetClientIP = () => __awaiter(this, void 0, void 0, function* () {
                var url = this._ipifyConfig.Get(this._clientIpUrl);
                return $.ajax({
                    url: url,
                    type: 'GET',
                    dataType: 'JSON'
                });
            });
            /**
             * Obtains the location data for a given IP Address or Domain.
             * @param criteria The search criteria to query the IPIFY API with.
             * @param isIP Whether or not the Search Criteria contains an IP Address or a Domain.
             * @returns Either an object with location data related to the IP Address or Domain or an Error object.
             */
            this.GetIPLocation = (criteria, isIP) => __awaiter(this, void 0, void 0, function* () {
                var searchType = isIP ? this._ipSearch : this._domainSearch;
                var urlBase = this._ipifyConfig.Get(this._ipLocationUrl);
                var completeUrl = `${urlBase}&${searchType}=${criteria}`;
                try {
                    return $.ajax({
                        url: completeUrl,
                        type: 'GET',
                        dataType: 'JSON'
                    });
                }
                catch (ex) {
                    var ipifyError = JSON.parse(ex.responseText);
                    return ipifyError;
                }
            });
        }
    }
    IpifyModule.IpifyClient = IpifyClient;
    /**
     * Response data from getting the client's IP Address.
     */
    class ClientIpAddress {
    }
    IpifyModule.ClientIpAddress = ClientIpAddress;
    /**
     * Response data obtained from searching the Ip Address or Domain.
     */
    class IPLocation {
    }
    IpifyModule.IPLocation = IPLocation;
    class Location {
    }
    class AS {
    }
    /**
     * Error object used to store data about the ensued error.
     */
    class Error {
    }
    IpifyModule.Error = Error;
    /**
     * The types of objects available in this module. Used when type guarding.
     */
    let KindEnum;
    (function (KindEnum) {
        KindEnum[KindEnum["IPLocation"] = 0] = "IPLocation";
        KindEnum[KindEnum["Error"] = 1] = "Error";
    })(KindEnum = IpifyModule.KindEnum || (IpifyModule.KindEnum = {}));
    /**
     * Holds configuration data for the Leaflet API.
     */
    class IpifyConfig {
        constructor() {
            this.config = new Map([
                ['ClientIpUrl', 'https://api.ipify.org?format=jsonp&callback=?'],
                ['IPLocationUrl', 'https://geo.ipify.org/api/v2/country,city?apiKey=at_xcol9kWFXXTgN3JnNEvDV6U2XgXTb']
            ]);
            /**
             * Gets the specified key from the config map.
             * @param key The string value to find in the config map.
             * @returns Either the string value stored in config or undefined if not found.
             */
            this.Get = (key) => {
                return this.config.get(key);
            };
        }
    }
})(IpifyModule || (IpifyModule = {}));
