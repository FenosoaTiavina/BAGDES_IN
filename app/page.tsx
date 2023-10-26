'use client'
import { InputFile } from '@/components/InputFile';
import BDG_Page from '@/components/Pages';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import { MutableRefObject, ReactNode, Suspense, useRef, useState } from 'react';
import { Loader2, DownloadIcon, Check } from "lucide-react";
import generatePDF from 'react-to-pdf';


async function HandleBadgesPagesDowloads(ref: MutableRefObject<HTMLDivElement | null>) {

  await generatePDF(ref, { filename: 'BAGDES.pdf' }).then(
    () => {

    }
  )

}
export default function Home() {

  const targetRef = useRef<HTMLDivElement | null>(null)
  const downloadButtonRef = useRef<HTMLButtonElement | null>(null)
  const [Pages, setPages] = useState<ReactNode | null>(null)
  const [file, setFile] = useState<File>()
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) return
    const data = new FormData()
    data.set('file', file)
    setPages(
      BDG_Page(file)
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className='grid grid-cols-3 justify-items-center items-center'>
        <form onSubmit={onSubmit}>
          <InputFile
            label='Document source'
            accept=".csv"
            onChange={(e) => setFile(e.target.files?.[0])}
          />
          <Button asChild className='mt-3' disabled={!file ? true : false}>
            <input type='submit' value='Confirmer' />
          </Button>

        </form>
        <Separator orientation='vertical' />
        <Suspense fallback={
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          </Button>
        }>
          <Button
            ref={downloadButtonRef}
            variant='outline'
            disabled={!targetRef ? true : false}
            onClick={async (event) => {
              if (targetRef) {
                await HandleBadgesPagesDowloads(targetRef).then(() => {

                })
              }
            }}>
            <p>Télecharger</p> <Separator className='mx-3' orientation="vertical" /> <DownloadIcon />
          </Button>
        </Suspense >

      </div>


      <Separator className="my-4" />
      <div ref={targetRef} className="contentPDF box-border " >
        <Suspense fallback={<p>Chargement....</p>}>
          {Pages}
        </Suspense>

      </div>
    </main >


  )
}
