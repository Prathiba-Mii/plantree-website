# 🌱 Plantree - Plant E-Commerce Website

A modern, responsive plant e-commerce website built with React, featuring an admin panel and WhatsApp ordering integration.

## 🚀 Features

- **Beautiful Modern UI**: Clean, professional design with smooth animations
- **Browse Plants**: Search, filter, and sort through plant catalog
- **Plant Details**: Detailed information, images, ratings, and benefits
- **WhatsApp Ordering**: Direct WhatsApp integration for orders
- **Admin Panel**: Complete CRUD operations for plant management
- **Responsive Design**: Works perfectly on all devices
- **Fast & Lightweight**: Static website, no backend required
- **Easy to Deploy**: Ready for Vercel, Netlify, or any static hosting

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## 🛠️ Installation

1. **Extract the project files** to your desired location

2. **Open terminal** in the project directory

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start the development server**:
   ```bash
   npm start
   ```

5. **Open your browser** and visit: `http://localhost:3000`

## 🎨 Project Structure

```
plantree/
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── components/         # Reusable components
│   │   ├── Navbar.js
│   │   ├── Footer.js
│   │   ├── PlantCard.js
│   │   ├── SearchBar.js
│   │   └── AdminRoute.js
│   ├── pages/              # Page components
│   │   ├── Home.js
│   │   ├── Plants.js
│   │   ├── PlantDetail.js
│   │   ├── Contact.js
│   │   ├── AdminLogin.js
│   │   └── AdminPanel.js
│   ├── data/
│   │   └── plants.json     # Initial plant data
│   ├── context/
│   │   └── PlantsContext.js # State management
│   ├── utils/
│   │   └── helpers.js      # Helper functions
│   ├── App.js              # Main app component
│   ├── index.js            # App entry point
│   └── index.css           # Global styles
├── package.json
├── tailwind.config.js
└── README.md
```

## 🔐 Admin Access

**Admin Login Page**: `/admin-login`

**Password**: `plantree@2024`

### Admin Features:
- Add new plants with all details
- Edit existing plants
- Delete plants
- View dashboard statistics
- Manage plant images and benefits

## 📱 WhatsApp Integration

Orders are sent directly to: **+91 7093206757**

The system automatically formats the order message with:
- Plant name
- Price
- Quantity

## 🎯 Usage Guide

### For Users:
1. Browse plants on the home page or "Browse Plants" page
2. Use search and filters to find specific plants
3. Click on any plant to view details
4. Click "Order on WhatsApp" to place an order

### For Admins:
1. Go to `/admin-login`
2. Enter password: `plantree@2024`
3. Access the admin panel
4. Add, edit, or delete plants as needed
5. View statistics on the dashboard

## 🚢 Deployment

### Vercel Deployment:

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Deploy (it will auto-detect React)

### Netlify Deployment:

1. Build the project:
   ```bash
   npm run build
   ```
2. Drag and drop the `build` folder to [Netlify](https://netlify.com)

### Manual Build:

```bash
npm run build
```
The production files will be in the `build` folder.

## 🎨 Customization

### Update Contact Information:
Edit the following files:
- `src/pages/Contact.js` - Contact page details
- `src/components/Footer.js` - Footer contact info
- `src/utils/helpers.js` - WhatsApp phone number

### Change Admin Password:
Edit `src/context/PlantsContext.js`:
```javascript
if (password === 'plantree@2024') { // Change this password
```

### Modify Initial Plants:
Edit `src/data/plants.json` with your plant data.

### Styling:
- Global styles: `src/index.css`
- Tailwind config: `tailwind.config.js`
- Component-specific: inline Tailwind classes

## 🌟 Features Overview

### Home Page
- Hero section with CTA buttons
- Featured plants (first 6)
- Statistics (customers, plants, ratings)
- Benefits section (delivery, support, quality)

### Browse Plants Page
- Search by name/description
- Filter by category (Indoor, Outdoor, Flowering, Succulents, Herbs)
- Sort by name, price, or rating
- Responsive grid layout

### Plant Detail Page
- Large image display with thumbnails
- Full plant information
- Rating display
- Benefits list
- Care level
- Stock information
- WhatsApp order button

### Admin Panel
- Dashboard with statistics
- Add plant form with validation
- Edit existing plants
- Delete with confirmation
- Image URL management
- Benefits management

### Contact Page
- Contact form (WhatsApp integrated)
- Contact information display
- Location details

## 💾 Data Storage

- **Plants Data**: Stored in `localStorage` (persists across sessions)
- **Admin Auth**: Stored in `localStorage`
- **Initial Data**: Loaded from `src/data/plants.json`

## 🔧 Troubleshooting

### Issue: Styles not loading
**Solution**: Make sure Tailwind CSS is properly configured and `npm install` was successful.

### Issue: Images not showing
**Solution**: Check that image URLs are valid and accessible. Use HTTPS URLs.

### Issue: Admin panel not accessible
**Solution**: Make sure you're logged in. Password is `plantree@2024`.

### Issue: WhatsApp button not working
**Solution**: Verify the phone number in `src/utils/helpers.js` is correct.

## 📞 Contact

**Developer**: Kaluri Sai Kumar
- Email: saikumarkaluri0@gmail.com
- Phone: +91 7093206757
- Location: Hyderabad, Telangana, India

## 📄 License

This project is created for personal/commercial use.

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Unsplash for placeholder images
- React Icons for beautiful icons

---

**Made with 💚 by Kaluri Sai Kumar**

🌱 **Plantree - Bring Nature Into Your Home**
