import { useRef } from 'react';
import { Button } from '../../../../components/ui/button';
import { Subclass } from '../../../../types/sublass';
import { FaFilePdf } from 'react-icons/fa6';

// import html2pdf from 'html2pdf.js';

export default function SubclassModel(subclass: Subclass) {
  const contentRef = useRef<HTMLDivElement>(null);

  async function handlePrint() {
    const html2pdf = (await import('html2pdf.js')).default;
    if (contentRef.current) {
      html2pdf()
        .from(contentRef.current)
        .set({
          filename: `${subclass.name}.pdf`,
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
          margin: [0.5, 0.5],
        })
        .save();
    }
  }

  return (
    <div>
      <div ref={contentRef} className=" p-5 text-xl space-y-10">
        {/* General Subclass Information */}
        <div className="flex gap-x-2 items-center">
          <h1 className="text-3xl font-bold">{subclass.name}</h1>

          <FaFilePdf
            data-html2canvas-ignore
            onClick={handlePrint}
            className="text-2xl text-red-500 hover:scale-110 duration-300 cursor-pointer"
          />
        </div>
        <p>{subclass.description}</p>
        <div>
          <h2>Poderes de Subclasse:</h2>
          <ul>
            {subclass.subclassFeats.map((feat, index) => (
              <li className="text-sm mt-2" key={index}>
                <h1 className="text-red-500 ">Nex {feat.levelRequired === 20 ? 99 : feat.levelRequired * 5}%:</h1>
                <div className="flex flex-col space-y-2">
                  <h1>{feat.feat.name}:</h1>
                  <p dangerouslySetInnerHTML={{ __html: feat.feat.description }}></p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
