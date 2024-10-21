import { Faq } from "@/types";



export const dailyVisitors = [
    { date: '01', value: 168 },
    { date: '02', value: 385 },
    { date: '03', value: 201 },
    { date: '04', value: 298 },
    { date: '05', value: 187 },
    { date: '06', value: 195 },
    { date: '07', value: 295 },
    { date: '08', value: 110 },
    { date: '09', value: 215 },
    { date: '10', value: 390 },
    { date: '11', value: 280 },
    { date: '12', value: 112 },
    { date: "13", value: 123 },
    { date: "14", value: 212 },
    { date: "15", value: 270 },
    { date: "16", value: 192 },
    { date: "17", value: 310 },
    { date: "18", value: 115 },
    { date: "19", value: 90 },
    { date: "20", value: 380 },
    { date: "21", value: 112 },
    { date: "22", value: 213 },
    { date: "23", value: 292 },
    { date: "24", value: 170 },
    { date: "25", value: 223 },
    { date: "26", value: 115 },
    { date: "27", value: 290 },
    { date: "28", value: 380 },
    { date: "29", value: 312 },
    { date: "30", value: 115 },
    { date: "31", value: 380 },
];

export const monthlyVisitors = [
    {
        month: 'Jan', value: 4000,
    },
    {
        month: 'Feb', value: 8000,
    },
    {
        month: 'Mar', value: 3000,
    },
    {
        month: 'Apr', value: 7000,
    },
    {
        month: 'May', value: 5000,
    },
    {
        month: 'Jun', value: 11000,
    },
    {
        month: 'Jul', value: 9000,
    },
    {
        month: 'Aug', value: 2000,
    },
    {
        month: 'Sep', value: 10000,
    },
    {
        month: 'Oct', value: 1000,
    },
    {
        month: 'Nov', value: 6000,
    },
    {
        month: 'Dec', value: 12000,
    },
]

export const yearlyVisitors = [

    { year: '2010', value: 100000 },
    { year: '2011', value: 600000 },
    { year: '2012', value: 400000 },
    { year: '2013', value: 554321 },
    { year: '2014', value: 398276 },
    { year: '2015', value: 800098 },
    { year: '2016', value: 300223 },
    { year: '2017', value: 200758 },
    { year: '2018', value: 200873 },
    { year: '2019', value: 300872 },
    { year: '2020', value: 500000 },
    { year: '2021', value: 700988 },
    { year: '2022', value: 890000 },
    { year: '2023', value: 921345 },
    { year: '2024', value: 123456 },
];

export const pageViews = [
    {
        url: "/",
        views: "2.5k",
        uniques: "2.1k",

    },
    {
        url: "/blog/",
        views: "376",
        uniques: "139",
    },
    {
        url: "/reserve/success",
        views: "468",
        uniques: "290",

    },
    {
        url: "/product/product-details",
        views: "298",
        uniques: "176",

    },
    {
        url: "/blog/digital-marketing",
        views: "179",
        uniques: "57",
    },

]

export const pageViewsBySocialMedia = [
    {
        url: "Google",
        views: "2.5k",
        uniques: "2.1k",

    },
    {
        url: "Github",
        views: "376",
        uniques: "139",
    },
    {
        url: "Producthunt",
        views: "468",
        uniques: "290",

    },
    {
        url: "Facebook",
        views: "298",
        uniques: "176",

    },
    {
        url: "Twitter",
        views: "179",
        uniques: "57",
    },

]

export const piechartData = [
    { name: 'Desktop', value: 65 },
    { name: 'Mobile', value: 12 },
    { name: 'Tablet', value: 34 },
    { name: 'Unknown', value: 56 },
];

export const faqs: Faq[] = [
    {
        question: "How do I reset my password?",
        answer: "You can reset your password by clicking on the 'Forgot Password' link on the login page. Follow the instructions to create a new password.",
        id: "1",
        createdAt: '',
        createdById: '',
    },
    {
        question: "How can I contact customer support?",
        answer: "You can contact our customer support by emailing us at support@example.com or by calling us at 00000000000000.",
        id: "2",
        createdAt: '',
        createdById: '',
    },
    {
        question: "What is your return policy?",
        answer: "We accept returns within 30 days of purchase. To initiate a return, please email us at returns@example.com.",
        id: "3",
        createdAt: '',
        createdById: '',
    }
]
