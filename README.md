# WanderLust 🏨

A full-stack web application for listing and booking accommodations, similar to Airbnb. Built with Node.js, Express, MongoDB, and EJS templating.

## 🌟 Features

- **Property Listings**: Browse and search through various accommodation listings
- **User Authentication**: Secure signup, login, and logout functionality using Passport.js
- **Property Management**: Add, edit, and delete property listings (for property owners)
- **Reviews & Ratings**: Leave reviews and ratings for properties you've stayed at
- **Interactive Maps**: View property locations on interactive maps using Mapbox
- **Image Upload**: Upload property images using Cloudinary
- **Responsive Design**: Mobile-friendly interface that works on all devices
- **Flash Messages**: User feedback for actions and errors
- **Session Management**: Secure session handling with MongoDB store

## 🛠️ Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Passport.js** - Authentication middleware
- **Express-session** - Session management
- **Connect-flash** - Flash message middleware

### Frontend
- **EJS** - Templating engine
- **EJS-Mate** - Layout support for EJS
- **Bootstrap** - CSS framework for responsive design
- **Mapbox** - Interactive maps

### Cloud Services
- **MongoDB Atlas** - Cloud database
- **Cloudinary** - Image storage and management
- **Mapbox** - Geocoding and mapping services

### Additional Tools
- **Joi** - Data validation
- **Multer** - File upload handling
- **Method-override** - HTTP method override
- **Dotenv** - Environment variable management

## 📁 Project Structure

```
├── app.js                 # Main application file
├── package.json          # Dependencies and scripts
├── cloudConfig.js        # Cloudinary configuration
├── middleware.js         # Custom middleware functions
├── schema.js            # Joi validation schemas
├── controllers/         # Route controllers
│   ├── listings.js      # Listing-related logic
│   ├── reviews.js       # Review-related logic
│   └── users.js         # User authentication logic
├── models/              # Database models
│   ├── listing.js       # Listing schema
│   ├── review.js        # Review schema
│   └── user.js          # User schema
├── routes/              # Express routes
│   ├── listing.js       # Listing routes
│   ├── review.js        # Review routes
│   └── user.js          # User routes
├── views/               # EJS templates
│   ├── layouts/         # Layout templates
│   ├── listings/        # Listing views
│   ├── users/           # User views
│   └── includes/        # Partial templates
├── public/              # Static files
│   ├── css/            # Stylesheets
│   └── js/             # Client-side JavaScript
├── init/                # Database initialization
│   ├── data.js         # Sample data
│   └── index.js        # Database seeding script
└── utils/               # Utility functions
    ├── ExpressError.js  # Custom error class
    └── wrapAsync.js     # Async error wrapper
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Cloudinary account
- Mapbox account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shreya1826/WanderLust.git
   cd WanderLust
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add:
   ```env
   ATLASDB_URL=your_mongodb_atlas_connection_string
   SECRET=your_session_secret
   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret
   MAP_TOKEN=your_mapbox_access_token
   ```

4. **Initialize the database (optional)**
   ```bash
   node init/index.js
   ```

5. **Start the application**
   ```bash
   node app.js
   ```

6. **Open your browser**
   Navigate to `http://localhost:8080`

## 💾 Database Schema

### Listing Model
- Title, description, location, country
- Price per night
- Image (URL and filename)
- Owner (reference to User)
- Reviews (array of Review references)
- Geometry (coordinates for mapping)

### User Model
- Username and email
- Password (hashed using passport-local-mongoose)
- Associated listings and reviews

### Review Model
- Rating (1-5 stars)
- Comment
- Author (reference to User)
- Associated listing

## 🔐 Authentication & Authorization

- **Registration/Login**: Users can create accounts and log in securely
- **Authorization**: Only listing owners can edit/delete their properties
- **Review Authorization**: Only logged-in users can leave reviews
- **Session Management**: Secure session handling with automatic logout

## 🗺️ API Endpoints

### Listings
- `GET /listings` - View all listings
- `GET /listings/new` - Show new listing form
- `POST /listings` - Create new listing
- `GET /listings/:id` - Show specific listing
- `GET /listings/:id/edit` - Show edit form
- `PUT /listings/:id` - Update listing
- `DELETE /listings/:id` - Delete listing

### Reviews
- `POST /listings/:id/reviews` - Add review
- `DELETE /listings/:id/reviews/:reviewId` - Delete review

### Users
- `GET /signup` - Show signup form
- `POST /signup` - Register user
- `GET /login` - Show login form
- `POST /login` - Login user
- `GET /logout` - Logout user

## 🎨 UI Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Interactive Maps**: Click on map markers to view property details
- **Image Galleries**: View multiple images for each property
- **Star Ratings**: Visual rating system for reviews
- **Filter Options**: Search and filter properties by various criteria
- **Flash Messages**: User-friendly feedback for all actions

## 🔧 Error Handling

- Custom error handling middleware
- Async error wrapper for route handlers
- Client and server-side validation
- 404 page for non-existent routes
- Graceful error messages for users

## 📱 Mobile Responsiveness

The application is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile phones
- Different screen orientations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Shreya** - [GitHub Profile](https://github.com/shreya1826)

## 🙏 Acknowledgments

- Thanks to the open-source community for the amazing tools and libraries
- Inspiration from Airbnb's user interface and functionality
- Bootstrap for the responsive design framework
- Mapbox for the mapping functionality

## 📞 Support

If you have any questions or need help with setup, please open an issue in the GitHub repository.

---

**Happy Wandering! 🌍✈️**
