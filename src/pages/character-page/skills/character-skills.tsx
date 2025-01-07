import { useEffect, useState } from 'react';
import { Atributes } from '../../../types/character-upgrades';
import { SkillCharacter, trainingLevels } from '../../../types/skills';
import { FaDiceD20 } from 'react-icons/fa';
import { useCharacter } from '../character-page';
import { updateSkillTrainingLevel } from '../../../api/fetch/character.skills';
import SkillModal from './skill-dialog';
import { Sheet, SheetTrigger } from '../../../components/ui/sheet';

import { AtributesJson } from '../../../types/character';
import { toast } from 'sonner';
import { rollCheck } from '../components/dieRoller/roller';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { Dialog } from '../../../components/ui/dialog';
import SkillCheckDetailed from '../components/dieRoller/roll-details';

const SkillRow = ({ skill, onUpdate }: { skill: SkillCharacter; onUpdate: (updatedSkill: SkillCharacter) => void }) => {
  const { character } = useCharacter();
  const atributes = Atributes;
  const [localSkill, setLocalSkill] = useState<SkillCharacter>(skill); // Estado local para gerenciar a skill
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Estado para gerenciar o dialog
  const [dialogResult, setDialogResult] = useState<{ max: number; details: { [key: number]: { die: string; rolls: number[] } } }>(); // Armazenar resultado da rolagem
  const [toastIds, setToastIds] = useState<(number | string)[]>([]);

  const formatAtribute = (atribute: string) => {
    return atributes.find((item) => item.value === atribute)?.short;
  };

  const [isEditingTrainingLevel, setIsEditingTrainingLevel] = useState(false);

  const handleTrainingLevelChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newTrainingLevel = event.target.value as 'none' | 'expert' | 'trained' | 'veteran';

    const updatedSkill = {
      ...localSkill,
      trainingLevel: newTrainingLevel,
    };

    let baseValue = 0;
    switch (newTrainingLevel) {
      case 'none':
        baseValue = 0;
        break;
      case 'trained':
        baseValue = 5;
        break;
      case 'veteran':
        baseValue = 10;
        break;
      case 'expert':
        baseValue = 15;
        break;
      default:
        throw new Error('Invalid training level');
    }

    const finalValue = baseValue + skill.alterations.reduce((acc, alteration) => acc + alteration.value, 0);

    updatedSkill.value = finalValue;

    setLocalSkill(updatedSkill);
    setIsEditingTrainingLevel(false);
    onUpdate(updatedSkill);

    // Update the backend
    await updateSkillTrainingLevel(character.id, skill.name, newTrainingLevel);

    // Notify parent of the update
  };

  const formatTrainingLevels = (trainingLevel: string) => {
    return trainingLevels.find((item) => item.value === trainingLevel)?.label;
  };

  function triggerOpenDialog(result: { max: number; details: { [key: number]: { die: string; rolls: number[] } } }, toastId: number | string) {
    console.log(toastId);
    setToastTimersInfinity();
    setDialogResult(result);
    setIsDialogOpen(true);
    dismissToast(toastId);
  }

  useEffect(() => {
    if (!isDialogOpen) {
      console.log('Dialog closed');
      setToastTimerToDefault();
    }
  }, [isDialogOpen]);

  const handleClick = () => {
    const attributeKey = localSkill.atribute.toLowerCase() as keyof Omit<AtributesJson, 'alterations'>;
    const attributeValue = character.atributes[attributeKey];

    const result = rollCheck(`${attributeValue}d20 + ${localSkill.value}`);

    const toastId = toast('', {
      description: (
        <>
          <div className="font-oswald ">
            <h1 className="text-xl tracking-widest">
              Perícia: <span className="font-medium">{skill.name}</span>
            </h1>
            <h1 className="text-lg font-semibold">Resultado: {result.max}</h1>
          </div>

          <div className="absolute right-1 top-1 text-xl cursor-pointer hover:scale-105 duration-300" onClick={() => dismissToast(toastId)}>
            <IoMdCloseCircleOutline />
          </div>
        </>
      ),

      closeButton: false,
      cancel: false,
      action: {
        label: 'Detalhes',
        onClick: () => triggerOpenDialog(result, toastId),
      },
      actionButtonStyle: {
        color: 'text-black',
      },

      onAutoClose(toast) {
        dismissToast(toast.id);
      },

      onDismiss(toast) {
        dismissToast(toast.id);
      },
      classNames: {
        toast: 'bg-dark-bg-secondary border-2 border-white drop-shadow-[0_0px_30px_rgba(255,255,255,100)] text-white  w-full flex flex-1  ', // centers the text
        title: 'font-bold text-xl',
        description: 'font-extralight text-lg',
      },
    });

    setToastIds((prevToastIds) => [...prevToastIds, toastId]);
  };

  function dismissToast(toastId: number | string) {
    toast.dismiss(toastId);
    setToastIds((prevToastIds) => prevToastIds.filter((id) => id !== toastId));
  }

  function setToastTimersInfinity() {
    if (toastIds.length <= 0) {
      return;
    }
    toastIds.forEach((id) => {
      console.log(id);
      toast('', {
        id: id,
        duration: Infinity,
      });
    });
  }

  function setToastTimerToDefault() {
    if (toastIds.length <= 0) {
      return;
    }
    toastIds.forEach((id) => {
      console.log(id);
      toast('', {
        id: id,
        duration: 5000,
      });
    });
  }
  return (
    <tr className="text-center  font-extralight">
      <td className="text-start max-md:mt-2 md:px-2 flex items-center md:space-x-5 space-x-2 overflow-hidden">
        <FaDiceD20 className="text-primary cursor-pointer flex-shrink-0" onClick={handleClick} />
        <Sheet>
          <SheetTrigger>
            <span className="truncate">{localSkill.name}</span>
          </SheetTrigger>
          <SkillModal skill={localSkill} />
        </Sheet>
      </td>

      <td className="text-center md:px-2">({formatAtribute(localSkill.atribute)})</td>
      <td className="text-center md:px-2 ">
        {isEditingTrainingLevel ? (
          <select
            value={localSkill.trainingLevel}
            onChange={handleTrainingLevelChange}
            onBlur={() => setIsEditingTrainingLevel(false)} // Fecha o select ao sair do foco
            className="border border-gray-300 bg-dark-bg-secondary text-center outline-none rounded cursor-pointer"
            autoFocus
          >
            {trainingLevels.map((level) => (
              <option key={level.value} className="bg-dark-bg-secondary text-foreground" value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        ) : (
          <span className="cursor-pointer w-full flex-1 " onClick={() => setIsEditingTrainingLevel(true)}>
            {formatTrainingLevels(localSkill.trainingLevel)}
          </span>
        )}
      </td>
      <td className="text-center px-2">({localSkill.value})</td>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <SkillCheckDetailed skill={localSkill} roll={dialogResult} />
      </Dialog>
    </tr>
  );
};

export default function CharacterSkills() {
  const { character } = useCharacter();
  const [skills, setSkills] = useState<SkillCharacter[]>(character.skills);
  const [filteredSkills, setFilteredSkills] = useState<SkillCharacter[]>(character.skills);
  const [filterByTrainingLevel, setFilterByTrainingLevel] = useState<boolean>(false);

  useEffect(() => {
    let filteredSkills = skills;
    if (filterByTrainingLevel) {
      filteredSkills = skills.filter((skill) => skill.trainingLevel !== 'none');
    }
    setFilteredSkills([...filteredSkills]);
  }, [character.skills, filterByTrainingLevel]);

  const handleSkillUpdate = (updatedSkill: SkillCharacter) => {
    setSkills((prevSkills) => prevSkills.map((skill) => (skill.name === updatedSkill.name ? updatedSkill : skill)));
  };

  const num_of_training_skills = skills.filter((skill) => skill.trainingLevel !== 'none').length;

  return (
    <div
      className="overflow-y-auto flex justify-center w-full font-inter"
      style={{
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      }}
    >
      <table className="w-full table-fixed max-w-[600px]  md:text-base sm:text-sm text-xs">
        <thead className="border-0 text-center px-3">
          <tr className="md:text-lg text-sm text-white/30">
            <th className="text-center font-extralight w-1/4">Perícia</th>
            <th className="text-center font-extralight">Atributo</th>
            <th className={`text-center font-extralight cursor-pointer ${filterByTrainingLevel ? 'text-primary underline' : ''}`} onClick={() => setFilterByTrainingLevel(!filterByTrainingLevel)}>
              Treinamento
              <span className="text-xs">
                {' '}
                ({num_of_training_skills} / {character.num_of_skills + character.atributes.intelligence})
              </span>
            </th>
            <th className="text-center font-extralight">Bônus</th>
          </tr>
        </thead>
        <tbody>
          {filteredSkills.map((skill: SkillCharacter) => (
            <SkillRow key={skill.name} skill={skill} onUpdate={handleSkillUpdate} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
