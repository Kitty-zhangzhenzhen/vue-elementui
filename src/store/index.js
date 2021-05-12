import Vue from 'vue'
import vuex from 'vuex'

import AppStore from './modules/AppStore.js'
import MenuStore from './modules/MenuStore.js'
import TagsViews from './modules/tagsViews.js'

Vue.use(vuex)

const store = new vuex.Store({
  modules: {
    app: AppStore,
    menu: MenuStore,
    tagsViews: TagsViews
    // 其他
  }
})

export default store
