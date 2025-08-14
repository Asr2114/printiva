import axios from "axios";

export const axiosClient = axios.create({
    baseURL:'http://localhost:1337/api',
    headers:{
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`    }
})