import { createRoot } from 'react-dom/client';
import React, { FC } from 'react';

import App from 'src/App';

export interface RenderProps {
  Comp: FC;
}

export type TRender = (props: RenderProps) => void;

interface PropsWrapRoot {
  children: React.ReactNode;
}

export const WrapRoot: FC<PropsWrapRoot> = ({ children }) => {
  return <div id="wrap">{children}</div>;
};

export const render: TRender = ({ Comp }) => {
  const container = document.getElementById('root') || document.createElement('div');
  /* eslint-disable @typescript-eslint/no-non-null-assertion */
  const root = createRoot(container!); // createRoot(container!) if you use TypeScript
  root.render(
    <WrapRoot>
      <React.StrictMode>
        <Comp />
      </React.StrictMode>
    </WrapRoot>
  );
};

render({ Comp: App });

if (module?.hot) {
  module.hot.accept();
}

export default {};
