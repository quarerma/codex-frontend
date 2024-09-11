import { useState } from 'react';
import { Origin } from '../../../types/origin';
import { CreateComponentProps } from '../props/create-component';

interface OriginProps {
  origin: Origin;
  setValue: CreateComponentProps['setValue']; // Tipando o setValue corretamente
}

export default function OriginPick({ origin, setValue }: OriginProps) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className="text-center  w-full cursor-pointer bg-dark-bg-secondary border border-primary p-5"
    >
      <div className="text-3xl text-bold">{origin.name}</div>
      {expanded && (
        <div className="text-start flex flex-col space-y-5">
          <div>
            <h3 className="font-bold">Descrição:</h3>
            <p className="text-base" dangerouslySetInnerHTML={{ __html: origin.description }}></p>
          </div>
          <div>
            <h1 className="text-xl font-bold">Perícias Treinadas</h1>
            <ul className="list-disc list-inside">
              {origin.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className="text-xl font-bold">Poder de Origem</h1>
            <label className="flex space-x-3">
              <h1>{origin.feats.name}:</h1>
              <h1 dangerouslySetInnerHTML={{ __html: origin.feats.description }}></h1>
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
