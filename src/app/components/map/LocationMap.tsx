import type { T } from "@/lib/type/common";
import type { Property } from "@/lib/type/property";
import { customiseAddress } from "@/lib/utils";
import "leaflet/dist/leaflet.css";
import React, { useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";

interface LocationMapType {
  property: Property;
}

function LocationMarker() {
  const [position, setPosition] = useState(null);

  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e: T) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup> You are here </Popup>
    </Marker>
  );
}

const LocationMap: React.FC<LocationMapType> = React.memo(({ property }) => {
  const {
    address,
    address: { geoCode },
  } = property;

  return (
    <MapContainer
      center={[Number(geoCode?.lat), Number(geoCode?.long)]} // Seoul
      zoom={16}
      style={{
        height: "400px",
        width: "100%",
        marginTop: "13px",
        borderRadius: "10px",
        zIndex: "20",
      }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/*TARGET PLACE */}
      <Marker position={[Number(geoCode?.lat), Number(geoCode?.long)]}>
        <Popup>{customiseAddress(address)}</Popup>
      </Marker>

      {/*YOUR CURRENT PLACE WITH ANIMATION */}
      <LocationMarker />
    </MapContainer>
  );
});
export default LocationMap;
