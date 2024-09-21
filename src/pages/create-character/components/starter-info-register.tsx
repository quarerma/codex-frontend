import { CreateComponentProps } from '../props/create-component';

import { patent } from '../../../types/patent';

export default function StarterInfoRegister({ register, watch }: CreateComponentProps) {
  // Cria um array de níveis de 5 em 5 até 99
  const levels = Array.from({ length: 19 }, (_, i) => (i + 1) * 5).concat(99);

  return (
    <div className="flex text-[32px] -ml-32  font-inter font-extralight flex-col justify-center items-center -mt-10 space-y-10">
      <div className="flex flex-col justify-center items-center space-y-5">
        <h1>Nome</h1>
        <input
          {...register('name')}
          placeholder="Nome do personagem"
          className="text-3xl bg-transparent border-0 border-muted outline-none py-2 text-white/20 placeholder:text-white/20 text-center border-b-2"
        />
      </div>
      <div className="flex flex-col justify-center items-center space-y-5">
        <h1>Nível</h1>
        <select
          defaultValue={watch('level')}
          className={`px-5 py-2 rounded-2xl text-white/20 border bg-card outline-none  ml-5`}
          {...register('level')}
        >
          {levels?.map((level, index) => (
            <option key={index} value={level} className="text-lg">
              {level}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col justify-center items-center space-y-5">
        <h1>Patente</h1>
        <select
          className={`px-5 py-2 rounded-2xl text-white/20 border bg-card outline-none  ml-5`}
          {...register('patent')}
        >
          {patent?.map((patent, index) => (
            <option key={index} value={patent.value} className="text-lg">
              {patent.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
