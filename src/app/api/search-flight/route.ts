import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';
const BASE_URL = "https://www.skyscanner.net/g/";

export async function POST(request: NextRequest) {
    try {
        // Get the request data
        const data = await request.json();

        const url = `${BASE_URL}radar/api/v2/web-unified-search/`;

        const secChUa = request.headers.get("sec-ch-ua") || '"Not A(Brand";v="24", "Chromium";v="134"';
        const secChUaMobile = request.headers.get("sec-ch-ua-mobile") || "?0";
        const secChUaPlatform = request.headers.get("sec-ch-ua-platform") || '"macOS"';
        const userAgent = request.headers.get("user-agent") || "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36";


        // Headers from the original service
        const headers = {
            accept: "application/json",
            "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
            "content-type": "application/json",
            dnt: "1",
            origin: "https://www.skyscanner.co.in",
            priority: "u=1, i",
            referer: `https://www.skyscanner.co.in/transport/flights/sxv/del/250407/?adultsv2=1&cabinclass=economy&childrenv2=&ref=home&rtn=0&preferdirects=false&outboundaltsenabled=false&inboundaltsenabled=false`,
            "sec-ch-ua": secChUa,
            "sec-ch-ua-mobile": secChUaMobile,
            "sec-ch-ua-model": '""',
            "sec-ch-ua-platform": secChUaPlatform,
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "user-agent": userAgent,
            "x-skyscanner-ads-sponsored-view-type": "ADS_SPONSORED_VIEW_DAY_VIEW",
            "x-skyscanner-channelid": "website",
            "x-skyscanner-consent-adverts": "true",
            "x-skyscanner-currency": "INR",
            "x-skyscanner-locale": "en-GB",
            "x-skyscanner-market": "IN",
            "x-skyscanner-traveller-context": uuidv4(),
            "x-skyscanner-trustedfunnelid": uuidv4(),
            "x-skyscanner-viewid": uuidv4(),
        };

        const response = await fetch(url, {
            method: "POST",
            headers,
            body: JSON.stringify(data),
        });

        const responseData = await response.json();

        return NextResponse.json(responseData);
    } catch (error) {
        console.error("Error in search_flight:", error);
        return NextResponse.json(
            {
                error: "Internal Server Error",
                details: error instanceof Error ? error.message : String(error),
            },
            { status: 500 }
        );
    }
}
