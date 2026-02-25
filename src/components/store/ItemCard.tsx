import { Coins } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Item } from '../../lib/types';
import { formatRobux, cn } from '../../lib/utils';
import { RARITY_COLORS } from '../../lib/constants';

interface ItemCardProps {
  item: Item;
  onClick: (item: Item) => void;
}

export default function ItemCard({ item, onClick }: ItemCardProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={() => onClick(item)}
      className="group w-full text-left bg-white rounded-2xl shadow-sm border border-transparent hover:shadow-xl hover:border-brand-primary/20 transition-all duration-200 overflow-hidden"
    >
      <div className="relative aspect-square bg-background-secondary flex items-center justify-center p-3">
        {item.rarity && (
          <span
            className={cn(
              'absolute top-2 left-2 badge text-[10px] font-semibold px-2 py-0.5',
              RARITY_COLORS[item.rarity] ?? 'bg-gray-100 text-gray-600',
            )}
          >
            {item.rarity}
          </span>
        )}
        {item.image_url ? (
          <img
            src={item.image_url}
            alt={item.name}
            className="w-full h-full object-contain"
            loading="lazy"
          />
        ) : (
          <div className="w-16 h-16 rounded-xl bg-brand-secondary/30 flex items-center justify-center">
            <Coins className="w-8 h-8 text-brand-primary/40" />
          </div>
        )}
      </div>

      <div className="p-3 space-y-2">
        <h3 className="text-sm font-semibold text-text-primary line-clamp-2 leading-snug min-h-[2.5em]">
          {item.name}
        </h3>

        <div className="flex items-center gap-1 text-brand-primary">
          <Coins className="w-3.5 h-3.5" />
          <span className="text-sm font-bold">{formatRobux(item.price_robux)}</span>
          <span className="text-[10px] text-text-tertiary font-medium ml-0.5">R$</span>
        </div>

        <div className="pt-1">
          <span className="block w-full text-center text-xs font-semibold text-white bg-brand-primary hover:bg-brand-primary/90 rounded-full py-2 transition-colors">
            Comprar
          </span>
        </div>
      </div>
    </motion.button>
  );
}
