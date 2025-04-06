import { apiService } from "./apiService";
import { AxiosResponse } from "axios";

interface SearchFlightParams {
    cabinClass: string;
    childAges: number[];
    adults: number;
    legs: {
        legOrigin: { "@type": string; entityId: string };
        legDestination: { "@type": string; entityId: string };
        dates: { "@type": string; year: string; month: string; day: string };
        placeOfStay: string;
    }[];
}

export const searchFlight = async (
    params: SearchFlightParams
): Promise<any> => {
    try {
        const response: AxiosResponse<any> = await apiService.post(
            "/radar/api/v2/web-unified-search/",
            params,
            {
                headers: { 
                    'accept': 'application/json', 
                    'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8', 
                    'content-type': 'application/json', 
                    'dnt': '1', 
                    'origin': 'https://www.skyscanner.co.in', 
                    'priority': 'u=1, i', 
                    'referer': 'https://www.skyscanner.co.in/transport/flights/sxv/del/250407/?adultsv2=1&cabinclass=economy&childrenv2=&ref=home&rtn=0&preferdirects=false&outboundaltsenabled=false&inboundaltsenabled=false', 
                    'sec-ch-ua': '"Not:A-Brand";v="24", "Chromium";v="134"', 
                    'sec-ch-ua-mobile': '?0', 
                    'sec-ch-ua-model': '""', 
                    'sec-ch-ua-platform': '"macOS"', 
                    'sec-fetch-dest': 'empty', 
                    'sec-fetch-mode': 'cors', 
                    'sec-fetch-site': 'same-origin', 
                    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36', 
                    'x-skyscanner-ads-sponsored-view-type': 'ADS_SPONSORED_VIEW_DAY_VIEW', 
                    'x-skyscanner-channelid': 'website', 
                    'x-skyscanner-consent-adverts': 'true', 
                    'x-skyscanner-currency': 'INR', 
                    'x-skyscanner-locale': 'en-GB', 
                    'x-skyscanner-market': 'IN', 
                    'x-skyscanner-traveller-context': 'f01609f6-b033-43dd-936f-2817a6a295dd', 
                    'x-skyscanner-trustedfunnelid': 'f52ad139-3fe9-4158-a195-1803f547cf48', 
                    'x-skyscanner-viewid': 'f52ad139-3fe9-4158-a195-1803f547cf48'
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error("Error in searchFlight:", error);
        throw error;
    }
};
