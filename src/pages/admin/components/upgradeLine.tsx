import { useEffect, useState } from 'react';
import { Button } from '../../../components/ui/button';
import { Atributes, CharacterUpgrade } from '../../../types/character-upgrades';
import { Input } from '../../../components/ui/input';
import { equipmentProficience } from '../../../types/class';
import { getSkills } from '../../../api/fetch/skills';
import { useQuery } from '@tanstack/react-query';

interface UpgradeLineProps {
  upgrade: {
    label: string;
    require: string;
    value: {
      upgradeValue?: number;
      upgradeTarget?: string;
      type: string;
    };
    isCompleted: boolean;
  };
  handleRemoveUpgrade: (type: number) => void;
  index: number;
}

interface TextInputProps {
  upgrade: CharacterUpgrade;
  onChange: (value: string) => void;
  setIsModified: React.Dispatch<React.SetStateAction<boolean>>;
}

interface NumberInputProps {
  upgrade: CharacterUpgrade;
  onChange: (value: number) => void;
  setIsModified: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UpgradeLine({ upgrade, handleRemoveUpgrade, index }: UpgradeLineProps) {
  const [isModified, setIsModified] = useState(false);
  useEffect(() => {
    if (!isModified) return;
    setIsModified(false);
    switch (upgrade.require) {
      case 'number':
        if (!upgrade.value.upgradeValue) {
          upgrade.isCompleted = false;
        } else {
          upgrade.isCompleted = true;
        }
        break;
      case 'string':
        if (!upgrade.value.upgradeTarget) {
          upgrade.isCompleted = false;
        } else {
          upgrade.isCompleted = true;
        }
        break;
      case 'both':
        if (!upgrade.value.upgradeValue || !upgrade.value.upgradeTarget) {
          upgrade.isCompleted = false;
        } else {
          upgrade.isCompleted = true;
        }
        break;

      default:
        break;
    }
  }, [upgrade, isModified]);
  return (
    <div className="flex flex-col items-center w-full mt-2">
      <div className="flex items-center w-full">
        <span className="text-3xl text-secondary-foreground mr-2">{upgrade.label}</span>
        <div className="flex items-center ml-auto">
          {upgrade.require === 'number' ? (
            <div className="w-full flex justify-end">
              <NumberInput
                setIsModified={setIsModified}
                upgrade={upgrade.value}
                onChange={(value) => {
                  upgrade.value.upgradeValue = value;
                }}
              />
            </div>
          ) : upgrade.require === 'string' ? (
            <TextInput
              setIsModified={setIsModified}
              upgrade={upgrade.value}
              onChange={(value) => {
                upgrade.value.upgradeTarget = value;
              }}
            />
          ) : upgrade.require === 'both' ? (
            <div className="flex items-center justify-end space-x-2">
              <TextInput
                setIsModified={setIsModified}
                upgrade={upgrade.value}
                onChange={(value) => {
                  upgrade.value.upgradeTarget = value;
                }}
              />
              <NumberInput
                setIsModified={setIsModified}
                upgrade={upgrade.value}
                onChange={(value) => {
                  upgrade.value.upgradeValue = value;
                }}
              />
            </div>
          ) : (
            ((upgrade.isCompleted = true), (<div></div>))
          )}
          <Button
            size="sm"
            variant="link"
            // remova pelo index
            onClick={() => handleRemoveUpgrade(index)}
            className="text-[0.7rem] text-primary ml-auto"
          >
            Remover
          </Button>
        </div>
      </div>
      <div className="h-[1px] w-full bg-muted mt-2"></div>
    </div>
  );
}

function NumberInput({ upgrade, setIsModified }: NumberInputProps) {
  const [inputValue, setInputValue] = useState<number>();
  useEffect(() => {
    upgrade.upgradeValue = inputValue;
    setIsModified && setIsModified(true);
  }, [inputValue]);
  return (
    <Input
      placeholder="Valor"
      type="number"
      className="p-2 h-full w-[40%] ml-auto  border-2 bg-card border-border rounded "
      onChange={(e) => {
        setInputValue(Number(e.target.value));
      }}
    />
  );
}

function TextInput({ upgrade, setIsModified }: TextInputProps) {
  const atributes = Atributes;
  const proficiencies = equipmentProficience;
  switch (upgrade.type) {
    case 'ATRIBUTO':
      const [selectedAtribute, setSelectedAtribute] = useState<string>('');

      useEffect(() => {
        upgrade.upgradeTarget = selectedAtribute;
        setIsModified(true);
      }, [selectedAtribute]);
      return (
        <select value={selectedAtribute} className="p-2 border-2  bg-card border-border rounded ml-auto " onChange={(e) => setSelectedAtribute(e.target.value as string)}>
          <option value="" disabled>
            Atributos
          </option>
          {atributes.map((atribute) => (
            <option key={atribute.value} value={atribute.value}>
              {atribute.label}
            </option>
          ))}
        </select>
      );
    case 'PERICIA':
      const [selectedSkill, setSelectedSkill] = useState<string>('');

      const { data: skills = [] } = useQuery({
        queryKey: ['skills'],
        queryFn: getSkills,
      });

      useEffect(() => {
        upgrade.upgradeTarget = selectedSkill;
        setIsModified(true);
      }, [selectedSkill]);

      return (
        <select value={selectedSkill} className="p-2 border-2  bg-card border-border rounded ml-5 " onChange={(e) => setSelectedSkill(e.target.value as string)}>
          <option value="" disabled>
            Perícias
          </option>
          {skills.map((skill, index) => (
            <option key={index} value={skill.name}>
              {skill.name}
            </option>
          ))}
        </select>
      );
      break;
    case 'PROFICIENCIA':
      const [selectedProficiency, setSelectedProficiency] = useState<string>('');

      useEffect(() => {
        upgrade.upgradeTarget = selectedProficiency;
        setIsModified(true);
      }, [selectedProficiency]);
      return (
        <select value={selectedProficiency} className="p-2 border-2  bg-card border-border rounded ml-5 " onChange={(e) => setSelectedProficiency(e.target.value as string)}>
          <option value="" disabled>
            Proficiências
          </option>
          {proficiencies.map((proficiency) => (
            <option key={proficiency.value} value={proficiency.value}>
              {proficiency.label}
            </option>
          ))}
        </select>
      );

    default:
      const [inputValue, setInputValue] = useState<string>();
      useEffect(() => {
        upgrade.upgradeTarget = inputValue;
        setIsModified(true);
      }, [inputValue]);
      return (
        <Input
          placeholder={upgrade.type}
          className="p-2 border-2 w-[50%] bg-card border-border rounded ml-5 "
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
      );
  }
}
