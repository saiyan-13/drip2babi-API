require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const { convertToBase64 } = require("../utils/utility");

// Configuration
cloudinary.config({
  cloud_name: "dze9kgvl7",
  api_key: "467574652848379",
  api_secret: "iok6oJ9SF2L9fcyEtmr3YJlNrc4",
});

async function uploadUserAvatar(imgFile, userId) {
  try {
    const result = await cloudinary.uploader.upload(convertToBase64(imgFile), {
      folder: `api/vinted-v2/users/${userId}`,
      public_id: "avatar",
    });
    const { url, api_key, ...avatarData } = result;
    return avatarData;
  } catch (err) {
    throw err;
  }
}

async function uploadOfferPicture(imgFile, userId, offerId, index) {
  try {
    const result = await cloudinary.uploader.upload(convertToBase64(imgFile), {
      folder: `api/vinted-v2/offers/${userId}/${offerId}`,
      public_id: index && index !== 0 ? `preview${index}` : "preview",
    });
    const { url, api_key, ...pictureData } = result;
    return pictureData;
  } catch (err) {
    throw err;
  }
}

async function updateUserAvatar(publicId, newFile, userId) {
  try {
    // delete the current current image...
    const oldAvatar = await cloudinary.uploader.destroy(publicId);
    if (oldAvatar.result === "ok" || oldAvatar.result === "not found") {
      // than i reupload a new one...
      const result = await cloudinary.uploader.upload(
        convertToBase64(newFile),
        {
          folder: `api/vinted-v2/users/${userId}`,
          public_id: "avatar",
        }
      );
      const { url, api_key, ...avatarData } = result;
      return avatarData;
    } else {
      throw {
        status: 500,
        message: "Cannot update avatar picture try again later",
      };
    }
  } catch (err) {
    throw err;
  }
}

async function updateOfferPicture(publicId, newFile, userId, offerId) {
  try {
    const oldPicture = await cloudinary.uploader.destroy(publicId);
    if (oldPicture.result === "ok" || oldPicture.result === "not found") {
      const result = await cloudinary.uploader.upload(
        convertToBase64(newFile),
        {
          folder: `api/vinted-v2/offers/${userId}/${offerId}`,
          public_id: "preview",
        }
      );
      const { url, api_key, ...pictureData } = result;
      return pictureData;
    } else {
      throw { status: 500, message: "Cannot update picture try again later" };
    }
  } catch (err) {
    throw err;
  }
}

async function deleteAvatar(userId) {
  try {
    // delete image in the specific foler
    await cloudinary.api.delete_resources_by_prefix(
      `api/vinted-v2/users/${userId}`
    );
    // than delete the empty folder...
    await cloudinary.api.delete_folder(`api/vinted-v2/users/${userId}`);
  } catch (err) {
    throw err;
  }
}

async function deleteOfferPicture(userId, offerId) {
  try {
    // Supprimer toutes les ressources dans le dossier
    const deleteResourcesResponse =
      await cloudinary.api.delete_resources_by_prefix(
        `api/vinted-v2/offers/${userId}/${offerId}`
      );

    console.log(
      "Résultat de la suppression des ressources :",
      deleteResourcesResponse
    );

    // Vérifier s'il reste des ressources dans le dossier
    const folderContents = await cloudinary.api.resources({
      type: "upload",
      prefix: `api/vinted-v2/offers/${userId}/${offerId}/`,
      max_results: 1, // Vérifier s'il reste au moins une ressource
    });

    // Si le dossier est vide ou s'il ne contient plus de ressources, supprimer le dossier
    if (folderContents.resources.length === 0) {
      const deleteFolderResponse = await cloudinary.api.delete_folder(
        `api/vinted-v2/offers/${userId}/${offerId}`
      );
      console.log(
        "Résultat de la suppression du dossier :",
        deleteFolderResponse
      );
    } else {
      console.log(
        "Le dossier contient encore des ressources. Suppression annulée."
      );
    }
  } catch (error) {
    console.error("Erreur lors de la suppression du dossier :", error);
    throw error;
  }
}

async function deleteAllUserOffers(userId) {
  try {
    // delete all images in the folder
    await cloudinary.api.delete_resources_by_prefix(
      `api/vinted-v2/offers/${userId}`
    );
    // than delete all empty folder include the userId folder create to contain user offers.
    await cloudinary.api.delete_folder(`api/vinted-v2/offers/${userId}`);
  } catch (err) {
    throw err;
  }
}

module.exports = {
  uploadUserAvatar,
  uploadOfferPicture,
  updateUserAvatar,
  updateOfferPicture,
  deleteAvatar,
  deleteOfferPicture,
  deleteAllUserOffers,
};
