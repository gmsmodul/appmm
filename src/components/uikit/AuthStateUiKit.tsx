import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  UserCheck,
  UserX,
  Lock,
  Unlock,
  KeyRound,
  RefreshCw,
  Copy,
  Check,
  Eye,
  EyeOff,
  LogIn,
  LogOut,
  Monitor,
  Smartphone,
  Tablet,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { HorizontalSlideTrack } from '../ui/HorizontalSlideTrack';
import { UiDocPage, UiDocSection } from './UiDocBlock';

interface AuthStateUiKitProps {
  activeSubJump?: string;
}

type AuthLoginStatus = 'authenticated' | 'guest' | 'mfa_pending' | 'locked';
type RoleKey = 'admin' | 'teacher' | 'assistant' | 'student';
type TokenState = 'valid' | 'expiring' | 'expired';

interface ActiveSession {
  id: string;
  device: string;
  platform: string;
  ip: string;
  lastActive: string;
  current: boolean;
  type: 'desktop' | 'tablet' | 'mobile';
}

const ROLE_CONFIG: Record<
  RoleKey,
  {
    label: string;
    department: string;
    initials: string;
    email: string;
    scope: string;
    permissions: {
      create: boolean;
      read: boolean;
      update: boolean;
      delete: boolean;
      exportData: boolean;
    };
  }
> = {
  admin: {
    label: 'Super Admin',
    department: 'Akademik & Sistem Inti',
    initials: 'SA',
    email: 'admin.core@uikit.design',
    scope: 'Akses penuh seluruh komponen & konfigurasi',
    permissions: { create: true, read: true, update: true, delete: true, exportData: true },
  },
  teacher: {
    label: 'Pengajar / Lead Designer',
    department: 'Matematika & Sains Terapan',
    initials: 'HW',
    email: 'hendra.wijaya@uikit.design',
    scope: 'Kelola materi, tugas, ujian & nilai kelas ampu',
    permissions: { create: true, read: true, update: true, delete: false, exportData: true },
  },
  assistant: {
    label: 'Asisten Lab',
    department: 'Laboratorium Fisika Dasar',
    initials: 'RA',
    email: 'rina.asisten@uikit.design',
    scope: 'Verifikasi presensi & koreksi tugas praktikum',
    permissions: { create: false, read: true, update: true, delete: false, exportData: false },
  },
  student: {
    label: 'Peserta',
    department: 'Kelas 302 · Semester Genap',
    initials: 'ND',
    email: 'nadia.student@uikit.design',
    scope: 'Akses baca materi & unggah tugas pribadi',
    permissions: { create: false, read: true, update: false, delete: false, exportData: false },
  },
};

export const AuthStateUiKit: React.FC<AuthStateUiKitProps> = ({ activeSubJump }) => {
  const { triggerToast } = useApp();

  // Status Login
  const [loginStatus, setLoginStatus] = useState<AuthLoginStatus>('authenticated');
  const [otpCode, setOtpCode] = useState('482910');
  const [otpTimer, setOtpTimer] = useState(28);

  useEffect(() => {
    if (loginStatus !== 'mfa_pending') return;
    const interval = setInterval(() => {
      setOtpTimer((prev) => (prev <= 1 ? 30 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [loginStatus]);

  // User Profile & Hak Akses
  const [selectedRole, setSelectedRole] = useState<RoleKey>('teacher');

  // Token / Session
  const [tokenState, setTokenState] = useState<TokenState>('valid');
  const [showRawToken, setShowRawToken] = useState(false);
  const [tokenCopied, setTokenCopied] = useState(false);
  const [tokenTtl, setTokenTtl] = useState(1420);
  const [refreshingToken, setRefreshingToken] = useState(false);

  const [sessions, setSessions] = useState<ActiveSession[]>([
    {
      id: 'sess-1',
      device: 'Chrome 131 · macOS Sequoia',
      platform: 'Jakarta, ID',
      ip: '103.42.118.24',
      lastActive: 'Aktif sekarang',
      current: true,
      type: 'desktop',
    },
    {
      id: 'sess-2',
      device: 'Safari · iPadOS 18',
      platform: 'Bandung, ID',
      ip: '182.253.77.10',
      lastActive: '14 menit lalu',
      current: false,
      type: 'tablet',
    },
    {
      id: 'sess-3',
      device: 'UI KIT Mobile · Android',
      platform: 'Surabaya, ID',
      ip: '114.122.90.51',
      lastActive: '2 jam lalu',
      current: false,
      type: 'mobile',
    },
  ]);

  useEffect(() => {
    if (tokenState === 'expired') return;
    const timer = setInterval(() => {
      setTokenTtl((prev) => {
        if (prev <= 1) {
          setTokenState('expired');
          return 0;
        }
        if (prev <= 180 && tokenState === 'valid') {
          setTokenState('expiring');
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [tokenState]);

  const formatTtl = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const sampleToken = 'srv_live_eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.9xQ2mK8vLp';

  const isVisible = (itemKey: string) => {
    if (!activeSubJump) return true;
    return (
      activeSubJump.toLowerCase().replace(/[^a-z0-9]/g, '') ===
      itemKey.toLowerCase().replace(/[^a-z0-9]/g, '')
    );
  };

  const activeRole = ROLE_CONFIG[selectedRole];

  const handleRefreshToken = () => {
    setRefreshingToken(true);
    setTimeout(() => {
      setRefreshingToken(false);
      setTokenState('valid');
      setTokenTtl(1800);
      triggerToast('Token Diperbarui', 'Access token baru diterbitkan untuk 30 menit ke depan.', 'success');
    }, 650);
  };

  return (
    <div className="space-y-10 print-section">
      {/* 11.1 STATUS LOGIN */}
      {isVisible('statuslogin') && (
        <UiDocPage
          title="Status Login"
          subLinks={[
            { id: 'auth-status-switch', label: 'Status Login Switcher' },
            { id: 'auth-login-card', label: 'Signed-In Account Card' },
            { id: 'auth-guest-gate', label: 'Unauthenticated Auth Gate' },
            { id: 'auth-mfa', label: 'MFA Verification State' },
          ]}
        >
          <UiDocSection
            id="auth-status-switch"
            title="Status Login Switcher"
            description="Simulasi transisi status masuk antara Authenticated, Guest, MFA Pending, dan Akun Terkunci."
            classesHint="inline-flex / border border-gray-300 rounded-xl p-4"
            codeSnippet={`const [status, setStatus] = useState<'authenticated' | 'guest' | 'mfa_pending' | 'locked'>('authenticated');`}
            actions={<UserCheck className="w-4 h-4 text-primary-600" />}
          >
            <div className="space-y-4 max-w-xl text-xs">
              <div className="flex flex-wrap gap-1.5">
                {(
                  [
                    { key: 'authenticated', label: 'Authenticated' },
                    { key: 'guest', label: 'Guest / Keluar' },
                    { key: 'mfa_pending', label: 'MFA Pending' },
                    { key: 'locked', label: 'Akun Terkunci' },
                  ] as const
                ).map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setLoginStatus(item.key)}
                    className={`px-3 py-1.5 rounded-lg font-semibold cursor-pointer transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                      loginStatus === item.key
                        ? 'bg-primary-600 text-white shadow-xs'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {loginStatus === 'authenticated' && (
                <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/60 flex items-center justify-between gap-3 animate-ui-slide-down">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0">
                      HW
                    </div>
                    <div>
                      <div className="font-bold text-emerald-950">Masuk sebagai Dr. Hendra Wijaya</div>
                      <div className="text-[11px] text-emerald-800">SSO Terverifikasi · Sesi Aktif</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setLoginStatus('guest');
                      triggerToast('Keluar Sesi', 'Akun berhasil logout.', 'info');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-white border border-emerald-200 text-emerald-900 font-semibold hover:bg-emerald-100 inline-flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Keluar</span>
                  </button>
                </div>
              )}

              {loginStatus === 'guest' && (
                <div className="p-4 rounded-xl border border-gray-300 bg-gray-50 flex items-center justify-between gap-3 animate-ui-slide-down">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center shrink-0">
                      <UserX className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Mode Tamu (Belum Masuk)</div>
                      <div className="text-[11px] text-gray-500">Masuk untuk menyimpan progres & mengunggah tugas.</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setLoginStatus('authenticated');
                      triggerToast('Login Berhasil', 'Selamat datang kembali di UI KIT.', 'success');
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-gray-900 text-white font-semibold hover:bg-black inline-flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Masuk Akun</span>
                  </button>
                </div>
              )}

              {loginStatus === 'mfa_pending' && (
                <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/60 flex items-center justify-between gap-3 animate-ui-slide-down">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                      <KeyRound className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-amber-950">Menunggu Verifikasi 2 Langkah (MFA)</div>
                      <div className="text-[11px] text-amber-800 tabular-nums">
                        Kode OTP berlaku {otpTimer} detik lagi.
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setLoginStatus('authenticated');
                      triggerToast('MFA Terverifikasi', 'Otentikasi dua langkah berhasil.', 'success');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-amber-600 text-white font-semibold hover:bg-amber-700 cursor-pointer shrink-0"
                  >
                    Verifikasi
                  </button>
                </div>
              )}

              {loginStatus === 'locked' && (
                <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/70 flex items-center justify-between gap-3 animate-ui-shake">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                      <ShieldAlert className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-rose-950">Akun Dikunci Sementara</div>
                      <div className="text-[11px] text-rose-800">
                        5 kali percobaan kata sandi gagal. Hubungi admin atau pulihkan via email.
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setLoginStatus('authenticated');
                      triggerToast('Pemulihan Akun', 'Tautan buka kunci dikirim & status dipulihkan.', 'info');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-rose-600 text-white font-semibold hover:bg-rose-700 cursor-pointer shrink-0"
                  >
                    Pulihkan
                  </button>
                </div>
              )}
            </div>
          </UiDocSection>

          <UiDocSection
            id="auth-login-card"
            title="Signed-In Account Card"
            classesHint="rounded-xl border border-gray-300 bg-white p-4"
            codeSnippet={`<div className="p-4 rounded-xl border border-gray-300 bg-white flex items-center justify-between">\n  <div className="flex items-center gap-3">...</div>\n  <span className="text-emerald-700 font-semibold">Terverifikasi</span>\n</div>`}
          >
            <div className="max-w-lg p-4 rounded-xl border border-gray-300 bg-white space-y-3 text-xs">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-600 text-white font-bold flex items-center justify-center">
                    HW
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Dr. Hendra Wijaya, M.Pd</div>
                    <div className="text-[11px] text-gray-500">hendra.wijaya@uikit.design</div>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Terverifikasi</span>
                </span>
              </div>
              <div className="pt-2.5 border-t border-gray-300 flex flex-wrap items-center justify-between gap-2 text-[11px] text-gray-500 tabular-nums">
                <span>Metode: Google Workspace SSO</span>
                <span>Login terakhir: 13 Nov 2026 · 08:14 WIB</span>
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="auth-guest-gate"
            title="Unauthenticated Auth Gate"
            description="Pembatas akses untuk rute privat ketika pengguna belum terautentikasi."
            classesHint="rounded-xl border border-dashed border-gray-300 bg-gray-50/70 p-5 text-center"
            codeSnippet={`<div className="p-5 rounded-xl border border-dashed border-gray-300 text-center">\n  <Lock className="w-6 h-6 mx-auto text-gray-500" />\n  <p>Silakan masuk untuk mengakses lembar nilai.</p>\n</div>`}
          >
            <div className="max-w-lg p-5 rounded-xl border border-dashed border-gray-300 bg-gray-50/60 text-center space-y-2.5 text-xs">
              <div className="w-10 h-10 rounded-xl bg-white border border-gray-300 flex items-center justify-center mx-auto text-gray-500">
                <Lock className="w-4 h-4" />
              </div>
              <div className="font-bold text-gray-900 text-sm">Autentikasi Diperlukan</div>
              <p className="text-gray-600 max-w-sm mx-auto">
                Halaman Rekap Nilai Akhir hanya tersedia bagi pengguna yang telah masuk dengan akun institusi.
              </p>
              <button
                type="button"
                onClick={() => triggerToast('Portal Login', 'Membuka halaman otentikasi SSO...', 'info')}
                className="px-4 py-2 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 inline-flex items-center gap-1.5 cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Masuk dengan SSO</span>
              </button>
            </div>
          </UiDocSection>

          <UiDocSection
            id="auth-mfa"
            title="MFA Verification State"
            classesHint="font-mono tracking-widest tabular-nums"
            codeSnippet={`<input type="text" maxLength={6} value={otp} className="font-mono tracking-widest text-center border rounded-lg" />`}
          >
            <div className="max-w-sm p-4 rounded-xl border border-gray-300 bg-white space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-900">Verifikasi 2 Langkah (OTP)</span>
                <span className="text-[11px] font-mono text-primary-600 font-semibold tabular-nums">
                  {otpTimer}s
                </span>
              </div>
              <input
                type="text"
                maxLength={6}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 font-mono text-base font-bold tracking-[0.35em] text-center text-gray-900 focus:outline-none focus:border-primary-600 tabular-nums"
              />
              <div className="flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setOtpTimer(30);
                    triggerToast('OTP Dikirim Ulang', 'Kode verifikasi baru dikirim ke perangkat Anda.', 'info');
                  }}
                  className="text-primary-600 font-semibold hover:underline cursor-pointer"
                >
                  Kirim Ulang Kode
                </button>
                <button
                  type="button"
                  onClick={() => triggerToast('OTP Valid', `Kode ${otpCode} terverifikasi.`, 'success')}
                  className="px-3.5 py-1.5 rounded-lg bg-gray-900 text-white font-semibold hover:bg-black cursor-pointer"
                >
                  Konfirmasi
                </button>
              </div>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 11.2 USER PROFILE & HAK AKSES (ROLES/PERMISSIONS) */}
      {isVisible('userprofilehakaksesrolespermissions') && (
        <UiDocPage
          title="User Profile & Hak Akses (Roles/Permissions)"
          description="Kontrol profil pengguna aktif, matriks izin berbasis peran (RBAC), dan aksi yang terkunci sesuai otorisasi."
          subLinks={[
            { id: 'rbac-profile-role', label: 'Profile & Role Switcher' },
            { id: 'rbac-matrix', label: 'Roles & Permissions Matrix' },
            { id: 'rbac-guard', label: 'Permission-Guarded Actions' },
          ]}
        >
          <UiDocSection
            id="rbac-profile-role"
            title="Profile & Active Role Switcher"
            classesHint="rounded-xl border border-gray-300 bg-white p-4"
            codeSnippet={`<button onClick={() => setRole('teacher')} className={role === 'teacher' ? 'bg-primary-600 text-white' : 'bg-gray-100'}>Pengajar</button>`}
          >
            <div className="max-w-xl space-y-3 text-xs">
              <div className="flex flex-wrap gap-1.5">
                {(Object.keys(ROLE_CONFIG) as RoleKey[]).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedRole(key)}
                    className={`px-3 py-1.5 rounded-lg font-semibold cursor-pointer transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                      selectedRole === key
                        ? 'bg-primary-600 text-white shadow-xs'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {ROLE_CONFIG[key].label}
                  </button>
                ))}
              </div>

              <div key={selectedRole} className="p-4 rounded-xl border border-gray-300 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-ui-fade">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-primary-50 text-primary-700 border border-primary-200 font-bold flex items-center justify-center shrink-0">
                    {activeRole.initials}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900 text-sm">{activeRole.label}</span>
                      <span className="text-[11px] font-semibold text-primary-700 bg-primary-50 px-2 py-0.5 rounded-md">
                        {selectedRole.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-gray-500">{activeRole.email}</div>
                    <div className="text-[11px] text-gray-600 mt-0.5">{activeRole.scope}</div>
                  </div>
                </div>
                <span className="text-[11px] font-medium text-gray-600 bg-gray-50 border border-gray-300 px-2.5 py-1 rounded-lg self-start sm:self-center shrink-0">
                  {activeRole.department}
                </span>
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="rbac-matrix"
            title="Roles & Permissions Matrix"
            classesHint="w-full text-xs border border-gray-300 rounded-xl overflow-hidden"
            codeSnippet={`<table className="w-full text-xs">\n  <thead><tr><th>Peran</th><th>Read</th><th>Write</th><th>Delete</th></tr></thead>\n</table>`}
          >
            <HorizontalSlideTrack
              className="max-w-2xl border border-gray-300 rounded-xl bg-white overflow-hidden"
              trackClassName=""
              fadeEdges={false}
              indicatorSize="wide"
              accent="primary"
              indicatorClassName="py-2 bg-gray-50/70 border-t border-gray-300 mt-0"
            >
              <table className="w-full text-xs text-left">
                <thead className="bg-gray-50 border-b border-gray-300 text-gray-600 font-semibold">
                  <tr>
                    <th className="px-3.5 py-2.5">Peran</th>
                    <th className="px-3 py-2.5 text-center">Create</th>
                    <th className="px-3 py-2.5 text-center">Read</th>
                    <th className="px-3 py-2.5 text-center">Update</th>
                    <th className="px-3 py-2.5 text-center">Delete</th>
                    <th className="px-3 py-2.5 text-center">Export</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {(Object.keys(ROLE_CONFIG) as RoleKey[]).map((key) => {
                    const row = ROLE_CONFIG[key];
                    const isActiveRow = key === selectedRole;
                    const perms = [
                      row.permissions.create,
                      row.permissions.read,
                      row.permissions.update,
                      row.permissions.delete,
                      row.permissions.exportData,
                    ];
                    return (
                      <tr
                        key={key}
                        onClick={() => setSelectedRole(key)}
                        className={`cursor-pointer transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                          isActiveRow ? 'bg-primary-50/50' : 'hover:bg-gray-50'
                        }`}
                      >
                        <td className="px-3.5 py-2.5 font-semibold text-gray-900">
                          {row.label}
                          {isActiveRow && (
                            <span className="ml-2 text-[10px] text-primary-600 font-bold">(Aktif)</span>
                          )}
                        </td>
                        {perms.map((allowed, idx) => (
                          <td key={idx} className="px-3 py-2.5 text-center">
                            {allowed ? (
                              <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">Ya</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-gray-500">
                                <XCircle className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">Tidak</span>
                              </span>
                            )}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </HorizontalSlideTrack>
          </UiDocSection>

          <UiDocSection
            id="rbac-guard"
            title="Permission-Guarded Actions"
            description="Tombol otomatis aktif atau terkunci sesuai peran yang dipilih pada switcher di atas."
            classesHint="disabled:opacity-50 disabled:cursor-not-allowed"
            codeSnippet={`<button disabled={!permissions.delete} className="px-3 py-2 rounded-lg bg-rose-600 text-white disabled:opacity-40">\n  {permissions.delete ? 'Hapus Modul' : 'Butuh Izin Admin'}\n</button>`}
          >
            <div className="flex flex-wrap gap-2.5 max-w-xl text-xs">
              <button
                type="button"
                disabled={!activeRole.permissions.create}
                onClick={() => triggerToast('Modul Baru', 'Akses Create tersedia.', 'success')}
                className="px-3.5 py-2 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed inline-flex items-center gap-1.5 cursor-pointer"
              >
                {activeRole.permissions.create ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                <span>Buat Modul Baru</span>
              </button>

              <button
                type="button"
                disabled={!activeRole.permissions.exportData}
                onClick={() => triggerToast('Ekspor Rapor', 'Mengunduh CSV rekap nilai.', 'info')}
                className="px-3.5 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 font-semibold hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed inline-flex items-center gap-1.5 cursor-pointer"
              >
                {activeRole.permissions.exportData ? <Unlock className="w-3.5 h-3.5 text-emerald-600" /> : <Lock className="w-3.5 h-3.5" />}
                <span>Ekspor Laporan</span>
              </button>

              <button
                type="button"
                disabled={!activeRole.permissions.delete}
                onClick={() => triggerToast('Hapus Data', 'Data dihapus dengan hak Super Admin.', 'warning')}
                className="px-3.5 py-2 rounded-lg bg-rose-600 text-white font-semibold hover:bg-rose-700 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed inline-flex items-center gap-1.5 cursor-pointer"
              >
                {activeRole.permissions.delete ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                <span>Hapus Permanen</span>
              </button>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 11.3 TOKEN / SESSION */}
      {isVisible('tokensession') && (
        <UiDocPage
          title="Token / Session"
          description="Siklus hidup Access Token (TTL), rotasi Refresh Token, dan manajemen sesi perangkat aktif."
          subLinks={[
            { id: 'tok-lifecycle', label: 'Access & Refresh Token' },
            { id: 'tok-sessions', label: 'Active Devices & Sessions' },
            { id: 'tok-expiry-policy', label: 'Session Expiry Banner' },
          ]}
        >
          <UiDocSection
            id="tok-lifecycle"
            title="Access & Refresh Token State"
            description="Ubah state token (Valid, Segera Habis, Kedaluwarsa) dan lakukan rotasi token dengan tombol Refresh Token."
            classesHint="font-mono tabular-nums rounded-xl border"
            codeSnippet={`<div className="p-4 rounded-xl border bg-white font-mono text-xs">\n  <span>TTL: {formatTtl(ttl)}</span>\n  <button onClick={refreshToken}>Refresh Token</button>\n</div>`}
            actions={
              <div className="flex gap-1 text-[11px]">
                {(['valid', 'expiring', 'expired'] as const).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => {
                      setTokenState(st);
                      setTokenTtl(st === 'valid' ? 1420 : st === 'expiring' ? 95 : 0);
                    }}
                    className={`px-2 py-1 rounded font-semibold capitalize cursor-pointer ${
                      tokenState === st ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            }
          >
            <div className="max-w-xl p-4 rounded-xl border border-gray-300 bg-white space-y-3 text-xs">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-primary-600" />
                  <span className="font-bold text-gray-900">JWT Access Token</span>
                  <span
                    key={tokenState}
                    className={`px-2 py-0.5 rounded-md text-[11px] font-semibold animate-ui-pop ${
                      tokenState === 'valid'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : tokenState === 'expiring'
                        ? 'bg-amber-50 text-amber-800 border border-amber-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}
                  >
                    {tokenState === 'valid' ? 'Valid' : tokenState === 'expiring' ? 'Segera Habis' : 'Kedaluwarsa'}
                  </span>
                </div>
                <span className="font-mono font-semibold text-gray-600 tabular-nums inline-flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-gray-500" />
                  TTL: {formatTtl(tokenTtl)}
                </span>
              </div>

              <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-gray-900 text-gray-100 font-mono text-[11px]">
                <span key={showRawToken ? 'raw' : 'masked'} className="truncate animate-ui-fade">
                  {showRawToken ? sampleToken : 'srv_live_••••••••••••••••••••••••••••••9xQ2mK8vLp'}
                </span>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => setShowRawToken(!showRawToken)}
                    aria-label="Toggle token visibility"
                    className="p-1 rounded hover:bg-gray-800 text-gray-300 transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer"
                  >
                    {showRawToken ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard?.writeText(sampleToken);
                      setTokenCopied(true);
                      triggerToast('Token Disalin', 'Access token disalin ke clipboard.', 'info');
                      setTimeout(() => setTokenCopied(false), 1800);
                    }}
                    aria-label="Salin token"
                    className="p-1 rounded hover:bg-gray-800 text-gray-300 transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer"
                  >
                    {tokenCopied ? <Check className="w-3.5 h-3.5 text-emerald-400 animate-ui-check" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-gray-500">Refresh token rotation: Aktif</span>
                <button
                  type="button"
                  disabled={refreshingToken}
                  onClick={handleRefreshToken}
                  className="px-3.5 py-1.5 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 disabled:opacity-70 inline-grid place-items-center transition-colors duration-200 cursor-pointer"
                >
                  <span
                    aria-hidden={!refreshingToken}
                    className={`[grid-area:1/1] inline-flex items-center gap-1.5 transition-opacity duration-150 ${
                      refreshingToken ? 'opacity-100' : 'opacity-0 invisible'
                    }`}
                  >
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Memperbarui...</span>
                  </span>
                  <span
                    className={`[grid-area:1/1] inline-flex items-center gap-1.5 transition-opacity duration-150 ${
                      refreshingToken ? 'opacity-0 invisible' : 'opacity-100'
                    }`}
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Refresh Token</span>
                  </span>
                </button>
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="tok-sessions"
            title="Active Devices & Session Manager"
            classesHint="divide-y divide-gray-200 rounded-xl border border-gray-300"
            codeSnippet={`{sessions.map(s => <div key={s.id} className="flex justify-between p-3.5">...<button onClick={() => revoke(s.id)}>Cabut</button></div>)}`}
          >
            <div className="max-w-xl rounded-xl border border-gray-300 bg-white divide-y divide-gray-200 text-xs overflow-hidden">
              {sessions.map((sess) => {
                const Icon =
                  sess.type === 'desktop' ? Monitor : sess.type === 'tablet' ? Tablet : Smartphone;
                return (
                  <div key={sess.id} className="p-3.5 flex items-center justify-between gap-3 hover:bg-gray-50/70 transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-gray-100 text-gray-700 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-gray-900 flex items-center gap-2">
                          <span className="truncate">{sess.device}</span>
                          {sess.current && (
                            <span className="text-[10px] font-bold text-primary-700 bg-primary-50 px-1.5 py-0.5 rounded shrink-0">
                              Perangkat Ini
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-gray-500 tabular-nums">
                          {sess.platform} · IP {sess.ip} · {sess.lastActive}
                        </div>
                      </div>
                    </div>

                    {!sess.current && (
                      <button
                        type="button"
                        onClick={() => {
                          setSessions((prev) => prev.filter((item) => item.id !== sess.id));
                          triggerToast('Sesi Dicabut', `Akses dari ${sess.device} dihentikan.`, 'warning');
                        }}
                        className="px-2.5 py-1 rounded-md border border-rose-200 bg-rose-50 text-rose-700 font-semibold hover:bg-rose-100 cursor-pointer shrink-0"
                      >
                        Cabut
                      </button>
                    )}
                  </div>
                );
              })}
              {sessions.length <= 1 && (
                <div className="px-3.5 py-2.5 bg-gray-50 text-[11px] text-gray-500 flex items-center justify-between animate-ui-slide-down">
                  <span>Hanya perangkat saat ini yang aktif.</span>
                  <button
                    type="button"
                    onClick={() =>
                      setSessions([
                        sessions[0],
                        {
                          id: 'sess-2',
                          device: 'Safari · iPadOS 18',
                          platform: 'Bandung, ID',
                          ip: '182.253.77.10',
                          lastActive: '14 menit lalu',
                          current: false,
                          type: 'tablet',
                        },
                      ])
                    }
                    className="text-primary-600 font-semibold hover:underline cursor-pointer"
                  >
                    Pulihkan Demo Sesi
                  </button>
                </div>
              )}
            </div>
          </UiDocSection>

          <UiDocSection
            id="tok-expiry-policy"
            title="Session Expiry & Re-auth Banner"
            classesHint="p-4 rounded-xl border border-amber-200 bg-amber-50/70"
            codeSnippet={`<div className="p-4 rounded-xl border border-amber-200 bg-amber-50/70 flex justify-between">\n  <span>Sesi hampir berakhir</span>\n  <button onClick={extend}>Perpanjang Sesi</button>\n</div>`}
          >
            <div className="max-w-xl p-4 rounded-xl border border-amber-200 bg-amber-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-amber-950">Sesi Token Akan Berakhir</div>
                  <p className="text-amber-900">
                    Perpanjang sesi agar proses penilaian yang belum tersimpan tidak terputus.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleRefreshToken}
                  className="px-3 py-1.5 rounded-lg bg-amber-600 text-white font-semibold hover:bg-amber-700 cursor-pointer"
                >
                  Perpanjang Sesi
                </button>
                <button
                  type="button"
                  onClick={() => triggerToast('Logout Global', 'Seluruh sesi perangkat dihentikan.', 'info')}
                  className="px-3 py-1.5 rounded-lg bg-white border border-amber-300 text-amber-900 font-semibold hover:bg-amber-100 cursor-pointer"
                >
                  Logout Semua
                </button>
              </div>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}
    </div>
  );
};
