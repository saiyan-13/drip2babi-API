const Offer = require("../../models/Offer");

async function getAllUserOffers(req, res) {
  try {
    // Supprimez ou commentez la ligne suivante pour récupérer toutes les offres sans filtrer par un utilisateur spécifique
    // const userId = req.user._id;

    console.log(req.user);

    const results = await Offer.find({}) // Utilisez un objet vide pour ne pas filtrer par owner
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

module.exports = getAllUserOffers;
