# Gym Management System API Documentation

## Notification System

### Endpoints

#### Create Notification
\`\`\`
POST /api/notifications
Authorization: Bearer {token}
Role: Admin

Request Body:
{
  "userId": "uuid",
  "type": "membership_expiry|class_reminder|payment_confirmation|system_announcement",
  "title": "string",
  "message": "string",
  "metadata": {object},
  "scheduledFor": "ISO date string" (optional)
}
\`\`\`

#### Get User Notifications
\`\`\`
GET /api/notifications?page=1&limit=10&status=unread
Authorization: Bearer {token}
\`\`\`

#### Mark Notification as Read
\`\`\`
PATCH /api/notifications/:id/read
Authorization: Bearer {token}
\`\`\`

#### Update Notification Preferences
\`\`\`
PUT /api/notifications/preferences
Authorization: Bearer {token}

Request Body:
{
  "emailEnabled": boolean,
  "pushEnabled": boolean,
  "membershipAlerts": boolean,
  "classReminders": boolean,
  "paymentAlerts": boolean
}
\`\`\`

### Analytics Endpoints

#### Get Delivery Statistics
\`\`\`
GET /api/analytics/notifications/delivery?timeframe=24h
Authorization: Bearer {token}
Role: Admin
\`\`\`

#### Get User Engagement Metrics
\`\`\`
GET /api/analytics/notifications/engagement/:userId?days=30
Authorization: Bearer {token}
Role: Admin, Trainer
\`\`\`

## Response Formats

### Notification Object
\`\`\`json
{
  "id": "uuid",
  "userId": "uuid",
  "type": "string",
  "title": "string",
  "message": "string",
  "status": "unread|read",
  "metadata": {},
  "scheduledFor": "ISO date string",
  "readAt": "ISO date string",
  "createdAt": "ISO date string",
  "updatedAt": "ISO date string"
}
\`\`\`

### Analytics Response
\`\`\`json
{
  "deliveryStats": [
    {
      "type": "string",
      "total": number,
      "read": number,
      "readRate": number
    }
  ],
  "engagement": [
    {
      "date": "YYYY-MM-DD",
      "total": number,
      "read": number,
      "engagement": number
    }
  ]
}
\`\`\`