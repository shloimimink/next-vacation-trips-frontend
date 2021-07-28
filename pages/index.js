import Layout from "../components/Layout"
import {API_URL} from "@/config/index"
import Link from 'next/link'
import TripItem from "@/components/TripItem"

export default function HomePage({trips}) {

    return (
        <Layout>
            <h1>Upcoming Trips</h1>
            {trips.length === 0 && <h3>No trips to show</h3>}
            {trips.map(trip => (
                <TripItem key={trip.id} trip={trip}/>
            ))}

            {trips.length > 0 && (
                <Link href='/trips'>
                    <a className='btn-secondary'>View All Trips</a>
                </Link>
            )}
        </Layout>
    )
}

export async function getStaticProps() {
    const res = await fetch(`${API_URL}/trips?_sort=date:ASC&_limit=3`)
    const trips = await res.json()

    return {
        props: {trips},
        revalidate: 1
    }
}