import { useState } from 'react';
import { Subclass } from '../../../types/sublass';
import { CreateComponentProps } from '../props/create-component';
import { useCharacterCreation } from '../create-character';
import { IoMdArrowDropup } from 'react-icons/io';
import { Button } from '../../../components/ui/button';

interface ClassProps {
  subclass: Subclass;
  setValue: CreateComponentProps['setValue'];
}

export default function SubclassPick({ subclass, setValue }: ClassProps) {
  const [expanded, setExpanded] = useState(false);

  const { setSelectedSubclass } = useCharacterCreation();

  return (
    <div className={`flex h-fit flex-col border-[3px] border-border  `}>
      <div className="flex justify-between items-center cursor-pointer lg:p-6 md:p-4 p-2" onClick={() => setExpanded(!expanded)}>
        <h1 className="lg:text-5xl md:text-4xl text-xl font-semibold">{subclass.name}</h1>
        <button className="lg:text-5xl text-5xl font-bold">{expanded ? <IoMdArrowDropup /> : <IoMdArrowDropup className="rotate-180" />}</button>
      </div>

      <div
        className={` font-normal flex flex-col space-y-5 overflow-x-auto overflow-y-hidden lg:px-8 md:px-6 px-4 duration-300 transition-max-height  ${
          expanded ? 'max-h-screen lg:mb-16 md:mb-6 mb-4 ' : 'max-h-0 h-0'
        }`}
      >
        <div>
          <h3 className="font-bold text-4xl">Descrição:</h3>
          <p className="text-xl" dangerouslySetInnerHTML={{ __html: subclass.description }}></p>
        </div>
        <div>
          Poderes de Subclasse:
          <ul>
            {subclass.subclassFeats.map((feat, index) => (
              <li className="text-xl mt-2" key={index}>
                <h1 className="text-red-500 ">Nex {feat.levelRequired === 20 ? 99 : feat.levelRequired * 5}%:</h1>
                <div className="flex flex-col space-y-2 ">
                  <h1>{feat.feat.name}:</h1>
                  <p dangerouslySetInnerHTML={{ __html: feat.feat.description }}></p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full flex items-center justify-center pt-5 ">
          <Button
            onClick={() => {
              {
                setSelectedSubclass(subclass);
                setValue('subclassId', subclass.id);
              }
            }}
            className="w-[80%]"
          >
            Escolher Subclasse
          </Button>
        </div>
      </div>
    </div>
  );
}
