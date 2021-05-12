// 将list转成tree，使用前注意把array进行深拷贝
export function listToTreeSelect(array, parent, tree) {
  tree = typeof tree !== 'undefined' ? tree : []
  parent =
    typeof parent !== 'undefined' ?
    parent : {
      id: null
    }
  var children = array.filter((val, index) => {
    if (val.parentId === 0 || val.parentId === '0') {
      val.parentId = null
    }
    return val.parentId === parent.id
  })

  if (children.length > 0) {
    if (parent.id === null || parent.id === 0) {
      tree = children
    } else {
      parent['children'] = children
    }

    children.forEach((val, index) => {
      listToTreeSelect(array, val)
    })
  }

  return tree
}
