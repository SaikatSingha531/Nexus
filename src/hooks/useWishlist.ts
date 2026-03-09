import { useState, useEffect } from "react";

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState<any[]>([]);

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem("nexus-wishlist");
    if (saved) setWishlist(JSON.parse(saved));
  }, []);

  const toggleWishlist = (video: any) => {
    const isExist = wishlist.find((item) => item.id === video.id);
    let updatedWishlist;

    if (isExist) {
      updatedWishlist = wishlist.filter((item) => item.id !== video.id);
    } else {
      updatedWishlist = [...wishlist, video];
    }

    setWishlist(updatedWishlist);
    localStorage.setItem("nexus-wishlist", JSON.stringify(updatedWishlist));
  };

  const isInWishlist = (id: string | number) => {
    return wishlist.some((item) => item.id === id);
  };

  return { wishlist, toggleWishlist, isInWishlist, count: wishlist.length };
};
