import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './Layout.css';

const Layout: React.FC = () => {
  return (
    <div className="app-root">
      <header className="app-header">
        <div className="app-header-inner">
          <div className="app-brand">
            <div className="app-brand-line">
              <span className="app-brand-title">ThisOne</span>
            </div>
            <div className="app-brand-guideline" />
          </div>

          <span className="app-brand-subtitle">
            タスク / カレンダー / メモをシンプルに管理
          </span>

          <nav className="app-nav" aria-label="ページナビゲーション">
            <NavLink
              to="/terms"
              className={({ isActive }) =>
                `app-nav-link${isActive ? ' is-active' : ''}`
              }
            >
              利用規約
            </NavLink>
            <NavLink
              to="/privacy"
              className={({ isActive }) =>
                `app-nav-link${isActive ? ' is-active' : ''}`
              }
            >
              プライバシーポリシー
            </NavLink>
            <NavLink
              to="/delete-account"
              className={({ isActive }) =>
                `app-nav-link${isActive ? ' is-active' : ''}`
              }
            >
              アカウント削除
            </NavLink>
          </nav>
        </div>
        <div className="app-header-bar" />
      </header>

      <main className="app-main">
        <Outlet />
      </main>

      <footer className="app-footer">
        <small>© {new Date().getFullYear()} ThisOne</small>
      </footer>
    </div>
  );
};

export default Layout;