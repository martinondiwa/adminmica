import { getNameInitials } from "@/utilities";
import { Avatar as AntdAvatar, AvatarProps } from "antd"

type props = AvatarProps & {
    name?: string;
}

const CustomAvatar = ({name, style, ...rest}: props) => {
  return (
    <AntdAvatar
    alt="Martin Sure"
    size="small"
    style={{backgroundColor:"#89d269fd",
        display: 'flex',
        alignItems: 'center',
        border: 'none',
        ...style
    }}
   {...rest}
    >
      {getNameInitials(name || '')}
    </AntdAvatar>
  )
}

export default CustomAvatar
