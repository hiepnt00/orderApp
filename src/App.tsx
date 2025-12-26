import React, { Suspense } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Container from '@mui/material/Container'
import Loading from './components/Loading'
import Header from './components/Header'

// Lazy loaded pages (improves initial bundle and enables route-level code-splitting)
const HomePage = React.lazy(() => import('./pages/HomePage'))
const FoodSelection = React.lazy(() => import('./pages/FoodSelection/FoodSelection'))
const CheckoutPage = React.lazy(() => import('./pages/FoodSelection/CheckoutPage'))

const QRGenerator = React.lazy(() => import('./pages/QRGenerator'))
const NotFound = React.lazy(() => import('./pages/NotFound'))
const TestApiPage = React.lazy(() => import('./pages/TestApiPage'))
const LoginPage = React.lazy(() => import('./pages/login/LoginPage'))
const PaymentHistoryPage = React.lazy(() => import('./pages/PaymentHistoryPage'))
const KitchenOrdersPage = React.lazy(() => import('./pages/KitchenOrdersPage'))

function App() {
  return (
    <div>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Suspense fallback={<Loading />}>
          <Routes >
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<FoodSelection />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/payment-history" element={<PaymentHistoryPage />} />
            <Route path="/kitchen" element={<KitchenOrdersPage />} />
            <Route path="/test-api" element={<TestApiPage />} />
            <Route path="/qr" element={<QRGenerator />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Container>
    </div>
  )
}

export default App
