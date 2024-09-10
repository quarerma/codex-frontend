import { useEffect, useState } from 'react';
import { CreateComponentProps } from '../props/create-component';
import { Checkbox } from '../../../components/ui/checkbox';

export default function AtributesRegister({ register, setValue, watch }: CreateComponentProps) {
  useEffect(() => {
    console.log(watch('strenght'), watch('intelligence'), watch('vigor'), watch('agility'), watch('presence'));
  }, [watch('strenght'), watch('intelligence'), watch('vigor'), watch('agility'), watch('presence')]);

  const [useLevelCap, setUseLevelCap] = useState(true);

  const handleDecrement = (attribute: string) => {
    const value = watch(attribute);
    if (value > 0) {
      setValue(attribute, value - 1);
    }
  };

  const handleIncrement = (attribute: string) => {
    const value = watch(attribute);
    const summary =
      watch('strenght') + watch('intelligence') + watch('vitality') + watch('dexterity') + watch('presence');
    console.log(summary);
    if ((value < 3 && summary < 9) || useLevelCap) {
      // Assuming max is 3
      setValue(attribute, value + 1);
    }
  };

  const renderAttribute = (label: string, attribute: string) => (
    <div className="flex justify-between items-center space-x-10 w-full">
      <div className="flex flex-col items-center space-y-1 w-1/3">
        <h1 className="text-5xl">{label.substring(0, 3).toUpperCase()}</h1>
        <h2 className="text-center  text-lg font-extralight ">{label}</h2>
      </div>

      <div className="flex justify-center items-center space-x-5 w-1/3">
        <button
          onClick={() => handleDecrement(attribute)}
          className="bg-[#FF4343] text-2xl text-black text-center font-extrabold flex items-center justify-center rounded-full w-6 h-6"
        >
          <div className="w-[50%] h-[1px] bg-black"></div>
        </button>
        <button
          onClick={() => handleIncrement(attribute)}
          className="bg-[#75FF69] text-4xl text-black text-center font-extralight flex items-center justify-center rounded-full w-6 h-6"
        >
          +
        </button>
      </div>

      <div className="w-1/3 flex justify-end">
        <div className="w-20 h-20 text-5xl border border-primary rounded-full flex items-center justify-center">
          <h1>{watch(attribute)}</h1>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex ">
      <div className="flex flex-col space-y-10 font-extralight mr-auto">
        {renderAttribute('Força', 'strenght')}
        {renderAttribute('Agilidade', 'dexterity')}
        {renderAttribute('Intelecto', 'intelligence')}
        {renderAttribute('Vigor', 'vitality')}
        {renderAttribute('Presença', 'presence')}
        <div className="-mt-10 -mb-5 flex gap-x-5 items-center text-lg font-light">
          <Checkbox onCheckedChange={(value) => setUseLevelCap(Boolean(value))} />
          Não usar valores recomendados (não recomendado)
        </div>
      </div>
      <p className="font-normal h-full flex mt-20 ml-auto mr-auto leading-10 text-center w-[40%] text-4xl">
        Quando você cria um personagem, todos os seus atributos começam em 1 e você recebe 4 pontos para distribuir
        entre eles como quiser. Você também pode reduzir um atributo para 0 para receber 1 ponto adicional. O valor
        máximo inicial que você pode ter em cada atributo é 3.
      </p>
    </div>
  );
}
