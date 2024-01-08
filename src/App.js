import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import ListEmployeeComponent from './Components/ListEmployeeComponent';
import EmployeeAddUpdateComponent from './Components/EmployeeAddUpdateComponent';
import FooterComponent from './Components/FooterComponent';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<ListEmployeeComponent />} />
          <Route path='/employees' element={<ListEmployeeComponent />} />
          <Route path='/add-employee' element={<EmployeeAddUpdateComponent />} />
          <Route path='/edit-employee/:id' element={<EmployeeAddUpdateComponent />} />
        </Routes>
        <FooterComponent/>

      </BrowserRouter>


    </>
  );
}

export default App;
