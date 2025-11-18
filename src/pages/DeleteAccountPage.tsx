import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const DeleteAccountPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [currentEmail, setCurrentEmail] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 初期表示時に、すでにログインしているか確認
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setCurrentEmail(data.user.email ?? null);
      }
    };
    fetchUser();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) {
        setError(loginError.message);
        return;
      }

      const { data } = await supabase.auth.getUser();
      setCurrentEmail(data.user?.email ?? null);
      setMessage('ログインしました。アカウント削除の確認を行ってください。');
    } catch (e: any) {
      setError(e.message ?? 'ログイン中にエラーが発生しました。');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      // ここで Edge Function を呼ぶ（URL を自前で書かない）
      const { error: funcError } = await supabase.functions.invoke(
        'delete-account',
        {
          body: { confirm: true },
        }
      );

      if (funcError) {
        setError(funcError.message ?? 'アカウント削除に失敗しました。');
        return;
      }

      await supabase.auth.signOut();
      setCurrentEmail(null);
      setConfirmed(false);
      setMessage('アカウントおよび関連データの削除が完了しました。');
    } catch (e: any) {
      setError(e.message ?? 'アカウント削除中にエラーが発生しました。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <h1>アカウント削除</h1>
      <p>
        このページでは、ThisOne のアカウント削除をリクエストできます。
        ログイン後、「アカウントを削除する」ボタンを押すと、アカウントと関連データが削除されます。
        一度削除したデータは元に戻すことができません。
      </p>

      {message && <div className="message-success">{message}</div>}
      {error && <div className="message-error">{error}</div>}

      {!currentEmail && (
        <form onSubmit={handleLogin} style={{ marginTop: 24 }}>
          <h2>ログイン</h2>
          <div className="form-field">
            <label htmlFor="email">メールアドレス</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="form-field">
            <label htmlFor="password">パスワード</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <button type="submit" className="primary" disabled={loading}>
            {loading ? '処理中…' : 'ログイン'}
          </button>
        </form>
      )}

      {currentEmail && (
        <div style={{ marginTop: 32 }}>
          <h2>アカウント削除の確認</h2>
          <p>現在ログイン中のアカウント: {currentEmail}</p>
          <p>
            この操作により、アカウントおよび関連するタスク・メモ・スケジュール等のデータが削除されます。
            一度削除すると元に戻すことはできません。
          </p>
          <label style={{ display: 'block', marginTop: 8 }}>
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              disabled={loading}
            />{' '}
            この操作がアカウントおよび関連データの完全な削除であり、元に戻せないことを理解しました。
          </label>

          <div style={{ marginTop: 16 }}>
            <button
              className="danger"
              disabled={!confirmed || loading}
              onClick={handleDelete}
            >
              {loading ? '削除中…' : 'アカウントを削除する'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteAccountPage;