import { motion } from 'framer-motion';
import { Mail, ExternalLink } from 'lucide-react';

const FAQS = [
  {
    question: 'Como comprar Robux?',
    answer: 'Vá em "Comprar Robux", escolha um pacote, gere o PIX e pague. O saldo é creditado automaticamente.'
  },
  {
    question: 'Como vender meus itens?',
    answer: 'Você precisa da Licença Premium. Após adquiri-la, vá em "Meus Pacotes" e clique em "Vender" no item desejado.'
  },
  {
    question: 'Quanto tempo leva o saque?',
    answer: 'Saques via PIX são processados em até 5 minutos.'
  },
  {
    question: 'Posso reembolsar a licença?',
    answer: 'A licença é vitalícia e não reembolsável após a ativação.'
  }
];

export default function Support() {
  return (
    <div className="container-app pb-huge">
      <div className="pt-md mb-lg">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-title font-bold text-text-primary mb-xs">Central de Ajuda</h1>
          <p className="text-body text-text-secondary">Estamos aqui para ajudar você</p>
        </motion.div>
      </div>

      <div className="mb-xl">
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-subtitle font-bold text-text-primary mb-md"
        >
          Entre em Contato
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <a 
            href="mailto:suporte@robloxvault.com"
            className="card card-interactive flex items-center gap-md"
          >
            <div className="p-md rounded-xl bg-blue-50">
              <Mail className="text-blue-500" size={24} />
            </div>
            <div className="flex-1">
              <h3 className="text-body font-semibold text-text-primary">Email</h3>
              <p className="text-caption text-text-secondary">suporte@robloxvault.com</p>
            </div>
            <ExternalLink size={20} className="text-ui-iconMuted" />
          </a>
        </motion.div>
      </div>

      <div>
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-subtitle font-bold text-text-primary mb-md"
        >
          Perguntas Frequentes
        </motion.h2>
        
        <div className="space-y-md">
          {FAQS.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + (index * 0.1) }}
            >
              <div className="card">
                <h3 className="text-body font-semibold text-text-primary mb-xs">{faq.question}</h3>
                <p className="text-caption text-text-secondary leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
