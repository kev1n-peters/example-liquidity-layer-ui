import { ChainInfo } from "../utils/consts";
import {
  MenuItem,
  ListItemIcon,
  ListItemText,
  OutlinedTextFieldProps,
  TextField,
  Box,
} from "@mui/material";

const createChainMenuItem = ({ id, name, logo }: ChainInfo) => (
  <MenuItem key={id} value={id}>
    <ListItemIcon sx={{ minWidth: 40 }}>
      <img src={logo} alt={name} height={24} width={24} />
    </ListItemIcon>
    <ListItemText>{name}</ListItemText>
  </MenuItem>
);

interface ChainSelectProps extends OutlinedTextFieldProps {
  chains: ChainInfo[];
}

export default function ChainSelect({ chains, ...rest }: ChainSelectProps) {
  return (
    <TextField select {...rest}>
      {chains.map((chain) => createChainMenuItem(chain))}
    </TextField>
  );
}
