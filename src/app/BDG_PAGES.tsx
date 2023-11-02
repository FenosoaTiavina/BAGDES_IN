
import BDG from "@/components/BDG";
import { ReactNode, useState } from "react";
import B_Data from "@/lib/data";
import { AlertDestructive } from "@/components/AlertDesctructive";
import { useEdgeStore } from "@/lib/edgestore";

const _Page_temp: React.FC<{ BDGs: ReactNode[] }> = ({ BDGs }) => {
    const page_style = {
        gridTemplateColumns: 'repeat(3, 826px)',
        gridTemplateRows: 'repeat(3, 1169px)'
    }
    return (
        <div className=" Page grid w-[2480px] h-[3508px] box-border" style={page_style}>
            {BDGs}
        </div>
    );
};

export default async function BDG_Page(file: File) {
    const { edgestore } = useEdgeStore();
    let _data: Array<B_Data> = [];
    let FileURL = new URL(URL.createObjectURL(file))
    let content = await (await fetch(FileURL.toString())).text()
    const [urls, setUrls] = useState<string[]>([]);
    await fetch('/api/BDG',
        {
            method: "POST",
            body: content,
        }
    ).then(async (d) => {
        if (d.ok) {
            _data = await d.json();
        } else
            pages.push(
                <AlertDestructive alert="Une erreur s'est produite lors du traitement des données" />
            )


    });
    let items: ReactNode[] = [];
    let pages: ReactNode[] = [];
    let data_photos: String[] = [];
    _data.forEach((value, index) => {
        // console.log(`DATA-----------------------------------------\n${index}:\n`, value)

        data_photos.push(value.Photo);

        // if (items.length !== 9) {
        //     items.push(<div key={index} className="border-green-500 w-full h-full flex justify-center items-center"> <BDG Data={value}/></div>);
        // } else {
        //     pages.push(<_Page_temp BDGs={items} key={pages.length} />);
        //     items = new Array;
        // }
    });
    let base64Images: string[] = [];

    await fetch('/api/files', {
        method: 'POST',
        body: data_photos.toString(),
    })
        .then(async (res) => {
            if (res.ok) {
                let temp = await res.json();
                base64Images = temp.buffers;

            } else {
                throw new Error('Failed to fetch data.');
            }
        })


    const files: File[] = base64Images.map((base64Image, index) => {
        // Convert Base64 to Blob
        const blob = new Blob([base64Image], { type: 'image/jpeg' }); // Adjust type for the actual image format

        // Specify the desired filename
        const filename = `image_${index}.jpg`; // Adjust the extension as needed

        // Create a File from the Blob
        return new File([blob], filename);
    });

    files.map(async (file) => {
        try {
            const res = await edgestore.publicImages.upload({
                file: file
            })
            setUrls([...urls, res.url]);
        } catch (error) {

        }
    })

    console.log(urls)


    if (items.length > 0) {
        pages.push(<_Page_temp BDGs={items} key={pages.length} />);
    }
    return (
        <>
            {pages}
        </>

    )
}