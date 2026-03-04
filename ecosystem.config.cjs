module.exports = {
  apps: [
    {
      name: "filos-site",
      script: "dist/filos/server/server.mjs",
      instances: 1,
      exec_mode: "fork",

      autorestart: true,
      max_restarts: 10,
      time: true,

      // logs
      out_file: "logs/pm2-out.log",
      error_file: "logs/pm2-err.log",
      merge_logs: true,

      env: {
        NODE_ENV: "production"
        // PORT: "4000" // <-- só ative se seu server.mjs respeitar process.env.PORT
      }
    }
  ]
};