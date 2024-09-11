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

interface ClassProps {
  classModel: ClassModel;
  setValue: CreateComponentProps['setValue'];
}

export default function ClassPick({ classModel, setValue }: ClassProps) {
  const [expanded, setExpanded] = useState(false);

  const { setSelectedClass } = useCharacterCreation();

  return (
    <div className={`flex h-fit flex-col border-[3px] border-border  `}>
      <div
        className="flex justify-between items-center cursor-pointer lg:p-6 md:p-4 p-2"
        onClick={() => setExpanded(!expanded)}
      >
        <h1 className="lg:text-3xl md:text-2xl text-base font-semibold">{classModel.name}</h1>
        <button className="lg:text-4xl text-3xl font-bold">
          {expanded ? <IoMdArrowDropup /> : <IoMdArrowDropup className="rotate-180" />}
        </button>
      </div>

      <div
        className={` font-normal flex flex-col space-y-5 overflow-x-auto overflow-y-hidden lg:px-8 md:px-6 px-4 duration-300 transition-max-height  ${
          expanded ? 'min-h-screen lg:mb-16 md:mb-6 mb-4 ' : 'max-h-0 h-0'
        }`}
      >
        <div>
          <h3 className="font-bold text-2xl">Descrição:</h3>
          <p className="text-base" dangerouslySetInnerHTML={{ __html: classModel.description }}></p>
        </div>
        <div className="flex flex-col space-y-1">
          <h1 className="text-xl text-green-500">Cálculo de Vida</h1>
          <h1>
            Vida inicial: {classModel.initialHealth} + {classModel.hitPointsPerLevel} + Fortitude
          </h1>
          <h1>Vida por NEX: {classModel.hitPointsPerLevel} + Fortitude</h1>
        </div>
        <div className="flex flex-col space-y-1">
          <h1 className="text-xl text-yellow-400">Cálculo de PE</h1>
          <h1>
            PE inicial: {classModel.initialEffort} + {classModel.effortPointsPerLevel} + Presença
          </h1>
          <h1>PE por NEX: {classModel.effortPointsPerLevel} + Presença</h1>
        </div>
        <div className="flex flex-col space-y-1">
          <h1 className="text-xl text-blue-500">Cálculo de Sanidade</h1>
          <h1>Sanidade inicial: {classModel.initialSanity}</h1>
          <h1>Sanidade por NEX: {classModel.SanityPointsPerLevel}</h1>
        </div>
        <div className="flex flex-col space-y-1">
          <h1 className="text-xl text-orange-600">Cálculo de Perícias</h1>
          <h1>Perícias iniciais: {classModel.number_of_skills} + Intelecto</h1>
        </div>
        <div className="flex flex-col ">
          <h1 className="text-xl">Proficiências: </h1>
          <ul className="list-inside list-disc ml-2">
            {classModel.proficiencies &&
              classModel.proficiencies.map((proficiency, index) => (
                <li key={index}>{formatProficiencie(proficiency)}</li>
              ))}
          </ul>
        </div>
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl font-bold text-rose-600">Poderes Iniciais</h1>
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
  return (
    <div className="text-3xl bg-dark-bg-secondary border-[3px] w-[50%] border-border p-5 flex flex-col rounded-2xl space-y-10">
      <div className="space-y-5">
        <h1 className="font-bold text-4xl text-center">{classModel.name}</h1>
        <div className="w-full h-[2px] bg-muted"></div>
      </div>
      <div>
        <h3 className="font-bold mb-1">Descrição:</h3>
        <p
          className="text-[1.3rem] leading-7 font-extralight"
          dangerouslySetInnerHTML={{ __html: classModel.description }}
        ></p>
      </div>
      <div className="flex flex-col space-y-5">
        <h1 className="text-2xl">Subclasses:</h1>
        <ul className="list-inside list-disc ml-2">
          {subclasses.map((subclass, index) => (
            <li key={index}>{subclass.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
