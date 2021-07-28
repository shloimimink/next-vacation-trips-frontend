import Link from 'next/link'
import Image from "next/image";
import TripMap from "@/components/TripMap";
import Layout from "@/components/Layout";
import {API_URL} from "@/config/index";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import styles from '@/styles/Trip.module.css'

export default function TripPage({trip}) {
    return (
        <Layout>
            <div className={styles.trip}>
                <span>
                   <strong>{new Date(trip.date).toLocaleDateString('en-US')}</strong> arrived at {trip.arrival}
                </span>
                <h1>{trip.name}</h1>
                <ToastContainer/>
                {trip.image && (
                    <div className={styles.image}>
                        <Image
                            src={trip.image.formats.medium.url}
                            width={960}
                            height={600}
                        />
                    </div>
                )}

                <h4>Airline</h4>
                <p>{trip.airline}</p>
                <h4>Flight Number:</h4>
                <p>{trip.flight}</p>
                <h4>Address:</h4>
                <p>{trip.address}</p>
                <h4>Description:</h4>
                <p>{trip.description}</p>

                <TripMap trip={trip}/>

                <Link href='/trips'>
                    <a className={styles.back}> {'<'} Go Back
                    </a>
                </Link>
            </div>
        </Layout>
    );
}

/*
export async function getServerSideProps({query: {slug}}) {
    const res = await fetch(`${API_URL}/trips?slug=${slug}`)

    const trips = await res.json()

    return {
        props: {
            evt: trips[0]
        }
    }
}
*/


export async function getStaticPaths() {
    const res = await fetch(`${API_URL}/trips`)
    const trips = await res.json()

    const paths = trips.map(trip => ({
        params: {slug: trip.slug}
    }))

    return {
        paths,
        fallback: true
    }
}

export async function getStaticProps({params: {slug}}) {
    const res = await fetch(`${API_URL}/trips?slug=${slug}`)
    const trips = await res.json()

    return {
        props: {
            trip: trips[0],
            revalidate: 1
        }
    }
}