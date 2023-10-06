import styled from "styled-components"
import { colorSegundary } from "./sharedstyles"
import Link from "next/link"

const Dashboard = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    flex-flow: row wrap;
    width: 80%;
    margin: 1rem;

    @media (max-width: 768px) {
    height: auto;
    }
    div{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        background: ${colorSegundary.white};
        text-align: center;
        padding: 1rem;
        color: inherit;
        text-decoration: none;
        border: 1px solid black;
        border-radius: 10px;
        margin: 1rem 0;
        &:hover,
        :focus,
        :active {
            cursor: pointer;
            color: ${colorSegundary.principalColor};
            border-color: ${colorSegundary.titleColor};
        }
        @media screen and (min-width: 0 ){
            height:150px;
            width: 150px;
            img{
              height: 75px;  
              width:  75px ;
            }
            p{
              font-size: 1rem;
            }
          };
          @media screen and (min-width: 768px ){
            height:200px;
            width: 200px;
            img{
              height: 100px;  
              width: 100px ;
            }
            p{
              font-size: 1.5rem;
            }
          };
          @media screen and (min-width: 1024px) {
            height:250px;
            width: 250px;
            img{
              height: 150px;  
              width: 150px;
            }
          }
    }

`

export default function DashboardExams() {
    const listExams = [
    {
        title: 'Questionarios Personalizados',
        link: '/exams/personalized'
    }
    ]
    return(
        <>
            <Dashboard>
                {listExams.map( (element , index)=> (
                    <Link href={element.link}  key={index}>
                        <div >
                            <p>{element.title}</p>
                        </div>
                    </Link>
                ))}
            </Dashboard>
        </>
    )
}