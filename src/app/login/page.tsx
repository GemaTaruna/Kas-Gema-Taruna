'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ANGKATAN_LIST, AngkatanId, useAngkatan } from '@/context/AngkatanContext';

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<'admin_angkatan' | 'superadmin' | 'cek_kas_siswa'>('cek_kas_siswa');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedStudentAngkatan, setSelectedStudentAngkatan] = useState<AngkatanId>('16');
  const [errorMsg, setErrorMsg] = useState('');
  const [idleLogoutNotice, setIdleLogoutNotice] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { loginWithCredentials, enterStudentMode } = useAngkatan();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.search.includes('timeout=1')) {
      setIdleLogoutNotice(true);
    }
  }, []);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIdleLogoutNotice(false);
    setLoading(true);

    const res = loginWithCredentials(identifier, password);
    setLoading(false);

    if (!res.ok || !res.account) {
      setErrorMsg(res.error || 'Akun atau Kata Sandi salah.');
      return;
    }

    router.push('/dashboard');
    router.refresh();
  };

  const handleStudentEnter = (angk?: AngkatanId) => {
    const targetAngkatan = angk || selectedStudentAngkatan;
    enterStudentMode(targetAngkatan);
    router.push('/transparansi');
    router.refresh();
  };

  return (
    <main className="flex-grow flex items-center justify-center p-0 lg:p-6 sm:p-4 min-h-screen bg-slate-50 text-slate-800 font-sans antialiased selection:bg-amber-400 selection:text-slate-900">
      <div className="w-full max-w-6xl bg-white shadow-2xl rounded-none lg:rounded-3xl overflow-hidden border border-slate-200/80 flex flex-col lg:flex-row min-h-screen lg:min-h-[660px]">
        {/* Left Brand Showcase — Hanya tampil di Desktop / Web App (lg ke atas) */}
        <section className="hidden lg:flex lg:w-5/12 bg-gradient-to-br from-slate-950 via-slate-900 to-[#0B1120] text-white p-10 xl:p-12 relative flex-col justify-between border-r border-slate-800 overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-10 right-0 w-80 h-80 bg-rose-600/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* Center Hero Showcase: Logo & Tulisan Diperbesar dan Seimbang */}
          <div className="relative z-10 my-auto flex flex-col items-center text-center py-6">
            <div className="inline-block transition-transform hover:scale-105 duration-300 mb-7">
              <div className="w-36 h-36 xl:w-44 xl:h-44 bg-slate-800/90 border-2 border-amber-500/40 rounded-3xl p-4 flex items-center justify-center shadow-2xl drop-shadow-[0_15px_30px_rgba(245,158,11,0.3)]">
                <img
                  src="/logo.png"
                  alt="Logo Marching Band Gema Taruna"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <h1 className="text-3xl xl:text-4xl font-black tracking-tight text-white mb-3 leading-tight">
              KAS GEMA TARUNA
            </h1>

            <div className="w-24 h-1.5 bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500 rounded-full mb-4"></div>

            <p className="text-amber-400 text-lg xl:text-xl font-extrabold tracking-wide leading-relaxed max-w-sm">
              Satu Tekad, Satu Semangat, Marching Hebat!
            </p>
          </div>

          <div className="relative z-10 pt-5 border-t border-slate-700/50">
            <div className="flex items-start gap-3">
              <img
                src="/logo.png"
                alt="MBGT"
                className="w-10 h-10 rounded-full bg-slate-800 p-1 object-contain border border-slate-600 shrink-0"
              />
              <div>
                <p className="text-xs sm:text-sm italic text-slate-300 leading-snug mb-1">
                  &ldquo;Setiap angkatan memiliki pembukuan kas tersendiri yang transparan, terpantau langsung oleh Pembina dan seluruh Siswa.&rdquo;
                </p>
                <p className="text-xs font-semibold text-amber-400">
                  Marching Band Gema Taruna
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Right Form Panel — Langsung tampil di Mobile dengan Logo yang disesuaikan */}
        <section className="w-full lg:w-7/12 p-6 sm:p-8 lg:p-14 bg-white flex flex-col justify-center relative my-auto">
          <div className="max-w-md w-full mx-auto">
            {/* Header Logo Khusus Mobile */}
            <div className="lg:hidden flex flex-col items-center text-center mb-6 pt-2">
              <div className="w-24 h-24 bg-slate-900 border-2 border-amber-500/40 rounded-3xl p-2.5 flex items-center justify-center shadow-xl drop-shadow-[0_8px_20px_rgba(15,23,42,0.25)] mb-3.5">
                <img
                  src="/logo.png"
                  alt="Logo Marching Band Gema Taruna"
                  className="w-full h-full object-contain"
                />
              </div>
              <h1 className="text-2xl font-black tracking-tight text-slate-900 leading-tight">
                KAS GEMA TARUNA
              </h1>
              <p className="text-xs font-extrabold text-amber-600 tracking-wide mt-1">
                Satu Tekad, Satu Semangat, Marching Hebat!
              </p>
              <div className="w-16 h-1 bg-amber-400 rounded-full mt-3"></div>
            </div>

            {idleLogoutNotice && (
              <div className="mb-5 p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-xs font-semibold text-amber-900 flex items-start gap-2.5">
                <span className="text-base leading-none">🔒</span>
                <div>
                  <strong className="block text-amber-950 mb-0.5">Sesi Berakhir Otomatis (10 Menit)</strong>
                  Demi keamanan, akun dikeluarkan otomatis karena tidak ada aktivitas selama 10 menit. Silakan masuk kembali.
                </div>
              </div>
            )}

            <div className="mb-6 text-center lg:text-left">
              <h2 className="text-lg sm:text-2xl font-bold text-slate-900 tracking-tight mb-1">
                Portal Akses Kas Gema Taruna
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm">
                Pilih tab akses di bawah ini. Siswa dapat langsung mengecek kas angkatannya tanpa kata sandi.
              </p>
            </div>

            {/* 3 Role / Mode Tabs */}
            <div className="mb-6">
              <div className="grid grid-cols-3 p-1 bg-slate-100 rounded-xl border border-slate-200 gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('cek_kas_siswa');
                    setErrorMsg('');
                  }}
                  className={`py-2.5 px-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    activeTab === 'cek_kas_siswa'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  👀 Cek Kas Siswa
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('admin_angkatan');
                    setErrorMsg('');
                  }}
                  className={`py-2.5 px-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    activeTab === 'admin_angkatan'
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  📒 Admin Angkatan
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('superadmin');
                    setErrorMsg('');
                  }}
                  className={`py-2.5 px-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    activeTab === 'superadmin'
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  🛡️ Super Admin
                </button>
              </div>
            </div>

            {/* TAB 1: CEK KAS SISWA (TANPA LOGIN / TANPA SANDI) */}
            {activeTab === 'cek_kas_siswa' ? (
              <div className="space-y-5 bg-emerald-50/60 border border-emerald-200 rounded-2xl p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 font-bold">
                    ✓
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900">
                      Cek Kas Siswa (Tanpa Kata Sandi)
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      Pilih angkatan Anda di bawah ini untuk langsung melihat buku kas & status iuran angkatan Anda (Mode Khusus <strong>Hanya Membaca</strong>).
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Pilih Angkatan:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {ANGKATAN_LIST.map((angk) => {
                      const active = selectedStudentAngkatan === angk;
                      return (
                        <button
                          key={angk}
                          type="button"
                          onClick={() => setSelectedStudentAngkatan(angk)}
                          className={`py-3 px-3 rounded-xl border text-left transition-all cursor-pointer ${
                            active
                              ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-amber-400'
                              : 'bg-white text-slate-800 border-slate-200 hover:border-slate-400'
                          }`}
                        >
                          <span className="text-xs font-extrabold block">
                            Angkatan {angk}
                          </span>
                          <span
                            className={`text-[10px] ${
                              active ? 'text-amber-300' : 'text-slate-500'
                            }`}
                          >
                            Lihat Kas
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleStudentEnter(selectedStudentAngkatan)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 px-6 rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-sm cursor-pointer"
                >
                  <span>Buka Kas Angkatan {selectedStudentAngkatan}</span>
                  <span>→</span>
                </button>
              </div>
            ) : (
              /* TAB 2 & 3: LOGIN ADMIN ANGKATAN ATAU SUPER ADMIN */
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                  {activeTab === 'superadmin' ? (
                    <>
                      <strong className="text-slate-900 block mb-0.5">
                        🛡️ Mode Super Admin (Pembina)
                      </strong>
                      Masuk menggunakan akun khusus Pembina untuk mengelola seluruh angkatan.
                    </>
                  ) : (
                    <>
                      <strong className="text-slate-900 block mb-0.5">
                        📒 Mode Admin Bendahara Angkatan
                      </strong>
                      Masuk menggunakan akun resmi bendahara angkatan masing-masing.
                    </>
                  )}
                </div>

                {errorMsg && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700">
                    ⚠️ {errorMsg}
                  </div>
                )}

                <div>
                  <label
                    className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5"
                    htmlFor="identifier-input"
                  >
                    Akun Pengguna
                  </label>
                  <input
                    id="identifier-input"
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="block w-full px-4 py-2.5 sm:py-3 text-slate-900 placeholder-slate-400 text-sm border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition shadow-sm outline-none border"
                    placeholder="Masukkan Akun"
                  />
                </div>

                <div>
                  <label
                    className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5"
                    htmlFor="password-input"
                  >
                    Kata Sandi
                  </label>
                  <div className="relative rounded-xl shadow-sm">
                    <input
                      id="password-input"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pl-4 pr-11 py-2.5 sm:py-3 text-slate-900 placeholder-slate-400 text-sm border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition shadow-sm outline-none border"
                      placeholder="Masukkan Kata Sandi"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none text-xs font-semibold cursor-pointer"
                    >
                      {showPassword ? 'Sembunyikan' : 'Lihat'}
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    disabled={loading}
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer disabled:opacity-70"
                  >
                    <span>
                      {loading
                        ? 'Memverifikasi...'
                        : activeTab === 'superadmin'
                        ? 'Masuk sebagai Super Admin'
                        : 'Masuk sebagai Admin Angkatan'}
                    </span>
                    <span>→</span>
                  </button>
                </div>
              </form>
            )}

            <div className="mt-8 pt-4 border-t border-slate-100 text-center text-xs text-slate-400 space-y-1">
              <p>© 2026 Marching Band Gema Taruna. Dilindungi Hak Cipta.</p>
              <p>
                <a
                  href="https://www.tiktok.com/@novano007"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-amber-600 hover:text-amber-500 hover:underline transition"
                >
                  @novano007 - 2026
                </a>
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
