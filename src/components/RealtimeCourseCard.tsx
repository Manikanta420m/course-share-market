
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Users, TrendingUp, DollarSign } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface RealtimeCourseCardProps {
  course: any;
  onInvestment?: () => void;
}

const RealtimeCourseCard = ({ course, onInvestment }: RealtimeCourseCardProps) => {
  const [courseData, setCourseData] = useState(course);
  const [investing, setInvesting] = useState(false);
  const [shares, setShares] = useState(1);
  const { user, profile } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    setCourseData(course);
  }, [course]);

  useEffect(() => {
    // Set up realtime subscription for this specific course
    const channel = supabase
      .channel(`course-${course.id}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'courses',
          filter: `id=eq.${course.id}`
        },
        (payload) => {
          setCourseData(payload.new);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [course.id]);

  const handleInvest = async () => {
    if (!user || !profile) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to invest",
        variant: "destructive"
      });
      return;
    }

    if (shares > courseData.available_shares) {
      toast({
        title: "Insufficient Shares",
        description: "Not enough shares available",
        variant: "destructive"
      });
      return;
    }

    setInvesting(true);

    try {
      const totalCost = shares * courseData.share_price;

      // Create investment record
      const { data: investment, error: investmentError } = await supabase
        .from('investments')
        .insert([{
          investor_id: user.id,
          course_id: courseData.id,
          shares_owned: shares,
          purchase_price: totalCost,
          current_value: totalCost
        }])
        .select()
        .single();

      if (investmentError) throw investmentError;

      // Create transaction record
      const { error: transactionError } = await supabase
        .from('transactions')
        .insert([{
          user_id: user.id,
          course_id: courseData.id,
          investment_id: investment.id,
          type: 'investment',
          amount: totalCost,
          shares: shares,
          description: `Investment in ${courseData.title}`
        }]);

      if (transactionError) throw transactionError;

      // Update course available shares
      const { error: updateError } = await supabase
        .from('courses')
        .update({
          available_shares: courseData.available_shares - shares
        })
        .eq('id', courseData.id);

      if (updateError) throw updateError;

      toast({
        title: "Investment Successful!",
        description: `You've invested ₹${totalCost} in ${courseData.title}`
      });

      setShares(1);
      onInvestment?.();
    } catch (error: any) {
      toast({
        title: "Investment Failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setInvesting(false);
    }
  };

  const roi = courseData.total_revenue > 0 
    ? ((courseData.total_revenue * courseData.revenue_share_percentage / 100) / (courseData.share_price * (courseData.total_shares - courseData.available_shares)) * 100).toFixed(1)
    : '0';

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="aspect-video bg-gradient-to-r from-blue-100 to-green-100 rounded-lg mb-4 flex items-center justify-center">
          <BookOpen className="w-12 h-12 text-blue-600" />
        </div>
        <CardTitle className="text-lg">{courseData.title}</CardTitle>
        <div className="flex gap-2">
          <Badge variant="outline">{courseData.category}</Badge>
          <Badge 
            variant="outline"
            className={parseFloat(roi) > 0 ? 'text-green-600' : 'text-slate-600'}
          >
            {roi}% ROI
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* Course Stats */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-green-600" />
              <span>₹{courseData.price}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600" />
              <span>{courseData.student_count} students</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-600" />
              <span>₹{courseData.total_revenue || 0} revenue</span>
            </div>
            <div className="text-xs text-slate-600">
              {courseData.available_shares}/{courseData.total_shares} shares
            </div>
          </div>

          {/* Investment Section */}
          {profile?.role === 'investor' && courseData.available_shares > 0 && (
            <div className="pt-3 border-t">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-medium">Invest:</span>
                <input
                  type="number"
                  min="1"
                  max={courseData.available_shares}
                  value={shares}
                  onChange={(e) => setShares(parseInt(e.target.value) || 1)}
                  className="w-16 px-2 py-1 text-sm border rounded"
                />
                <span className="text-sm text-slate-600">shares</span>
              </div>
              <div className="flex justify-between items-center mb-3 text-sm">
                <span>Total Cost:</span>
                <span className="font-semibold">₹{shares * courseData.share_price}</span>
              </div>
              <Button 
                onClick={handleInvest}
                disabled={investing || courseData.available_shares === 0}
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                size="sm"
              >
                {investing ? 'Investing...' : 'Invest Now'}
              </Button>
            </div>
          )}

          {courseData.available_shares === 0 && (
            <Badge variant="secondary" className="w-full justify-center">
              Fully Funded
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RealtimeCourseCard;
