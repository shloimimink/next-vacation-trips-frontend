import Layout from "@/components/Layout"
import TripItem from "@/components/TripItem"
import Pagination from "@/components/Pagination"
import {API_URL, PER_PAGE} from "@/config/index"

export default function EventsPage({trips, page, total}) {

    return (
        <Layout>
            <h1>Trips</h1>
            {trips.length === 0 && <h3>No trips to show</h3>}

            {trips.map(trip => (
                <TripItem key={trip.id} trip={trip}/>
            ))}

            <Pagination page={page} total={total}/>
        </Layout>
    );
}

export async function getServerSideProps({query: {page = 1}}) {

    // Calculate start page
    const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE

    // fetch total/count
    const totalRes = await fetch(`${API_URL}/trips/count`)
    const total = await totalRes.json()

    // Fetch trips
    const tripsRes = await fetch(`${API_URL}/trips?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`)
    const trips = await tripsRes.json()

    return {
        props: {trips, page: +page, total}
    }
}