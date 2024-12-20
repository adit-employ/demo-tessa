<template>
    <v-autocomplete v-model="selected"
                    :search-input.sync="search"
                    v-bind="{ ...$props }"
                    @input="onInput"
                    :prepend-icon="icon"
                    @change="onChange">
        <template v-slot:selection="data">
            <v-chip v-bind="data.attrs"
                    :input-value="data.selected"
                    close
                    @click="data.select"
                    @click:close="remove(data.item)">
                <v-avatar left color="orange">
                    <v-icon dark size="16">
                        mdi-door
                    </v-icon>
                </v-avatar>
                {{ data.item.name }}
            </v-chip>
        </template>
        <template v-slot:item="data">
            <template v-if="typeof data.item !== 'object'">
                <v-list-item-content v-text="data.item"></v-list-item-content>
            </template>
            <template v-else >
                <v-list-item-avatar color="orange">
                    <v-icon dark>
                        mdi-door
                    </v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title v-html="data.item.name"></v-list-item-title>
                    <v-list-item-subtitle>{{data.item.building.name}} - {{data.item.floor_name}}</v-list-item-subtitle>
                </v-list-item-content>
            </template>
        </template>
    </v-autocomplete>
</template>

<script>
    export default {
        name: "VueRoomSelection",
        data: () => ({
            selected: null,
            search: null,
        }),
        props: {
            value: {
                type: [String, Number, Array],
                default: null,
            },
            dense: {
                type: Boolean,
                default: false,
            },
            rules: {
                type: Array,
                default: () => [],
            },
            outlined: {
                type: Boolean,
                default: false,
            },
            placeholder: {
                type: String,
                default: "",
            },
            items: {
                type: Array,
                default: () => [],
            },
            appendIcon: {
                type: String,
                default: "",
            },
            hideDetails: {
                type: Boolean,
                default: false,
            },
            hideNoData: {
                type: Boolean,
                default: false,
            },
            hideSelected: {
                type: Boolean,
                default: true,
            },
            autoSelectFirst: {
                type: Boolean,
                default: false,
            },
            loading: {
                type: Boolean,
                default: false,
            },
            icon: {
                type: String,
                default: "",
            },
            itemText: {
                type: [String, Array],
                default: "",
            },
            itemValue: {
                type: [String, Array, Object],
                default: "",
            },
            label: {
                type: String,
                default: "",
            },
            clear: {
                type: Boolean,
                default: false,
            },
            clearable: {
                type: Boolean,
                default: true,
            },
            disabled: {
                type: Boolean,
                default: false,
            },
            multiple: {
                type: Boolean,
                default: false,
            },
            chips: {
                type: Boolean,
                default: false,
            },
            deletableChips: {
                type: Boolean,
                default: false,
            },
        },
        watch: {
            search(value) {
                if (value !== this.selected) this.$emit("search", value);
            },
            value(value) {
                this.selected = value;
                this.$emit("change");
            },
        },
        mounted() {
            this.selected = this.value;
        },
        methods: {
            onInput() {
                this.$emit("input", this.selected);
            },
            onChange() {
                this.search = null;
                this.$emit("change", this.selected);
            },
            removeValue() {
                this.selected = null;
                this.search = null;
                this.$emit("removeValue");
            },
            remove(item) {
                if (this.multiple) {
                    const index = this.selected.indexOf(item.primary_email)
                    if (index >= 0) this.selected.splice(index, 1)
                }
                else this.selected = null;
                
            },
        },
    };
</script>
