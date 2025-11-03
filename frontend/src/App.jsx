import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import { BrowserRouter, Route, Router, Routes } from "react-router-dom"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Body from "./pages/Body"
function App() {
 return(
 <>
 <BrowserRouter basename="/">
  <Routes>
    <Route path="/" element={<Body/>}>
    <Route path="/login" element={<Login/>}/>
    <Route path="/signup" element={<Signup/>}/>
    </Route>
  </Routes>
 </BrowserRouter>
 </>
 )
}

export default App
