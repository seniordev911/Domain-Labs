import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Cart from "./pages/Cart"
import SearchDetail from "./pages/SearchDetail";
import Home from "./pages/Home";
import SearchResult from "./pages/SearchResult";
import Admin from "./pages/Admin";
import ComingSoon from "./pages/ComingSoon";

const ContextWrapper = () => {

  return (
    <BrowserRouter>
      <Layout
      >
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/search-result" element={<SearchResult />} />
          <Route path="/search-detail/:id" element={<SearchDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/' element={<ComingSoon />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default ContextWrapper;
