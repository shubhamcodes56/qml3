import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ParticleBackground from '@/components/ParticleBackground';

export const QMLEdaPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-[#f4f2eb] relative overflow-hidden font-sans">
      <ParticleBackground />
      
      {/* Top Navbar */}
      <nav className="w-full px-6 sm:px-12 py-5 flex items-center justify-between z-20 relative border-b border-[#e5e2d9]/80 bg-[#f4f2eb]/90 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/login')}
            className="flex items-center gap-2 text-sm font-semibold text-[#111111] hover:text-[#4a7c6f] transition-colors bg-white px-3 py-1.5 rounded-full border border-[#d4d0ca] shadow-sm cursor-pointer"
          >
            <ArrowLeft size={16} /> Back to Login
          </button>
          
          <div className="flex items-center gap-2 ml-4 border-l border-[#d4d0ca] pl-4">
            <span className="font-serif text-xl font-bold tracking-tight text-[#111111]">
              Q-Sentinel
            </span>
            <span className="text-[10px] font-mono font-bold bg-[#111111] text-white px-1.5 py-0.5 rounded">
              EDA
            </span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 py-10 flex flex-col items-center">
        
        <div className="text-center max-w-3xl mb-10">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#111111] mb-4">
            Quantum Machine Learning (QML) vs Classical ML
          </h1>
          <p className="text-[#6b6b6b] text-base leading-relaxed">
            Exploratory Data Analysis showing exactly why our 8-Qubit Variational Quantum Circuit (VQC) 
            outperforms classical Convolutional Neural Networks (like ResNet-50) in early-stage Tuberculosis diagnostics.
          </p>
        </div>

        {/* The generated EDA image */}
        <div className="w-full max-w-6xl bg-white border border-[#d4d0ca] rounded-2xl p-2 shadow-xl">
          <div className="w-full rounded-xl overflow-hidden bg-[#11161b] flex items-center justify-center min-h-[500px]">
            <img 
              src="/qml_vs_ml_presentation.png" 
              alt="QML vs Classical ML EDA Charts" 
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Key Takeaways */}
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white border border-[#d4d0ca] rounded-2xl p-6 shadow-sm">
            <h3 className="font-serif text-lg font-bold text-[#111111] mb-2">High Dimensional Feature Mapping</h3>
            <p className="text-sm text-[#333333] leading-relaxed">
              Unlike classical models that struggle to draw boundaries through overlapping medical symptoms, QML maps the data into a Hilbert space. This allows the model to draw highly complex, non-linear boundaries to isolate positive TB cases effectively.
            </p>
          </div>
          <div className="bg-white border border-[#d4d0ca] rounded-2xl p-6 shadow-sm">
            <h3 className="font-serif text-lg font-bold text-[#111111] mb-2">Massive Parameter Efficiency</h3>
            <p className="text-sm text-[#333333] leading-relaxed">
              ResNet-50 requires over 23 million parameters, making it heavy and prone to overfitting on small datasets. Our QML model achieves superior accuracy with just 32 trainable parameters, proving incredible architectural efficiency suitable for edge deployment.
            </p>
          </div>
        </div>

      </main>
    </div>
  );
};
