var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var LeafletApiModule;
(function (LeafletApiModule) {
    class LeafletApiClient {
        constructor() {
            this._ipifyModule = new IpifyModule.IpifyClient();
            this.mapID = 'Map';
            this.initMap = () => __awaiter(this, void 0, void 0, function* () {
                this.map = L.map(`${this.mapID}`);
                L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                }).addTo(this.map);
            });
            this.updateMapLocation = (lat, long) => __awaiter(this, void 0, void 0, function* () {
                this.map.setView([lat, long], 13);
                L.marker([lat, long]).addTo(this.map);
            });
        }
        LeafletApiClient() { }
    }
    LeafletApiModule.LeafletApiClient = LeafletApiClient;
})(LeafletApiModule || (LeafletApiModule = {}));
