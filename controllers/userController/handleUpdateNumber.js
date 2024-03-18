const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Assurez-vous d'avoir un modèle User correctement défini

// Contrôleur pour mettre à jour le numéro de l'utilisateur
router.put("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { newNumber } = req.body;

    // Trouver l'utilisateur par son ID et mettre à jour son numéro
    const user = await User.findByIdAndUpdate(
      userId,
      { number: newNumber },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.status(200).json({ message: "Numéro mis à jour avec succès", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour du numéro", error });
  }
});

module.exports = router;
