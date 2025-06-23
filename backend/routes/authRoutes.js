import express from 'express' ;
import User from "../model/user.js"; // Adjust path if needed

import {signup , login } from '../controller/authController.js' ;

const router = express.Router() ;

router.post('/signup' , signup) ;
router.post('/login' , login) ;

// GET /api/users/:id
router.get("/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select("-password");
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json({ user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

export default router ;