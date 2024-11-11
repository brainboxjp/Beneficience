import * as React from "react";
import { StyleSheet } from "react-nativescript";

type Patient = {
    id: string;
    name: string;
    age: number;
    address: string;
    conditions: string[];
};

type PatientListProps = {
    searchQuery: string;
    onPatientPress: (patientId: string) => void;
};

export function PatientList({ searchQuery, onPatientPress }: PatientListProps) {
    // Mock data - in real app, this would come from an API
    const patients: Patient[] = [
        {
            id: '1',
            name: 'John Smith',
            age: 72,
            address: '123 Main St, Boston, MA',
            conditions: ['Diabetes', 'Hypertension']
        },
        {
            id: '2',
            name: 'Mary Johnson',
            age: 65,
            address: '456 Oak Ave, Boston, MA',
            conditions: ['Arthritis']
        },
        {
            id: '3',
            name: 'Robert Davis',
            age: 68,
            address: '789 Pine Rd, Boston, MA',
            conditions: ['COPD', 'Heart Disease']
        }
    ];

    const filteredPatients = patients.filter(patient =>
        patient.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <scrollView className="flex-grow">
            <stackLayout className="p-4">
                {filteredPatients.map(patient => (
                    <gridLayout
                        key={patient.id}
                        className="bg-white rounded-lg p-4 mb-3"
                        onTap={() => onPatientPress(patient.id)}
                    >
                        <stackLayout>
                            <label className="font-bold text-lg">
                                {patient.name}
                            </label>
                            <label className="text-gray-500">
                                Age: {patient.age}
                            </label>
                            <label className="text-gray-500">
                                {patient.address}
                            </label>
                            <flexboxLayout className="mt-2">
                                {patient.conditions.map((condition, index) => (
                                    <label
                                        key={index}
                                        className="mr-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                                    >
                                        {condition}
                                    </label>
                                ))}
                            </flexboxLayout>
                        </stackLayout>
                    </gridLayout>
                ))}
            </stackLayout>
        </scrollView>
    );
}