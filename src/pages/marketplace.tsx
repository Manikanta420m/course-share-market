
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, BookOpen, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import RealtimeCourseCard from "@/components/RealtimeCourseCard";

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("roi");
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, profile, signOut } = useAuth();

  const categories = ["All", "Technology", "Programming", "Marketing", "Design", "Business"];

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    // Set up realtime subscription for courses
    const channel = supabase
      .channel('marketplace-courses')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'courses'
        },
        () => {
          fetchCourses();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('courses')
      .select(`
        *,
        profiles (full_name)
      `)
      .eq('status', 'active')
      .order('created_at', { ascending: false });
    
    setCourses(data || []);
    setLoading(false);
  };

  const filteredCourses = courses
    .filter(course => 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.profiles?.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(course => 
      selectedCategory === "all" || course.category?.toLowerCase() === selectedCategory.toLowerCase()
    )
    .sort((a, b) => {
      if (sortBy === "roi") {
        const roiA = a.total_revenue > 0 ? ((a.total_revenue * a.revenue_share_percentage / 100) / (a.share_price * (a.total_shares - a.available_shares)) * 100) : 0;
        const roiB = b.total_revenue > 0 ? ((b.total_revenue * b.revenue_share_percentage / 100) / (b.share_price * (b.total_shares - b.available_shares)) * 100) : 0;
        return roiB - roiA;
      }
      if (sortBy === "price") return a.share_price - b.share_price;
      if (sortBy === "students") return b.student_count - a.student_count;
      return 0;
    });

  const handleSignOut = async () => {
    await signOut();
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
              <Link to="/marketplace" className="text-blue-600 font-semibold border-b-2 border-blue-600 pb-1">
                Marketplace
              </Link>
              <Link to="/creators" className="text-slate-600 hover:text-slate-900 transition-colors">
                For Creators
              </Link>
              <Link to="/portfolio" className="text-slate-600 hover:text-slate-900 transition-colors">
                Portfolio
              </Link>
              {user ? (
                <div className="flex items-center gap-4">
                  <Link to="/dashboard">
                    <Button variant="outline" className="border-slate-300">
                      Dashboard
                    </Button>
                  </Link>
                  <Button 
                    onClick={handleSignOut}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </Button>
                </div>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Course Marketplace
          </h1>
          <p className="text-xl text-slate-600">
            Discover high-potential courses to invest in and build your portfolio
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search courses or creators..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.slice(1).map(category => (
                    <SelectItem key={category} value={category.toLowerCase()}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="roi">Highest ROI</SelectItem>
                  <SelectItem value="price">Share Price</SelectItem>
                  <SelectItem value="students">Most Students</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <p className="text-slate-600">
              Showing {filteredCourses.length} courses
            </p>
            {selectedCategory !== "all" && (
              <Badge variant="outline" className="capitalize">
                {selectedCategory}
              </Badge>
            )}
          </div>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            More Filters
          </Button>
        </div>

        {/* Course Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading courses...</p>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-slate-400 mb-4">
              <BookOpen className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              No courses found
            </h3>
            <p className="text-slate-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <RealtimeCourseCard 
                key={course.id} 
                course={course} 
                onInvestment={fetchCourses}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;
