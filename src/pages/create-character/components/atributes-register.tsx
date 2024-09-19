import { useEffect, useState } from 'react';
import { CreateComponentProps } from '../props/create-component';
import { Checkbox } from '../../../components/ui/checkbox';
import { AiFillQuestionCircle } from 'react-icons/ai';
import * as Dialog from '@radix-ui/react-dialog';

export default function AtributesRegister({ setValue, watch }: CreateComponentProps) {
  const [useLevelCap, setUseLevelCap] = useState(true);
  const [points, setPoints] = useState(9);
  const [summary, setSummary] = useState(
    watch('strenght') + watch('intelligence') + watch('vitality') + watch('dexterity') + watch('presence')
  );

  useEffect(() => {
    const level = watch('level');
    if (level >= 20) {
      setPoints(10);
    }
    if (level >= 50) {
      setPoints(11);
    }
    if (level >= 85) {
      setPoints(12);
    }
    if (level >= 95) {
      setPoints(13);
    }
  }, [watch('level')]);

  const handleDecrement = (attribute: string) => {
    const value = watch(attribute);
    const attributes = ['strenght', 'intelligence', 'vitality', 'dexterity', 'presence'];

    const countOfAtributesEqualToZero = attributes.filter((attr) => watch(attr) === 0).length;

    // Se o valor do atributo atual for maior que 0 e não houver mais de um atributo com valor 0, decremente.
    if (value > 0 && (countOfAtributesEqualToZero < 1 || watch(attribute) > 1)) {
      setValue(attribute, value - 1);
      setSummary(summary - 1);
    }
  };

  const handleIncrement = (attribute: string) => {
    const value = watch(attribute);
    const level = watch('level');
    if (
      (((level >= 5 && value < 3) || (level >= 50 && value < 5) || (level >= 20 && value < 4)) && summary < points) ||
      !useLevelCap
    ) {
      setSummary(summary + 1);
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
        <div className="flex -mt-5 -mb-5 items-center gap-x-2">
          <h1>
            Pontos disponíveis: {summary} / {points}
          </h1>
          <Dialog.Root>
            <div className="relative flex items-center">
              <Dialog.Trigger className="text-primary text-xl cursor-pointer">
                <AiFillQuestionCircle />
              </Dialog.Trigger>
              <Dialog.Content className="absolute top-0 w-[300px] left-full ml-2 p-4 bg-black border border-primary rounded-2xl shadow-lg">
                <p className="text-lg">
                  O sistema conta com aumento automático de atributos provenientes de itens, maldições e poderes.
                  Portanto é recomendado que você não adicione manualmente pontos que não os garantidos por nível.
                </p>
              </Dialog.Content>
            </div>
          </Dialog.Root>
        </div>
        {renderAttribute('Força', 'strenght')}
        {renderAttribute('Agilidade', 'dexterity')}
        {renderAttribute('Intelecto', 'intelligence')}
        {renderAttribute('Vigor', 'vitality')}
        {renderAttribute('Presença', 'presence')}
        <div className="-mt-10 -mb-5 flex gap-x-5 items-center text-lg font-light">
          <Checkbox defaultChecked={true} onCheckedChange={(value) => setUseLevelCap(Boolean(value))} />
          Usar valores recomendados (recomendado)
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
