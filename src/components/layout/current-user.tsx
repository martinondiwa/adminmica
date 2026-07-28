import { Popover, Button } from "antd";
import React from "react";
import CustomAvatar from "../custom-avatar";

const CurrentUser = () => {
    return (
        <Popover
            placement="bottomRight"
            trigger="click"
            content={<div>Hello World</div>}
            overlayInnerStyle={{ padding: 0 }}
            overlayStyle={{ zIndex: 999 }}
        >
            <CustomAvatar/>
        </Popover>
    );
};

export default CurrentUser;