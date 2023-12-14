import { Route, Routes } from 'react-router';
import './App.css';
import Countries from './Component/Countries';
import Error from './Component/Error';
import SingleCountry from "./Component/SingleCountry";



function App() {

  return (
    <>
      <Routes>
      <Route path='/' element={<Countries />} /> 
      <Route path='/:name' element={<SingleCountry />} /> 
      <Route path='*' element={<Error />} /> 
      </Routes>
    </>
  )
}

export default App
