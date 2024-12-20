<template>
    <div>
        <v-navigation-drawer app
                             left
                             v-model="drawer"
                             :temporary="temporary"
                             :width="300">
            <template v-slot:prepend>
                <v-list-item>
                    <v-list-item-avatar color="grey lighten-5" class="primary--text">
                        {{my_identity.initial}}
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title>{{my_identity.name}}</v-list-item-title>
                        <v-list-item-subtitle>{{my_identity.email}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </template>


            <!-- menu side bar -->
            <template v-if="my_identity.moduls != undefined">
                    <div v-for="item in my_identity.moduls" :key="item.moduleId">
                        
                        <v-list-item v-if="!item.hasOwnProperty('items')" @click="clikMenu(item.to)" >
                            <v-list-item-icon><v-icon>{{ item.action }}</v-icon></v-list-item-icon>
                            <v-list-item-content>
                              <v-list-item-title v-text="item.title"></v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-group v-else  no-action >
                            <template v-slot:activator>
                                <v-list-item-icon><v-icon>{{ item.action }}</v-icon></v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title v-text="item.title"></v-list-item-title>
                                </v-list-item-content>
                            </template>

                            <v-list-item v-for="child in item.items" :key="child.title" @click="clikMenu(child.to)"  >
                                    <v-list-item-icon><v-icon>{{child.action}}</v-icon> </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title v-text="child.title"></v-list-item-title>
                                    </v-list-item-content>
                            </v-list-item>
                        </v-list-group>

                    </div>
                </template>
                
        </v-navigation-drawer>
        <v-app-bar dark color="primary" permanent app flat>
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-app-bar-nav-icon v-on="on" @click="openSidebar()"></v-app-bar-nav-icon>
                </template>
                <span v-if="this.drawer">Hide Main Menu</span>
                <span v-if="!this.drawer">Show Main Menu</span>
            </v-tooltip>
            <v-toolbar-title class="font-weight-medium">{{page_title}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on" @click="$router.push({name:'home2'})">
                        <v-icon>mdi-export</v-icon>
                    </v-btn>
                </template>
                <span>Sign Out</span>
            </v-tooltip>
        </v-app-bar>
    </div>

</template>

<script>
    // Services
    // import { getMyIdentity } from "@/services/profile";
    // import errorMessage from "@/utils/notify-error";
    // import store from '@/stores';
    // import { TYPES } from "@/stores/modules/user/mutation-type";
    // import { getUserRoleModuleByEmail } from "@/services/app-users.js";

    export default {
        name: 'VueSidebar',
        data() {
            return {
                my_identity: {},
                my_menu: [],
                drawer: true,
                options: {
                    height: '100%',
                    size: 5,
                },
                loading: false,
                
            };
        },
        async mounted() {
            this.doGetMyIdentity();
        },
        computed: {
            temporary() {
                switch (this.$vuetify.breakpoint.name) {
                    case 'xs': return true
                    case 'sm': return true
                    case 'md': return true
                    case 'lg': return false
                    case 'xl': return false
                    default: return false
                }
            },
            page_title() {
                if (typeof this.$route.meta.page_title === "function") {
                    return this.$route.meta.page_title.call(this, this.$route);
                }
                return this.$route.meta.page_title;
            },
        },
        methods: {
            doGetMyIdentity() {
                this.loading = true;
                // academy
                this.my_identity = JSON.parse(localStorage.getItem("user"));
                // console.log('sidebar => this.my_identity : ', this.my_identity);
                // getUserRoleModuleByEmail('ade.yahdjan@xsis.co.id')
                //     .then(response => {
                //         this.my_identity = response;
                //         this.my_identity.moduls = generateMenuData(this.my_identity);
                //     })
                //     .catch(error => {
                //         this.loading = false
                //         errorMessage(error);
                //     });
                    this.loading = false;
            },
            openSidebar() {
                this.drawer = !this.drawer;
            },
            clikMenu(to) {
                this.$router.push({
                    name: to
                }).catch(()=>{});
            },

        }
    }

    

</script>