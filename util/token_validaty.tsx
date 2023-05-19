import axios from "axios";
import { useRouter } from "next/router";
import { parseCookies} from 'nookies'
import { useEffect } from "react";

export default  function ValidatyToken() {
    const  { 'token': token } = parseCookies()
    const router = useRouter();
    
    useEffect(() => {
        const interval = setInterval(() => {
          if (!token) {
            router.replace("/login");
          } else {
            axios
              .post('http://localhost:3000/api/auth/verify_token', {
                token,
              })
              .catch(() => {
                router.replace("/login");
              });
          }
        }, 1000); // Verifica o token a cada 60 segundos
    
        return () => {
          clearInterval(interval); // Limpa o intervalo quando o componente é desmontado
        };
      }, []); 

}