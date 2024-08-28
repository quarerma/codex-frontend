import { useEffect, useState } from 'react';
import { Button } from '../../../components/ui/button';
import { Atributes, CharacterUpgrade } from '../../../types/character-upgrades';
import { Input } from '../../../components/ui/input';
import { equipmentProficience } from '../../../types/class';

interface UpgradeLineProps {
  value: {
    label: string;
    require: string;
    value: {
      upgradeValue?: number;
      upgradeTarget?: string;
      type: string;
    };
  };
  handleRemoveUpgrade: (type: string) => void;
  setPendingUpgrades: React.Dispatch<React.SetStateAction<{ label: string; value: CharacterUpgrade }[]>>;
}

interface TextInputProps {
  value: CharacterUpgrade;
  onChange: (value: string) => void;
  setIsModified: React.Dispatch<React.SetStateAction<boolean>>;
}

interface NumberInputProps {
  value: CharacterUpgrade;
  onChange: (value: number) => void;
  setIsModified: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UpgradeLine({ value, handleRemoveUpgrade, setPendingUpgrades }: UpgradeLineProps) {
  const [isModified, setIsModified] = useState(false);
  useEffect(() => {
    if (!isModified) return;
    setIsModified(false);
    switch (value.require) {
      case 'number':
        if (!value.value.upgradeValue) {
          const pending = {
            label: value.label,
            value: value.value,
          };
          setPendingUpgrades((prev) => [...prev, pending]);
        }
        break;
      case 'string':
        if (!value.value.upgradeTarget) {
          const pending = {
            label: value.label,
            value: value.value,
          };
          setPendingUpgrades((prev) => [...prev, pending]);
        }
        break;
      case 'both':
        if (!value.value.upgradeTarget || !value.value.upgradeValue) {
          const pending = {
            label: value.label,
            value: value.value,
          };
          setPendingUpgrades((prev) => [...prev, pending]);
        }
        break;

      default:
        break;
    }
  }, [value, isModified]);
  return (
    <div className="flex items-center w-full mt-2">
      <span className="text-xl text-secondary-foreground mr-2">{value.label}</span>
      <div className="flex items-center ml-auto">
        {value.require === 'number' ? (
          <div className="w-full flex justify-end">
            <NumberInput
              setIsModified={setIsModified}
              value={value.value}
              onChange={(upgradeValue) => {
                setPendingUpgrades((prev) =>
                  prev.map((item) =>
                    item.value.type === value.value.type ? { ...item, value: { ...item.value, upgradeValue } } : item
                  )
                );
              }}
            />
          </div>
        ) : value.require === 'string' ? (
          <TextInput
            setIsModified={setIsModified}
            value={value.value}
            onChange={(upgradeTarget) => {
              setPendingUpgrades((prev) =>
                prev.map((item) =>
                  item.value.type === value.value.type ? { ...item, value: { ...item.value, upgradeTarget } } : item
                )
              );
            }}
          />
        ) : (
          value.require === 'both' && (
            <div className="flex items-center justify-end space-x-2">
              <TextInput
                setIsModified={setIsModified}
                value={value.value}
                onChange={(upgradeTarget) => {
                  setPendingUpgrades((prev) =>
                    prev.map((item) =>
                      item.value.type === value.value.type ? { ...item, value: { ...item.value, upgradeTarget } } : item
                    )
                  );
                }}
              />
              <NumberInput
                setIsModified={setIsModified}
                value={value.value}
                onChange={(upgradeValue) => {
                  setPendingUpgrades((prev) =>
                    prev.map((item) =>
                      item.value.type === value.value.type ? { ...item, value: { ...item.value, upgradeValue } } : item
                    )
                  );
                }}
              />
            </div>
          )
        )}
        <Button
          size="sm"
          variant="link"
          onClick={() => handleRemoveUpgrade(value.value.type)}
          className="text-[0.7rem] text-primary ml-auto"
        >
          Remover
        </Button>
      </div>
      <div className="h-[1px] bg-muted mt-2"></div>
    </div>
  );
}

function NumberInput({ value, onChange, setIsModified }: NumberInputProps) {
  const [inputValue, setInputValue] = useState<number>();
  useEffect(() => {
    value.upgradeValue = inputValue;
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

function TextInput({ value, onChange, setIsModified }: TextInputProps) {
  const atributes = Atributes;
  const proficiencies = equipmentProficience;
  switch (value.type) {
    case 'ATRIBUTO':
      const [selectedAtribute, setSelectedAtribute] = useState<string>('');

      useEffect(() => {
        value.upgradeTarget = selectedAtribute;
        setIsModified(true);
      }, [selectedAtribute]);
      return (
        <select
          className="p-2 border-2  bg-card border-border rounded ml-auto "
          onChange={(e) => setSelectedAtribute(e.target.value as string)}
        >
          <option value="default" disabled>
            Atributos
          </option>
          {atributes.map((atribute) => (
            <option key={atribute.value} value={atribute.value}>
              {atribute.label}
            </option>
          ))}
        </select>
      );
    case 'PROFICIENCIA':
      const [selectedProficiency, setSelectedProficiency] = useState<string>('');

      useEffect(() => {
        value.upgradeTarget = selectedProficiency;
        setIsModified(true);
      }, [selectedProficiency]);
      return (
        <select
          value={selectedProficiency}
          className="p-2 border-2  bg-card border-border rounded ml-5 "
          onChange={(e) => setSelectedProficiency(e.target.value as string)}
        >
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
      return (
        <Input
          placeholder={value.type}
          className="p-2 border-2 w-[50%] bg-card border-border rounded ml-5 "
          onChange={(e) => {
            onChange(e.target.value);
          }}
        />
      );
  }
}
