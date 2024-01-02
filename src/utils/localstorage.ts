interface LocalAccessToken {
    value: string | object;
    expires: number;
  }
  
  const setWithExpiry = (
    key: string,
    value: string | object,
    ttl: number
  ): void => {
    const now = new Date();
  
    const item: LocalAccessToken = {
      value,
      expires: now.getTime() + ttl * 1000,
    };
  
    localStorage.setItem(key, JSON.stringify(item));
  };
  
  const getWithExpiry = (key: string): null | string | object => {
    if (typeof window === "undefined") {
      return null;
    }
  
    const itemStr = localStorage.getItem(key);
  
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr) as LocalAccessToken;
  
    const now = new Date();
  
    if (item.expires < now.getTime()) {
      localStorage.removeItem(key);
      return null;
    }
  
    return item.value;
  };
  
  
  const removeWithExpiry = (key: string): void => {
    localStorage.removeItem(key);
  };
  
  export { getWithExpiry, setWithExpiry,removeWithExpiry };