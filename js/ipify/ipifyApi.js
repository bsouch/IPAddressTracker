var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var IpifyModule;
(function (IpifyModule) {
    class IpifyClient {
        constructor() {
            this._ipifyConfig = new IpifyConfig();
            this._clientIpUrl = 'ClientIpUrl';
            this._ipLocationUrl = 'IPLocationUrl';
            this._ipSearch = 'ipAddress';
            this._domainSearch = 'domain';
            this.GetClientIP = () => __awaiter(this, void 0, void 0, function* () {
                var url = this._ipifyConfig.Get(this._clientIpUrl);
                return $.ajax({
                    url: url,
                    type: 'GET',
                    dataType: 'JSON'
                });
            });
            this.GetIPLocation = (criteria, isIP) => __awaiter(this, void 0, void 0, function* () {
                var searchType = isIP ? this._ipSearch : this._domainSearch;
                var urlBase = this._ipifyConfig.Get(this._ipLocationUrl);
                var completeUrl = `${urlBase}&${searchType}=${criteria}`;
                return $.ajax({
                    url: completeUrl,
                    type: 'GET',
                    dataType: 'JSON'
                });
            });
        }
        IpifyClient() { }
    }
    IpifyModule.IpifyClient = IpifyClient;
    class ClientIpAddress {
    }
    IpifyModule.ClientIpAddress = ClientIpAddress;
    class IPLocation {
    }
    IpifyModule.IPLocation = IPLocation;
    class Location {
    }
    class AS {
    }
    class IpifyConfig {
        constructor() {
            this.config = new Map([
                ['ClientIpUrl', 'https://api.ipify.org?format=jsonp&callback=?'],
                ['IPLocationUrl', 'https://geo.ipify.org/api/v2/country,city?apiKey=at_xcol9kWFXXTgN3JnNEvDV6U2XgXTb']
            ]);
            this.Get = (key) => {
                return this.config.get(key);
            };
        }
        IpifyConfig() { }
    } //https://geo.ipify.org/api/v2/country?apiKey=at_xcol9kWFXXTgN3JnNEvDV6U2XgXTb&ipAddress=8.8.8.8
})(IpifyModule || (IpifyModule = {}));
