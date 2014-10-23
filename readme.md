# htmltable

When converting an object stream into an HTML table, you have the problem that
you need to know all the keys in the beginning. However this would mean loading all
the data into memory before rendering.

This module is written for the browser and will update the head with javascript while
streaming the data.

Install it with `npm install htmltable` and use it with browserify. You can test
the module by running `npm run build` and open the `test.html` file.

## Usage

```js
var htmltable = require('htmltable')

var table = htmltable('#table')

table.write({a: 1})
window.setTimeout(function () {
  table.write({a: 2, b:1})
  table.end()
}, 1000)
```

where the body of the HTMl element contains:
```
<div id="table"></div>
```
it will eventually be
```
<div id="table">
<table>
  <thead>
    <tr>
      <th>a</th>
      <th>b</ah>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td></td>
    </tr>
    <tr>
      <td>2</td>
      <td>1</td>
    </tr>
  </tbody>
</table>
</div>
```

but you will be able to see the first row before the second comes in.