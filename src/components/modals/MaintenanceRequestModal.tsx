
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { usePropertyStore } from "@/store/usePropertyStore";
import { toast } from "sonner";
import { Wrench, AlertCircle, Building, Home } from "lucide-react";

interface MaintenanceRequestModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const MaintenanceRequestModal = ({ isOpen, onClose }: MaintenanceRequestModalProps) => {
    const { properties, addMaintenanceRequest } = usePropertyStore();
    const [formData, setFormData] = useState({
        propertyId: properties[0]?.id || "",
        unit: "",
        title: "",
        description: "",
        priority: "medium" as "low" | "medium" | "high" | "emergency"
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title || !formData.description || !formData.propertyId) {
            toast.error("Please fill in all required fields");
            return;
        }

        const selectedProperty = properties.find(p => p.id === formData.propertyId);

        addMaintenanceRequest({
            propertyId: formData.propertyId,
            propertyName: selectedProperty?.name || "Unknown Property",
            unit: formData.unit,
            title: formData.title,
            description: formData.description,
            priority: formData.priority
        });

        toast.success("Maintenance request submitted!");
        onClose();
        setFormData({
            propertyId: properties[0]?.id || "",
            unit: "",
            title: "",
            description: "",
            priority: "medium"
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden rounded-3xl border-none shadow-2xl">
                <div className="bg-gradient-to-br from-orange-500 to-red-600 p-8 text-white">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                            <div className="p-2 bg-white/20 rounded-xl">
                                <Wrench className="h-6 w-6" />
                            </div>
                            Submit Request
                        </DialogTitle>
                        <DialogDescription className="text-orange-100 text-base mt-2">
                            Describe the issue and we'll get it fixed as soon as possible.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6 bg-white">
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="property" className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                    <Building className="h-3 w-3" />
                                    Property *
                                </Label>
                                <Select
                                    value={formData.propertyId}
                                    onValueChange={(value) => setFormData({ ...formData, propertyId: value })}
                                >
                                    <SelectTrigger className="rounded-xl border-slate-200 h-11">
                                        <SelectValue placeholder="Select property" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl border-slate-200">
                                        {properties.map(p => (
                                            <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="unit" className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                    <Home className="h-3 w-3" />
                                    Unit #
                                </Label>
                                <Input
                                    id="unit"
                                    placeholder="e.g. 3C"
                                    value={formData.unit}
                                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                                    className="rounded-xl border-slate-200 focus:ring-orange-500/20 h-11"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                <AlertCircle className="h-3 w-3" />
                                Issue Title *
                            </Label>
                            <Input
                                id="title"
                                placeholder="e.g. Leaking kitchen faucet"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="rounded-xl border-slate-200 focus:ring-orange-500/20 h-11"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="priority" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                                Priority Level
                            </Label>
                            <Select
                                value={formData.priority}
                                onValueChange={(value: "low" | "medium" | "high" | "emergency") => setFormData({ ...formData, priority: value })}
                            >
                                <SelectTrigger className="rounded-xl border-slate-200 h-11">
                                    <SelectValue placeholder="Select priority" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border-slate-200">
                                    <SelectItem value="low">Low - Not urgent</SelectItem>
                                    <SelectItem value="medium">Medium - Standard</SelectItem>
                                    <SelectItem value="high">High - Urgent</SelectItem>
                                    <SelectItem value="emergency">Emergency - Immediate attention</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                                Detailed Description *
                            </Label>
                            <Textarea
                                id="description"
                                placeholder="Please provide as much detail as possible..."
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="rounded-xl border-slate-200 focus:ring-orange-500/20 min-h-[120px]"
                                required
                            />
                        </div>
                    </div>

                    <DialogFooter className="pt-4">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={onClose}
                            className="rounded-xl h-12 px-6 font-semibold text-slate-500"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="rounded-xl h-12 px-8 font-bold bg-orange-600 hover:bg-orange-700 shadow-lg shadow-orange-200"
                        >
                            Submit Request
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
