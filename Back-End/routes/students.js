//importing express router modules
const router = require("express").Router();

let Student = require("../models/student");


//inserting a new user
router.route("/add").post((req,res)=>{
    const name = req.body.name;
    const age = Number(req.body.age);
    const gender = req.body.gender;
    const occupation = req.body.occupation;
    const phone = req.body.phone;
    const pwd = req.body.pwd;

    const newStudent = new Student({
        name,
        age,
        gender,
        occupation,
        phone,
        pwd
    })

    newStudent.save().then(()=>{
        res.json("new user added");
    }).catch((err)=>{
        console.log(err);
    })
})

//display all users
router.route("/").get((req,res)=>{
    Student.find().then((students)=>{
        res.json(students)
    }).catch((err)=>{
        console.log(err);
    })
})


//updating user details
router.route("/update/:id").put(async(req,res)=>{
    let userID = req.params.id;
    const{name,age,gender,occupation,phone,pwd} =req.body;

    const updateStudent = {
        name,
        age,
        gender,
        occupation,
        phone,
        pwd
    }

    const update = await Student.findByIdAndUpdate(userID,updateStudent)
    .then(()=>{
        res.status(200).send({status:"user updated"});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data"});
    })
})


//deleting user
router.route("/delete/:id").delete(async(req,res)=>{
    let userID =req.params.id;
    
    Student.findByIdAndDelete(userID)
    .then(()=>{
        res.status(200).send({status:"user deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with deleting the user",error:err.message});
    })
})


//get only a specified user data

router.route("/get/:id").get(async(req,res)=>{
    let userID = req.params.id;
    await Student.findById(userID)
    .then(()=>{
        res.status(200).send({status:"user fetched",data:user});
    }).catch(()=>{
        console.log(err.message);
        res.status(500).send({status:"Error with fetching the user",err:err.message});
    })
})

module.exports = router;
