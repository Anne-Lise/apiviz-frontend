import axios from 'axios'

export const state = () => ({

  // CONSOLE LOG ALLOWED 
  log: process.env.ConsoleLog,

  // APIVIZ CONFIG
  config : {
    'global' : undefined,
    'styles' : undefined,
    'socials' : undefined,
    'footer' : undefined,
    'navbar' : undefined,
    'routes' : undefined,
    'tabs' : undefined,
    'endpoints' : undefined,
  },

  localRouteConfig : undefined,

  localEndpointConfig : undefined,
  localFiltersConfig : undefined,
  currentDatasetURI : undefined,

})

export const getters = {

  // APP CONFIG GETTERS
  // - - - - - - - - - - - - - - - //
    getConfig : state => {
      state.log && console.log( "... here comes the app config : \n", state.config )
      return state.config
    },
    getEndpointConfigAuthUsers : state => {
      // state.log && console.log("getEndpointConfigAuthUsers...")
      return state.config.endpoints.filter(function(r) {
        return r.data_type === "user"
      });
    },
    getEndpointConfigAuthSpecific : (state, getters) => (endpointType) => {
      state.log && console.log("getEndpointConfigAuthSpecific / endpointType : ", endpointType)
      let allAuthEndpoints =  getters.getEndpointConfigAuthUsers
      // state.log && console.log("getEndpointConfigAuthSpecific / allAuthEndpoints", allAuthEndpoints)
      return allAuthEndpoints.find(function(r) {
        return r.endpoint_type === endpointType
      });
    },

  // ROUTE CONFIG GETTERS
  // - - - - - - - - - - - - - - - //
    getCurrentRouteConfig : (state) => (currentRoute) => {
      try {
        return state.config.routes.find(function(r) {
          return r.urls.indexOf(currentRoute) !== -1;
        });
      } catch (e) {
        state.log && console.log('err',e);
        return undefined
      }
    },
    getLocalRouteConfig : state => {
      return state.localRouteConfig
    },

  // global-related
    getGlobalConfig : state => {
      return state.config.global
    },
    getAppLocales : state => {
      return (state.config.global) ? state.config.global.app_languages : 'fr' 
    },

  // styles-related 
    getStylesConfig : state => {
      return state.config.styles
    },

  // navbar-related 
    hasNavbar : (state) => {      
      // state.log && console.log('S-config-hasNavbar ... state.localRouteConfig : \n', state.localRouteConfig)
      return (state.localRouteConfig) ? state.localRouteConfig.has_navbar : false 
    },
    getNavbarConfig : state => {
      return (state.config.navbar) ? state.config.navbar.app_navbar : undefined 
    },
    getNavbarLogo : state => {
      return (state.config.global) ? state.config.global.app_logo : undefined 
    },
    getNavbarBrand : state => {
      return (state.config.global) ? state.config.global.app_title.content : undefined 
    },

  // footer-related
    hasFooter : (state) => {
      return (state.localRouteConfig) ? state.localRouteConfig.has_footer : false 
    },
    hasCreditsFooter : (state) => {
      // state.log && console.log('S-config-hasCreditsFooter ... state.localRouteConfig : \n', state.localRouteConfig)
      return (state.localRouteConfig.has_credits_footer) ? state.localRouteConfig.has_credits_footer : false 
    },
    getFooterConfig : state => {
      return (state.config.footer) ? state.config.footer.app_footer : undefined 
    },
    getSocialsConfig : state => {
      return state.config.socials
    },

  // banner-related
    hasBanner : state => {      
      // state.log && console.log('S-config-hasBanner ... state.localRouteConfig : \n', state.localRouteConfig)
      return (state.localRouteConfig) ? state.localRouteConfig.banner.activated : false 
    },
    getCurrentBanner : (state, getters) => {
      // state.log && console.log('S-config-getCurrentBanner ...')
      let bannersSet = getters.getStylesConfig.app_banners.banners_set
      const routeBannerUri = state.localRouteConfig.banner.banner_uri
      let resultSet = bannersSet.find(function(b) {
        return b.banner_uri == routeBannerUri
      })
      // state.log && console.log('S-config-getCurrentBanner ... resultSet : \n', resultSet)
      return resultSet
    },

  // ENDPOINTS CONFIG GETTERS
  // - - - - - - - - - - - - - - - //
    getEndpointConfig : (state, getters, rootState) => {
      // state.log && console.log("S-config-getEndpointConfig - state.config.endpoints : \n", state.config.endpoints)
      // state.log && console.log("S-config-getEndpointConfig - rootState.search : \n", rootState.search)
      return state.config.endpoints.find(function(r) {
        return r.endpoint_type === rootState.search.search.endpoint_type
        && r.dataset_uri === rootState.search.search.dataset_uri;
      });
    },
    getEndpointConfigFilters : (state, getters, rootState) => {
      // state.log && console.log("getEndpointConfigFilters - state.config.endpoints : \n", state.config.endpoints)
      return state.config.endpoints.find(function(r) {
        return r.endpoint_type === 'filters'
        && r.dataset_uri === rootState.search.search.dataset_uri;
      });
    },
    getEndpointConfigList : (state, getters, rootState) => {
      // state.log && console.log("getEndpointConfigList - state.config.endpoints : \n", state.config.endpoints)
      return state.config.endpoints.find(function(r) {
        return r.endpoint_type === 'list'
        && r.dataset_uri === rootState.search.search.dataset_uri;
      });
    },
    getEndpointConfigMap : (state, getters, rootState) => {
      // state.log && console.log("getEndpointConfigMap - state.config.endpoints : \n", state.config.endpoints)
      return state.config.endpoints.find(function(r) {
        return r.endpoint_type === 'map'
        && r.dataset_uri === rootState.search.search.dataset_uri;
      });
    },
    getEndpointConfigDetail : (state, getters, rootState) => {
      // state.log && console.log("getEndpointConfigDetail - state.config.endpoints : \n", state.config.endpoints)
      return state.config.endpoints.find(function(r) {
        return r.endpoint_type === 'detail'
        && r.dataset_uri === rootState.search.search.dataset_uri;
      });
    },
    getEndpointConfigStat : (state, getters, rootState) => {
      // state.log && console.log("getEndpointConfigStat - state.config.endpoints : \n", state.config.endpoints)
      return state.config.endpoints.find(function(r) {
        return r.endpoint_type === 'stat'
        && r.dataset_uri === rootState.search.search.dataset_uri;
      });
    },

    getLocalEndpointConfig : state => {
      return state.localEndpointConfig
    },
    getLocalFiltersConfig : state => {
      return state.localFiltersConfig
    },
    getCurrentDatasetURI : state => {
      return state.currentDatasetURI
    },

}

export const mutations = {

  setConfig(state, {type,result}) {
    // state.log && console.log("S-setConfig ... result : ", result)
    // state.log && console.log("result : ", result)
    state.config[type] = result
  },

  setLocalRouteConfig(state, routeConfig) {
    // state.log && console.log("S-config-setLocalRouteConfig...")
    state.localRouteConfig = routeConfig
    // state.log && console.log("S-config-setLocalRouteConfig / state.localRouteConfig : ", state.localRouteConfig)
  },

  setLocalEndpointConfig(state, localEndpointConfig) {
    // state.log && console.log("S-config-setLocalEndpointConfig...")
    state.localEndpointConfig = localEndpointConfig
  },

  setCurrentDatasetURI(state, currentDatasetURI) {
    // state.log && console.log("S-config-setCurrentDatasetURI...")
    state.currentDatasetURI = currentDatasetURI
  },

  setLocalFiltersConfig(state, localFiltersConfig) {
    // state.log && console.log("S-config-setLocalFiltersConfig...")
    state.localFiltersConfig = localFiltersConfig
  },

}

export const actions = {

  getConfigType({commit, state, getters, rootGetters},{type, configTypeEndpoint, args}) {
    state.log && console.log("getConfigType / type : ", type)
    const rootURLbackend = rootGetters['getRootUrlBackend']
    const apivizFrontUUID = rootGetters['getApivizFrontUUID']
    // return this.$axios.get(rootURLbackend+'/config/'+configTypeEndpoint+"?uuid="+apivizFrontUUID+args)
    return axios.get(rootURLbackend+'/config/'+configTypeEndpoint+"?uuid="+apivizFrontUUID+args)
    .then(response => {
      // state.log && console.log("\ngetConfigType / type : ", type)
      // state.log && console.log("getConfigType / response : ", response)
      let app_config = (response && response.data && response.data.app_config) ? response.data.app_config : undefined
      commit('setConfig', {type:type,result:app_config}); 
      return app_config
    })
    .catch( err => 
      console.log('there was an error trying to fetch some configuration file', err) 
    )
  },

  getConfigAll({dispatch}) {
    let arr = []
    arr.push(dispatch('getConfigType',{type:'global',    configTypeEndpoint:'global', args:''}) )
    arr.push(dispatch('getConfigType',{type:'styles',    configTypeEndpoint:'styles', args:''}) )
    arr.push(dispatch('getConfigType',{type:'socials',   configTypeEndpoint:'socials', args:''}) )
    arr.push(dispatch('getConfigType',{type:'footer',    configTypeEndpoint:'footer', args:''}) )
    arr.push(dispatch('getConfigType',{type:'navbar',    configTypeEndpoint:'navbar', args:''}) )
    arr.push(dispatch('getConfigType',{type:'routes',    configTypeEndpoint:'routes', args:'&as_list=true'}) )
    arr.push(dispatch('getConfigType',{type:'tabs',      configTypeEndpoint:'tabs', args:'&as_list=true'}) )
    arr.push(dispatch('getConfigType',{type:'endpoints', configTypeEndpoint:'endpoints', args:'&as_list=true'}) )
    return Promise.all(arr)
  },



}