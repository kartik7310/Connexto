module.exports = {
  apps: [{
    name: 'my-app',
    script: './src/index.js',
    instances: 2,  
    exec_mode: 'cluster',
    autorestart: true,
    watch: false,  //  true in development
    max_memory_restart: '500M',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    },
    error_file: './logs/error.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
  }]
};