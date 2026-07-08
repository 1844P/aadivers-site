# Action Adventure Divers — Launch Notes

## Site Structure
```
aadivers-site/
├── index.html          # Main site (single-page)
├── css/
│   └── style.css       # All styles
├── js/
│   └── main.js         # Interactivity, form handling, animations
├── images/             # Put your original photos here
├── serve.ps1           # Run locally: PowerShell script
├── package.json        # (optional Node metadata)
└── LAUNCH-NOTES.md     # This file
```

## Local Testing
Run this from the `aadivers-site/` directory:
```
.\serve.ps1
```
Or manually:
```
python -m http.server 8000
```
Then open **http://localhost:8000** in your browser.

## Before Launch Checklist

### 1. Replace Placeholder Images
Open `index.html` and replace these placeholder divs with your own photos:
- **Hero background** — a stunning wide shot of Soufrière Bay or a diver underwater
- **Welcome section** — photo of divers, Chester, or the beachfront shop
- **Gallery section** (7 slots) — your best original underwater photos
  - First slot is wide (2x2 grid), good for a hero underwater shot
  - The rest are standard squares — coral close-ups, turtle shots, wreck details, etc.

**Note from the framework:** Do NOT use stock photography. Every image must be original and place-specific.

### 2. Set Up Form Submissions
The booking form currently falls back to a `mailto:` link when submitted. For production:

**Option A: Formspree (easiest, free)**
1. Go to https://formspree.io
2. Sign up and create a new form
3. Copy your form ID
4. In `index.html`, update the form action:
   ```html
   <form class="contact-form" id="bookingForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
5. In `js/main.js`, replace `'https://formspree.io/f/your-form-id'` with your actual Formspree URL

**Option B: Simple Node.js backend**
1. Install dependencies: `npm install express nodemailer`
2. Create a `server.js` that handles POST to `/api/booking` and sends email via SMTP
3. Update the form JS to POST to your server endpoint

### 3. Replace Google Maps Embed
The map embed uses approximate coordinates. Get the exact pin for "Hummingbird Beach Resort, Soufrière" and generate a new embed code from Google Maps:
1. Go to https://maps.google.com
2. Search for "Hummingbird Beach Resort, Soufrière"
3. Click "Share" → "Embed a map"
4. Replace the iframe `src` in `index.html` (the map section at the bottom)

### 4. Update Social Media Links
In `index.html`, update these placeholder links:
- Facebook: `https://www.facebook.com/YOUR_PAGE`
- Instagram: `https://www.instagram.com/YOUR_HANDLE`
- WhatsApp: Already set to +1 (758) 485-1317

### 5. Launch Options

**Option A: Netlify (recommended — free, easy)**
1. Push to GitHub (or drag folder to Netlify)
2. Netlify auto-deploys — no server config needed
3. Custom domain: point `aadivers.net` DNS to Netlify

**Option B: Vercel**
1. `npm i -g vercel && vercel`
2. Deploys from CLI, auto-HTTPS

**Option C: Traditional hosting**
1. Upload all files to your web host's `public_html/` directory
2. No server-side processing needed for static content

**Option D: Keep existing aadivers.net (Builder.io site)**
If the current site is on Builder.io, you can rebuild it there using this code as the design reference.

## Domain
Current domain: **aadivers.net**
- Keep it pointed to wherever you host
- Ensure HTTPS is enabled (free via Let's Encrypt on most hosts)

## Design Notes (from the framework document)
- **Sans-serif** (Inter) for operational/logistical content
- **Serif** (Playfair Display) for narrative passages and headings
- **Color palette** drawn from St. Lucia's waters — deep blues, coral warm tones, sand
- **Generous white space** signals confidence
- **No stock photography** — every photo must be original and place-specific
- **Mobile-first** — divers access from phones on boats in sunlight

## Key Business Info Used in This Site
| Field | Value |
|-------|-------|
| Business | Action Adventure Divers |
| Founded | 2002 |
| Owners | Chester & Cuthbert Nathaniel |
| Location | Hummingbird Beach, Soufrière, St. Lucia |
| Phone | +1 (758) 485-1317 / +1 (758) 459-5599 |
| Email | info@aadivers.net |
| Website | https://aadivers.net |
| Dive Times | 8:15 AM / 5:45 PM |
| Closed | Saturdays (day of rest) |
| Captain | Chili |
| PADI | Certified Dive Center |

## Pricing (as researched — confirm with Chester)
- Single Tank: $95
- Two-Tank: $145
- Night Dive: $115
- Discover Scuba: $170
- Open Water Course: $595
- Advanced Open Water: $495
- Nitrox fills: $15/tank

## Sites Covered
| Site | Level | Type |
|------|-------|------|
| Superman's Flight | Intermediate | Drift |
| Malgretoute | Beginner | Wall |
| The Pinnacles | Advanced | Pinnacle |
| Fairlyland | Beginner | Reef |
| Chester's Fave | Intermediate | Wall/Drift |
| Chili's Fave | Advanced | Drift/Wall |
