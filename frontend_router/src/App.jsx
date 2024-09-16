import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import Home from './containers/Home'
import Customers from './containers/Customers'
import CustomerDetail from './containers/CustomerDetail'
import Fallback from './containers/Fallback'
import "./App.css"
const router = createBrowserRouter([
  {
    element: <MainLayout />,
    path: "/",
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "customer",
        element: <Customers />,
      }, 
      {
        path: "customer/:id",
        element: <CustomerDetail />
      }
    ]
  }
])

function App() {

  return (
    <RouterProvider router={router} fallbackElement={<Fallback />}/>
  )
}

export default App
