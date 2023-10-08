import { useEffect, useState } from "react"
import ResponsiveMenu, { Header, Main } from "../../components/sharedstyles"
import Link from "next/link"
import ChangePasswordForm from "../../components/ChangePasswordForm"


export default function ChangePassword() {
  const [display, setDisplay] = useState('none')
  const [token, setToken] = useState("")
  useEffect(()=>{
    const url = window.location.href
    setToken(url.match(/([^\/]*)\/*$/)[1])
  },[token === ""])
  return(
    <>
      <Header display={display}>
      <img src="../logo-lotudy-removebg.png" alt="logo da lotudy" />
        <nav>
            <div>
                <Link href={'/'}>Home</Link>
            </div>
            <div>
                <Link href={'/register'}>Cadastre-se</Link>
            </div>
        </nav>
        <ResponsiveMenu display={display} setDisplay={setDisplay} />
      </Header>
      <Main>
        <ChangePasswordForm token={token}/>
      </Main>
    </>
  )
}