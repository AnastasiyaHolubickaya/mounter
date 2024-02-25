/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useEffect, useRef } from 'react';
import L, { Icon, LeafletMouseEvent } from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { useTranslation } from 'react-i18next';
//*Styles Map
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';

const Map = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  const { t } = useTranslation();

  useEffect(() => {
    if (mapRef.current) {
      const initialCenter: L.LatLngExpression = [51.505, -0.09];

      const customIcon: Icon = L.icon({
        iconUrl: '/custom_marker.png',
        iconSize: [32, 40],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });

      const map = L.map(mapRef.current).setView(initialCenter, 13);

      const marker = L.marker(initialCenter, {
        icon: customIcon,
        alt: 'New York',
      }).addTo(map);

      marker.bindPopup(t('mapMarker')).openPopup();

      const provider = new OpenStreetMapProvider();

      const searchControlOptions = {
        provider,
        autoCompleteDelay: 300,
        style: 'bar',
        showMarker: true,
        showPopup: false,
        autoClose: true,
      };

      const geoSearchControl = new (GeoSearchControl as any)(
        searchControlOptions
      );

      mapRef.current.style.position = 'relative';

      mapRef.current.style.zIndex = '99';

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(map);

      const onMapClick = (e: LeafletMouseEvent) => {
        if (e.latlng) {
          L.popup()
            .setLatLng(e.latlng)
            .setContent(`${t('clickMap')} ${e.latlng.toString()}`)
            .openOn(map);
        }
      };

      map.on('click', onMapClick);
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
