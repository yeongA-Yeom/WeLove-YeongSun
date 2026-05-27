import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {

    try {

        //////////////////////////////////////////////////////
        // 갤러리 폴더 경로
        //////////////////////////////////////////////////////

        const galleryPath = path.join(
            process.cwd(),
            'public',
            'images',
            'gallery'
        );

        //////////////////////////////////////////////////////
        // 폴더 안 파일 목록 읽기
        //////////////////////////////////////////////////////

        const files = fs.readdirSync(galleryPath);

        //////////////////////////////////////////////////////
        // 이미지 파일만 필터링
        //////////////////////////////////////////////////////

        const imageFiles = files.filter((file) => {

            return (
                file.endsWith('.jpg') ||
                file.endsWith('.jpeg') ||
                file.endsWith('.png') ||
                file.endsWith('.webp')
            );
        });

        //////////////////////////////////////////////////////
        // 웹 경로로 변환
        //////////////////////////////////////////////////////

        const images = imageFiles.map((file) => {

            return `/images/gallery/${file}`;
        });

        //////////////////////////////////////////////////////
        // 응답 반환
        //////////////////////////////////////////////////////

        return NextResponse.json({
            images,
        });

    } catch (error) {

        console.error(error);

        return NextResponse.json(
            {
                error: '이미지를 불러오지 못했습니다',
            },
            {
                status: 500,
            }
        );
    }
}