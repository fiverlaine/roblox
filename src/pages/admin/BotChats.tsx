import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  Search,
  Send,
  RefreshCw,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import { supabase } from '../../lib/supabase';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';

// ==================== TYPES ====================
interface ChatContact {
  telegram_chat_id: number;
  telegram_user_id: number | null;
  telegram_username: string | null;
  telegram_name: string | null;
  bot_type: string;
  last_message: string | null;
  last_message_at: string;
  unread_count: number;
}

interface BotMessage {
  id: number;
  bot_type: string;
  telegram_chat_id: number;
  telegram_user_id: number | null;
  telegram_username: string | null;
  telegram_name: string | null;
  direction: 'incoming' | 'outgoing';
  message_type: string;
  text_content: string | null;
  file_id: string | null;
  caption: string | null;
  telegram_message_id: number | null;
  created_at: string;
}

// ==================== HELPERS ====================
function formatTime(date: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
}

function formatDateGroup(date: string): string {
  const d = new Date(date);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  if (d.toDateString() === today.toDateString()) return 'Hoje';
  if (d.toDateString() === yesterday.toDateString()) return 'Ontem';

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(d);
}

function getInitial(name: string | null): string {
  if (!name) return '?';
  return name.charAt(0).toUpperCase();
}

function botLabel(type: string): string {
  switch (type) {
    case 'funnel': return 'Bot Funil';
    case 'sales': return 'Bot Vendas';
    default: return type;
  }
}

// ==================== COMPONENT ====================
export default function BotChats() {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('user_id');

  // State
  const [contacts, setContacts] = useState<ChatContact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<ChatContact[]>([]);
  const [selectedChat, setSelectedChat] = useState<ChatContact | null>(null);
  const [messages, setMessages] = useState<BotMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [botFilter, setBotFilter] = useState<string>('all');
  const [showSidebar, setShowSidebar] = useState(true);
  const [resolvedTelegramId, setResolvedTelegramId] = useState<number | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // ==================== FETCH CONTACTS ====================
  const fetchContacts = useCallback(async () => {
    setLoading(true);
    try {
      // Get distinct chats with their last message, only for users who have telegram_leads with user_id
      const { data: rawMessages, error } = await supabase
        .from('bot_messages')
        .select('telegram_chat_id, telegram_user_id, telegram_username, telegram_name, bot_type, text_content, created_at, direction')
        .in('bot_type', ['funnel', 'sales'])
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Get registered users (telegram_leads with user_id set)
      const { data: registeredLeads } = await supabase
        .from('telegram_leads')
        .select('telegram_id')
        .not('user_id', 'is', null)
        .not('telegram_id', 'is', null);

      const registeredTelegramIds = new Set(
        (registeredLeads || []).map(l => Number(l.telegram_id))
      );

      // Group by chat_id + bot_type
      const chatMap = new Map<string, ChatContact>();

      for (const msg of (rawMessages || [])) {
        const key = `${msg.telegram_chat_id}_${msg.bot_type}`;

        // Only include chats from registered users
        const userId = msg.telegram_user_id || msg.telegram_chat_id;
        if (!registeredTelegramIds.has(Number(userId))) continue;

        if (!chatMap.has(key)) {
          chatMap.set(key, {
            telegram_chat_id: msg.telegram_chat_id,
            telegram_user_id: msg.telegram_user_id,
            telegram_username: msg.telegram_username,
            telegram_name: msg.telegram_name,
            bot_type: msg.bot_type,
            last_message: msg.text_content,
            last_message_at: msg.created_at,
            unread_count: 0,
          });
        } else {
          // Update name/username if we have a newer incoming message
          const existing = chatMap.get(key)!;
          if (msg.direction === 'incoming' && !existing.telegram_name && msg.telegram_name) {
            existing.telegram_name = msg.telegram_name;
            existing.telegram_username = msg.telegram_username;
          }
        }
      }

      const contactList = Array.from(chatMap.values()).sort(
        (a, b) => new Date(b.last_message_at).getTime() - new Date(a.last_message_at).getTime()
      );

      setContacts(contactList);
    } catch (e) {
      console.error('Error fetching contacts:', e);
      toast.error('Erro ao carregar chats');
    } finally {
      setLoading(false);
    }
  }, []);

  // ==================== FETCH MESSAGES  ====================
  const fetchMessages = useCallback(async (chatId: number, botType: string) => {
    setLoadingMessages(true);
    try {
      const { data, error } = await supabase
        .from('bot_messages')
        .select('*')
        .eq('telegram_chat_id', chatId)
        .eq('bot_type', botType)
        .order('created_at', { ascending: true })
        .limit(200);

      if (error) throw error;
      setMessages((data || []) as BotMessage[]);
    } catch (e) {
      console.error('Error fetching messages:', e);
      toast.error('Erro ao carregar mensagens');
    } finally {
      setLoadingMessages(false);
    }
  }, []);

  // ==================== SEND MESSAGE ====================
  const handleSend = async () => {
    if (!selectedChat || !newMessage.trim() || sending) return;

    setSending(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-bot-message', {
        body: {
          bot_type: selectedChat.bot_type,
          telegram_chat_id: selectedChat.telegram_chat_id,
          text: newMessage.trim(),
        }
      });

      if (error || data?.error) {
        throw new Error(error?.message || data?.error || 'Falha ao enviar');
      }

      const result = data;

      // Add to local messages
      setMessages(prev => [...prev, {
        id: Date.now(),
        bot_type: selectedChat.bot_type,
        telegram_chat_id: selectedChat.telegram_chat_id,
        telegram_user_id: null,
        telegram_username: null,
        telegram_name: null,
        direction: 'outgoing',
        message_type: 'text',
        text_content: newMessage.trim(),
        file_id: null,
        caption: null,
        telegram_message_id: result.message_id || null,
        created_at: new Date().toISOString(),
      }]);

      setNewMessage('');
      toast.success('Mensagem enviada!');
    } catch (e: any) {
      console.error('Error sending message:', e);
      toast.error(e.message || 'Erro ao enviar mensagem');
    } finally {
      setSending(false);
    }
  };

  // ==================== EFFECTS ====================
  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  useEffect(() => {
    if (selectedChat) {
      fetchMessages(selectedChat.telegram_chat_id, selectedChat.bot_type);
    }
  }, [selectedChat, fetchMessages]);

  // Resolve user_id from URL to telegram_id
  useEffect(() => {
    if (!userId) return;
    const resolveUser = async () => {
      const { data } = await supabase
        .from('telegram_leads')
        .select('telegram_id')
        .eq('user_id', userId)
        .not('telegram_id', 'is', null)
        .limit(1)
        .maybeSingle();
      if (data?.telegram_id) {
        setResolvedTelegramId(Number(data.telegram_id));
      }
    };
    resolveUser();
  }, [userId]);

  // Open specific chat from resolved telegram_id
  useEffect(() => {
    if (resolvedTelegramId && contacts.length > 0 && !selectedChat) {
      const chat = contacts.find(c => c.telegram_chat_id === resolvedTelegramId || c.telegram_user_id === resolvedTelegramId);
      if (chat) {
        setSelectedChat(chat);
        setShowSidebar(false);
      }
    }
  }, [resolvedTelegramId, contacts, selectedChat]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Filter contacts
  useEffect(() => {
    let filtered = contacts;

    if (botFilter !== 'all') {
      filtered = filtered.filter(c => c.bot_type === botFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(c =>
        (c.telegram_name || '').toLowerCase().includes(q) ||
        (c.telegram_username || '').toLowerCase().includes(q) ||
        String(c.telegram_chat_id).includes(q)
      );
    }

    setFilteredContacts(filtered);
  }, [contacts, botFilter, searchQuery]);

  // Poll for new messages
  useEffect(() => {
    if (!selectedChat) return;
    const interval = setInterval(() => {
      fetchMessages(selectedChat.telegram_chat_id, selectedChat.bot_type);
    }, 5000); // poll every 5s
    return () => clearInterval(interval);
  }, [selectedChat, fetchMessages]);

  // ==================== GROUP MESSAGES BY DATE ====================
  const groupedMessages = messages.reduce<{ date: string; messages: BotMessage[] }[]>((groups, msg) => {
    const dateKey = formatDateGroup(msg.created_at);
    const lastGroup = groups[groups.length - 1];
    if (lastGroup && lastGroup.date === dateKey) {
      lastGroup.messages.push(msg);
    } else {
      groups.push({ date: dateKey, messages: [msg] });
    }
    return groups;
  }, []);

  // ==================== RENDER ====================
  return (
    <AdminLayout>
      <div style={{ display: 'flex', height: 'calc(100vh - 64px - 48px)', gap: 0 }}>

        {/* ==================== SIDEBAR (Contact List) ==================== */}
        <AnimatePresence>
          {showSidebar && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 360, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                minWidth: 360,
                maxWidth: 360,
                height: '100%',
                backgroundColor: '#1a2233',
                borderRight: '1px solid #1f2d40',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              {/* Header */}
              <div style={{ padding: '16px 16px 12px', borderBottom: '1px solid #1f2d40', flexShrink: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <MessageSquare className="w-5 h-5 text-cyan-400" />
                    <h3 style={{ color: '#fff', fontWeight: 700, fontSize: 16, margin: 0 }}>
                      Chats
                    </h3>
                    <span style={{
                      backgroundColor: '#0e7490',
                      color: '#fff',
                      fontSize: 11,
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: 20,
                    }}>
                      {filteredContacts.length}
                    </span>
                  </div>
                  <button
                    onClick={fetchContacts}
                    disabled={loading}
                    style={{ color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: 4 }}
                  >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  </button>
                </div>

                {/* Search */}
                <div style={{ position: 'relative', marginBottom: 10 }}>
                  <Search style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', width: 14, height: 14, color: '#6b7280' }} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar..."
                    style={{
                      width: '100%',
                      backgroundColor: '#111827',
                      border: '1px solid #374151',
                      borderRadius: 8,
                      padding: '8px 12px 8px 32px',
                      color: '#fff',
                      fontSize: 13,
                      outline: 'none',
                    }}
                  />
                </div>

                {/* Bot Filter Tabs */}
                <div style={{ display: 'flex', gap: 4 }}>
                  {[
                    { key: 'all', label: 'Todos' },
                    { key: 'funnel', label: 'Funil' },
                    { key: 'sales', label: 'Vendas' },
                  ].map(tab => (
                    <button
                      key={tab.key}
                      onClick={() => setBotFilter(tab.key)}
                      style={{
                        flex: 1,
                        padding: '6px 0',
                        borderRadius: 6,
                        fontSize: 11,
                        fontWeight: 600,
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                        backgroundColor: botFilter === tab.key ? '#0e7490' : '#1f2937',
                        color: botFilter === tab.key ? '#fff' : '#9ca3af',
                      }}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact List */}
              <div style={{ flex: 1, overflowY: 'auto' }}>
                {loading && contacts.length === 0 ? (
                  <div style={{ padding: 40, textAlign: 'center', color: '#6b7280' }}>
                    <RefreshCw className="w-6 h-6 animate-spin" style={{ margin: '0 auto 8px' }} />
                    <p style={{ fontSize: 13 }}>Carregando chats...</p>
                  </div>
                ) : filteredContacts.length === 0 ? (
                  <div style={{ padding: 40, textAlign: 'center', color: '#4b5563' }}>
                    <MessageSquare className="w-8 h-8" style={{ margin: '0 auto 8px', opacity: 0.3 }} />
                    <p style={{ fontSize: 13 }}>Nenhum chat encontrado</p>
                    <p style={{ fontSize: 11, color: '#374151', marginTop: 4 }}>
                      Chats aparecem quando usuários cadastrados interagem com os bots.
                    </p>
                  </div>
                ) : (
                  filteredContacts.map((contact) => {
                    const isSelected = selectedChat?.telegram_chat_id === contact.telegram_chat_id && selectedChat?.bot_type === contact.bot_type;
                    return (
                      <button
                        key={`${contact.telegram_chat_id}_${contact.bot_type}`}
                        onClick={() => {
                          setSelectedChat(contact);
                          if (window.innerWidth < 768) setShowSidebar(false);
                        }}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 12,
                          padding: '14px 16px',
                          border: 'none',
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'all 0.15s',
                          backgroundColor: isSelected ? '#164e63' : 'transparent',
                          borderLeft: isSelected ? '3px solid #06b6d4' : '3px solid transparent',
                        }}
                        className="hover:bg-[#1f2937]"
                      >
                        {/* Avatar */}
                        <div style={{
                          width: 44,
                          height: 44,
                          borderRadius: '50%',
                          background: isSelected
                            ? 'linear-gradient(135deg, #06b6d4, #0891b2)'
                            : 'linear-gradient(135deg, #374151, #4b5563)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: 16,
                          color: '#fff',
                          flexShrink: 0,
                        }}>
                          {getInitial(contact.telegram_name)}
                        </div>

                        {/* Info */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                            <span style={{ color: '#fff', fontWeight: 600, fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {contact.telegram_name || contact.telegram_username || `Chat #${contact.telegram_chat_id}`}
                            </span>
                            <span style={{ color: '#6b7280', fontSize: 10, fontWeight: 500, flexShrink: 0, marginLeft: 8 }}>
                              {formatTime(contact.last_message_at)}
                            </span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{
                              color: '#9ca3af',
                              fontSize: 11,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              maxWidth: 180,
                            }}>
                              {contact.last_message || '📎 Mídia'}
                            </span>
                            <span style={{
                              fontSize: 9,
                              fontWeight: 700,
                              color: contact.bot_type === 'funnel' ? '#38bdf8' : '#a78bfa',
                              backgroundColor: contact.bot_type === 'funnel' ? 'rgba(56,189,248,0.1)' : 'rgba(167,139,250,0.1)',
                              padding: '2px 6px',
                              borderRadius: 4,
                              textTransform: 'uppercase',
                              flexShrink: 0,
                            }}>
                              {contact.bot_type === 'funnel' ? 'FUNIL' : 'VENDAS'}
                            </span>
                          </div>
                          {contact.telegram_username && (
                            <span style={{ color: '#0891b2', fontSize: 10, fontWeight: 500 }}>
                              @{contact.telegram_username}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ==================== CHAT AREA ==================== */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, backgroundColor: '#111827' }}>

          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div style={{
                height: 64,
                backgroundColor: '#1a2233',
                borderBottom: '1px solid #1f2d40',
                display: 'flex',
                alignItems: 'center',
                padding: '0 16px',
                gap: 12,
                flexShrink: 0,
              }}>
                {/* Toggle Sidebar */}
                <button
                  onClick={() => setShowSidebar(!showSidebar)}
                  style={{ color: '#9ca3af', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: 4 }}
                >
                  {showSidebar ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                </button>

                {/* Avatar */}
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: 15,
                  color: '#fff',
                  flexShrink: 0,
                }}>
                  {getInitial(selectedChat.telegram_name)}
                </div>

                {/* Name & Meta */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ color: '#fff', fontWeight: 600, fontSize: 14, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {selectedChat.telegram_name || selectedChat.telegram_username || `Chat #${selectedChat.telegram_chat_id}`}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    {selectedChat.telegram_username && (
                      <span style={{ color: '#0891b2', fontSize: 11 }}>@{selectedChat.telegram_username}</span>
                    )}
                    <span style={{ color: '#4b5563', fontSize: 10 }}>•</span>
                    <span style={{
                      fontSize: 9,
                      fontWeight: 700,
                      color: selectedChat.bot_type === 'funnel' ? '#38bdf8' : '#a78bfa',
                      textTransform: 'uppercase',
                    }}>
                      via {botLabel(selectedChat.bot_type)}
                    </span>
                  </div>
                </div>

                {/* Nav Arrows */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  {filteredContacts.length > 1 && (
                    <>
                      <button
                        onClick={() => {
                          const idx = filteredContacts.findIndex(c => c.telegram_chat_id === selectedChat.telegram_chat_id && c.bot_type === selectedChat.bot_type);
                          if (idx > 0) setSelectedChat(filteredContacts[idx - 1]);
                        }}
                        style={{ color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: 4 }}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <span style={{ color: '#6b7280', fontSize: 11, fontWeight: 500 }}>
                        {filteredContacts.findIndex(c => c.telegram_chat_id === selectedChat.telegram_chat_id && c.bot_type === selectedChat.bot_type) + 1}/{filteredContacts.length}
                      </span>
                      <button
                        onClick={() => {
                          const idx = filteredContacts.findIndex(c => c.telegram_chat_id === selectedChat.telegram_chat_id && c.bot_type === selectedChat.bot_type);
                          if (idx < filteredContacts.length - 1) setSelectedChat(filteredContacts[idx + 1]);
                        }}
                        style={{ color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: 4 }}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Messages Area */}
              <div
                ref={chatContainerRef}
                style={{
                  flex: 1,
                  overflowY: 'auto',
                  padding: '16px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                  background: 'linear-gradient(180deg, #0c1220 0%, #111827 100%)',
                }}
              >
                {loadingMessages ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <RefreshCw className="w-6 h-6 animate-spin text-cyan-500" />
                  </div>
                ) : messages.length === 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, color: '#4b5563' }}>
                    <MessageSquare className="w-12 h-12" style={{ opacity: 0.2, marginBottom: 8 }} />
                    <p style={{ fontSize: 14 }}>Nenhuma mensagem registrada</p>
                    <p style={{ fontSize: 11, marginTop: 4 }}>As mensagens começarão a aparecer após o deploy das edge functions atualizadas.</p>
                  </div>
                ) : (
                  groupedMessages.map((group) => (
                    <div key={group.date}>
                      {/* Date Separator */}
                      <div style={{ display: 'flex', justifyContent: 'center', margin: '12px 0' }}>
                        <span style={{
                          backgroundColor: '#1e293b',
                          color: '#94a3b8',
                          fontSize: 11,
                          fontWeight: 600,
                          padding: '4px 14px',
                          borderRadius: 20,
                        }}>
                          {group.date}
                        </span>
                      </div>

                      {/* Messages */}
                      {group.messages.map((msg) => {
                        const isOutgoing = msg.direction === 'outgoing';
                        return (
                          <div
                            key={msg.id}
                            style={{
                              display: 'flex',
                              justifyContent: isOutgoing ? 'flex-end' : 'flex-start',
                              marginBottom: 4,
                            }}
                          >
                            <div style={{
                              maxWidth: '65%',
                              minWidth: 80,
                              padding: '8px 12px 4px',
                              borderRadius: isOutgoing ? '12px 12px 4px 12px' : '12px 12px 12px 4px',
                              backgroundColor: isOutgoing ? '#0e7490' : '#1e293b',
                              position: 'relative',
                            }}>
                              {msg.message_type !== 'text' && !msg.text_content && (
                                <p style={{ fontSize: 12, color: '#a5f3fc', fontStyle: 'italic', margin: 0 }}>
                                  📎 {msg.message_type === 'photo' ? 'Foto' : msg.message_type === 'video' ? 'Vídeo' : msg.message_type === 'voice' ? 'Áudio' : msg.message_type === 'sticker' ? 'Sticker' : 'Arquivo'}
                                </p>
                              )}
                              {msg.text_content && (
                                <p style={{
                                  color: '#e2e8f0',
                                  fontSize: 13,
                                  lineHeight: 1.45,
                                  margin: 0,
                                  wordBreak: 'break-word',
                                  whiteSpace: 'pre-wrap',
                                }}>
                                  {msg.text_content}
                                </p>
                              )}
                              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 4, marginTop: 2 }}>
                                <span style={{ color: isOutgoing ? '#67e8f9' : '#64748b', fontSize: 10 }}>
                                  {formatTime(msg.created_at)}
                                </span>
                                {isOutgoing && (
                                  <span style={{ color: '#67e8f9', fontSize: 10 }}>✓✓</span>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div style={{
                padding: '12px 16px',
                backgroundColor: '#1a2233',
                borderTop: '1px solid #1f2d40',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                flexShrink: 0,
              }}>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Mensagem"
                  style={{
                    flex: 1,
                    backgroundColor: '#111827',
                    border: '1px solid #374151',
                    borderRadius: 24,
                    padding: '10px 20px',
                    color: '#fff',
                    fontSize: 13,
                    outline: 'none',
                  }}
                />
                <button
                  onClick={handleSend}
                  disabled={!newMessage.trim() || sending}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    backgroundColor: newMessage.trim() ? '#06b6d4' : '#374151',
                    border: 'none',
                    cursor: newMessage.trim() ? 'pointer' : 'default',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.15s',
                    flexShrink: 0,
                  }}
                >
                  {sending ? (
                    <RefreshCw className="w-5 h-5 text-white animate-spin" />
                  ) : (
                    <Send className="w-5 h-5 text-white" style={{ marginLeft: 2 }} />
                  )}
                </button>
              </div>
            </>
          ) : (
            /* No Chat Selected */
            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#4b5563',
            }}>
              {!showSidebar && (
                <button
                  onClick={() => setShowSidebar(true)}
                  style={{ color: '#06b6d4', background: 'none', border: 'none', cursor: 'pointer', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600 }}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Ver lista de chats
                </button>
              )}
              <div style={{
                width: 100,
                height: 100,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #164e63, #0e7490)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
                opacity: 0.5,
              }}>
                <MessageSquare className="w-10 h-10 text-cyan-300" />
              </div>
              <h3 style={{ color: '#fff', fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
                Chat do Telegram
              </h3>
              <p style={{ fontSize: 13, color: '#6b7280', maxWidth: 300, textAlign: 'center', lineHeight: 1.5 }}>
                Selecione uma conversa à esquerda para visualizar as mensagens e conversar com os leads do seu bot.
              </p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
