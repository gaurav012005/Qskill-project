# Random String Generator - React Hooks Project

Demo:

<video controls src="https://github.com/gaurav012005/Qskill-project/blob/main/TaskFocus/20260204-1702-16.1811420.mp4?raw=true" width="100%"></video>

[🎥 Click here to watch/download the Demo Video if it doesn't load above](https://github.com/gaurav012005/Qskill-project/blob/main/TaskFocus/20260204-1702-16.1811420.mp4?raw=true)

## 📋 Project Overview

A React app that generates random strings with customizable options using **useState**, **useCallback**, and **useEffect** hooks.

**Features:** Random generation · Custom length · Character options · Copy to clipboard · History

---

## 🔌 Why Backend? (Optional)

**Simple Answer:** Backend is **NOT required** for basic functionality.

```
✅ Frontend Only: Works perfectly for random string generation
✅ With Backend: Adds history storage and multi-device sync
```

**Use Backend If You Want:**
- 💾 Save generated strings to database
- 📊 Track usage across devices
- 👥 User accounts and history
- 🔐 Server-side secure generation

**Skip Backend If:**
- Learning React Hooks only
- Personal use
- No need to save history

---

## 🎣 React Hooks Usage

### 1. useState - Store Data

**Purpose:** Remember values that change

```javascript
const [password, setPassword] = useState('');           // Generated string
const [length, setLength] = useState(12);               // String length
const [includeNumbers, setIncludeNumbers] = useState(true);  // Options
```

**Why?** React rerenders UI when state changes.

### 2. useCallback - Optimize Functions

**Purpose:** Prevent function recreation on every render

```javascript
const generatePassword = useCallback(() => {
  // Build character set
  let charset = 'abcdefghijklmnopqrstuvwxyz';
  if (includeNumbers) charset += '0123456789';
  if (includeSymbols) charset += '!@#$%^&*';
  
  // Generate random string
  let result = '';
  for (let i = 0; i < length; i++) {
    result += charset[Math.floor(Math.random() * charset.length)];
  }
  
  setPassword(result);
}, [length, includeNumbers, includeSymbols]);
//  ↑ Only recreate when these change
```

**Why?** Better performance, especially when passing to child components.

### 3. useEffect - Handle Side Effects

**Purpose:** Run code at specific times (mount, update, unmount)

```javascript
// Generate on first load
useEffect(() => {
  generatePassword();
}, []); // Empty array = run once on mount

// Save to history when password changes
useEffect(() => {
  if (password) {
    setHistory(prev => [...prev, password]);
  }
}, [password]); // Run when password changes

// Auto-regenerate when options change
useEffect(() => {
  generatePassword();
}, [generatePassword]); // Run when function changes
```

**Why?** Handle API calls, timers, subscriptions, and data syncing.

---

## 💻 Complete Implementation

```javascript
// src/components/PasswordGenerator.jsx
import React, { useState, useCallback, useEffect } from 'react';

const PasswordGenerator = () => {
  // STATE
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [copied, setCopied] = useState(false);

  // GENERATE FUNCTION (useCallback)
  const generatePassword = useCallback(() => {
    let charset = '';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=';
    
    if (!charset) charset = 'abcdefghijklmnopqrstuvwxyz';

    let result = '';
    for (let i = 0; i < length; i++) {
      result += charset[Math.floor(Math.random() * charset.length)];
    }
    
    setPassword(result);
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  // COPY FUNCTION (useCallback)
  const copyToClipboard = useCallback(async () => {
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [password]);

  // GENERATE ON MOUNT (useEffect)
  useEffect(() => {
    generatePassword();
  }, []);

  // AUTO-REGENERATE WHEN OPTIONS CHANGE (useEffect)
  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
        
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          🔐 Random String Generator
        </h1>

        {/* Display Generated String */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">Generated String</label>
          <div className="flex gap-2">
            <input
              value={password}
              readOnly
              className="flex-1 p-4 border-2 rounded-xl bg-gray-50 font-mono text-lg"
            />
            <button
              onClick={copyToClipboard}
              className="px-6 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
            >
              {copied ? '✓ Copied' : '📋 Copy'}
            </button>
          </div>
        </div>

        {/* Length Slider */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">
            Length: {length}
          </label>
          <input
            type="range"
            min="4"
            max="32"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Options */}
        <div className="mb-6 space-y-3">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
              className="w-5 h-5"
            />
            <span>Include Uppercase (A-Z)</span>
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
              className="w-5 h-5"
            />
            <span>Include Lowercase (a-z)</span>
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              className="w-5 h-5"
            />
            <span>Include Numbers (0-9)</span>
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              className="w-5 h-5"
            />
            <span>Include Symbols (!@#$)</span>
          </label>
        </div>

        {/* Generate Button */}
        <button
          onClick={generatePassword}
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 
                   text-white py-4 rounded-xl font-semibold text-lg
                   hover:from-purple-600 hover:to-blue-600"
        >
          🎲 Generate New String
        </button>
      </div>
    </div>
  );
};

export default PasswordGenerator;
```

---

## 🔧 Random String Logic

### Algorithm Breakdown

```javascript
// STEP 1: Build character pool based on options
let charset = '';
if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
if (includeNumbers) charset += '0123456789';
if (includeSymbols) charset += '!@#$%^&*';

// Result: charset = 'ABCabc123!@#'

// STEP 2: Pick random characters
let result = '';
for (let i = 0; i < length; i++) {
  const randomIndex = Math.floor(Math.random() * charset.length);
  result += charset[randomIndex];
}

// Example:
// Math.random() → 0.73 (random 0-1)
// 0.73 * 10 → 7.3 (multiply by charset length)
// Math.floor(7.3) → 7
// charset[7] → 'a'
```

### How It Works

1. **Create Pool:** Combine selected character types
2. **Random Pick:** Use `Math.random()` to pick index
3. **Build String:** Repeat for desired length

**Example:** `'aB3!xZ9@'` (8 characters)

---

## 📊 Hook Dependency Rules

### When Effects Run

```javascript
useEffect(() => {}, []);           // Once on mount
useEffect(() => {});               // Every render
useEffect(() => {}, [password]);   // When password changes
useEffect(() => {}, [a, b, c]);    // When any dependency changes
```

### Common Patterns

```javascript
// ✅ CORRECT
useEffect(() => {
  console.log(password);
}, [password]); // Include all variables used inside

// ❌ WRONG
useEffect(() => {
  console.log(password);
}, []); // Missing dependency!
```

---

## 🎯 When to Use Each Hook

| Hook | Use For | Example |
|------|---------|---------|
| **useState** | Data that changes | Form inputs, toggles, counters |
| **useCallback** | Optimize functions | Event handlers, passed to children |
| **useEffect** | Side effects | API calls, timers, subscriptions |

---

## 🔐 Backend Integration (Optional)

### Save to Backend

```javascript
// Save generated password
const savePassword = async () => {
  await fetch('/api/passwords', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password, length })
  });
};

// Load history
useEffect(() => {
  fetch('/api/passwords/history')
    .then(res => res.json())
    .then(data => setHistory(data));
}, []);
```

### Backend Routes

```javascript
// backend/routes/passwords.js
app.post('/api/passwords', (req, res) => {
  const { password, length } = req.body;
  db.query('INSERT INTO passwords (value, length) VALUES (?, ?)', 
    [password, length]);
  res.json({ success: true });
});

app.get('/api/passwords/history', (req, res) => {
  db.query('SELECT * FROM passwords ORDER BY created_at DESC LIMIT 50', 
    (err, results) => res.json(results));
});
```

---

## 🎓 Key Takeaways

### Hook Rules
1. ✅ Call at top level (not in loops/conditions)
2. ✅ Only in React components
3. ✅ Include all dependencies in arrays

### This Project Teaches
- ✅ useState for state management
- ✅ useCallback for performance
- ✅ useEffect for side effects
- ✅ Random generation algorithm
- ✅ Form handling in React
- ✅ Optional backend integration

### Performance Tips
- Use `useCallback` for functions passed as props
- Include correct dependencies in `useEffect`
- Memoize expensive computations with `useMemo`

---

## 🚀 Quick Start

```bash
# Frontend
npm install
npm run dev

# Backend (optional)
cd backend
npm install
npm start
```

---

**Remember:** This project works perfectly **without backend**. Add backend only if you need history storage! 🎣
