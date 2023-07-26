import type { AppProps } from 'next/app'
import { ThemeProvider, DefaultTheme } from 'styled-components'
import GlobalStyle from '../components/globalstyles'
import { Container } from '../components/sharedstyles'
import Head from 'next/head'
const theme: DefaultTheme = {
  colors: {
    primary: '#111',
    secondary: '#0070f3',
  },
}


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Container>
          <Head>
              <title>Lotudy</title>
              <meta name="description" content="Lotudy" />
              <link rel="icon" href="/favicon.ico" />
              <style>
              @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
              </style>
          </Head>
          <Component {...pageProps} />
        </Container>
        
      </ThemeProvider>
        
    </>
  )
}
