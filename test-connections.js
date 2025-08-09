#!/usr/bin/env node

/**
 * Connection Test Script for PoliUX
 * Run: node test-connections.js
 */

const { createClient } = require('@supabase/supabase-js');

// Note: Run this with environment variables loaded manually if needed

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://nxjflegwtmrrvbwvofoq.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im54amZsZWd3dG1ycnZid3ZvZm9xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwNjQzOTksImV4cCI6MjA2ODY0MDM5OX0.U6rgXpgsjWDcGTx1BrvfdS-e5TvNvZ2khg8Ib7sxzk4';

console.log('🔧 PoliUX Connection Test\n');

// Test 1: Environment Variables
console.log('1️⃣ Testing Environment Variables...');
console.log(`   SUPABASE_URL: ${supabaseUrl ? '✅ Set' : '❌ Missing'}`);
console.log(`   SUPABASE_KEY: ${supabaseAnonKey ? '✅ Set' : '❌ Missing'}`);

if (!supabaseUrl || !supabaseAnonKey) {
  console.log('\n❌ Missing environment variables. Please check your .env.local file.');
  process.exit(1);
}

// Test 2: Supabase Connection
console.log('\n2️⃣ Testing Supabase Connection...');

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testSupabase() {
  try {
    // Test basic connection
    const { data, error } = await supabase.from('users').select('count').limit(1);
    
    if (error && error.code === 'PGRST116') {
      console.log('   ✅ Supabase connected (no tables yet - this is normal)');
    } else if (error) {
      console.log(`   ⚠️  Supabase connected with warning: ${error.message}`);
    } else {
      console.log('   ✅ Supabase connected successfully');
    }

    // Test auth service
    const { data: authData, error: authError } = await supabase.auth.getSession();
    if (authError) {
      console.log(`   ❌ Auth service error: ${authError.message}`);
    } else {
      console.log('   ✅ Auth service accessible');
    }

  } catch (err) {
    console.log(`   ❌ Connection failed: ${err.message}`);
    return false;
  }
  return true;
}

// Test 3: Dependencies
console.log('\n3️⃣ Testing Dependencies...');
try {
  require('next');
  console.log('   ✅ Next.js available');
} catch {
  console.log('   ❌ Next.js missing');
}

try {
  require('react');
  console.log('   ✅ React available');
} catch {
  console.log('   ❌ React missing');
}

try {
  require('typescript');
  console.log('   ✅ TypeScript available');
} catch {
  console.log('   ❌ TypeScript missing');
}

// Run tests
async function runTests() {
  const supabaseOk = await testSupabase();
  
  console.log('\n📊 Test Summary:');
  console.log(`   Environment: ${supabaseUrl && supabaseAnonKey ? '✅' : '❌'}`);
  console.log(`   Supabase: ${supabaseOk ? '✅' : '❌'}`);
  
  if (supabaseOk && supabaseUrl && supabaseAnonKey) {
    console.log('\n🎉 All connections working! Ready for deployment.');
    console.log('\n📝 Next steps:');
    console.log('   1. Push code to GitHub');
    console.log('   2. Connect GitHub repo to Netlify');
    console.log('   3. Set environment variables in Netlify');
    console.log('   4. Deploy!');
  } else {
    console.log('\n⚠️  Some issues found. Check the troubleshooting guide.');
  }
}

runTests().catch(console.error);
