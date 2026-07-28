import { Popover, Button } from "antd";
import React from "react";

const CurrentUser = () => {
    return (
        <Popover
            placement="bottomRight"
            trigger="click"
            content={<div>Hello World</div>}
            overlayInnerStyle={{ padding: 0 }}
            overlayStyle={{ zIndex: 999 }}
        >
            <Button type="text">TEST</Button>
        </Popover>
    );
};

export default CurrentUser;