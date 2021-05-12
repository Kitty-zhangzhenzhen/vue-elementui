import { Graph, Node, Path, Dom, FunctionExt, Addon, Shape } from '@antv/x6'
import graphData from './data'
import './shape'
const { Stencil } = Addon
export default class FlowGraph {
  static init () {
    this.graph = new Graph({
      container: document.getElementById('container'),
      width: '100%',
      height: document.querySelector('.content').clientHeight - (document.querySelector('#chartHeader').clientHeight + 25),
      background: {
        color: '#fffbe6' // 设置画布背景颜色
      },
      grid: {
        size: 10, // 网格大小 10px
        visible: true // 渲染网格背景
      },
      scroller: {
        enabled: true,
        pannable: false,
        pageVisible: true,
        pageBreak: false
      },
      mousewheel: {
        enabled: true,
        modifiers: ['ctrl', 'meta']
      },
      minimap: {
        enabled: true,
        container: document.getElementById('minimap'),
        width: '150',
        height: document.querySelector('.content').clientHeight - (document.querySelector('#chartHeader').clientHeight + 25),
        padding: 10
      },
      selecting: {
        enabled: true,
        rubberband: false, // 启用框选
        multiple: true,
        movable: true,
        showNodeSelectionBox: true
      },
      keyboard: {
        enabled: true
      },
      history: true,
      clipboard: {
        enabled: true
      },
      connecting: {
        anchor: 'center',
        connectionPoint: 'anchor',
        allowBlank: false,
        highlight: true,
        snap: true,
        createEdge () {
          return new Shape.Edge({
            attrs: {
              line: {
                stroke: '#5F95FF',
                strokeWidth: 1,
                targetMarker: {
                  name: 'classic',
                  size: 8
                }
              }
            },
            router: {
              name: 'manhattan'
            },
            zIndex: 0
          })
        },
        validateConnection ({
          sourceView,
          targetView,
          sourceMagnet,
          targetMagnet
        }) {
          if (sourceView === targetView) {
            return false
          }
          if (!sourceMagnet) {
            return false
          }
          if (!targetMagnet) {
            return false
          }
          return true
        }
        // validateMagnet ({ magnet }) {
        //   return magnet.getAttribute('port-group') !== 'in'
        // },
        // validateConnection ({ sourceView, targetView, sourceMagnet, targetMagnet }) {
        //   // 只能从输出链接桩创建连接
        //   if (!sourceMagnet || sourceMagnet.getAttribute('port-group') === 'in') {
        //     return false
        //   }

        //   // 只能连接到输入链接桩
        //   if (!targetMagnet || targetMagnet.getAttribute('port-group') !== 'in') {
        //     return false
        //   }

        //   // 判断目标链接桩是否可连接
        //   const portId = !targetMagnet.getAttribute('port')
        //   const node = targetView.cell
        //   const port = node.getPort(portId)
        //   if (port && port.connected) {
        //     return false
        //   }

        //   return true
        // }
      }
    })
    this.initStencil()
    this.initShape()
    this.initGraphShape()
    // this.initGraphNode()
    this.initEvent()
    return this.graph
  }

  static initStencil () {
    this.stencil = new Stencil({
      title: 'Components',
      target: this.graph,
      search (cell, keyword) {
        return cell.shape.indexOf(keyword) !== -1
      },
      placeholder: 'Search by shape name',
      notFoundText: 'Not Found',
      collapsable: true,
      stencilGraphWidth: 280,
      stencilGraphHeight: 180,
      groups: [
        {
          name: 'group1',
          title: '基础节点'
        },
        {
          name: 'group2',
          title: '组合节点',
          layoutOptions: {
            columns: 1,
            marginX: 60
          },
          graphHeight: 260
        },
        {
          name: 'group3',
          title: '节点组'
        }
      ]
    })
    document.getElementById('stencil').appendChild(this.stencil.container)
  }
  static initShape () {
    const { graph } = this
    const r1 = graph.createNode({
      shape: 'flow-chart-rect',
      attrs: {
        body: {
          rx: 24,
          ry: 24
        },
        text: {
          textWrap: {
            text: '起始节点'
          }
        }
      }
    })
    const r2 = graph.createNode({
      shape: 'flow-chart-rect',
      attrs: {
        text: {
          textWrap: {
            text: '流程节点'
          }
        }
      }
    })
    const r3 = graph.createNode({
      shape: 'flow-chart-rect',
      width: 52,
      height: 52,
      angle: 45,
      attrs: {
        'edit-text': {
          style: {
            transform: 'rotate(-45deg)'
          }
        },
        text: {
          textWrap: {
            text: '判断节点'
          },
          transform: 'rotate(-45deg)'
        }
      },
      ports: {
        groups: {
          top: {
            position: {
              name: 'top',
              args: {
                dx: -26
              }
            }
          },
          right: {
            position: {
              name: 'right',
              args: {
                dy: -26
              }
            }
          },
          bottom: {
            position: {
              name: 'bottom',
              args: {
                dx: 26
              }
            }
          },
          left: {
            position: {
              name: 'left',
              args: {
                dy: 26
              }
            }
          }
        }
      }
    })
    const r4 = graph.createNode({
      shape: 'flow-chart-rect',
      width: 70,
      height: 70,
      attrs: {
        body: {
          rx: 35,
          ry: 35
        },
        text: {
          textWrap: {
            text: '链接节点'
          }
        }
      }
    })

    const c1 = graph.createNode({
      shape: 'flow-chart-image-rect'
    })
    const c2 = graph.createNode({
      shape: 'flow-chart-title-rect'
    })
    const c3 = graph.createNode({
      shape: 'flow-chart-animate-text'
    })

    // const g1 = graph.createNode({
    //   shape: 'flowGroupNode',
    //   attrs: {
    //     text: {
    //       text: 'Group Name'
    //     }
    //   },
    //   data: {
    //     parent: true
    //   }
    // })
    this.stencil.load([r1, r2, r3, r4], 'group1')
    this.stencil.load([c1, c2, c3], 'group2')
    // this.stencil.load([g1], 'group')
  }
  static initGraphShape () {
    this.graph.fromJSON(graphData)
  }
  static initGraphNode () {
    const source = this.graph.addNode({
      x: 200,
      y: 50,
      width: 160,
      height: 30,
      label: 'SQL',
      ports: {
        groups: {
          // 输入链接桩群组定义
          in: {
            position: 'top',
            attrs: {
              circle: {
                r: 6,
                magnet: true,
                stroke: '#31d0c6',
                strokeWidth: 2,
                fill: '#fff'
              }
            }
          },
          // 输出链接桩群组定义
          out: {
            position: 'bottom',
            attrs: {
              circle: {
                r: 6,
                magnet: true,
                stroke: '#31d0c6',
                strokeWidth: 2,
                fill: '#fff'
              }
            }
          }
        },
        items: [
          {
            id: 'port1',
            group: 'in'
          },
          {
            id: 'port2',
            group: 'in'
          },
          {
            id: 'port5',
            group: 'out'
          }
        ]
      }
    })

    const target = this.graph.addNode({
      x: 120,
      y: 260,
      width: 160,
      height: 30,
      label: '序列化',
      ports: {
        groups: {
          // 输入链接桩群组定义
          in: {
            position: 'top',
            attrs: {
              circle: {
                r: 6,
                magnet: true,
                stroke: '#31d0c6',
                strokeWidth: 2,
                fill: '#fff'
              }
            }
          },
          // 输出链接桩群组定义
          out: {
            position: 'bottom',
            attrs: {
              circle: {
                r: 6,
                magnet: true,
                stroke: '#31d0c6',
                strokeWidth: 2,
                fill: '#fff'
              }
            }
          }
        },
        items: [
          {
            id: 'port1',
            group: 'in'
          },
          {
            id: 'port2',
            group: 'in'
          },
          {
            id: 'port5',
            group: 'out'
          }
        ]
      }
    })

    this.graph.addEdge({
      source: { cell: source, port: 'in1' },
      target: { cell: target, port: 'in1' }
    })
  }

  static showPorts (ports, show) {
    for (let i = 0, len = ports.length; i < len; i = i + 1) {
      ports[i].style.visibility = show ? 'visible' : 'hidden'
    }
  }

  static initEvent () {
    const { graph } = this
    const container = document.getElementById('container')

    graph.on('node:contextmenu', ({ cell, view }) => {
      const oldText = cell.attr('text/textWrap/text')
      const elem = view.container.querySelector('.x6-edit-text')
      if (elem == null) {
        return
      }
      cell.attr('text/style/display', 'none')
      if (elem) {
        elem.style.display = ''
        elem.contentEditable = 'true'
        elem.innerText = oldText
        elem.focus()
      }
      const onBlur = () => {
        cell.attr('text/textWrap/text', elem.innerText)
        cell.attr('text/style/display', '')
        elem.style.display = 'none'
        elem.contentEditable = 'false'
      }
      elem.addEventListener('blur', () => {
        onBlur()
        elem.removeEventListener('blur', onBlur)
      })
    })
    graph.on(
      'node:mouseenter',
      FunctionExt.debounce(() => {
        const ports = container.querySelectorAll('.x6-port-body')
        this.showPorts(ports, true)
      }),
      500
    )
    graph.on('node:mouseleave', () => {
      const ports = container.querySelectorAll('.x6-port-body')
      this.showPorts(ports, false)
    })

    graph.on('node:collapse', ({ node, e }) => {
      e.stopPropagation()
      node.toggleCollapse()
      const collapsed = node.isCollapsed()
      const cells = node.getDescendants()
      cells.forEach(n => {
        if (collapsed) {
          n.hide()
        } else {
          n.show()
        }
      })
    })

    graph.bindKey('backspace', () => {
      const cells = graph.getSelectedCells()
      if (cells.length) {
        graph.removeCells(cells)
      }
    })
  }

  // 销毁
  static destroy () {
    this.graph.dispose()
  }
}
