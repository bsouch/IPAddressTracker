/**
 * Wrapper module that contains all objects required to interact with the IPIFY API.
 */
module IpifyModule {

    /**
     * The IPIFY Api Client used to handle requests to the IPIFY Library.
     */
    export class IpifyClient {

        constructor() { }

        private readonly _ipifyConfig = new IpifyConfig();
        private readonly _clientIpUrl: string = 'ClientIpUrl';
        private readonly _ipLocationUrl: string = 'IPLocationUrl';
        private readonly _ipSearch = 'ipAddress';
        private readonly _domainSearch = 'domain';

        /**
         * Obtains the client's IP Address.
         * @returns An object that contains the Client's IP Address.
         */
        GetClientIP = async (): Promise<ClientIpAddress> => {
            var url = this._ipifyConfig.Get(this._clientIpUrl);
            return $.ajax({
                url: url,
                type: 'GET',
                dataType: 'JSON'
            });
        }

        /**
         * Obtains the location data for a given IP Address or Domain.
         * @param criteria The search criteria to query the IPIFY API with.
         * @param isIP Whether or not the Search Criteria contains an IP Address or a Domain.
         * @returns Either an object with location data related to the IP Address or Domain or an Error object.
         */
        GetIPLocation = async (criteria: string, isIP: boolean): Promise<IPLocation | Error> => {
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
                var ipifyError: IpifyModule.Error = JSON.parse(ex.responseText);
                return ipifyError;
            }
        }

    }

    /**
     * Response data from getting the client's IP Address.
     */
    export class ClientIpAddress {
        ip: string
    }

    /**
     * Response data obtained from searching the Ip Address or Domain.
     */
    export class IPLocation {
        ip: string;
        location: Location;
        domains: string[];
        as: AS;
        isp: string;
        kind: KindEnum.IPLocation;
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

    /**
     * Error object used to store data about the ensued error.
     */
    export class Error {
        code: number;
        messages: string;
        kind: KindEnum.Error;
    }

    /**
     * Wrapper type for the location response.
     */
    export type IpLocationResponse = IPLocation | Error;

    /**
     * The types of objects available in this module. Used when type guarding.
     */
    export enum KindEnum {
        IPLocation,
        Error
    }

    /**
     * Holds configuration data for the Leaflet API.
     */
    class IpifyConfig {

        constructor() { }

        private readonly config = new Map<string, string>([
            ['ClientIpUrl', 'https://api.ipify.org?format=jsonp&callback=?'],
            ['IPLocationUrl', 'https://geo.ipify.org/api/v2/country,city?apiKey=at_xcol9kWFXXTgN3JnNEvDV6U2XgXTb']
        ]);

        /**
         * Gets the specified key from the config map.
         * @param key The string value to find in the config map.
         * @returns Either the string value stored in config or undefined if not found.
         */
        Get = (key: string): string | undefined => {
            return this.config.get(key);
        }
    }

}