import { Coins, DollarSign, ShieldCheck } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { formatCurrency, formatRobux } from '../../lib/utils';

export default function WelcomeCard() {
  const { profile } = useAuthStore();

  const firstName = profile?.full_name?.split(' ')[0] ?? 'Júlio';
  const robux = profile?.robux_balance ?? 0;
  const real = profile?.real_balance ?? 0;

  return (
    <section className="pt-md mb-lg">
      <div className="relative overflow-visible rounded-[32px] shadow-xl shadow-brand-primary/20 ring-1 ring-black/5 mt-8">
        <div className="absolute inset-0 rounded-[32px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-primary via-[#4F8AE0] to-brand-secondary"></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)] opacity-30"></div>
          <div className="absolute -top-12 -right-10 w-64 h-64 rounded-full bg-white/10 blur-3xl" style={{ opacity: 0.5 }}></div>
        </div>
        <div className="relative p-xl text-white pt-0">
          <div className="flex items-end justify-between mb-lg relative min-h-[140px]">
            <div className="absolute left-0 bottom-0 -ml-4 z-10 w-[140px] md:w-[160px]">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-white/40 blur-[50px] rounded-full -z-10"></div>
              <img src="/assets/personagem-roblox-dando-ola-CEViZ2r4.png" alt="Roblox Character" className="w-full h-auto drop-shadow-2xl filter brightness-110 relative z-10" style={{ transform: 'scale(1.35) translateY(-10px)' }} />
            </div>
            <div className="ml-auto w-[60%] text-right pt-8 pb-2 z-10">
              <p className="text-white/90 font-medium text-sm mb-0">Bem vindo de volta,</p>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight leading-tight text-white drop-shadow-md truncate">
                {firstName}
              </h1>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-md relative z-10">
            <div className="group relative rounded-2xl bg-white/95 shadow-lg shadow-blue-900/20 border border-white/50 p-md backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]">
              <div className="flex items-center justify-between mb-2">
                <div className="p-1.5 rounded-lg bg-blue-50 text-brand-primary">
                  <Coins size={18} />
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity text-xs bg-brand-primary text-white px-2 py-1 rounded-md font-bold shadow-sm">+</button>
              </div>
              <p className="text-xs text-slate-500 font-medium">Saldo Robux</p>
              <p className="text-xl font-bold tracking-tight mt-0.5 truncate text-slate-800">{formatRobux(robux)}</p>
            </div>
            <div className="group relative rounded-2xl bg-white/95 shadow-lg shadow-blue-900/20 border border-white/50 p-md backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]">
              <div className="flex items-center justify-between mb-2">
                <div className="p-1.5 rounded-lg bg-green-50 text-green-600">
                  <DollarSign size={18} />
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity text-xs bg-green-600 text-white px-2 py-1 rounded-md font-bold shadow-sm">Sacar</button>
              </div>
              <p className="text-xs text-slate-500 font-medium">Saldo Real</p>
              <p className="text-xl font-bold tracking-tight mt-0.5 truncate text-slate-800">{formatCurrency(real)}</p>
            </div>
          </div>
          <div className="mt-md text-center">
            <p className="text-white/60 text-[10px] flex items-center justify-center gap-1">
              <ShieldCheck size={10} className="text-green-300" /> Logado como {profile?.full_name ?? firstName}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

