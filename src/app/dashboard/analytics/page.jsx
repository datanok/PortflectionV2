"use client"
import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Eye, Share2, Globe, Bot } from "lucide-react";

export default function AnalyticsDashboard() {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activePeriod, setActivePeriod] = useState("7days");
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);

  const periods = [
    { value: "24h", label: "Last 24 Hours" },
    { value: "7days", label: "Last 7 Days" },
    { value: "30days", label: "Last 30 Days" },
    { value: "90days", label: "Last 90 Days" },
    { value: "all", label: "All Time" }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A259FF', '#FF6B6B'];

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        setIsLoading(true);
        // In a real implementation, you would use the fetch API with your actual endpoint
        // For now we'll use the sample data you provided
        const data = {
          portfolios: [
            { id: "cm9iesufg000dfjtgqgbdrt78", name: "Alex Johnson" },
            { id: "cma5glzdw0001u0u0b25pi7ly", name: "Alex Johnson" },
            { id: "cma6f4rxu0001fjvglizgspt2", name: "Uday kumar Gangapuram" }
          ],
          portfolioData: {
            "cm9iesufg000dfjtgqgbdrt78": {
              id: "cm9iesufg000dfjtgqgbdrt78",
              name: "Alex Johnson",
              totalViews: 7,
              viewsOverTime: [],
              viewsByCountry: [],
              viewsByReferrer: [],
              botTraffic: [],
              recentVisitors: []
            },
            "cma5glzdw0001u0u0b25pi7ly": {
              id: "cma5glzdw0001u0u0b25pi7ly",
              name: "Alex Johnson",
              totalViews: 0,
              viewsOverTime: [],
              viewsByCountry: [],
              viewsByReferrer: [],
              botTraffic: [],
              recentVisitors: []
            },
            "cma6f4rxu0001fjvglizgspt2": {
              id: "cma6f4rxu0001fjvglizgspt2",
              name: "Uday kumar Gangapuram",
              totalViews: 2,
              viewsOverTime: [
                { timestamp: "2025-05-15T10:26:00.543Z", count: 1 },
                { timestamp: "2025-05-15T10:26:53.404Z", count: 1 }
              ],
              viewsByCountry: [],
              viewsByReferrer: [
                { referrer: "http://10.51.121.57:3000/portfolio/cma6f4rxu0001fjvglizgspt2", count: 2 }
              ],
              botTraffic: [
                { isBot: false, count: 2 }
              ],
              recentVisitors: [
                {
                  timestamp: "2025-05-15T10:26:53.404Z",
                  country: null,
                  referrer: "http://10.51.121.57:3000/portfolio/cma6f4rxu0001fjvglizgspt2",
                  userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
                  isBot: false
                },
                {
                  timestamp: "2025-05-15T10:26:00.543Z",
                  country: null,
                  referrer: "http://10.51.121.57:3000/portfolio/cma6f4rxu0001fjvglizgspt2",
                  userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
                  isBot: false
                }
              ]
            }
          },
          aggregatedStats: {
            totalViews: 9,
            viewsOverTime: [
              { date: "2025-05-15", count: 2 }
            ],
            viewsByCountry: [],
            viewsByReferrer: [
              { referrer: "http://10.51.121.57:3000/portfolio/cma6f4rxu0001fjvglizgspt2", count: 2 }
            ],
            botTraffic: [
              { isBot: true, count: 0 },
              { isBot: false, count: 2 }
            ]
          }
        };
        
        setAnalyticsData(data);
        
        // Set the first portfolio with data as the default selected portfolio
        if (data.portfolios && data.portfolios.length > 0) {
          const portfolioWithData = data.portfolios.find(p => {
            const portfolioData = data.portfolioData[p.id];
            return portfolioData && portfolioData.totalViews > 0;
          }) || data.portfolios[0];
          
          setSelectedPortfolio(portfolioWithData.id);
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching analytics:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAnalytics();
  }, [activePeriod]); // Re-fetch when period changes

  // Get the correct data based on whether we're looking at aggregated or portfolio-specific data
  const getCurrentData = () => {
    if (!analyticsData) return null;
    
    if (selectedPortfolio && analyticsData.portfolioData[selectedPortfolio]) {
      return analyticsData.portfolioData[selectedPortfolio];
    }
    
    return analyticsData.aggregatedStats;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    if (activePeriod === "24h") {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  const processViewsOverTime = () => {
    const currentData = getCurrentData();
    if (!currentData?.viewsOverTime || currentData.viewsOverTime.length === 0) return [];

    return currentData.viewsOverTime.map(item => ({
      date: formatDate(item.timestamp || item.date),
      views: item.count || 0
    }));
  };

  const processCountryData = () => {
    const currentData = getCurrentData();
    if (!currentData?.viewsByCountry || currentData.viewsByCountry.length === 0) {
      return [{ country: 'No Data', views: 0 }];
    }

    return currentData.viewsByCountry
      .filter(item => item.country)
      .slice(0, 10)
      .map(item => ({
        country: item.country || 'Unknown',
        views: item.count || 0
      }));
  };

  const processReferrerData = () => {
    const currentData = getCurrentData();
    if (!currentData?.viewsByReferrer || currentData.viewsByReferrer.length === 0) {
      return [{ referrer: 'No Data', views: 0 }];
    }

    return currentData.viewsByReferrer
      .map(item => ({
        referrer: item.referrer || 'Direct',
        views: item.count || 0
      }));
  };

  const processBotData = () => {
    const currentData = getCurrentData();
    if (!currentData?.botTraffic || currentData.botTraffic.length === 0) {
      return [{ name: 'No Data', value: 1 }];
    }

    const data = [];
    const botEntry = currentData.botTraffic.find(item => item.isBot === true);
    const humanEntry = currentData.botTraffic.find(item => item.isBot === false);

    if (botEntry) data.push({ name: 'Bots', value: botEntry.count || 0 });
    if (humanEntry) data.push({ name: 'Humans', value: humanEntry.count || 0 });
    
    // If we have no data at all, add a placeholder
    if (data.length === 0) {
      data.push({ name: 'No Data', value: 1 });
    }

    return data;
  };

  const formatReferrer = (referrer) => {
    if (!referrer || referrer === 'No Data') return 'Direct';
    try {
      const url = new URL(referrer);
      return url.hostname;
    } catch (e) {
      return referrer;
    }
  };

  const getTop = (data, key) => {
    if (!data || data.length === 0 || data[0][key] === 'No Data') return 'No data';
    return data[0][key];
  };
  
  const getHumanTrafficPercentage = () => {
    const data = processBotData();
    if (data.length === 1 && data[0].name === 'No Data') return 0;
    
    const humans = data.find(d => d.name === 'Humans')?.value || 0;
    const bots = data.find(d => d.name === 'Bots')?.value || 0;
    const total = humans + bots;
    return total ? Math.round((humans / total) * 100) : 0;
  };

  const getTotalViews = () => {
    const currentData = getCurrentData();
    return currentData?.totalViews || 0;
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="h-6 w-48 bg-gray-200 rounded mb-6"></div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white rounded-lg shadow p-4">
              <div className="h-4 w-24 bg-gray-200 rounded mb-4"></div>
              <div className="h-8 w-16 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {[1, 2].map(i => (
            <div key={i} className="bg-white rounded-lg shadow p-4">
              <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
              <div className="h-80 bg-gray-100 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold">Portfolio Analytics</h1>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          {/* Portfolio selector */}
          <select 
            className="rounded-md border border-gray-300 p-2"
            value={selectedPortfolio || ''}
            onChange={(e) => setSelectedPortfolio(e.target.value || null)}
          >
            <option value="">All Portfolios</option>
            {analyticsData?.portfolios?.map(portfolio => (
              <option key={portfolio.id} value={portfolio.id}>
                {portfolio.name}
              </option>
            ))}
          </select>
          
          {/* Time period selector */}
          <div className="bg-gray-100 rounded-md p-1">
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-1">
              {periods.map(period => (
                <button
                  key={period.value}
                  className={`px-3 py-1 text-sm rounded-md ${activePeriod === period.value ? 'bg-white shadow' : ''}`}
                  onClick={() => setActivePeriod(period.value)}
                >
                  {period.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500 mb-1">Total Views</div>
          <div className="flex items-center">
            <Eye className="mr-2 h-4 w-4 text-gray-500" />
            <span className="text-2xl font-bold">{getTotalViews()}</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500 mb-1">Top Country</div>
          <div className="flex items-center">
            <Globe className="mr-2 h-4 w-4 text-gray-500" />
            <span className="text-2xl font-bold">{getTop(processCountryData(), 'country')}</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500 mb-1">Top Referrer</div>
          <div className="flex items-center">
            <Share2 className="mr-2 h-4 w-4 text-gray-500" />
            <span className="text-2xl font-bold">{formatReferrer(getTop(processReferrerData(), 'referrer'))}</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500 mb-1">Human Traffic</div>
          <div className="flex items-center">
            <Bot className="mr-2 h-4 w-4 text-gray-500" />
            <span className="text-2xl font-bold">{getHumanTrafficPercentage()}%</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-lg font-medium mb-2">Visits Over Time</div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              {processViewsOverTime().length > 0 ? (
                <LineChart 
                  data={processViewsOverTime()} 
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="views" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">No time series data available</p>
                </div>
              )}
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-lg font-medium mb-2">Bot vs Human Traffic</div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={processBotData()} 
                  dataKey="value" 
                  nameKey="name" 
                  cx="50%" 
                  cy="50%" 
                  outerRadius={100} 
                  label
                >
                  {processBotData().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="text-lg font-medium mb-4">Referrers</div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Referrer
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Views
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {processReferrerData().map((ref, idx) => (
                <tr key={idx}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatReferrer(ref.referrer)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                    {ref.views}
                  </td>
                </tr>
              ))}
              {processReferrerData().length === 0 && (
                <tr>
                  <td colSpan={2} className="px-6 py-4 text-center text-sm text-gray-500">
                    No referrer data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}