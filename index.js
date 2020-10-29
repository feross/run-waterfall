/*! run-waterfall. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
module.exports = runWaterfall

function runWaterfall (tasks, cb) {
  let current = 0
  let isSync = true

  function done (err, args) {
    function end () {
      args = args ? [].concat(err, args) : [err]
      if (cb) cb.apply(undefined, args)
    }
    if (isSync) process.nextTick(end)
    else end()
  }

  function each (err) {
    const args = Array.prototype.slice.call(arguments, 1)
    if (++current >= tasks.length || err) {
      done(err, args)
    } else {
      tasks[current].apply(undefined, [].concat(args, each))
    }
  }

  if (tasks.length) {
    tasks[0](each)
  } else {
    done(null)
  }

  isSync = false
}
