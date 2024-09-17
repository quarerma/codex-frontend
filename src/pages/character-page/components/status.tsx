import { Character } from '../../../types/character';
import { User } from '../../../types/user';
interface StatusProps {
  character: Character;
  user: User;
}
export default function Status({ character, user }: StatusProps) {
  return (
    <div className="flex flex-col w-fit items-start left-0 ">
      <div className="flex flex-col pr-32 w-fit border-r border-primary">
        <div className="flex items-center justify-center gap-x-5">
          <div className="w-[80px] h-[80px] rounded-full bg-[#D9D9D9]/60"></div>
          <span className="text-4xl font-medium">{character?.name}</span>
        </div>
        <h1 className="font-extralight text-2xl text-center mt-5">
          Criado por: {character?.owner.id !== user?.id ? 'Você' : `${character?.owner.username}`}
        </h1>
      </div>
      <div className="mt-20 text-4xl flex flex-col space-y-10">
        <div className="flex space-x-10">
          <div className="flex flex-col items-center space-y-2 justify-center">
            <h1 className="font-normal text-primary">HP</h1>
            <div className="text-3xl font-light flex items-center gap-x-2">
              {character?.current_health} <span className="font-extrabold text-4xl ">/</span> {character?.max_health}
            </div>
          </div>
          <div className="flex flex-col items-center space-y-2 justify-center">
            <h1 className="font-normal text-primary">PE</h1>
            <div className="text-3xl font-light  flex items-center gap-x-2">
              {character?.current_effort} <span className="font-extrabold text-4xl ">/</span> {character?.max_effort}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
