
import Image from 'next/image';
import LOGO from '@/Assets/UABS-LOGO.png'
import B_Data from './BDG_Data';


function Info({ Placeholder, Value }: { Placeholder: string, Value: string }) {
    const info_style = {
        gridTemplateColumns: '125px auto'
    };
    return (
        <div className='info w-full grid px-3' style={info_style}>
            <div className='Placeholder flex justify-start'>{Placeholder}:</div>
            <div className='Value underline decoration-dotted underline-offset-8'>{Value}</div>
        </div>
    )
}
export default function BGD({ Data, p_width, p_height }: { Data: B_Data, p_width: number, p_height: number }) {
    const bdg_info_style = {
        gridTemplateRows: 'auto 200px',

    }

    return (
        <>

            <div className="relative   min-h-[1010px]  min-w-[625px] bg-gray-200 flex flex-col items-center justify-evenly ">
                <div className='w-full flex flex-col justify-center items-center z-[10]'>

                    <Image
                        src={LOGO}
                        alt='LOGO_UABS'
                        height={100}
                        width={104}
                        className='mx-auto'
                    />

                    <div className="Titles text-blue-900 font-semibold mx-auto flex flex-col justify-center items-center text-lg">
                        <h3>Université Aceem Business School</h3>
                        <h3>Ankadivato</h3>
                    </div>

                </div>
                <div className='Photo-Placeholder h-[250px] w-full flex justify-center items-center mr-auto z-[10]'>
                    <img
                        className='rounded-full'
                        src={Data.Photo}
                        width={250}
                        height={250}
                        alt={`${Data.Name}'s photo`}
                    />
                </div>

                <div className='Info-container w-full h-[500px] mt-3 mr-auto flex justify-center items-center relative'>

                    <div className='Info aspect-square h-[500px] grid  border-4 rounded-xl border-gray-900 relative' style={bdg_info_style} >
                        <span id='School-year' className='absolute text-blue-900 font-bold text-3xl -top-[20px] text-center w-full flex justify-center items-center' >
                            <div className='px-3 max-w-max bg-gray-200'>2023-2024</div>
                        </span>
                        <div className='grid grid-row-5 w-full h-full text-gray-900 text-xl pt-5 font-semibold justify-center items-center gap-4'>
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