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
 * Wrapper module that contains all objects required to interact with the Leaflet Library.
 */
var LeafletApiModule;
(function (LeafletApiModule) {
    /**
     * The Leaflet Client used to handle requests to the Leaflet Library.
     */
    class LeafletClient {
        constructor() {
            this._leafletConfig = new LeafletConfig();
            this.mapID = 'Map';
            this.defaultZoom = 13;
            this.maxZoom = 19;
            this.iconUrl = '../../images/icon-location.svg';
            /**
             * Updates the location shown on the Map.
             * @param lat The latitude value.
             * @param long The longitude value.
             */
            this.updateMapLocation = (lat, long) => __awaiter(this, void 0, void 0, function* () {
                this.map.setView([lat, long], this.defaultZoom);
                L.marker([lat, long], { icon: this.markerIcon }).addTo(this.map);
            });
            this.map = L.map(`${this.mapID}`, { zoomControl: false, attributionControl: false });
            this.markerIcon = L.icon({
                iconUrl: this.iconUrl,
                iconSize: [50, 60]
            });
            L.tileLayer(this._leafletConfig.Get('TileUrl'), {
                maxZoom: this.maxZoom,
                attribution: ''
            }).addTo(this.map);
        }
    }
    LeafletApiModule.LeafletClient = LeafletClient;
    /**
     * Holds configuration data for the Leaflet API.
     */
    class LeafletConfig {
        constructor() {
            this.config = new Map([
                ['TileUrl', 'https://tile.openstreetmap.org/{z}/{x}/{y}.png']
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
})(LeafletApiModule || (LeafletApiModule = {}));
