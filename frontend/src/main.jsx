import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Home, Profile, SingleProduct, Cart, Checkout, Login, Signup, Shop, Payment, ManageAccount, Address, Favorits, Orders, Returns, Reviews, UserProfile,OrderDetails } from './pages/index.js'

const router = createBrowserRouter(
  [
    {
      element: <App />,
      path: "/",
      children: [
        {
          element: <Home />,
          path: ""
        },
        {
          element: <Profile />,
          path: "/user",
          children: [
            {
              element: <ManageAccount />,
              path: ""
            },
            {
              element: <UserProfile />,
              path: "profile"
            },
            {
              element: <Address />,
              path: "address"
            },
            {
              element: <Returns />,
              path: "returns"
            },
            {
              element: <Reviews />,
              path: "reviews"
            },
            {
              element: <OrderDetails />,
              path: "order-details/:id"
            },
            {
              element: <Orders />,
              path: "orders"
            },
            {
              element: <Favorits />,
              path: "favorits"
            },

          ]
        },
        {
          element: <Cart />,
          path: "/cart"
        },
        {
          element: <Checkout />,
          path: "/checkout"
        },
        {
          element: <SingleProduct />,
          path: "/product/:id"
        },
        {
          element: <Shop />,
          path: "/shop"
        },
        {
          element: <Login />,
          path: "/login"
        },
        {
          element: <Signup />,
          path: "/signup"
        },
        {
          element: <Payment />,
          path: "/payment"
        },
      ]
    }
  ]
)

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>
)
