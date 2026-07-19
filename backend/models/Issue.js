const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      enum: [
        "Water Leakage",
        "Broken Street Light",
        "Chemical Waste",
        "Paper Waste",
        "Plastic Waste",
        "Dustbin Overflow",
        "Dry Plants",
        "Energy Issue",
        "Maintenance",
        "Other"
      ],
      required: true
    },

    recommendation: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },


    // Initial AI analysis level
    severity: {
      type: String,
      default: "Low",
    },


    // Dynamic priority based on pending days
    priorityLevel: {
      type: String,
      enum: [
        "Low",
        "Medium",
        "High"
      ],
      default: "Low",
    },


    status: {
      type: String,
      enum: [
        "Pending",
        "In Progress",
        "Resolved"
      ],
      default: "Pending",
    },


    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

  },

  {
    timestamps:true,
  }

);


module.exports = mongoose.model("Issue", issueSchema,"issues");