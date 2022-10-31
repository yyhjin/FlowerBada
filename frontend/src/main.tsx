import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import App from '@src/App';
import '@src/index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RecoilRoot>
    <App />
  </RecoilRoot>,
);
