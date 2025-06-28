
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUp, Users, DollarSign } from "lucide-react";

interface Course {
  id: number;
  title: string;
  creator: string;
  price: number;
  totalShares: number;
  availableShares: number;
  sharePrice: number;
  revenueShared: number;
  totalRevenue: number;
  students: number;
  image: string;
  category: string;
  roi: number;
}

interface CourseCardProps {
  course: Course;
}

const CourseCard = ({ course }: CourseCardProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const sharesPercentage = ((course.totalShares - course.availableShares) / course.totalShares) * 100;

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-slate-200 overflow-hidden">
      <div className="relative">
        <img 
          src={course.image} 
          alt={course.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <Badge className="bg-white/90 text-slate-700 hover:bg-white">
            {course.category}
          </Badge>
        </div>
        <div className="absolute top-4 right-4">
          <Badge 
            className={`${
              course.roi > 200 
                ? 'bg-green-500 hover:bg-green-600' 
                : course.roi > 100 
                  ? 'bg-yellow-500 hover:bg-yellow-600'
                  : 'bg-blue-500 hover:bg-blue-600'
            } text-white flex items-center gap-1`}
          >
            <ArrowUp className="w-3 h-3" />
            {course.roi}% ROI
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
            {course.title}
          </h3>
        </div>
        <p className="text-slate-600">by {course.creator}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2 text-slate-600">
            <DollarSign className="w-4 h-4" />
            <span>Course: {formatCurrency(course.price)}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <Users className="w-4 h-4" />
            <span>{course.students} students</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Shares Available</span>
            <span className="font-semibold text-slate-900">
              {course.availableShares.toLocaleString()} / {course.totalShares.toLocaleString()}
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${sharesPercentage}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-lg">
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wide">Share Price</p>
            <p className="font-bold text-lg text-slate-900">{formatCurrency(course.sharePrice)}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wide">Revenue Share</p>
            <p className="font-bold text-lg text-green-600">{course.revenueShared}%</p>
          </div>
        </div>

        <div className="space-y-2">
          <Button className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
            Buy Shares
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 text-sm">
              View Details
            </Button>
            <Button variant="outline" className="flex-1 text-sm">
              Buy Course
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
