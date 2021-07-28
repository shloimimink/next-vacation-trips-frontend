import Image from 'next/image'
import {useState, useEffect} from 'react'
import ReactMapGl, {Marker} from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import Geocode from 'react-geocode'


export default function TripMap({trip}) {
    const [lat, setLat] = useState(null)
    const [lng, setLng] = useState(null)
    const [loading, setLoading] = useState(true)
    const [viewport, setViewport] = useState({
        latitude: 40.712772,
        longitude: -73.935242,
        width: '100%',
        height: '500px',
        zoom: 12,
    })

    useEffect(() => {
        // Get latitude & longitude from address.
        Geocode.fromAddress(trip.address).then(
            (response) => {
                const {lat, lng} = response.results[0].geometry.location
                setLat(lat)
                setLng(lng)
                setViewport({...viewport, latitude: lat, longitude: lng})
                setLoading(false)
            },
            (error) => {
                console.error(error)
            }
        )
    }, [])


    Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY)

    if (loading) return false

    return (
        <ReactMapGl
            {...viewport}
            mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
            onViewportChange={(vp) => setViewport(vp)}>
            <Marker key={trip.id} longitude={lng} latitude={lat}>
                <Image src='/images/pin.svg' width={30} height={30}/>
            </Marker>
        </ReactMapGl>
    )
}