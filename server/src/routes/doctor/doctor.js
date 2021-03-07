const { Router } = require("express");
const router = Router();

const User = require("../../models/User");
const chat = require("../../models/chat");

//Assign medicine to my patients

router.put("/assign_medicine", async (req,res)=>{
    try {
        const {patient_email, medicineName, takeDate} = req.body
        const assignedMedicine= await User.update({email: patient_email}, {
            $push: { medicine: { nameMedicine: medicineName, takeDate: takeDate} },
          })
       
       res.send(assignedMedicine)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
  })