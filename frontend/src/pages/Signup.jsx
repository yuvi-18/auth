import '../css/signup.css'
import { Link } from 'react-router-dom'

export default function Signup() {

    async function signup(formData) {
        const { name, email, password } = Object.fromEntries(formData)
        if (!name || !email || !password) {
            return alert('All fields are Required')
        }

        const res = await fetch('http://localhost:5000/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
            credentials: 'include'
        });

        formData.form.reset();
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