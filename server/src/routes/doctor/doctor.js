const { Router } = require("express");
const router = Router();

const User = require("../../models/User");

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

//Assign diet to my patients
router.put("/assign_diet", async (req, res, next)=>{
    try {
        const {patient_name, dietType} = req.body
        const assignedDiet = await User.update({full_name: patient_name}, {
            $set: {dietType: dietType},
          })
       
       res.send(assignedDiet)
    } catch (error) {
        console.log(error)
        next(err);
    }
})

//My patents
router.get("/my_patients", async (req, res, next) => {
    const {doctorName} = req.query;
  
    try {
      const user = await User.find({assignedDoctor: doctorName});
      res.send(user);
    } catch (error) {
      next(error);
    }
  });

module.exports = router;