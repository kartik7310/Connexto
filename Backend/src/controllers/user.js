const ProfileController = {
  async getProfile(req, res) {
    try {
      const user = req.user; 
      res.status(200).json(user);
    } catch (err) {
      res.status(500).send("ERROR: " + err.message);
    }
  }
}

export default ProfileController;