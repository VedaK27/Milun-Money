// import express from "express";
// import { searchUsers } from "../controller/userController.js";

// const router = express.Router();

// router.get("/search", searchUsers);

// export default router;

import express from "express";
import { searchUsers, getUserById } from "../controller/userController.js";

const router = express.Router();

router.get("/search", searchUsers);
router.get("/:id", getUserById); // 👈 new route to fetch user by ID

export default router;