
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, TrendingUp, PieChart, Target } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import StatsCard from '@/components/StatsCard';
import { Link } from 'react-router-dom';

const InvestorDashboard = () => {
  const [investments, setInvestments] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalInvested: 0,
    totalEarnings: 0,
    activeInvestments: 0,
    portfolioValue: 0
  });
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchInvestments();
      fetchStats();
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;

    // Set up realtime subscription for investments
    const channel = supabase
      .channel('investor-investments')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'investments',
          filter: `investor_id=eq.${user.id}`
        },
        () => {
          fetchInvestments();
          fetchStats();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const fetchInvestments = async () => {
    const { data } = await supabase
      .from('investments')
      .select(`
        *,
        courses (
          title,
          creator_id,
          total_revenue,
          student_count,
          profiles (full_name)
        )
      `)
      .eq('investor_id', user?.id)
      .order('purchased_at', { ascending: false });
    
    setInvestments(data || []);
  };

  const fetchStats = async () => {
    const { data: investments } = await supabase
      .from('investments')
      .select('purchase_price, current_value, total_earnings, status')
      .eq('investor_id', user?.id);

    if (investments) {
      const totalInvested = investments.reduce((sum, inv) => sum + (inv.purchase_price || 0), 0);
      const totalEarnings = investments.reduce((sum, inv) => sum + (inv.total_earnings || 0), 0);
      const portfolioValue = investments.reduce((sum, inv) => sum + (inv.current_value || 0), 0);
      const activeInvestments = investments.filter(inv => inv.status === 'active').length;

      setStats({
        totalInvested,
        totalEarnings,
        activeInvestments,
        portfolioValue
      });
    }
  };

  const calculateROI = (investment: any) => {
    if (!investment.purchase_price) return 0;
    return ((investment.current_value - investment.purchase_price) / investment.purchase_price * 100).toFixed(1);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Investor Dashboard</h1>
          <p className="text-slate-600 mt-2">Track your investments and discover new opportunities</p>
        </div>
        <Link to="/marketplace">
          <Badge className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-4 py-2 cursor-pointer hover:from-blue-700 hover:to-green-700">
            Explore Marketplace
          </Badge>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          icon={<DollarSign className="w-6 h-6" />}
          value={`₹${stats.totalInvested.toLocaleString()}`}
          label="Total Invested"
          trend="+15%"
        />
        <StatsCard
          icon={<TrendingUp className="w-6 h-6" />}
          value={`₹${stats.totalEarnings.toLocaleString()}`}
          label="Total Earnings"
          trend="+22%"
        />
        <StatsCard
          icon={<PieChart className="w-6 h-6" />}
          value={`₹${stats.portfolioValue.toLocaleString()}`}
          label="Portfolio Value"
          trend="+18%"
        />
        <StatsCard
          icon={<Target className="w-6 h-6" />}
          value={stats.activeInvestments.toString()}
          label="Active Investments"
          trend="+3"
        />
      </div>

      {/* Investments Grid */}
      <div>
        <h2 className="text-xl font-semibold text-slate-900 mb-6">Your Investments</h2>
        {investments.length === 0 ? (
          <Card className="p-8 text-center">
            <div className="text-slate-400 mb-4">
              <PieChart className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No Investments Yet</h3>
            <p className="text-slate-600 mb-4">Start building your portfolio by investing in courses</p>
            <Link to="/marketplace">
              <Badge className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-4 py-2 cursor-pointer hover:from-blue-700 hover:to-green-700">
                Browse Courses
              </Badge>
            </Link>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {investments.map((investment) => (
              <Card key={investment.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{investment.courses?.title}</CardTitle>
                  <div className="flex gap-2">
                    <Badge 
                      variant={investment.status === 'active' ? 'default' : 'secondary'}
                    >
                      {investment.status}
                    </Badge>
                    <Badge 
                      variant="outline"
                      className={parseFloat(calculateROI(investment)) >= 0 ? 'text-green-600' : 'text-red-600'}
                    >
                      {calculateROI(investment)}% ROI
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-slate-600">
                    <div className="flex justify-between">
                      <span>Creator:</span>
                      <span className="font-semibold">{investment.courses?.profiles?.full_name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shares Owned:</span>
                      <span className="font-semibold">{investment.shares_owned}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Purchase Price:</span>
                      <span className="font-semibold">₹{investment.purchase_price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Current Value:</span>
                      <span className="font-semibold">₹{investment.current_value}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Earnings:</span>
                      <span className="font-semibold text-green-600">₹{investment.total_earnings}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InvestorDashboard;
