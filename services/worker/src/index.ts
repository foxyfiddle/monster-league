console.log("[worker] ready (pid)", process.pid);
setInterval(() => {
  console.log("[worker] heartbeat", new Date().toISOString());
}, 5000);
