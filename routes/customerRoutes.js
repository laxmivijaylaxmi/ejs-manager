import express from "express";
import customerModel from "../models/customerModel.js"

const router = express.Router();


router.get("/list", async (req, res) => {
  try {
    const customers = await customerModel.find();
    res.render("list", { customers });
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).send("Internal Server Error");
  }
});
router.get("/edit", async (req, res) => {
  try {
    const customers = await customerModel.find();
    res.render("edit", { customers });
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).send("Internal Server Error");
  }
});



//render from to create a new customer:-
router.get("/new", (req, res) => {
  res.render("new");
});


//create a customer;-

router.post("/", async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    await customerModel.create({ name, email, phone });
    res.redirect("/");
  } catch (error) {
    console.error("Error creating customer:", error);
    res.status(500).send("Internal Server Error");
  }
});
//edit a customer by id:-
router.get("/edit/:id", async (req, res) => {
  console.log(`Received request to edit customer with ID: ${req.params.id}`);
  try {
    const {id} = req.params;
    const customer = await customerModel.findById(id);
    if (!customer) {
      return res.status(404).send("Customer not found");
    }
    res.render("edit", { customer });
  } catch (error) {
    console.error("Error fetching customer:", error);
    res.status(500).send("Internal Server Error");
  }
});


//update by id Customer:-

router.post('/edit/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    const updatedCustomer = await Customer.findByIdAndUpdate(id, { name, email, phone }, { new: true });
    if (!updatedCustomer) {
      return res.status(404).send('Customer not found');
    }
    res.redirect(`/customer/list`); // Redirect to the same page or to a success page
  } catch (error) {
    console.error('Error updating customer:', error);
    res.status(500).send('Server error');
  }
});
 

//delete by Id :
router.post("/delete/:id",async(req,res)=>{
  try{
    await customerModel.findByIdAndDelete(req.params.id);
    res.redirect("/");
  }
  catch(error){
    console.error("Error deleting customer:",error);
    res.status(500).send("Internal Server")
  }
})

export default router;
