import '../css/signup.css'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useState } from 'react'

export default function Login() {

    const apiUrl = import.meta.env.VITE_API_URL

    const navigate = useNavigate()
    const [serverMsg, setServerMsg] = useState(null)


    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm()

    async function onSubmit(data) {
        try {
            const response = await axios.post(`http://localhost:5000/auth/login`, data, { withCredentials: true })
            setServerMsg(response.data.message)
            navigate('/home')
        } catch (error) {
            setServerMsg(error.response?.data?.message || error.message || "Signup Failed")
            console.log(error)
        }
    }

    return (
        <>
            <h1>Login</h1>
            {serverMsg && <p>{serverMsg}</p>}
            <form onSubmit={handleSubmit(onSubmit)} >

                <label htmlFor="email">Email</label>
                <input id="email" {...register("email", {
                    required: { value: true, message: "Email is required" },
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email address" },
                })} type="email" placeholder='Email' title='Email' />
                {errors.email && <span>{errors.email.message}</span>}

                <label htmlFor="password">Password</label>
                <input id="password" {...register("password", {
                    required: { value: true, message: "Password is required" },
                    pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/, message: "Password must include uppercase, lowercase, number, and symbol" },
                    minLength: { value: 6, message: "Password must be at least 6 characters long" },
                    maxLength: { value: 20, message: "Password cannot exceed 20 characters" }
                })}
                    type="password" placeholder='Password' title='Password must be 6-20 characters' />
                {errors.password && <span>{errors.password.message}</span>}

                <button disabled={isSubmitting}>
                    {isSubmitting ? "Loging in..." : "Login"}
                </button>

                <p>Create Account? <Link to='/signup'>Signup</Link></p>
            </form>
        </>
    )
}