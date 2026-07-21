import { ThemedLayout, ThemedTitleV2 } from "@refinedev/antd";
import Header from "./header";

const Layout = ({ children }: React.PropsWithChildren) => {
    return (
        <ThemedLayout
            Header={Header}
            Title={(props) => (
                <ThemedTitleV2 {...props} text="AdminMica" />
            )}
        >
            {children}
        </ThemedLayout>
    );
};

export default Layout;