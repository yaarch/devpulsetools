import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  Zap,
  Lock,
  Mail,
  Send,
  ArrowLeft,
  CheckCircle2,
  FileText,
  HelpCircle,
  Globe2
} from 'lucide-react';

interface StaticPageProps {
  pageType: 'about' | 'privacy' | 'terms' | 'contact';
}

export const StaticPages: React.FC<StaticPageProps> = ({ pageType }) => {
  const { t, navigateTo, addToast } = useApp();

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactCategory, setContactCategory] = useState('tool-suggestion');
  const [contactMessage, setContactMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) {
      addToast('Please fill out all required fields.', '', 'error');
      return;
    }
    setIsSubmitting(true);
    // Simulate instantaneous client dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      addToast('Message received!', 'Thank you for your feedback.', 'success');
      setContactName('');
      setContactEmail('');
      setContactMessage('');
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back button */}
      <button
        onClick={() => navigateTo({ type: 'home' })}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 mb-6 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>{t.backToTools}</span>
      </button>

      {/* ABOUT PAGE */}
      {pageType === 'about' && (
        <div className="space-y-8">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t.aboutTitle}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
              Free, private, and ultra-fast developer utilities designed for the modern web.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-sm leading-relaxed space-y-6">
            <p>
              <strong>DevPulse Utilities</strong> was created with a fundamental belief: developers, writers, and digital creators shouldn’t have to compromise their privacy, dodge annoying pop-up ads, or pay subscriptions just to format a JSON string, encode a token, or compress an image.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8 not-prose">
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
                  <Lock className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">100% In-Browser</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Every byte you input is processed strictly in your local JavaScript runtime. No cloud databases, no logs.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Zero Latency</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Tools respond in real-time as you type or adjust sliders without any network roundtrips.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
                  <Globe2 className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Multi-Language & RTL</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Built for global creators with English, Spanish, French, Arabic (full RTL), and German support.
                </p>
              </div>
            </div>

            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Our Architecture</h2>
            <p>
              DevPulse is built using React 19, TypeScript, and modern browser APIs including the Web Crypto API, HTML5 Canvas, and modern ECMAScript standards. It compiles into a static asset tree optimized for instant client-side performance, fast edge CDNs, and zero server logging.
            </p>
          </div>
        </div>
      )}

      {/* PRIVACY POLICY */}
      {pageType === 'privacy' && (
        <div className="space-y-8">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-emerald-500" />
              <span>{t.privacyTitle}</span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50">
              <h3 className="text-sm font-bold text-emerald-900 dark:text-emerald-200 mb-1">
                The Short Version: Zero Data Collection
              </h3>
              <p className="text-xs text-emerald-800 dark:text-emerald-300">
                DevPulse Utilities operates entirely inside your web browser. We do not store, view, transmit, or log any text, passwords, images, files, or tokens you process with our tools.
              </p>
            </div>

            <h3 className="text-base font-bold text-slate-900 dark:text-white">1. Information We Do Not Collect</h3>
            <p>
              When you use tools such as the JSON Formatter, Password Generator, Base64 Decoder, Hash Generator, or Image Compressor, your inputs remain entirely in volatile browser memory. No payload is ever transmitted across the internet to our or any third-party servers.
            </p>

            <h3 className="text-base font-bold text-slate-900 dark:text-white">2. Local Storage</h3>
            <p>
              We use your browser’s <code className="font-mono bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">localStorage</code> strictly for user interface preferences:
            </p>
            <ul className="list-disc list-inside text-xs space-y-1 text-slate-600 dark:text-slate-400">
              <li>Your selected color theme (Dark mode vs. Light mode)</li>
              <li>Your chosen interface language and text direction</li>
              <li>Your saved favorite tools for quick access</li>
              <li>Recently launched tool IDs</li>
            </ul>

            <h3 className="text-base font-bold text-slate-900 dark:text-white">3. Third-Party Analytics & Cookies</h3>
            <p>
              DevPulse does not place advertising trackers, cross-site cookies, or surveillance telemetry scripts on your device.
            </p>
          </div>
        </div>
      )}

      {/* TERMS OF SERVICE */}
      {pageType === 'terms' && (
        <div className="space-y-8">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
              <FileText className="w-8 h-8 text-indigo-500" />
              <span>{t.termsTitle}</span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Effective Date: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">1. Acceptance of Terms</h3>
            <p>
              By accessing and using DevPulse Utilities, you agree to comply with and be bound by these Terms of Service. If you disagree with any part of these terms, you may discontinue use of the tools.
            </p>

            <h3 className="text-base font-bold text-slate-900 dark:text-white">2. Free & Permitted Use</h3>
            <p>
              All tools provided on DevPulse are 100% free for both personal and commercial use. You may use them to format documents, verify security tokens, calculate financial models, compress media assets, and generate code without payment or attribution requirements.
            </p>

            <h3 className="text-base font-bold text-slate-900 dark:text-white">3. Disclaimer of Warranties</h3>
            <p>
              The tools and utilities are provided on an "as is" and "as available" basis without warranties of any kind. While we rigorously test algorithms (such as crypto hashes and JSON parsing), you are solely responsible for verifying critical production outputs.
            </p>
          </div>
        </div>
      )}

      {/* CONTACT PAGE */}
      {pageType === 'contact' && (
        <div className="space-y-8">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
              <Mail className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              <span>{t.contactTitle}</span>
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
              Have a suggestion for a new developer tool, found a bug, or want to say hi? Send us a message below.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Thank You for Your Feedback!
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
                Your message has been received. We review user suggestions regularly to expand the tool suite.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-4 py-2 text-xs font-semibold rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={e => setContactName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={e => setContactEmail(e.target.value)}
                    placeholder="jane@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Subject Category
                </label>
                <select
                  value={contactCategory}
                  onChange={e => setContactCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="tool-suggestion">Suggest a New Tool</option>
                  <option value="bug-report">Report a Bug / Issue</option>
                  <option value="feature-request">Improve an Existing Tool</option>
                  <option value="general">General Inquiries</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Message *
                </label>
                <textarea
                  required
                  rows={5}
                  value={contactMessage}
                  onChange={e => setContactMessage(e.target.value)}
                  placeholder="Describe your feedback, tool idea, or question..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md shadow-indigo-500/20 transition-all disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};
