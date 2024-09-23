import { useQuery } from '@tanstack/react-query';
import { DialogOverlay, DialogPortal } from '../../../components/ui/dialog';
import { getSkillByName } from '../../../api/fetch/skills';
import { SkillCharacter } from '../../../types/skills';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { spawn } from 'child_process';

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
      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
          className={
            'fixed flex font-inter py-5 border-primary text-foreground top-0 left-0 overflow-y-auto h-[99%] max-h-[99%] mt-1  w-1/3  z-50  gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg'
          }
          style={{
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
        >
          <div className="flex flex-col space-y-5">
            <div className="flex flex-col">
              <h2 className="text-3xl font-bold">{skillInfo.name}</h2>
              <div className="flex flex-col text-base underline font-oswald font-extralight">
                {skillInfo.carry_peanalty && <span>Penalidade de Carga</span>}
                {skillInfo.needs_kit && <span>Precisa de Kit</span>}
                {skillInfo.only_trained && <span>Apenas Treinado</span>}
              </div>
            </div>
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
          </div>
          <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPortal>
    )
  );
}
