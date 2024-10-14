#!/usr/bin/env node
require('dotenv').config();
const vercelEnv = process.env.VERCEL_ENV;

if (vercelEnv === 'production') {
  // Proceed with the build
  console.log('✅ - Build can proceed');
  process.exit(1);
} else {
  // Don't build
  console.log('🛑 - Build cancelled');
  process.exit(0);
}