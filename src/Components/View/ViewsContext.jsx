// ViewsContext.js
import { createContext, useContext, useState } from 'react';

const ViewsContext = createContext();

export const ViewsProvider = ({ children }) => {
  const [viewsData, setViewsData] = useState({});

  const updateViews = (movieId) => {
    setViewsData((prevViews) => ({
      ...prevViews,
      [movieId]: (prevViews[movieId] || 0) + 1,
    }));
  };

  return (
    <ViewsContext.Provider value={{ viewsData, updateViews }}>
      {children}
    </ViewsContext.Provider>
  );
};

export const useViews = () => {
  return useContext(ViewsContext);
};
