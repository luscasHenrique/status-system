import React, { createContext, useContext, useState } from 'react';
import { Sidebar } from '../../components/Sidebar';

interface SidebarProps {
  content: string | React.ReactNode;
  title: string;
}

interface SidebarContextProps {
  onShowSidebar: (sidebarProps: SidebarProps) => void;
  onCloseSidebar: () => void;
}

const defaultValue: SidebarContextProps = {
  onShowSidebar: () => {
    throw new Error('onShowSidebar must be defined.');
  },
  onCloseSidebar: () => {
    throw new Error('onShowSidebar must be defined.');
  },
};

const SidebarContext = createContext(defaultValue);

interface SidebarProviderProps {
  children: React.ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({
  children,
}) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [contentSidebar, setContentSidebar] = useState<
    string | React.ReactNode
  >('');
  const [showTitle, setShowTitle] = useState('');

  const onShowSidebar = ({ content, title }: SidebarProps) => {
    setContentSidebar(content);
    setShowSidebar(true);
    setShowTitle(title);
  };

  const onCloseSidebar = () => {
    setShowSidebar(false);
  };

  return (
    <SidebarContext.Provider value={{ onShowSidebar, onCloseSidebar }}>
      <Sidebar
        visible={showSidebar}
        content={contentSidebar}
        onSetVisible={setShowSidebar}
        title={showTitle}
      />
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
