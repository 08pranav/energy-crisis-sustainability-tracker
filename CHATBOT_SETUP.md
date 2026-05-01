# AI Chatbot Integration Setup Guide

## Overview
An AI-powered chatbot has been integrated into the Energy Crisis Sustainability Tracker. The chatbot uses the Groq API to answer questions related only to energy, sustainability, renewable energy, and the application itself.

## Features
- Real-time AI responses powered by Groq's Mixtral-8x7b-32768 model
- Context-aware filtering to only answer project-related questions
- Glass-morphism UI matching the application's design language
- Suggested questions for first-time users
- Message timestamps and loading states
- Responsive design for all screen sizes

## Backend Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

The following package was added:
- `groq-sdk` - ^0.4.0: JavaScript SDK for Groq API

### 2. Environment Variables
Add to `backend/.env`:
```
GROQ_API_KEY=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
```

### 3. Start the Backend
```bash
npm run dev
```

The chatbot API endpoints are now available at:
- `POST /api/chatbot/ask` - Send a question and receive an answer
- `GET /api/chatbot/suggestions` - Get suggested questions

## Frontend Setup

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Configuration (Optional)
If your backend is running on a different port, set `VITE_API_URL` environment variable:
```
VITE_API_URL=http://localhost:YOUR_PORT
```

### 3. Start the Frontend
```bash
npm run dev
```

## Usage

### Accessing the Chatbot
1. Start both backend and frontend servers
2. Navigate to `/chatbot` route or click the **CHATBOT** link in the navbar
3. The chatbot appears as a new section in the bottom navigation bar with a message circle icon

### Interacting with the Chatbot
1. **Type a question** - Enter any question related to energy, sustainability, or the application
2. **Press Enter or click Send** - Your message will be sent to the AI
3. **Get a response** - The AI will respond with relevant information
4. **Use suggestions** - Click on suggested questions to get started

### Allowed Topics
The chatbot will only answer questions about:
- Energy prices and markets
- Renewable energy sources (solar, wind, hydro, etc.)
- Energy supply chains and infrastructure
- Energy crisis forecasting and alerts
- Sustainability and climate topics
- How to use this application and its features

### Off-Topic Handling
If you ask about topics unrelated to energy or the application, the chatbot will politely decline and redirect you back to supported topics.

## API Response Format

### Ask Endpoint
**Request:**
```json
POST /api/chatbot/ask
{
  "message": "What are renewable energy sources?"
}
```

**Response (Success):**
```json
{
  "reply": "Renewable energy sources include solar, wind, hydroelectric, geothermal, and biomass energy. These sources are sustainable and help reduce carbon emissions..."
}
```

**Response (Off-Topic):**
```json
{
  "reply": "This project focuses on energy crisis tracking and sustainability. I can only answer questions related to energy, sustainability, renewable energy, or how to use the Energy Crisis Sustainability Tracker application. Could you please ask a question related to these topics?"
}
```

**Response (Error):**
```json
{
  "error": "An error occurred while processing your question. Please try again."
}
```

## Design Language Integration

The chatbot follows the application's modern design system:

### Color Scheme
- **Primary**: Cyan/Turquoise (#00bcd4 family)
- **Accent**: Electric Amber
- **Background**: Deep dark (rgb(0, 0, 0))
- **Text**: Light slate/white

### Components Used
- Glass-morphism cards with backdrop blur
- Lucide React icons (MessageCircle for chatbot)
- Smooth animations and transitions
- Monospace font for technical elements
- Cyan glows and borders for interactive elements

### Responsive Layout
- Mobile-optimized for small screens
- Tablet layout with adjusted grid
- Desktop layout with full interface
- Fixed navbar integration

## Customization

### Modify the System Prompt
Edit `backend/src/routes/chatbot.routes.js` - update the `PROJECT_CONTEXT` variable to change how the chatbot responds.

### Change the AI Model
In `backend/src/routes/chatbot.routes.js`, modify the `model` parameter in the Groq API call:
```javascript
model: 'mixtral-8x7b-32768' // Change this to another Groq-supported model
```

### Adjust Keyword Filtering
Modify the `relevantKeywords` array in `chatbot.routes.js` to add or remove keywords that trigger topic relevance detection.

## Troubleshooting

### Chatbot Returns "Error" Messages
1. **Check Groq API Key**: Verify the `GROQ_API_KEY` in `.env`
2. **Check API Rate Limits**: Groq has rate limits - wait a moment before retrying
3. **Backend Running**: Ensure the backend server is running on the correct port
4. **CORS Issues**: Verify that the frontend URL is in the allowed CORS origins

### No Suggestions Showing
1. Reload the page
2. Clear browser cache
3. Check console for fetch errors

### Slow Responses
1. This could be due to Groq API latency
2. Check your internet connection
3. Consider using a faster model if available

## File Changes Made

### Backend
- `backend/package.json` - Added groq-sdk dependency
- `backend/src/routes/chatbot.routes.js` - New file with chatbot API routes
- `backend/src/routes/index.js` - Added chatbot routes import
- `backend/.env` - Added GROQ_API_KEY

### Frontend
- `frontend/src/pages/Chatbot.tsx` - New chatbot page component
- `frontend/src/App.tsx` - Added Chatbot route
- `frontend/src/components/ui/Navbar.tsx` - Added CHATBOT link to navigation

## Next Steps (Optional Enhancements)

1. **Conversation History** - Persist chat history to a database
2. **User Authentication** - Link chats to specific users
3. **Analytics** - Track popular questions
4. **Fine-tuning** - Create a custom Groq model trained on energy data
5. **Export Conversations** - Allow users to download chat history
6. **Multi-language Support** - Add language detection and translation
7. **Voice Input** - Add speech-to-text capabilities
8. **Follow-up Questions** - Add ability to refine previous answers

## Security Considerations

1. **API Key Protection**: The Groq API key is stored server-side only
2. **Input Validation**: All user input is validated on the backend
3. **Rate Limiting**: Consider implementing rate limiting on the `/api/chatbot/ask` endpoint
4. **Prompt Injection**: The system prompt is hardcoded and not user-modifiable

## Support

For issues or questions about the chatbot integration, refer to:
- [Groq Documentation](https://console.groq.com/docs)
- [Express.js Documentation](https://expressjs.com)
- [React Documentation](https://react.dev)
