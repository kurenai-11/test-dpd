const fromEntries = <T extends string[][]>(iterable: T) => {
  return [...iterable].reduce((obj: Record<string, string>, [key, val]) => {
    obj[key] = val;
    return obj;
  }, {});
};

export const parseLinkHeader = (linkHeader: string) => {
  const linkHeadersArray = linkHeader
    .split(", ")
    .map((header) => header.split("; "));
  const linkHeadersMap = linkHeadersArray.map((header) => {
    const thisHeaderRel = header[1].replace(/"/g, "").replace("rel=", "");
    const thisHeaderUrl = header[0].slice(1, -1);
    return [thisHeaderRel, thisHeaderUrl];
  });
  return fromEntries(linkHeadersMap);
};
