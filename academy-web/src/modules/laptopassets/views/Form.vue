<template>
    <div>
        <v-row>
            <v-col cols="12" xs="12">
                <v-card :loading="events.loading">
                    <v-card-text >
                        <v-form v-model="form_error" ref="form" lazy-validation>
                            <v-row>
                                <v-col cols="12" sm="6">
                                    <v-row class="pa-2">
                                        <v-col>Asset</v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <v-text-field disabled id="laptopBagNumber"
                                                        name="laptopBagNumber"
                                                        v-model="form.laptopBagNumber"
                                                        label="Laptop Bag Number [Auto-Generated]"
                                                        prepend-icon="mdi-format-text"
                                                        :rules="rules.laptopBagNumber"
                                                        dense>
                                        </v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <v-text-field id="assetNumber"
                                                            name="assetNumber"
                                                            v-model="form.assetNumber"
                                                            label="Asset Number *"
                                                            prepend-icon="mdi-format-text"
                                                            :rules="rules.assetNumber"
                                                            dense>
                                            </v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <v-select v-model="form.location.id"
                                                        prepend-icon="mdi-sitemap"
                                                        :items="location_list"
                                                        item-text="name"
                                                        item-value="id"
                                                        label="Location Name *"
                                                        clearable
                                                        @change="selectedLocation()"
                                                        :rules="rules.location"
                                                        dense>
                                            </v-select>
                                        </v-col>
                                    </v-row>
                                    <template v-if="$route.params.id != undefined">
                                        <v-row>
                                            <v-col>
                                                <v-select v-model="form.status"
                                                    prepend-icon="mdi mdi-list-status"
                                                    :items="source_status"
                                                    label="Status *" dense
                                                    :rules="rules.status">
                                                </v-select>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col>
                                                <v-textarea v-model="form.note"
                                                            label="Note Status *"
                                                            prepend-icon="mdi mdi-notebook-outline"
                                                            :rules="rules.note"
                                                            dense>
                                                </v-textarea>
                                            </v-col>
                                        </v-row>
                                    </template>
                                    
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-row  class="pa-2">
                                        <v-col>Specifications</v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <v-select v-model="form.brand.id"
                                                        prepend-icon="mdi-sitemap"
                                                        :items="brand_list"
                                                        item-text="name"
                                                        item-value="id"
                                                        label="Brand Name *"
                                                        clearable
                                                        @change="selectedBrand()"
                                                        :rules="rules.brand"
                                                        dense>
                                            </v-select>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <v-text-field id="type"
                                                            name="type"
                                                            v-model="form.type"
                                                            label="Type *"
                                                            prepend-icon="mdi-format-text"
                                                            :rules="rules.type"
                                                            dense>
                                            </v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <v-select v-model="form.ram.id"
                                                        prepend-icon="mdi-sitemap"
                                                        :items="ram_list"
                                                        item-text="capacity"
                                                        item-value="id"
                                                        label="RAM *"
                                                        clearable
                                                        @change="selectedRam()"
                                                        :rules="rules.ram"
                                                        dense>
                                            </v-select>
                                        </v-col>
                                        <v-col>
                                            <v-select v-model="form.storage.id"
                                                        prepend-icon="mdi-sitemap"
                                                        :items="storage_list"
                                                        item-text="capacity"
                                                        item-value="id"
                                                        label="Storage *"
                                                        clearable
                                                        @change="selectedStorage()"
                                                        :rules="rules.storage"
                                                        dense>
                                            </v-select>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <v-textarea id="description"
                                                        name="description"
                                                        v-model="form.description"
                                                        label="Description *"
                                                        placeholder="Example : 
                                                        Processor Core i7 3.0Ghz 
                                                        14 Inch Screen"
                                                        prepend-icon="mdi-format-text"
                                                        :rules="rules.description" dense>
                                            </v-textarea>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                    <v-divider />
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" outlined @click="$router.push({ name: `laptopassets`})" :disabled="events.loading">
                            Back
                        </v-btn>
                        <v-btn color="primary" @click="doSave()" :disabled="events.loading || events.submit">
                            <v-icon v-if="events.loading || events.submit" class="mdi mdi-spin">mdi-loading</v-icon>
                            {{!events.loading || !events.submit ? 'Submit' : 'Loading'}}
                        </v-btn>
                        <v-btn :color="form.recordStatus == 'Active' ? 'error' : 'success'" v-if="form_mode=='update'" @click="modalStatus = true, events.status = true" :disabled="events.loading || events.status">
                            <v-icon v-if="events.loading || events.status" class="mdi mdi-spin">mdi-loading</v-icon>
                            {{ form.recordStatus == "Active" ? "De-Actived" : "Actived"}}
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>

        <v-row v-if="source_history != null && source_history.length > 0">
            <v-col cols="12" xs="12">
                <v-card :loading="events.loading">
                    <v-card-text>
                        <v-col cols="12" sm="6">
                            <v-row>
                                <v-col>History</v-col>
                            </v-row>
                        </v-col>
                    </v-card-text>

                    <v-card-subtitle>
                        <v-row v-for="item in source_history" :key="item.id" >
                            <v-col cols="12" sm="12" :align-self="'center'" class="pb-0 pt-0">
                                <v-icon color="rgb(38, 198, 218)" >mdi mdi-chevron-double-right</v-icon> {{ formatDate(item.createdAt,'datetime') }}&emsp;{{ item.notes }}
                                <v-chip v-if="item.status == 'Available'" class="ma-2" color="success" outlined x-small> {{ item.status }} <v-icon right x-small>mdi mdi-laptop</v-icon></v-chip>
                                <v-chip v-if="item.status == 'Borrowed'" class="ma-2" color="primary" outlined x-small> {{ item.status }} <v-icon right x-small>mdi mdi-laptop</v-icon></v-chip>
                                <v-chip v-if="item.status == 'Broken'" class="ma-2" color="red darken-1" outlined x-small> {{ item.status }} <v-icon right x-small>mdi mdi-laptop</v-icon></v-chip>
                            </v-col>
                        </v-row>
                    </v-card-subtitle>
                    
                </v-card>
            </v-col>
        </v-row>


        <v-dialog v-model="modalStatus" max-width="500" persistent>
            <v-card>
                <v-card-title class="text-h7">
                    Warning
                </v-card-title>
                <v-divider />
                <v-card-text class="text-md-body-1">
                    {{ form.recordStatus == "Active" ? "Are you sure want to de-actived this item?" : "Are you sure want to actived this item?"}}
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" outlined @click="modalStatus = false, events.status = false">
                        Cancel
                    </v-btn>
                    <v-btn color="error" @click="doChangeStatus">
                        Submit
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
       
<script>
    // Services
    import { createLaptopAssets, getLaptopAssetsDetail, updateLaptopAssets, getLaptopAssetsHistory } from "@/services/laptopassets";
    import { getBrandAll } from '@/services/brand';
    import { getLocationAll } from '@/services/location';
    import { getRamAll } from '@/services/ram';
    import { getStorageAll } from '@/services/storage';

    //utils
    import errorMessage from "@/utils/notify-error";
    import formatDate from "@/utils/format-date";

    export default {
        name: "VueLaptopAssetsForm",
        data() {
            return {
                form: {
                            assetNumber: null,
                            createdBy: null,
                            updatedBy: null,
                            brand: {},
                            location: {},
                            ram: {},
                            storage: {},
                            status: null,
                            note: null,
                },
                rules: {
                            assetNumber: [ v => !!v || 'Asset Number is required' ],
                            brand: [ v => !!v || 'Brand is required' ],
                            type: [ v => !!v || 'Type is required' ],
                            location: [ v => !!v || 'Location is required' ],
                            ram: [ v => !!v || 'RAM is required' ],
                            storage: [ v => !!v || 'Storage is required' ],
                            description: [ v => !!v || 'Description is required' ],
                            note: [ v => !!v || 'Note status is required' ],
                },
                events: {
                    loading: true,
                    submit: false,
                    status: false,
                },
                form_submit: {},
                loading: false,
                form_mode: null,
                form_error: false,
                modalStatus: false,
                brand_list: [],
                location_list: [],
                ram_list: [],
                storage_list: [],
                source_status: ['Available', 'Borrowed', 'Broken', 'Return'],
                source_history: [],
            }
        },
        mounted() {
            if (this.$route.params.id) {
                this.form_mode = 'update';
                this.doGetLaptopAssetsDetail();
                this.doGetBrand();
                this.doGetLocation();
                this.doGetRam();
                this.doGetStorage();
                this.doGetHistory();
            }
            else {
                this.form_mode = 'create';
                this.events.loading = false;
                this.doGetBrand();
                this.doGetLocation();
                this.doGetRam();
                this.doGetStorage();
            }
        },
        methods:{
            formatDate,
            doGetLaptopAssetsDetail() {
                this.events.loading = true;
                getLaptopAssetsDetail(this.$route.params.id)
                    .then((response) => {
                        this.events.loading = false;
                        this.form = response;
                        this.form.note = null;
                    }).catch((error) => {
                        this.events.loading = false;
                        errorMessage(error);
                    })
            },
            doGetBrand() {
                this.events.loading = true;
                getBrandAll()
                    .then((response) => {
                        this.events.loading = false;
                        this.brand_list = response.items;
                }).catch((error) =>{
                    this.events.loading = false;
                    errorMessage(error);
                })
            },
            selectedBrand() {
                const source = [...this.brand_list].find((item) => {
                    return item.id === this.form.brand.id;
                });
                if (!source || typeof source === undefined) {
                    this.form.brand.id = null;
                    this.form.brand.name = null;
                    return;
                }
                this.form.brand.id = source.id;
                this.form.brand.name = source.name;
            },
            doGetLocation() {
                this.events.loading = true;
                getLocationAll()
                    .then((response) => {
                        this.events.loading = false;
                        this.location_list = response.items;
                }).catch((error) =>{
                    this.events.loading = false;
                    errorMessage(error);
                })
            },
            selectedLocation() {
                const source = [...this.location_list].find((item) => {
                    return item.id === this.form.location.id;
                });
                if (!source || typeof source === undefined) {
                    this.form.location.id = null;
                    this.form.location.name = null;
                    return;
                }
                this.form.location.id = source.id;
                this.form.location.name = source.name;
            },
            doGetRam() {
                this.events.loading = true;
                getRamAll()
                    .then((response) => {
                        this.events.loading = false;
                        this.ram_list = response.items;
                }).catch((error) =>{
                    this.events.loading = false;
                    errorMessage(error);
                })
            },
            selectedRam() {
                const source = [...this.ram_list].find((item) => {
                    return item.id === this.form.ram.id;
                });
                if (!source || typeof source === undefined) {
                    this.form.ram.id = null;
                    this.form.ram.name = null;
                    return;
                }
                this.form.ram.id = source.id;
                this.form.ram.name = source.capacity;
            },
            doGetStorage() {
                this.events.loading = true;
                getStorageAll()
                    .then((response) => {
                        this.events.loading = false;
                        this.storage_list = response.items;
                }).catch((error) =>{
                    this.events.loading = false;
                    errorMessage(error);
                })
            },
            doGetHistory(){
                this.events.loading = true;
                getLaptopAssetsHistory(this.$route.params.id)
                .then((response) => {
                    this.events.loading = false;
                    this.source_history = response.items;
                }).catch((error) =>{
                    this.events.loading = false;
                    errorMessage(error);
                })
            },
            selectedStorage() {
                const source = [...this.storage_list].find((item) => {
                    return item.id === this.form.storage.id;
                });
                if (!source || typeof source === undefined) {
                    this.form.storage.id = null;
                    this.form.storage.name = null;
                    return;
                }
                this.form.storage.id = source.id;
                this.form.storage.name = source.capacity;
            },
            async doSave() {
                if (!this.$refs.form.validate()) return false;
                this.form_submit = { ...this.form };
                // this.form_submit.role_menus = this.form.role_menus;
                if (this.form_mode == 'update') {
                    this.form_submit.updatedBy = JSON.parse(localStorage.getItem("user")).id;
                    this.doUpdate();
                }
                else {
                    this.form_submit.createdBy = JSON.parse(localStorage.getItem("user")).id;
                    this.doCreate();
                }
            },
            async doCreate() {
                this.events.loading = true;
                await createLaptopAssets(this.form_submit)
                    .then(() => {
                        setTimeout(() => {
                            this.events.submit = false;
                            this.saveSuccess();
                        }, 2000);
                    }).catch((error) => {
                        this.events.loading = false;
                        this.events.submit = false;
                        errorMessage(error);
                    })
            },
            async doUpdate() {
                this.events.loading = true;
                let payload = {...this.form_submit, id : this.$route.params.id}
                await updateLaptopAssets(payload)
                    .then(() => {
                        setTimeout(() => {
                            this.events.submit = false;
                            this.saveSuccess();
                        }, 2000);
                    }).catch((error) => {
                        this.events.loading = false;
                        this.events.submit = false;
                        errorMessage(error);
                    })
            },
            async doChangeStatus() {
                this.events.loading = true;
                
                let newData = this.form;
                newData.recordStatus = this.form.recordStatus == "Active" ? "Inactive" : "Active";
                newData.updatedBy = JSON.parse(localStorage.getItem("user")).id;

                let payload = {...newData, id : this.$route.params.id}
               
                console.log('doChangeStatus => payload', payload);
                // await updateLaptopAssets(payload)
                //     .then(() => {
                //         setTimeout(() => {
                //             this.events.status = false;
                //             this.saveSuccess();
                //         }, 2000);
                //     }).catch((error) => {
                //         this.events.loading = false;
                //         this.events.status = false;
                //         errorMessage(error);
                //     })
            },
            saveSuccess() {
                this.loading = false;
                this.$notify({
                    title: "Successful",
                    content: "Laptop Assets already saved!",
                    color: "rgb(0, 200, 83)",
                });
                this.$router.push({ name: `laptopassets` });
            }
        }
    }
</script>