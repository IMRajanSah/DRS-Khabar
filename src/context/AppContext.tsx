import React, { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

// Define Post type (adapt fields as per your API)
export interface Post {
  id: number;
  title: string;
  category: string;
  [key: string]: any; // for extra fields
}

// Define Context shape
interface AppContextType {
  posts: Post[];
  loading: boolean;
  error: string | null;
  categoryFilter: string;
  showAd: boolean;
  setShowAd: Function;
  setCategoryFilter: React.Dispatch<React.SetStateAction<string>>;
}

// Create Context
export const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider props type
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAd, setShowAd] = useState(true);

  const [categoryFilter, setCategoryFilter] = useState<string>("politics");

  // Fetch API on first load
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("https://api.drskhabar.com/index.php?action=getPosts");
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data= await res.json();
        setPosts(data.posts);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // const filteredPosts = posts.filter(
  //   (post) => post.category === categoryFilter
  // // );

  return (
    <AppContext.Provider
      value={{
        posts,
        loading,
        error,
        categoryFilter,
        setCategoryFilter,
        showAd,
        setShowAd
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
