import Link from "next/link";
import { Button, Footer, Header, Main, Title } from "../../components/sharedstyles";
import FormStydyCycle from "../../components/formStudyCycle";
import { useState } from "react";
import UserStudyCycle from "../../components/studyCycle";

export default function studyCyclePage() {
    const [form, setForm] = useState(false)
    const [StudyCycle , setStudyCycle] = useState([]) 
    return(
        <>
        <Header>
            <nav>
                <Link href={'/dashboard'} > Dashboard</Link>
                <Link href={'/exams'}>Simulados</Link>
            </nav>
        </Header>
        <Main>
            <Title>Crie um ciclo de estudos</Title>
            { form === false && StudyCycle.length > 0 &&
                <UserStudyCycle StudyCycle={StudyCycle} />
            }
            {
                form === true && StudyCycle.length == 0 &&
                <FormStydyCycle setStudyCycle={setStudyCycle} StudyCycle={StudyCycle} form={form} setForm={setForm}/>
            }
            {
                form === false && StudyCycle.length == 0 &&
                <Button onClick={(e)=>{
                    e.preventDefault()
                    setForm(true)

                }}>Criar Cyclo  de Estudos </Button>
            }
        </Main>
        <Footer>
            <Link href={'/register'}>Crie sua conta</Link>
        </Footer>
        </>
    )
}