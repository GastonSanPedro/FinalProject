export const EnvConfiguration = ()=>({
    environment: process.env.NODE_ENV || 'dev',
    MONGODB: process.env.MONGODB,
    port: process.env.PORT || 3001,
})