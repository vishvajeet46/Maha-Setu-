import AboutSetu from "./components/AboutSetu";
import Body from "./components/Body";
import Footer from "./components/Footer";
import HelpSupport from "./components/HelpSupport";
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";


const App = () => {
  return (
    <div className="">

      <BrowserRouter>
        <NavBar />

        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/about/setu" element={<AboutSetu />} />
          <Route path="/help-support" element={<HelpSupport/>}/>
          <Route path="/signup-login" element={<Body/>}/>
        </Routes>

        <Footer />
      </BrowserRouter>



    </div>
  );
};

export default App;


// import Homepage from '../src/components/mainpages/Homepage'

// const App = () => {
//   return (
//     <div>
//       <Homepage/>
//     </div>
//   )
// }

// export default App
