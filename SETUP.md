# Setup Guide

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/spaandsalonafrica
# Or for MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/dbname

# Brevo (Email & SMS) Configuration
BREVO_API_KEY=your_brevo_api_key_here
BREVO_SENDER_NAME=Spa & Salon Africa
BREVO_SENDER_EMAIL=noreply@spaandsalonafrica.com
BREVO_SMS_SENDER=SpaSalon

# Admin Email (for notifications)
ADMIN_EMAIL=admin@spaandsalonafrica.com

# Paystack Configuration
PAYSTACK_SECRET_KEY=your_paystack_secret_key_here
PAYSTACK_PUBLIC_KEY=your_paystack_public_key_here

# Frontend URL (for payment callbacks)
FRONTEND_URL=http://localhost:8080

# Server Configuration
PORT=8080
PING_MESSAGE=ping
```

## Installation

1. Install dependencies:
```bash
pnpm install
```

2. Set up your environment variables (see above)

3. Start the development server:
```bash
pnpm dev
```

## Service Setup

### MongoDB
- Local: Install MongoDB locally or use Docker
- Cloud: Use MongoDB Atlas (free tier available)
- Update `MONGODB_URI` in `.env`

### Brevo (Email & SMS)
1. Sign up at https://www.brevo.com/
2. Get your API key from Settings > API Keys
3. Verify your sender email address
4. Update `BREVO_API_KEY` and other Brevo settings in `.env`

### Paystack
1. Sign up at https://paystack.com/
2. Get your Secret Key and Public Key from Settings > API Keys & Webhooks
3. Update `PAYSTACK_SECRET_KEY` and `PAYSTACK_PUBLIC_KEY` in `.env`
4. Set up webhook URL: `https://yourdomain.com/api/events/verify-payment`

## Features Implemented

### Contact Form
- ✅ Database storage (MongoDB)
- ✅ Email notifications (admin + user confirmation)
- ✅ Form validation

### Event Registration
- ✅ Database storage (MongoDB)
- ✅ Email notifications (admin + user confirmation)
- ✅ SMS notifications (optional)
- ✅ Payment processing (Paystack)
- ✅ Payment verification
- ✅ Support for free and paid events

## API Endpoints

- `POST /api/contact` - Submit contact form
- `POST /api/events/register` - Register for an event
- `POST /api/events/verify-payment` - Verify payment transaction

## Database Models

### Contact
- Stores contact form submissions
- Fields: name, email, phone, subject, message, timestamps

### EventRegistration
- Stores event registrations
- Fields: eventId, name, email, phone, businessName, additionalInfo, paymentStatus, paymentReference, amount, currency, registrationId, timestamps
