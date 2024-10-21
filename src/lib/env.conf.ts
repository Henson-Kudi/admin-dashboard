import { NODE_ENV } from "@/types";

const envConf = {
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001',
    apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api/v1',
    NODE_ENV: process.env.NODE_ENV || NODE_ENV.DEVELOPMENT,
}

export default envConf;