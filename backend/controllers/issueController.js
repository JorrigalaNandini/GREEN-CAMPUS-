const mongoose=require("mongoose");
const Issue = require("../models/Issue");
const User = require("../models/User");
const { classifyWaste,predictSeverity } = require("../services/aiService");
console.log("Issue model collection:",Issue.collection.name);
function normalizeText(text = "") {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ")

    // Remove common location words
    .replace(
      /\b(near|beside|next to|opposite|around|at|in front of|behind|back of|front of|outside|inside|within|close to|adjacent to|nearby)\b/g,
      ""
    )

    // Remove location suffix words
    .replace(
      /\b(area|block|building|section|zone|place|side|campus|road|gate)\b/g,
      ""
    )

    // Waste synonyms
    .replace(
      /\b(garbage|trash|litter|rubbish)\b/g,
      "waste"
    )

    // Dustbin synonyms
    .replace(
      /\b(dustbin|garbage bin|trash can|bins|bin)\b/g,
      "dustbin"
    )

    // Plastic waste synonyms
    .replace(
      /\b(plastic bottle|plastic bottles|plastic item|plastic items|plastic)\b/g,
      "plastic waste"
    )

    // Water issue synonyms
    .replace(
      /\b(leak|leaks|leaking|leakage|water problem|pipe issue|broken pipe|pipe leak)\b/g,
      "water leakage"
    )

    // Street light synonyms
    .replace(
      /\b(broken light|street light issue|light problem|damaged light|broken street light)\b/g,
      "broken street light"
    )

    // Plant related synonyms
    .replace(
      /\b(dry plant|dry plants|dead plant|dead plants)\b/g,
      "dry plant"
    )

    // Paper waste synonyms
    .replace(
      /\b(papers|paper waste|paper wastes)\b/g,
      "paper waste"
    )

    // Handle common plural words safely
    .replace(
      /\b(bottles|plants|lights|pipes|taps|trees|wastes)\b/g,
      function(word) {
        return word.slice(0, -1);
      }
    )

    // Remove extra spaces again
    .replace(/\s+/g, " ")
    .trim();
}
// ===============================
// Report New Issue
// ===============================

const reportIssue = async (req, res) => {

  try {

    const { title ,category, location ,latitude,longitude} = req.body;

    const image = req.file ? req.file.filename : "";


    if (!category || !location) {

      return res.status(400).json({
        success:false,
        message:"Category and location are required"
      });

    }



    // Duplicate Check

// Duplicate Check
const normalizedCategory = normalizeText(category);
const normalizedLocation = normalizeText(location);
const normalizedTitle = normalizeText(title);
const existingIssue = existingIssues.find((issue) => {

  const oldTitle = normalizeText(issue.title);
  const oldLocation = normalizeText(issue.location);

  console.log("OLD TITLE:", oldTitle);
  console.log("NEW TITLE:", normalizedTitle);

  console.log("OLD LOCATION:", oldLocation);
  console.log("NEW LOCATION:", normalizedLocation);

  return (
    oldTitle === normalizedTitle &&
    oldLocation === normalizedLocation
  );

});

if (existingIssue) {

  // Check if this user already reported it
  if (existingIssue.reportedUsers.some((userId) => userId.toString() === req.user.id.toString())) {
    return res.status(400).json({
      success: false,
      message: "You have already reported this issue.",
    });
  }

  // Add new reporter
  existingIssue.reportedUsers.push(req.user.id);

  // Increase report count
  existingIssue.reportCount += 1;

  // Increase priority based on reports
  if (existingIssue.reportCount >= 5) {
    existingIssue.priorityLevel = "High";
  } else if (existingIssue.reportCount >= 3) {
    existingIssue.priorityLevel = "Medium";
  }

  await existingIssue.save();

  return res.status(200).json({
    success: true,
    message:
      "This issue has already been reported. Your report has been added as additional confirmation and its priority has been increased.",
  });
}



    if(existingIssue){

      return res.status(400).json({

        success:false,

        message:"Same issue already submitted"

      });

    }




    // AI Recommendation

    const aiResult = await classifyWaste(category);
const severity = await predictSeverity(category);

let priorityLevel = severity;


// Create Issue

const issue = await Issue.create({
  title,
  category,
  location,
  image,
  coordinates:{
    longitude,
    latitude,
  },
  severity,

  priorityLevel,

  recommendation: aiResult.recommendation,

  reportedBy: req.user.id,

  reportedUsers: [req.user.id],

  reportCount: 1,

  status: "Pending",
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

        if (issue.priorityLevel !== "High") {
  if (daysPending >= 7) {
    issue.priorityLevel = "High";
  } else if (daysPending >= 3 && issue.priorityLevel === "Low") {
    issue.priorityLevel = "Medium";
  }
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