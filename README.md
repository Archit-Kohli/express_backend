# Meeting Notes Generator

This project provides an API to summarize unprocessed meeting notes using Google Gemini AI, returning a structured summary, key decisions, and action items in JSON format.

---

## 🚀 Running Locally

### 1. **Clone the Repository**
```sh
git clone https://github.com/Archit-Kohli/express_backend.git
```

### 2. **Install Dependencies**
```sh
npm install
```

### 3. **Set Up Environment Variables**

Create a `.env` file in the root directory and add your Gemini API key:
```
GEMINI_API_KEY=your_google_gemini_api_key_here
```

### 4. **Start the Server**
```sh
npm start
```
The server will run on [http://localhost:3000](http://localhost:3000) by default.

---

## 🛠️ API Endpoint

### **POST** `/process-meeting`

- **Description:** Processes raw meeting notes and returns a structured summary.
- **Content-Type:** `text/plain`
- **Body:** Raw meeting notes as plain text.

#### **Sample Request Body**
```
Team Sync – May 26

- We’ll launch the new product on June 10.
- Ravi to prepare onboarding docs by June 5.
- Priya will follow up with logistics team on packaging delay.
- Beta users requested a mobile-first dashboard.
```

#### **Sample Response**
```json
{
    "summary": "The team plans to launch the new product on June 10. Key tasks include Ravi preparing onboarding documents and Priya following up on packaging delays, while considering beta user feedback for a mobile-first dashboard.",
    "decisions": [
        "New product launch date set for June 10."
    ],
    "actionItems": [
        {
            "task": "Prepare onboarding docs.",
            "owner": "Ravi",
            "due": "June 5"
        },
        {
            "task": "Follow up with logistics team on packaging delay.",
            "owner": "Priya"
        },
        {
            "task": "Consider developing a mobile-first dashboard based on beta user feedback."
        }
    ]
}
```

---

## 🧪 Testing the API

### Using **Postman**

1. Open Postman and create a new `POST` request to:
   ```
   http://localhost:3000/process-meeting
   ```
2. Set the **Body** to `raw` and select `Text` as the type.
3. Paste your meeting notes into the body.
4. Click **Send**.

### Using **curl**

```sh
curl --location 'http://localhost:3000/process-meeting' \
--header 'Content-Type: text/plain' \
--data 'Team Sync – May 26

- We’ll launch the new product on June 10.
- Ravi to prepare onboarding docs by June 5.
- Priya will follow up with logistics team on packaging delay.
- Beta users requested a mobile-first dashboard.
'
```

---

## ⚠️ Error Handling

- **400 Bad Request:** Missing or invalid meeting notes input.
- **401 Unauthorized:** Invalid or missing API key.
- **504 Gateway Timeout:** AI service timeout.
- **500 Internal Server Error:** Other errors.

---
