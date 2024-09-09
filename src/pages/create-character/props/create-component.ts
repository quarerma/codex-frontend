import { UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';

export interface CreateComponentProps {
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
  setValue: UseFormSetValue<any>;
}
