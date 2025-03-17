require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB Connection Error:", err));

// Define Schema
const TaxQuerySchema = new mongoose.Schema({
    prompt: String,
    response: String,
    createdAt: { type: Date, default: Date.now }
});
const TaxQuery = mongoose.model('TaxQuery', TaxQuerySchema);

// List of Allowed Tax-Related Keywords
const taxKeywords = [
    "tax", "irs", "deduction", "exemption", "filing", "income tax", "corporate tax",
    "capital gains", "federal tax", "state tax", "property tax", "sales tax", 
    "tax credits", "tax refund", "tax bracket", "tax return", "tax compliance",
    "tax penalty", "business tax", "self-employment tax", "1040", "1099", "W-2"
];

// Function to Check if Query is Tax Related
const isTaxRelated = (prompt) => {
    return taxKeywords.some(keyword => prompt.toLowerCase().includes(keyword));
};

// OpenAI API Call for Tax Queries Only
app.post('/api/prompt', async (req, res) => {
    const { prompt } = req.body;

    // Check if Query is Tax-Related
    if (!isTaxRelated(prompt)) {
        return res.status(400).json({ error: "Only tax-related questions are allowed. Please rephrase your query." });
    }

    try {
        const openaiResponse = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-4",
                messages: [
                    { role: "system", content: "You are a tax expert. Only answer US tax-related queries." },
                    { role: "user", content: prompt }
                ]
            },
            { headers: { "Authorization": `Bearer ${process.env.OPENAI_API_KEY}` } }
        );

        const gptResponse = openaiResponse.data.choices[0].message.content;
        
        // Save Query & Response in Database
        const query = new TaxQuery({ prompt, response: gptResponse });
        await query.save();

        res.json({ response: gptResponse });

    } catch (error) {
        console.error("OpenAI API Error:", error);
        res.status(500).json({ error: "Error fetching response from OpenAI. Please try again later." });
    }
});

// Retrieve Past Responses
app.get('/api/responses', async (req, res) => {
    try {
        const responses = await TaxQuery.find().sort({ createdAt: -1 });
        res.json(responses);
    } catch (error) {
        console.error("Database Fetch Error:", error);
        res.status(500).json({ error: "Error fetching responses from database." });
    }
});

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
