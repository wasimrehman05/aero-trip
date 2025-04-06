import { apiService } from "./apiService";
import { AxiosResponse } from "axios"; // Import AxiosResponse for type safety

interface AutoSuggestParams {
    text: string;
    isDestination?: boolean;
}

export const autoSuggestSearch = async ({ text, isDestination = false }: AutoSuggestParams): Promise<any> => {
    try {
        const response: AxiosResponse<any> = await apiService.get(`/autosuggest-search/api/v1/search-flight/IN/en-GB/${text}`,
            {
                headers: {
                    accept: "application/json",
                    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
                    dnt: "1",
                    origin: "https://www.skyscanner.co.in",
                    pagetype: "HOME_PAGE",
                    platform: "Desktop",
                    priority: "u=1, i",
                    referer: "https://www.skyscanner.co.in/",
                    "sec-ch-ua": '"Not A(Brand";v="8", "Chromium";v="132"',
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": '"macOS"',
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "cross-site",
                    "skyscanner-client-name": "banana",
                    "skyscanner-utid": "f01609f6-b033-43dd-936f-2817a6a295dd",
                    "user-agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36",
                },
                params: {
                    isDestination,
                    enable_general_search_v2: true,
                    autosuggestExp: "",
                },
            }
        );

        return response.data; // Extract and return only the relevant response data
    } catch (error) {
        console.error("Error in autoSuggestSearch:", error);
        throw error; // Re-throw error for handling in the caller function
    }
};
