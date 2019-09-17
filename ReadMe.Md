> 这是一个在React中使用的性能优化方案

*  既可以动态的设定虚拟列表每个自元素的宽度高度

*  也可以在动态keep-alive缓存指定的组件

* 借此来媲美原生应用的用户体验

> 使用步骤 

```
$  yarn init 

$  yarn 

$  yarn dev 

```

> 最终访问端口号 8000 即可



## 📦 安装
react-component-keepalive 最低支持 React 16.3 版本，但是如果你使用了 React Hooks，那么必须是 React 16.8 或更高版本。

在你的应用中安装 React Keep Alive：

```bash
npm install --save react-component-keepalive
```


## 🔨 使用
React Keep Alive 提供了 `<Provider>`， 你必须把 `<KeepAlive>` 放在 `Provider` 里面。

```JavaScript
import React from 'react';
import ReactDOM from 'react-dom';
import {
  Provider,
  KeepAlive,
} from 'react-component-keepalive';
import Test from './views/Test';

ReactDOM.render(
  <Provider>
    <KeepAlive name="Test">
      <Test />
    </KeepAlive>
  </Provider>,
  document.getElementById('root'),
);
```


## 💡 为什么使用这个组件？
如果你用过 [Vue](https://vuejs.org/)，那肯定知道它有一个非常好用的组件（[keep-alive](https://vuejs.org/v2/guide/components-dynamic-async.html)）能够保持组件的状态来避免重复重渲染。

有时，我们希望在列表页面进入详情页面后，缓存列表页面的状态；当从详情页面返回列表页面时，列表页面还是和切换前一样。

这实际上挺难实现的，因为 React 中的组件一旦卸载就无法重用。在 [issue #12039](https://github.com/facebook/react/issues/12039) 中提出了两种解决方案；通过样式来控制组件的显示（`display：none | block;`），但是这可能会导致问题，例如切换组件时，无法使用动画；或者使用像 Mobx 和 Redux 这样的数据流管理工具，但这太麻烦了。

最后，我通过 [React.createPortal API](https://reactjs.org/docs/portals.html) 实现了这个效果。`react-component-keepalive` 有两个主要的组件 `<Provider>` 和 `<KeepAlive>`；`<Provider>` 负责保存组件的缓存，并在处理之前通过 `React.createPortal` API 将缓存的组件渲染在应用程序的外面。缓存的组件必须放在 `<KeepAlive>` 中，`<KeepAlive>` 会把在应用程序外面渲染的组件挂载到真正需要显示的位置。


## 📝 API 参考

### `Provider`
因为需要存储缓存的组件，所以必须把 `<Provider>` 放在应用程序的最外面以使程序能够正常运行。

#### Props
`include`：只会缓存匹配 `key` 的组件。它可以是字符串，字符串数组或正则表达式，例如：
```JavaScript
<Provider include="A,B">...</Provider>
// or
<Provider include={['A', 'B']}>...</Provider>
// or
<Provider include={/A|B/}>...</Provider>
```

`exclude`：任何匹配 `key` 的组件都不会被缓存。它可以是字符串，字符串数组或正则表达式，例如：

#### 例子
在下面的示例中，`<App />` 是我们的根组件，这意味着它位于组件层次结构的最顶层。

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-component-keepalive';
import App from './App';

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root'),
);
```

##### 结合 React Router 和 Mobx React 使用

```JavaScript
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import {
  Provider as MobxProvider,
} from 'mobx-react';
import {
  Provider as KeepAliveProvider,
} from 'react-component-keepalive';

ReactDOM.render(
  <MobxProvider>
    <Router>
      <KeepAliveProvider>
        <App />
      </KeepAliveProvider>
    </Router>
  </MobxProvider>,
  document.getElementById('root'),
);
```

**注意**：React Router 必须确保是 **最新版本**。因为 React Keep Alive 使用了 **new Context**，所以必须确保 `<Router>` 使用相同的 API。请使用以下命令安装 React Router 的最新版本：

```bash
npm install react-router@next react-router-dom@next
```


### `KeepAlive`
我们必须确保 `<KeepAlive>` 在 `<Provider>` 里面，这样 `<KeepAlive>` 的子组件才能被缓存。

#### Props
`name`：`name` 必须存在并且需要确保当前 `<Provider>` 下的所有 `<KeepAlive>` 的 `name` 都是唯一的（1.2.0 新增，替换 `key`）。

`disabled`：当我们不需要缓存组件时，我们可以禁用它；禁用仅在组件从未激活状态变为激活状态时生效。

`extra`(`v2.0.1+`): 额外的数据可以通过 `bindLifecycle` 获取。

**注意**：`<KeepAlive>` 包裹的组件内部最外层必须有一个真实的 DOM 标签。


#### 例子
```JavaScript
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import {
  Provider,
  KeepAlive,
} from 'react-component-keepalive';

class One extends React.Component {
  render() {
    return (
      <div>This is One.</div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/one">
            <KeepAlive name="One">
              <One />
            </KeepAlive>
          </Route>
        </Switch>
      </div>
    );
  }
}

ReactDOM.render(
  <Router>
    <Provider>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root'),
);
```

##### 使用 `<Provider>` 的 `include` 属性
```JavaScript
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import {
  Provider,
  KeepAlive,
} from 'react-component-keepalive';

class One extends React.Component {
  render() {
    return (
      <div>This is One.</div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/one">
            <KeepAlive name="One">
              <One />
            </KeepAlive>
          </Route>
        </Switch>
      </div>
    );
  }
}

ReactDOM.render(
  <Router>
    <Provider include="One">
      <App />
    </Provider>
  </Router>,
  document.getElementById('root'),
);
```

**注意**：如果要使用 **生命周期**，请将组件包装在 `bindLifecycle` 高阶组件中。

### `bindLifecycle`
这个高阶组件包装的组件将具有 **正确的** 的生命周期，并且我们添加了两个额外的生命周期 `componentDidActivate` 和 `componentWillUnactivate`。

添加新的生命周期之后:
![Lifecycle after adding](https://github.com/Sam618/react-component-keepalive/raw/master/assets/lifecycle.png)

`componentDidActivate` 将在组件刚挂载或从未激活状态变为激活状态时执行。虽然我们在 `Updating` 阶段的 `componentDidUpdate` 之后能够看到 `componentDidActivate`，但这并不意味着 `componentDidActivate` 总是被触发。

同时只能触发 `componentWillUnactivate` 和 `componentWillUnmount` 生命周期的其中之一。当需要缓存时执行 `componentWillUnactivate`，而 `componentWillUnmount` 在禁用缓存的情况下执行。

#### 例子
```JavaScript
import React from 'react';
import {bindLifecycle} from 'react-component-keepalive';

@bindLifecycle
class Test extends React.Component {
  render() {
    return (
      <div>
        This is Test.
      </div>
    );
  }
}
```


### `useKeepAliveEffect`
`useKeepAliveEffect` 会在组件进入和离开时触发；因为在保持活力时组件不会被卸载，所以如果使用的是 `useEffect`，那将不会达到真正的目的。

**注意**：`useKeepAliveEffect` 使用了最新的 React Hooks，所以必须确保 React 是最新版本。

#### 例子
```JavaScript
import React from 'react';
import {useKeepAliveEffect} from 'react-component-keepalive';

function Test() {
  useKeepAliveEffect(() => {
    console.log("mounted");
    return () => {
      console.log("unmounted");
    };
  });
  return (
    <div>
      This is Test.
    </div>
  );
}
```
