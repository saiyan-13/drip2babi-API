const Offer = require('../models/Offer');

const limitOffersPerDay = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const count = await Offer.countDocuments({
            owner: userId,
            product_date: { $gte: today }
        });

        if (count >= 5) {
            return res.status(403).json({ message: 'You have reached the maximum limit of offers for today' });
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = limitOffersPerDay;