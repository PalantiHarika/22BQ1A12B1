
const LOGGING_URL = "http://20.244.56.144/evaluation-service/logs";
const AUTH_TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyMmJxMWExMmIxQHZ2aXQubmV0IiwiZXhwIjoxNzU0MDI5ODM5LCJpYXQiOjE3NTQwMjg5MzksImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiJkN2YyM2JjYS1mN2UwLTQyMmYtYmQ1MC0yNzQxM2M3M2FjZDIiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJwYWxhbnRpaGFyaWthIiwic3ViIjoiNzMyMmNiZjItYmVhMC00YzVkLTlhY2ItYWNiZmFiNDEwNzliIn0sImVtYWlsIjoiMjJicTFhMTJiMUB2dml0Lm5ldCIsIm5hbWUiOiJwYWxhbnRpaGFyaWthIiwicm9sbE5vIjoiMjJicTFhMTJiMSIsImFjY2Vzc0NvZGUiOiJQblZCRlYiLCJjbGllbnRJRCI6IjczMjJjYmYyLWJlYTAtNGM1ZC05YWNiLWFjYmZhYjQxMDc5YiIsImNsaWVudFNlY3JldCI6IkJzSnhBcGRGSERQVldqdHkifQ.0_teDV1q6MIr6gNsqLKoeybTT03HjoTlAhdykd4taz0";

const validStacks = ['backend', 'frontend'];
const validLevels = ['debug', 'info', 'warn', 'error', 'fatal'];
const validPackages = [
  'auth', 'config', 'middleware', 'utils',
  'cache', 'controller', 'cron job', 'db', 'domain',
  'handler', 'repository', 'route', 'service',
  'component', 'hook', 'page', 'state', 'style'
];

async function Log(stack, level, pkg, message) {
  try {
    if (!validStacks.includes(stack)) throw new Error(`Invalid stack: ${stack}`);
    if (!validLevels.includes(level)) throw new Error(`Invalid level: ${level}`);
    if (!validPackages.includes(pkg)) throw new Error(`Invalid package: ${pkg}`);

    const payload = {
      stack,
      level,
      package: pkg,
      message,
      timestamp: new Date().toISOString()
    };

    const response = await fetch(LOGGING_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': AUTH_TOKEN
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`Log failed with status ${response.status}: ${errorBody}`);
    } else {
      console.log(`Log [${level}] sent: ${message}`);
    }

  } catch (err) {
    console.error('Logging Error:', err.message);
  }
}

export { Log };
