import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertCircle,
  BadgeCheck,
  CheckCircle2,
  ChevronRight,
  Crown,
  ShieldCheck,
  Briefcase,
  GraduationCap,
  Home,
  CreditCard,
  DollarSign,
  Sparkles,
} from 'lucide-react';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({
    age: '',
    income: '',
    loan_amount: '',
    credit_score: '',
    employment_years: '',
    education_level: '',
    housing_status: ''
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await axios.post(`${apiUrl}/predict`, {
        age: parseInt(formData.age),
        income: parseFloat(formData.income),
        loan_amount: parseFloat(formData.loan_amount),
        credit_score: parseInt(formData.credit_score),
        employment_years: parseFloat(formData.employment_years),
        education_level: parseInt(formData.education_level),
        housing_status: parseInt(formData.housing_status)
      });

      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'An error occurred during prediction. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      age: '',
      income: '',
      loan_amount: '',
      credit_score: '',
      employment_years: '',
      education_level: '',
      housing_status: ''
    });
    setResult(null);
    setError('');
  };

  return (
    <div className="min-h-screen premium-bg text-slate-100">
      <div className="absolute inset-0 pointer-events-none opacity-60">
        <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-amber-200/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-indigo-300/10 blur-3xl" />
      </div>

      <header className="relative z-10 border-b border-white/10 backdrop-blur-xl bg-black/20">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl border border-amber-200/30 bg-gradient-to-br from-amber-100/20 to-yellow-500/10 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Private Lending Suite</p>
              <h1 className="font-display text-xl text-amber-50">Sterling Credit Advisory</h1>
            </div>
          </div>
          <p className="hidden md:block text-sm text-slate-400">Premium Credit Underwriting Experience</p>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-7xl px-5 py-10 md:py-14">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-10 rounded-3xl border border-amber-100/20 bg-white/[0.03] p-8 md:p-10 shadow-[0_30px_100px_rgba(8,10,18,0.55)] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 h-28 w-28 bg-gradient-to-bl from-amber-200/20 to-transparent blur-2xl pointer-events-none" />
          <p className="text-xs uppercase tracking-[0.26em] text-amber-200/90 mb-3">Portfolio Decision Engine</p>
          <h2 className="font-display text-4xl md:text-5xl leading-tight text-slate-50 max-w-4xl">
            Assess borrower default risk with a refined, boardroom-ready interface.
          </h2>
          <p className="mt-4 text-slate-300 max-w-3xl">
            Provide applicant data and receive an instant model-driven lending recommendation with probability scoring.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <div className="premium-pill"><Crown className="w-4 h-4" />Executive Presentation</div>
            <div className="premium-pill"><BadgeCheck className="w-4 h-4" />Model-Driven Decisioning</div>
            <div className="premium-pill"><Sparkles className="w-4 h-4" />Institutional Grade UX</div>
          </div>
        </motion.section>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <motion.section
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="lg:col-span-8 premium-card p-6 md:p-8 premium-borderline"
          >
            <div className="flex items-center gap-3 mb-7">
              <div className="h-9 w-9 rounded-lg bg-amber-100/10 border border-amber-100/30 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-amber-200" />
              </div>
              <h3 className="font-display text-2xl text-slate-50">Applicant Profile</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="label-text">Age</label>
                  <input type="number" name="age" value={formData.age} onChange={handleInputChange} className="input-field" placeholder="e.g. 35" required min="18" max="100" />
                </div>

                <div className="space-y-1.5">
                  <label className="label-text">Credit Score</label>
                  <div className="relative">
                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="number" name="credit_score" value={formData.credit_score} onChange={handleInputChange} className="input-field pl-12" placeholder="300 - 850" required min="300" max="850" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="label-text">Annual Income</label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="number" name="income" value={formData.income} onChange={handleInputChange} className="input-field pl-12" placeholder="e.g. 75000" required min="0" step="0.01" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="label-text">Requested Loan Amount</label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="number" name="loan_amount" value={formData.loan_amount} onChange={handleInputChange} className="input-field pl-12" placeholder="e.g. 25000" required min="0" step="0.01" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="label-text flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-slate-400" />
                    Employment Duration (Years)
                  </label>
                  <input type="number" name="employment_years" value={formData.employment_years} onChange={handleInputChange} className="input-field" placeholder="e.g. 5" required min="0" step="0.1" />
                </div>

                <div className="space-y-1.5">
                  <label className="label-text flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-slate-400" />
                    Education Level
                  </label>
                  <select name="education_level" value={formData.education_level} onChange={handleInputChange} className="input-field cursor-pointer" required>
                    <option value="" disabled>Select level...</option>
                    <option value="0">High School</option>
                    <option value="1">Bachelor's Degree</option>
                    <option value="2">Master's Degree</option>
                    <option value="3">Ph.D. or Higher</option>
                  </select>
                </div>

                <div className="md:col-span-2 space-y-1.5">
                  <label className="label-text flex items-center gap-2">
                    <Home className="w-4 h-4 text-slate-400" />
                    Housing Status
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: '0', label: 'Rent' },
                      { value: '1', label: 'Mortgage' },
                      { value: '2', label: 'Own' },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className={`rounded-xl border px-4 py-3 text-center text-sm transition ${
                          formData.housing_status === option.value
                            ? 'border-amber-200/70 bg-amber-100/15 text-amber-100'
                            : 'border-white/15 bg-white/5 text-slate-300 hover:bg-white/[0.08]'
                        }`}
                      >
                        <input
                          type="radio"
                          name="housing_status"
                          value={option.value}
                          checked={formData.housing_status === option.value}
                          onChange={handleInputChange}
                          className="hidden"
                          required
                        />
                        {option.label}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || result !== null}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-200 via-amber-300 to-yellow-500 text-slate-900 font-semibold px-6 py-3.5 hover:brightness-105 transition disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_12px_36px_rgba(245,158,11,0.22)]"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                    Processing Analysis...
                  </>
                ) : (
                  <>
                    Run Risk Analysis
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </motion.section>

          <motion.aside
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="lg:col-span-4 space-y-5"
          >
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="premium-card border-red-300/30 bg-red-400/10 p-5 premium-borderline"
                >
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-300 mt-0.5" />
                    <div>
                      <h4 className="text-red-200 font-medium">Analysis Failed</h4>
                      <p className="text-sm text-red-100/90 mt-1">{error}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {result && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  className="premium-card p-6 premium-borderline"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">Assessment Status</p>
                  <div className="flex items-center gap-2 mb-5">
                    {result.prediction === 0 ? (
                      <>
                        <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                        <span className="text-2xl font-display text-emerald-200">Approved</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-5 w-5 text-red-300" />
                        <span className="text-2xl font-display text-red-200">High Risk</span>
                      </>
                    )}
                  </div>

                  <div className="mb-5">
                    <div className="flex justify-between text-sm text-slate-300 mb-2">
                      <span>Default Probability</span>
                      <span className="font-semibold text-slate-100">{(result.probability * 100).toFixed(1)}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${result.probability * 100}%` }}
                        transition={{ duration: 0.8 }}
                        className={result.prediction === 0 ? 'h-full bg-emerald-300' : 'h-full bg-red-300'}
                      />
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-slate-300 border-t border-white/10 pt-4">
                    <div className="flex justify-between">
                      <span>Risk Level</span>
                      <span className="text-slate-100">{result.risk_level}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Confidence</span>
                      <span className="text-slate-100">
                        {result.prediction === 0
                          ? ((1 - result.probability) * 100).toFixed(1)
                          : (result.probability * 100).toFixed(1)}
                        %
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={resetForm}
                    className="mt-6 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-medium text-slate-100 hover:bg-white/10 transition"
                  >
                    Start New Assessment
                  </button>
                </motion.div>
              )}

              {!result && !error && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="premium-card p-6 min-h-[260px] flex flex-col justify-center premium-borderline"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">Awaiting Input</p>
                  <h4 className="font-display text-2xl text-slate-100 mb-2">No assessment yet</h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Complete the applicant profile and submit to generate a credit decision with model probability.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.aside>
        </div>
      </main>
    </div>
  );
}

export default App;
