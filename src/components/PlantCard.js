import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { formatPrice, generateStars } from '../utils/helpers';

const PlantCard = ({ plant }) => {
  const stars = generateStars(plant.rating);

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      {/* Image Container */}
      <div className="relative overflow-hidden h-64 bg-gradient-to-br from-green-50 to-green-100">
        <img
          src={plant.images[0]}
          alt={plant.name}
          className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
        />
        {/* Category Badge */}
        <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
          {plant.category}
        </div>
        {/* Stock Badge */}
        {plant.stock < 5 && (
          <div className="absolute bottom-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold animate-pulse">
            Only {plant.stock} left!
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Plant Name */}
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {plant.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center space-x-1 mb-3">
          {stars.map((star, index) => {
            if (star === 'full') {
              return <FaStar key={index} className="text-yellow-400" />;
            } else if (star === 'half') {
              return <FaStarHalfAlt key={index} className="text-yellow-400" />;
            } else {
              return <FaRegStar key={index} className="text-gray-300" />;
            }
          })}
          <span className="text-sm text-gray-600 ml-2">({plant.rating})</span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {plant.description}
        </p>

        {/* Price & Button */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">
            {formatPrice(plant.price)}
          </span>
          <Link
            to={`/plant/${plant.id}`}
            className="bg-primary text-white px-5 py-2 rounded-lg font-medium hover:bg-primary-dark transition-all transform hover:scale-105"
          >
            Order Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PlantCard;
