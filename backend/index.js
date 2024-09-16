import express from "express"
import cors from "cors"
import { getCustomerById, getCustomers, getCustomersTotal } from "./server.js"

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded())

app.get("/customer", getCustomers)
app.get("/customer/:id", getCustomerById)
app.get("/customer/:id/total", getCustomersTotal)
app.use((req, res) => {
  res.status(404).json({
    msg: "not found"
  })
})

const start = async () => {
  try {
    console.log("Server starting");
    app.listen(3000, () => {
      console.log("Successfully started server on port 3000");
      
    })
  } catch (error) {
    console.log(`Failed to start server: ${error}`);
    
  }
}
start()