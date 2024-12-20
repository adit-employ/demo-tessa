<template>
  <v-card color="basil">
    
    <v-tabs
      v-model="tab"
      background-color="transparent"
      grow >

      <v-tab
        v-for="item in items"
        :key="item" >
        {{ item }}
      </v-tab>

    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in items" :key="item" >
        <v-card color="basil" flat >

            <v-card-text v-if="item == 'PROFILE'">
              <div v-for="(value, key ) in profile" :key="value">
                <div><small>{{key}}</small></div>
                <div class="font-weight-normal"> <strong>{{value}}</strong></div>
                <p></p>
              </div>
              
            </v-card-text>

          <v-card-text v-if="item == 'KPI ASSIGNED'">
            <v-expansion-panels >
              <v-expansion-panel v-for="(value1) in kpiAssigned" :key="value1" >

                <v-expansion-panel-header>
                  <v-row >
                    <v-col v-for="(value2) in value1" :key="value2">{{ value2 }}</v-col>
                  </v-row>
                </v-expansion-panel-header>

                <v-expansion-panel-content>
                  <v-divider></v-divider>
                  <v-row >
                    <v-col v-for="(value2, key2 ) in value1" :key="value2">
                      <div >
                        <div><small>{{key2}}</small></div>
                        <div><strong>{{value2}}</strong></div>
                      </div>
                    </v-col>
                  </v-row>
                  <v-divider></v-divider>
                  <v-col class="text-right">
                    <v-btn text color="warning" @click="goToProfileDetail()"> Details </v-btn>
                  </v-col>
                </v-expansion-panel-content>
                
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-text>

          <v-card-text v-if="item == 'KPI RESULT'">
            <v-expansion-panels >
              <v-expansion-panel v-for="(value1) in kpiResult" :key="value1" >

                <v-expansion-panel-header>
                  <v-row >
                    <v-col v-for="(value2) in value1" :key="value2">{{ value2 }}</v-col>
                  </v-row>
                </v-expansion-panel-header>

                <v-expansion-panel-content>
                  <v-divider></v-divider>
                  <v-row >
                    <v-col v-for="(value2, key2 ) in value1" :key="value2">
                      <div >
                        <div><small>{{key2}}</small></div>
                        <div><strong>{{value2}}</strong></div>
                      </div>
                    </v-col>
                  </v-row>
                  <v-divider></v-divider>
                  <v-col class="text-right">
                    <v-btn text color="warning" @click="goToProfileDetail()"> Details </v-btn>
                  </v-col>
                </v-expansion-panel-content>
                
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-text>

        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>

</template>
  
  <script>
  
  export default {
    name: "VueEmployeeProfile",
    components: {

    },
    data () {
      return {
        tab: null,
        items: [
          'PROFILE', 'KPI ASSIGNED', 'KPI RESULT',
        ],
        profile: {
          "Employee ID":"XMU0111",
          "NIK":"09839289398898",
          "Name":"Aditya",
          "Gender":"Male",
          "Birth Date":"15 Agustus 1990",
          "Employee Status":"Permanent",
          "Join Date":"17 Desember 2017",
          "PTKP Status":"K0",
          "BLood Type":"O",
          "Region":"Islam"
        },
        kpiAssigned:[
          {"Name":"Aditya", "Position":"Technical Competency Counsellor", "Year":2022, "Updated by":"Catherina"},
          {"Name":"Aditya", "Position":"Technical Competency Counsellor", "Year":2023, "Updated by":"Catherina"},
          {"Name":"Aditya", "Position":"Technical Competency Counsellor", "Year":2024, "Updated by":"Catherina"},
        ],
        kpiResult:[
          {"Name":"Aditya", "Position":"Technical Competency Counsellor", "Year":2022, "Score":"28.45%"},
          {"Name":"Aditya", "Position":"Technical Competency Counsellor", "Year":2023, "Score":"67.89%"},
          {"Name":"Aditya", "Position":"Technical Competency Counsellor", "Year":2024, "Score":"59.12%"},
        ],
          
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      }
    },
    mounted() {},
    methods: {
      goToProfileDetail() {
        this.$router.push({
            name: "employeeprofiledetail"
        });
      },
    },
  };
  </script>
  