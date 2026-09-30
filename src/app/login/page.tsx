'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [role, setRole] = useState<'bendahara' | 'pembina' | 'anggota'>('bendahara');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const isSupabaseConfigured =
      supabaseUrl.startsWith('https://') &&
      !supabaseUrl.includes('your-project.supabase.co');

    const isDemoAccount = [
      'bendahara@gemataruna.id',
      'pembina@gemataruna.id',
      'anggota@gemataruna.id',
    ].includes(identifier.trim().toLowerCase());

    if (isSupabaseConfigured && !isDemoAccount) {
      const { error } = await supabase.auth.signInWithPassword({
        email: identifier,
        password: password,
      });

      if (error) {
        setLoading(false);
        alert('Gagal masuk: ' + error.message);
        return;
      }
    }

    // Simpan sesi role di cookie (30 hari)
    document.cookie = `kgt_session_role=${role}; path=/; max-age=2592000; SameSite=Lax`;
    setLoading(false);

    const isMobileViewport = typeof window !== 'undefined' && window.innerWidth < 768;

    if (role === 'bendahara') {
      router.push(isMobileViewport ? '/mobile/dashboard' : '/dashboard');
    } else if (role === 'pembina') {
      router.push('/laporan');
    } else {
      router.push(isMobileViewport ? '/portal/ringkasan' : '/transparansi');
    }
    router.refresh();
  };

  const fillDemo = (selectedRole: 'bendahara' | 'pembina' | 'anggota') => {
    setRole(selectedRole);
    if (selectedRole === 'bendahara') {
      setIdentifier('bendahara@gemataruna.id');
      setPassword('123456');
    } else if (selectedRole === 'pembina') {
      setIdentifier('pembina@gemataruna.id');
      setPassword('123456');
    } else {
      setIdentifier('anggota@gemataruna.id');
      setPassword('123456');
    }
  };

  return (
    <main className="flex-grow flex items-center justify-center p-0 lg:p-6 sm:p-4 min-h-screen bg-slate-50 text-slate-800 font-sans antialiased selection:bg-amber-400 selection:text-slate-900">
      <div className="w-full max-w-7xl bg-white shadow-2xl rounded-none lg:rounded-3xl overflow-hidden border border-slate-200/80 flex flex-col lg:flex-row min-h-[720px]">
        
        {/* Left Brand Showcase */}
        <section className="lg:w-5/12 bg-gradient-to-br from-slate-950 via-slate-900 to-[#0B1120] text-white p-8 lg:p-12 relative flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800 overflow-hidden">
          {/* Background Accents */}
          <div className="absolute inset-0 cadence-pattern pointer-events-none opacity-40"></div>
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-10 right-0 w-80 h-80 bg-rose-600/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="absolute top-28 right-0 w-48 h-1 wave-line opacity-50"></div>
          <div className="absolute top-32 right-0 w-36 h-1 wave-line opacity-30"></div>

          <div className="relative z-10">
            {/* Logo Placeholder */}
            <div className="inline-block transition-transform hover:scale-105 duration-300 mb-6">
              <div className="w-24 h-24 bg-slate-800 rounded-2xl flex items-center justify-center shadow-2xl drop-shadow-[0_10px_15px_rgba(245,158,11,0.25)] text-amber-500">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path></svg>
              </div>
            </div>
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wider uppercase mb-3">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              Sistem Keuangan Marching Band Terpadu
            </div>
            
            <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-2 leading-tight">
              KAS GEMA TARUNA
            </h1>
            
            <p className="text-slate-400 text-sm lg:text-base font-normal leading-relaxed mb-8">
              Disiplin Irama, Transparansi Finansial, Prestasi Marching Arts Indonesia.
            </p>

            <div className="bg-slate-800/60 backdrop-blur-md border border-slate-700/70 rounded-2xl p-5 shadow-inner mb-6">
              <div className="flex items-center justify-between border-b border-slate-700/60 pb-3 mb-4">
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">Ringkasan Kas Terkini</span>
                <span className="inline-flex items-center text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  ● Live Sync
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-400">Total Kas Terkelola</p>
                  <p className="text-lg font-bold text-amber-300 tracking-tight">Rp 12.450.000</p>
                  <p className="text-[11px] text-emerald-400 font-medium">100% Terekonsiliasi</p>
                </div>
                <div className="border-l border-slate-700/80 pl-4">
                  <p className="text-xs text-slate-400">Kepatuhan Iuran</p>
                  <p className="text-lg font-bold text-white tracking-tight">80% Skuad</p>
                  <p className="text-[11px] text-amber-400 font-medium">Bulan Berjalan</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-6 border-t border-slate-700/50">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-700 flex-shrink-0 flex items-center justify-center">
                <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              </div>
              <div>
                <p className="text-sm italic text-slate-300 leading-snug mb-1">
                  "Sistem ini memastikan tidak ada lagi iuran yang tercecer. Transparansi adalah kunci solidnya tim."
                </p>
                <p className="text-xs font-semibold text-amber-400">
                  Kak Fahmi Pratama <span className="text-slate-500 font-normal">— Bendahara Umum MBGT</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Right Form Panel */}
        <section className="lg:w-7/12 p-8 lg:p-14 bg-white flex flex-col justify-center relative">
          <div className="max-w-md w-full mx-auto">
            <div className="mb-8 text-center sm:text-left">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">Portal Akses Masuk</h2>
              <p className="text-slate-500 text-sm">Pilih peran Anda untuk mengakses dashboard yang sesuai.</p>
            </div>

            <div className="mb-6">
              <div className="flex p-1 bg-slate-100/80 rounded-xl border border-slate-200">
                <button 
                  onClick={() => setRole('bendahara')}
                  className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${role === 'bendahara' ? 'bg-white text-slate-900 shadow-sm border border-slate-200/50' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}>
                  Bendahara
                </button>
                <button 
                  onClick={() => setRole('pembina')}
                  className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${role === 'pembina' ? 'bg-white text-slate-900 shadow-sm border border-slate-200/50' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}>
                  Pembina
                </button>
                <button 
                  onClick={() => setRole('anggota')}
                  className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${role === 'anggota' ? 'bg-white text-slate-900 shadow-sm border border-slate-200/50' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}>
                  Anggota
                </button>
              </div>

              {/* Demo quick fill */}
              <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
                <span>Ingin demo akun reviewer?</span>
                <div className="flex gap-1.5">
                  <button type="button" onClick={() => fillDemo('bendahara')} className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 font-medium transition">Demo Bendahara</button>
                  <button type="button" onClick={() => fillDemo('pembina')} className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 font-medium transition">Demo Pembina</button>
                  <button type="button" onClick={() => fillDemo('anggota')} className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 font-medium transition">Demo Anggota</button>
                </div>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5" htmlFor="identifier-input">
                  Nomor WhatsApp / Email / Nomor Induk Anggota (NIA)
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                    </svg>
                  </div>
                  <input 
                    id="identifier-input" 
                    type="text" 
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="block w-full pl-10 pr-4 py-2.5 sm:py-3 text-slate-900 placeholder-slate-400 text-sm border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition shadow-sm outline-none border" 
                    placeholder="contoh: 081234567890 atau email@gemataruna.id" 
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700" htmlFor="password-input">
                    Kata Sandi / PIN Keamanan
                  </label>
                  <a href="#" className="text-xs font-semibold text-amber-600 hover:text-amber-700 transition">
                    Lupa Password?
                  </a>
                </div>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                  </div>
                  <input 
                    id="password-input" 
                    type={showPassword ? 'text' : 'password'} 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-11 py-2.5 sm:py-3 text-slate-900 placeholder-slate-400 text-sm border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition shadow-sm outline-none border" 
                    placeholder="••••••••" 
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-amber-500 focus:ring-amber-400 transition cursor-pointer" />
                  <span className="text-xs text-slate-600 font-medium select-none">Ingat sesi saya di perangkat ini (30 Hari)</span>
                </label>
              </div>

              <div className="pt-2">
                <button 
                  disabled={loading}
                  type="submit" 
                  className="w-full relative overflow-hidden bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-slate-900/20 hover:shadow-xl hover:shadow-amber-500/10 focus:ring-4 focus:ring-amber-500/30 transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base border border-slate-700 group disabled:opacity-70">
                  <span className="relative z-10 flex items-center gap-2">
                    <span>{loading ? 'Memproses...' : `Masuk sebagai ${role.charAt(0).toUpperCase() + role.slice(1)}`}</span>
                    {!loading && (
                      <svg className="w-5 h-5 text-amber-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    )}
                  </span>
                </button>
              </div>
            </form>

            <div className="mt-8 text-center text-xs text-slate-400">
              <p>© 2026 Marching Band Gema Taruna. Dilindungi Hak Cipta.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
