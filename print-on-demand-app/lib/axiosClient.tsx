import axios from "axios";

export const axiosClient = axios.create({
    baseURL:'https://print-on-demand-web-admin.onrender.com',
    headers:{
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`    }
})
