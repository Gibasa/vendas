import Header from "./Header";
import PhotoGallery from "./PhotoGallery"
import { createGlobalStyle } from 'styled-components';


const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`;

function App() {

  return (
    <>
    <GlobalStyle />
    <Header />

      <PhotoGallery />
    </>
  )
}

export default App
