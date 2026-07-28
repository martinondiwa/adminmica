import { Avatar as AntdAvatar } from "antd"

const CustomAvatar = () => {
  return (
    <AntdAvatar
    alt="Martin Sure"
    size="small"
    style={{backgroundColor:"#87d068",
        display: 'flex',
        alignItems: 'center'
    }}

    >
      MS
    </AntdAvatar>
  )
}

export default CustomAvatar
