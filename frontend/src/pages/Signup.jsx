import '../css/signup.css'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { useState } from 'react';
import axios from "axios";

export default function Signup() {

    const navigate = useNavigate()
    const [serverMsg, setServerMsg] = useState(null)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm()

    async function onSubmit(data) {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_KEY}/auth/signup`, data, { withCredentials: true })
            setServerMsg(response.data.message)
            navigate('/home')
        } catch (error) {
            setServerMsg(error.response?.data?.message || error.message || "Signup Failed")
        }
    }

    return (
        <>
            <h1>Signup</h1>
            {serverMsg && <p>{serverMsg}</p>}
            <form onSubmit={handleSubmit(onSubmit)} >

                <label htmlFor="name">Full Name</label>
                <input id="name" {...register("name", {
                    required: { value: true, message: "Name is required" }
                })} type="text" placeholder='Name' title='Name' />
                {errors.name && <span>{errors.name.message}</span>}

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
                    {isSubmitting ? "Signing in..." : "Submit"}
                </button>

                <p>Already exists? <Link to='/login'>Login</Link></p>
            </form>
        </>
    )
}