import { Avatar as AntdAvatar, AvatarProps } from "antd"

type props = AvatarProps & {
    name: string;
}

const CustomAvatar = ({name, style, ...rest}: props) => {
  return (
    <AntdAvatar
    alt="Martin Sure"
    size="small"
    style={{backgroundColor:"#87d068",
        display: 'flex',
        alignItems: 'center',
        border: 'none'
    }}

    >
      {name}
    </AntdAvatar>
  )
}

export default CustomAvatar
