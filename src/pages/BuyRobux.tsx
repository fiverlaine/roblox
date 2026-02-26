import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Coins, Check, CreditCard, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { useAuthStore } from "../stores/authStore";
import { supabase } from "../lib/supabase";

const ROBUX_PACKAGES = [
  { id: 1, robux: 500, price: 29.9 },
  { id: 2, robux: 1000, price: 59.0 },
  { id: 3, robux: 2000, price: 117.9 },
  { id: 4, robux: 5250, price: 294.9 },
  { id: 5, robux: 11000, price: 589.9, popular: true },
  { id: 6, robux: 24000, price: 1179.9 },
];

function formatCardInput(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiryInput(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return digits;
}

export default function BuyRobux() {
  const navigate = useNavigate();
  const { refreshBalance } = useAuthStore();
  const [selectedPackage, setSelectedPackage] = useState<typeof ROBUX_PACKAGES[0] | null>(null);
  const [loading, setLoading] = useState(false);

  // Card form states
  const [cardNumber, setCardNumber] = useState("");
  const [holderName, setHolderName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const isCardValid =
    cardNumber.replace(/\s/g, "").length === 16 &&
    holderName.trim().length >= 3 &&
    /^\d{2}\/\d{2}$/.test(expiry) &&
    /^\d{3}$/.test(cvv);

  const handlePayment = async () => {
    if (!selectedPackage) return;

    if (!isCardValid) {
      toast.error("Preencha todos os dados do cartão corretamente");
      return;
    }


    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("Sessão expirada. Faça login novamente.");
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/validate-card-purchase`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            card_number: cardNumber,
            holder_name: holderName,
            expiry,
            cvv,
            robux_amount: selectedPackage.robux,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.error || "Erro ao processar pagamento");
        return;
      }

      await refreshBalance();
      toast.success(result.message || "Compra realizada com sucesso!");
      
      // Reset form
      setCardNumber("");
      setHolderName("");
      setExpiry("");
      setCvv("");
      setSelectedPackage(null);
      
      navigate("/");
    } catch (error) {
      toast.error("Erro ao processar compra. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-app pb-huge">
      <div className="flex items-center gap-md pt-xl mb-xl">
        <button
          onClick={() => navigate(-1)}
          className="p-sm rounded-lg hover:bg-background-secondary transition-colors"
        >
          <ArrowLeft size={24} className="text-text-primary" />
        </button>
        <div>
          <h1 className="text-title font-bold text-text-primary">
            Comprar Robux
          </h1>
          <p className="text-body text-text-secondary">Escolha seu pacote e pague com cartão</p>
        </div>
      </div>



      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card bg-gradient-to-r from-brand-primary to-brand-secondary mb-lg"
      >
        <div className="flex items-center gap-md text-white">
          <div className="p-md rounded-xl bg-white/20">
            <Coins size={32} />
          </div>
          <div>
            <p className="text-subtitle font-bold mb-xxs">
              Pagamento com Cartão
            </p>
            <p className="text-body text-white/90">Use o cartão gerado no bot do Telegram</p>
          </div>
        </div>
      </motion.div>

      <div className="space-y-md mb-xl">
        {ROBUX_PACKAGES.map((pkg) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setSelectedPackage(pkg)}
            className={`card card-interactive relative transition-all duration-300 ${
              selectedPackage?.id === pkg.id
                ? "ring-2 ring-brand-primary bg-brand-primary/5"
                : ""
            }`}
          >
            {pkg.popular && (
              <div className="absolute -top-2 -right-2 bg-brand-accent text-white px-sm py-xxs rounded-full text-small font-semibold">
                Popular
              </div>
            )}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-md">
                <div
                  className={`p-sm rounded-lg ${selectedPackage?.id === pkg.id ? "bg-brand-primary/20" : "bg-brand-primary/10"}`}
                >
                  <Coins size={24} className="text-brand-primary" />
                </div>
                <div>
                  <p className="text-subtitle font-bold text-text-primary">
                    {pkg.robux.toLocaleString("pt-BR")} Robux
                  </p>
                  <p className="text-caption text-text-secondary">
                    R${" "}
                    {pkg.price.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </div>
              {selectedPackage?.id === pkg.id && (
                <div className="w-6 h-6 rounded-full bg-brand-primary flex items-center justify-center">
                  <Check size={16} className="text-white" />
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedPackage && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mb-xl"
          >
            <h2 className="text-subtitle font-bold text-text-primary mb-md">
              Dados do Cartão
            </h2>
            <p className="text-caption text-text-secondary mb-md">
              Insira os dados do cartão gerado pelo bot do Telegram
            </p>

            <div className="space-y-md mb-lg">
              <div className="w-full">
                <label className="block text-body font-medium text-text-primary mb-xs">
                  Número do Cartão
                </label>
                <div className="relative">
                  <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="0000 0000 0000 0000"
                    className="input w-full pl-11"
                    maxLength={19}
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardInput(e.target.value))}
                  />
                </div>
              </div>
              <div className="w-full">
                <label className="block text-body font-medium text-text-primary mb-xs">
                  Nome do Titular
                </label>
                <input
                  type="text"
                  placeholder="NOME COMPLETO"
                  className="input w-full"
                  value={holderName}
                  onChange={(e) => setHolderName(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-md">
                <div className="w-full">
                  <label className="block text-body font-medium text-text-primary mb-xs">
                    Validade
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="MM/AA"
                    className="input w-full"
                    maxLength={5}
                    value={expiry}
                    onChange={(e) => setExpiry(formatExpiryInput(e.target.value))}
                  />
                </div>
                <div className="w-full">
                  <label className="block text-body font-medium text-text-primary mb-xs">
                    CVV
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="000"
                    className="input w-full"
                    maxLength={3}
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                  />
                </div>
              </div>
            </div>

            <div className="card bg-background-secondary mb-lg">
              <div className="space-y-sm">
                <div className="flex justify-between text-body">
                  <span className="text-text-secondary">Você vai receber:</span>
                  <span className="font-semibold text-text-primary">
                    {selectedPackage.robux.toLocaleString("pt-BR")} Robux
                  </span>
                </div>
                <div className="flex justify-between text-subtitle">
                  <span className="font-bold text-text-primary">Total:</span>
                  <span className="font-bold text-brand-primary">
                    R${" "}
                    {selectedPackage.price.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={loading || !isCardValid}
              className="btn btn-primary h-[52px] px-xl w-full flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processando...
                </>
              ) : (
                `Pagar com Cartão`
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
