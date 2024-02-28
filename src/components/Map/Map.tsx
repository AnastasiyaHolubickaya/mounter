/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useEffect, useRef } from 'react';
import L, { Icon, LeafletMouseEvent } from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { useTranslation } from 'react-i18next';
//*Styles Map
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';

const Map = () => {
  //* Reference to the map container element
  const mapRef = useRef<HTMLDivElement | null>(null);

  //* Accessing translation function from i18n
  const { t } = useTranslation();

  //* Effect to initialize the map and handle cleanup
  useEffect(() => {
    //* Check if the map container element is available
    if (mapRef.current) {
      //* Initial map center coordinates
      const initialCenter: L.LatLngExpression = [51.505, -0.09];

      //* Custom icon for the map marker
      const customIcon: Icon = L.icon({
        iconUrl: '/custom_marker.png',
        iconSize: [32, 40],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });

      //* Create a Leaflet map instance
      const map = L.map(mapRef.current).setView(initialCenter, 13);

      //* Add a marker to the map using the custom icon
      const marker = L.marker(initialCenter, {
        icon: customIcon,
        alt: 'New York',
      }).addTo(map);

      //* Bind a popup to the marker with translated content
      marker.bindPopup(t('mapMarker')).openPopup();

      //* Create an OpenStreetMapProvider for geosearch
      const provider = new OpenStreetMapProvider();

      //* Options for the GeoSearchControl
      const searchControlOptions = {
        provider,
        autoCompleteDelay: 300,
        style: 'bar',
        showMarker: true,
        showPopup: false,
        autoClose: true,
      };

      //* Create the GeoSearchControl
      const geoSearchControl = new (GeoSearchControl as any)(
        searchControlOptions
      );

      //* Adjust styling and z-index of the map container
      mapRef.current.style.position = 'relative';
      mapRef.current.style.zIndex = '99';

      //* Add the OpenStreetMap tile layer to the map
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(map);

      //* Event handler for map clicks
      const onMapClick = (e: LeafletMouseEvent) => {
        if (e.latlng) {
          //* Display a popup on the map with the clicked coordinates
          L.popup()
            .setLatLng(e.latlng)
            .setContent(`${t('clickMap')} ${e.latlng.toString()}`)
            .openOn(map);
        }
      };

      //* Attach the click event handler to the map
      map.on('click', onMapClick);
      //* Add the GeoSearchControl to the map
      map.addControl(geoSearchControl);

      return () => {
        map.off('click', onMapClick);
        map.remove();
      };
    }
  }, [t]);

  return <div ref={mapRef} style={{ height: '500px' }}></div>;
};

export default memo(Map);
