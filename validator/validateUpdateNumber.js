// validator/validateUpdateNumber.js

const validateUpdateNumber = (req, res, next) => {
  const updateNumber = req.body.updateNumber;

  if (!updateNumber) {
    return res
      .status(400)
      .json({ error: "Le numéro de mise à jour est requis." });
  }

  if (typeof updateNumber !== "number" || updateNumber <= 0) {
    return res
      .status(400)
      .json({
        error: "Le numéro de mise à jour doit être un nombre entier positif.",
      });
  }

  next();
};

module.exports = validateUpdateNumber;
