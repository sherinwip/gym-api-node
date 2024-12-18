require('dotenv').config();

module.exports = {
  app: {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development',
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: '24h'
  },
  db: {
    name: process.env.DB_NAME || 'gym_management',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres'
  },
  email: {
    // Email configuration for future implementation
    enabled: process.env.EMAIL_ENABLED === 'true',
    from: process.env.EMAIL_FROM || 'noreply@gym-management.com'
  },
  notifications: {
    cleanupOldAfterDays: 30,
    maxRetries: 3,
    retryDelays: [1000, 5000, 15000]
  }
};