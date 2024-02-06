/**
 * Wrapper module that contains all objects required to interact with the Leaflet Library.
 */
module LeafletApiModule {

    /**
     * The Leaflet Client used to handle requests to the Leaflet Library.
     */
    export class LeafletClient {

        private readonly _leafletConfig = new LeafletConfig();
        private map;
        private mapID = 'Map';
        private markerIcon;
        private readonly defaultZoom = 13;
        private readonly maxZoom = 19;
        private readonly iconUrl = '../../images/icon-location.svg';

        constructor() {
            this.map = L.map(`${this.mapID}`);
            this.markerIcon = L.icon({
                iconUrl: this.iconUrl,
                iconSize: [50, 60]
            });
            L.tileLayer(this._leafletConfig.Get('TileUrl'), {
                maxZoom: this.maxZoom,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(this.map);
        }

        /**
         * Updates the location shown on the Map.
         * @param lat The latitude value.
         * @param long The longitude value.
         */
        updateMapLocation = async (lat: number, long: number): Promise<void> => {
            this.map.setView([lat, long], this.defaultZoom);
            L.marker([lat, long], { icon: this.markerIcon }).addTo(this.map);
        }
    }

    /**
     * Holds configuration data for the Leaflet API.
     */
    class LeafletConfig {

        constructor() { }

        private readonly config = new Map<string, string>([
            ['TileUrl', 'https://tile.openstreetmap.org/{z}/{x}/{y}.png']
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