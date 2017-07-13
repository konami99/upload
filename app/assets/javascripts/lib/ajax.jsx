class Ajax {
  constructor(parent, prefix) {
    this.parent = parent
    this.prefix = prefix
  }

  get(action, onComplete, retry, useCsrf) {
    return this.ajax("GET", null, action, onComplete, null, retry, useCsrf)
  }

  post(event, onComplete, retry = false, onError) {
    return this.ajaxForm("POST", event, onComplete, retry, onError)
  }

  postJSON(data, action, onComplete, useCsrf) {
    let useJson = true
    return this.ajax("POST", JSON.stringify(data), action, onComplete, useJson, false, useCsrf)
  }

  patch(event, onComplete, retry = false, onError) {
    return this.ajaxForm("PATCH", event, onComplete, retry, onError)
  }

  patchJSON(data, action, onComplete) {
    let useJson = true
    return this.ajax("PATCH", JSON.stringify(data), action, onComplete, useJson)
  }

  delete(event, onComplete) {
    return this.ajaxForm("DELETE", event, onComplete)
  }

  deleteJSON(data, action, onComplete) {
    let useJson = true
    return this.ajax("DELETE", JSON.stringify(data), action, onComplete, useJson)
  }

  ajaxForm(method, event, onComplete, retry = false, onError) {
    event.preventDefault()

    let form = event.currentTarget
    let data = this.serialise(form)
    let action = form.getAttribute("action")

    return this.ajax(method, data, action, onComplete, false, retry, undefined, onError)
  }

  ajax(method, data, action, onComplete, useJson, retry = false, useCsrf = true, onError) {
    if (this.parent) {
      this.parent.setState({
        loading: true
      })
    }

    let req = new XMLHttpRequest()

    req.addEventListener("readystatechange",
      () => {
        let e, error, error1, errors, ref, ref1, response // ReadyState Complete
        if (req.readyState === 4) {
          if (this.parent) {
            this.parent.setState({
              loading: false
            })
          }

          switch (req.status) {
            case 422:
              try {
                errors = JSON.parse(req.responseText).errors || JSON.parse(req.responseText)
                if (onError) {
                  onError(new ErrorBag(errors))
                } else {
                  FormErrors.setErrors(errors, this.prefix)
                }
              } catch (error) {
                e = error
              }
              break

            case 500:
              return SessionActions.serverError()

            default:
              if (req.status !== 200 && req.getResponseHeader("X-RedirectLocation")) {
                return window.location.replace(req.getResponseHeader("X-RedirectLocation"))
              } else {
                try {
                  response = JSON.parse(req.responseText)
                } catch (error) {
                  response = req.status
                }
                return typeof onComplete === "function" ? onComplete(response) : undefined
              }
          }
        }
      })

    req.open(method, action, true)

    if (useJson) {
      req.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    } else {
      req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    }

    req.setRequestHeader("Accept", "application/json")

    return req.send(data)
  }

  serialise(form) {
    return $(form).serialize()
  }
}

window.FETCH = (action, onComplete, obj, retry, useCsrf = true) => new Ajax(obj).get(action, onComplete, retry, useCsrf)
window.POST = (event, onComplete, obj, prefix, retry, onError) => new Ajax(obj, prefix).post(event, onComplete, retry, onError)
window.POSTJSON = (data, action, onComplete, useCsrf = true) => new Ajax(null).postJSON(data, action, onComplete, useCsrf)
window.PATCH = (event, onComplete, obj, prefix, retry = false, onError) => new Ajax(obj, prefix).patch(event, onComplete, retry, onError)
window.PATCHJSON = (data, action, onComplete) => new Ajax(null).patchJSON(data, action, onComplete)
window.DELETE = (event, onComplete, obj) => new Ajax(obj).delete(event, onComplete)
window.DELETEJSON = (data, action, onComplete) => new Ajax(null).deleteJSON(data, action, onComplete)
