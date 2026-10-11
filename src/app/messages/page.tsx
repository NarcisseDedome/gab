'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Send, Paperclip, Image as ImageIcon, Search, ArrowLeft } from 'lucide-react';

export default function MessagesPage() {
  const { conversations, messages, showToast, t } = useApp();
  const [activeConvId, setActiveConvId] = useState(conversations[0]?.id || 'conv-1');
  const [inputText, setInputText] = useState('');
  const [showMobileChat, setShowMobileChat] = useState(false);

  const activeConv = conversations.find((c) => c.id === activeConvId) || conversations[0];
  const activeMessages = messages[activeConvId] || [];

  const handleSelectConv = (id: string) => {
    setActiveConvId(id);
    setShowMobileChat(true);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    showToast('Message sent!', 'success');
    setInputText('');
  };

  return (
    <div className="bg-[#F5F7F9] min-h-[calc(100vh-120px)] py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        
        <div className="bg-white rounded-xl border border-slate-200 shadow-card overflow-hidden grid grid-cols-1 md:grid-cols-12 h-[calc(100vh-180px)] sm:h-[750px]">
          
          {/* Left Conversations List (Hidden on mobile when chat is active) */}
          <div className={`md:col-span-4 border-r border-slate-200 flex flex-col bg-[#F5F7F9] ${
            showMobileChat ? 'hidden md:flex' : 'flex'
          }`}>
            <div className="p-3 sm:p-4 border-b border-slate-200 bg-white">
              <h2 className="text-base sm:text-lg font-bold text-[#17324D] mb-2">{t.btnContact}</h2>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-100 border border-slate-200 rounded-md focus:outline-none"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-slate-200">
              {conversations.map((c) => {
                const isActive = c.id === activeConvId;
                return (
                  <button
                    key={c.id}
                    onClick={() => handleSelectConv(c.id)}
                    className={`w-full text-left p-3 sm:p-4 transition-colors flex items-start gap-3 ${
                      isActive ? 'bg-white border-l-4 border-l-[#17324D]' : 'hover:bg-slate-100/60'
                    }`}
                  >
                    <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-lg overflow-hidden border border-slate-200 shrink-0">
                      <img src={c.participantAvatar} alt={c.participantName} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline mb-0.5">
                        <h4 className="text-xs sm:text-sm font-bold text-[#17324D] truncate">{c.participantName}</h4>
                        <span className="text-[9px] sm:text-[10px] text-slate-400 shrink-0">{c.lastMessageDate}</span>
                      </div>
                      <p className="text-[11px] sm:text-xs font-semibold text-[#245A7A] truncate">{c.participantRole}</p>
                      <p className="text-[11px] sm:text-xs text-slate-500 truncate mt-0.5">{c.lastMessage}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Message Chat Window (Hidden on mobile when conversation list is shown) */}
          <div className={`md:col-span-8 flex flex-col bg-white ${
            !showMobileChat ? 'hidden md:flex' : 'flex'
          }`}>
            
            {/* Top Bar with mobile back button */}
            <div className="p-3 sm:p-4 border-b border-slate-200 flex justify-between items-center bg-[#F5F7F9]">
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={() => setShowMobileChat(false)}
                  className="md:hidden p-1.5 -ml-1 text-slate-600 hover:bg-slate-200 rounded-md"
                  aria-label="Back to conversations"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>

                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg overflow-hidden border border-slate-200 shrink-0">
                  <img src={activeConv.participantAvatar} alt={activeConv.participantName} className="w-full h-full object-cover" />
                </div>
                <div className="truncate">
                  <h3 className="text-xs sm:text-sm font-bold text-[#17324D] truncate">{activeConv.participantName}</h3>
                  <span className="text-[10px] sm:text-xs text-slate-500 truncate block">
                    Ref: <strong>{activeConv.projectRef}</strong>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Badge variant="VERIFIED" size="sm" className="text-[10px] sm:text-xs">
                  {t.statusVerified}
                </Badge>
              </div>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 p-3 sm:p-6 overflow-y-auto space-y-3 sm:space-y-4 bg-[#F5F7F9]/40">
              {activeMessages.map((m) => {
                const isMe = m.senderId === 'u-client-1';
                return (
                  <div key={m.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] sm:max-w-md p-3 sm:p-4 rounded-xl shadow-xs space-y-1.5 text-xs ${
                      isMe ? 'bg-[#17324D] text-white rounded-br-none' : 'bg-white text-[#17212B] border border-slate-200 rounded-bl-none'
                    }`}>
                      <div className="flex justify-between items-center text-[10px] opacity-80 gap-2 border-b border-white/10 pb-1">
                        <span className="font-bold truncate">{m.senderName}</span>
                        <span className="shrink-0">{m.timestamp}</span>
                      </div>
                      <p className="leading-relaxed">{m.text}</p>

                      {m.attachmentUrl && (
                        <div className="pt-2">
                          <img src={m.attachmentUrl} alt="attachment" className="rounded-md h-28 sm:h-36 w-full object-cover border border-white/20" />
                          <span className="text-[10px] underline block mt-1">{m.attachmentName}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Message Input Footer */}
            <form onSubmit={handleSendMessage} className="p-2.5 sm:p-4 border-t border-slate-200 bg-white flex items-center gap-1.5 sm:gap-3">
              <button type="button" className="text-slate-400 hover:text-slate-600 p-1.5">
                <Paperclip className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button type="button" className="text-slate-400 hover:text-slate-600 p-1.5 hidden sm:block">
                <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type message..."
                className="flex-1 p-2 sm:p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#17324D]"
              />
              <Button type="submit" variant="primary" size="sm" className="gap-1 sm:gap-1.5 px-3">
                <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">{t.btnSubmit}</span>
              </Button>
            </form>

          </div>

        </div>

      </div>
    </div>
  );
}
