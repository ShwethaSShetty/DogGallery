
export const formatBreedList = (breedList: any): string[] => {
  return Object.entries(breedList.message).flatMap(([key, value]) => {
    if (Array.isArray(value) && value.length > 0) {
      return value.map((val) => `${val} ${key}`);
    }
    return key;
  });
}
