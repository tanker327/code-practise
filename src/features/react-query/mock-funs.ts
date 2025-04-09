
export const mockFetch = async (url: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: `Data from ${url}` });
    }, 1000);
  });
}
export const mockPost = async (url: string, data: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: `Posted data to ${url}: ${JSON.stringify(data)}` });
    }, 1000);
  });
}