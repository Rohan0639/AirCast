import React from 'react';
import { Zap, Target, TrendingUp, TrendingDown, Minus, Info } from 'lucide-react';

const DashboardMetrics = ({ stationData }) => {
  if (!stationData) return null;

  const { current_aqi, current_category, predicted_aqi, predicted_category, dominant_pollutant, confidence_score } = stationData;

  const getCategoryColor = (aqi) => {
    if (aqi == null) return "gray";
    if (aqi <= 50) return "#22c55e"; // Green
    if (aqi <= 100) return "#eab308"; // Yellow
    if (aqi <= 150) return "#f97316"; // Orange
    if (aqi <= 200) return "#ef4444"; // Red
    if (aqi <= 300) return "#a855f7"; // Purple
    return "#9f1239"; // Maroon
  };

  const currentAqiColor = getCategoryColor(current_aqi);
  const predictedAqiColor = getCategoryColor(predicted_aqi);
  
  let confColor = "#ef4444";
  if (confidence_score >= 90) confColor = "#22c55e";
  else if (confidence_score >= 80) confColor = "#eab308";

  const getTrendIcon = () => {
    if (!current_aqi || !predicted_aqi) return <Minus size={16} />;
    if (predicted_aqi > current_aqi + 5) return <TrendingUp size={16} color="#ef4444" />;
    if (predicted_aqi < current_aqi - 5) return <TrendingDown size={16} color="#22c55e" />;
    return <Minus size={16} color="#94a3b8" />;
  };

  return (
    <div className="grid-2" style={{ marginBottom: '2rem' }}>
      <div className="glass-card" style={{ borderLeft: `6px solid ${currentAqiColor}`, background: `linear-gradient(135deg, rgba(30, 41, 59, 0.4) 0%, ${currentAqiColor}05 100%)` }}>
        <div className="metric-flex">
          <div className="metric-label">
            <Zap size={14} color={currentAqiColor} /> Live Intelligence
          </div>
          <div className="metric-value large" style={{ color: currentAqiColor, textShadow: `0 0 20px ${currentAqiColor}30` }}>
            {current_aqi ?? '--'}
          </div>
          <div className="metric-tag" style={{ backgroundColor: `${currentAqiColor}15`, color: currentAqiColor, border: `1px solid ${currentAqiColor}30` }}>
            {current_category ?? '--'}
          </div>
        </div>
        <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '1.25rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Info size={14} /> Dominant: <span style={{ color: '#f8fafc', fontWeight: 700 }}>{dominant_pollutant}</span>
        </div>
      </div>

      <div className="glass-card" style={{ borderLeft: `6px solid ${predictedAqiColor}`, background: `linear-gradient(135deg, rgba(30, 41, 59, 0.4) 0%, ${predictedAqiColor}05 100%)` }}>
        <div className="metric-flex">
          <div className="metric-label" style={{ justifyContent: 'space-between', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Target size={14} color={predictedAqiColor} /> 24h AI Forecast
            </div>
            {getTrendIcon()}
          </div>
          <div className="metric-value large" style={{ color: predictedAqiColor, textShadow: `0 0 20px ${predictedAqiColor}30` }}>
            {predicted_aqi ?? '--'}
          </div>
          <div className="metric-tag" style={{ backgroundColor: `${predictedAqiColor}15`, color: predictedAqiColor, border: `1px solid ${predictedAqiColor}30` }}>
            {predicted_category ?? '--'}
          </div>
        </div>
        <div style={{ marginTop: '1.25rem' }}>
          <div style={{ 
            color: confColor, 
            fontSize: '0.75rem', 
            background: `${confColor}10`, 
            padding: '6px 12px', 
            borderRadius: '8px', 
            fontWeight: 700,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            border: `1px solid ${confColor}20`,
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            <ShieldCheckIcon size={14} /> Model Confidence: {confidence_score}%
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper for the inline icon
const ShieldCheckIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
);

export default DashboardMetrics;
