# 🪦 THE GRAVEYARD 🪦

A gothic horror tribute to the social media platforms that have passed into digital history. This haunted web application recreates the authentic experiences of Orkut, MySpace, and GeoCities with a supernatural twist, featuring a flying vampire, atmospheric horror effects, and an interactive Count Dracula chatbot.

## 👻 Features

### 🔐 Authentication System
- **JWT-based authentication** with secure token storage
- **Sign Up & Login** with spooky themed forms
- **Protected routes** - must authenticate to enter the graveyard
- **User profiles** with avatars and status messages
- **Secure logout** with token cleanup
- **Form validation** with haunting error messages

### 🌙 Auth Page
- Combined login/signup interface with smooth transitions
- Dark gothic theme with animated fog, flying bats, and lightning
- Real-time form validation with spooky error messages
- Dramatic "Enter the Cemetery" transition with thunder effects
- Atmospheric background effects using GSAP animations

### ⚰️ The Graveyard (Main Page)
- **Terrifying Horror Atmosphere**: Blood moon, thunder storm clouds, lightning effects
- **Three Authentic Platform Graves**: Real PNG logos for Orkut, MySpace, and GeoCities
- **Flying Vampire**: Large animated Count Dracula that flies across the graveyard
- **Gothic Typography**: Royal fonts (Cinzel, Playfair Display) with elegant styling
- **Interactive Graves**: Hover to see ghost messages in first person ("I am Orkut...")
- **Custom Cursor**: Spooky cursor.png throughout the experience
- **No-Scroll Layout**: Perfect single-screen experience with all graves side by side
- **Atmospheric Elements**: Twisted dead trees, ground mist, tombstones, and eerie shadows

### 💜 Orkut (Original Design Recreation)
- **Authentic 2004 Design**: Pixel-perfect recreation of original Orkut interface
- **Pink/Purple Theme**: Classic gradient headers and authentic color scheme
- **Scraps System**: Write and view scraps with original functionality
- **Friends Grid**: 9 realistic friend avatars (Emma, Jake, Sofia, Alex, Maya, Ryan, Zoe, Noah, Lily)
- **Testimonials**: Preview of user testimonials with ratings
- **Communities**: Display of joined communities with colored icons
- **Profile Stats**: Dynamic karma, friends count, and profile views
- **Readable Text**: Fixed white text visibility in input areas

### 🧛 MySpace (Haunted Edition)
- **Full Customization Panel** with 6 spooky background themes:
  - Bloody Wallpaper
  - Haunted Corridor  
  - Spider Web Blackout
  - Cursed Neon Grid
  - Pumpkin Inferno
  - Foggy Cemetery Night

- **Interactive Widgets**:
  - 🎵 Flickering "Now Playing" widget
  - 👥 Draggable Friend Box with ghost silhouettes
  - ❤️ Beating pixel heart
  - 🕷️ Spider that crawls across screen every 20 seconds
  - 🔥 Hellfire Border mode with animated CSS effects
  - 👻 Random ghost pop-up warnings

- **Custom Status Messages** with glowing text effects

### 🌐 GeoCities (Cursed Edition)
- **3 GIF Pack Categories**:
  - **Pack 1 - 90s Horror Chaos**: Under construction GIFs, spinning skulls, pixel bats, flickering buttons
  - **Pack 2 - Haunted Web 1.0**: Bloody dripping text, GIF fire, rotating pumpkins, CRT glitch effects
  - **Pack 3 - Retro Halloween Aesthetic**: Cute ghost bounces, pixel witch flying, sparkle animations, cemetery signs

- Classic GeoCities layout with visitor counter, guestbook, and web rings
- Animated GIF borders and decorations
- Retro HTML styling with classic fonts and colors

### 🦇 Count Dracula's Royal Chamber (Vampire Chat)
- **Interactive AI Chatbot**: Sophisticated Count Dracula with centuries of wisdom
- **Royal Gothic Fonts**: Cinzel and Playfair Display for elegant typography
- **Gothic Design**: Dark red/black color scheme with ornamental borders
- **Large Vampire Logo**: Prominent 32x32 vampire avatar with glowing effects
- **Medieval Atmosphere**: Castle silhouettes, ornate patterns, and royal decorations
- **Enhanced Responses**: Context-aware AI with vampire personality and gothic language
- **Royal Interface**: Gradient backgrounds, glowing borders, and atmospheric effects
- **Sophisticated Dialogue**: First-person vampire responses with medieval sophistication

## 🛠️ Tech Stack

### Frontend
- **React 18** with Vite for fast development
- **TailwindCSS** with custom gothic fonts and horror themes
- **GSAP** for atmospheric animations and vampire flight effects
- **React Router** for navigation between haunted pages
- **Custom Cursor**: Spooky cursor.png throughout the application
- **Royal Typography**: Cinzel, Playfair Display, Crimson Text fonts

### Backend
- **Node.js** with Express server
- **MongoDB** with Mongoose for data persistence
- **JWT Authentication** with bcrypt password hashing
- **Protected Routes** with authentication middleware
- **Demo User Seeding** with realistic test accounts
- **RESTful API** endpoints for all platform features

## 🚀 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Vaibhav-Martha/SpookySites.git
   cd SpookySites
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```
   
<<<<<<< HEAD
   Or use the batch file:
   ```bash
   setup.bat
   ```

3. **Set up environment variables**
   ```bash
   cd server
   cp .env.example .env
   ```
   
   Then edit `server/.env` with your MongoDB connection:
   - **Option A**: Create free MongoDB Atlas account at https://www.mongodb.com/atlas
   - **Option B**: Use local MongoDB if installed
   - Update `MONGODB_URI` with your connection string
   - Change `JWT_SECRET` to a secure random string

4. **Seed demo users**
   ```bash
   cd server && npm run seed
   ```

5. **Start the development servers**
   ```bash
   npm run dev
   ```
   
   Or use the batch file:
   ```bash
   start-dev.bat
   ```

### 🔧 Quick Setup for Testing

If you just want to test the project quickly:

1. **Get a free MongoDB Atlas database**:
   - Go to https://www.mongodb.com/atlas
   - Create free account and cluster
   - Get connection string
   
2. **Update server/.env**:
   ```env
   MONGODB_URI=your_mongodb_connection_string_here
   JWT_SECRET=spooky_secret_key_change_in_production
   ```

3. **Run the seeder to create demo accounts**:
   ```bash
   cd server && npm run seed
   ```

## 🌐 Deploy to Vercel

### **Quick Vercel Deployment:**

1. **Prerequisites**:
   - MongoDB Atlas account (free): https://www.mongodb.com/atlas
   - Vercel account (free): https://vercel.com

2. **Deploy Steps**:
   ```bash
   # Install Vercel CLI
   npm install -g vercel
   
   # Deploy from your project directory
   vercel
   ```

3. **Set Environment Variables in Vercel Dashboard**:
   ```env
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_secure_random_secret_key
   NODE_ENV=production
   ```

4. **Database Setup**:
   - Create MongoDB Atlas cluster (free tier)
   - Whitelist all IPs (0.0.0.0/0) for Vercel
   - Use connection string in environment variables

### **Alternative: Vercel Dashboard Deployment**
1. Go to https://vercel.com/dashboard
2. Import your GitHub repository
3. Set environment variables
4. Deploy automatically
   
   Or use the batch file:
   ```bash
   start-dev.bat
   ```

   This will start:
   - Frontend on `http://localhost:3002`
   - Backend on `http://localhost:5001`

## 👻 Demo Accounts

Pre-created spooky accounts for testing:

| Username | Password | Character |
|----------|----------|-----------|
| `GhostUser` | `spooky123` | 👻 Original MySpace ghost |
| `ZombieKing` | `undead666` | 🧟‍♂️ Undead social networker |
| `VampireQueen` | `bloodmoon` | 🧛‍♀️ Immortal profile perfectionist |
| `SkeletonDJ` | `bones123` | 💀 Crypt music spinner |
| `WitchCoder` | `magic404` | 🧙‍♀️ HTML enchantress |

**Quick Login**: Click any username on the auth page to auto-fill credentials!

## 📁 Project Structure

```
graveyard-of-the-forgotten-web/
├── client/                 # React frontend
│   ├── src/
│   │   ├── pages/         # Main page components
│   │   │   ├── Login.jsx
│   │   │   ├── GraveyardHome.jsx
│   │   │   ├── Orkut.jsx
│   │   │   ├── MySpace.jsx
│   │   │   └── GeoCities.jsx
│   │   ├── components/    # Reusable components
│   │   │   ├── BackgroundEffects.jsx
│   │   │   ├── Grave.jsx
│   │   │   ├── MySpaceWidgetPanel.jsx
│   │   │   └── GeoCitiesGifSelector.jsx
│   │   └── assets/        # Static assets
├── server/                # Express backend
│   ├── server.js         # Main server file
│   └── package.json      # Server dependencies
└── package.json          # Root package.json
```

## 🎨 Custom Animations

The app features extensive GSAP animations including:
- Floating elements and parallax effects
- Shake animations on hover
- Fade transitions between pages
- Thunder flash effects
- Crawling spider animations
- Flickering text effects
- Rotating and bouncing GIF elements

## 🌙 Spooky Features

- **Atmospheric Sound Effects**: Thunder, eerie sounds (when audio files are available)
- **Dynamic Themes**: Real-time background switching in MySpace
- **Interactive Elements**: Hoverable graves, draggable widgets
- **Retro Aesthetics**: Authentic recreation of early 2000s web design
- **Gothic Typography**: Custom fonts and text shadows
- **Animated Cursors**: Spooky hover effects throughout


## 👻 Contributing

Feel free to contribute to this haunted project! Whether it's adding new spooky features, improving animations, or fixing bugs in the digital afterlife.

## 📜 License

This project is released into the digital graveyard under the MIT License.

---

*"In memory of the social media platforms that shaped the early internet. May their digital spirits live on forever in our nostalgic hearts." 💀*
