<template>
    <div>
        <v-card :loading="events.loading">
            <v-col cols="12" md="12">
                <v-form v-model="form_error" ref="form" lazy-validation>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field id="name"
                                          name="name"
                                          v-model="form.name"
                                          label="Name"
                                          :disabled="true"
                                          prepend-icon="mdi-domain">
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <vue-room-selection v-model="form.room_emails"
                                                :items="room.list"
                                                :multiple="true"
                                                @change="onChangeRoom()"
                                                icon="mdi-account-multiple-outline"
                                                :disabled="room.loading"
                                                :label="room.loading ? 'Loading...':'Select Rooms *'"
                                                :rules="rules.room_emails"
                                                item-text="name"
                                                item-value="primary_email"/>
                        </v-col>
                    </v-row>
                </v-form>
            </v-col>
            <v-divider />
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" outlined @click="$router.push({ name: `connecting-room`})" :disabled="events.loading">
                    Back
                </v-btn>
                <v-btn color="primary" @click="doSave()" :disabled="events.loading || events.submit">
                    <v-icon v-if="events.loading || events.submit" class="mdi mdi-spin">mdi-loading</v-icon>
                    {{!events.loading || events.submit ? 'Submit' : 'Loading'}}
                </v-btn>
                <v-btn color="error" v-if="form_mode=='update'" @click="modalDelete = true, events.delete = true" :disabled="events.loading || events.delete">
                    <v-icon v-if="events.loading || events.delete" class="mdi mdi-spin">mdi-loading</v-icon>
                    {{ !events.delete ? 'Delete' : 'Deleting'}}
                </v-btn>
            </v-card-actions>
        </v-card>
        <v-dialog v-model="modalDelete" max-width="500" persistent>
            <v-card>
                <v-card-title class="text-h7">
                    Delete
                </v-card-title>
                <v-divider />
                <v-card-text class="text-md-body-1">
                    Are you sure want to delete this item?
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" outlined @click="modalDelete = false, events.delete = false">
                        Cancel
                    </v-btn>
                    <v-btn color="error" @click="doDelete">
                        Delete
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import VueRoomSelection from "@/components/form/RoomSelection";
    import { allRoom } from "@/services/resources";
    import errorMessage from "@/utils/notify-error";
    import { getConnectingRoomDetail, createConnectingRoom, updateConnectingRoom, deleteConnectingRoom } from '@/services/connectingroom';

    export default {
        name: "VueConnectingRoomForm",
        data() {
            return {
                form: {
                    name: null,
                    items: [],
                    room_emails: []
                },
                form_submit: {},
                loading: false,
                loading_delete: false,
                form_mode: null,
                form_error: false,
                room: {
                    loading: false,
                    list: [],
                },
                rules: {
                    room_emails: [
                        // v => (v != null && v.length > 0) || 'rooms is required',
                        v => v == null ? false : v.length > 0 || 'Rooms is required'
                    ],
                },
            events: {
                loading: true,
                submit: false,
                delete: false,
            },
            modalDelete: false
        }
    },
    components: {
        VueRoomSelection
    },
    mounted() {
        this.$refs.form.resetValidation();
        this.doGetRooms();
        if (this.$route.params.id) {
            this.form_mode = 'update';
            this.doGetDetail();            
        }
        else {
            this.form_mode = 'create';
        }
    },
    methods:{
        async doGetRooms() {
            this.room.loading = true;
            allRoom()
                .then(response => {
                    this.room.loading = false;
                    this.events.loading = false;
                    this.room.list = response.data;
                })
                .catch(error => {
                    this.room.loading = false
                    this.events.loading = false;
                    errorMessage(error);
                })
        },
        onChangeRoom() {
            let result = '';
            this.form.room_emails.forEach(item => {
                result += this.room.list.find(obj => obj.primary_email === item).name + ", "; 
            });     
            this.form.name = result.substring(0, result.length - 2);
        },
        async doGetDetail() {
                this.loading = true;
                this.events.loading = true;
                getConnectingRoomDetail(this.$route.params.id)
                    .then((response) => {
                        this.loading = false;
                        this.events.loading = false;
                        this.form = response.data;
                    }).catch((error) => {
                        errorMessage(error);
                    })
            },
            async doSave() {
                if (!this.$refs.form.validate()) return false;
                this.form_submit = { ...this.form };

                if (this.form_mode == 'update') {
                    this.doUpdate();
                }
                else {
                    this.doCreate();
                }
            },
            async doCreate() {
                this.events.loading = true;
                await createConnectingRoom(this.form_submit)
                    .then(() => {
                        this.events.submit = true;
                        this.saveSuccess();
                    }).catch((error) => {
                        this.events.loading = false;
                        this.events.submit = false;
                        errorMessage(error);
                    })
        },
        async doUpdate() {
            this.loading = true;
            await updateConnectingRoom(this.$route.params.id, this.form_submit)
                .then(() => {
                    this.events.submit = true;
                    this.saveSuccess();
                }).catch((error) => {
                    this.events.loading = false;
                    this.events.submit = false;
                    errorMessage(error);
                })
        },
        async doDelete() {
                await deleteConnectingRoom(this.$route.params.id)
                    .then(() => {
                        this.events.delete = true;
                        this.deleteSuccess();
                    }).catch((error) => {
                        this.events.loading = false;
                        this.events.delete = false;
                        errorMessage(error);
                    })
            },
            saveSuccess() {
                this.loading = false;
                this.$notify({
                    title: "Successful",
                    content: "Connecting Room already saved!",
                    color: "rgb(0, 200, 83)",
                });
                this.$router.push({ name: `connecting-room` });
            },
            deleteSuccess() {
                this.loading = false;
                this.$notify({
                    title: "Successful",
                    content: "Connecting Room already deleted!",
                    color: "rgb(0, 200, 83)",
                });
                this.$router.push({ name: `connecting-room` });
            }
    },
}
</script>