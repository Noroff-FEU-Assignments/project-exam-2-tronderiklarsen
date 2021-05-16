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

  Geocode.setApiKey("AIzaSyCX7PMN-1VSV1yqBOg4NjJJoqf2bJmZukA");

  if (loading) return false;

  return (
    <ReactMapGl
      {...viewport}
      mapboxApiAccessToken={"pk.eyJ1IjoidHJvbmRlcmlrbGFyc2VuIiwiYSI6ImNrYTRibmdrbzB6OGkzZnF5YzZ3b3Y0dmMifQ.N3lWVQjsfJsYkRJknNl3GQ"}
      onViewportChange={(vp) => setViewport(vp)}
    >
        <Marker key={place.id} latitude={lat} longitude={lng}>
            <Image src="/images/map-pin.svg" width={30} height={30}/>
        </Marker>
    </ReactMapGl>
  );
}
