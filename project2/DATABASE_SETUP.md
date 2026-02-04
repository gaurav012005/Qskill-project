# Quick MySQL Database Setup

## Option 1: Use MySQL Workbench (Easiest - Recommended)

1. **Open MySQL Workbench**
2. **Connect to your local MySQL server**
   - Click on your local connection (usually "Local instance MySQL80")
   - Enter your MySQL password if prompted
   
3. **Create Database**:
   - Click "Create a new schema" button (cylinder icon)
   - Name: `task_focus_manager`
   - Click "Apply" → "Apply" → "Finish"

4. **Run Schema SQL**:
   - File → Open SQL Script
   - Navigate to: `c:\6 sem\intership\Qskill\project 2\server\database\schema.sql`
   - Click the lightning bolt ⚡ to execute
   - You should see tables created successfully

5. **Update .env file**:
   - Open `server\.env`
   - If your MySQL has a password, set it:
     ```
     DB_PASSWORD=your_mysql_root_password
     ```
   - If NO password (default XAMPP/WAMP), leave it empty:
     ```
     DB_PASSWORD=
     ```

6. **Restart Backend**:
   - Stop the server (Ctrl+C in terminal)
   - Run: `npm run dev`
   - Should see: ✅ Database connected successfully

---

## Option 2: Command Line (If MySQL is in PATH)

```bash
# Login to MySQL
mysql -u root -p

# Enter your password, then run:
SOURCE c:/6 sem/intership/Qskill/project 2/server/database/schema.sql

# Exit MySQL
exit
```

---

## Option 3: Using XAMPP/WAMP Control Panel

1. **Start MySQL** from XAMPP/WAMP control panel
2. **Open phpMyAdmin** (usually http://localhost/phpmyadmin)
3. **Create Database**:
   - Click "New" in left sidebar
   - Database name: `task_focus_manager`
   - Click "Create"
4. **Import Schema**:
   - Click on `task_focus_manager` database
   - Click "Import" tab
   - Choose file: `server/database/schema.sql`
   - Click "Go"

---

## Verify Connection

After setup, your backend terminal should show:
```
✅ Database connected successfully
🚀 Server running on http://localhost:5000
```

If you still see errors, check:
- MySQL service is running
- Username is `root`  
- Password in `.env` matches your MySQL password
- Database `task_focus_manager` exists

---

## Common MySQL Passwords

- **XAMPP**: No password (leave empty)
- **WAMP**: No password or `root`
- **MySQL Installer**: Password you set during installation
- **Homebrew**: Usually no password

---

## Test Database Connection

Once connected, test the API:
```bash
curl http://localhost:5000/api/health
```

Should return: `{"status":"OK","message":"Server is running"}`
