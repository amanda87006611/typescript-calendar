import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import TodoPlatform from "./TodoPlatform";

import store from "./store";

// 基本type的定義方法筆記寫於Notion - react typescript

const App: React.FC = () => {
  return (
    <div className='APP'>
      <Provider store={store}>
        <BrowserRouter>
          <TodoPlatform />
        </BrowserRouter>
      </Provider>
    </div>
  );
};

export default App;
