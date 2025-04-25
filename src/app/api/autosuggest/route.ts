import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';

const BASE_URL = "https://www.skyscanner.net/g/";

export async function GET(request: NextRequest) {
    try {
        // Get query parameters
        const searchParams = request.nextUrl.searchParams;
        const text = searchParams.get("text") || "";
        const isDestination = searchParams.get("isDestination") === "true";

        const url = `${BASE_URL}autosuggest-search/api/v1/search-flight/IN/en-GB/${text}`;

        const secChUa = request.headers.get("sec-ch-ua") || '"Not A(Brand";v="24", "Chromium";v="134"';
        const secChUaMobile = request.headers.get("sec-ch-ua-mobile") || "?0";
        const secChUaPlatform = request.headers.get("sec-ch-ua-platform") || '"macOS"';
        const userAgent = request.headers.get("user-agent") || "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36";

        // Headers from the original service
        const headers = {
            accept: "application/json",
            "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
            dnt: "1",
            origin: "https://www.skyscanner.co.in",
            pagetype: "HOME_PAGE",
            platform: "Desktop",
            priority: "u=1, i",
            referer: "https://www.skyscanner.co.in/",
            "sec-ch-ua": secChUa,
            "sec-ch-ua-mobile": secChUaMobile,
            "sec-ch-ua-platform": secChUaPlatform,
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "cross-site",
            "skyscanner-client-name": "banana",
            "skyscanner-utid": uuidv4(),
            "user-agent": userAgent,
        };

        // Parameters from the original service
        const params = new URLSearchParams({
            isDestination: isDestination.toString(),
            enable_general_search_v2: "true",
            autosuggestExp: "",
        });

        const response = await fetch(`${url}?${params.toString()}`, {
            headers,
        });
        const data = await response.json();

        return NextResponse.json(data);
    } catch (error) {
        console.error("Error in autosuggest:", error);
        return NextResponse.json(
            {
                error: "Internal Server Error",
                details: error instanceof Error ? error.message : String(error),
            },
            { status: 500 }
        );
    }
}
function str(arg0: any) {
    throw new Error("Function not implemented.");
}

