<template>
           <div class="col-sm-6 col-lg-3 col-12" >
           <div class="overflow-hidden v-sheet v-sheet--outlined theme--light rounded" 
                      min-height="61" style="min-height: 61px;">
                      <a @click="clikCard( to )"  tabindex="0"
                                 class="v-list-item v-list-item--link theme--light" >
                                 <div class="v-list-item__icon">
                                            <v-icon>mdi-monitor-dashboard</v-icon>
                                 </div>
                                 <div class="v-list-item__content">
                                            <div class="v-list-item__title">{{ title }}</div>
                                            <div class="v-list-item__subtitle">{{ desc }}</div>
                                 </div>
                      </a>
           </div>
     </div>
</template>
       
       <script>
           export default {
               name: "XaCard1",
               props: [
                      'title',
                      'desc',
                      'to'
           ],
           methods:{
                      clikCard(to) {
                                 this.$router.push({
                                            name: to
                                 });
                      },
                      }
           };
       </script>
       