import { customers, orders, products } from "./storage.js"

export const getCustomers = (req, res) => {
  try {
    res.status(200).json(customers)
  } catch(error) {
    res.status(500).json({
      msg: `Failed to retrieve customers: ${error}`
    })
  }
}

export const getCustomerById = (req, res) => {
  try {
    const { id } = req.params
    const customer_id = Number(id)
    const customer = customers.find((i) => i.id === customer_id)
    const customerOrders = orders.filter((order) => order.customer_id === customer_id )
    if (customerOrders.length === 0) {
      res.status(200).json({
        ...customer,
        orders: []
      })
    }
    const jsonFormattedOrders = customerOrders.map((order) => { return {
        product_id: order.product_id,
        quantity: order.quantity
      }
    } 
    )
    res.status(200).json({
      ...customer,
      orders: jsonFormattedOrders
    })
  } catch(error) {
    res.status(500).json({
      msg: `Failed to retrieve customer: ${error}`
    })
  }
}
export const getCustomersTotal = (req, res) => {
  try {
    const { id } = req.params
    const customer_id = Number(id)
    const customer = customers.find((i) => i.id === customer_id)
    const customerOrders = orders.filter((order) => order.customer_id === customer_id )
    const ordersTotal = calculateOrdersTotal(customerOrders)
    res.status(200).json({
      ...customer,
      total_price: ordersTotal
    })
  } catch(error) {
    res.status(500).json({
      msg: `Failed to retrieve customers: ${error}`
    })
  }
}
export const calculateOrdersTotal = (customerOrders) => {
  if (customerOrders.length === 0) {
    return 0
  }
  let sum = 0
  for (const order of customerOrders) {
    const product = products.find((i) => i.id === order.product_id)
    const soldOffPrice = product.sell_off ? product.price * (1 - product.percent / 100) : product.price
    sum += soldOffPrice * order.quantity
  }
  return sum
}