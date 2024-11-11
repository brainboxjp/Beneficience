import { Geolocation, getCurrentLocation } from '@nativescript/core';
import { WellSenseVisit } from './api/providers/WellSenseApi';
import { DataSyncService } from './DataSyncService';
import { ProviderFactory } from './api/ProviderFactory';

export class VisitService {
    private static instance: VisitService;
    private currentVisit: WellSenseVisit | null = null;
    private locationInterval: any;
    private dataSyncService: DataSyncService;

    private constructor() {
        this.dataSyncService = DataSyncService.getInstance();
    }

    static getInstance(): VisitService {
        if (!VisitService.instance) {
            VisitService.instance = new VisitService();
        }
        return VisitService.instance;
    }

    async startVisit(memberId: string, providerId: string): Promise<WellSenseVisit> {
        try {
            const location = await this.getCurrentLocation();
            
            this.currentVisit = {
                visitId: Date.now().toString(),
                memberId,
                providerId,
                startTime: new Date().toISOString(),
                endTime: '',
                location: {
                    latitude: location.latitude,
                    longitude: location.longitude,
                    accuracy: location.accuracy
                },
                tasks: []
            };

            // Start location tracking
            this.startLocationTracking();

            // Queue initial sync
            await this.dataSyncService.queueVisitSync('wellsense', this.currentVisit);

            return this.currentVisit;
        } catch (error) {
            console.error('Failed to start visit:', error);
            throw new Error('Failed to start visit');
        }
    }

    async endVisit(): Promise<void> {
        if (!this.currentVisit) {
            throw new Error('No active visit');
        }

        try {
            const location = await this.getCurrentLocation();
            
            this.currentVisit.endTime = new Date().toISOString();
            this.currentVisit.location = {
                latitude: location.latitude,
                longitude: location.longitude,
                accuracy: location.accuracy
            };

            // Stop location tracking
            this.stopLocationTracking();

            // Sync final visit data
            await this.dataSyncService.queueVisitSync('wellsense', this.currentVisit);
            
            this.currentVisit = null;
        } catch (error) {
            console.error('Failed to end visit:', error);
            throw new Error('Failed to end visit');
        }
    }

    async updateTasks(tasks: Array<{ taskId: string; description: string; completed: boolean; completedAt?: string }>): Promise<void> {
        if (!this.currentVisit) {
            throw new Error('No active visit');
        }

        this.currentVisit.tasks = tasks;
        await this.dataSyncService.queueVisitSync('wellsense', this.currentVisit);
    }

    private async getCurrentLocation(): Promise<{ latitude: number; longitude: number; accuracy: number }> {
        try {
            const hasPermission = await Geolocation.enableLocationRequest();
            if (!hasPermission) {
                throw new Error('Location permission denied');
            }

            const location = await getCurrentLocation({
                desiredAccuracy: 3,
                updateDistance: 10,
                maximumAge: 20000,
            });

            return {
                latitude: location.latitude,
                longitude: location.longitude,
                accuracy: location.accuracy
            };
        } catch (error) {
            console.error('Failed to get location:', error);
            throw new Error('Failed to get location');
        }
    }

    private startLocationTracking(): void {
        // Update location every 5 minutes
        this.locationInterval = setInterval(async () => {
            if (this.currentVisit) {
                const location = await this.getCurrentLocation();
                this.currentVisit.location = location;
                await this.dataSyncService.queueVisitSync('wellsense', this.currentVisit);
            }
        }, 5 * 60 * 1000);
    }

    private stopLocationTracking(): void {
        if (this.locationInterval) {
            clearInterval(this.locationInterval);
            this.locationInterval = null;
        }
    }

    getCurrentVisit(): WellSenseVisit | null {
        return this.currentVisit;
    }

    async getVisitHistory(memberId: string): Promise<WellSenseVisit[]> {
        try {
            const provider = ProviderFactory.getProvider('wellsense');
            return await provider.getVisitHistory(memberId);
        } catch (error) {
            console.error('Failed to get visit history:', error);
            throw new Error('Failed to get visit history');
        }
    }
}</content></file>
<boltAction type="start">
<command>setup-nativescript-stackblitz && ns preview</command>