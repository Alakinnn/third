import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Customers() {
  const [customers, setCustomers] = useState([])
  const getCustomers = async () => {
    try {
      const response = await fetch("http://localhost:3000/customer")
      const data = await response.json()
      console.log("successfully retrieve data");
      
      setCustomers(data)
    } catch (error) {
      console.log(error);
      
    }
  }
  useEffect(() => {
    getCustomers()
    return console.log(customers);
    
  }, [])
  return (
    <div>
      <ul>
        {customers.map((customer) => {
          return (
            <li key={customer.id}>
              <Link to={`/customer/${customer.id}`}>
                {customer.name}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
export default Customers