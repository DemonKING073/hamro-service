interface Vendor {
    id: number;
    name: string;
    slug: string;
    location: {
        lat: number,
        lng: number
    };
    address: string;
    regionId: number;
    defaultRegionVendor: boolean;
}

export default Vendor