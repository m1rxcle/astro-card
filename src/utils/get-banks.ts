export async function getBanks(lat: number, lon: number) {
	const query = `
        [out:json];
        node
            ["amenity"="bank"]
            (around:5000,${lat},${lon});
        out;
    `

	const res = await fetch("https://overpass-api.de/api/interpreter", {
		method: "POST",
		body: query,
	})

	return res.json()
}
