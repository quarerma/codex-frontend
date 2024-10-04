import { useQuery } from '@tanstack/react-query';
import { DialogOverlay, DialogPortal } from '../../../components/ui/dialog';
import { getSkillByName } from '../../../api/fetch/skills';
import { SkillCharacter } from '../../../types/skills';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { spawn } from 'child_process';
import { SheetContent, SheetDescription, SheetTitle } from '../../../components/ui/sheet';

interface SkillModalProps {
  skill: SkillCharacter;
}

export default function SkillModal({ skill }: SkillModalProps) {
  const { data: skillInfo, isLoading } = useQuery({
    queryKey: ['skill', skill.name],
    queryFn: async () => {
      const response = await getSkillByName(skill.name);
      return response;
    },
  });

  if (isLoading) {
    return null;
  }
  return (
    skillInfo && (
      <SheetContent
        side={'left'}
        className={
          'min-w-[600px] flex font-inter py-5 border-primary text-foreground overflow-y-auto z-50 gap-4 border-r bg-background p-6 shadow-lg duration-200 sm:rounded-lg'
        }
        style={{
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      >
        <div className="flex  flex-col space-y-5 ">
          <div className="flex flex-col">
            <SheetTitle>
              <h2 className="text-3xl font-bold">{skillInfo.name}</h2>
            </SheetTitle>
            <div className="flex flex-col text-sm underline text-muted-foreground font-oswald font-normal">
              {skillInfo.carry_peanalty && <span>Penalidade de Carga</span>}
              {skillInfo.needs_kit && <span>Precisa de Kit</span>}
              {skillInfo.only_trained && <span>Apenas Treinado</span>}
            </div>
          </div>
          <SheetDescription className="text-foreground pb-10">
            <p className="text-lg" dangerouslySetInnerHTML={{ __html: skillInfo.description }}></p>
            {skill.alterations.length > 0 && (
              <div className="pb-10">
                <h1 className="text-xl font-bold italic text-center py-2">Modificações na Perícia</h1>
                {skill.alterations.map((alteration, index) => (
                  <div key={index} className="font-extralight">
                    {alteration.featName && (
                      <span>
                        Poder: {alteration.featName}, Bônus: +{alteration.value}
                      </span>
                    )}
                    {alteration.itemName && (
                      <span>
                        Equipamento: {alteration.itemName}, Bônus: +{alteration.value}
                      </span>
                    )}
                    {alteration.modificationName && (
                      <span>
                        Modificação: {alteration.modificationName}, Bônus: +{alteration.value}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </SheetDescription>
        </div>
      </SheetContent>
    )
  );
}
