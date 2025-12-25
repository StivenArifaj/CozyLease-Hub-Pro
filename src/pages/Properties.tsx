
import { useState } from "react";
import { usePropertyStore } from "@/store/usePropertyStore";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { Button } from "@/components/ui/button";
import { Plus, Building, Search, Filter } from "lucide-react";
import { motion } from "framer-motion";
import { AddPropertyModal } from "@/components/modals/AddPropertyModal";
import { Input } from "@/components/ui/input";

const Properties = () => {
    const { properties } = usePropertyStore();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredProperties = properties.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.address.toLowerCase().includes(searchQuery.toLowerCase())
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
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Properties</h2>
                    <p className="text-slate-500">Manage and monitor your real estate portfolio.</p>
                </div>
                <Button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 h-12 px-6 rounded-xl font-bold"
                >
                    <Plus className="h-5 w-5 mr-2" />
                    Add New Property
                </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1 group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                    <Input
                        placeholder="Search by name or address..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 h-12 bg-white border-slate-200 rounded-xl focus-visible:ring-blue-500/20"
                    />
                </div>
                <Button variant="outline" className="h-12 px-6 rounded-xl border-slate-200 text-slate-600 font-semibold">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                </Button>
            </div>

            {filteredProperties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProperties.map((property) => (
                        <motion.div key={property.id} variants={item}>
                            <PropertyCard
                                property={property}
                                onView={() => { }}
                                onEdit={() => { }}
                            />
                        </motion.div>
                    ))}
                </div>
            ) : (
                <motion.div
                    variants={item}
                    className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200"
                >
                    <div className="p-4 bg-slate-100 rounded-full mb-4">
                        <Building className="h-12 w-12 text-slate-400" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">No properties found</h3>
                    <p className="text-slate-500 mt-2 max-w-xs text-center">
                        {searchQuery ? "Try adjusting your search query to find what you're looking for." : "Start by adding your first property to your portfolio."}
                    </p>
                    {!searchQuery && (
                        <Button
                            onClick={() => setIsAddModalOpen(true)}
                            variant="link"
                            className="mt-4 text-blue-600 font-bold"
                        >
                            Add property now
                        </Button>
                    )}
                </motion.div>
            )}

            <AddPropertyModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
            />
        </motion.div>
    );
};

export default Properties;
