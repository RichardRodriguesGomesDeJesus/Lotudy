import { useState } from "react"
import ResponsiveMenu, { Header, Title, Main, Footer  } from "../components/sharedstyles"
import { FormLogin } from "../components/formLogin"
import Link from "next/link"
import PasswordForm from "../components/passwordForm"

export default function ChangePassword() {
  const [display, setDisplay] = useState('none');
  return (
  <>
    <Header display={display}>
     <img src="logo-lotudy-removebg.png" alt="logo da lotudy" />
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
     <PasswordForm />
    </Main>
  </>
  )
}