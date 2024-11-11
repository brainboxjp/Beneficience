import { ApplicationSettings } from '@nativescript/core';
import { ProviderFactory } from './api/ProviderFactory';
import { WellSenseVisit } from './api/providers/WellSenseApi';

export class DataSyncService {
    private static instance: DataSyncService;
    private syncQueue: Map<string, any>;
    private isSyncing: boolean;

    private constructor() {
        this.syncQueue = new Map();
        this.isSyncing = false;
        this.loadQueueFromStorage();
    }

    static getInstance(): DataSyncService {
        if (!DataSyncService.instance) {
            DataSyncService.instance = new DataSyncService();
        }
        return DataSyncService.instance;
    }

    private loadQueueFromStorage(): void {
        const queueData = ApplicationSettings.getString('syncQueue', '{}');
        const parsed = JSON.parse(queueData);
        this.syncQueue = new Map(Object.entries(parsed));
    }

    private saveQueueToStorage(): void {
        const queueData = Object.fromEntries(this.syncQueue);
        ApplicationSettings.setString('syncQueue', JSON.stringify(queueData));
    }

    async queueVisitSync(providerId: string, visit: WellSenseVisit): Promise<void> {
        const key = `visit_${visit.visitId}`;
        this.syncQueue.set(key, { providerId, data: visit });
        this.saveQueueToStorage();
        await this.startSync();
    }

    private async startSync(): Promise<void> {
        if (this.isSyncing || this.syncQueue.size === 0) return;

        this.isSyncing = true;
        try {
            for (const [key, item] of this.syncQueue) {
                try {
                    const provider = ProviderFactory.getProvider(item.providerId);
                    await provider.submitVisit(item.data);
                    this.syncQueue.delete(key);
                    this.saveQueueToStorage();
                } catch (error) {
                    console.error(`Failed to sync ${key}:`, error);
                    // Keep item in queue for retry
                }
            }
        } finally {
            this.isSyncing = false;
        }
    }

    getPendingVisits(): WellSenseVisit[] {
        return Array.from(this.syncQueue.values())
            .filter(item => item.data.endTime === '')
            .map(item => item.data);
    }

    async syncPendingData(): Promise<void> {
        await this.startSync();
    }
}