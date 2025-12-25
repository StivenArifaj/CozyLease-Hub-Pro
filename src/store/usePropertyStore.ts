
import { create } from 'zustand';
import { Property, MaintenanceRequest, Payment } from '../types';

interface PropertyState {
    properties: Property[];
    maintenanceRequests: MaintenanceRequest[];
    payments: Payment[];
    addProperty: (property: Omit<Property, 'id'>) => void;
    updateProperty: (id: string, property: Partial<Property>) => void;
    addMaintenanceRequest: (request: Omit<MaintenanceRequest, 'id' | 'createdAt' | 'status'>) => void;
    updateMaintenanceStatus: (id: string, status: MaintenanceRequest['status']) => void;
}

const initialProperties: Property[] = [
    {
        id: '1',
        name: 'Sunset Apartments',
        address: '123 Main St, Downtown',
        type: 'Apartment Complex',
        totalUnits: 8,
        occupiedUnits: 7,
        monthlyRevenue: 9600,
        description: 'Modern apartment complex in the heart of downtown with premium amenities.',
    },
    {
        id: '2',
        name: 'Oak Street Duplex',
        address: '456 Oak St, Midtown',
        type: 'Duplex',
        totalUnits: 2,
        occupiedUnits: 2,
        monthlyRevenue: 3000,
        description: 'Charming duplex located in a quiet residential neighborhood.',
    },
    {
        id: '3',
        name: 'Pine View Condos',
        address: '789 Pine Ave, Uptown',
        type: 'Condominium',
        totalUnits: 12,
        occupiedUnits: 9,
        monthlyRevenue: 14400,
        description: 'Luxury condos with panoramic views of the city skyline.',
    },
];

const initialMaintenance: MaintenanceRequest[] = [
    {
        id: 'm1',
        propertyId: '1',
        propertyName: 'Sunset Apartments',
        unit: '3C',
        title: 'Leaking Faucet',
        description: 'The kitchen faucet is dripping constantly.',
        status: 'pending',
        priority: 'medium',
        createdAt: new Date().toISOString(),
    }
];

const initialPayments: Payment[] = [
    {
        id: 'p1',
        amount: 1200,
        status: 'pending',
        dueDate: '2025-01-01',
        type: 'rent',
    }
];

export const usePropertyStore = create<PropertyState>((set) => ({
    properties: initialProperties,
    maintenanceRequests: initialMaintenance,
    payments: initialPayments,
    addProperty: (property) => set((state) => ({
        properties: [...state.properties, { ...property, id: Math.random().toString(36).substr(2, 9) }]
    })),
    updateProperty: (id, updatedProperty) => set((state) => ({
        properties: state.properties.map((p) => p.id === id ? { ...p, ...updatedProperty } : p)
    })),
    addMaintenanceRequest: (request) => set((state) => ({
        maintenanceRequests: [
            ...state.maintenanceRequests,
            {
                ...request,
                id: 'm' + Math.random().toString(36).substr(2, 9),
                status: 'pending',
                createdAt: new Date().toISOString()
            }
        ]
    })),
    updateMaintenanceStatus: (id, status) => set((state) => ({
        maintenanceRequests: state.maintenanceRequests.map((r) => r.id === id ? { ...r, status } : r)
    })),
}));
