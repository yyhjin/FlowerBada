import ReactDOM from 'react-dom/client';
import { Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import App from '@src/App';
import '@src/index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RecoilRoot>
    <Suspense fallback={<div>Loading...</div>}>
      <App />
    </Suspense>
  </RecoilRoot>,
);
