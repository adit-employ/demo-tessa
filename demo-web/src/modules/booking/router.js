const VueDefault = () => import("@/components/layouts/Default.vue");
const VueListBooking = () => import("./views/List.vue");
const VueSelectRoom = () => import("./views/SelectRoom.vue");
const VueBookingForm = () => import("./views/BookingForm.vue");


const moduleRoute = [
    {
        path: "/booking",
        component: VueDefault,
        meta: {
            auth: true
        },
        children: [
            {
                path: "",
                name: "booking",
                meta: {
                    auth: true,
                    page_title: "Booking"
                },
                component: VueListBooking
            },
            {
                path: "select-room",
                name: "select-room",
                meta: {
                    auth: true,
                    page_title: "Select Room"
                },
                component: VueSelectRoom
            },
            {
                path: "booking-form",
                name: "booking-form",
                meta: {
                    auth: true,
                    page_title: "Booking"
                },
                component: VueBookingForm
            },
            {
                path: "update/:calendar_id/:event_id/",
                name: "reschedule",
                meta: {
                    auth: true,
                    page_title: "Booking",
                },
                component: VueBookingForm
            }
        ]
    }
];

export default router => {
    router.addRoute(...moduleRoute);
};
