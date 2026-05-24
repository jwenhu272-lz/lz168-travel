'use client';
import { useState } from 'react';

export default function LoginModal({
  isOpen,
  onClose,
  onLogin,
  onRegister,
  language,
}) {
  const [mode, setMode] = useState('login'); // login or register
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const t = (zh, en) => (language === '中文' ? zh : en);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (mode === 'login') {
      const result = onLogin(email, password);
      if (result.success) {
        onClose();
      } else {
        setError(result.error);
      }
    } else {
      if (!name || !phone) {
        setError(t('请填写所有信息', 'Please fill all fields'));
        return;
      }
      const result = onRegister(email, password, name, phone);
      if (result.success) {
        onClose();
      } else {
        setError(result.error);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {mode === 'login' ? t('登录', 'Login') : t('注册', 'Register')}
          </h2>
          <button onClick={onClose} className="text-gray-400 text-2xl">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-3">
            {mode === 'register' && (
              <>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t('姓名', 'Full Name')}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  required
                />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={t('手机号', 'Phone Number')}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  required
                />
              </>
            )}

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('邮箱', 'Email')}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('密码', 'Password')}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
            >
              {mode === 'login' ? t('登录', 'Login') : t('注册', 'Register')}
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <button
            onClick={() => {
              setMode(mode === 'login' ? 'register' : 'login');
              setError('');
            }}
            className="text-blue-600 text-sm"
          >
            {mode === 'login'
              ? t('没有账号？立即注册', 'No account? Register')
              : t('已有账号？立即登录', 'Already have an account? Login')}
          </button>
        </div>
      </div>
    </div>
  );
}
