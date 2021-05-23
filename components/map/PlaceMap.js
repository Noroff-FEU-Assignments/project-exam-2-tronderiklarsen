import Image from "next/image";
import { useState, useEffect } from "react";
import ReactMapGl, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Geocode from "react-geocode";

export default function PlaceMap({ place }) {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewport, setViewport] = useState({
    latitude: 60.397976,
    longitude: 5.324383,
    width: "100%",
    height: "400px",
    zoom: 15,
  });

  useEffect(() => {
    Geocode.fromAddress(place.address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setLat(lat);
        setLng(lng);
        setViewport({ ...viewport, latitude: lat, longitude: lng });
        setLoading(false);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY);

  if (loading) return false;

  return (
    <ReactMapGl
      {...viewport}
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
      onViewportChange={(vp) => setViewport(vp)}
    >
        <Marker key={place.id} latitude={lat} longitude={lng}>
            <Image src="/images/map-pin.svg" width={30} height={30}/>
        </Marker>
    </ReactMapGl>
  );
}
