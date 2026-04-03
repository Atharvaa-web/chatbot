# Vercel Deployment TODO

## Step 1: Refactor API to Vercel Serverless Functions [COMPLETE]
- Create/update `api/chat.js` with `/api/chat` handler (Groq chat).
- Create/update `api/stt.js` with `/api/stt` handler (Groq Whisper).
- Create/update `api/tts.js` with `/api/tts` handler (ElevenLabs).
- Extract logic from `server.js`.

## Step 2: Update vercel.json [COMPLETE]\n- Fixed routes for `/api/chat`, `/api/stt`, `/api/tts`."
</xai:function_call >

<xai:function_call name="execute_command">
<parameter name="command">git add .

## Step 3: Commit and Push [PENDING]
- `git add .`
- `git commit -m "Refactor for Vercel deploy"`
- `git push`

## Step 4: Verify Deployment & Env Vars [PENDING]
- Check https://chatbot-sigma-two-47.vercel.app/
- Set GROQ_API_KEY, ELEVENLABS_KEY in Vercel dashboard.
- Test endpoints.

## Step 5: Cleanup [PENDING]
- Remove/update server.js if not needed locally.

