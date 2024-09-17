import { useEffect, useState } from 'react';
import { Character } from '../../../types/character';
import { Atributes } from '../../../types/character-upgrades';
import { SkillCharacter, trainingLevels } from '../../../types/skills';
import { FaDiceD20 } from 'react-icons/fa';

interface CharacterSkillsProps {
  character: Character;
}

export default function CharacterSkills({ character }: CharacterSkillsProps) {
  const atributes = Atributes;
  const formatAtribute = (atribute: string) => {
    return atributes.find((item) => item.value === atribute)?.short;
  };

  const formatTrainingLevels = (trainingLevel: string) => {
    return trainingLevels.find((item) => item.value === trainingLevel)?.label;
  };

  const [filteredSkills, setFilteredSkills] = useState<SkillCharacter[]>(character.skills);
  const [filterByTrainingLevel, setFilterByTrainingLevel] = useState<boolean>(false);

  useEffect(() => {
    let skills = character.skills;

    if (filterByTrainingLevel) {
      skills = skills.filter((skill) => skill.trainingLevel !== 'none');
    }
    console.log(skills);
    setFilteredSkills(skills);
  }, [character.skills, filterByTrainingLevel]);

  return (
    <div
      className="overflow-y-auto font-inter max-h-[87vh] "
      style={{
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      }}
    >
      <table className="w-full text-base ">
        <thead className="border-0 text-center px-3 ">
          <tr className="text-lg text-white/30 ">
            <th className="text-center px-2 font-extralight">Perícia</th>
            <th className="text-center px-2 font-extralight">Atributo</th>
            <th
              className={`text-center px-2 font-extralight cursor-pointer ${
                filterByTrainingLevel ? 'text-primary underline' : ''
              }`}
              onClick={() => setFilterByTrainingLevel(!filterByTrainingLevel)}
            >
              Treinamento
            </th>
            <th className="text-center px-2 font-extralight">Bônus</th>
          </tr>
        </thead>
        <tbody>
          {filteredSkills.map((skill: SkillCharacter, index: number) => (
            <tr key={index} className="text-center  font-extralight">
              <td className="text-start px-2  flex items-center space-x-5">
                <FaDiceD20 className="text-primary mt-1" />
                <span>{skill.name}</span>
              </td>
              <td className="text-center px-2">({formatAtribute(skill.atribute)})</td>
              <td className="text-center px-2">{formatTrainingLevels(skill.trainingLevel)}</td>
              <td className="text-center px-2">({skill.value})</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
