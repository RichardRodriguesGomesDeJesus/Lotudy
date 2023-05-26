import styled from 'styled-components'

export const colors = {
  principalColor: "#16c1c8",
  sideColor: "#665df5",
  titleColor: "#49cccc",
  backgrondColor: "#f0f0f0",
  white: "#fff",
  textColor:"#767675",
  error:"#F91364"
}

const Container = styled.div`
  font-family: 'Poppins', sans-serif;
  background: #f0f0f0;
  padding: 0 0.5rem;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  height: auto;
  min-height: 100vh;
`
const Main = styled.main`
  color: ${colors.textColor};
  padding: 0 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  width:100vw;
`

const Header = styled.header`
  background: ${colors.principalColor} ;
  display: flex;
  height: 5rem;
  width: 100vw;
  nav{
    align-items: center;
    color: #fff;
    display: flex;
    gap: 1rem;
    margin: 0 1rem;
    font-weight: 400;
    width: 100%;
  }
`
const Title = styled.h1`
  color: ${colors.titleColor};
  font-weight: 600;
  text-transform: capitalize;
  text-align:center;
  @media screen and (min-width: 0 ){
    font-size: 1.25rem;
  };
  @media screen and (min-width: 768px ){
    font-size: 1.5rem;
  
  };
  @media screen and (min-width: 1024px) {
    font-size: 2rem;
  };
` 
const Description = styled.p`
display: flex;
flex-grow: 1;
align-items: center;
text-align: center;
margin:0;
background: ${colors.white};
font-weight: 400;
width:100vw;
@media screen and (min-width: 0 ){
  font-size: 1rem;
  padding: 1rem;
};
@media screen and (min-width: 768px ){
  font-size: 1.25rem;
  padding: 2rem;
};
@media screen and (min-width: 1024px) {
  padding: 3rem;
};
`
const Footer = styled.footer`
  color: ${colors.white};
  justify-content: center;
  align-items: center;
  background: ${colors.sideColor};
  gap: 1rem;
  font-weight: 400;
  display: flex;
  height: 80px;
  text-align: center;
  width: 100vw;
`
const Button = styled.button`
  background: ${colors.sideColor};
  border: none;
  border-radius: .5rem;
  box-shadow: 0 4px 4px ${colors.textColor};
  color: ${colors.white};
  margin: 1rem auto;
  padding: .5em;
  &:hover,
  :focus,
  :active {
      cursor: pointer;
      color: ${colors.sideColor};
      background: ${colors.white};
      border: 1px solid ${colors.sideColor};
      border-color: ${colors.sideColor};
      padding: calc(.5em - 1px);
  }
  @media screen and (min-width: 0 ){
      width: 150px;
  }
  @media screen and (min-width: 768px ){
      width: 175px;
  }
  @media screen and (min-width: 1024px){
      width: 200px;
  }
`
const ButtonClose = styled.button`
  border: none;
  border-radius: .5rem;
  color: ${colors.white};
  height: 30px;
  margin: 0 90% ;
  padding: .125rem;
  width: 30px;
  &:hover,
  :focus,
  :active {
      cursor: pointer;
      color: ${colors.sideColor};
      border-color: ${colors.sideColor};
      padding: calc(.125rem -1px);
  }
  img{
    height: 100%;
    width: 100%;
  }
  @media screen and (min-width: 0 ){
    background: ${colors.backgrondColor};
  }
  @media screen and (min-width: 768px ){
    background: ${colors.white};
  }
`
export { Container, Main, Header, Title, Description, Footer, Button, ButtonClose}
