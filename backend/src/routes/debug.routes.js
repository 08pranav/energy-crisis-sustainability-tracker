import express from 'express';
import YahooFinance from 'yahoo-finance2';
import { env } from '../config/env.js';

const router = express.Router();

const yahooFinance = new YahooFinance();

async function testYahooFinance() {
  try {
    const quote = await yahooFinance.quote('CL=F');
    const price = quote?.regularMarketPrice ?? quote?.postMarketPrice ?? null;
    
    if (price !== null && price !== undefined) {
      return { yahooStatus: 'SUCCESS', price };
    }
    return { yahooStatus: 'FAILED', error: 'No price data returned' };
  } catch (error) {
    return { yahooStatus: 'FAILED', error: `Init Error: ${error.message}` };
  }
}

async function testEiaApi() {
  try {
    if (!env.eiaApiKey) {
      return { status: 'SKIP', service: 'EIA API', reason: 'EIA_API_KEY not configured', timestamp: new Date().toISOString() };
    }

    const url = 'https://api.eia.gov/v2/';
    const response = await fetch(url);

    if (!response.ok) {
      return { status: 'FAIL', service: 'EIA API', error: `HTTP ${response.status}`, timestamp: new Date().toISOString() };
    }

    return { status: 'PASS', service: 'EIA API', data: { endpoint: url }, timestamp: new Date().toISOString() };
  } catch (error) {
    return { status: 'FAIL', service: 'EIA API', error: error.message, timestamp: new Date().toISOString() };
  }
}

async function testUpstashRedis() {
  try {
    if (!env.upstashRedisUrl || !env.upstashRedisToken) {
      return { status: 'SKIP', service: 'Upstash Redis', reason: 'Upstash credentials not configured', timestamp: new Date().toISOString() };
    }

    const testKey = 'health_check_test';
    const testValue = JSON.stringify({ timestamp: Date.now(), test: true });

    // SET operation
    const setUrl = `${env.upstashRedisUrl}/set/${encodeURIComponent(testKey)}/${encodeURIComponent(testValue)}?ex=60`;
    const setResponse = await fetch(setUrl, {
      headers: {
        Authorization: `Bearer ${env.upstashRedisToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (!setResponse.ok) {
      return { status: 'FAIL', service: 'Upstash Redis', error: `SET failed with HTTP ${setResponse.status}`, timestamp: new Date().toISOString() };
    }

    // GET operation
    const getUrl = `${env.upstashRedisUrl}/get/${encodeURIComponent(testKey)}`;
    const getResponse = await fetch(getUrl, {
      headers: {
        Authorization: `Bearer ${env.upstashRedisToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (!getResponse.ok) {
      return { status: 'FAIL', service: 'Upstash Redis', error: `GET failed with HTTP ${getResponse.status}`, timestamp: new Date().toISOString() };
    }

    const getPayload = await getResponse.json();
    if (getPayload?.result) {
      return { status: 'PASS', service: 'Upstash Redis', data: { operation: 'SET/GET', retrieved: true }, timestamp: new Date().toISOString() };
    }

    return { status: 'FAIL', service: 'Upstash Redis', error: 'GET returned no result', timestamp: new Date().toISOString() };
  } catch (error) {
    return { status: 'FAIL', service: 'Upstash Redis', error: error.message, timestamp: new Date().toISOString() };
  }
}

async function testSupabase() {
  try {
    if (!env.supabaseUrl || !env.supabaseServiceRoleKey) {
      return { status: 'SKIP', service: 'Supabase', reason: 'Supabase credentials not configured', timestamp: new Date().toISOString() };
    }

    // Simple health check by querying the auth endpoint with service role
    const response = await fetch(`${env.supabaseUrl}/rest/v1/`, {
      headers: {
        Authorization: `Bearer ${env.supabaseServiceRoleKey}`,
        apikey: env.supabaseServiceRoleKey,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok || response.status === 404) {
      // 404 is expected for non-existent route; we're just verifying connectivity
      return { status: 'PASS', service: 'Supabase', data: { url: env.supabaseUrl, connectivity: true }, timestamp: new Date().toISOString() };
    }

    return { status: 'FAIL', service: 'Supabase', error: `HTTP ${response.status}`, timestamp: new Date().toISOString() };
  } catch (error) {
    return { status: 'FAIL', service: 'Supabase', error: error.message, timestamp: new Date().toISOString() };
  }
}

router.get('/health-check', async (req, res) => {
  try {
    const results = await Promise.all([
      testYahooFinance(),
      testEiaApi(),
      testUpstashRedis(),
      testSupabase()
    ]);

    const passed = results.filter((r) => r.status === 'PASS').length;
    const failed = results.filter((r) => r.status === 'FAIL').length;
    const skipped = results.filter((r) => r.status === 'SKIP').length;
    const overallStatus = failed === 0 && passed > 0 ? 'HEALTHY' : failed > 0 ? 'DEGRADED' : 'UNCHECKED';

    return res.json({
      timestamp: new Date().toISOString(),
      overallStatus,
      summary: { passed, failed, skipped, total: results.length },
      diagnostics: results
    });
  } catch (error) {
    return res.status(500).json({
      timestamp: new Date().toISOString(),
      overallStatus: 'ERROR',
      error: error.message,
      diagnostics: []
    });
  }
});

export default router;
