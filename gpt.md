Heritage-Farm Platform Architecture and Feature Breakdown

Heritage-Farm is a MERN-based platform (MongoDB, Express.js, React + Vite, Node.js) with distinct frontend and backend codebases. The frontend is a React (TypeScript or JavaScript) app built with Vite, designed mobile-first and supporting multi-language (Tamil/English) via i18n libraries (e.g. react-i18next). The backend is an Express.js API with a modular MVC-like structure. This separation ensures scalability: the frontend handles all user interactions (tourist, creator, admin UIs) while the backend exposes RESTful endpoints and business logic.

Both codebases use clear folder hierarchies. The backend follows a structure like:

heritage-farm-backend/
├── src/
│   ├── config/        # database, auth and environment setup
│   ├── controllers/   # request handlers (Auth, Listings, Bookings, etc.)
│   ├── models/        # Mongoose schemas (User, Listing, Booking, Review, etc.)
│   ├── routes/        # route definitions per feature (auth.js, listings.js, ...)
│   ├── services/      # external integrations (payment gateways, AI/AR services, transcription)
│   ├── middlewares/   # auth checks, error handlers, logging
│   ├── utils/         # helper functions and constants
│   ├── app.js         # Express app setup (middlewares, routes)
│   └── server.js      # Server startup (DB connect, listen)
├── .env               # environment variables (DB URI, API keys)
├── package.json       # project dependencies & scripts
└── README.md


This aligns with Express best practices and typical MERN projects. Key backend modules include controllers for authentication, listings, bookings, reviews, messaging, admin actions, etc., each with corresponding route files. For example, authController.js handles login/signup; listingController.js handles CRUD for experiences; bookingController.js handles bookings and payments; and adminController.js handles creator/listing approval and analytics.

The frontend (heritage-farm-frontend/) uses a similar modular layout:

heritage-farm-frontend/
├── public/             # static assets and manifest
├── src/
│   ├── assets/         # images, fonts, AR models
│   ├── components/     # reusable UI components (Buttons, Cards, Modals, etc.)
│   ├── pages/          # page-level views (e.g. TouristOnboarding, CreatorDashboard, AdminConsole)
│   ├── routes/         # React Router setup (routes to pages)
│   ├── hooks/          # custom React hooks (useAuth, useMediaUpload, etc.)
│   ├── contexts/       # React Contexts or Redux stores (Auth, Language, etc.)
│   ├── services/       # API client wrappers (e.g. Axios instances)
│   ├── utils/          # helper functions (date formatters, validators)
│   ├── i18n/           # translation JSON files and i18n config
│   ├── App.jsx         # root component (wraps Router, Contexts)
│   └── main.jsx        # app entry (renders `<App />`)
├── package.json
└── README.md


As shown above and in common React best practices, we separate components (generic UI pieces) from pages (feature views). For example, src/pages/Tourist/Onboarding.jsx, src/pages/Tourist/Discover.jsx, src/pages/Creator/Listings.jsx, src/pages/Admin/Dashboard.jsx, etc. We use PascalCase for component files (LoginForm.jsx, BookingCard.jsx) and kebab-case or camelCase for utility/hooks. The project is scaffolded with Vite (e.g. npm create vite@latest) for fast build and HMR.

Key frontend modules include:

Tourist UI: Onboarding screens (language toggle, profile), a Discovery page (curated journeys search), an AI Trip Builder page (generate itinerary), Booking flow (select dates, number of guests), Itinerary view (daily plans, map), AR-view components (see below), Reviews submission, and Media Upload (for photos).

Creator UI: Onboarding (by form or by uploading a Tamil voice note – see Voice feature), listing management pages (Create/Edit experiences with details: title, category, location, price, schedule, images/AR content), a Booking Response page (approve/reject requests), an Earnings Dashboard (monthly earnings, payouts), and a Messaging/Chat interface (with tourists).

Admin UI: Secure admin login page, Creator Verification list (approve or reject signup requests), Listing Approval queue, Commission Controls (set platform fee percentage), Analytics Dashboard (charts for bookings, revenue by sector), and Conservation Fund monitoring (total funds collected/spent).

Internationalization: We integrate a library like react-i18next to provide Tamil and English text. For example, src/i18n/index.js initializes i18next with translation JSON files. The UI dynamically switches languages and can also format dates/currencies per locale.

Mobile-First / Responsive Design: All UI layouts are mobile-first: base CSS is optimized for small screens, with CSS media queries for larger sizes. Common breakpoints (320–767px for phones, 768–1023px tablets, 1024px+ desktops) are used. We employ Flexbox/Grid to stack elements vertically on mobile and adjust to rows on larger screens. Touch-friendly components and optimized images ensure good performance on devices. (For instance, navigation menus use flex-direction: column on mobile and switch to row on tablets.) In short, every page is tested to be fully usable on smartphone viewports (e.g. buttons large enough, text readable, minimal horizontal scrolling).

REST API Endpoints

The backend exposes RESTful JSON APIs. Resources are named with nouns (e.g. /listings, /bookings). Sample endpoints include:

Auth / Users:

POST /api/auth/register – Register a new tourist or creator.

POST /api/auth/login – User login (returns JWT).

GET /api/users/:userId – Get user profile (tourist or creator).

PUT /api/users/:userId – Update profile info (name, password, language, etc.).

Creators:

POST /api/creators/register – Creator onboarding (accepts form fields or voice-to-text payload).

GET /api/creators/:creatorId – View creator profile (visible to others).

PUT /api/creators/:creatorId – Update creator info (bio, skills, etc.).

Listings (Experiences):

GET /api/listings – List or search experiences. Supports query params (e.g. sector, location, date).

GET /api/listings/:id – Get details of one experience (including AR tags, images).

POST /api/listings – Create a new listing (creator only).

PUT /api/listings/:id – Update listing details (creator only).

DELETE /api/listings/:id – Remove a listing (creator only).

Search / AI:

GET /api/search?query=...&sector=... – Keyword/filters search across all sectors.

POST /api/journeys/bundle – Generate an AI-curated multi-day itinerary given preferences (days, interests, budget).

GET /api/ai/seasonal?location=... – Get seasonal recommendations for a location.

Bookings:

POST /api/bookings – Book one or more experiences (request includes userId, listingId(s), dates, guests).

GET /api/bookings/:id – Get booking details.

GET /api/users/:userId/bookings – List bookings made by a tourist.

GET /api/creators/:creatorId/bookings – List bookings received by a creator (so they can respond).

Payments:

POST /api/payments/initiate – Create a payment intent (e.g. via Stripe) for a booking.

PUT /api/payments/:id/confirm – Confirm payment (webhook callback or client callback).

Itineraries:

GET /api/itineraries/:id – Retrieve a saved user itinerary.

POST /api/itineraries – Save a custom or AI-generated itinerary for a user.

Reviews & Media:

POST /api/reviews – Submit a review/rating for a booking/listing.

GET /api/listings/:listingId/reviews – Get all reviews for an experience.

(File uploads for images/videos are handled via a dedicated middleware or cloud storage service.)

Messaging/Chat:

POST /api/messages – Send a message in a chat (includes senderId, recipientId, text).

GET /api/messages/:chatId – Retrieve chat history.

Admin:

GET /api/admin/creators/pending – List creators awaiting approval.

PUT /api/admin/creators/:id/approve – Approve or reject a creator account.

GET /api/admin/listings/pending – List listings awaiting approval.

PUT /api/admin/listings/:id/approve – Approve or reject a listing.

PUT /api/admin/commission – Update platform commission percentage.

GET /api/admin/analytics/bookings – Sales and booking analytics (graph data).

GET /api/admin/fund – View conservation fund totals and uses.

All endpoints use consistent REST naming (nouns, plural resources) and standard HTTP verbs. For example, bookings use /bookings as a collection. Separate route modules (e.g. bookingRoutes.js, authRoutes.js) are used for clarity.

Data Models (MongoDB Collections)

Key MongoDB schemas (using Mongoose) include:

User (users): { _id, name, email, passwordHash, role, language, isCreator, isVerified, createdAt, ... }. The role field can be “tourist”, “creator”, or “admin”. Creator users have additional profile fields (e.g. bio, skills, experienceType like farm/temple/guide, location, phone). This matches common patterns of user models in travel apps.

Listing (listings): { _id, creatorId (ref User), title, description, category, location, price, capacity, availability (dates/slots), images[], arTags[], tags[], status, createdAt, ... }. Category is one of “AgriRural”, “HeritageCulture”, “EcoAdventure”. Status can be “Pending”, “Approved”, or “Rejected”. AR-related fields (arTags) may store references to AR content (3D models or markers).

Booking (bookings): { _id, userId (ref User), listingId (ref Listing), dateFrom, dateTo, numGuests, totalPrice, commission, creatorEarnings, status, paymentStatus, createdAt, ... }. Each booking links a tourist to a specific listing (or possibly multiple if we allow package bookings), with dates and pricing breakdown.

Payment (payments): { _id, bookingId (ref Booking), amount, currency, method, transactionId, status, paidAt }. Stores payment gateway responses (used if not embedding in bookings directly).

Review (reviews): { _id, userId (ref User), listingId (ref Listing), rating (1–5), comment, media[], createdAt }. Tourists can attach photos (stored via URLs).

Chat / Message (chats): Could be one of two designs. A simple approach: { _id, participants: [userId, userId], messages: [{ senderId, text, timestamp }], lastUpdated }. Alternatively, split into ChatRoom and Message collections.

Itinerary / Trip (itineraries): { _id, userId (ref User), listings: [listingId], title, createdAt }. Represents a saved bundle of experiences for the tourist.

TripRequest (tripRequests): { _id, userId, title, description, sectors (desired categories), budget, dateRange, status, createdAt }. Used for reverse-auction: tourists post what they want.

Bid (bids): { _id, requestId (ref TripRequest), creatorId (ref User), proposedPrice, details, status, createdAt }. Creators bid on a TripRequest.

ConservationFund (fundContributions): { _id, bookingId (ref Booking), amount, contributedAt }. Logs 1–3% of each booking that goes to the fund; or just aggregate these for reporting.

These models mirror common travel booking data (User, Booking, Review, Payment etc.), extended for multi-sector tourism and auctioning. All schemas include timestamps and reference relations (ref) as needed.

Phase-wise Development Plan

MVP (Core Platform): Implement basic sign-up/login, profiles, and listing/catalog features. Tourists can browse curated journeys (basic search filtering by sector/location), book experiences, pay via an integrated gateway (Stripe/Razorpay), and leave reviews. Creators can register via a form, create listings (farm tours, craft workshops, treks), manage availability, respond to booking requests, and view an earnings summary. Admin can approve creators/listings and set commission rates. Implement itinerary UX (allow tourists to view day-by-day schedule). Launch mobile-responsive web UIs. No AI or AR yet; focus on reliable booking flow and data integrity.

Phase 2 (AI & AR Features): Add intelligence and immersion. Integrate AI services (possibly as a separate microservice or backend module) to automatically bundle experiences across sectors, suggest optimal tours based on seasonality and user preferences, and adjust dynamic pricing. For example, an AI endpoint might generate a 5-day itinerary for a Tamil Nadu tour. Implement AR content: associate AR markers or location-based AR scenes with listings (e.g. a 3D temple model or plant identifier). Use a WebAR framework (like AR.js with A-Frame) in the frontend to render AR layers. Also implement the Voice Commerce pipeline: use WhatsApp Business API or a Node.js WhatsApp client plus an AI transcription service (e.g. OpenAI Whisper) to let creators submit listing details via Tamil voice notes. Transcribed text is reviewed (human/moderated) and saved as a listing draft.

Phase 3 (Auction & Analytics): Introduce the reverse-auction module: enable tourists to post custom trip requests (TripRequest) and allow creators to bid. Add API endpoints and UI for creating bids and selecting winners. Enhance analytics: build rich dashboards (charts, tables) for admin (e.g. booking trends by sector, creator earnings, conservation fund balance, etc.). Also finalize the conservation fund system: automatically deduct a set percentage per booking into an internal fund, and display usage of funds (e.g. contributions to organic farming or preservation programs). At this stage the platform is fully featured with dynamic pricing, analytics reports, and auctioning.

Mobile-First Considerations

All user interfaces are designed mobile-first: base styles target phone screens (320–767px width) and then add media queries for tablets (≥768px) and desktops. We use fluid layouts (CSS Grid/Flexbox) and relative units (vw, clamp()) to ensure content scales smoothly. Example: a navigation menu stacks vertically on narrow screens and becomes horizontal on wider screens. Interactive elements (buttons, inputs) have ample padding for touch. We also consider performance: lazy-load images, minimize bundle sizes, and test on low-end devices. Using libraries like Tailwind CSS or Material-UI can accelerate responsive design (e.g. applying md: breakpoints), but we maintain custom breakpoints per our needs.

By following these conventions and structures, Heritage-Farm can evolve from an MVP into a rich AI-powered tourism marketplace, while remaining maintainable and user-friendly.

Sources: We used standard MERN/REST design practices, i18n integration examples, mobile-first CSS guidelines, and recommended data models for travel apps to inform this architecture. These ensure a scalable, maintainable codebase with clear modules and endpoints.