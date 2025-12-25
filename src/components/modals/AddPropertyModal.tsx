
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
import { Building, MapPin, Layout, Users, DollarSign, Image as ImageIcon } from "lucide-react";

interface AddPropertyModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AddPropertyModal = ({ isOpen, onClose }: AddPropertyModalProps) => {
    const addProperty = usePropertyStore((state) => state.addProperty);
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        type: "Apartment Complex",
        totalUnits: 0,
        occupiedUnits: 0,
        monthlyRevenue: 0,
        description: "",
        image: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.address) {
            toast.error("Please fill in all required fields");
            return;
        }

        addProperty({
            ...formData,
            totalUnits: Number(formData.totalUnits),
            occupiedUnits: Number(formData.occupiedUnits),
            monthlyRevenue: Number(formData.monthlyRevenue)
        });

        toast.success("Property added successfully!");
        onClose();
        setFormData({
            name: "",
            address: "",
            type: "Apartment Complex",
            totalUnits: 0,
            occupiedUnits: 0,
            monthlyRevenue: 0,
            description: "",
            image: ""
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden rounded-3xl border-none shadow-2xl">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                            <div className="p-2 bg-white/20 rounded-xl">
                                <Building className="h-6 w-6" />
                            </div>
                            Add New Property
                        </DialogTitle>
                        <DialogDescription className="text-blue-100 text-base mt-2">
                            Enter the details of your new property to start managing it.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6 bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                <Building className="h-3 w-3" />
                                Property Name *
                            </Label>
                            <Input
                                id="name"
                                placeholder="e.g. Sunset Heights"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="rounded-xl border-slate-200 focus:ring-blue-500/20 h-11"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="type" className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                <Layout className="h-3 w-3" />
                                Property Type
                            </Label>
                            <Select
                                value={formData.type}
                                onValueChange={(value) => setFormData({ ...formData, type: value })}
                            >
                                <SelectTrigger className="rounded-xl border-slate-200 h-11">
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border-slate-200">
                                    <SelectItem value="Apartment Complex">Apartment Complex</SelectItem>
                                    <SelectItem value="Single Family">Single Family</SelectItem>
                                    <SelectItem value="Duplex">Duplex</SelectItem>
                                    <SelectItem value="Condominium">Condominium</SelectItem>
                                    <SelectItem value="Commercial">Commercial</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="address" className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                <MapPin className="h-3 w-3" />
                                Address *
                            </Label>
                            <Input
                                id="address"
                                placeholder="Full street address, city, state"
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                className="rounded-xl border-slate-200 focus:ring-blue-500/20 h-11"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="totalUnits" className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                <Users className="h-3 w-3" />
                                Total Units
                            </Label>
                            <Input
                                id="totalUnits"
                                type="number"
                                value={formData.totalUnits}
                                onChange={(e) => setFormData({ ...formData, totalUnits: Number(e.target.value) })}
                                className="rounded-xl border-slate-200 focus:ring-blue-500/20 h-11"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="monthlyRevenue" className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                <DollarSign className="h-3 w-3" />
                                Est. Monthly Revenue
                            </Label>
                            <Input
                                id="monthlyRevenue"
                                type="number"
                                placeholder="0.00"
                                value={formData.monthlyRevenue}
                                onChange={(e) => setFormData({ ...formData, monthlyRevenue: Number(e.target.value) })}
                                className="rounded-xl border-slate-200 focus:ring-blue-500/20 h-11"
                            />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="image" className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                <ImageIcon className="h-3 w-3" />
                                Image URL (Optional)
                            </Label>
                            <Input
                                id="image"
                                placeholder="https://images.unsplash.com/..."
                                value={formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                className="rounded-xl border-slate-200 focus:ring-blue-500/20 h-11"
                            />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="description" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                                Description
                            </Label>
                            <Textarea
                                id="description"
                                placeholder="Briefly describe the property..."
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="rounded-xl border-slate-200 focus:ring-blue-500/20 min-h-[100px]"
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
                            className="rounded-xl h-12 px-8 font-bold bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200"
                        >
                            Create Property
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
