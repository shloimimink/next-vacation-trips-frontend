import {useState} from "react";
import {parseCookies} from '@/helpers/index'
import Link from 'next/link'
import {API_URL} from "@/config/index";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import {useRouter} from "next/router";
import styles from '@/styles/Form.module.css'
import Layout from "@/components/Layout"

export default function AddTripPage({token}) {
    const [values, setValues] = useState({
        name: '',
        flight: '',
        address: '',
        airline: '',
        date: '',
        arrival: '',
        description: ''
    })

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

        const res = await fetch(`${API_URL}/trips`, {
            method: 'POST',
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


    return (
        <Layout title='Add new vacation place'>
            <Link href='/trips'>Go Back</Link>
            <h1>Add Trip</h1>
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
                            value={values.date}
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
                <input type='submit' value='Add Trip' className='btn'/>
            </form>
        </Layout>
    );
}

export async function getServerSideProps({req}) {
    const {token} = parseCookies(req)

    return {
        props: {
            token,
        },
    }
}
