import { formatAtribute, formatTrainingLevel } from '../../../../components/format/formatters';
import { DialogContent, DialogHeader, DialogTitle } from '../../../../components/ui/dialog';
import { SkillCharacter } from '../../../../types/skills';

interface SkillCheckDeatilProps {
  skill: SkillCharacter;
  roll?: { max: number; details: { [key: number]: { die: string; rolls: number[] } } };
}

export default function SkillCheckDetailed({ skill, roll }: SkillCheckDeatilProps) {
  return (
    <DialogContent className="text-foreground font-romannew  flex font-light flex-col items-start ">
      <DialogHeader>
        <DialogTitle className="font-light text-4xl pt-5">
          Detalhes da rolagem de <span className="font-bold">{skill.name}</span>
        </DialogTitle>
      </DialogHeader>
      <div className="text-3xl flex flex-col gap-y-2 w-full">
        <div>
          <h1>Atributo Utilizado: {formatAtribute(skill.atribute)?.label}</h1>
        </div>
        {roll && (
          <div>
            {Object.entries(roll.details).map(([key, value]) => (
              <div key={key}>
                <h2 className="font-extrabold">
                  {value.die} = [{value.rolls.join(', ')}]
                </h2>
              </div>
            ))}
          </div>
        )}
        <div className="mt-2">
          <h1 className="font-semibold">Modificador: +{skill.value}</h1>
          <div>
            <ul className="list-disc list-inside">
              <li>Grau de treinamento +{formatTrainingLevel(skill.trainingLevel)?.mod}</li>
              {skill.alterations.map((alteration, index) => (
                <li key={index}>
                  {alteration.featName && (
                    <span>
                      {alteration.featName} +{alteration.value}
                    </span>
                  )}
                  {alteration.itemName && (
                    <span>
                      {alteration.itemName} +{alteration.value}
                    </span>
                  )}
                  {alteration.modificationName && (
                    <span>
                      {alteration.modificationName} +{alteration.value}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {roll?.max && <h1 className="text-4xl font-extrabold  text-end">Total: {roll.max}</h1>}
      </div>
    </DialogContent>
  );
}
