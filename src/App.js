import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './Component/Home';
import CreateProduct from './Component/CreateProduct';
import ProductDetails from './Component/ProductDetails';

function App() {
  return (
    <div className=''>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create-product' element={<CreateProduct />} />
        <Route path='/product/:id' element={<ProductDetails />} />
    </Routes>
    </div>
  );
}

export default App;
