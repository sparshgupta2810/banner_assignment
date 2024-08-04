// components/AdBanner.tsx
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import Image from "next/image";

interface AdBannerProps {
  title: string;
  description: string;
  cta: string;
  image: string;
  background: string;
  onEdit: () => void;
}

const AdBanner: React.FC<AdBannerProps> = ({
  title,
  description,
  cta,
  image,
  background,
  onEdit,
}) => {
  return (
    <div
      className="relative group flex items-center justify-center h-96 w-6/7 overflow-hidden rounded-lg shadow-md"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      <div className="absolute p-4 text-left text-white w-full left-0">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="mt-2">{description}</p>
        <button className="mt-4 px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 transition duration-200">
          {cta}
        </button>
      </div>
      <img
        src={image}
        alt=""
        className="absolute rounded-full right-2 h-60 w-60 object-cover object-bottom"
      />
      <button
        onClick={onEdit}
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition duration-200"
      >
        <EditIcon />
      </button>
    </div>
  );
};

const AdBannerGrid: React.FC<{
  banners: AdBannerProps[];
  onEdit: (index: number) => void;
}> = ({ banners, onEdit }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {banners.map((banner, index) => (
        <AdBanner
          key={index}
          title={banner.title}
          description={banner.description}
          cta={banner.cta}
          image={banner.image}
          background={banner.background}
          onEdit={() => onEdit(index)}
        />
      ))}
    </div>
  );
};

export default AdBannerGrid;
