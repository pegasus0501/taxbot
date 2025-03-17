## **Tax Query Assistant**
A web-based AI-powered assistant designed for auditors to handle **tax-related queries**. This system ensures that only tax-specific questions are answered using **GPT-4**, with all responses stored securely in **MongoDB** for auditing.

---

### **🚀 Features**
- ✅ **AI-powered Tax Assistance:** Uses OpenAI's GPT-4 to provide responses to tax-related queries.  
- ✅ **Strict Tax Query Filtering:** Rejects non-tax-related questions to maintain focus.  
- ✅ **Database Storage:** Saves user queries and AI responses in MongoDB for audit tracking.  
- ✅ **Modern Web UI:** React frontend with a simple chat-like interface.  
- ✅ **Secure API:** Express.js backend with environment variables for sensitive configurations.  

---

### **🛠️ Tech Stack**
- **Frontend:** React.js  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (via Mongoose ORM)  
- **AI Integration:** OpenAI GPT-4 API  
- **Hosting:** Can be deployed on Vercel (frontend) & Heroku/AWS (backend)  

---

### **🛠️ Setup Instructions**
#### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/your-username/deloitte-audit-chat.git
cd deloitte-audit-chat
```

#### **2️⃣ Install Backend Dependencies**
```sh
cd backend
npm install
```

#### **3️⃣ Install Frontend Dependencies**
```sh
cd ../frontend
npm install
```

#### **4️⃣ Configure Environment Variables**
Create a `.env` file in the `backend` directory:
```sh
cd ../backend
touch .env
```
Add the following details:
```
MONGO_URI=your-mongodb-connection-string
OPENAI_API_KEY=your-openai-api-key
PORT=5001
```

#### **5️⃣ Start the Backend**
```sh
node server.js
```
or, for automatic restarts during development:
```sh
npm install -g nodemon
nodemon server.js
```

#### **6️⃣ Start the Frontend**
```sh
cd ../frontend
npm start
```

#### **7️⃣ Test the API**
- Open Postman or a browser and test:
  ```
  http://localhost:5001/api/prompt
  ```
- Send a **POST request** with a valid tax-related query.

---

### **🛡️ Security Best Practices**
- **Never expose `.env` files in GitHub.** Always add it to `.gitignore`.  
- **Rotate API keys** regularly for security.  
- **Use JWT authentication** if expanding access control.  

---

### **📌 Future Enhancements**
- 🔹 Add **user authentication** for Deloitte auditors.  
- 🔹 Deploy the backend using **Docker** for better scalability.  
- 🔹 Implement **role-based access** for different types of users.  


---

Feel free to modify and add more sections based on your needs! 🚀
