
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, DollarSign, Users, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import CourseCard from "@/components/CourseCard";
import StatsCard from "@/components/StatsCard";

const Index = () => {
  const featuredCourses = [
    {
      id: 1,
      title: "Mastering AI in 30 Days",
      creator: "Alex Johnson",
      price: 1000,
      totalShares: 1000,
      availableShares: 340,
      sharePrice: 10,
      revenueShared: 40,
      totalRevenue: 150000,
      students: 150,
      image: "/placeholder.svg",
      category: "Technology",
      roi: 285,
    },
    {
      id: 2,
      title: "Python for Beginners",
      creator: "Sarah Chen",
      price: 800,
      totalShares: 800,
      availableShares: 156,
      sharePrice: 15,
      revenueShared: 35,
      totalRevenue: 89600,
      students: 112,
      image: "/placeholder.svg",
      category: "Programming",
      roi: 156,
    },
    {
      id: 3,
      title: "Digital Marketing Mastery",
      creator: "Mike Rodriguez",
      price: 1200,
      totalShares: 1200,
      availableShares: 890,
      sharePrice: 8,
      revenueShared: 45,
      totalRevenue: 36000,
      students: 30,
      image: "/placeholder.svg",
      category: "Marketing",
      roi: 45,
    },
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
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-gradient-to-r from-blue-100 to-green-100 text-blue-800 border-blue-200">
            🚀 Revolutionary EdTech Platform
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Invest in Courses,
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Earn Like a Shareholder
            </span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            The world's first platform where you can buy shares in educational courses, 
            earn revenue as they grow, and support creators while building your portfolio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 px-8 py-3 text-lg">
              Start Investing
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-3 text-lg border-slate-300">
              Sell Your Course
            </Button>
          </div>

          {/* Platform Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <StatsCard
              icon={<DollarSign className="w-6 h-6" />}
              value="₹2.4M+"
              label="Creator Earnings"
              trend="+24%"
            />
            <StatsCard
              icon={<Users className="w-6 h-6" />}
              value="12,500+"
              label="Active Investors"
              trend="+18%"
            />
            <StatsCard
              icon={<BookOpen className="w-6 h-6" />}
              value="850+"
              label="Live Courses"
              trend="+32%"
            />
            <StatsCard
              icon={<ArrowUp className="w-6 h-6" />}
              value="156%"
              label="Avg. ROI"
              trend="+8%"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Three simple steps to start earning from educational content
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-slate-200 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Browse & Analyze</h3>
                <p className="text-slate-600 leading-relaxed">
                  Discover courses with high potential. Check creator track record, 
                  course metrics, and revenue projections before investing.
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-green-600">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Buy Shares</h3>
                <p className="text-slate-600 leading-relaxed">
                  Purchase shares in courses you believe in. Each share represents 
                  a portion of the course's future revenue stream.
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-purple-600">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Earn Revenue</h3>
                <p className="text-slate-600 leading-relaxed">
                  Earn passive income as the course sells. Plus, trade your shares 
                  with other investors as demand grows.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Top Investment Opportunities
              </h2>
              <p className="text-xl text-slate-600">
                High-performing courses with great ROI potential
              </p>
            </div>
            <Link to="/marketplace">
              <Button variant="outline" className="border-slate-300">
                View All Courses
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Investment Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join thousands of investors who are already earning from educational content. 
            No experience required – we'll guide you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-50 px-8 py-3 text-lg font-semibold">
              Start Investing Today
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold text-white">EduInvest</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Democratizing education investment and empowering creators worldwide.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Platform</h4>
              <ul className="space-y-2">
                <li><Link to="/marketplace" className="hover:text-white transition-colors">Marketplace</Link></li>
                <li><Link to="/creators" className="hover:text-white transition-colors">For Creators</Link></li>
                <li><Link to="/portfolio" className="hover:text-white transition-colors">Portfolio</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Risk Disclosure</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 EduInvest. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
