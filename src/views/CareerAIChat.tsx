import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Bot,
  Send,
  Sparkles,
  User,
  ArrowRight,
  RefreshCw,
  HelpCircle,
  Lightbulb,
  Compass,
  Briefcase,
  Milestone,
  CheckCircle2
} from 'lucide-react';
import { generateLocalAssistantResponse } from '../services/aiEngine';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedAction?: {
    label: string;
    view: any;
  };
}

export const CareerAIChat: React.FC = () => {
  const {
    studentProfile,
    readinessScore,
    skillGapAnalysis,
    jobMatches,
    roadmap,
    setCurrentView
  } = useApp();

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialAssistantGreeting: ChatMessage = {
    id: 'msg-1',
    sender: 'assistant',
    text: `Hello **${studentProfile.name.split(' ')[0]}**! I am your **CareerAI Vocational Mentor**. 

I have analyzed your **${studentProfile.itiTrade}** profile against the **${studentProfile.targetRole}** benchmark. Your current readiness index is **${readinessScore.overallScore} / 100** (${readinessScore.readinessBand}).

How can I guide your career journey today?`,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    suggestedAction: {
      label: 'View My Skill Gap Analysis',
      view: 'skill-gap'
    }
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialAssistantGreeting]);

  const suggestedPrompts = [
    `What are my top skill gaps for ${studentProfile.targetRole}?`,
    `How do I raise my Readiness Score to 85+?`,
    `Which companies are currently matching my profile?`,
    `What free certifications are best for ITI graduates?`,
    `Give me a 4-week study plan to become job-ready.`
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      const assistantOutput = generateLocalAssistantResponse(query, studentProfile);

      // Determine contextual CTA
      let suggestedAction: ChatMessage['suggestedAction'] = undefined;
      const lower = query.toLowerCase();
      if (lower.includes('roadmap') || lower.includes('plan') || lower.includes('study') || lower.includes('raise')) {
        suggestedAction = { label: 'Go to Career Roadmap', view: 'roadmap' };
      } else if (lower.includes('job') || lower.includes('compan') || lower.includes('salary') || lower.includes('hiring')) {
        suggestedAction = { label: 'Explore Matched Jobs', view: 'job-matches' };
      } else if (lower.includes('gap') || lower.includes('skill') || lower.includes('missing')) {
        suggestedAction = { label: 'Inspect Skill Gaps', view: 'skill-gap' };
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: assistantOutput.responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedAction
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 450);
  };

  const handleClearChat = () => {
    setMessages([initialAssistantGreeting]);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 h-[calc(100vh-5rem)] flex flex-col justify-between">
      {/* Top Header Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs flex items-center justify-between mb-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-sm shadow-indigo-600/20">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-900">CareerAI Vocational Assistant</h2>
              <span className="px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                Online & Grounded
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Personalized for {studentProfile.name} • {studentProfile.itiTrade}
            </p>
          </div>
        </div>

        <button
          onClick={handleClearChat}
          className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 text-xs flex items-center gap-1 transition-colors"
          title="Reset conversation"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 bg-slate-50/80 border border-slate-200 rounded-2xl p-4 sm:p-6 overflow-y-auto space-y-4">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            {/* Avatar */}
            {msg.sender === 'user' ? (
              <img
                src={studentProfile.avatarUrl}
                alt={studentProfile.name}
                className="w-8 h-8 rounded-full object-cover border border-slate-300 shrink-0"
              />
            ) : (
              <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Sparkles className="w-4 h-4 text-indigo-200" />
              </div>
            )}

            {/* Bubble */}
            <div
              className={`max-w-[85%] sm:max-w-lg rounded-2xl p-4 shadow-2xs text-xs sm:text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white rounded-tr-none'
                  : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none'
              }`}
            >
              <div className="whitespace-pre-line">
                {msg.text.split('**').map((chunk, idx) => (idx % 2 === 1 ? <strong key={idx} className="font-bold">{chunk}</strong> : chunk))}
              </div>

              {/* Suggested Action Deep-Link Chip */}
              {msg.suggestedAction && (
                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-end">
                  <button
                    onClick={() => setCurrentView(msg.suggestedAction!.view)}
                    className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                  >
                    <span>{msg.suggestedAction.label}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <div className={`mt-1.5 text-[10px] text-right ${msg.sender === 'user' ? 'text-indigo-200' : 'text-slate-400'}`}>
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none p-3 shadow-2xs flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompt Chips */}
      <div className="py-2 flex items-center gap-2 overflow-x-auto shrink-0">
        {suggestedPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(prompt)}
            className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-full text-xs font-semibold text-slate-700 whitespace-nowrap shadow-2xs transition-colors shrink-0"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Form Bar */}
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="bg-white border border-slate-200 rounded-2xl p-2 shadow-2xs flex items-center gap-2 shrink-0"
      >
        <input
          type="text"
          value={inputQuery}
          onChange={e => setInputQuery(e.target.value)}
          placeholder="Ask CareerAI anything about your skill gaps, roadmap, or job search..."
          className="flex-1 px-4 py-2.5 bg-transparent text-xs sm:text-sm font-medium text-slate-900 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!inputQuery.trim() || isTyping}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
