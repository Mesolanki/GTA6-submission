import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import type { Project } from '../types';
import { X, MessageSquare, Send, Paperclip, GraduationCap, UserCheck, Shield } from 'lucide-react';

interface ChatModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

export const ChatModal: React.FC<ChatModalProps> = ({ project, isOpen, onClose }) => {
  const { sendMessage, currentUser } = useApp();
  const [inputText, setInputText] = useState('');
  const [attachmentName, setAttachmentName] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [project.messages]);

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    sendMessage(project.id, inputText.trim(), attachmentName || undefined);
    setInputText('');
    setAttachmentName('');
  };

  const getRoleIcon = (role: string) => {
    if (role === 'mentor') return <UserCheck className="w-3 h-3 text-purple-400" />;
    if (role === 'admin') return <Shield className="w-3 h-3 text-amber-400" />;
    return <GraduationCap className="w-3 h-3 text-cyan-400" />;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-slate-900 border border-white/10 rounded-2xl shadow-2xl flex flex-col h-[600px] text-slate-100">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-slate-900/90 rounded-t-2xl">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">{project.title}</h2>
              <p className="text-xs text-slate-400">
                Mentor Chat: <span className="text-cyan-300">{project.mentorName || 'Unassigned'}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Thread Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-950/50">
          {project.messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-2">
              <MessageSquare className="w-8 h-8 text-slate-600" />
              <p className="text-xs">No discussion messages yet. Start a conversation with your mentor!</p>
            </div>
          ) : (
            project.messages.map(msg => {
              const isMe = msg.senderId === currentUser.id;
              return (
                <div
                  key={msg.id}
                  className={`flex items-start space-x-2.5 ${isMe ? 'flex-row-reverse space-x-reverse' : ''}`}
                >
                  <img
                    src={msg.senderAvatar}
                    alt={msg.senderName}
                    className="w-7 h-7 rounded-full object-cover ring-1 ring-white/20 mt-1"
                  />

                  <div className={`max-w-[78%] space-y-1 ${isMe ? 'items-end' : 'items-start'}`}>
                    <div className={`flex items-center space-x-1.5 text-[11px] ${isMe ? 'justify-end' : ''}`}>
                      <span className="font-semibold text-slate-300">{msg.senderName}</span>
                      <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-white/5 text-[10px] text-slate-400 capitalize">
                        {getRoleIcon(msg.senderRole)}
                        {msg.senderRole}
                      </span>
                      <span className="text-slate-500 text-[10px]">{msg.timestamp}</span>
                    </div>

                    <div
                      className={`p-3 rounded-2xl text-xs leading-relaxed ${
                        isMe
                          ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white rounded-tr-none'
                          : 'bg-slate-800 border border-white/10 text-slate-200 rounded-tl-none'
                      }`}
                    >
                      {msg.message}

                      {msg.attachmentName && (
                        <div className="mt-2 pt-2 border-t border-white/20 flex items-center space-x-1.5 text-[11px] text-cyan-200">
                          <Paperclip className="w-3.5 h-3.5" />
                          <span>Attachment: {msg.attachmentName}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-3 border-t border-white/10 bg-slate-900 rounded-b-2xl space-y-2">
          {attachmentName && (
            <div className="flex items-center justify-between text-xs bg-slate-950 px-3 py-1 rounded border border-white/10 text-cyan-400">
              <span>Attached: {attachmentName}</span>
              <button
                type="button"
                onClick={() => setAttachmentName('')}
                className="text-slate-400 hover:text-slate-200"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => {
                const name = prompt('Enter document or code file name to attach (e.g. Vulkan_Shader_Log.txt):');
                if (name) setAttachmentName(name);
              }}
              className="p-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-white/5 transition-colors"
              title="Attach File"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder="Write a message or query to your mentor..."
              className="flex-1 px-3 py-2 rounded-xl bg-slate-950/70 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            />

            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white disabled:opacity-40 transition-all shadow-md shadow-cyan-500/20"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
