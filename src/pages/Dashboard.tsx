
import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { usePropertyStore } from "@/store/usePropertyStore";
import { LandlordDashboard } from "@/components/dashboard/LandlordDashboard";
import { TenantDashboard } from "@/components/dashboard/TenantDashboard";
import { AddPropertyModal } from "@/components/modals/AddPropertyModal";
import { MaintenanceRequestModal } from "@/components/modals/MaintenanceRequestModal";
import { PaymentModal } from "@/components/modals/PaymentModal";

const Dashboard = () => {
    const { user } = useAuthStore();
    const { properties, maintenanceRequests, payments } = usePropertyStore();
    const [isAddPropertyModalOpen, setIsAddPropertyModalOpen] = useState(false);
    const [isMaintenanceModalOpen, setIsMaintenanceModalOpen] = useState(false);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

    if (!user) return null;

    if (user.role === 'landlord') {
        const stats = {
            totalProperties: properties.length,
            totalUnits: properties.reduce((acc, p) => acc + p.totalUnits, 0),
            occupiedUnits: properties.reduce((acc, p) => acc + p.occupiedUnits, 0),
            monthlyRevenue: properties.reduce((acc, p) => acc + p.monthlyRevenue, 0),
            pendingMaintenance: maintenanceRequests.filter(r => r.status === 'pending').length,
        };

        return (
            <>
                <LandlordDashboard
                    stats={stats}
                    onAddProperty={() => setIsAddPropertyModalOpen(true)}
                />
                <AddPropertyModal
                    isOpen={isAddPropertyModalOpen}
                    onClose={() => setIsAddPropertyModalOpen(false)}
                />
            </>
        );
    }

    const tenantInfo = {
        name: user.name,
        unit: '3C',
        rentAmount: 1200,
        leaseEnd: '2025-12-31',
        nextPaymentDue: payments[0]?.dueDate || '2025-01-01',
        maintenanceRequests: maintenanceRequests.length,
    };

    return (
        <>
            <TenantDashboard
                tenantInfo={tenantInfo}
                onMakePayment={() => setIsPaymentModalOpen(true)}
                onSubmitMaintenance={() => setIsMaintenanceModalOpen(true)}
            />
            <MaintenanceRequestModal
                isOpen={isMaintenanceModalOpen}
                onClose={() => setIsMaintenanceModalOpen(false)}
            />
            <PaymentModal
                isOpen={isPaymentModalOpen}
                onClose={() => setIsPaymentModalOpen(false)}
                amount={tenantInfo.rentAmount}
            />
        </>
    );
};

export default Dashboard;
