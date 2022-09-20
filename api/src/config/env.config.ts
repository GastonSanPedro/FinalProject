export const EnvConfiguration = ()=>({
    environment: process.env.NODE_ENV || 'dev',
    MONGODB: process.env.MONGODB || 'mongodb://localhost:27017/nest-FinalProject',
    port: process.env.PORT || 3002,
})