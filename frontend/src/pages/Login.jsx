import '../css/signup.css'
import { Link } from 'react-router-dom'

export default function Login(){

    function login(formData){
        const {email, password} = Object.fromEntries(formData)
        if (!email || !password) {
            return alert('All fields are Required')
        }
    }

    return(
        <>
            <h1>Login</h1>
            <form action={login}>

                <label htmlFor="email">Email</label>
                <input id="email" type="email" name="email" placeholder='Email' required /> 

                <label htmlFor="password">Password</label>
                <input id="password" type="password" name="password" placeholder='Password' required /> 

                <button>Login</button>
                
                <p>Create Account? <Link to='/signup'>Signup</Link></p>
            </form>
        </>
    )
}