
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, DollarSign, Users, TrendingUp, BookOpen } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import StatsCard from '@/components/StatsCard';
import CreateCourseModal from '@/components/CreateCourseModal';

const CreatorDashboard = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalStudents: 0,
    activeCourses: 0,
    avgRating: 4.8
  });
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchCourses();
      fetchStats();
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;

    // Set up realtime subscription for courses
    const channel = supabase
      .channel('creator-courses')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'courses',
          filter: `creator_id=eq.${user.id}`
        },
        () => {
          fetchCourses();
          fetchStats();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const fetchCourses = async () => {
    const { data } = await supabase
      .from('courses')
      .select('*')
      .eq('creator_id', user?.id)
      .order('created_at', { ascending: false });
    
    setCourses(data || []);
  };

  const fetchStats = async () => {
    const { data: courses } = await supabase
      .from('courses')
      .select('total_revenue, student_count, status')
      .eq('creator_id', user?.id);

    if (courses) {
      const totalRevenue = courses.reduce((sum, course) => sum + (course.total_revenue || 0), 0);
      const totalStudents = courses.reduce((sum, course) => sum + (course.student_count || 0), 0);
      const activeCourses = courses.filter(course => course.status === 'active').length;

      setStats({
        totalRevenue,
        totalStudents,
        activeCourses,
        avgRating: 4.8
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Creator Dashboard</h1>
          <p className="text-slate-600 mt-2">Manage your courses and track your earnings</p>
        </div>
        <Button 
          onClick={() => setShowCreateModal(true)}
          className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Course
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          icon={<DollarSign className="w-6 h-6" />}
          value={`₹${stats.totalRevenue.toLocaleString()}`}
          label="Total Revenue"
          trend="+12%"
        />
        <StatsCard
          icon={<Users className="w-6 h-6" />}
          value={stats.totalStudents.toString()}
          label="Total Students"
          trend="+8%"
        />
        <StatsCard
          icon={<BookOpen className="w-6 h-6" />}
          value={stats.activeCourses.toString()}
          label="Active Courses"
          trend="+2"
        />
        <StatsCard
          icon={<TrendingUp className="w-6 h-6" />}
          value={stats.avgRating.toString()}
          label="Avg Rating"
          trend="+0.2"
        />
      </div>

      {/* Courses Grid */}
      <div>
        <h2 className="text-xl font-semibold text-slate-900 mb-6">Your Courses</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="aspect-video bg-gradient-to-r from-blue-100 to-green-100 rounded-lg mb-4 flex items-center justify-center">
                  <BookOpen className="w-12 h-12 text-blue-600" />
                </div>
                <CardTitle className="text-lg">{course.title}</CardTitle>
                <Badge 
                  variant={course.status === 'active' ? 'default' : 'secondary'}
                  className="w-fit"
                >
                  {course.status}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex justify-between">
                    <span>Price:</span>
                    <span className="font-semibold">₹{course.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Students:</span>
                    <span className="font-semibold">{course.student_count}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Revenue:</span>
                    <span className="font-semibold">₹{course.total_revenue || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Available Shares:</span>
                    <span className="font-semibold">{course.available_shares}/{course.total_shares}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <CreateCourseModal 
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={() => {
          setShowCreateModal(false);
          fetchCourses();
        }}
      />
    </div>
  );
};

export default CreatorDashboard;
