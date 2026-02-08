# Client-Side Routing - React Router DOM

Demo:

<video controls src="https://raw.githubusercontent.com/gaurav012005/Qskill-project/main/EduRoute/20260204-1716-09.9634650.mp4" width="100%"></video>

## 📋 Project Overview

A React app demonstrating **client-side routing** using **react-router-dom** to create multiple pages without page reloads.

**Features:** Multiple pages · Navigation menu · Fast transitions · No page refresh

---

## 🧭 What is Client-Side Routing?

**Traditional Routing:** Click → Server request → Full page reload → Slow ❌  
**Client-Side Routing:** Click → URL changes → Component switches → Fast ✅

**Benefits:**
- ⚡ Instant page transitions
- 🔙 Back/forward buttons work
- 🔖 Each page has unique URL
- 📱 Better user experience

---

## 🎯 Core Concepts

### 1. BrowserRouter - Enable Routing

```javascript
import { BrowserRouter } from 'react-router-dom';

<BrowserRouter>
  {/* Your app */}
</BrowserRouter>
```

**Purpose:** Wraps app to enable routing

### 2. Routes & Route - Map URLs to Components

```javascript
import { Routes, Route } from 'react-router-dom';

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="*" element={<NotFound />} />  {/* 404 */}
</Routes>
```

**Purpose:** Tells React which component to show for each URL

### 3. Link - Navigate Without Reload

```javascript
import { Link } from 'react-router-dom';

<Link to="/">Home</Link>
<Link to="/about">About</Link>
```

**Purpose:** Navigate between pages instantly (no reload)

**❌ Don't use:** `<a href="/about">` (causes page reload)  
**✅ Use:** `<Link to="/about">` (no reload, fast)

---

## 💻 Complete Implementation

### Install
```bash
npm install react-router-dom
```

### App.jsx
```javascript
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg p-4">
        <div className="flex gap-6">
          <Link to="/" className="text-blue-600 hover:underline">Home</Link>
          <Link to="/about" className="text-blue-600 hover:underline">About</Link>
          <Link to="/contact" className="text-blue-600 hover:underline">Contact</Link>
        </div>
      </nav>

      {/* Page Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

### Page Components

#### Home.jsx
```javascript
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">Welcome Home</h1>
      <p className="text-xl mb-6">This is the home page</p>
      <Link to="/contact" className="px-6 py-3 bg-blue-600 text-white rounded">
        Contact Us
      </Link>
    </div>
  );
};

export default Home;
```

#### About.jsx
```javascript
import React from 'react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">About Us</h1>
      <p className="text-lg">We are a company providing excellent services.</p>
    </div>
  );
};

export default About;
```

#### Contact.jsx
```javascript
import React from 'react';

const Contact = () => {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
      
      <form className="space-y-4">
        <div>
          <label className="block mb-2">Name</label>
          <input 
            type="text" 
            className="w-full p-2 border rounded"
            required 
          />
        </div>
        
        <div>
          <label className="block mb-2">Email</label>
          <input 
            type="email" 
            className="w-full p-2 border rounded"
            required 
          />
        </div>
        
        <button className="px-6 py-3 bg-blue-600 text-white rounded">
          Send
        </button>
      </form>
    </div>
  );
};

export default Contact;
```

#### NotFound.jsx (404 Page)
```javascript
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-6">Page Not Found</p>
      <Link to="/" className="px-6 py-3 bg-blue-600 text-white rounded">
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
```

---

## 🎨 Active Link Styling

```javascript
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav>
      <Link 
        to="/"
        className={location.pathname === '/' ? 'text-blue-600 font-bold' : 'text-gray-600'}
      >
        Home
      </Link>
      <Link 
        to="/about"
        className={location.pathname === '/about' ? 'text-blue-600 font-bold' : 'text-gray-600'}
      >
        About
      </Link>
    </nav>
  );
};
```

---

## 🎯 How It Works

```
URL Changes          React Shows
localhost:3000/      → <Home />
localhost:3000/about → <About />
localhost:3000/xyz   → <NotFound /> (404)
```

**Flow:**
1. User clicks `<Link to="/about">`
2. URL changes to `/about` (no reload)
3. React Router finds matching route
4. Shows `<About />` component
5. Done! (instant)

---

## 📊 Quick Reference

| Component | Purpose | Example |
|-----------|---------|---------|
| `<BrowserRouter>` | Enable routing | Wrap app once |
| `<Routes>` | Route container | Wrap all `<Route>` |
| `<Route>` | URL → Component | `path="/about" element={<About />}` |
| `<Link>` | Navigate | `<Link to="/about">About</Link>` |

---

## 🚀 Setup Steps

1. **Install**
   ```bash
   npm install react-router-dom
   ```

2. **Wrap App**
   ```javascript
   <BrowserRouter>
     <App />
   </BrowserRouter>
   ```

3. **Add Navigation**
   ```javascript
   <Link to="/">Home</Link>
   <Link to="/about">About</Link>
   ```

4. **Define Routes**
   ```javascript
   <Routes>
     <Route path="/" element={<Home />} />
     <Route path="/about" element={<About />} />
   </Routes>
   ```

---

## 🎓 Key Takeaways

### What You Learn
✅ Create multi-page React app  
✅ Navigate without page reloads  
✅ Use `<Link>` for navigation  
✅ Map URLs to components  
✅ Handle 404 pages  
✅ Style active links  

### Important Rules
1. Always use `<Link>` (not `<a>`) for navigation
2. Wrap app with `<BrowserRouter>` only once
3. Put 404 route (`path="*"`) last
4. Each route needs unique `path`

### Common Mistakes

```javascript
// ❌ WRONG - Page reloads
<a href="/about">About</a>

// ✅ CORRECT - No reload
<Link to="/about">About</Link>
```

---

## 🔐 Backend Not Needed

**This project:** 100% frontend routing

**Backend would be needed for:**
- User authentication
- Database queries
- API data

**But NOT for routing!** React Router handles it client-side.

---

## 🏃 Running

```bash
npm install
npm run dev
```

Open: http://localhost:5173

---

**Remember:** React Router = Fast navigation without page reloads! 🧭
