
import BDG from "@/COMP_UI/BDG";
import { ReactNode } from "react";
import B_Data from "./BDG_Data";
import { AlertDestructive } from "./AlertDesctructive";

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

    let _data: Array<B_Data> = [];

    let FileURL = new URL(URL.createObjectURL(file))
    let content = await (await fetch(FileURL.toString())).text()


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
    _data.forEach((value, index) => {

        if (items.length !== 9) {
            items.push(<div key={index} className="border-green-500 w-full h-full flex justify-center items-center"> <BDG Data={value} p_width={2480} p_height={3507} /></div>);
        } else {
            pages.push(<_Page_temp BDGs={items} key={pages.length} />);
            items = new Array;
        }


    }
    );
    if (items.length > 0) {
        pages.push(<_Page_temp BDGs={items} key={pages.length} />);
    }
    return (
        <>
            {pages}
        </>

    )
}