
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, DollarSign, Users, ArrowUp, TrendingUp, Shield, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Creators = () => {
  const benefits = [
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Keep 60%+ Revenue",
      description: "Unlike other platforms that take 30-50%, you decide how much to share with investors.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Get Upfront Investment",
      description: "Receive funding before your course launches and use it for marketing and production.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Retain Full Ownership",
      description: "You own your content completely. Investors only get a share of revenue, not your course.",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Built-in Marketing",
      description: "Investors are incentivized to promote your course, giving you organic marketing support.",
    },
  ];

  const steps = [
    {
      step: 1,
      title: "Create Your Course",
      description: "Upload your educational content and set your course price.",
    },
    {
      step: 2,
      title: "Set Investment Terms",
      description: "Decide what percentage of revenue to share and set your share price.",
    },
    {
      step: 3,
      title: "Launch & Get Funded",
      description: "Go live and start receiving investments while building your audience.",
    },
    {
      step: 4,
      title: "Earn & Grow",
      description: "Keep majority of revenue while investors help promote your success.",
    },
  ];

  const creatorStats = [
    { label: "Average Revenue Share Kept", value: "65%", trend: "+5%" },
    { label: "Upfront Investment Received", value: "₹2.8L", trend: "+23%" },
    { label: "Monthly Passive Income", value: "₹45K", trend: "+18%" },
    { label: "Course Completion Rate", value: "78%", trend: "+12%" },
  ];

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
              <Link to="/creators" className="text-blue-600 font-semibold border-b-2 border-blue-600 pb-1">
                For Creators
              </Link>
              <Link to="/portfolio" className="text-slate-600 hover:text-slate-900 transition-colors">
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

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-6 bg-gradient-to-r from-blue-100 to-green-100 text-blue-800 border-blue-200">
                🎓 For Course Creators
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                Get Funded to Create.
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  Keep Control & Profits.
                </span>
              </h1>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Unlike traditional platforms that take huge cuts, EduInvest lets you keep 60%+ of your revenue 
                while getting upfront investment to fund your course creation and marketing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 px-8 py-3 text-lg">
                  Start Selling
                </Button>
                <Button size="lg" variant="outline" className="px-8 py-3 text-lg border-slate-300">
                  View Creator Guide
                </Button>
              </div>
              <p className="text-sm text-slate-500">
                💡 Average creators earn 3x more compared to traditional platforms
              </p>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Creator Dashboard Preview</h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {creatorStats.map((stat, index) => (
                    <div key={index} className="text-center p-4 bg-slate-50 rounded-lg">
                      <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                      <div className="text-xs text-slate-600 mb-1">{stat.label}</div>
                      <div className="text-xs text-green-600 flex items-center justify-center gap-1">
                        <ArrowUp className="w-3 h-3" />
                        {stat.trend}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700 font-medium">This Month's Earnings</span>
                    <span className="text-2xl font-bold text-green-600">₹1,24,500</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Choose EduInvest?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Built by creators, for creators. We believe in fair revenue sharing and creator ownership.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center border-slate-200 hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-slate-900">{benefit.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Four simple steps to start earning more from your educational content
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-slate-900">{step.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full">
                    <div className="w-1/2 h-0.5 bg-gradient-to-r from-blue-200 to-green-200"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Platform Comparison
            </h2>
            <p className="text-xl text-slate-600">
              See why creators are switching to EduInvest
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-sm border border-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-slate-900 font-semibold">Feature</th>
                  <th className="px-6 py-4 text-center text-slate-900 font-semibold">EduInvest</th>
                  <th className="px-6 py-4 text-center text-slate-500">Traditional Platforms</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="px-6 py-4 text-slate-900 font-medium">Revenue Share</td>
                  <td className="px-6 py-4 text-center text-green-600 font-semibold">60-90%</td>
                  <td className="px-6 py-4 text-center text-red-500">50-70%</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="px-6 py-4 text-slate-900 font-medium">Upfront Investment</td>
                  <td className="px-6 py-4 text-center text-green-600 font-semibold">✓ Yes</td>
                  <td className="px-6 py-4 text-center text-red-500">✗ No</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-slate-900 font-medium">Content Ownership</td>
                  <td className="px-6 py-4 text-center text-green-600 font-semibold">100% Yours</td>
                  <td className="px-6 py-4 text-center text-red-500">Limited</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="px-6 py-4 text-slate-900 font-medium">Marketing Support</td>
                  <td className="px-6 py-4 text-center text-green-600 font-semibold">Built-in Community</td>
                  <td className="px-6 py-4 text-center text-red-500">DIY</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-slate-900 font-medium">Setup Time</td>
                  <td className="px-6 py-4 text-center text-green-600 font-semibold">&lt; 1 Hour</td>
                  <td className="px-6 py-4 text-center text-yellow-500">1-3 Days</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Course Business?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join successful creators who are already earning more while keeping control of their content. 
            Start your journey today with zero upfront costs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-50 px-8 py-3 text-lg font-semibold">
              Create Your First Course
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg">
              Schedule Demo Call
            </Button>
          </div>
          <div className="flex items-center justify-center gap-6 text-blue-100 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              No setup fees
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              100% secure
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              24/7 support
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Creators;
