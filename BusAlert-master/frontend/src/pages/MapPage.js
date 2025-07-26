import React, { useEffect, useState, useCallback, useRef } from 'react';
import { GoogleMap, LoadScript, MarkerF, DirectionsRenderer, InfoWindow, Autocomplete, StreetViewPanorama } from '@react-google-maps/api';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import conductorImg from '../images/Conductor.jpeg';
import './MapPages.css'


const mapContainerStyle = {
  width: '100%',
  height: '500px'
};

const centerDefault = { lat: 21.8818, lng: -102.2917 }; // Coordenadas de Aguascalientes

const busRoutes = [
  { start: { lat: 21.902680, lng: -102.254980 }, end: { lat: 21.850, lng: -102.295 } },
  { start: { lat: 21.837304, lng:  -102.358563 }, end: { lat: 21.884, lng: -102.291 } },
];

function MapPage() {
  const [location, setLocation] = useState(null);
  const [directions, setDirections] = useState([]);
  const [stops, setStops] = useState([]);
  const [busLocations, setBusLocations] = useState([]);
  const [selectedBus, setSelectedBus] = useState();
  const [searchLocation, setSearchLocation] = useState(null);
  const [placeDetails, setPlaceDetails] = useState(null);
  const autocompleteRef = useRef(null);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [showBus, setshowBus] = useState();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
      },
      () => {
        console.warn('No se pudo obtener la ubicación');
      }
    );
    const timer = setTimeout(() => {
      setShowRatingModal(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmitRating = () => {
    console.log('Puntuación:', rating);
    console.log('Comentario:', comment);
    setShowRatingModal(false);
  };
  

  const loadDirections = useCallback((map) => {
    if (!map) return;

    const directionsService = new window.google.maps.DirectionsService();
    const newDirections = [];

    busRoutes.forEach((route, index) => {
      directionsService.route(
        {
          origin: route.start,
          destination: route.end,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            newDirections[index] = result;
            setDirections((prevDirections) => [...prevDirections, result]);
          }
        }
      );
    });

    axios.get('http://localhost:5000/api/busstops')
    .then(response => {
      setStops(response.data); // Asignamos las paradas al estado 'stops'
    })
    .catch(err => {
      console.error('Error al obtener las paradas:', err);
    });

    axios.get('http://localhost:5000/api/stops').then(response => {
      setStops(response.data);
    }).catch(err => {
      console.error('Error al obtener las paradas:', err);
    });

    axios.get('http://localhost:5000/api/location/buses').then(response => {
      setBusLocations(response.data);
    }).catch(err => {
      console.error('Error al obtener ubicaciones de los autobuses:', err);
    });
  }, []);

  const handlePlaceSelect = () => {
    const place = autocompleteRef.current.getPlace();
    if (place && place.geometry) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setSearchLocation({ lat, lng });

        // Hacer la solicitud de detalles para obtener información adicional
        axios.get(`http://localhost:5000/api/place/details?place_id=${place.place_id}`)
          .then(response => {
              setPlaceDetails(response.data.result);
          })
          .catch(error => console.error('Error al obtener detalles del lugar:', error));
    }
};
  return (
    <Container>
      <h1>Mapa de Transporte</h1>
      <LoadScript googleMapsApiKey="AIzaSyDkCXkdamNXTN3uZyM_7o7sWobnf-Ml6mA" libraries={['places']}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={searchLocation || location || centerDefault}
          zoom={14}
          onLoad={loadDirections}
        >
          {location && <MarkerF position={location} title="Tu ubicación" />}
          {searchLocation && (
            <>
              <MarkerF position={searchLocation} title="Ubicación buscada" icon="http://maps.google.com/mapfiles/ms/icons/yellow-dot.png" />
              <StreetViewPanorama position={searchLocation} options={{ pov: { heading: 100, pitch: 0 } }} />
            </>
          )}
          {stops.map((stop, index) => (
            <MarkerF
              key={index}
              position={stop.location}
              icon={stop.busAvailable ? 'http://maps.google.com/mapfiles/ms/icons/green-dot.png' : 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'}
            />
          ))}
          {busLocations.map((bus, driverName, index) => (
            <MarkerF
              key={index}
              position={{ lat: bus.lat, lng: bus.lng }}
              onClick={() => {
                console.log(bus)
                setSelectedBus(bus)}}
              icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
            >
              {selectedBus && selectedBus.busId === bus.busId && (
                <InfoWindow onCloseClick={() => setSelectedBus()}>
                  <div>
                    <h3>Autobús: {bus.busId}</h3>
                    <p>Nombre del Conductor: {bus.driverName}</p>
                    <p>Calificación: {bus.rating} estrellas</p>
                    <p>Tiempo estimado: 3 minutos</p>
                  </div>
                </InfoWindow>
              )}
            </MarkerF>
          ))}
          {directions.map((dir, index) => (
            <DirectionsRenderer key={index} directions={dir} />
          ))}
        </GoogleMap>
      </LoadScript>
      {showRatingModal && selectedBus && (
        <div style={{ position: 'fixed', top: '20%', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'white', padding: '20px', boxShadow: '0px 4px 10px rgba(0,0,0,0.2)', borderRadius: '8px' }}>
          <h2>Califica el servicio</h2>
          <img src={conductorImg} alt="Conductor" style={{ width: '100px', borderRadius: '50%' }} />
          <p>Operador: {selectedBus.driverName || "Desconocido"}</p>
          <div>
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} onClick={() => setRating(star)} style={{ cursor: 'pointer', fontSize: '24px', color: star <= rating ? 'gold' : 'gray' }}>★</span>
            ))}
          </div>
          <textarea placeholder="Deja tu comentario" value={comment} onChange={(e) => setComment(e.target.value)} style={{ width: '100%', marginTop: '10px' }} />
          <button onClick={handleSubmitRating} style={{ display: 'block', marginTop: '10px', padding: '5px 10px', backgroundColor: 'blue', color: 'white', border: 'none', cursor: 'pointer' }}>Enviar</button>
        </div>
      )}


    <div class="info-container">
        <div class="location-box">
            <div class="circle green"></div>
            <p><strong>Ubicación Verde   :</strong> Paradas de autobuses disponibles!.</p>
        </div>
        <div class="location-box">
            <div class="circle red"></div>
            <p><strong>Ubicación Roja :</strong> Parada con obstrucción de paso.</p>
        </div>
    </div>


    </Container>
  );
}

export default MapPage;




//AIzaSyDkCXkdamNXTN3uZyM_7o7sWobnf-Ml6mA