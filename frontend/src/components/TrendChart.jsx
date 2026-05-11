import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

const TrendChart = ({ stationName }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chartType, setChartType] = useState('AQI');

  useEffect(() => {
    if (!stationName) return;
    
    const fetchTrend = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/api/trend/${encodeURIComponent(stationName)}`);
        if (response.data.status === 'success') {
          const formattedData = response.data.data.map(d => {
            const dateObj = new Date(d.Date);
            return {
              ...d,
              displayDate: `${dateObj.toLocaleString('default', { month: 'short' })} ${dateObj.getDate()}`
            };
          });
          setData(formattedData);
        }
      } catch (error) {
        console.error("Error fetching trend data", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTrend();
  }, [stationName]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card" style={{ padding: '12px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: 0 }}>
          <p style={{ margin: 0, fontSize: '0.75rem', color: '#94a3b8', fontWeight: 700, marginBottom: '8px', textTransform: 'uppercase' }}>{label}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: payload[0].color }}></div>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f8fafc' }}>
              {chartType}: {payload[0].value}{chartType === 'Temperature' ? '°C' : ''}
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  const chartColor = chartType === 'AQI' ? '#38bdf8' : '#fbbf24';

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {['AQI', 'Temperature'].map(type => (
            <button 
              key={type}
              onClick={() => setChartType(type)}
              style={{
                background: chartType === type ? 'rgba(56, 189, 248, 0.1)' : 'transparent',
                color: chartType === type ? '#38bdf8' : '#64748b',
                border: `1px solid ${chartType === type ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255,255,255,0.05)'}`,
                padding: '6px 16px',
                borderRadius: '8px',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
      
      <div style={{ height: 320 }}>
        {loading ? (
          <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#94a3b8', fontSize: '0.9rem' }}>
            Synchronizing historical data...
          </div>
        ) : data.length === 0 ? (
          <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#94a3b8', fontSize: '0.9rem' }}>
            No historical records found for this station.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={chartColor} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={chartColor} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
              <XAxis 
                dataKey="displayDate" 
                stroke="#64748b" 
                fontSize={10} 
                fontWeight={600}
                tickLine={false} 
                axisLine={false}
                dy={10}
              />
              <YAxis 
                stroke="#64748b" 
                fontSize={10} 
                fontWeight={600}
                tickLine={false} 
                axisLine={false} 
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey={chartType} 
                stroke={chartColor} 
                strokeWidth={3} 
                fillOpacity={1} 
                fill="url(#colorValue)" 
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default TrendChart;
