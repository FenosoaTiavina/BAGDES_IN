'use server';
import fs from 'fs-extra';
import { NextRequest, NextResponse } from 'next/server';

const readFileAsBuffer = async (absoluteFilePath: string): Promise<Buffer> => {
    const fileData = await fs.readFile(absoluteFilePath);
    return fileData;
};

const transformAbsolutePathsToBuffers = async (absolutePaths: string[]): Promise<Buffer[]> => {
    const buffers = await Promise.all(absolutePaths.map(readFileAsBuffer));
    return buffers;
};

export async function POST(request: NextRequest) {
    const content: string[] = (await request.text()).split(',');
    const files: Buffer[] = (await transformAbsolutePathsToBuffers(content))
    const base64Buffers = files.map(buffer => buffer.toString('base64'));

    let res: NextResponse = NextResponse.json({ buffers: base64Buffers }, { status: 200, })

    return res;
}