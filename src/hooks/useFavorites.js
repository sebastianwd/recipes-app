import { useStorage } from "./useStorage";

export const useFavorites = () => {
  const { storage } = useStorage();

  /* Favorites model: 
  { id,
    image,
    name,
    type
  } */

  const getFavorites = async () => {
    return await storage.get("favorites");
  };

  const addFavorite = async favorite => {
    let favorites = await storage.get("favorites");
    const alreadyExists = favorites.find(x => x.id == favorite.id);
    if (!alreadyExists) {
      favorites.push(favorite);
      await storage.set("favorites", favorites);
    }
  };

  const findFavorite = async favoriteId => {
    let favorites = await storage.get("favorites");
    if (!favorites) {
      return null;
    }
    return favorites.find(x => x.id == favoriteId);
  };

  const removeFavorite = async favoriteId => {
    let favorites = await storage.get("favorites");
    let favoriteIndex = favorites.findIndex(x => x.id == favoriteId);
    favorites.splice(favoriteIndex, 1);
    await storage.set("favorites", favorites);
  };

  return {
    findFavorite,
    addFavorite,
    getFavorites,
    removeFavorite
  };
};
