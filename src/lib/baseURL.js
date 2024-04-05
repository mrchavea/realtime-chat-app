const dev = process.env.NODE_ENV !== 'production';
const baseURL = dev ? 'http://localhost:3000' : 'https://garage-advisor.vercel.app/';

export default baseURL