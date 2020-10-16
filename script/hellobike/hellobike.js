const HELLO_BIKE = init()
const TASK_NAME = '哈啰出行'
const TOKEN_KEY = 'hellobike'
const API_URL = 'https://gameapi.hellobike.com/api'
const UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148; app=easybike; version=5.35.0'

if (typeof $request !== 'undefined') {
  getToken()
  HELLO_BIKE.done()
} else {
  ;(async () => {
    let token = HELLO_BIKE.getdata(TOKEN_KEY)
    if (!token) {
      HELLO_BIKE.msg(TASK_NAME, '请先获取 Token')
      HELLO_BIKE.done()
      return
    }

    await checkin(token).then(data => {
      if (data && data.isSuccess) {
        HELLO_BIKE.msg(TASK_NAME, `签到成功，获取 ${data.energy}c 能量`)
      } else if (data && !data.isSuccess) {
        HELLO_BIKE.msg(TASK_NAME, `重复签到`)
      }
    }).catch(error => {
      HELLO_BIKE.msg(TASK_NAME, error.reason)
      if (error.isInvalidToken) {
        token = null
      }
    })

    await share(token).then(data => {
      HELLO_BIKE.log(TASK_NAME, `分享成功, ${JSON.stringify(data)}`)
    }).catch(error => {
      HELLO_BIKE.msg(TASK_NAME, error.reason)
      if (error.isInvalidToken) {
        token = null
      }
    })

    await getEnergyList(token).then(
      data => {
        HELLO_BIKE.log(TASK_NAME, `获取能量：${JSON.stringify(data)}`)
        return mergePromise(data.map(energy => collectEnergy(token, energy.guid)))
      },
      error => {
        HELLO_BIKE.msg(TASK_NAME, error.reason)
        if (error.isInvalidToken) {
          token = null
        }
      },
    ).then(
      data => {
        if (Array.isArray(data) && data.length > 0) {
          HELLO_BIKE.log(TASK_NAME, `收取能量： ${JSON.stringify(data)}`)
          let collected = data.filter(energy => {
            return energy != null
          }).reduce((total, currentValue) => {
            return total + currentValue.energy
          }, 0)
          HELLO_BIKE.msg(TASK_NAME, `收取能量成功，总共收取 ${collected}c 能量`)
        }
        HELLO_BIKE.done()
      },
      error => {
        HELLO_BIKE.msg(TASK_NAME, error.reason)
        HELLO_BIKE.done()
      },
    )
  })()
}

function getToken() {
  if ($request.body) {
    let body = JSON.parse($request.body)
    if (body && body.token) {
      let token = HELLO_BIKE.getdata(TOKEN_KEY)
      if (token != null) {
        if (token !== body.token) {
          if (!HELLO_BIKE.setdata(body.token, TOKEN_KEY)) {
            HELLO_BIKE.msg(`更新 ${TASK_NAME} Token 失败‼️`)
          } else {
            HELLO_BIKE.msg(`更新 ${TASK_NAME} Token 成功 🎉`)
          }
        }
      } else {
        if (!HELLO_BIKE.setdata(body.token, TOKEN_KEY)) {
          HELLO_BIKE.msg(`首次写入 ${TASK_NAME} Token 失败‼️`)
        } else {
          HELLO_BIKE.msg(`首次写入 ${TASK_NAME} Token 成功 🎉`)
        }
      }
    }
  }
}

function checkin(token) {
  if (!token) {
    return Promise.resolve({})
  }
  return new Promise((resolve, reject) => {
    let action = 'happy.energy.dailyCheck.v2'
    let options = {
      url: API_URL,
      headers: { 'User-Agent': UA },
      body: JSON.stringify({
        action,
        token,
        ticket: '',
      }),
    }
    HELLO_BIKE.post(options, (error, response, data) => {
      if (error) {
        HELLO_BIKE.log(TASK_NAME, `签到失败，error：${error}`)
        reject(new RequestFailed(action, error))
        return
      }
      let result = JSON.parse(data)
      if (result && result.code === 0 && result.data) {
        resolve(result.data)
      } else {
        HELLO_BIKE.log(TASK_NAME, `签到失败，response：${data}`)
        reject(new RequestFailed(action, result.msg, result.code === 103))
      }
    })
  })
}

function share(token) {
  if (!token) {
    return Promise.resolve({})
  }
  return new Promise((resolve, reject) => {
    let action = 'happy.energy.dailyShare'
    let options = {
      url: API_URL,
      headers: { 'User-Agent': UA },
      body: JSON.stringify({
        token,
        action,
        ticket: '',
      }),
    }
    HELLO_BIKE.post(options, (error, response, data) => {
      if (error) {
        HELLO_BIKE.log(TASK_NAME, `分享失败，error：${error}`)
        reject(new RequestFailed(action, error))
        return
      }
      let result = JSON.parse(data)
      if (result && result.code === 0) {
        resolve(result)
      } else {
        HELLO_BIKE.log(TASK_NAME, `分享失败，response：${data}`)
        reject(new RequestFailed(action, result.msg, result.code === 103))
      }
    })
  })
}

function getEnergyList(token) {
  if (!token) {
    return Promise.resolve([])
  }
  return new Promise((resolve, reject) => {
    let action = 'happy.energy.getEnergyList'
    let options = {
      url: API_URL,
      headers: { 'User-Agent': UA },
      body: JSON.stringify({
        token,
        action,
        ticket: '',
        limit: 6,
      }),
    }
    HELLO_BIKE.post(options, (error, response, data) => {
      if (error) {
        HELLO_BIKE.log(TASK_NAME, `获取能量失败，error：${error}`)
        reject(new RequestFailed(action, error))
        return
      }
      let result = JSON.parse(data)
      if (result && result.code === 0 && result.data) {
        resolve(result.data)
      } else {
        HELLO_BIKE.log(TASK_NAME, `获取能量失败，response：${data}`)
        reject(new RequestFailed(action, result.msg, result.code === 103))
      }
    })
  })
}

function collectEnergy(token, energyGuid) {
  if (!token) {
    return Promise.resolve({})
  }
  return new Promise((resolve, reject) => {
    let action = 'happy.energy.collectEnergy'
    let options = {
      url: API_URL,
      headers: { 'User-Agent': UA },
      body: JSON.stringify({
        token,
        action,
        ticket: '',
        energyGuid,
      }),
    }
    HELLO_BIKE.post(options, (error, response, data) => {
      if (error) {
        HELLO_BIKE.log(TASK_NAME, `收取能量失败，error：${error}`)
        reject(new RequestFailed(action, error))
        return
      }
      let result = JSON.parse(data)
      if (result && result.code === 0 && result.data) {
        resolve(result.data)
      } else {
        HELLO_BIKE.log(TASK_NAME, `收取能量失败，response：${data}`)
        reject(new RequestFailed(action, result.msg, result.code === 103))
      }
    })
  })
}

function mergePromise(promises = []) {
  let array = []
  let sequence = Promise.resolve([])
  promises.forEach(promise => {
    sequence = sequence.then(() => promise).then(data => {
      array.push(data)
      return array
    })
  })
  return sequence
}

function init() {
  isSurge = () => {
    return undefined !== this.$httpClient
  }
  isQuanX = () => {
    return undefined !== this.$task
  }
  getdata = (key) => {
    if (isSurge()) return $persistentStore.read(key)
    if (isQuanX()) return $prefs.valueForKey(key)
  }
  setdata = (key, val) => {
    if (isSurge()) return $persistentStore.write(key, val)
    if (isQuanX()) return $prefs.setValueForKey(key, val)
  }
  msg = (title, subtitle = '', body = '') => {
    if (isSurge()) $notification.post(title, subtitle, body)
    if (isQuanX()) $notify(title, subtitle, body)
  }
  log = (title, msg) => {
    console.log(`${title}:\n${msg}\n`)
  }
  get = (options, callback) => {
    if (isQuanX()) {
      if (typeof options == 'string') options = { url: options }
      options['method'] = 'GET'
      return $task.fetch(options).then(
        response => {
          response['status'] = response.statusCode
          callback(null, response, response.body)
        },
        reason => callback(reason.error, null, null),
      )
    }
    if (isSurge()) return $httpClient.get(options, callback)
  }
  post = (options, callback) => {
    if (isQuanX()) {
      if (typeof options == 'string') options = { url: options }
      options['method'] = 'POST'
      $task.fetch(options).then(
        response => {
          response['status'] = response.statusCode
          callback(null, response, response.body)
        },
        reason => callback(reason.error, null, null),
      )
    }
    if (isSurge()) $httpClient.post(options, callback)
  }
  done = (value = {}) => {
    $done(value)
  }
  return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, done }
}

function RequestFailed(action = '', reason = '', isInvalidToken = false) {
  this.action = action
  this.reason = reason
  this.isInvalidToken = isInvalidToken
}

RequestFailed.prototype = {
  constructor: RequestFailed,
}
