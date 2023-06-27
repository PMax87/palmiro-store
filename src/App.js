import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeScreen from "./screen/HomeScreen";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SingleProductScreen from "./screen/SingleProductScreen";
import CartScreen from "./screen/CartScreen";

function App() {
  return (
    <Router className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/products/:id" element={<SingleProductScreen />} />
        <Route path="/cart" element={<CartScreen />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
