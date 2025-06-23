import User from "../model/user.js";

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

export const searchUsers = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
    }

    const users = await User.find({
      $or: [
        { username: { $regex: query, $options: "i" } },
        { ubid: { $regex: query, $options: "i" } },
      ],
    });

    res.json(users);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};
