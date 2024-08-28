import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Atributes, CharacterUpgrade } from '../../../types/character-upgrades';
import { equipmentProficience } from '../../../types/class';

interface UpgradeListProps {
  selectedCharacterUpgrades: { label: string; value: CharacterUpgrade; require: string }[];
  handleRemoveUpgrade: (type: string) => void;
}

interface TextInputProps {
  value: CharacterUpgrade;
  onChange: (value: string) => void;
}

interface NumberInputProps {
  value: CharacterUpgrade;
  onChange: (value: number) => void;
}

const UpgradeList: React.FC<UpgradeListProps> = ({ selectedCharacterUpgrades, handleRemoveUpgrade }) => {
  return (
    <ol className="mt-2 ml-5">
      {selectedCharacterUpgrades.map((upgrade) => (
        <li key={upgrade.value.type} className="flex flex-col">
          <div className="flex items-center w-full mt-2">
            <span className="text-xl text-secondary-foreground mr-2">{upgrade.label}</span>
            <div className="flex items-center ml-auto">
              {upgrade.require === 'number' ? (
                <div className="w-full flex justify-end">
                  <NumberInput
                    value={upgrade.value}
                    onChange={(value) => {
                      upgrade.value.upgradeValue = value;
                    }}
                  />
                </div>
              ) : upgrade.require === 'string' ? (
                <TextInput
                  value={upgrade.value}
                  onChange={(value) => {
                    upgrade.value.upgradeTarget = value;
                  }}
                />
              ) : (
                upgrade.require === 'both' && (
                  <div className="flex items-center justify-end space-x-2">
                    <TextInput
                      value={upgrade.value}
                      onChange={(value) => {
                        upgrade.value.upgradeTarget = value;
                      }}
                    />
                    <NumberInput
                      value={upgrade.value}
                      onChange={(value) => {
                        upgrade.value.upgradeValue = value;
                      }}
                    />
                  </div>
                )
              )}
              <Button
                size="sm"
                variant="link"
                onClick={() => handleRemoveUpgrade(upgrade.value.type)}
                className="text-[0.7rem] text-primary ml-auto"
              >
                Remover
              </Button>
            </div>
          </div>
          <div className="h-[1px] bg-muted mt-2"></div>
        </li>
      ))}
    </ol>
  );
};

export default UpgradeList;

function NumberInput({ value, onChange }: NumberInputProps) {
  return (
    <Input
      placeholder="Valor"
      type="number"
      className="p-2 h-full w-[40%] ml-auto  border-2 bg-card border-border rounded "
      onChange={(e) => {
        onChange(parseInt(e.target.value));
      }}
    />
  );
}

function TextInput({ value, onChange }: TextInputProps) {
  const atributes = Atributes;
  const proficiencies = equipmentProficience;
  switch (value.type) {
    case 'ATRIBUTO':
      return (
        <select
          className="p-2 border-2  bg-card border-border rounded ml-auto "
          onChange={(e) => {
            onChange(e.target.value);
          }}
        >
          {atributes.map((atribute) => (
            <option key={atribute.value} value={atribute.value}>
              {atribute.label}
            </option>
          ))}
        </select>
      );
    case 'PROFICIENCIA':
      return (
        <select
          className="p-2 border-2  bg-card border-border rounded ml-5 "
          onChange={(e) => {
            onChange(e.target.value);
          }}
        >
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
