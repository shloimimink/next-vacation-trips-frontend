import Link from 'next/link'
import Image from "next/image"
import styles from '@/styles/TripItem.module.css'

export default function TripItem({trip}) {
    return (
        <div className={styles.trip}>
            <div className={styles.img}>
                <Image
                    src={trip.image ? trip.image.formats.thumbnail.url : '/images/' +
                        'trip-default.png'}
                    width={170}
                    height={100}
                />
            </div>

            <div className={styles.info}>
                <span>
                    {new Date(trip.date).toLocaleDateString('en-US')} arrived at {trip.arrival}
                </span>
                <h3>{trip.name}</h3>
            </div>

            <div className={styles.link}>
                <Link href={`/trips/${trip.slug}`}>
                    <a className='btn'>Details</a>
                </Link>
            </div>
        </div>
    )
}