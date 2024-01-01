import { redirect } from "react-router-dom";

export const adminConfig = {
    sidebarItems: {
        dashboard: {
            title: "لوحة التحكم",
            icon: "fa-solid fa-chart-pie",
            name: "",
        },
        services: {
            title: "الخدمات",
            icon: "fa-solid fa-stethoscope",
            name: "services",
        },
        statistics: {
            title: "إحصائيات",
            icon: "fa-solid fa-chart-column",
            name: "statistics",
        },
        orders: {
            title: "الطلبات",
            icon: "fa-regular fa-clock",
            name: "orders",
        },
        
        admins: {
            title: "المديرين",
            icon: "fa-solid fa-shield",
            name: "admins",
        },
        users: {
            title: "المستخدمين",
            icon: "fa-solid fa-user",
            name: "users",
        },
        websiteSettings: {
            title: "إعدادات الموقع",
            icon: "fa-solid fa-wand-magic-sparkles",
            name: "website-settings",
        },
        settings: {
            title: "إعدادات",
            icon: "fa-solid fa-gear",
            name: "settings",
        },
        clientPage: {
            title: "الصفحة الرئيسية",
            icon: "fa-solid fa-house",
            name: "clientPage",
            link: "/",
            newPage: true,
        },
        logout: {
            title: "تسجيل الخروج",
            icon: "fa-solid fa-right-from-bracket",
            action: "logout",
        },
    },
    homepageCards: [
        {
            title: "عدد المستخدمين",
            icon: "fa-solid fa-user",
            ref: "users",
        },
        {
            title: "عدد المديرين",
            icon: "fa-solid fa-shield",
            ref: "admins",
        },
        {
            title: "عدد الخدمات",
            icon: "fa-solid fa-stethoscope",
            ref: "services",
        },
        {
            title: "عدد الطلبات",
            icon: "fa-regular fa-clock",
            ref: "orders",
        },

    ],
};