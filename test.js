var htmltable = require('./')


window.onload = function () {
  var table = htmltable('#table')

  table.write({a: 1})
  table.write({a: 0, b:1})
  table.write({a: null, b:undefined}) // empty row
  table.write({c: 3})
  window.setTimeout(function () {
    table.write({a: 2, d: 3})
    table.end()
  }, 1000)
}