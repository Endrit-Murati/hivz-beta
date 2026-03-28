/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BookOpen, Users, Shield, GraduationCap, LogOut, UserPlus, X, CheckCircle, AlertCircle } from 'lucide-react';
import { QURAN_SURAHS } from './quran';

type Role = 'director' | 'teacher' | 'student';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  role: Role;
  pagesLearned: number;
}

export interface MemorizationLogEntry {
  id: string;
  studentId: string;
  teacherId: string;
  date: string;
  surahId: number;
  pageNumber: number;
  startAyah: number;
  endAyah: number;
  status: string;
  errorsCount?: number;
}

const MOCK_USERS: User[] = [
  {
    id: '1',
    firstName: 'Admin',
    lastName: 'Director',
    email: 'admin@hivzpro.com',
    password: 'password123',
    role: 'director',
    pagesLearned: 604,
  },
  {
    id: '2',
    firstName: 'Hoxha',
    lastName: 'Teacher',
    email: 'teacher@hivzpro.com',
    password: 'password123',
    role: 'teacher',
    pagesLearned: 604,
  },
  {
    id: '3',
    firstName: 'Ali',
    lastName: 'Student',
    email: 'student@hivzpro.com',
    password: 'password123',
    role: 'student',
    pagesLearned: 150,
  }
];

export default function App() {
  const [view, setView] = useState<'landing' | 'login' | 'register' | 'dashboard'>('landing');
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [memorizationLogs, setMemorizationLogs] = useState<MemorizationLogEntry[]>([]);

  const handleLogin = (email: string, pass: string) => {
    const user = users.find(u => u.email === email && u.password === pass);
    if (user) {
      setCurrentUser(user);
      setView('dashboard');
      return true;
    }
    return false;
  };

  const handleRegister = (data: any) => {
    const newUser: User = {
      ...data,
      id: Date.now().toString(),
      role: 'student',
      pagesLearned: 0
    };
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    setView('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView('landing');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {view === 'landing' && <LandingPage setView={setView} />}
      {view === 'login' && <Login setView={setView} onLogin={handleLogin} />}
      {view === 'register' && <Register setView={setView} onRegister={handleRegister} />}
      {view === 'dashboard' && currentUser && (
        <Dashboard 
          user={currentUser} 
          users={users} 
          setUsers={setUsers} 
          onLogout={handleLogout}
          logs={memorizationLogs}
          setLogs={setMemorizationLogs}
        />
      )}
    </div>
  );
}

function LandingPage({ setView }: { setView: (v: any) => void }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-emerald-800 text-white p-4 sm:p-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <BookOpen className="w-8 h-8" />
          <span className="text-2xl font-bold">Hivz Pro</span>
        </div>
        <div className="flex gap-4">
          <button onClick={() => setView('login')} className="hover:text-emerald-200 font-medium">Login</button>
          <button onClick={() => setView('register')} className="bg-white text-emerald-800 px-4 py-2 rounded-md font-medium hover:bg-emerald-50 transition-colors">Register</button>
        </div>
      </header>

      <main className="flex-grow">
        <section className="bg-emerald-800 text-white py-20 px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Ruaje Kuranin në Zemër</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-emerald-100">
            Hivz Pro është platforma juaj digjitale për të menaxhuar, ndjekur dhe frymëzuar rrugëtimin e mësimit përmendësh të Kuranit.
          </p>
          <div className="flex justify-center gap-4">
            <button onClick={() => setView('register')} className="bg-white text-emerald-800 px-8 py-3 rounded-lg font-bold text-lg hover:bg-emerald-50 transition-colors shadow-lg">
              Fillo Tani
            </button>
          </div>
        </section>

        <section className="py-16 px-6 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-emerald-800 mb-4">Pse Hivz Pro?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ne ofrojmë një zgjidhje të thjeshtë dhe efektive për problemin e ndjekjes së progresit të nxënësve, duke lidhur drejtorët, mësuesit dhe studentët në një platformë të vetme.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-700">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Për Drejtorët</h3>
              <p className="text-gray-600">Menaxhim total i institucionit. Shto mësues dhe studentë, dhe mbikëqyr progresin e përgjithshëm.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-700">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Për Mësuesit</h3>
              <p className="text-gray-600">Ndjekje e detajuar e secilit student. Regjistro faqet e reja dhe motivo nxënësit e tu.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-700">
                <GraduationCap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Për Studentët</h3>
              <p className="text-gray-600">Vizualizo progresin tënd. Shiko sa faqe ke mësuar dhe sa të kanë mbetur për të përfunduar Hifzin.</p>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-900 text-gray-400 py-8 text-center">
        <p>&copy; {new Date().getFullYear()} Hivz Pro. Të gjitha të drejtat e rezervuara.</p>
      </footer>
    </div>
  );
}

function Login({ setView, onLogin }: { setView: (v: any) => void, onLogin: (e: string, p: string) => boolean }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onLogin(email, password);
    if (!success) {
      setError('Email ose fjalëkalim i pasaktë. (Përdor admin@hivzpro.com / password123)');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-100">
        <div className="flex justify-center mb-6">
          <div className="bg-emerald-100 p-3 rounded-full text-emerald-700">
            <BookOpen className="w-8 h-8" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Mirësevini sërish</h2>
        <p className="text-center text-gray-500 mb-8">Hyni në llogarinë tuaj Hivz Pro</p>
        
        {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" placeholder="emri@shembull.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fjalëkalimi</label>
            <input required type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" placeholder="••••••••" />
          </div>
          <button type="submit" className="w-full bg-emerald-600 text-white rounded-lg p-3 font-bold hover:bg-emerald-700 transition-colors mt-2">
            Hyr
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm text-gray-600">
          Nuk keni llogari? <button onClick={() => setView('register')} className="text-emerald-600 font-bold hover:underline">Regjistrohuni</button>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-100 text-xs text-gray-400 text-center">
          <p>Të dhëna testimi:</p>
          <p>Drejtor: admin@hivzpro.com / password123</p>
          <p>Mësues: teacher@hivzpro.com / password123</p>
          <p>Student: student@hivzpro.com / password123</p>
        </div>
      </div>
    </div>
  );
}

function Register({ setView, onRegister }: { setView: (v: any) => void, onRegister: (d: any) => void }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-100">
        <div className="flex justify-center mb-6">
          <div className="bg-emerald-100 p-3 rounded-full text-emerald-700">
            <UserPlus className="w-8 h-8" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Krijo Llogari</h2>
        <p className="text-center text-gray-500 mb-8">Bashkohu me Hivz Pro si student</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Emri</label>
              <input required type="text" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" placeholder="Emri" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mbiemri</label>
              <input required type="text" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" placeholder="Mbiemri" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" placeholder="emri@shembull.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fjalëkalimi</label>
            <input required type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" placeholder="••••••••" />
          </div>
          <button type="submit" className="w-full bg-emerald-600 text-white rounded-lg p-3 font-bold hover:bg-emerald-700 transition-colors mt-2">
            Regjistrohu
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm text-gray-600">
          Keni tashmë një llogari? <button onClick={() => setView('login')} className="text-emerald-600 font-bold hover:underline">Hyni këtu</button>
        </div>
      </div>
    </div>
  );
}

function Dashboard({ user, users, setUsers, onLogout, logs, setLogs }: { user: User, users: User[], setUsers: (u: User[]) => void, onLogout: () => void, logs: MemorizationLogEntry[], setLogs: (l: MemorizationLogEntry[]) => void }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-emerald-800 text-white p-4 shadow-md flex justify-between items-center">
        <div className="flex items-center gap-2">
          <BookOpen className="w-6 h-6" />
          <span className="text-xl font-bold">Hivz Pro</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-emerald-100 hidden sm:block">
            Mirësevini, <span className="font-bold text-white">{user.firstName}</span> ({user.role})
          </div>
          <button onClick={onLogout} className="flex items-center gap-1 hover:text-emerald-200 transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="hidden sm:inline">Dil</span>
          </button>
        </div>
      </header>

      <main className="flex-grow p-4 sm:p-6 max-w-7xl mx-auto w-full">
        {user.role === 'director' && <DirectorDashboard users={users} setUsers={setUsers} />}
        {user.role === 'teacher' && <TeacherDashboard user={user} users={users} setUsers={setUsers} logs={logs} setLogs={setLogs} />}
        {user.role === 'student' && <StudentDashboard user={user} />}
      </main>
    </div>
  );
}

function DirectorDashboard({ users, setUsers }: { users: User[], setUsers: (u: User[]) => void }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Paneli i Drejtorit</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-emerald-700 transition-colors"
        >
          <UserPlus className="w-5 h-5" />
          <span>Shto Përdorues</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-600">
                <th className="p-4 font-medium">Emri Mbiemri</th>
                <th className="p-4 font-medium">Email</th>
                <th className="p-4 font-medium">Roli</th>
                <th className="p-4 font-medium">Progresi</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-800">{u.firstName} {u.lastName}</td>
                  <td className="p-4 text-gray-600">{u.email}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize
                      ${u.role === 'director' ? 'bg-purple-100 text-purple-700' : 
                        u.role === 'teacher' ? 'bg-blue-100 text-blue-700' : 
                        'bg-emerald-100 text-emerald-700'}`}>
                      {u.role === 'director' ? 'Drejtor' : u.role === 'teacher' ? 'Mësues' : 'Student'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600 w-12">{u.pagesLearned}/604</span>
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-emerald-500" 
                          style={{ width: `${(u.pagesLearned / 604) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <AddUserModal 
          onClose={() => setIsModalOpen(false)} 
          onAdd={(newUser) => {
            setUsers([...users, newUser]);
            setIsModalOpen(false);
          }} 
        />
      )}
    </div>
  );
}

function AddUserModal({ onClose, onAdd }: { onClose: () => void, onAdd: (u: User) => void }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: 'password123',
    role: 'student' as Role,
    pagesLearned: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      ...formData,
      id: Date.now().toString(),
      pagesLearned: Number(formData.pagesLearned)
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-800">Shto Përdorues të Ri</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Emri</label>
              <input required type="text" className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mbiemri</label>
              <input required type="text" className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input required type="email" className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Roli</label>
              <select className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value as Role})}>
                <option value="student">Student</option>
                <option value="teacher">Mësues</option>
                <option value="director">Drejtor</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Faqe Fillestare</label>
              <input required type="number" min="0" max="604" className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" value={formData.pagesLearned} onChange={e => setFormData({...formData, pagesLearned: Number(e.target.value)})} />
            </div>
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">Anulo</button>
            <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">Ruaj</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ProgressBar({ pagesLearned }: { pagesLearned: number }) {
  const totalPages = 604;
  const percentage = Math.min(100, Math.max(0, (pagesLearned / totalPages) * 100));
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex justify-between items-end mb-2">
        <div>
          <h3 className="text-lg font-bold text-gray-800">Progresi i Hifzit</h3>
          <p className="text-sm text-gray-500">Faqet e mësuara deri tani</p>
        </div>
        <div className="text-right">
          <span className="text-3xl font-bold text-emerald-600">{pagesLearned}</span>
          <span className="text-gray-400"> / {totalPages}</span>
        </div>
      </div>
      <div className="h-4 bg-gray-100 rounded-full overflow-hidden mb-2">
        <div 
          className="h-full bg-emerald-500 transition-all duration-1000 ease-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-xs text-gray-500 font-medium">
        <span>0%</span>
        <span>{percentage.toFixed(1)}% e përfunduar</span>
        <span>100%</span>
      </div>
    </div>
  );
}

function StudentDashboard({ user }: { user: User }) {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Profili im</h2>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-2xl font-bold">
          {user.firstName[0]}{user.lastName[0]}
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">{user.firstName} {user.lastName}</h3>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>

      <ProgressBar pagesLearned={user.pagesLearned} />
    </div>
  );
}

function TeacherDashboard({ user, users, setUsers, logs, setLogs }: { user: User, users: User[], setUsers: (u: User[]) => void, logs: MemorizationLogEntry[], setLogs: (l: MemorizationLogEntry[]) => void }) {
  const students = users.filter(u => u.role === 'student');

  const [selectedStudentId, setSelectedStudentId] = useState<string>('');
  const [selectedSurahId, setSelectedSurahId] = useState<number>(1);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [startAyah, setStartAyah] = useState<number>(1);
  const [endAyah, setEndAyah] = useState<number>(7);
  const [status, setStatus] = useState<string>('Kaloi');
  const [errorsCount, setErrorsCount] = useState<number>(0);
  const [formError, setFormError] = useState<string>('');

  const selectedSurah = QURAN_SURAHS.find(s => s.id === selectedSurahId) || QURAN_SURAHS[0];

  const handleSurahChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const surahId = Number(e.target.value);
    setSelectedSurahId(surahId);
    const surah = QURAN_SURAHS.find(s => s.id === surahId);
    if (surah) {
      setPageNumber(surah.start_page);
      setStartAyah(1);
      setEndAyah(surah.total_ayahs > 10 ? 10 : surah.total_ayahs);
    }
  };

  const handleLogProgress = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!selectedStudentId) {
      setFormError('Ju lutem zgjidhni një student.');
      return;
    }

    if (startAyah < 1 || endAyah > selectedSurah.total_ayahs || startAyah > endAyah) {
      setFormError(`Ajetet duhet të jenë midis 1 dhe ${selectedSurah.total_ayahs}, dhe ajeti fillestar nuk mund të jetë më i madh se ai përfundimtar.`);
      return;
    }

    if (pageNumber < 1 || pageNumber > 604) {
      setFormError('Faqja duhet të jetë midis 1 dhe 604.');
      return;
    }

    const newLog: MemorizationLogEntry = {
      id: Date.now().toString(),
      studentId: selectedStudentId,
      teacherId: user.id,
      date: new Date().toLocaleDateString('sq-AL'),
      surahId: selectedSurahId,
      pageNumber,
      startAyah,
      endAyah,
      status,
      errorsCount: status === 'Kaloi me gabime' || status === 'Nuk kaloi' ? errorsCount : undefined,
    };

    setLogs([newLog, ...logs]);
    
    // Reset form partially for next entry
    setStartAyah(endAyah < selectedSurah.total_ayahs ? endAyah + 1 : 1);
    setEndAyah(endAyah < selectedSurah.total_ayahs ? Math.min(endAyah + 10, selectedSurah.total_ayahs) : selectedSurah.total_ayahs);
    setErrorsCount(0);
    setStatus('Kaloi');
  };

  const updateStudentProgress = (studentId: string, newPages: number) => {
    setUsers(users.map(u => u.id === studentId ? { ...u, pagesLearned: newPages } : u));
  };

  return (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Profili im (Mësues)</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-2xl font-bold">
                  {user.firstName[0]}{user.lastName[0]}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{user.firstName} {user.lastName}</h3>
                  <p className="text-gray-500">{user.email}</p>
                </div>
              </div>
              <ProgressBar pagesLearned={user.pagesLearned} />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Studentët e mi</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {students.map(student => (
                <div key={student.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold text-gray-800">{student.firstName} {student.lastName}</h4>
                      <p className="text-xs text-gray-500">{student.email}</p>
                    </div>
                    <div className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded text-xs font-bold">
                      {student.pagesLearned}/604
                    </div>
                  </div>
                  
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-4">
                    <div 
                      className="h-full bg-emerald-500"
                      style={{ width: `${(student.pagesLearned / 604) * 100}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input 
                      type="number" 
                      min="0" 
                      max="604" 
                      value={student.pagesLearned}
                      onChange={(e) => updateStudentProgress(student.id, Number(e.target.value))}
                      className="w-20 border border-gray-300 rounded p-1 text-sm focus:ring-1 focus:ring-emerald-500 outline-none"
                    />
                    <span className="text-xs text-gray-500">Përditëso faqet</span>
                  </div>
                </div>
              ))}
              {students.length === 0 && (
                <p className="text-gray-500 col-span-full">Nuk keni asnjë student të regjistruar.</p>
              )}
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Historiku i Progresit</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {logs.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  Nuk ka asnjë regjistrim progresit ende.
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {logs.map(log => {
                    const student = users.find(u => u.id === log.studentId);
                    const surah = QURAN_SURAHS.find(s => s.id === log.surahId);
                    return (
                      <div key={log.id} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-bold text-gray-800">{student?.firstName} {student?.lastName}</h4>
                          <span className="text-sm text-gray-500">Data: {log.date}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">
                          Surja: <span className="font-medium text-gray-800">{surah?.name_sq} ({surah?.name_ar})</span> | Faqja: <span className="font-medium text-gray-800">{log.pageNumber}</span> | Ajetet: <span className="font-medium text-gray-800">{log.startAyah} - {log.endAyah}</span>
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          {log.status === 'Kaloi' ? (
                            <CheckCircle className="w-4 h-4 text-emerald-500" />
                          ) : log.status === 'Kaloi me gabime' ? (
                            <AlertCircle className="w-4 h-4 text-amber-500" />
                          ) : (
                            <X className="w-4 h-4 text-red-500" />
                          )}
                          <span className={`text-sm font-medium ${
                            log.status === 'Kaloi' ? 'text-emerald-600' : 
                            log.status === 'Kaloi me gabime' ? 'text-amber-600' : 
                            'text-red-600'
                          }`}>
                            Statusi: {log.status} {log.errorsCount ? `(Me ${log.errorsCount} gabime)` : ''}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Regjistro Progresin</h3>
            
            {formError && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4">
                {formError}
              </div>
            )}

            <form onSubmit={handleLogProgress} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Studenti</label>
                <select 
                  required
                  value={selectedStudentId}
                  onChange={(e) => setSelectedStudentId(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  <option value="" disabled>Zgjidh studentin...</option>
                  {students.map(s => (
                    <option key={s.id} value={s.id}>{s.firstName} {s.lastName}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Surja</label>
                <select 
                  value={selectedSurahId}
                  onChange={handleSurahChange}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  {QURAN_SURAHS.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.id}. {s.name_sq} ({s.name_ar}) - {s.total_ayahs} ajete
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Faqja (1-604)</label>
                <input 
                  type="number" 
                  min="1" 
                  max="604" 
                  required
                  value={pageNumber}
                  onChange={(e) => setPageNumber(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prej ajetit</label>
                  <input 
                    type="number" 
                    min="1" 
                    max={selectedSurah.total_ayahs} 
                    required
                    value={startAyah}
                    onChange={(e) => setStartAyah(Number(e.target.value))}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Deri te ajeti</label>
                  <input 
                    type="number" 
                    min="1" 
                    max={selectedSurah.total_ayahs} 
                    required
                    value={endAyah}
                    onChange={(e) => setEndAyah(Number(e.target.value))}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500 text-right">Max ajete: {selectedSurah.total_ayahs}</p>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Statusi</label>
                <select 
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  <option value="Kaloi">Kaloi</option>
                  <option value="Kaloi me gabime">Kaloi me gabime</option>
                  <option value="Nuk kaloi">Nuk kaloi</option>
                </select>
              </div>

              {(status === 'Kaloi me gabime' || status === 'Nuk kaloi') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Numri i gabimeve</label>
                  <input 
                    type="number" 
                    min="1" 
                    required
                    value={errorsCount}
                    onChange={(e) => setErrorsCount(Number(e.target.value))}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              )}

              <button 
                type="submit" 
                className="w-full bg-emerald-600 text-white rounded-lg p-3 font-bold hover:bg-emerald-700 transition-colors mt-4"
              >
                Ruaj Progresin
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
