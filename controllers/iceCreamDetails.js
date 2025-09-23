import ICECREAM from "../Model/Model_ice.js";
import User from "../Model/user.js";


export const showDetails = async (req, res) => {
  const iceCreamId = req.params.id;
  try {
    const ice = await ICECREAM.findById(iceCreamId).lean();
    if (!ice) return res.status(404).send("Product not found");

    
    const userFavorites = req.user?.favorites || [];

    
    ice.isFavorite = userFavorites.some(favId => favId.toString() === ice._id.toString());

    console.log("isFavorite for this product:", ice.isFavorite);

    res.render("detailsiceCream", { ice });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error });
  }
};


export const toggleFavorite = async (req, res) => {
  try {
    const user = req.user; 
    const { productId } = req.body;

    if (!user) return res.status(401).json({ success: false, message: "Not authenticated" });

    const isAlreadyFavorite = user.favorites.some(fav => fav.toString() === productId);

    if (isAlreadyFavorite) {
     
      user.favorites = user.favorites.filter(fav => fav.toString() !== productId);
    } else {
     
      user.favorites.push(productId);
    }

    await user.save();

    res.json({
      success: true,
      isFavorite: !isAlreadyFavorite,
      message: !isAlreadyFavorite ? "Added to favorites" : "Removed from favorites"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
