import React from 'react';
import { Link } from 'react-router-dom';
import { FaTruck, FaHeadset, FaLeaf, FaShieldAlt } from 'react-icons/fa';
import { usePlants } from '../context/PlantsContext';
import PlantCard from '../components/PlantCard';

const Home = () => {
  const { plants } = usePlants();
  const featuredPlants = plants.slice(0, 6);

  const benefits = [
    {
      icon: <FaTruck className="text-5xl text-primary" />,
      title: 'Free Delivery',
      description: 'Free shipping on all orders across Hyderabad',
    },
    {
      icon: <FaHeadset className="text-5xl text-primary" />,
      title: '24/7 Support',
      description: 'Dedicated customer support anytime',
    },
    {
      icon: <FaLeaf className="text-5xl text-primary" />,
      title: 'Organic Plants',
      description: '100% natural and healthy plants',
    },
    {
      icon: <FaShieldAlt className="text-5xl text-primary" />,
      title: 'Quality Guarantee',
      description: '30-day money back guarantee',
    },
  ];

  const stats = [
    { number: '500+', label: 'Happy Customers' },
    { number: '100+', label: 'Plant Varieties' },
    { number: '50+', label: 'Cities Covered' },
    { number: '4.8★', label: 'Average Rating' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fadeIn">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
                Bring Nature <br />
                <span className="text-primary">Into Your Home</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Discover a wide range of beautiful plants that will transform your space into a green paradise.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/plants"
                  className="bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-dark transition-all transform hover:scale-105 shadow-lg"
                >
                  Browse Plants 🌱
                </Link>
                <Link
                  to="/contact"
                  className="bg-white text-primary border-2 border-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary hover:text-white transition-all transform hover:scale-105 shadow-lg"
                >
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="animate-scaleIn">
              <img
                src="https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=600&h=400&fit=crop"
                alt="Lucky Bamboo - Growth, Success and Prosperity"
                className="rounded-3xl shadow-2xl w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center animate-fadeIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Plants */}
      <section className="bg-gradient-to-br from-green-50 to-emerald-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Featured Plants
            </h2>
            <p className="text-xl text-gray-600">
              Discover our most popular and beautiful plants
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPlants.map((plant, index) => (
              <div
                key={plant.id}
                className="animate-fadeIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <PlantCard plant={plant} />
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/plants"
              className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-dark transition-all transform hover:scale-105 shadow-lg"
            >
              View All Plants →
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Why Choose Plantree?
            </h2>
            <p className="text-xl text-gray-600">
              We provide the best service for your green needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="text-center p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl hover:shadow-xl transition-all transform hover:-translate-y-2 animate-fadeIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-center mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;