import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function CustomerDetail() { 
  const [customer, setCustomer] = useState(null)
  const { id } = useParams()
  
  const getCustomer = async () =>{
    try {      
      const response = await fetch(`http://localhost:3000/customer/${id}`)
      const data = await response.json()    
      console.log(data);
         
      setCustomer(data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCustomer()
    return console.log(customer);
    
  }, [id])
  return (
    <div>
      {customer ? (
        <div>
          <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{customer.id}</td>
            <td>{customer.name}</td>
            <td>{customer.address}</td>
          </tr>
        </tbody>
        </table>
        {customer.orders && customer.orders.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>
                  product id
                </th>
                <th>
                  quantity
                </th>
              </tr>
            </thead>
            <tbody>
              {customer.orders.map((order, index) => {
                return (
                  <tr key={index}>
                    <td>{order.product_id}</td>
                    <td>{order.quantity}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>) : <h2>Customer has no purchases</h2>}
        </div>
      ) : <h1>loading...</h1>}
    </div>
  )
}
export default CustomerDetail