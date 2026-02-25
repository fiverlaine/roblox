import { Menu } from 'lucide-react';

interface HeaderProps {
  onMenuToggle: () => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
  return (
    <div className="fixed top-0 left-0 right-0 bg-background-primary border-b border-ui-divider z-30 safe-area-top">
      <div className="container-app flex items-center justify-between h-14">
        <button
          onClick={onMenuToggle}
          className="p-sm rounded-lg hover:bg-background-secondary transition-colors"
          aria-label="Menu"
        >
          <Menu size={24} className="text-text-primary" />
        </button>

        <div className="flex items-center gap-0">
          <div className="h-12 w-12 rounded-xl bg-brand-primary flex items-center justify-center shrink-0">
            <span className="text-xl font-bold text-white">R</span>
          </div>
          <span className="text-lg font-bold text-text-primary opacity-80 -ml-2 tracking-tight">
            oblox<span className="text-brand-accent ml-0.5">Vault</span>
          </span>
        </div>

        <div className="w-10" />
      </div>
    </div>
  );
}
