// AI Issue Classification + Severity Prediction Service

const classifyWaste = async (category) => {

  let wasteType = category;

  let recommendation = "Issue reported. Take necessary action.";

  switch(category) {

    case "Water Leakage":
      recommendation =
      "Repair the leaking tap or pipe to prevent water wastage.";
      break;


    case "Broken Street Light":
      recommendation =
      "Repair or replace the damaged street light.";
      break;


    case "Chemical Waste":
      recommendation =
      "Dispose chemical waste using proper safety procedures.";
      break;


    case "Paper Waste":
      recommendation =
      "Collect and recycle paper waste properly.";
      break;


    case "Plastic Waste":
      recommendation =
      "Send plastic waste to the recycling unit.";
      break;


    case "Dustbin Overflow":
      recommendation =
      "Empty the dustbin and improve waste collection frequency.";
      break;


    case "Dry Plants":
      recommendation =
      "Provide water and maintenance for dry plants.";
      break;


    case "Energy Issue":
      recommendation =
      "Inspect energy usage and repair electrical problems.";
      break;


    case "Maintenance":
      recommendation =
      "Assign maintenance team for inspection and repair.";
      break;


    default:
      recommendation =
      "Inspect the issue and take appropriate action.";

  }


  return {

    wasteType,

    recommendation

  };

};




const predictSeverity = async (category) => {


  let severity = "Low";


  if(
    category === "Water Leakage" ||
    category === "Chemical Waste" ||
    category === "Broken Street Light"
  ){

    severity = "High";

  }

  else if(
    category === "Dustbin Overflow" ||
    category === "Plastic Waste" ||
    category === "Maintenance"
  ){

    severity = "Medium";

  }


  return severity;

};



module.exports = {

  classifyWaste,

  predictSeverity

};