import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator, 
  AlertCircle, 
  CheckCircle, 
  ChevronRight,
  ShieldCheck,
  Briefcase,
  GraduationCap,
  Home,
  CreditCard,
  DollarSign,
  Activity
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
    <div className="min-h-screen bg-background relative overflow-x-hidden selection:bg-accent/30">
      {/* Abstract Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Navigation / Header */}
      <nav className="w-full border-b border-border bg-background/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <ShieldCheck className="text-white w-5 h-5" />
            </div>
            <span className="font-display font-semibold text-xl tracking-tight text-foreground">
              Aegis<span className="text-accent">Risk</span>
            </span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="max-w-5xl mx-auto space-y-12">
          
          {/* Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center space-y-4"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground font-display">
              Intelligent Loan <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400">
                Risk Assessment
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Leverage advanced machine learning to evaluate default risk and make informed lending decisions with confidence.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Form Section */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="lg:col-span-8"
            >
              <div className="glass-card p-6 md:p-10">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="p-2 bg-accent/10 rounded-lg text-accent">
                    <Activity className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-semibold font-display text-foreground">Applicant Details</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    
                    {/* Age */}
                    <div className="space-y-1">
                      <label className="label-text flex items-center gap-2">
                        Age
                      </label>
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="e.g. 35"
                        required
                        min="18"
                        max="100"
                      />
                    </div>

                    {/* Credit Score */}
                    <div className="space-y-1">
                      <label className="label-text flex items-center gap-2">
                        Credit Score
                      </label>
                      <div className="relative">
                        <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                          type="number"
                          name="credit_score"
                          value={formData.credit_score}
                          onChange={handleInputChange}
                          className="input-field pl-11"
                          placeholder="300 - 850"
                          required
                          min="300"
                          max="850"
                        />
                      </div>
                    </div>

                    {/* Annual Income */}
                    <div className="space-y-1">
                      <label className="label-text flex items-center gap-2">
                        Annual Income
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                          type="number"
                          name="income"
                          value={formData.income}
                          onChange={handleInputChange}
                          className="input-field pl-11"
                          placeholder="e.g. 75000"
                          required
                          min="0"
                          step="0.01"
                        />
                      </div>
                    </div>

                    {/* Loan Amount */}
                    <div className="space-y-1">
                      <label className="label-text flex items-center gap-2">
                        Requested Loan Amount
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                          type="number"
                          name="loan_amount"
                          value={formData.loan_amount}
                          onChange={handleInputChange}
                          className="input-field pl-11"
                          placeholder="e.g. 25000"
                          required
                          min="0"
                          step="0.01"
                        />
                      </div>
                    </div>

                    {/* Employment Years */}
                    <div className="space-y-1">
                      <label className="label-text flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-muted-foreground" />
                        Employment Duration (Years)
                      </label>
                      <input
                        type="number"
                        name="employment_years"
                        value={formData.employment_years}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="e.g. 5"
                        required
                        min="0"
                        step="0.1"
                      />
                    </div>

                    {/* Education Level */}
                    <div className="space-y-1">
                      <label className="label-text flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-muted-foreground" />
                        Education Level
                      </label>
                      <select
                        name="education_level"
                        value={formData.education_level}
                        onChange={handleInputChange}
                        className="input-field cursor-pointer"
                        required
                      >
                        <option value="" disabled className="text-muted-foreground">Select level...</option>
                        <option value="0">High School</option>
                        <option value="1">Bachelor's Degree</option>
                        <option value="2">Master's Degree</option>
                        <option value="3">Ph.D. or Higher</option>
                      </select>
                    </div>

                    {/* Housing Status */}
                    <div className="md:col-span-2 space-y-1">
                      <label className="label-text flex items-center gap-2">
                        <Home className="w-4 h-4 text-muted-foreground" />
                        Housing Status
                      </label>
                      <div className="grid grid-cols-3 gap-4">
                        {[
                          { value: "0", label: "Rent" },
                          { value: "1", label: "Mortgage" },
                          { value: "2", label: "Own" }
                        ].map((option) => (
                          <label 
                            key={option.value} 
                            className={`
                              flex items-center justify-center py-3 px-4 rounded-xl border cursor-pointer transition-all duration-200
                              ${formData.housing_status === option.value 
                                ? 'bg-accent/10 border-accent text-accent shadow-[0_0_15px_rgba(59,130,246,0.15)]' 
                                : 'bg-card/50 border-border text-muted-foreground hover:bg-card-hover'}
                            `}
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
                            <span className="font-medium text-sm">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <button
                      type="submit"
                      disabled={loading || result !== null}
                      className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-accent to-blue-600 text-white px-8 py-4 rounded-xl font-medium shadow-glow hover:shadow-[0_0_25px_rgba(59,130,246,0.3)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Processing Analysis...</span>
                        </>
                      ) : (
                        <>
                          <span>Run Risk Analysis</span>
                          <ChevronRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>

            {/* Results Sidebar Section */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="lg:col-span-4 space-y-6"
            >
              <AnimatePresence mode="wait">
                {/* Error Display */}
                {error && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, height: 0, scale: 0.95 }}
                    animate={{ opacity: 1, height: 'auto', scale: 1 }}
                    exit={{ opacity: 0, height: 0, scale: 0.95 }}
                    className="glass-card border-danger/30 bg-danger/5 p-6"
                  >
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-6 h-6 text-danger shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-danger font-medium mb-1">Analysis Failed</h3>
                        <p className="text-danger/80 text-sm leading-relaxed">{error}</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Result Display */}
                {result && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className={`glass-card p-6 border-t-4 relative overflow-hidden ${
                      result.prediction === 0 ? 'border-t-success' : 'border-t-danger'
                    }`}
                  >
                    {/* Background subtle glow based on result */}
                    <div className={`absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-20 pointer-events-none ${
                      result.prediction === 0 ? 'bg-success' : 'bg-danger'
                    }`} />

                    <div className="relative z-10 space-y-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wider">Assessment Status</p>
                          <h3 className="text-2xl font-display font-semibold text-foreground flex items-center gap-2">
                            {result.prediction === 0 ? (
                              <>
                                <CheckCircle className="w-6 h-6 text-success" />
                                <span>Approved</span>
                              </>
                            ) : (
                              <>
                                <AlertCircle className="w-6 h-6 text-danger" />
                                <span>High Risk</span>
                              </>
                            )}
                          </h3>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-border">
                        <div className="flex justify-between items-end mb-2">
                          <span className="text-muted-foreground text-sm">Default Probability</span>
                          <span className="text-xl font-semibold font-display">
                            {(result.probability * 100).toFixed(1)}%
                          </span>
                        </div>
                        {/* Progress Bar */}
                        <div className="w-full h-2 bg-card rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${result.probability * 100}%` }}
                            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                            className={`h-full rounded-full ${
                              result.prediction === 0 ? 'bg-success' : 'bg-danger'
                            }`}
                          />
                        </div>
                      </div>

                      <div className="space-y-3 pt-4 border-t border-border">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Risk Level</span>
                          <span className={`font-medium ${
                            result.prediction === 0 ? 'text-success' : 'text-danger'
                          }`}>
                            {result.risk_level}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Confidence</span>
                          <span className="font-medium text-foreground">
                            {result.prediction === 0 
                              ? ((1 - result.probability) * 100).toFixed(1) 
                              : (result.probability * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={resetForm}
                        className="w-full mt-4 bg-card hover:bg-card-hover border border-border text-foreground px-4 py-3 rounded-xl font-medium transition-colors duration-200"
                      >
                        Start New Assessment
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Empty State / Info box when no result */}
                {!result && !error && (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="glass-card p-6 flex flex-col items-center justify-center text-center space-y-4 min-h-[300px]"
                  >
                    <div className="w-16 h-16 rounded-full bg-card flex items-center justify-center border border-border">
                      <Calculator className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-2">Awaiting Data</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Fill in the applicant's details and run the analysis to generate a comprehensive risk assessment report.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
