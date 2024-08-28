import { CharacterUpgrade } from '../../../types/character-upgrades';
import UpgradeLine from './upgradeLine';

interface UpgradeListProps {
  selectedCharacterUpgrades: { label: string; value: CharacterUpgrade; require: string }[];
  handleRemoveUpgrade: (type: string) => void;
  setPendingUpgrades: React.Dispatch<React.SetStateAction<{ label: string; value: CharacterUpgrade }[]>>;
}

const UpgradeList: React.FC<UpgradeListProps> = ({
  selectedCharacterUpgrades,
  handleRemoveUpgrade,
  setPendingUpgrades,
}) => {
  return (
    <ol className="mt-2 ml-5">
      {selectedCharacterUpgrades.map((upgrade) => (
        <li key={upgrade.value.type} className="flex flex-col">
          <UpgradeLine
            value={upgrade}
            handleRemoveUpgrade={handleRemoveUpgrade}
            setPendingUpgrades={setPendingUpgrades}
          />
        </li>
      ))}
    </ol>
  );
};

export default UpgradeList;
