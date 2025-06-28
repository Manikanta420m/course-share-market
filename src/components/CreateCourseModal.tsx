
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface CreateCourseModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CreateCourseModal = ({ open, onClose, onSuccess }: CreateCourseModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    totalShares: '',
    sharePrice: '',
    revenueSharePercentage: ''
  });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('courses')
        .insert([{
          creator_id: user?.id,
          title: formData.title,
          description: formData.description,
          price: parseFloat(formData.price),
          category: formData.category,
          total_shares: parseInt(formData.totalShares),
          available_shares: parseInt(formData.totalShares),
          share_price: parseFloat(formData.sharePrice),
          revenue_share_percentage: parseInt(formData.revenueSharePercentage),
          status: 'active'
        }]);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Course created successfully"
      });

      setFormData({
        title: '',
        description: '',
        price: '',
        category: '',
        totalShares: '',
        sharePrice: '',
        revenueSharePercentage: ''
      });

      onSuccess();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Course</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Course Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          
          <Textarea
            placeholder="Course Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
          
          <Input
            type="number"
            placeholder="Course Price (₹)"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
          />
          
          <Select onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Technology">Technology</SelectItem>
              <SelectItem value="Programming">Programming</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
              <SelectItem value="Design">Design</SelectItem>
              <SelectItem value="Business">Business</SelectItem>
            </SelectContent>
          </Select>
          
          <Input
            type="number"
            placeholder="Total Shares"
            value={formData.totalShares}
            onChange={(e) => setFormData({ ...formData, totalShares: e.target.value })}
            required
          />
          
          <Input
            type="number"
            placeholder="Share Price (₹)"
            value={formData.sharePrice}
            onChange={(e) => setFormData({ ...formData, sharePrice: e.target.value })}
            required
          />
          
          <Input
            type="number"
            placeholder="Revenue Share % (0-100)"
            min="0"
            max="100"
            value={formData.revenueSharePercentage}
            onChange={(e) => setFormData({ ...formData, revenueSharePercentage: e.target.value })}
            required
          />
          
          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
            >
              {loading ? 'Creating...' : 'Create Course'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCourseModal;
