module LeafletApiModule {

    export class LeafletApiClient {

        private readonly _ipifyModule = new IpifyModule.IpifyClient();
        private map;
        private mapID = 'Map';

        LeafletApiClient() { }

        initMap = async (): Promise<void> => {
            this.map = L.map(`${this.mapID}`);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(this.map);
        }

        updateMapLocation = async (lat: number, long: number): Promise<void> => {
            this.map.setView([lat, long], 13);
            L.marker([lat, long],).addTo(this.map);
        }
    }
}