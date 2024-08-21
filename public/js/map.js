<<<<<<< HEAD
// Assuming `mapToken` and `coordinates` are provided in the template
mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: coordinates,
    zoom: 10
});

new mapboxgl.Marker({ color: "red" })
    .setLngLat(coordinates)
    .addTo(map);
=======

	mapboxgl.accessToken = mapToken;
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        center: coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 10 // starting zoom
    });



const maker = new mapboxgl.Marker({color:"red"})
.setLngLat(coordinates)
.addTo(map);
>>>>>>> b0d1ccb (Add Project Files)
