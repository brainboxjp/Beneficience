import { ApiService } from '../ApiService';

export interface WellSensePatient {
    memberId: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    address: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
    };
    eligibility: {
        status: string;
        startDate: string;
        endDate: string;
    };
    careProgram: string;
}

export interface WellSenseVisit {
    visitId: string;
    memberId: string;
    providerId: string;
    startTime: string;
    endTime: string;
    location: {
        latitude: number;
        longitude: number;
        accuracy: number;
    };
    tasks: Array<{
        taskId: string;
        description: string;
        completed: boolean;
        completedAt?: string;
    }>;
}

export class WellSenseApi extends ApiService {
    constructor() {
        super('wellsense');
    }

    async getPatients(): Promise<WellSensePatient[]> {
        return this.request('/members');
    }

    async getPatientDetails(memberId: string): Promise<WellSensePatient> {
        return this.request(`/members/${memberId}`);
    }

    async submitVisit(visit: WellSenseVisit): Promise<{ status: string; visitId: string }> {
        return this.request('/visits', {
            method: 'POST',
            body: JSON.stringify(visit),
        });
    }

    async getVisitHistory(memberId: string): Promise<WellSenseVisit[]> {
        return this.request(`/members/${memberId}/visits`);
    }

    async verifyEligibility(memberId: string): Promise<{
        eligible: boolean;
        coverageDetails: any;
    }> {
        return this.request(`/members/${memberId}/eligibility`);
    }
}