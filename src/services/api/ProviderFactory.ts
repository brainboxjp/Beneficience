import { ApiConfig } from './ApiConfig';
import { WellSenseApi } from './providers/WellSenseApi';

export class ProviderFactory {
    static initialize() {
        // Initialize WellSense provider
        ApiConfig.addProvider('wellsense', {
            name: 'WellSense Health Plan',
            baseUrl: 'https://api.wellsense.org/v1',
            apiKey: process.env.WELLSENSE_API_KEY || '',
        });
    }

    static getProvider(providerId: string) {
        switch (providerId.toLowerCase()) {
            case 'wellsense':
                return new WellSenseApi();
            default:
                throw new Error(`Unknown provider: ${providerId}`);
        }
    }
}