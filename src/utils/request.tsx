const fetcher = async (url: RequestInfo, method: string = "GET") => {
  const response = await fetch(url, { method });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export { fetcher };
