
import { useState } from "react";
import { usePropertyStore } from "@/store/usePropertyStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, History, Calendar, DollarSign, ArrowUpRight, ArrowDownLeft, CheckCircle2, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { PaymentModal } from "@/components/modals/PaymentModal";
import { cn } from "@/lib/utils";

const Payments = () => {
    const { payments } = usePropertyStore();
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [selectedAmount, setSelectedAmount] = useState(0);

    const pendingPayments = payments.filter(p => p.status !== 'paid');
    const completedPayments = payments.filter(p => p.status === 'paid');

    const totalPaid = completedPayments.reduce((acc, p) => acc + p.amount, 0);
    const totalPending = pendingPayments.reduce((acc, p) => acc + p.amount, 0);

    const handlePayNow = (amount: number) => {
        setSelectedAmount(amount);
        setIsPaymentModalOpen(true);
    };

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
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Payments</h2>
                    <p className="text-slate-500">Manage your transactions and rental payments.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="rounded-xl border-slate-200 font-bold h-12 px-6">
                        Download Statement
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 h-12 px-6 rounded-xl font-bold">
                        Add Payment Method
                    </Button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div variants={item}>
                    <Card className="border-none bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-xl rounded-3xl overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <DollarSign className="h-24 w-24" />
                        </div>
                        <CardContent className="p-8">
                            <p className="text-blue-100 text-sm font-bold uppercase tracking-widest mb-2">Total Paid</p>
                            <h3 className="text-4xl font-bold mb-4">${totalPaid.toLocaleString()}</h3>
                            <div className="flex items-center gap-2 text-blue-100 text-xs font-medium bg-white/10 w-fit px-3 py-1 rounded-full">
                                <ArrowUpRight className="h-3 w-3" />
                                <span>+12.5% from last month</span>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div variants={item}>
                    <Card className="border-slate-200/60 shadow-sm rounded-3xl overflow-hidden">
                        <CardContent className="p-8">
                            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-2">Total Pending</p>
                            <h3 className="text-4xl font-bold text-slate-900 mb-4">${totalPending.toLocaleString()}</h3>
                            <div className="flex items-center gap-2 text-orange-600 text-xs font-medium bg-orange-50 w-fit px-3 py-1 rounded-full">
                                <Clock className="h-3 w-3" />
                                <span>Due in 5 days</span>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div variants={item}>
                    <Card className="border-slate-200/60 shadow-sm rounded-3xl overflow-hidden">
                        <CardContent className="p-8">
                            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-2">Next Payment</p>
                            <h3 className="text-4xl font-bold text-slate-900 mb-4">Jan 01</h3>
                            <div className="flex items-center gap-2 text-blue-600 text-xs font-medium bg-blue-50 w-fit px-3 py-1 rounded-full">
                                <Calendar className="h-3 w-3" />
                                <span>Automatic pay enabled</span>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 border-slate-200/60 shadow-sm rounded-3xl overflow-hidden">
                    <CardHeader className="border-b border-slate-100 p-6">
                        <CardTitle className="text-xl font-bold flex items-center gap-3">
                            <div className="p-2 bg-blue-50 rounded-xl">
                                <CreditCard className="h-5 w-5 text-blue-600" />
                            </div>
                            Upcoming Payments
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="space-y-4">
                            {pendingPayments.map((payment) => (
                                <div key={payment.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-slate-50/50 rounded-2xl border border-slate-100 hover:border-blue-200 transition-colors gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100">
                                            <Calendar className="h-6 w-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-900 capitalize">{payment.type} Payment</div>
                                            <div className="text-sm text-slate-500 font-medium">Due Date: {new Date(payment.dueDate).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between sm:justify-end gap-6">
                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-slate-900">${payment.amount.toLocaleString()}</div>
                                            <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-wider text-orange-600 border-orange-200 bg-orange-50">Pending</Badge>
                                        </div>
                                        <Button
                                            onClick={() => handlePayNow(payment.amount)}
                                            className="bg-blue-600 hover:bg-blue-700 rounded-xl px-6 font-bold h-11"
                                        >
                                            Pay Now
                                        </Button>
                                    </div>
                                </div>
                            ))}
                            {pendingPayments.length === 0 && (
                                <div className="text-center py-12">
                                    <div className="p-4 bg-emerald-50 rounded-full w-fit mx-auto mb-4">
                                        <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                                    </div>
                                    <h4 className="text-lg font-bold text-slate-900">All caught up!</h4>
                                    <p className="text-slate-500">You have no pending payments at this time.</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-slate-200/60 shadow-sm rounded-3xl overflow-hidden">
                    <CardHeader className="border-b border-slate-100 p-6">
                        <CardTitle className="text-xl font-bold flex items-center gap-3">
                            <div className="p-2 bg-slate-50 rounded-xl">
                                <History className="h-5 w-5 text-slate-600" />
                            </div>
                            Payment History
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="space-y-6">
                            {completedPayments.map((payment) => (
                                <div key={payment.id} className="flex justify-between items-center group cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-emerald-50 rounded-lg group-hover:bg-emerald-100 transition-colors">
                                            <ArrowDownLeft className="h-4 w-4 text-emerald-600" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-900 capitalize text-sm">{payment.type}</div>
                                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{payment.paidDate}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-slate-900 text-sm">${payment.amount.toLocaleString()}</div>
                                        <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Completed</div>
                                    </div>
                                </div>
                            ))}
                            {completedPayments.length === 0 && (
                                <p className="text-center text-slate-400 py-8 text-sm font-medium">No transaction history found.</p>
                            )}
                            {completedPayments.length > 0 && (
                                <Button variant="ghost" className="w-full text-blue-600 font-bold text-xs hover:bg-blue-50 rounded-xl">
                                    View All Transactions
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <PaymentModal
                isOpen={isPaymentModalOpen}
                onClose={() => setIsPaymentModalOpen(false)}
                amount={selectedAmount}
            />
        </motion.div>
    );
};

export default Payments;
