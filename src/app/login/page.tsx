'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ANGKATAN_LIST, AngkatanId, useAngkatan } from '@/context/AngkatanContext';

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<'admin_angkatan' | 'superadmin' | 'cek_kas_siswa'>('admin_angkatan');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedStudentAngkatan, setSelectedStudentAngkatan] = useState<AngkatanId>('16');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { loginWithCredentials, enterStudentMode } = useAngkatan();

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    const res = loginWithCredentials(identifier, password);
    setLoading(false);

    if (!res.ok || !res.account) {
      setErrorMsg(res.error || 'Akun atau Kata Sandi salah.');
      return;
    }

    const isMobileViewport = typeof window !== 'undefined' && window.innerWidth < 768;
    router.push(isMobileViewport ? '/mobile/dashboard' : '/dashboard');
    router.refresh();
  };

  const handleStudentEnter = (angk?: AngkatanId) => {
    const targetAngkatan = angk || selectedStudentAngkatan;
    enterStudentMode(targetAngkatan);
    const isMobileViewport = typeof window !== 'undefined' && window.innerWidth < 768;
    router.push(isMobileViewport ? '/portal/ringkasan' : '/transparansi');
    router.refresh();
  };

  return (
    <main className="flex-grow flex items-center justify-center p-0 lg:p-6 sm:p-4 min-h-screen bg-slate-50 text-slate-800 font-sans antialiased selection:bg-amber-400 selection:text-slate-900">
      <div className="w-full max-w-7xl bg-white shadow-2xl rounded-none lg:rounded-3xl overflow-hidden border border-slate-200/80 flex flex-col lg:flex-row min-h-[720px]">
        {/* Left Brand Showcase */}
        <section className="lg:w-5/12 bg-gradient-to-br from-slate-950 via-slate-900 to-[#0B1120] text-white p-8 lg:p-12 relative flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800 overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-10 right-0 w-80 h-80 bg-rose-600/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10">
            {/* Logo Resmi Gema Taruna dari Imgur */}
            <div className="inline-block transition-transform hover:scale-105 duration-300 mb-6">
              <div className="w-24 h-24 bg-slate-800/90 border border-amber-500/30 rounded-2xl p-2 flex items-center justify-center shadow-2xl drop-shadow-[0_10px_15px_rgba(245,158,11,0.25)]">
                <img
                  src="/logo.png"
                  alt="Logo Marching Band Gema Taruna"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wider uppercase mb-3">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              Sistem Keuangan Multi-Angkatan (MB16 – MB21)
            </div>

            <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-2 leading-tight">
              KAS GEMA TARUNA
            </h1>

            <p className="text-slate-400 text-sm lg:text-base font-normal leading-relaxed mb-8">
              Disiplin Irama, Transparansi Finansial, Prestasi Marching Arts Indonesia. Pembukuan kas mandiri untuk masing-masing Angkatan 16 s.d. 21.
            </p>

            <div className="bg-slate-800/60 backdrop-blur-md border border-slate-700/70 rounded-2xl p-5 shadow-inner mb-6">
              <div className="flex items-center justify-between border-b border-slate-700/60 pb-3 mb-4">
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                  Status Pembukuan Angkatan
                </span>
                <span className="inline-flex items-center text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  ● 6 Angkatan Aktif
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                {ANGKATAN_LIST.map((angk) => (
                  <div
                    key={angk}
                    className="bg-slate-900/70 border border-slate-700/80 rounded-xl py-2 px-2"
                  >
                    <p className="text-xs font-extrabold text-amber-400">MB {angk}</p>
                    <p className="text-[10px] text-slate-300">Angkatan {angk}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-6 border-t border-slate-700/50">
            <div className="flex items-start gap-4">
              <img
                src="/logo.png"
                alt="MBGT"
                className="w-11 h-11 rounded-full bg-slate-800 p-1 object-contain border border-slate-600 shrink-0"
              />
              <div>
                <p className="text-sm italic text-slate-300 leading-snug mb-1">
                  &ldquo;Setiap angkatan memiliki pembukuan kas tersendiri yang transparan, terpantau langsung oleh Pembina dan seluruh Siswa.&rdquo;
                </p>
                <p className="text-xs font-semibold text-amber-400">
                  Marching Band Gema Taruna <span className="text-slate-400 font-normal">— Sistem Akuntabilitas Kas</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Right Form Panel */}
        <section className="lg:w-7/12 p-8 lg:p-14 bg-white flex flex-col justify-center relative">
          <div className="max-w-md w-full mx-auto">
            <div className="mb-6 text-center sm:text-left">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-1.5">
                Portal Akses Kas Gema Taruna
              </h2>
              <p className="text-slate-500 text-sm">
                Pilih tab akses di bawah ini. Siswa dapat langsung mengecek kas tanpa kata sandi.
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
              <div className="space-y-5 bg-emerald-50/60 border border-emerald-200 rounded-2xl p-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 font-bold">
                    ✓
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900">
                      Akses Langsung Siswa / Anggota (Tanpa Kata Sandi)
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      Siswa tidak memerlukan akun atau kata sandi. Pilih angkatan Anda di bawah ini untuk langsung melihat pembukuan kas & status iuran (Mode Khusus <strong>Hanya Membaca</strong>).
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Pilih Angkatan Anda:
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
                            Buku Kas MB{angk}
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
                  <span>Masuk & Lihat Kas Angkatan {selectedStudentAngkatan} (Hanya Baca)</span>
                  <span>→</span>
                </button>
              </div>
            ) : (
              /* TAB 2 & 3: LOGIN ADMIN ANGKATAN (MB16-MB21) ATAU SUPER ADMIN (PEMBINA) */
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                  {activeTab === 'superadmin' ? (
                    <>
                      <strong className="text-slate-900 block mb-0.5">
                        🛡️ Mode Super Admin (Pembina)
                      </strong>
                      Masuk dengan akun Pembina (<strong>Gema Taruna</strong>) untuk mengisi, memantau, dan mengedit pembukuan seluruh Angkatan 16 s.d. 21.
                    </>
                  ) : (
                    <>
                      <strong className="text-slate-900 block mb-0.5">
                        📒 Mode Admin Bendahara Angkatan (MB16 – MB21)
                      </strong>
                      Masuk dengan akun angkatan Anda (<strong>MB16</strong>, <strong>MB17</strong>, <strong>MB18</strong>, <strong>MB19</strong>, <strong>MB20</strong>, atau <strong>MB21</strong>). Pembukuan tiap angkatan terpisah secara mandiri.
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
                    {activeTab === 'superadmin'
                      ? 'Akun Super Admin (Pembina)'
                      : 'Akun Admin Angkatan (MB16 s.d. MB21)'}
                  </label>
                  <input
                    id="identifier-input"
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="block w-full px-4 py-2.5 sm:py-3 text-slate-900 placeholder-slate-400 text-sm border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition shadow-sm outline-none border"
                    placeholder={
                      activeTab === 'superadmin'
                        ? 'Ketik: Gema Taruna'
                        : 'Ketik: MB16 / MB17 / MB18 / MB19 / MB20 / MB21'
                    }
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
                      placeholder="Masukkan Kata Sandi Resmi"
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
                        ? 'Masuk sebagai Super Admin (Pembina)'
                        : 'Masuk ke Buku Kas Angkatan'}
                    </span>
                    <span>→</span>
                  </button>
                </div>
              </form>
            )}

            {/* Footer Credit @novano007 - 2026 */}
            <div className="mt-8 pt-4 border-t border-slate-100 text-center text-xs text-slate-400 space-y-1">
              <p>© 2026 Marching Band Gema Taruna. Dilindungi Hak Cipta.</p>
              <p>
                Developed by{' '}
                <a
                  href="https://www.instagram.com/novano007"
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
