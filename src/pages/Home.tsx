import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, ArrowRight } from 'lucide-react';
import WelcomeCard from '../components/home/WelcomeCard';
import QuickAccess from '../components/home/QuickAccess';
import TrendingItems from '../components/home/TrendingItems';
import SummaryCard from '../components/home/SummaryCard';
import { useItemStore } from '../stores/itemStore';

function PromoBanner() {
  return (
    <div className="mb-lg rounded-[24px] overflow-hidden shadow-soft hover:shadow-medium transition-shadow mx-1">
      <img src="/assets/banner1-Y8STgM8X.png" alt="Banner Promocional" className="w-full h-auto object-cover min-h-[140px]" />
    </div>
  );
}

function SyncAlert() {
  const navigate = useNavigate();
  return (
    <div 
      onClick={() => navigate('/licenca')}
      className="mb-lg mx-1 p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-orange-100 flex items-center gap-3 cursor-pointer hover:shadow-md transition-all"
    >
      <div className="shrink-0 bg-orange-100 text-orange-600 p-2 rounded-full">
        <AlertCircle size={20} />
      </div>
      <span className="text-sm font-semibold text-orange-900 flex-1">
        Sincronize sua conta do roblox para trazer seus itens!
      </span>
      <ArrowRight size={18} className="text-orange-400" />
    </div>
  );
}

export default function Home() {
  const { fetchFeaturedItems, fetchUserItems } = useItemStore();

  useEffect(() => {
    fetchFeaturedItems();
    fetchUserItems();
  }, [fetchFeaturedItems, fetchUserItems]);

  return (
    <div className="container-app pb-huge relative">
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-brand-secondary/20 to-transparent" />
          <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] bg-brand-primary/5 rounded-full blur-3xl" />
          <div className="absolute top-[20%] -left-[10%] w-[40%] h-[40%] bg-brand-accent/5 rounded-full blur-3xl" />
        </div>

        <WelcomeCard />
        <PromoBanner />
        <SyncAlert />
        <QuickAccess />
        <TrendingItems />
        <SummaryCard />
      </div>
  );
}

