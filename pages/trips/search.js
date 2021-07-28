import qs from 'qs'
import Link from 'next/link'
import {useRouter} from "next/router"
import Layout from "@/components/Layout"
import {API_URL} from "@/config/index"
import TripItem from "@/components/TripItem"

export default function SearchPage({trips}) {
    const router = useRouter()

    return (
        <Layout title='Search Results'>
            <Link href='/trips'>Go Back</Link>
            <h1>Search Results for {router.query.term}</h1>
            {trips.length === 0 && <h3>No trips to show</h3>}

            {trips.map(trip => (
                <TripItem key={trip.id} trip={trip}/>
            ))}
        </Layout>
    )
}

export async function getServerSideProps({query: {term}}) {
    const query = qs.stringify({
        _where: {
            _or: [
                {name_contains: term},
                {airline_contains: term},
                {description_contains: term},
                {flight_contains: term},
            ],
        },
    })

    const res = await fetch(`${API_URL}/trips?${query}`)
    const trips = await res.json()

    return {
        props: {trips},
    }
}
