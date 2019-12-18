import { useStorage } from "./useStorage";

export const useRecentSeen = () => {
  const { storage } = useStorage();

  const getRecentSeen = async () => {
    return await storage.get("recentsSeen");
  };

  const addRecentSeen = async recentSeen => {
    let recentsSeen = await storage.get("recentsSeen");

    if (recentsSeen.length > 5) {
      removeRecentSeen(recentsSeen[recentsSeen.length - 1].id);
    }
    const alreadyExists = recentsSeen.find(x => x.id == recentSeen.id);
    if (!alreadyExists) {
      recentsSeen.push(recentSeen);
      await storage.set("recentsSeen", recentsSeen);
    }
  };

  const findRecentSeen = async recentSeenId => {
    let recentsSeen = await storage.get("recentsSeen");
    if (!recentsSeen) {
      return null;
    }
    return recentsSeen.find(x => x.id == recentSeenId);
  };

  const removeRecentSeen = async recentSeenId => {
    let recentsSeen = await storage.get("recentsSeen");
    let recentSeenIndex = recentsSeen.findIndex(x => x.id == recentSeenId);
    recentsSeen.splice(recentSeenIndex, 1);
    await storage.set("recentsSeen", recentsSeen);
  };

  return {
    findRecentSeen,
    addRecentSeen,
    getRecentSeen,
    removeRecentSeen
  };
};
