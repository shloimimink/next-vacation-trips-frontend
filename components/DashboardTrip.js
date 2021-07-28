import Link from 'next/link'
import {FaPencilAlt, FaTimes} from 'react-icons/fa'
import styles from '@/styles/DashboardTrip.module.css'

export default function DashboardTrip({trip, handleDelete}) {
    return (
        <div className={styles.trip}>
            <h4>
                <Link href={`/trips/${trip.slug}`}>
                    <a>{trip.name}</a>
                </Link>
            </h4>
            <Link href={`/trips/edit/${trip.id}`}>
                <a className={styles.edit}>
                    <FaPencilAlt/> <span>Edit Trip</span>
                </a>
            </Link>
            <a
                href='#'
                className={styles.delete}
                onClick={() => handleDelete(trip.id)}
            >
                <FaTimes/> <span>Delete</span>
            </a>
        </div>
    )
}