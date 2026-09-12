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
    if (role === 'mentor') return <UserCheck className="w-3 h-3 text-purple-600" />;
    if (role === 'admin') return <Shield className="w-3 h-3 text-slate-700" />;
    return <GraduationCap className="w-3 h-3 text-indigo-600" />;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="relative w-full max-w-xl bg-white border border-slate-200 rounded-2xl shadow-xl flex flex-col h-[600px] text-slate-900">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-white rounded-t-2xl">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">{project.title}</h2>
              <p className="text-xs text-slate-500">
                Mentor Discussion: <span className="text-indigo-600 font-semibold">{project.mentorName || 'Unassigned'}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Thread Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50">
          {project.messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-2">
              <MessageSquare className="w-8 h-8 text-slate-300" />
              <p className="text-xs">No messages yet. Start a discussion with your faculty mentor!</p>
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
                    className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-300 mt-1"
                  />

                  <div className={`max-w-[78%] space-y-1 ${isMe ? 'items-end' : 'items-start'}`}>
                    <div className={`flex items-center space-x-1.5 text-[11px] ${isMe ? 'justify-end' : ''}`}>
                      <span className="font-semibold text-slate-800">{msg.senderName}</span>
                      <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-slate-200 text-[10px] text-slate-700 capitalize font-medium">
                        {getRoleIcon(msg.senderRole)}
                        {msg.senderRole}
                      </span>
                      <span className="text-slate-400 text-[10px]">{msg.timestamp}</span>
                    </div>

                    <div
                      className={`p-3 rounded-2xl text-xs leading-relaxed ${
                        isMe
                          ? 'bg-indigo-600 text-white rounded-tr-none shadow-xs'
                          : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-xs'
                      }`}
                    >
                      {msg.message}

                      {msg.attachmentName && (
                        <div className={`mt-2 pt-2 flex items-center space-x-1.5 text-[11px] ${isMe ? 'border-t border-indigo-400 text-indigo-100' : 'border-t border-slate-100 text-indigo-600'}`}>
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
        <form onSubmit={handleSend} className="p-3 border-t border-slate-200 bg-white rounded-b-2xl space-y-2">
          {attachmentName && (
            <div className="flex items-center justify-between text-xs bg-indigo-50 px-3 py-1 rounded border border-indigo-200 text-indigo-900 font-semibold">
              <span>Attached: {attachmentName}</span>
              <button
                type="button"
                onClick={() => setAttachmentName('')}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => {
                const name = prompt('Enter document or code file name to attach (e.g. Benchmark_Results.pdf):');
                if (name) setAttachmentName(name);
              }}
              className="p-2 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-slate-100 transition-colors"
              title="Attach File"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder="Write a message to your mentor..."
              className="flex-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
            />

            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-40 transition-colors shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
