import './App.css';
import Header from './components/Header';
import CustomerList from './components/CustomerList';
import Footer from './components/Footer';
import CreateCustomer from './components/CreateCustomer';
import { Route, Routes } from 'react-router-dom';
import DetailCustomer from './components/DetailCustomer';
import UpdateCustomer from './components/UpdateCustomer';

function App() {
  const title="그린고객관리"
  return (
    <div className="App">
      <Header title={title} />
      <div className='content'>
        <Routes>
          <Route path="/" element={<CustomerList />}/>
          <Route path="/create" element={<CreateCustomer />}/>
          <Route path="/customer/:id" element={<DetailCustomer />}/>
          <Route path="/customer/:id/update" element={<UpdateCustomer />}/>
        </Routes>
      </div>
      <Footer title={title}/>
    </div>
  );
}

export default App;
