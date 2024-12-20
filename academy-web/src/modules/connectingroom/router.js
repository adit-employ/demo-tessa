const VueDefault = () => import("@/components/layouts/Default.vue");
const VueListConnectingRoom = () => import("./views/List.vue");
const VueConnectingRoomForm = () => import("./views/Form.vue");

const moduleRoute = [
    {
        path: "/connecting-room",
        component: VueDefault,
        meta: {
            auth: true
        },
        children: [
            {
                path: "",
                name: "connecting-room",
                meta: {
                    auth: true,
                    page_title: "Connecting Room",
                },
                component: VueListConnectingRoom
            },
            {
                path: "create",
                name: "create-connecting-room",
                meta: {
                    auth: true,
                    page_title: "Create Connecting Room",
                    page_subtitle: "Connecting Room",
                },
                component: VueConnectingRoomForm
            },
            {
                path: "update/:id",
                name: "update-connecting-room",
                meta: {
                    auth: true,
                    page_title: "Update Connecting Room",
                    page_subtitle: "Connecting Room",
                },
                component: VueConnectingRoomForm
            }
        ]
    }
];

export default router => {
    router.addRoute(...moduleRoute);
};
