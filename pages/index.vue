<template>

  <div 
    id="mainIndexPage"
    >
    <!-- :class="`${ onlyIframe ? 'iframe' : '' }`" -->

    <!-- NAVBAR -->
    <Navbar 
      v-if="has_navbar && !onlyIframe"
    ></Navbar>

    <!-- BANNER -->
    <DynamicBanner 
      v-if="has_banner && !onlyIframe"
      :dynamicTemplate="localRouteConfig.dynamic_template"
    ></DynamicBanner> 

    <!-- TABS -->
    <DynamicTabs 
      v-if="has_tabs"
      :skipNavbar="has_navbar"
      :tabsUri="localRouteConfig.tabs_uri"
    ></DynamicTabs> 


    <!-- REMOTE STATICS -->
    <DynamicStatic 
      v-if="localRouteConfig.dynamic_template == 'DynamicStatic' "
    ></DynamicStatic>

    <!-- LOCAL TEST STATIC -->
    <!-- <DynamicStaticTest 
      v-if="localRouteConfig.dynamic_template == 'DynamicStaticTest' "
    ></DynamicStaticTest> -->


    <!-- DATA VISUALISATION -->
    <DynamicTable 
      v-if="localRouteConfig.dynamic_template == 'DynamicTable' "
      :routeConfig="localRouteConfig"
      :endPointConfig="localEndpointConfig"
      :filtersConfig="localFiltersConfig"
    ></DynamicTable>

    <DynamicList 
      v-if="localRouteConfig.dynamic_template == 'DynamicList' "
      :routeConfig="localRouteConfig"
      :endPointConfig="localEndpointConfig"
      :filtersConfig="localFiltersConfig"
    ></DynamicList>

    <DynamicMap 
      v-if="localRouteConfig.dynamic_template == 'DynamicMap' "
      :routeConfig="localRouteConfig"
      :endPointConfig="localEndpointConfig"
      :filtersConfig="localFiltersConfig"
    ></DynamicMap>

    <DynamicDetail 
      v-if="localRouteConfig.dynamic_template == 'DynamicDetail' "
      :routeConfig="localRouteConfig"
      :endPointConfig="localEndpointConfig"
    ></DynamicDetail>

    <DynamicStats 
      v-if="localRouteConfig.dynamic_template == 'DynamicStats' "
      :routeConfig="localRouteConfig"
      :endPointConfig="localEndpointConfig"
    ></DynamicStats>

    <DynamicCalendar 
      v-if="localRouteConfig.dynamic_template == 'DynamicCalendar' "
      :routeConfig="localRouteConfig"
      :endPointConfig="localEndpointConfig"
      :filtersConfig="localFiltersConfig"
    ></DynamicCalendar>

    <!-- <span class="is-primary is-primary-c"> 
      COLOR TEST 
    </span> -->
<!-- 
    <div>
      breakpoint : <code>{{ breakpoint }}</code>
    </div> -->

    <!-- FOOTERS -->
    <Footer 
      v-if="has_footer && !onlyIframe"
    ></Footer>

    <!-- PROJECT's PARTNERS FOOTER -->
    <DynamicStaticRaw 
      v-if="has_credits_footer && !onlyIframe"
      :templateURL="footerConfig.credits_footer_url"
    ></DynamicStaticRaw>

    <!-- DEBUGGING -->
    <!-- <section class="container"> -->
      <!-- <div class="container"> -->

        <!-- <br><br><br> -->

        <!-- <hr> -->
        <!-- <div> -->

          <!-- (console) log : <code>{{ log }}</code><br> -->
          <!-- runMode : <code>{{ runMode }}</code><br> -->
          <!-- apivizFrontUUID : <code>{{ apivizFrontUUID }}</code><br> -->
          <!-- rootUrlBackend : <code>{{ rootUrlBackend }}</code><br> -->
          <!-- rootUrlAuth : <code>{{ rootUrlAuth }}</code><br> -->
          <!-- locale : <code>{{ locale }}</code><br> -->
          <!-- <hr> -->
          <!-- has_navbar : <code>{{ has_navbar }}</code><br> -->
          <!-- globalConfig.app_logo : <br><code>{{ globalConfig.app_logo }}</code><br> -->
          <!-- has_banner : <code>{{ has_banner }}</code><br> -->
          <!-- <hr> -->
          <!-- navbarConfig : <br><code>{{ navbarConfig }}</code><br> -->
          <!-- navbarConfig.logo_to : <br><code>{{ navbarConfig.logo_to }}</code><br> -->
          <!-- navbarConfig.logo_to : <br><code>{{ navbarConfig.logo_to }}</code><br> -->
          <!-- config.socials.app_facebook : <br><code>{{ config.socials.app_facebook }}</code><br> -->
          <!-- localRouteConfig.field : <code>{{ localRouteConfig.field }}</code><br>  -->
          <!-- localRouteConfig.dynamic_template : <code>{{ localRouteConfig.dynamic_template }}</code><br>  -->
          <!-- localRouteConfig : <br><code>{{ localRouteConfig }}</code><br>  -->

          <!-- <hr> -->
          
          <!-- currentDatasetURI : <code>{{ currentDatasetURI }}</code><br>  -->
          <!-- localEndpointConfig : <code>{{ localEndpointConfig }}</code><br>  -->
          <!-- localFiltersConfig : <br><pre><code>{{ JSON.stringify(localFiltersConfig, null, 1) }}</code></pre><br>  -->

          <!-- <hr> -->
          
          <!-- datasetFilters : <br><pre><code>{{ JSON.stringify(datasetFilters, null, 1) }}</code></pre><br> -->
          
          <!-- filterDescriptions : <br><pre><code>{{ JSON.stringify(filterDescriptions, null, 1) }}</code></pre><br> -->
          <!-- search.dataset_uri : <code>{{ search.dataset_uri }}</code><br>  -->
          <!-- search.endpoint_type : <code>{{ search.endpoint_type }}</code><br>  -->
          <!-- search.endpoint : <br><pre><code>{{ JSON.stringify(search.endpoint, null, 1) }}</code></pre><br>  -->


          <!-- search.config : <br><pre><code>{{ JSON.stringify(search.config, null, 1) }}</code></pre><br> -->
          <!-- search.question : <br><pre><code>{{ JSON.stringify(search.question, null, 1) }}</code></pre><br> -->
          <!-- search.answer.result.total : <code>{{ search.answer.result ? search.answer.result.total : "nothing yet" }}</code><br> -->
          <!-- search.answer : <br><pre><code>{{ JSON.stringify(search.answer, null, 1) }}</code></pre><br> -->
          
          <!-- <hr> -->
          
          <!-- jwt : <br><code>{{ jwt }}</code><br> -->
          <!-- user : <br><code>{{ user }}</code><br> -->
          <!-- <hr> -->
          <!-- has_footer : <code>{{ has_footer }}</code><br> -->
          <!-- has_credits_footer : <code>{{ has_credits_footer }}</code><br> -->
          <!-- <hr> -->
          <!-- search : <br><code>{{ search }}</code><hr> -->
        <!-- </div> -->
      <!-- </div> -->
    <!-- </section> -->



  </div>
</template>

<script>

import { mapState, mapGetters } from 'vuex'

import Navbar from '~/components/dynamicUX/Navbar.vue'
import Footer from '~/components/dynamicUX/Footer.vue'

import DynamicTabs       from '~/components/dynamicUX/DynamicTabs.vue'

import DynamicBanner     from '~/components/dynamicUX/DynamicBanner.vue'
import DynamicStatic     from '~/components/dynamicUX/DynamicStatic.vue'
import DynamicStaticRaw  from '~/components/dynamicUX/DynamicStaticRaw.vue'
// import DynamicStaticTest from '~/components/dynamicUX/DynamicStaticTest.vue'

import DynamicTable      from '~/components/dynamicData/DynamicTable.vue';
import DynamicList       from '~/components/dynamicData/DynamicList.vue';
import DynamicDetail     from '~/components/dynamicData/DynamicDetail.vue';
import DynamicMap        from '~/components/dynamicData/DynamicMap.vue';
import DynamicStats      from '~/components/dynamicData/DynamicStats.vue';
import DynamicCalendar   from '~/components/dynamicData/DynamicCalendar.vue';

import { responsiveBreakpoint, findBulmaBreakpointByWidth } from "~/config/constants.js" 


export default {
  
  head(){ 
    
    let global = this.globalConfig

    return {
      title: global.app_title.content,
      // meta: [

      // ],
      link: [
        // { rel: 'icon', type: 'image/x-icon', href: global.app_favicon.url },
        { rel: 'icon', href: global.app_favicon.url, sizes: '32x32' },
      ],
    }
  },

  components: {

    Navbar, 
    Footer, 

    DynamicTabs,

    DynamicBanner,
    DynamicStatic, 
    DynamicStaticRaw,
    // DynamicStaticTest,

    DynamicTable,
    DynamicList, 
    DynamicDetail,
    DynamicMap, 
    DynamicStats,
    DynamicCalendar,

  },

  middleware : [
    // 'getRouteConfig',
  ],

  // created() {
  //   window.addEventListener("resize", this.winBreakpoint)
  //   this.winBreakpoint()
  // },

  // destroyed() {
  //   window.removeEventListener("resize", this.winBreakpoint)
  // },


  beforeMount : function(){
    // this.log && console.log('\nP-index.vue / beforeMount...')
    // this.log && console.log('P-index.vue / beforeMount / this.globalConfig : ', this.globalConfig)
    // this.log && console.log('P-index.vue / beforeMount / this.localRouteConfig : ', this.localRouteConfig)

    // this.log && console.log(" - - DynamicDetail / mounted / this.$nuxt.$route : ", this.$nuxt.$route )
    if (this.$nuxt.$route.query.iframing) {
      this.onlyIframe = true
    }

  },

  data () {
    return {
      // windowBreakpoint : undefined,
      onlyIframe : false,
    }
  },

  computed: {

    ...mapState({

      log : state => state.log, 

      apivizFrontUUID : state => state.apivizFrontUUID,
      runMode : state => state.runMode,
      rootUrlBackend : state => state.rootUrlBackend,
      rootUrlAuth : state => state.rootUrlAuth,
      locale : state => state.locale,

      breakpoint : state => state.breakpoint,

      // config : state => state.config.config,
      localRouteConfig : state => state.config.localRouteConfig,
      // globalConfig : state => state.config.global,

      search : state => state.search.search,
      filterDescriptions : state => state.search.filterDescriptions,
      datasetFilters : state => state.search.datasetFilters,

      user : state => state.user.user,
      jwt : state => state.user.jwt

    }),

    ...mapGetters({

      globalConfig : 'config/getGlobalConfig',

      localEndpointConfig : 'config/getLocalEndpointConfig',
      localFiltersConfig : 'config/getLocalFiltersConfig',
      currentDatasetURI : 'config/getCurrentDatasetURI',

      footerConfig : 'config/getFooterConfig',

      has_navbar : 'config/hasNavbar',
      has_footer : 'config/hasFooter',
      has_credits_footer : 'config/hasCreditsFooter',
      has_banner : 'config/hasBanner',
      has_tabs : 'config/hasTabs',

    }),

    // winBreakpoint() {
    //   var w = window.innerWidth
    //   return findBulmaBreakpointByWidth(w)
    // },

  },

  methods: {

    // winWidth() {
    //   var w = window.innerWidth
    //   if (w < responsiveBreakpoint) {
    //     this.smallButtons = true
    //   } else {
    //     this.smallButtons = false
    //   }
    // },

    // winBreakpoint() {
    //   var w = window.innerWidth
    //   let breakpoint = findBulmaBreakpointByWidth(w)
    //   // this.windowBreakpoint = breakpoint
    //   this.$store.commit('setBreakpoint', breakpoint)
    // },


  }

}
</script>

<style>

</style>
