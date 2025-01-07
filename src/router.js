import {
    createRouter,
    createWebHistory
} from "vue-router";

import HomePage from './views/HomePage.vue';
import CountryDetails from "./views/CountryDetails.vue";


const routes =[
    {
        path:"/",
        component:HomePage
    },
    {
        path: "/country/:code",
        component: CountryDetails,
    },

]



const router = createRouter({
    history:createWebHistory(),
    routes:routes
})


export default router