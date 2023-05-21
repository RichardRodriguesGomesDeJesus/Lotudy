import axios from "axios";
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies';

export default async function ValidatyToken() {
  const urlAtual = window.location.href
  const { 'token': token } = parseCookies();
  if (typeof window !== 'undefined') {
    const router = useRouter();
    if (!token) {
      router.replace("/login");
    } else {
      try {
        await axios.post(`${urlAtual}/api/auth/verify_token`, {
          token,
        });
      } catch (error) {
        router.replace("/login");
      }
    }
  }
}
