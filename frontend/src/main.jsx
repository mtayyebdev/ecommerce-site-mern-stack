import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'react-toastify/dist/ReactToastify.css';
import './index.css'
import {
  RouterProvider,
  createBrowserRouter
} from 'react-router-dom'
import { store } from './store/Store.jsx'
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'
import {
  Home,
  Profile,
  SingleProduct,
  Cart,
  Checkout,
  Login,
  Signup,
  Shop,
  Payment,
  ManageAccount,
  Address,
  Favorits,
  Orders,
  Returns,
  Reviews,
  UserProfile,
  OrderDetails,
  Contact
} from './pages/index.js'
import {
  Admin_home,
  Admin_Coupons,
  Admin_Home,
  Update_user,
  Admin_Orders,
  Admin_Products,
  Admin_Settings,
  Admin_Users,
  Admin_Contacts,
  Update_products,
  Create_products,
  Create_coupons
} from './admin_pages/index.js'
import Error404 from './components/Error404.jsx';

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
          path: "/payment/:id"
        },
        {
          element: <Contact />,
          path: "/contact"
        },
      ]
    },
    {
      element: <Admin_home />,
      path: "/web-admin",
      children: [
        {
          element: <Admin_Home />,
          path: ""
        },
        {
          element: <Admin_Coupons />,
          path: "coupons"
        },
        {
          element: <Admin_Contacts />,
          path: "contacts"
        },
        {
          element: <Admin_Orders />,
          path: "orders"
        },
        {
          element: <Update_user />,
          path: "update-user/:id"
        },
        {
          element: <Update_products />,
          path: "update-product/:id"
        },
        {
          element: <Create_products />,
          path: "create-product"
        },
        {
          element: <Create_coupons />,
          path: "create-coupon"
        },
        {
          element: <Admin_Products />,
          path: "products"
        },
        {
          element: <Admin_Settings />,
          path: "settings"
        },
        {
          element: <Admin_Users />,
          path: "users"
        },
      ]
    },
    {
      path: "*",
      element: <Error404 />
    }
  ]
)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ToastContainer autoClose={3000} />
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </Provider>
)
