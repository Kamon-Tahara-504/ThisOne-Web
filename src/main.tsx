import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import DeleteAccountPage from './pages/DeleteAccountPage';
import './index.css';

const App: React.FC = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        {/* 共通レイアウト */}
        <Route element={<Layout />}>
          {/* デフォルトは利用規約にリダイレクトしてもよい */}
          <Route path="/" element={<Navigate to="/terms" replace />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/delete-account" element={<DeleteAccountPage />} />
          {/* どれにもマッチしない場合も /terms に飛ばす */}
          <Route path="*" element={<Navigate to="/terms" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);