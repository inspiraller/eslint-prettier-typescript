import React, { FC } from 'react';
import { Comp } from './Comp';

const App: FC = () => (
  <div id="app">
    hello <Comp />
    <input type="text" value="something" />
  </div>
);

export default App;
