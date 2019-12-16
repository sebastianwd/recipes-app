import { useStorage } from "./useStorage";

export const useTagFilters = () => {
  const { storage } = useStorage();

  const getTagFilters = async () => {
    return await storage.get("filters");
  };

  const addTagFilter = async filter => {
    let filters = await storage.get("filters");
    console.log("filters", filters);
    const alreadyExists = filters.find(x => x.id == filter.id);
    if (!alreadyExists) {
      filters.push(filter);
      await storage.set("filters", filters);
    }
  };

  const findTagFilter = async filterId => {
    let filters = await storage.get("filters");
    if (!filters) {
      return null;
    }
    return filters.find(x => x.id == filterId);
  };

  const removeTagFilter = async filterId => {
    let filters = await storage.get("filters");
    let filterIndex = filters.findIndex(x => x.id == filterId);
    filters.splice(filterIndex, 1);
    await storage.set("filters", filters);
  };

  return {
    findTagFilter,
    addTagFilter,
    getTagFilters,
    removeTagFilter
  };
};
