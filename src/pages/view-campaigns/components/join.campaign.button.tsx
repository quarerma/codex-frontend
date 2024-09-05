import { Button } from '../../../components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../components/ui/dialog';
import { Input } from '../../../components/ui/input';

export default function JoinCampaignButton() {
  return (
    <Dialog>
      <DialogTrigger className="text-foreground  h-full text-2xl font-semibold px-10 py-1 rounded-xl hover:bg-primary-foreground bg-dark-bg-secondary border-[1px] border-primary">
        Entrar em uma campanha
      </DialogTrigger>
      <DialogContent className="text-foreground border-primary">
        <DialogHeader>
          <DialogTitle className="p-2 mb-5 text-3xl">Participar de uma Campanha</DialogTitle>
          <DialogDescription className="space-y-5 flex flex-col items-center">
            <Input type="text" placeholder="Código da Campanha" />
            <Input type="password" placeholder="Senha" />
          </DialogDescription>
          <DialogFooter className="flex w-full flex-col items-center px-10">
            <div className="w-full flex  items-center justify-between pt-5">
              <DialogClose className="text-xl">
                <Button type="button" variant="secondary" className="rounded-2xl text-xl">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" className="text-xl rounded-2xl">
                Participar
              </Button>
            </div>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
