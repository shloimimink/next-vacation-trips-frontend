import Layout from '@/components/Layout'
import {parseCookies} from "@/helpers/index";
import DashboardTrip from "@/components/DashboardTrip";
import {useRouter} from 'next/router'
import {API_URL} from '@/config/index'
import styles from '@/styles/Dashboard.module.css'
import {toast} from "react-toastify"

export default function DashboardPage({trips, token}) {
    const router = useRouter()

    const deleteTrip = async (id) => {
        if (confirm('Are you sure ?')) {
            const res = await fetch(`${API_URL}/trips/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            const data = await res.json()

            if (!res.ok) {
                toast.error(data.message)
            } else {
                router.reload('/trips')
            }
        }
    }

    return (
        <Layout title='User Dashboard'>
            <div className={styles.dash}>
                <h1>Dashboard</h1>
                <h3>My Trips</h3>

                {trips.map((trip) => (
                    <DashboardTrip key={trip.id} trip={trip} handleDelete={deleteTrip}/>
                ))}
            </div>

        </Layout>
    );
};

export async function getServerSideProps({req}) {
    const {token} = parseCookies(req)

    const res = await fetch(`${API_URL}/trips/me`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    const trips = await res.json()

    return {
        props: {
            trips,
            token
        }
    }
}