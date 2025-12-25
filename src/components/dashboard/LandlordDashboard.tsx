
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, Users, DollarSign, AlertTriangle, Plus, TrendingUp, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface DashboardStats {
  totalProperties: number;
  totalUnits: number;
  occupiedUnits: number;
  monthlyRevenue: number;
  pendingMaintenance: number;
}

interface LandlordDashboardProps {
  stats: DashboardStats;
  onAddProperty: () => void;
}

const data = [
  { name: 'Jan', revenue: 24000 },
  { name: 'Feb', revenue: 25500 },
  { name: 'Mar', revenue: 26000 },
  { name: 'Apr', revenue: 27800 },
  { name: 'May', revenue: 28200 },
  { name: 'Jun', revenue: 28500 },
];

export const LandlordDashboard = ({ stats, onAddProperty }: LandlordDashboardProps) => {
  const occupancyRate = ((stats.occupiedUnits / stats.totalUnits) * 100).toFixed(1);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard Overview</h2>
          <p className="text-slate-500">Welcome back, here's what's happening with your properties.</p>
        </div>
        <Button onClick={onAddProperty} className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200">
          <Plus className="h-4 w-4 mr-2" />
          Add Property
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Properties", value: stats.totalProperties, sub: `${stats.totalUnits} Units`, icon: Building, color: "blue" },
          { title: "Occupancy Rate", value: `${occupancyRate}%`, sub: `${stats.occupiedUnits} Occupied`, icon: Users, color: "green" },
          { title: "Monthly Revenue", value: `$${stats.monthlyRevenue.toLocaleString()}`, sub: "+12.5% vs last month", icon: DollarSign, color: "indigo" },
          { title: "Pending Issues", value: stats.pendingMaintenance, sub: "Requires attention", icon: AlertTriangle, color: "orange" },
        ].map((stat, i) => (
          <motion.div key={i} variants={item}>
            <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg bg-${stat.color}-50`}>
                  <stat.icon className={`h-4 w-4 text-${stat.color}-600`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                <div className="flex items-center mt-1">
                  <span className={`text-xs font-medium text-${stat.color}-600`}>{stat.sub}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={item} className="lg:col-span-2">
          <Card className="border-none shadow-sm h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Revenue Growth</CardTitle>
                  <CardDescription>Monthly rental income overview</CardDescription>
                </div>
                <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-md text-xs font-bold">
                  <TrendingUp className="h-3 w-3" />
                  +8.2%
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1} />
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#94a3b8', fontSize: 12 }}
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#94a3b8', fontSize: 12 }}
                      tickFormatter={(value) => `$${value / 1000}k`}
                    />
                    <Tooltip
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#2563eb"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorRevenue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="border-none shadow-sm h-full">
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
              <CardDescription>Latest updates from your properties</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  { title: "Rent payment received", sub: "Unit 2A - Sunset Apartments", time: "2h ago", color: "green" },
                  { title: "New tenant application", sub: "Pine View Condos", time: "4h ago", color: "blue" },
                  { title: "Maintenance request", sub: "Leaky faucet - Unit 1B", time: "6h ago", color: "orange" },
                  { title: "Lease signed", sub: "Unit 4C - Oak Street Duplex", time: "1d ago", color: "purple" },
                ].map((activity, i) => (
                  <div key={i} className="flex gap-4">
                    <div className={`mt-1 w-2 h-2 rounded-full bg-${activity.color}-500 shrink-0 shadow-[0_0_8px_rgba(0,0,0,0.1)]`} />
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-semibold text-slate-900 leading-none">{activity.title}</p>
                      <p className="text-xs text-slate-500">{activity.sub}</p>
                    </div>
                    <span className="text-[10px] font-medium text-slate-400 uppercase">{activity.time}</span>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-6 text-blue-600 hover:text-blue-700 hover:bg-blue-50 text-xs font-bold">
                VIEW ALL ACTIVITY
                <ArrowUpRight className="ml-1 h-3 w-3" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};
