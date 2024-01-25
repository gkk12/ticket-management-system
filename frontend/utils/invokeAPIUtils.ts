// Function to handle API calls with error handling
export const invokeAPI = async (url: string, options?: RequestInit) => {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
        //   setError(error);
        return error;
    }
  };