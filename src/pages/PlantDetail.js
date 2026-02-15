import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaRegStar, FaWhatsapp, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import { usePlants } from '../context/PlantsContext';
import { sendWhatsAppOrder, formatPrice, generateStars } from '../utils/helpers';

const PlantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { plants } = usePlants();
  const plant = plants.find((p) => p.id === id);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!plant) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center animate-fadeIn">
          <div className="text-6xl mb-4">🌱</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Plant not found</h2>
          <Link
            to="/plants"
            className="text-primary hover:text-primary-dark font-medium"
          >
            ← Back to all plants
          </Link>
        </div>
      </div>
    );
  }

  const stars = generateStars(plant.rating);

  const handleOrder = () => {
    sendWhatsAppOrder(plant);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-700 hover:text-primary mb-8 font-medium transition-all"
        >
          <FaArrowLeft />
          <span>Back</span>
        </button>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden animate-fadeIn">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Image Section */}
            <div>
              {/* Main Image */}
              <div className="rounded-2xl overflow-hidden mb-4 bg-gradient-to-br from-green-50 to-emerald-50">
                <img
                  src={plant.images[selectedImage]}
                  alt={plant.name}
                  className="w-full h-96 object-cover"
                />
              </div>
              
              {/* Thumbnail Images */}
              {plant.images.length > 1 && (
                <div className="flex space-x-4">
                  {plant.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index
                          ? 'border-primary scale-105'
                          : 'border-gray-200 hover:border-primary'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${plant.name} ${index + 1}`}
                        className="w-20 h-20 object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details Section */}
            <div className="flex flex-col">
              {/* Category Badge */}
              <div className="inline-block mb-4">
                <span className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold">
                  {plant.category}
                </span>
              </div>

              {/* Plant Name */}
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                {plant.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {stars.map((star, index) => {
                  if (star === 'full') {
                    return <FaStar key={index} className="text-yellow-400 text-xl" />;
                  } else if (star === 'half') {
                    return <FaStarHalfAlt key={index} className="text-yellow-400 text-xl" />;
                  } else {
                    return <FaRegStar key={index} className="text-gray-300 text-xl" />;
                  }
                })}
                <span className="text-gray-600 ml-2 font-medium">
                  ({plant.rating} / 5.0)
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <span className="text-5xl font-bold text-primary">
                  {formatPrice(plant.price)}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                {plant.description}
              </p>

              {/* Care Level & Stock */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl">
                  <div className="text-sm text-gray-600 mb-1">Care Level</div>
                  <div className="text-lg font-bold text-gray-800">{plant.careLevel}</div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl">
                  <div className="text-sm text-gray-600 mb-1">Stock</div>
                  <div className="text-lg font-bold text-gray-800">
                    {plant.stock} available
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Benefits:</h3>
                <div className="space-y-2">
                  {plant.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <FaCheckCircle className="text-primary" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* WhatsApp Order Button */}
              <button
                onClick={handleOrder}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-5 rounded-xl font-bold text-xl hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center space-x-3"
              >
                <FaWhatsapp className="text-3xl" />
                <span>Order on WhatsApp</span>
              </button>

              {/* Stock Warning */}
              {plant.stock < 5 && (
                <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center font-medium">
                  ⚠️ Hurry! Only {plant.stock} left in stock
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantDetail;
