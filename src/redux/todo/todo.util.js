export const setWithDate = (collections) => {
  const transformedCollection = collections
    .slice()
    .sort((a, b) => b.createdAt - a.createdAt);
  return transformedCollection;
};

export const setWithToday = (collections) => {
  const transformedCollection = collections.filter(
    (collection) => collection.completed === true
  );
  return transformedCollection;
};

export const setWithDue = (collections) => {
  const transformedCollection = collections.filter(
    (collection) => collection.completed === false
  );
  return transformedCollection;
};
export const setWithProject = (collections, project) => {
  const transformedCollection = collections.slice().sort((a, b) => {
    var x = a.addproject.toLowerCase();
    var y = b.addproject.toLowerCase();
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  });

  return transformedCollection;
};
