var dezalgo = require('dezalgo')

module.exports = function (tasks, cb) {
  var current = 0
  if (cb) cb = dezalgo(cb)

  function done (err) {
    var args = Array.prototype.slice.call(arguments, 1)
    if (++current >= tasks.length || err) {
      if (cb) cb.apply(undefined, [err].concat(args))
    } else {
      tasks[current].apply(undefined, args.concat(done))
    }
  }

  if (tasks.length) {
    tasks[0](done)
  } else {
    if (cb) cb(null)
  }
}
