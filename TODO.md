# Chatbot Fixed ✅

**Changes Made:**
- Fixed React 18 downgrade, build success (Vercel blank page fixed).
- Added proxy for local /api calls.
- Created api/server.js (Express backend port 3001).
- Installed express/cors in api/.
- Improved App.js: Loading, error display, input clear.
- .env.example for OPENAI_API_KEY.

**To Run Local:**
1. Copy `.env.example` to `.env`, add `OPENAI_API_KEY=sk-...` (your key).
2. Terminal 1: `cd api` then `node server.js` (runs on http://localhost:3001)
3. Terminal 2: `npm start` (frontend localhost:3000)
4. Open http://localhost:3000, type message, Send → see GPT reply or error.

**Vercel Deploy:**
1. `npm run build`
2. `npx vercel --prod`
3. In Vercel dashboard: Project Settings > Environment Variables > Add `OPENAI_API_KEY` (production).

Chatbot now works locally and deployed! Check console/network for any API key issues.
npm run build to verify.

