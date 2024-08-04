// pages/index.tsx
"use client";
import React, { useState, useEffect } from "react";
import AdBanner from "./component/AdBanner";
import EditBanner from "./component/Edit";
import AdBannerGrid from "./component/AdBanner";

const Home: React.FC = () => {
  const [ads, setAds] = useState<any[]>([]);
  const [editingAd, setEditingAd] = useState<any | null>(null);

  useEffect(() => {
    fetch("/ads.json")
      .then((response) => response.json())
      .then((data) => setAds(data));
  }, []);

  const handleEdit = (index: number) => {
    setEditingAd({ ...ads[index], index });
  };

  const handleSave = (updatedAd: any) => {
    const updatedAds = [...ads];
    updatedAds[editingAd.index] = updatedAd;
    setAds(updatedAds);
    setEditingAd(null);
  };

  return (
    <div>
      <div className=" mx-60 my-36">
        <AdBannerGrid banners={ads} onEdit={handleEdit} />
      </div>
      {editingAd && (
        <EditBanner
          ad={editingAd}
          onSave={handleSave}
          onClose={() => setEditingAd(null)}
        />
      )}
    </div>
  );
};

export default Home;
