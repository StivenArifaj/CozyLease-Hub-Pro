
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, FileText, Wrench, Calendar, ArrowRight, CheckCircle2, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface TenantInfo {
  name: string;
  unit: string;
  rentAmount: number;
  leaseEnd: string;
  nextPaymentDue: string;
  maintenanceRequests: number;
}

interface TenantDashboardProps {
  tenantInfo: TenantInfo;
  onMakePayment: () => void;
  onSubmitMaintenance: () => void;
}

export const TenantDashboard = ({ tenantInfo, onMakePayment, onSubmitMaintenance }: TenantDashboardProps) => {
  const daysUntilPayment = Math.ceil(
    (new Date(tenantInfo.nextPaymentDue).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

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
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome back, {tenantInfo.name.split(' ')[0]}!</h2>
          <p className="text-slate-500">You're all set for December. Your next payment is in {daysUntilPayment} days.</p>
        </div>
        <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-100 px-3 py-1 text-sm font-semibold">
          Unit {tenantInfo.unit} • Active Lease
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Monthly Rent", value: `$${tenantInfo.rentAmount.toLocaleString()}`, sub: "Due on the 1st", icon: DollarSign, color: "blue" },
          { title: "Next Payment", value: `${daysUntilPayment} Days`, sub: tenantInfo.nextPaymentDue, icon: Calendar, color: "green" },
          { title: "Lease Ends", value: new Date(tenantInfo.leaseEnd).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }), sub: "11 months left", icon: FileText, color: "indigo" },
          { title: "Maintenance", value: tenantInfo.maintenanceRequests, sub: "Open requests", icon: Wrench, color: "orange" },
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
          <Card className="border-none shadow-sm h-full overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Quick Actions</CardTitle>
              <CardDescription>Manage your residency and payments</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <Button
                onClick={onMakePayment}
                className="h-auto py-6 flex flex-col items-center gap-3 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-100"
              >
                <div className="p-3 bg-white/20 rounded-full">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <div className="text-center">
                  <div className="font-bold">Pay Rent</div>
                  <div className="text-xs text-blue-100">Fast & secure online payment</div>
                </div>
              </Button>

              <Button
                onClick={onSubmitMaintenance}
                variant="outline"
                className="h-auto py-6 flex flex-col items-center gap-3 border-slate-200 hover:bg-slate-50 transition-all"
              >
                <div className="p-3 bg-slate-100 rounded-full">
                  <Wrench className="h-6 w-6 text-slate-600" />
                </div>
                <div className="text-center">
                  <div className="font-bold text-slate-900">Request Service</div>
                  <div className="text-xs text-slate-500">Submit a maintenance ticket</div>
                </div>
              </Button>

              <Button
                variant="ghost"
                className="col-span-1 sm:col-span-2 flex items-center justify-between p-4 h-auto border border-dashed border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 group"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-blue-100 transition-colors">
                    <FileText className="h-5 w-5 text-slate-600 group-hover:text-blue-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-slate-900">View Lease Agreement</div>
                    <div className="text-xs text-slate-500">Download or read your current contract</div>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="border-none shadow-sm h-full">
            <CardHeader>
              <CardTitle className="text-lg">Payment History</CardTitle>
              <CardDescription>Your recent rental transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                {[
                  { month: "December 2024", date: "Dec 01, 2024", status: "paid" },
                  { month: "November 2024", date: "Nov 02, 2024", status: "paid" },
                  { month: "October 2024", date: "Oct 01, 2024", status: "paid" },
                ].map((payment, i) => (
                  <div key={i} className="flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-50 rounded-lg">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{payment.month}</p>
                        <p className="text-[10px] text-slate-400 uppercase tracking-wider">{payment.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-900">${tenantInfo.rentAmount.toLocaleString()}</p>
                      <Badge variant="outline" className="text-[10px] h-5 bg-green-50 text-green-700 border-green-100">PAID</Badge>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-6 text-slate-500 hover:text-blue-600 hover:bg-blue-50 text-xs font-bold">
                VIEW FULL STATEMENT
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};
