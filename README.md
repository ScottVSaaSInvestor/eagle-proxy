# Eagle Vision v6 - Vercel Proxy

Anthropic API proxy for Eagle Vision v6 pipeline.

## Structure

```
eagle-proxy/
├── api/
│   └── v1/
│       └── messages.js    # Serverless function
├── vercel.json            # Vercel configuration
└── README.md              # This file
```

## Deployment Instructions

### 1. Add files to your GitHub repo

Add these files to `ScottVSaaSInvestor/eagle-proxy`:

- `api/v1/messages.js` - The serverless function
- `vercel.json` - Vercel configuration (optional but recommended)

### 2. File structure in GitHub

Your repo should look like:
```
eagle-proxy/
├── api/
│   └── v1/
│       └── messages.js
└── vercel.json
```

### 3. Push to GitHub

```bash
git add .
git commit -m "Add Anthropic API proxy serverless function"
git push origin main
```

### 4. Vercel auto-deploys

Vercel is already connected to your GitHub repo, so it will automatically:
- Detect the new files
- Build the serverless function
- Deploy to production
- Make it available at: `https://project-gfln8.vercel.app/v1/messages`

### 5. Verify deployment

After deployment completes (~30-60 seconds):
1. Go to Vercel dashboard → Functions tab
2. You should see: `api/v1/messages.js` listed
3. Test the endpoint is live (it will return 405 for GET, which is correct)

## How it works

1. Eagle Vision HTML sends POST request to: `https://project-gfln8.vercel.app/v1/messages`
2. Serverless function extracts API key from `x-api-key` header
3. Proxies request to Anthropic API
4. Returns response back to browser
5. Handles CORS properly so browser can make cross-origin requests

## Security

- API keys are sent in headers, not stored on server
- CORS configured to allow browser requests
- Function validates API key format before proxying
- No API key logging or persistence

## Current Deployment

- Project: `project-gfln8`
- Production URL: `https://project-gfln8.vercel.app`
- Endpoint: `/v1/messages`
- Status: **Needs files deployed** (currently empty)
