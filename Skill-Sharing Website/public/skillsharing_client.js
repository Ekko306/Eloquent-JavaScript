// HTML
// 广泛用的一个方法 来在网上定一个一个文件叫做index.html 当加载的时候文件就会默认找这个文件加载比如只给一个1文件夹位置
// 这里ecstatic就是找的这个文件夹底下的静态文件

// 行动
// 应用包含一些 对话的列表和 用户的名字 我们可以把它存在 {talks, user}对象里面
// 我们不允许用户直接发送http请求 要封装另外一个函数 可能发出请求代表用户想要干什么事情
//
// handleAction函数接受一个action 然后实现它 因为我们更新函数很简单 也可以附带把这个更新函数写了

function handleAction(state, action) {
  if(action.type == "setUser"){
    locoalStorage.setItem("userName", action.user)
    return Object.assign({}, state, {user: action.user})
  } else if (action.type == "setTalks"){
    return Object.assign({}, state, {talks: action.talks})
  } else if (action.type == "newTalk") {
    fetchOK(talkURL(action.title), {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        presenter: state.user,
        summary: action.summary
      })
    }).catch(reportError)
  } else if (action.type == "deleteTalk") {
    fetchOK(talkURL(action.talk), {method: "DELETE"}).catch(reportError)
  } else if (action.type == "newComment") {
    fetchOK(talkURL(action.talk) + "/comments", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        author: state.user,
        message: action.message
      })
    }).catch(reportError)
  }
  return state
}


// 我们会把用户的名字存在loaclStorage里面 来在用户重新加载的时候能够直接获取
// 我们需要和network交互 用fetch方法 我们把fetchOK封装起来 来保证请求被拒绝的时候报一个错

function fetchOK(url, options) {
  return fetch(url, options).then(response => {
    if (response.status < 400) return response
    else throw Error(response.statusText)
  })
}

// 帮助函数 来建立一个URL 来跟给定的title来建立URL 要编码

function talkURL(title) {
  return "talks/" + encodeURIComponent(title)
}

// 当结果请求失败 我们不会不做东西 定一个reportError来报告错误 报告一个对话

function reportError(error) {
  alert(String(error))
}

// 我们会用19章里面类似的方法 来把应用分成多个组件 但是因为有些组件有些事永远不会更新或者永远是重新绘画 我们定义累不是类而是函数 来直接返回DOM举例子来说
// 这里是一个输入用户名字的节点 （哦哦 就是存储在class里面的可以修改 这里重新画 就直接定义一个函数 直接返回 好一些）

function renderUserField(name, dispatch) {
  return elt("label", {}, "Your name: ", elt("input", {
    type: "text",
    value: name,
    onchange(event) {
      dispatch({type: "setUser", user: event.target.value})
    }
  }))
}

// 这个elt函数也是19章用的函数
// 一个相似的函数用来渲染对话 包含一个评论的列表 和一个form 来怎噶鸡一个评论

function elt(type, props, ...children){
  let dom = document.createElement(type)
  if (props) Object.assign(dom, props)
  for (let child of children) {
    if (typeof child != "string") dom.appendChild(child)
    else dom.appendChild(document.createTextNode(child))
  }
  return dom
}


function renderTalk(talk, dispatch) {
  return elt(
      "section", {className: "talk"},
      elt("h2", null, talk.title, " ", elt("button", {
        type: "button",
        onclick() {
          dispatch({type: "deleteTalk", talk: talk.title})
        }
      }, "Delete")),
      elt("div", null, "by ",
          elt("strong", null, talk.presenter)),
      elt("p", null, talk.summary),
      ...talk.comments.map(renderComment),
      elt("form", {
            onsubmit(event) {
              event.preventDefault()
              let form = event.target;
              dispatch({type: "newComment",
                talk: talk.title,
                message: form.elements.comment.value})
              form.reset()
            }
          }, elt("input", {type: "text", name: "comment"}), " ",
          elt("button", {type: "submit"}, "Add comment")))
}

// 这里用submit事件处理函数调用之后 调用form.reset执行一个newComment动作之后清理form的内容

// 当创建一个稍微复杂一点DOM 这种风格的变成看起来很乱 有一个广泛用的js扩展 jsx 可以直接在脚本里面写html 可以让代码更好看 在你实际运行代码之前 必须要执行另一个程序
// 在脚本上来把假的html转换成js函数 和这个很像

// 评论渲染简单多了

function renderComment(comment) {
  return elt("p", {className: "comment"},
      elt("strong", null, comment.author),
      ": ", comment.message)
}

// renderTalk是用来渲染一些内容 renderTalkForm来让用户提交一个对话
// 最后 下面一个表单让用户提交新的对话

function renderTalkForm(dispatch) {
  let title = elt("input", {type: "text"})
  let summary = elt("input", {type: "text"})
  return elt("form", {
        onsubmit(event) {
          event.preventDefault()
          dispatch({type: "newTalk",
            title: title.value,
            summary: summary.value})
          event.target.reset()
        }
      }, elt("h3", null, "Submit a Talk"),
      elt("label", null, "Title: ", title),
      elt("label", null, "Summary: ", summary),
      elt("button", {type:"submit"}, "Submit"))
}

// 为了开始这个对话 我们需要当前对话的列表 因为 最初的加载和long polling很有关系 ——ETag从load必须在polling的时候使用 我们会写一个函数
// 这个函数保持和 服务器端的/talks polling 并且当有新的对话的时候调用回调函数

async function pollTalks(update) {
  let tag = undefined
  for (;;) {
    let response;
    try {
      response = await fetchOK("/talks", {
        headers: tag && {"If-None-Match": tag, "Prefer": "wait=90"} //这个&&好像是加进去的意思 妈的不懂
      })
    } catch(e) {
      console.log("Request failed: " + e)
      await new Promise(resolve => setTimeout(resolve, 500))
      continue
    }
    if (response.status == 304) continue
    tag = response.headers.get("ETag")
    update(await response.json())
  }
}


// 这是一个async函数 所以 循环和等待结果可以早一点 它在一个无限的循环运行 在每一个迭代 它去talks的对话 要么是正常的要么不是第一个请求
// 就根据headers来做一次long polling 要么是正常的要么不是第一个请求
// 当请求失败了 函数会等一段事件然后重新开始 这样当你的网络暂时断开了 过一段事件再次请求就可以连接上回复 resolved 用setTimeout迫使async函数等一段事件
// 当服务器返回304 一位置 long polling请求曹氏了 所以函数 会立即开始下一次请求 如果返回200回复 body回调用JSON并且传递给回调 并且它的ETag头信息存储起来为下一次迭代


// 下面的组件把所有的用户接口放在一起

class SkillShareApp {
  constructor(state, dispatch) {
    this.dispatch = dispatch
    this.talkDOM = elt("div", {className: "talks"})
    this.dom = elt("div", null, renderUserField(state.user, dispatch),this.talkDOM, renderTalkForm(dispatch))
    this.syncState(state)
  }

  syncState(state) {
    if(state.talks != this.talks) {
      this.talkDOM.textContent = ""
      for (let talk of state.talks) {
        this.talkDOM.appendChild(
            renderTalk(talk, this.dispatch)
        )
      }
      this.talks = state.talks;
    }
  }
}

// 当对话改变的时候组件会重新画所有的东西 这样简单但可能浪费 我们会在练习里再讨论

function runApp() {
  let user = localStorage.getItem("userName") || "Anon"
  let state, app
  function dispatch(action) {
    state = handleAction(state, action)
    app.syncState(state)
  }

  pollTalks(talks => {
    if(!app) {
      state = {user, talks}
      app = new SkillShareApp(state, dispatch)
      document.body.appendChild(app.dom)
    } else {
      dispatch({type: "setTalks", talks})
    }
  }).catch(reportError)
}

runApp()
