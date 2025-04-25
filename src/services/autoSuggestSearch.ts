import { apiService } from "./apiService";
import { AxiosResponse } from "axios"; // Import AxiosResponse for type safety

interface AutoSuggestParams {
    text: string;
    isDestination?: boolean;
}

export const autoSuggestSearch = async ({ text, isDestination = false }: AutoSuggestParams): Promise<any> => {
    try {
        const response: AxiosResponse<any> = await apiService.get(`/autosuggest`,
            {
                params: {
                    text,
                    isDestination,
                },
            }
        );

        return response.data; // Extract and return only the relevant response data
    } catch (error) {
        console.error("Error in autoSuggestSearch:", error);
        throw error; // Re-throw error for handling in the caller function
    }
};
