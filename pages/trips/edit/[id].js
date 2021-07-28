import {useState} from "react"
import Link from 'next/link'
import {parseCookies} from '@/helpers/index'
import {FaImage} from 'react-icons/fa'
import Image from "next/image"
import moment from 'moment'
import {API_URL} from "@/config/index"
import {toast, ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import {useRouter} from "next/router"
import styles from '@/styles/Form.module.css'
import Layout from "@/components/Layout"
import ImageUpload from "@/components/ImageUpload"
import Modal from "@/components/Model"

export default function EditTripPage({trip, token}) {
    const [values, setValues] = useState({
        name: trip.name,
        flight: trip.flight,
        address: trip.address,
        airline: trip.airline,
        date: trip.date,
        arrival: trip.arrival,
        description: trip.description
    })

    const [imagePreview, setImagePreview] = useState(
        trip.image ? trip.image.formats.thumbnail.url : null
    )
    const [showModal, setShowModal] = useState(false)


    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Validation
        const hasEmptyFields = Object.values(values).some(
            (element) => element === ''
        )

        if (hasEmptyFields) {
            toast.error('Please fill in all fields')
        }

        const res = await fetch(`${API_URL}/trips/${trip.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(values)
        })

        if (!res.ok) {
            if (res.status === 403 || res.status === 401) {
                toast.error('No token included')
                return
            }
            toast.error('Something went wrong')
        } else {
            const trip = await res.json()
            router.push(`/trips/${trip.slug}`)
        }
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setValues({...values, [name]: value})
    }

    const imageUploaded = async (e) => {
        const res = await fetch(`${API_URL}/trips/${trip.id}`)
        const data = await res.json()
        setImagePreview(data.image.formats.thumbnail.url)
        setShowModal(false)
    }

    return (
        <Layout title='Add new vacation place'>
            <Link href='/trips'>Go Back</Link>
            <h1>Edit Trip</h1>
            <ToastContainer/>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.grid}>
                    <div>
                        <label htmlFor='name'>Trip Name</label>
                        <input
                            type='text'
                            id='name'
                            name='name'
                            value={values.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='performers'>Flight No.</label>
                        <input
                            type='text'
                            name='flight'
                            id='flight'
                            value={values.flight}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='airline'>Airline</label>
                        <input
                            type='text'
                            name='airline'
                            id='airline'
                            value={values.airline}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='address'>Address</label>
                        <input
                            type='text'
                            name='address'
                            id='address'
                            value={values.address}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='date'>Date</label>
                        <input
                            type='date'
                            name='date'
                            id='date'
                            value={moment(values.date).format('yyy-MM-DD')}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='time'>Arrival Time</label>
                        <input
                            type='text'
                            name='arrival'
                            id='arrival'
                            value={values.arrival}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor='description'>Event Description</label>
                    <textarea
                        type='text'
                        name='description'
                        id='description'
                        value={values.description}
                        onChange={handleInputChange}
                    />
                </div>
                <input type='submit' value='Update Trip' className='btn'/>
            </form>

            <h2>Event Image</h2>
            {imagePreview ? (
                <Image src={imagePreview} height={100} width={170}/>
            ) : (
                <div>
                    <p>No image uploaded</p>
                </div>
            )}

            <div>
                <button onClick={() => setShowModal(true)} className="btn-secondary">
                    <FaImage/> Set Image
                </button>
            </div>

            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <ImageUpload
                    tripId={trip.id}
                    imageUploaded={imageUploaded}
                    token={token}
                />
            </Modal>

        </Layout>
    );
}

export async function getServerSideProps({params: {id}, req}) {
    const {token} = parseCookies(req)

    const res = await fetch(`${API_URL}/trips/${id}`)
    const trip = await res.json()

    return {
        props: {
            trip,
            token
        }
    }
}






