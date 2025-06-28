import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, DollarSign, Users, TrendingUp, ArrowRight, Star, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const { user } = useAuth();

  const benefits = [
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "High Returns",
      description: "Earn up to 285% ROI on successful course investments with transparent revenue sharing.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community Driven",
      description: "Connect with creators and investors in a thriving educational ecosystem.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Platform",
      description: "Your investments are protected with enterprise-grade security and transparency.",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Real-time Updates",
      description: "Track your investments with live updates on course performance and earnings.",
    },
  ];

  const features = [
    {
      title: "Course Marketplace",
      description: "Browse and invest in high-potential educational courses",
      link: "/marketplace"
    },
    {
      title: "Creator Tools",
      description: "Launch and monetize your courses with investor backing",
      link: "/creators"
    },
    {
      title: "Portfolio Dashboard",
      description: "Track your investments and earnings in real-time",
      link: user ? "/dashboard" : "/auth"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Course Creator",
      content: "EduInvest helped me raise ₹2.5L upfront to create my Python course. Now I'm earning 65% of revenue while investors help promote it!",
      rating: 5
    },
    {
      name: "Raj Patel",
      role: "Investor",
      content: "I've earned 180% ROI on my course investments. The platform makes it easy to discover profitable educational content.",
      rating: 5
    },
    {
      name: "Alex Johnson",
      role: "Tech Entrepreneur",
      content: "As both creator and investor, EduInvest gives me the best of both worlds. Great returns and fair revenue sharing.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                EduInvest
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/marketplace" className="text-slate-600 hover:text-slate-900 transition-colors">
                Marketplace
              </Link>
              <Link to="/creators" className="text-slate-600 hover:text-slate-900 transition-colors">
                For Creators
              </Link>
              <Link to="/portfolio" className="text-slate-600 hover:text-slate-900 transition-colors">
                Portfolio
              </Link>
              {user ? (
                <Link to="/dashboard">
                  <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/auth">
                    <Button variant="outline" className="border-slate-300">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/auth">
                    <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <Badge className="mb-6 bg-gradient-to-r from-blue-100 to-green-100 text-blue-800 border-blue-200">
              🚀 Now Live with Realtime Updates
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Invest in Education.
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Earn from Knowledge.
              </span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              The revolutionary platform where investors fund course creators and share in their success. 
              Create courses, invest in talent, and build wealth through education.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to={user ? "/dashboard" : "/auth"}>
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 px-8 py-4 text-lg">
                  {user ? "Go to Dashboard" : "Start Investing"}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/marketplace">
                <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-slate-300">
                  Browse Courses
                </Button>
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900">285%</div>
                <div className="text-sm text-slate-600">Average ROI</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900">₹15L+</div>
                <div className="text-sm text-slate-600">Total Invested</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900">1,200+</div>
                <div className="text-sm text-slate-600">Active Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900">50+</div>
                <div className="text-sm text-slate-600">Live Courses</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Powerful tools for creators and investors to build wealth through education
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-slate-200 hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-4 text-slate-900">{feature.title}</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">{feature.description}</p>
                  <Link to={feature.link}>
                    <Button variant="outline" className="border-slate-300">
                      Explore <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Choose EduInvest?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Join thousands of creators and investors building wealth through education
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

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-slate-600">
              Real results from our creators and investors
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-slate-200">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-slate-600 mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-slate-900">{testimonial.name}</div>
                    <div className="text-sm text-slate-500">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join the future of education finance. Whether you're a creator or investor, 
            your success story starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={user ? "/dashboard" : "/auth"}>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-50 px-8 py-3 text-lg font-semibold">
                {user ? "Go to Dashboard" : "Get Started Free"}
              </Button>
            </Link>
            <Link to="/marketplace">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg">
                Explore Marketplace
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
