import { useState } from 'react';
import { Origin } from '../../../types/origin';
import { CreateComponentProps } from '../props/create-component';
import { IoMdArrowDropup } from 'react-icons/io';
import { Button } from '../../../components/ui/button';
import { useCharacterCreation } from '../create-character';

interface OriginProps {
  origin: Origin;
  setValue: CreateComponentProps['setValue'];
}

export default function OriginPick({ origin, setValue }: OriginProps) {
  const [expanded, setExpanded] = useState(false);
  const { setSelectedOrigin } = useCharacterCreation();
  return (
    <div className={`flex flex-col border-[3px] border-border  `}>
      <div className="flex justify-between items-center cursor-pointer lg:p-6 md:p-4 p-2" onClick={() => setExpanded(!expanded)}>
        <h1 className="lg:text-5xl md:text-4xl text-xl font-semibold">{origin.name}</h1>
        <button className="lg:text-5xl text-5xl font-bold">{expanded ? <IoMdArrowDropup /> : <IoMdArrowDropup className="rotate-180" />}</button>
      </div>

      <div
        className={`lg:text-4xl md:text-2xl text-xl  font-normal flex flex-col space-y-5 overflow-x-auto overflow-y-hidden lg:px-16 md:px-12 px-8 duration-300 transition-max-height  ${
          expanded ? 'max-h-screen lg:mb-16 md:mb-6 mb-4 ' : 'max-h-0 h-0'
        }`}
      >
        <div>
          <h3 className="font-bold mb-1">Descrição:</h3>
          <p className="text-[1.1rem] leading-7 font-light" dangerouslySetInnerHTML={{ __html: origin.description }}></p>
        </div>
        <div>
          <h1 className="font-bold">Perícias Treinadas</h1>
          <ul className="list-disc list-inside text-2xl font-light">
            {origin.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
        <div>
          <h1 className=" font-bold mb-2">Poder de Origem</h1>
          <label className="flex flex-col font-extralight text-2xl">
            <h1>{origin.feats.name}:</h1>
            <h1 dangerouslySetInnerHTML={{ __html: origin.feats.description }}></h1>
          </label>
        </div>
        <div className="w-full flex items-center justify-center pt-5 ">
          <Button
            onClick={() => {
              setSelectedOrigin(origin);
              setValue('originId', origin.id);
            }}
            className="w-[80%]"
          >
            Escolher Origem
          </Button>
        </div>
      </div>
    </div>
  );
}
