interface Region {
    id: number,
    name: string,
    slug: string,
    location: {
        lat: number,
        lng: number,
    }
}

export default Region