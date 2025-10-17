import '../css/signup.css'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form"

export default function Signup() {

        const {
            register,
            handleSubmit,
            watch,
            formState: { errors },
        } = useForm()

        async function signup(formData) {
            const { name, email, password } = Object.fromEntries(formData)
            if (!name || !email || !password) {
                return alert('All fields are Required')
            }
        }

        return (
            <>
                <h1>Signup</h1>
                <form action={signup}>

                    <label htmlFor="name">Full Name</label>
                    <input id="name" type="text" name="name" placeholder='Name' title='Name' required />

                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" name="email" placeholder='Email' title='Email' required />

                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" name="password" placeholder='Password' title='Password must be 6-20 characters' required />

                    <button>Submit</button>

                    <p>Already exists? <Link to='/login'>Login</Link></p>
                </form>
            </>
        )
    }