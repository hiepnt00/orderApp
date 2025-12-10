import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Container from '@mui/material/Container'
import Loading from './components/Loading'
import Header from './components/Header'

// Lazy loaded pages (improves initial bundle and enables route-level code-splitting)
const Home = React.lazy(() => import('./pages/Home'))
const MenuPage = React.lazy(() => import('./pages/Menu'))
const Orders = React.lazy(() => import('./pages/Orders'))
const QRGenerator = React.lazy(() => import('./pages/QRGenerator'))
const NotFound = React.lazy(() => import('./pages/NotFound'))
const ProductDetail = React.lazy(() => import('./pages/user/ProductDetail'))
const UserMenu = React.lazy(() => import('./pages/user/MenuList'))
const CartPage = React.lazy(() => import('./pages/user/Cart'))

function App() {
  return (
    <div>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/qr" element={<QRGenerator />} />

            {/* User-facing app (mobile) */}
            <Route path="/app" element={<UserMenu />} />
            <Route path="/app/product/:id" element={<ProductDetail />} />
            <Route path="/app/cart" element={<CartPage />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Container>
    </div>
  )
}

export default App
