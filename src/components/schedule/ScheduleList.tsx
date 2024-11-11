import * as React from "react";
import { StyleSheet } from "react-nativescript";

type Visit = {
    id: string;
    patientName: string;
    time: string;
    address: string;
    status: 'scheduled' | 'completed' | 'in-progress';
};

type ScheduleListProps = {
    date: Date;
    onVisitPress: (visitId: string) => void;
};

export function ScheduleList({ date, onVisitPress }: ScheduleListProps) {
    // Mock data - in real app, this would come from an API
    const visits: Visit[] = [
        {
            id: '1',
            patientName: 'John Smith',
            time: '09:00 AM',
            address: '123 Main St, Boston, MA',
            status: 'completed'
        },
        {
            id: '2',
            patientName: 'Mary Johnson',
            time: '11:30 AM',
            address: '456 Oak Ave, Boston, MA',
            status: 'in-progress'
        },
        {
            id: '3',
            patientName: 'Robert Davis',
            time: '02:00 PM',
            address: '789 Pine Rd, Boston, MA',
            status: 'scheduled'
        }
    ];

    const getStatusColor = (status: Visit['status']) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-800';
            case 'in-progress': return 'bg-blue-100 text-blue-800';
            case 'scheduled': return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <scrollView className="flex-grow">
            <stackLayout className="p-4">
                {visits.map(visit => (
                    <gridLayout
                        key={visit.id}
                        className="bg-white rounded-lg p-4 mb-3"
                        onTap={() => onVisitPress(visit.id)}
                    >
                        <stackLayout>
                            <gridLayout columns="*, auto">
                                <label col={0} className="font-bold text-lg">
                                    {visit.patientName}
                                </label>
                                <label 
                                    col={1} 
                                    className={`px-2 py-1 rounded-full text-xs ${getStatusColor(visit.status)}`}
                                >
                                    {visit.status}
                                </label>
                            </gridLayout>
                            <label className="text-blue-500">{visit.time}</label>
                            <label className="text-gray-500">{visit.address}</label>
                        </stackLayout>
                    </gridLayout>
                ))}
            </stackLayout>
        </scrollView>
    );
}