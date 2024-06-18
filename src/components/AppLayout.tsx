import React, { ReactNode } from 'react';
import { Layout } from 'antd';

const { Content, Footer } = Layout;

interface AppLayoutProps {
    children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
    return (
        <Layout>
            <Content>
                <div>
                    {children}
                </div>
            </Content>
            <Footer style={{ textAlign: 'center', backgroundColor: '#800000', color: 'white', flexShrink: 0}}>
                React Coding Assignment ©{new Date().getFullYear()} Avelios Medical
            </Footer>
        </Layout>
    );
};

export default AppLayout;
