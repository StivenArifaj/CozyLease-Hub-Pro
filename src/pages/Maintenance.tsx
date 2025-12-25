
import { useState } from "react";
import { usePropertyStore } from "@/store/usePropertyStore";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Clock, CheckCircle2, AlertCircle, Wrench, Calendar, MapPin, Home } from "lucide-react";
import { motion } from "framer-motion";
import { MaintenanceRequestModal } from "@/components/modals/MaintenanceRequestModal";
import { cn } from "@/lib/utils";

const Maintenance = () => {
    const { maintenanceRequests } = usePropertyStore();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'pending': return "bg-yellow-100 text-yellow-700 border-yellow-200";
            case 'in-progress': return "bg-blue-100 text-blue-700 border-blue-200";
            case 'completed': return "bg-emerald-100 text-emerald-700 border-emerald-200";
            default: return "bg-slate-100 text-slate-700 border-slate-200";
        }
    };

    const getPriorityStyles = (priority: string) => {
        switch (priority) {
            case 'emergency': return "bg-red-600 text-white";
            case 'high': return "bg-orange-500 text-white";
            case 'medium': return "bg-blue-500 text-white";
            case 'low': return "bg-slate-500 text-white";
            default: return "bg-slate-500 text-white";
        }
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
                    <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Maintenance Requests</h2>
                    <p className="text-slate-500">Track and manage property maintenance and repairs.</p>
                </div>
                <Button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 h-12 px-6 rounded-xl font-bold"
                >
                    <Plus className="h-5 w-5 mr-2" />
                    New Request
                </Button>
            </div>

            <div className="grid gap-6">
                {maintenanceRequests.map((request) => (
                    <motion.div key={request.id} variants={item}>
                        <Card className="overflow-hidden border-slate-200/60 hover:shadow-md transition-shadow rounded-2xl">
                            <CardContent className="p-0">
                                <div className="flex flex-col md:flex-row">
                                    {/* Status Sidebar */}
                                    <div className={cn(
                                        "w-full md:w-2 px-4 py-2 md:p-0",
                                        request.status === 'pending' ? "bg-yellow-400" :
                                            request.status === 'in-progress' ? "bg-blue-500" : "bg-emerald-500"
                                    )} />

                                    <div className="flex-1 p-6">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-3">
                                                    <h3 className="text-xl font-bold text-slate-900">{request.title}</h3>
                                                    <Badge className={cn("capitalize rounded-lg px-2.5 py-0.5 text-[10px] font-bold border", getStatusStyles(request.status))}>
                                                        {request.status}
                                                    </Badge>
                                                    <Badge className={cn("capitalize rounded-lg px-2.5 py-0.5 text-[10px] font-bold", getPriorityStyles(request.priority))}>
                                                        {request.priority}
                                                    </Badge>
                                                </div>
                                                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500 font-medium">
                                                    <span className="flex items-center gap-1.5">
                                                        <MapPin className="h-4 w-4 text-slate-400" />
                                                        {request.propertyName}
                                                    </span>
                                                    <span className="flex items-center gap-1.5">
                                                        <Home className="h-4 w-4 text-slate-400" />
                                                        Unit {request.unit}
                                                    </span>
                                                    <span className="flex items-center gap-1.5">
                                                        <Calendar className="h-4 w-4 text-slate-400" />
                                                        {new Date(request.createdAt).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button variant="outline" size="sm" className="rounded-lg border-slate-200 font-bold text-xs">View Details</Button>
                                                <Button variant="ghost" size="sm" className="rounded-lg text-slate-500 font-bold text-xs">Update Status</Button>
                                            </div>
                                        </div>
                                        <p className="text-slate-600 leading-relaxed bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                                            {request.description}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}

                {maintenanceRequests.length === 0 && (
                    <motion.div
                        variants={item}
                        className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200"
                    >
                        <div className="p-4 bg-slate-100 rounded-full mb-4">
                            <Wrench className="h-12 w-12 text-slate-400" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">No requests found</h3>
                        <p className="text-slate-500 mt-2 max-w-xs text-center">
                            Everything looks good! There are no active maintenance requests at the moment.
                        </p>
                        <Button
                            onClick={() => setIsModalOpen(true)}
                            variant="link"
                            className="mt-4 text-blue-600 font-bold"
                        >
                            Submit a request
                        </Button>
                    </motion.div>
                )}
            </div>

            <MaintenanceRequestModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </motion.div>
    );
};

export default Maintenance;
