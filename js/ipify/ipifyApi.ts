module IpifyModule {

    export class IpifyClient {

        IpifyClient() { }

        private readonly _ipifyConfig = new IpifyConfig();
        private readonly _clientIpUrl: string = 'ClientIpUrl';
        private readonly _ipLocationUrl: string = 'IPLocationUrl';
        private readonly _ipSearch = 'ipAddress';
        private readonly _domainSearch = 'domain';

        GetClientIP = async (): Promise<ClientIpAddress> => {
            var url = this._ipifyConfig.Get(this._clientIpUrl);
            return $.ajax({
                url: url,
                type: 'GET',
                dataType: 'JSON'
            });
        }

        GetIPLocation = async (criteria: string, isIP: boolean): Promise<IPLocation> => {
            var searchType = isIP ? this._ipSearch : this._domainSearch;
            var urlBase = this._ipifyConfig.Get(this._ipLocationUrl);
            var completeUrl = `${urlBase}&${searchType}=${criteria}`;
            return $.ajax({
                url: completeUrl,
                type: 'GET',
                dataType: 'JSON'
            });
        }

    }

    export class ClientIpAddress {
        ip: string
    }

    export class IPLocation {
        ip: string;
        location: Location;
        domains: string[];
        as: AS;
        isp: string;
    }

    class Location {
        city: string;
        country: string;
        geonameId: string;
        lat: number;
        lng: number;
        postalCode: string;
        region: string;
        timezone: string;
    }

    class AS {
        asn: number;
        name: string;
        route: string;
        domain: string;
        type: string;
    }

    class IpifyConfig {

        IpifyConfig() { }

        private readonly config = new Map<string, string>([
            ['ClientIpUrl', 'https://api.ipify.org?format=jsonp&callback=?'],
            ['IPLocationUrl', 'https://geo.ipify.org/api/v2/country,city?apiKey=at_xcol9kWFXXTgN3JnNEvDV6U2XgXTb']
        ]);

        Get = (key: string): string | undefined => {
            return this.config.get(key);
        }
    }//https://geo.ipify.org/api/v2/country?apiKey=at_xcol9kWFXXTgN3JnNEvDV6U2XgXTb&ipAddress=8.8.8.8

}