import chartHeader from './components/chartHeader/chartHeader.vue'
import FlowGraph from './graph'
export default {
  name: 'Index',
  data () {
    return {
      graph: '',
      isSelecting: false,
      isPannable: false
    }
  },
  components: { chartHeader },
  methods: {
    switchChange (e) {
      this.isSelecting = e
      if (this.isSelecting) {
        this.graph.enableRubberband() // 框选开
        this.graph.disablePanning() // 拖拽关
        this.$refs.chartHeader.value2 = false
      } else {
        this.graph.disableRubberband()
      }
    },
    switchChange2 (e) {
      this.isPannable = e
      if (this.isPannable) {
        this.graph.enablePanning() // 拖拽开
        this.graph.disableRubberband() // 框选关
        this.$refs.chartHeader.value = false
      } else {
        this.graph.disablePanning()
      }
    }
  },
  mounted () {
    console.log(document.querySelector('.content').clientHeight)
    console.log(document.querySelector('#chartHeader').clientHeight)
    const graph = FlowGraph.init()
    graph.centerContent()
    this.graph = graph
  }
}
