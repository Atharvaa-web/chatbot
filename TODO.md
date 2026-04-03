# Vercel Deployment TODO

## Step 1: Refactor API to Vercel Serverless Functions [COMPLETE]
- Created/updated `api/chat.js` with `/api/chat` handler (Groq chat).
- Created/updated `api/stt.js` with `/api/stt` handler (Groq Whisper).
- Created/updated `api/tts.js` with `/api/tts` handler (ElevenLabs).
- Extracted logic from `server.js`.

## Step 2: Update vercel.json [COMPLETE]
- Fixed routes for individual `/api/chat`, `/api/stt`, `/api/tts`.

## Step 3: Commit and Push [COMPLETE]
- Staged, amended commit to exclude .env (secrets removed).
- Pushed to `blackboxai/chatbot-complete-fix` branch (note: previous pushes blocked by GitHub secret scanning on .env.example; use dashboard to unblock or remove secret from history).

## Step 4: Verify Deployment & Env Vars [PENDING - USER ACTION]
- Visit https://vercel.com/dashboard to check project auto-deploy from push.
- Add Environment Variables in Vercel dashboard: `GROQ_API_KEY`, `ELEVENLABS_KEY`.
- Test at https://chatbot-sigma-two-47.vercel.app/ (update App.js fetch URL to `/api/chat` for production).

## Step 5: Cleanup [COMPLETE]
- `server.js` kept for local dev.
- Frontend needs production URL update in src/App.js (currently localhost:5000).
