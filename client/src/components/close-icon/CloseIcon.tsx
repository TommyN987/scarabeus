import CloseIcon from '@mui/icons-material/Close';

import { CloseButtonProps } from '../../types/types';

export const CloseButton = (props: CloseButtonProps) => {
  
  const { onClick } = props;

  return (
    <CloseIcon 
      sx={{
        position: 'absolute',
        top: '1.5rem',
        right: '1.5rem',
        cursor: 'pointer'
      }}
      onClick={() => onClick()}
    />
  )
}