export type ApiProvider = {
    name: string;
    baseUrl: string;
    apiKey?: string;
    authToken?: string;
};

export class ApiConfig {
    private static providers: Map<string, ApiProvider> = new Map();

    static addProvider(id: string, config: ApiProvider): void {
        this.providers.set(id, config);
    }

    static getProvider(id: string): ApiProvider | undefined {
        return this.providers.get(id);
    }

    static removeProvider(id: string): void {
        this.providers.delete(id);
    }
}