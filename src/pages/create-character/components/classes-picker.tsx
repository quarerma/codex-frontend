import { useState } from 'react';
import { CreateComponentProps } from '../props/create-component';
import { IoMdArrowDropup } from 'react-icons/io';
import { ClassModel } from '../../../types/class';
import ReadInitialFeats from '../../admin/classes/components/initial-class-feats';
import { formatProficiencie } from '../../admin/classes/components/read-class';
import { Button } from '../../../components/ui/button';
import { useCharacterCreation } from '../create-character';
import { useQuery } from '@tanstack/react-query';
import { getClassSubClasses } from '../../../api/fetch/classes';
import SubclassPick from './subclasses-picker';

interface ClassProps {
  classModel: ClassModel;
  setValue: CreateComponentProps['setValue'];
}

export default function ClassPick({ classModel, setValue }: ClassProps) {
  const [expanded, setExpanded] = useState(false);

  const { setSelectedClass } = useCharacterCreation();

  return (
    <div className={`flex h-fit flex-col border-[3px] border-border  `}>
      <div className="flex justify-between items-center cursor-pointer lg:p-6 md:p-4 p-2" onClick={() => setExpanded(!expanded)}>
        <h1 className="lg:text-5xl md:text-4xl text-xl font-semibold">{classModel.name}</h1>
        <button className="lg:text-5xl text-5xl font-bold">{expanded ? <IoMdArrowDropup /> : <IoMdArrowDropup className="rotate-180" />}</button>
      </div>

      <div
        className={` font-normal flex flex-col space-y-5 overflow-x-auto overflow-y-hidden lg:px-8 md:px-6 px-4 duration-300 transition-max-height  ${
          expanded ? 'min-h-screen lg:mb-16 md:mb-6 mb-4 ' : 'max-h-0 h-0'
        }`}
      >
        <div>
          <h3 className="font-bold text-4xl">Descrição:</h3>
          <p className="text-xl" dangerouslySetInnerHTML={{ __html: classModel.description }}></p>
        </div>
        <div className="flex flex-col space-y-1">
          <h1 className="text-3xl text-green-500">Cálculo de Vida</h1>
          <h1>
            Vida inicial: {classModel.initialHealth} + {classModel.hitPointsPerLevel} + Fortitude
          </h1>
          <h1>Vida por NEX: {classModel.hitPointsPerLevel} + Fortitude</h1>
        </div>
        <div className="flex flex-col space-y-1">
          <h1 className="text-3xl text-yellow-400">Cálculo de PE</h1>
          <h1>
            PE inicial: {classModel.initialEffort} + {classModel.effortPointsPerLevel} + Presença
          </h1>
          <h1>PE por NEX: {classModel.effortPointsPerLevel} + Presença</h1>
        </div>
        <div className="flex flex-col space-y-1">
          <h1 className="text-3xl text-blue-500">Cálculo de Sanidade</h1>
          <h1>Sanidade inicial: {classModel.initialSanity}</h1>
          <h1>Sanidade por NEX: {classModel.SanityPointsPerLevel}</h1>
        </div>
        <div className="flex flex-col space-y-1">
          <h1 className="text-3xl text-orange-600">Cálculo de Perícias</h1>
          <h1>Perícias iniciais: {classModel.number_of_skills} + Intelecto</h1>
        </div>
        <div className="flex flex-col ">
          <h1 className="text-3xl">Proficiências: </h1>
          <ul className="list-inside list-disc ml-2">{classModel.proficiencies && classModel.proficiencies.map((proficiency, index) => <li key={index}>{formatProficiencie(proficiency)}</li>)}</ul>
        </div>
        <div className="flex flex-col space-y-2">
          <h1 className="text-4xl font-bold text-rose-600">Poderes Iniciais</h1>
          <ReadInitialFeats classId={classModel.id} />
        </div>
        <div className="w-full flex items-center justify-center pt-5 ">
          <Button
            onClick={() => {
              {
                setSelectedClass(classModel);
                setValue('classId', classModel.id);
              }
            }}
            className="w-[80%]"
          >
            Escolher Classe
          </Button>
        </div>
      </div>
    </div>
  );
}

export function ClassFocus({ classModel, setValue }: ClassProps) {
  const { data: subclasses = [] } = useQuery({
    queryKey: ['subclasses', classModel.id],
    queryFn: () => getClassSubClasses(classModel.id),
  });

  const { selectedSubclass, setSelectedSubclass } = useCharacterCreation();
  return (
    <div className="text-5xl bg-dark-bg-secondary border-[3px] w-[50%] border-border p-5 flex flex-col rounded-2xl space-y-10">
      <div className="space-y-5">
        <h1 className="font-bold text-5xl text-center">{classModel.name}</h1>
        <div className="w-full h-[2px] bg-muted"></div>
      </div>
      <div>
        <h3 className="font-bold mb-1">Descrição:</h3>
        <p className="text-[1.3rem] leading-7 font-extralight" dangerouslySetInnerHTML={{ __html: classModel.description }}></p>
      </div>
      <div className="flex flex-col space-y-5">
        {selectedSubclass ? (
          <div className="flex flex-col space-y-5">
            <h3 className="font-bold text-center text-4xl">Subclasse Selecionada</h3>
            <div className="w-full h-[2px]  bg-muted"></div>
            <h1 className="text-4xl font-semibold">{selectedSubclass.name}</h1>
            <p className="text-2xl" dangerouslySetInnerHTML={{ __html: selectedSubclass.description }}></p>
            <div className="flex justify-center">
              <Button
                onClick={() => {
                  setSelectedSubclass(null);
                  setValue('subclassId', undefined);
                }}
                className="w-[50%] text-3xl mt-2"
                variant={'secondary'}
              >
                Mudar Subclasse
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <h1 className="text-5xl text-center font-bold mb-5">Subclasses:</h1>
            <ul className=" ml-2 space-y-2">
              {subclasses.map((subclass, index) => (
                <li key={index}>
                  <SubclassPick subclass={subclass} setValue={setValue} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
