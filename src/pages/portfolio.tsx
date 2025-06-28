
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, DollarSign, TrendingUp, ArrowUp, ArrowDown, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Portfolio = () => {
  const [timeframe, setTimeframe] = useState("1M");

  const portfolioStats = {
    totalInvested: 25000,
    currentValue: 38500,
    totalReturn: 13500,
    returnPercentage: 54,
    monthlyEarnings: 4200,
    activeCourses: 8,
  };

  const investments = [
    {
      id: 1,
      courseTitle: "Mastering AI in 30 Days",
      creator: "Alex Johnson",
      sharesOwned: 100,
      sharePrice: 10,
      currentPrice: 15,
      totalInvested: 1000,
      currentValue: 1500,
      monthlyEarnings: 380,
      roi: 50,
      status: "growing",
    },
    {
      id: 2,
      courseTitle: "Python for Beginners",
      creator: "Sarah Chen",
      sharesOwned: 200,
      sharePrice: 15,
      currentPrice: 18,
      totalInvested: 3000,
      currentValue: 3600,
      monthlyEarnings: 520,
      roi: 20,
      status: "stable",
    },
    {
      id: 3,
      courseTitle: "React Development Bootcamp",
      creator: "Emma Wilson",
      sharesOwned: 150,
      sharePrice: 12,
      currentPrice: 22,
      totalInvested: 1800,
      currentValue: 3300,
      monthlyEarnings: 680,
      roi: 83,
      status: "growing",
    },
    {
      id: 4,
      courseTitle: "Digital Marketing Mastery",
      creator: "Mike Rodriguez",
      sharesOwned: 250,
      sharePrice: 8,
      currentPrice: 7,
      totalInvested: 2000,
      currentValue: 1750,
      monthlyEarnings: 145,
      roi: -12.5,
      status: "declining",
    },
  ];

  const recentTransactions = [
    {
      type: "buy",
      courseTitle: "Data Science with Python",
      shares: 50,
      pricePerShare: 20,
      date: "2024-01-15",
    },
    {
      type: "sell",
      courseTitle: "Graphic Design Fundamentals",
      shares: 30,
      pricePerShare: 12,
      date: "2024-01-12",
    },
    {
      type: "earnings",
      courseTitle: "Mastering AI in 30 Days",
      amount: 380,
      date: "2024-01-10",
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                EduInvest
              </span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/marketplace" className="text-slate-600 hover:text-slate-900 transition-colors">
                Marketplace
              </Link>
              <Link to="/creators" className="text-slate-600 hover:text-slate-900 transition-colors">
                For Creators
              </Link>
              <Link to="/portfolio" className="text-blue-600 font-semibold border-b-2 border-blue-600 pb-1">
                Portfolio
              </Link>
              <Button variant="outline" className="border-slate-300">
                Sign In
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Investment Portfolio
          </h1>
          <p className="text-xl text-slate-600">
            Track your course investments and earnings
          </p>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-slate-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Total Invested</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {formatCurrency(portfolioStats.totalInvested)}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <DollarSign className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Current Value</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {formatCurrency(portfolioStats.currentValue)}
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Total Return</p>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(portfolioStats.totalReturn)}
                  </p>
                  <p className="text-sm text-green-600 flex items-center gap-1">
                    <ArrowUp className="w-3 h-3" />
                    +{portfolioStats.returnPercentage}%
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <ArrowUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Monthly Earnings</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {formatCurrency(portfolioStats.monthlyEarnings)}
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="investments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="investments">My Investments</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="investments" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-slate-900">Active Investments</h2>
              <Link to="/marketplace">
                <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                  Invest More
                </Button>
              </Link>
            </div>

            <div className="grid gap-6">
              {investments.map((investment) => (
                <Card key={investment.id} className="border-slate-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-6 gap-4 items-center">
                      <div className="md:col-span-2">
                        <h3 className="font-semibold text-slate-900 mb-1">
                          {investment.courseTitle}
                        </h3>
                        <p className="text-sm text-slate-600">by {investment.creator}</p>
                        <Badge 
                          className={`mt-2 ${
                            investment.status === 'growing' 
                              ? 'bg-green-100 text-green-800' 
                              : investment.status === 'stable'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {investment.status}
                        </Badge>
                      </div>
                      
                      <div>
                        <p className="text-sm text-slate-600">Shares Owned</p>
                        <p className="font-semibold text-slate-900">{investment.sharesOwned}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-slate-600">Invested</p>
                        <p className="font-semibold text-slate-900">
                          {formatCurrency(investment.totalInvested)}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-slate-600">Current Value</p>
                        <p className="font-semibold text-slate-900">
                          {formatCurrency(investment.currentValue)}
                        </p>
                        <p className={`text-sm flex items-center gap-1 ${
                          investment.roi >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {investment.roi >= 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                          {Math.abs(investment.roi)}%
                        </p>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Sell
                        </Button>
                        <Button size="sm" variant="outline">
                          Buy More
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <h2 className="text-xl font-semibold text-slate-900">Recent Transactions</h2>
            
            <div className="space-y-4">
              {recentTransactions.map((transaction, index) => (
                <Card key={index} className="border-slate-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-full ${
                          transaction.type === 'buy' 
                            ? 'bg-blue-100 text-blue-600'
                            : transaction.type === 'sell'
                              ? 'bg-red-100 text-red-600'
                              : 'bg-green-100 text-green-600'
                        }`}>
                          {transaction.type === 'buy' ? '↗' : transaction.type === 'sell' ? '↙' : '💰'}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">
                            {transaction.type === 'buy' && `Bought ${transaction.shares} shares`}
                            {transaction.type === 'sell' && `Sold ${transaction.shares} shares`}
                            {transaction.type === 'earnings' && 'Revenue Earnings'}
                          </p>
                          <p className="text-sm text-slate-600">{transaction.courseTitle}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-slate-900">
                          {transaction.type === 'earnings' 
                            ? formatCurrency(transaction.amount!)
                            : formatCurrency(transaction.shares! * transaction.pricePerShare!)
                          }
                        </p>
                        <p className="text-sm text-slate-600">{transaction.date}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="text-center py-12">
              <TrendingUp className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Advanced Analytics Coming Soon
              </h3>
              <p className="text-slate-600 mb-4">
                Detailed performance charts, ROI tracking, and investment insights.
              </p>
              <Button variant="outline">
                Get Notified
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Portfolio;
