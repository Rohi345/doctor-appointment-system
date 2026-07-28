# Al Khair Skin Clinic

Doctor appointment management & clinic website for **Dr. Rohail Danish**, Consultant Dermatologist in Dera Ismail Khan, KP, Pakistan.

## Stack

- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS v4**
- **Gemini AI** (`@google/genai`) for AI-powered appointment features
- **Framer Motion** (`motion`) for animations

## Project Structure

```
src/
  components/    # All UI components (Header, Hero, AppointmentBooking, etc.)
  data/          # clinicData.ts — clinic config, services, testimonials, FAQ
  lib/           # storage.ts — appointment persistence (localStorage)
  assets/
    images/      # Clinic images
  App.tsx
  main.tsx
  types.ts
index.html
```

## Running the App

```bash
npm install
npm run dev       # starts on port 5000
```

Requires the `GEMINI_API_KEY` secret (set via Replit Secrets).

## Notes

- **Two images are placeholders**: `dr_rohail_danish` and `derma_treatment_room` images were not included in the GitHub export. Both currently fall back to the hero banner image. Replace them in `src/assets/images/` and update `src/data/clinicData.ts` to restore them.
- Appointments are stored in **localStorage** (client-side only, no backend database).
- The Admin Portal is accessible from the header navigation.
