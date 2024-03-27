const Offer = require("../../models/Offer");


async function getUserOffer(req, res) {
    try {
        const userId = req.user._id;

        const results = await Offer.find({ owner: userId })
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
        res.status(err.status || 500).json({message: err.message || "Internal Server Error"});
    }
}

module.exports = getUserOffer;