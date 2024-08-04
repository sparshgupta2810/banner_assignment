"use client";
import React, { useState } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

interface EditBannerProps {
  ad: any;
  onSave: (updatedAd: any) => void;
  onClose: () => void;
}

const images = [
  "https://bestinau.com.au/wp-content/uploads/2019/01/free-images.jpg",
  "https://tse4.mm.bing.net/th?id=OIP.M_uHkB6jQb94uyhueGHjuAHaE8&pid=Api&H=106&W=160",
  "https://images.pexels.com/photos/1236701/pexels-photo-1236701.jpeg?h=1000&w=1500&fit=crop&mark=https:%2F%2Fassets.imgix.net%2F~text%3Ftxtclr%3Dfff%26txt%3DFree+Copyright+Free+Photos%26txtsize%3D120%26txtpad%3D20%26bg%3D80000000%26txtfont%3DAvenir-Heavy%26txtalign%3Dcenter%26w%3D1300&markalign=center%2Cmiddle&txt=pexels.com&txtalign=center&txtsize=60&txtclr=eeffffff&txtfont=Avenir-Heavy&txtshad=10",
  "https://tse3.mm.bing.net/th?id=OIP.EwNZjq5l-bk_lG6cA5aJQQHaE8&pid=Api&P=0&h=180",
];

const EditBanner: React.FC<EditBannerProps> = ({ ad, onSave, onClose }) => {
  const [editedAd, setEditedAd] = useState(ad);
  const [selectedImage, setSelectedImage] = useState(ad.image);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedAd((prevAd: any) => ({ ...prevAd, [name]: value }));
  };

  const handleSave = () => {
    const updatedAd = { ...editedAd, image: selectedImage };
    onSave(updatedAd);
    onClose();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-semibold">Edit Banner</h2>
          <HighlightOffIcon
            onClick={onClose}
            className="cursor-pointer text-gray-600 hover:text-gray-800"
          />
        </div>
        <div className="mb-4">
          <img
            src={selectedImage}
            alt="Selected"
            className="w-full h-48 object-cover rounded-md"
          />
          <div className="mt-2 flex space-x-2 overflow-x-auto">
            {images.map((image, idx) => (
              <img
                key={idx}
                src={image}
                alt={`Option ${idx}`}
                className={`w-16 h-16 object-cover rounded-full cursor-pointer ${
                  selectedImage === image ? "ring-2 ring-indigo-500" : ""
                }`}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        </div>
        <form className="grid gap-4">
          <div>
            <label htmlFor="title" className="block text-sm text-gray-800">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={editedAd.title}
              onChange={handleChange}
              className="mt-1 block w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            />
          </div>
          <div>
            <label htmlFor="cta" className="block text-sm text-gray-800">
              Category*
            </label>
            <input
              type="text"
              name="cta"
              value={editedAd.cta}
              onChange={handleChange}
              className="mt-1 block w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-sm text-gray-800">
              Upload Image*
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full text-gray-800 outline-none transition duration-100"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm text-gray-800"
            >
              Message*
            </label>
            <textarea
              name="description"
              value={editedAd.description}
              onChange={handleChange}
              className="mt-1 block w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring h-24"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handleSave}
              className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700"
            >
              Update
            </button>
            <span className="text-sm text-gray-500">*Required</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBanner;
