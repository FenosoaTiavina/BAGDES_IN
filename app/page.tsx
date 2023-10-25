'use client'
import { InputFile } from '@/components/InputFile';
import BDG_Page from '@/components/Pages';
import { Button } from '@/components/ui/button';

import { ReactNode, Suspense, useRef, useState } from 'react';
import generatePDF from 'react-to-pdf';

export default function Home() {

  const targetRef = useRef<HTMLDivElement | null>(null)
  const formRef = useRef<HTMLFormElement | null>(null)
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
      <form ref={formRef} onSubmit={onSubmit}>
        <InputFile
          label='Document source'
          accept=".csv"
          onChange={(e) => setFile(e.target.files?.[0])}
        />
        <Button asChild className='mt-3'>
          <input type='submit' value='Confirmer' />
        </Button>

      </form>

      <button type="button" className="bg-slate-400 rounded p-3 m-5" onClick={() => { generatePDF(targetRef), { filename: 'BGDS.pdf' } }}>Download</button>

      <div ref={targetRef} className="contentPDF box-border " >
        <Suspense fallback={<p>Chargement....</p>}>
          {Pages}
        </Suspense>

      </div>
    </main>


  )
}
