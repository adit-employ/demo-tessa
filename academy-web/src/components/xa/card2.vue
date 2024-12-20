<template>
    <v-card class="my-10 pt-1 pl-1 pr-1" max-width="300" >
        <template slot="progress">
            <v-progress-linear
            color="deep-purple" height="10"
            indeterminate
            ></v-progress-linear>
        </template>
        
        <v-img height="200" width="300" :src="require(`@/assets/images/${picture}`)" contain ></v-img>
        
        <v-card-title>{{ title }}</v-card-title>
        <v-card-text>
            <div>
                {{ desc }}
            </div>
        </v-card-text>
    </v-card>
</template>

<script>
           export default {
               name: "XaCard2",
               props: [
                      'title',
                      'desc',
                      'picture'
           ],
           };
       </script>
       