
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

    const csv = require('csvtojson')
    const content: String = (await request.text());
    console.log(content)

    let json_data: JSON = JSON.parse("{}");
    await csv()
        .fromString(content)
        .then((json: JSON) => {
            json_data = json;
        })

    console.log(json_data);
    let res: NextResponse = NextResponse.json(json_data, { status: 200, })

    return res;

}