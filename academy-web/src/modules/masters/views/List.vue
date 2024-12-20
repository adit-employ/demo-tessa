<template>
  <div class="row row--dense">
    
    <xa-card1 title="Technology" desc="Features" to="technology"></xa-card1>
    <xa-card1 title="Location" desc="Features" to="location"></xa-card1>
    <xa-card1 title="Email Report" desc="Features" to="emailreport"></xa-card1>
    <xa-card1 title="Email BAST" desc="Features" to="emailbast"></xa-card1>
    <xa-card1 title="Brand" desc="Features" to="brand"></xa-card1>
    <xa-card1 title="Grade" desc="Features" to="grade"></xa-card1>
    <xa-card1 title="Ram" desc="Features" to="ram"></xa-card1>
    <xa-card1 title="Storage" desc="Features" to="storage"></xa-card1>
    <xa-card1 title="Assessment Classroom" desc="Features" to="assessmentclassroom"></xa-card1>
    <xa-card1 title="Assessment Filtering Test 1" desc="Features" to="assessmentfilteringtest"></xa-card1>
  
  </div>
</template>

<script>
import XaCard1 from "@/components/xa/card1";

export default {
  name: "VueListMaster",
  components: {
    XaCard1
  },
  mounted() {},
  methods: {
  },
};
</script>
