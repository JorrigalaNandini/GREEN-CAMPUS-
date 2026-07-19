const mongoose=require("mongoose");
const Issue = require("../models/Issue");
const User = require("../models/User");
const { classifyWaste } = require("../services/aiService");
console.log("Issue model collection:",Issue.collection.name);

// ===============================
// Report New Issue
// ===============================

const reportIssue = async (req, res) => {

  try {

    const { title ,category, location } = req.body;

    const image = req.file ? req.file.filename : "";


    if (!category || !location) {

      return res.status(400).json({
        success:false,
        message:"Category and location are required"
      });

    }



    // Duplicate Check

    const existingIssue = await Issue.findOne({

      category:{
        $regex:`^${category.trim()}$`,
        $options:"i"
      },

      location:{
        $regex:`^${location.trim()}$`,
        $options:"i"
      },

      status:{
        $in:[
          "Pending",
          "In Progress"
        ]
      }

    });



    if(existingIssue){

      return res.status(400).json({

        success:false,

        message:"Same issue already submitted"

      });

    }




    // AI Recommendation

    const aiResult = await classifyWaste(category);




    // Create Issue

    const issue = await Issue.create({
        title,
      category,

      location,

      image,


      // Initially low priority

      severity:"Low",

      priorityLevel:"Low",


      recommendation:
      aiResult.recommendation,


      reportedBy:req.user.id,


      status:"Pending"

    });





    // Eco Points

    const user = await User.findById(req.user.id);


    if(user){

      user.ecoPoints += 10;


      if(user.ecoPoints >= 200){

        user.badge="🏆 Eco Warrior";

      }

      else if(user.ecoPoints >=100){

        user.badge="🌳 Eco Champion";

      }

      else if(user.ecoPoints >=50){

        user.badge="🌿 Eco Contributor";

      }

      else{

        user.badge="🌱 Eco Starter";

      }


      await user.save();

    }




    res.status(201).json({

      success:true,

      message:"Issue reported successfully",

      issue

    });



  }

  catch(error){

    console.log(error);

    res.status(500).json({

      success:false,

      message:error.message

    });

  }

};






// ===============================
// Get All Issues
// ===============================
const getAllIssues = async (req, res) => {
  try {
    console.log("Model collection:", Issue.collection.name);

    const issues = await Issue.find({});

    const today = new Date();

    issues.forEach((issue) => {
      if (issue.status !== "Resolved") {
        const daysPending = Math.floor(
          (today - new Date(issue.createdAt)) / (1000 * 60 * 60 * 24)
        );

        if (daysPending >= 7) {
          issue.priorityLevel = "High";
        } else if (daysPending >= 3) {
          issue.priorityLevel = "Medium";
        } else {
          issue.priorityLevel = "Low";
        }
      }
    });

    res.status(200).json({
      success: true,
      issues,
    });

  } catch (error) {
    console.log("GET ISSUES ERROR:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ===============================
// Update Status
// ===============================

const updateIssueStatus = async(req,res)=>{


try{


const {status}=req.body;



const issue = await Issue.findByIdAndUpdate(

req.params.id,

{status},

{new:true}

);



if(!issue){


return res.status(404).json({

success:false,

message:"Issue not found"

});


}



res.status(200).json({

success:true,

message:"Issue status updated",

issue

});



}

catch(error){


res.status(500).json({

success:false,

message:error.message

});


}



};





module.exports={

reportIssue,

getAllIssues,

updateIssueStatus

};