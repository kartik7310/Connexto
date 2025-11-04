
import { BrowserRouter, Route, Router, Routes } from "react-router-dom"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Body from "./pages/Layout"
import {store} from "./store/appStore"
import { Provider } from 'react-redux'

function App() {
 return(
 <>
 <Provider store={store}>


 <BrowserRouter basename="/">
  <Routes>
    <Route path="/" element={<Body/>}>
    <Route path="/login" element={<Login/>}/>
    <Route path="/signup" element={<Signup/>}/>
    </Route>
  </Routes>
 </BrowserRouter>
  </Provider>
 </>
 )
}

export default App
