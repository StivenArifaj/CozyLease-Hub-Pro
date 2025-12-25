
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building, MapPin, Users, DollarSign, Edit, Eye, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Property } from "@/types";

interface PropertyCardProps {
  property: Property;
  onView: () => void;
  onEdit: () => void;
}

export const PropertyCard = ({ property, onView, onEdit }: PropertyCardProps) => {
  const occupancyRate = ((property.occupiedUnits / property.totalUnits) * 100).toFixed(0);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-300 bg-white group">
        <div className="h-48 bg-slate-100 relative overflow-hidden">
          {property.image ? (
            <img
              src={property.image}
              alt={property.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
              <Building className="h-12 w-12 text-blue-200 group-hover:scale-110 transition-transform duration-500" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <Badge
            className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-slate-900 border-none shadow-sm"
            variant="secondary"
          >
            {property.type}
          </Badge>
          <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <div className="text-white">
              <p className="text-[10px] font-bold uppercase tracking-wider opacity-80">Monthly Revenue</p>
              <p className="text-lg font-bold">${property.monthlyRevenue.toLocaleString()}</p>
            </div>
            <Button size="icon" variant="secondary" className="rounded-full bg-white/90 backdrop-blur-md hover:bg-white" onClick={onView}>
              <ArrowUpRight className="h-4 w-4 text-blue-600" />
            </Button>
          </div>
        </div>

        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{property.name}</CardTitle>
              <div className="flex items-center text-sm text-slate-500 mt-1">
                <MapPin className="h-3.5 w-3.5 mr-1 text-slate-400" />
                {property.address}
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-blue-100 rounded-lg">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight leading-none">Occupancy</p>
                <p className="text-sm font-bold text-slate-900">{property.occupiedUnits}/{property.totalUnits} Units</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-blue-600">{occupancyRate}%</p>
              <div className="w-16 bg-slate-200 rounded-full h-1.5 mt-1">
                <div
                  className="bg-blue-600 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${occupancyRate}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onView} className="flex-1 border-slate-200 hover:bg-slate-50 hover:text-blue-600 transition-all">
              <Eye className="h-4 w-4 mr-2" />
              Details
            </Button>
            <Button variant="outline" size="sm" onClick={onEdit} className="flex-1 border-slate-200 hover:bg-slate-50 transition-all">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
