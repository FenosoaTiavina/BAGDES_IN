import { StyleHTMLAttributes, Suspense, useEffect, useState } from 'react';
import Image from 'next/image';
import LOGO from '@/Assets/UABS-LOGO.png'
import default_photo from '@/Assets/Photos/default.png'
import B_Data from './BDG_Data';
import axios from 'axios';
import { Separator } from '@/COMP_UI/ui/separator';
// import BDGAvatar from './BDGAvatar';

export const api = axios.create({
    baseURL: 'http://localhost:3001',
});

interface BDGAvatarProps {
  src: string;
  alt: string;
}

async function uploadImage(src: string): Promise<string> {
  try {
    const response = await api.post('/upload', { photo: src });
    return response.data.name;
  } catch (error) {
    console.error("Error uploading image:", error);
    return "/Photos/default.png";
  }
}

function BDGAvatar({ src, alt }: BDGAvatarProps) {
  const [image, setImage] = useState<string>("/Photos/default.png");

  useEffect(() => {
    uploadImage(src).then((imageName) => {
      setImage(imageName);
    });
  }, [src]);

  return (
    <img
      className='rounded-full'
      src={image}
      alt={alt}
      width={250}
      height={250}
    />
  );
}


function Info({ Placeholder, Value }: { Placeholder: string, Value: string }) {
    
    const info_style = {
        gridTemplateColumns: '125px auto'
    };
    return (
        <div className='info w-full grid px-3' style={info_style}>
            <div className='Placeholder flex justify-start'>{Placeholder}:</div>
            <div className='Value w-full flex flex-col justify-evenly items-center'>
                <div>{Value}</div>
                <span className='w-full border border-gray-600 border-dashed max-h-[1px] min-w-full' />
            </div>
        </div>
    )
}

export default function BGD({ Data }: { Data: B_Data }) {
    const bdg_info_style: React.CSSProperties = {
        gridTemplateRows: 'auto 200px',
    }

    return (
        <>
            <div className="relative border border-gray-500  min-h-[1010px]  min-w-[625px] flex flex-col items-center justify-evenly ">
                    <div className='bg-blue-500 opacity-50 rounded-b-3xl h-[460px] w-full absolute top-0 -z-[1]'></div>
                    <div className='bg-white rounded-b-3xl h-[1010px] min-w-[625px] absolute top-0 -z-[2]'></div>

                <div className='w-full flex flex-col justify-center items-center z-[10]'>
                    
                    

                    <Image
                        src={LOGO}
                        alt='LOGO_UABS'
                        height={100}
                        width={104}
                        className='mx-auto'
                    />

                    <div className="Titles text-blue-900 font-semibold mx-auto flex flex-col justify-center items-center text-xl">
                        <h3>Université Aceem Business School</h3>
                        <h3>Ankadivato</h3>
                    </div>

                </div>
                <div className='Photo-Placeholder h-[250px] w-full flex justify-center items-center mr-auto z-[10]'>
                    <Suspense fallback={
                        <Image
                            src={default_photo} alt=''
                            width={250} height={250}
                        />}>

                        <BDGAvatar src={Data.Photo} alt={`${Data.FirstName}'s Photo`} />

                    </Suspense>
                </div>

                <div className='Info-container w-full h-[500px] mt-3 mr-auto flex justify-center items-center relative'>

                    <div className='Info aspect-square h-[500px] grid  border-4 rounded-xl border-gray-900 relative' style={bdg_info_style} >
                        <span id='School-year' className='absolute text-blue-900 font-bold text-3xl -top-[20px] text-center w-full flex justify-center items-center' >
                            <div className='px-3 max-w-max bg-white '>2023-2024</div>
                        </span>
                        <div className='grid grid-row-5 w-full h-full text-gray-900 font-light text-2xl pt-5 justify-center items-center gap-4'>
                            <Info Placeholder='Nom' Value={Data.Name} />
                            <Info Placeholder='Prenoms' Value={Data.FirstName} />
                            <Info Placeholder='Matricule' Value={Data.Matricule.toString()} />
                            <Info Placeholder='Mention' Value={Data.Mention} />
                            <Info Placeholder='Parcours' Value={Data.Parcours} />
                        </div>
                        <div className='flex flex-col justify-evenly items-center'>
                            <span className='text-xl text-gray-900'>Signature</span>
                            <span className='w-4/5 h-[2px] bg-gray-900'></span>
                        </div>
                    </div>
                </div>

            </div >

        </>
    )
}