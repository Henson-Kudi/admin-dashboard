'use client'
import { MapContainer, GeoJSON, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import geoJsonData from '../lib/data/countries.json'
import { useState } from 'react';

const mapColors = {
  normal: '#BBCCE4',
  hover: '#2563EB',
}

export default function Map() {
  const [hoveredCountry, setHoveredCountry] = useState(null);

  // Function to style countries dynamically
  const countryStyle = (feature: any) => ({
    fillColor: hoveredCountry === feature.properties.ADMIN ? mapColors.hover : mapColors.normal,  // Change fill based on hover state
    weight: 0.2,
    color: mapColors.normal,
  });

  // Event handlers for hover and reset
  const onEachCountry = (country: any, layer: any) => {
    const countryName = country.properties.ADMIN;

      // Bind tooltip to the layer (country) that will show on hover
      layer.bindTooltip(countryName, {
        permanent: false,   // Only show on hover (not permanent)
        direction: "auto",  // Tooltip will adjust based on location
      });

    layer.on({
      mouseover: (e:any) => {
        setHoveredCountry(country.properties.ADMIN);  // Set hovered country name
        e.target.setStyle({
          fillColor: mapColors.hover,  // Color when hovered
          weight: 1.5,
        });
      },
      mouseout: (e: any) => {
        setHoveredCountry(null);  // Reset on mouse out
        
        e.target.setStyle({
          fillColor: mapColors.normal,  // Default fill color
          weight: 1,
        });
      },
    });
  };

  return (
    <MapContainer
        center={[0, 0]}
        zoom={2}
        className='w-full h-full bg-secondary'
        zoomControl={false} // hides the zoom buttons
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoJSON
        data={geoJsonData as any}
        style={countryStyle}
        onEachFeature={onEachCountry} 
      />
    </MapContainer>
  );
}
