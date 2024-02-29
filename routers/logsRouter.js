const express = require("express");
const HttpStatus = require("http-status");
const router = express.Router();

const { getLogs, clearLogs } = require("../middleware/service/redisLogger.js");

// Create new genre
router.get("/", async (req, res) => {
  try {
    // Record the user's IP address and the route used
    const userIP = req.ip;
    const usedRoute = req.originalUrl;
    console.log(`[info] Route: ${usedRoute}, IP: ${userIP}`);

    var data = await getLogs();

    if (data) {
      res.status(HttpStatus.OK).json(data);
    }
  } catch (error) {
    console.log(error);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
});

router.delete("/clear", async (req, res) => {
  try {
    // Record the user's IP address and the route used
    const userIP = req.ip;
    const usedRoute = req.originalUrl;
    console.log(`[info] Route: ${usedRoute}, IP: ${userIP}`);

    await clearLogs();
    console.log("Logs cleared");
    res
      .status(HttpStatus.OK)
      .json({ f: 200, message: "Logs cleared successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
});

module.exports = router;
