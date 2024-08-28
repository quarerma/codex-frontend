import { CharacterUpgrade } from '../../../types/character-upgrades';
import UpgradeLine from './upgradeLine';

interface UpgradeListProps {
  selectedCharacterUpgrades: { label: string; value: CharacterUpgrade; require: string; isCompleted: boolean }[];
  handleRemoveUpgrade: (type: number) => void;
}

const UpgradeList: React.FC<UpgradeListProps> = ({ selectedCharacterUpgrades, handleRemoveUpgrade }) => {
  return (
    <ol className="mt-2 ml-5">
      {selectedCharacterUpgrades.map((upgrade, index) => (
        <li key={index} className="flex flex-col">
          <UpgradeLine upgrade={upgrade} handleRemoveUpgrade={handleRemoveUpgrade} index={index} />
        </li>
      ))}
    </ol>
  );
};

export default UpgradeList;
