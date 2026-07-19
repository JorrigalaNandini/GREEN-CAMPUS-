const express = require("express");
const router = express.Router();

const {
  reportIssue,
  getAllIssues,
  updateIssueStatus
} = require("../controllers/issueController");

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");


// Report new issue
router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  reportIssue
);


// Get all issues
router.get(
  "/",
  getAllIssues
);


// Update issue status
router.put(
  "/:id",
  updateIssueStatus
);


module.exports = router;