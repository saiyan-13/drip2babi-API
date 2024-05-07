const Offer = require("../../models/Offer");

async function getUserOffer(req, res) {
  try {
    // Récupérer l'ID de l'utilisateur à partir de la requête, si disponible
    const userId = req.params.userId;
    console.log(req.params.userId);

    // Construire la requête MongoDB
    let query = {};
    if (userId) {
      // Si un userId est fourni, filtrer les offres par cet utilisateur
      query.owner = userId;
    }

    const results = await Offer.find(query)
      .populate(
        "owner",
        "account.username account.avatar.secure_url account.number"
      )
      .select(
        `owner
                product_date
                product_name 
                product_description
                product_price
                product_details
                product_image.secure_url
                product_pictures  
                `
      );

    res.json({
      count: results.length,
      offers: results,
    });
  } catch (err) {
    console.error(err);
    res
      .status(err.status || 500)
      .json({ message: err.message || "Internal Server Error" });
  }
}

module.exports = getUserOffer;
