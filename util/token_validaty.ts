import axios from "axios";
import { useRouter } from "next/router";


export default async function ValidatyToken() {
    
    const router = useRouter()
    const token = localStorage.getItem('token')
    if (!token) {
       console.log('token not found')
        router.push('/login')
    }

    axios.post('http://localhost:3000/api/auth/verify_token',
        {
            token,
        }
    ).catch((err)=>{
        router.push('/login')
       console.log(err)
    })

}