module.exports = {
    apps: [
        {
            name: 'heritage-farm-backend',
            script: 'index.js',
            interpreter: 'bun',
            instances: 'max',
            exec_mode: 'cluster',
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'development',
            },
            env_production: {
                NODE_ENV: 'production',
            },
            error_file: 'logs/pm2-error.log',
            out_file: 'logs/pm2-out.log',
            log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
            combine_logs: true,
            merge_logs: true,
        },
    ],
};
