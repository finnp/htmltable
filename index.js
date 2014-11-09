var Writable = require('stream').Writable


module.exports = function (parent) {
  if(typeof parent === 'string')
    parent = document.querySelector(parent)
  var totable = new Writable({objectMode: true})
  var table = document.createElement('table')
  var header = document.createElement('tr')
  table.appendChild(header)
  while (parent.firstChild) parent.removeChild(parent.firstChild)
  parent.appendChild(table)
  var keys = []
  totable._write = function (data, enc, cb) {
    processKeys(Object.keys(data))
    renderData(data)
    cb(null)
  }

  function processKeys(k) {
    k.forEach(function (key) {
      if(keys.indexOf(key) === -1) {
        keys.push(key)
        var rowHead = document.createElement('th')
        rowHead.appendChild(document.createTextNode(key))
        header.appendChild(rowHead)
      }
    })
  }
  
  function renderData(data) {
    var row = document.createElement('tr')
    keys.forEach(function (key) {
      var cell = document.createElement('td')
      var value
      if(data[key] === 0) value = '0'
      else value = data[key] || ''
      if (typeof value == 'object')
        value = JSON.stringify(value)
      cell.appendChild(document.createTextNode(value))
      row.appendChild(cell)
    })
    table.appendChild(row)
  }

  return totable
}
