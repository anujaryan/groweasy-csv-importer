# 🤖 AI CSV Importer

An AI-powered CSV Importer built using **Next.js, Express.js, TypeScript, and Google Gemini AI**. The application intelligently maps CSV data into the GrowEasy CRM schema without requiring manual column mapping.

---

## 📌 Project Overview

AI CSV Importer is a full-stack web application that allows users to upload CSV files containing lead or customer data and automatically convert them into a standardized CRM format using **Google Gemini AI**.

Unlike traditional CSV import tools that require predefined column names, this application uses AI to understand different CSV structures and map them intelligently.

---

## ✨ Features

### 📂 CSV Upload
- Drag & Drop CSV upload
- Click to upload
- CSV file validation

### 👀 CSV Preview
- Displays uploaded CSV headers
- Shows first 20 records
- Displays total number of records

### 🤖 AI-Powered Mapping
Google Gemini AI automatically maps CSV columns to the CRM schema.

Supported fields include:

- Name
- Email
- Phone Number
- Company
- City
- State
- Country
- Lead Owner
- CRM Status
- CRM Notes
- Data Source

### 📊 Import Summary

Displays:

- Total Records
- Successfully Imported
- Failed Records

### 📋 CRM Data Table

Displays transformed CRM records in a responsive table.

### 📥 Export JSON

Download transformed CRM records as a JSON file.

### 🎨 Modern User Interface

- Responsive Design
- Dark Theme
- Beautiful Dashboard
- Summary Cards
- Responsive Tables
- Smooth Hover Animations

---

# 🏗️ Tech Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Axios
- React Dropzone

## Backend

- Node.js
- Express.js
- TypeScript
- Multer
- CSV Parser
- dotenv
- CORS

## Artificial Intelligence

- Google Gemini AI
- Gemini Flash Model

---

# 📁 Project Structure

```
groweasy-csv-importer
│
├── backend
│   ├── src
│   │   ├── ai
│   │   │   ├── gemini.ts
│   │   │   └── prompt.ts
│   │   │
│   │   ├── controllers
│   │   │   └── upload.controller.ts
│   │   │
│   │   ├── parser
│   │   │   └── csvParser.ts
│   │   │
│   │   ├── routes
│   │   │   └── upload.routes.ts
│   │   │
│   │   ├── services
│   │   │   └── ai.service.ts
│   │   │
│   │   ├── app.ts
│   │   │
│   │   └── server.ts
│   │
│   └── package.json
│
├── frontend
│   ├── src
│   │   ├── app
│   │   ├── components
│   │   └── services
│   │
│   └── package.json
│
└── README.md
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/anujaryan/groweasy-csv-importer.git
```

```bash
cd groweasy-csv-importer
```

---

# Backend Setup

```bash
cd backend
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
PORT=5000
```

Run backend

```bash
npm run dev
```

Backend runs at

```
http://localhost:5000
```

---

# Frontend Setup

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Run frontend

```bash
npm run dev
```

Frontend runs at

```
http://localhost:3000
```

---

# 🔌 API Endpoints

## Preview CSV

### POST

```
/api/upload/preview
```

### Body

```
form-data

file : CSV File
```

### Response

```json
{
  "success": true,
  "headers": [],
  "totalRows": 50,
  "preview": []
}
```

---

## Import CSV

### POST

```
/api/upload/import
```

### Body

```
form-data

file : CSV File
```

### Response

```json
{
  "success": true,
  "totalRecords": 50,
  "imported": []
}
```

---

# 🤖 AI Mapping Rules

The AI converts uploaded CSV data into the following CRM schema.

```
created_at
name
email
country_code
mobile_without_country_code
company
city
state
country
lead_owner
crm_status
crm_note
data_source
possession_time
description
```

### Rules

- Detect columns intelligently
- Skip records without email and phone
- Extract first email
- Extract first phone
- Store additional contact information inside `crm_note`
- Return valid JSON

---

# 🔄 Application Workflow

```
Upload CSV
      │
      ▼
CSV Parsing
      │
      ▼
Preview CSV
      │
      ▼
Import with AI
      │
      ▼
Gemini AI Mapping
      │
      ▼
CRM JSON
      │
      ▼
Import Summary
      │
      ▼
Download JSON
```

---

# ⚠️ Error Handling

The application handles:

- Missing file uploads
- Empty CSV files
- Invalid CSV format
- AI API errors
- Network failures
- JSON parsing errors
- Backend exceptions

---

# 🔐 Environment Variables

Backend `.env`

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
PORT=5000
```

---

# 📈 Future Enhancements

- MongoDB Integration
- User Authentication
- Import History
- Duplicate Detection
- AI Confidence Score
- Export to Excel
- Dashboard Analytics
- Background Processing
- Docker Support
- Unit Testing
- CI/CD Pipeline

---

# 💡 Why This Project?

Traditional CSV import systems require users to manually map columns before importing data. This project eliminates that manual effort by using Google Gemini AI to automatically understand CSV structures and convert them into the required CRM format, making the import process faster, more flexible, and less error-prone.

---

# 👨‍💻 Author

**Anuj Kumar**

- Full Stack Developer
- AI & Machine Learning Enthusiast
- B.Tech Student

GitHub: https://github.com/anujaryan

---

# 📄 License

This project was developed as part of the **GrowEasy AI CSV Importer Assignment** and is intended for educational and portfolio purposes.
