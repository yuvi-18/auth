import { Link } from "react-router-dom"

export default function NotFound(){
    return(
        <>
            <h1>Dead End!</h1>
            <Link to='/login'>Login</Link>
        </>
    )
}