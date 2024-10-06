import { z } from 'zod';
import { Input } from '../../../../components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { updateCurrentStat } from '../../../../api/fetch/character';
import { useCharacter } from '../../character-page';

interface StatsProps {
  current_value: number;
  max_value: number;
  type: 'HP' | 'PE' | 'SAN';
}

const updateStatsScehema = z.object({
  value: z.coerce.number().positive().gt(0),
});

type UpdateStats = z.infer<typeof updateStatsScehema>;
export default function StatsInfo({ current_value, max_value, type }: StatsProps) {
  const { register, handleSubmit, reset } = useForm<UpdateStats>({
    resolver: zodResolver(updateStatsScehema),
  });

  const [positive, setPositive] = useState<boolean>(true);
  const [updatedCurrentValue, setUpdatedCurrentValue] = useState<number>(current_value);

  const { character } = useCharacter();
  async function onSubmit(data: UpdateStats) {
    const value = positive ? data.value : -data.value;

    if (updatedCurrentValue + value > max_value) {
      setUpdatedCurrentValue(max_value);
      await updateCurrentStat(character.id, max_value, type);
    } else if (updatedCurrentValue + value < 0) {
      setUpdatedCurrentValue(0);
      await updateCurrentStat(character.id, 0, type);
    } else {
      setUpdatedCurrentValue(updatedCurrentValue + value);
      await updateCurrentStat(character.id, updatedCurrentValue + value, type);
    }

    reset();
  }
  return (
    <div className="flex  items-center space-x-5 justify-between">
      <h1 className="font-normal text-primary">{type}</h1>
      <div className="text-2xl border border-primary font-light flex items-center pr-2  gap-x-2">
        <form onSubmit={handleSubmit(onSubmit)} className="flex  items-center  h-fit w-16  justify-center relative">
          <div className="flex justify-start  items-center -left-4">
            <button onClick={() => setPositive(false)} className="bg-[#FF4343] text-2xl text-black text-center font-extrabold flex items-center absolute justify-center rounded-full w-4 h-4">
              <div className="w-[50%] h-[1px] bg-black"></div>
            </button>
          </div>
          <Input type="text" {...register('value')} placeholder="0" className="text-center focus-visible:ring-0 focus-visible:ring-offset-0 border-0 border-r border-primary  " />
          <div className="flex justify-end items-center">
            <button onClick={() => setPositive(true)} className="bg-[#75FF69] text-xl absolute text-black text-center font-extralight flex items-center justify-center rounded-full w-4 h-4">
              +
            </button>
          </div>
        </form>
        {updatedCurrentValue} <span className="font-extrabold text-3xl ">/</span> {max_value}
      </div>
    </div>
  );
}
