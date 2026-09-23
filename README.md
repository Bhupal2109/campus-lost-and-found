# 🎓 University Lost & Found Portal

A modern web application designed for university students to report, search, and manage lost and found items on campus.

The platform makes it easier for students to find missing belongings and return found items to their rightful owners.

---

## 🚀 Live Demo

🔗 **Live Demo:** Add your deployed link here

🔗 **GitHub Repository:** https://github.com/Bhupal2109/campus-lost-and-found

---

## 📌 About The Project

The **University Lost & Found Portal** is a React-based web application created to solve a common problem on university campuses — managing lost and found belongings.

Students can:

- Report lost items
- Report found items
- Browse reported items
- Search for specific items
- Filter items by type, category, location, and status
- View detailed information about an item
- Manage their reported items through dashboards

The goal is to provide a simple and centralized platform for reconnecting lost belongings with their owners.

---

## ✨ Features

### 🏠 Home Page
- Clean and responsive landing page
- Quick access to report lost/found items
- Platform statistics
- Search functionality

### 🔎 Browse Items
- Search lost and found items
- Filter by:
  - Lost / Found
  - Category
  - Location
  - Status
- Sort items by date
- Item cards with detailed information

### 📝 Report Lost / Found Items
Users can report items with relevant details such as:
- Item name
- Category
- Description
- Location
- Date
- Additional information

### 📄 Item Details
- Detailed item information
- Item status
- Category
- Location
- Description
- Tags

### 👤 Authentication
- User registration
- User login
- User-specific access

### 📊 Dashboard
- View reported items
- Track lost and found reports
- Manage submitted items

### 🔔 Notifications
- Notification interface for important updates

### 🛠️ Admin Dashboard
- Manage reported items
- Monitor platform activity
- Manage users and reports

---

## 🛠️ Tech Stack

### Frontend
- React.js
- JavaScript
- HTML5
- CSS3

### Tools
- Vite
- Git
- GitHub
- VS Code

---

## 📂 Project Structure

```text
campus-lost-and-found/
│
├── public/
│
├── src/
│   ├── components/
│   │   └── SearchBar.jsx
│   │
│   ├── data/
│   │   └── initialData.js
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── BrowseItems.jsx
│   │   ├── ItemDetails.jsx
│   │   ├── ReportItem.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── AdminDashboard.jsx
│   │   └── ...
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
