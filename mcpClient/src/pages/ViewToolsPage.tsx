import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Moon, Sun, Plus, Settings, Shield, Unlock, Lock } from 'lucide-react';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
// import { data } from 'react-router-dom';

// TypeScript interfaces
interface Tool {
  id: string;
  name: string;
  description?: string;
}

interface BackendResponse {
  msg?: string;
  available_tools?: Tool[];
  unavailable_tools?: Tool[];
  err?: string;
}

interface Theme {
  isDark: boolean;
}

interface ToolCardProps {
  tool: Tool;
  isAvailable: boolean;
  theme: Theme;
  onAddTool: (toolId: string) => void;
}

// Mock backend response


// Custom hook for theme management
const useTheme = (): [Theme, () => void] => {
  const [isDark, setIsDark] = useState<boolean>(false);

  const theme: Theme = { isDark };

  const toggleTheme = (): void => {
    setIsDark(prev => !prev);
  };

  return [theme, toggleTheme];
};



// Tool card component
const ToolCard: React.FC<ToolCardProps> = ({ tool, isAvailable, theme, onAddTool }) => {
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const handleAddTool = async (): Promise<void> => {
    if (!isAvailable) return;
    
    setIsAdding(true);
    try {
      await new Promise<void>(resolve => setTimeout(resolve, 800));
      onAddTool(tool.id);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Card className="group transition-all duration-200 hover:shadow-md border-border/50 flex flex-col h-full">
      <CardHeader className="pb-3 flex-1">
        <div className="space-y-3">
          <div className="flex items-start justify-end">
            <Badge 
              variant={isAvailable ? "default" : "secondary"} 
              className={`text-xs ${
                isAvailable 
                  ? "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400" 
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {isAvailable ? (
                <>
                  <Unlock className="w-3 h-3 mr-1" />
                  Available
                </>
              ) : (
                <>
                  <Lock className="w-3 h-3 mr-1" />
                  Restricted
                </>
              )}
            </Badge>
          </div>
          
          <div>
            <CardTitle className="text-sm font-mono text-foreground leading-tight break-words mb-2">
              {tool.name}
            </CardTitle>
            {tool.description && (
              <CardDescription className="text-xs line-clamp-3">
                {tool.description}
              </CardDescription>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 mt-auto">
        <Button
          onClick={handleAddTool}
          disabled={!isAvailable || isAdding}
          size="sm"
          variant={isAvailable ? "default" : "secondary"}
          className="w-full text-xs"
        >
          {isAdding ? (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
              Adding...
            </div>
          ) : (
            isAvailable ? 'Add This Tool' : 'Access Denied'
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

// Stats component
interface StatsCardProps {
  title: string;
  count: number;
  icon: React.ReactNode;
  description: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, count, icon, description }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{count}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

// Main tools page component
const ToolsPage: React.FC = () => {
  const [backendData, setBackendData] = useState<BackendResponse>({
    available_tools: [],
    unavailable_tools: [],
    msg: ""
  });
  const [theme, toggleTheme] = useTheme();
  const [isCreatingServer, setIsCreatingServer] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("available");
  const session = Cookies.get("session");

  // Simulate loading data from backend
  useEffect(() => {
    const loadData = async () => {


     try {
      // Simulate API call
      const res = await fetch(`http://localhost:4006/fetch-tools`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({session : session}),    
        });
        const data = await res.json();
        // console.log(JSON.stringify(data))

        if(data.err){
          toast.error(data.err);
        }
        else{
          setBackendData(data);}
    } catch (error : any) {
      alert(error)
      console.log( JSON.stringify(error))
    } 
    };
    loadData();
  }, []);

  const handleAddTool = (toolId: string): void => {
    console.log(`Tool ${toolId} added successfully!`);
    // Here you would typically make an API call to add the tool
  };

  const handleCreateMCPServer = async (): Promise<void> => {
    setIsCreatingServer(true);
    try {
      await new Promise<void>(resolve => setTimeout(resolve, 1500));
      console.log('MCP Server creation initiated!');
    } finally {
      setIsCreatingServer(false);
    }
  };

  const totalTools = backendData.available_tools.length + backendData.unavailable_tools.length;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme.isDark 
        ? 'dark bg-gray-900' 
        : 'bg-gray-50'
    }`}>
      <div className="bg-background text-foreground min-h-screen">
        {/* Header */}
        <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center">
            <div className="mr-4 flex items-center">
              <Settings className="mr-2 h-6 w-6" />
              <span className="font-bold text-lg">Tools Management</span>
            </div>
            
            <div className="flex flex-1 items-center justify-between space-x-4 md:justify-end">
              <div className="w-full flex-1 md:w-auto md:flex-none">
                <Button
                  onClick={handleCreateMCPServer}
                  disabled={isCreatingServer}
                  className="w-full md:w-auto"
                >
                  {isCreatingServer ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Creating Server...
                    </div>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Create MCP Server
                    </>
                  )}
                </Button>
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="h-9 w-9"
              >
                {theme.isDark ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
                <span className="sr-only">Toggle theme</span>
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Overview */}
          <div className="grid gap-6 md:grid-cols-3 mb-12 max-w-4xl mx-auto">
            <StatsCard
              title="Total Tools"
              count={totalTools}
              icon={<Settings className="h-4 w-4 text-muted-foreground" />}
              description="Available and restricted tools"
            />
            <StatsCard
              title="Available"
              count={backendData.available_tools.length}
              icon={<Unlock className="h-4 w-4 text-green-500" />}
              description="Ready to use tools"
            />
            <StatsCard
              title="Restricted"
              count={backendData.unavailable_tools.length}
              icon={<Shield className="h-4 w-4 text-amber-500" />}
              description="Access permission required"
            />
          </div>

          <div className="max-w-4xl mx-auto">
            <Separator className="mb-12" />

            {/* Tools Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="grid grid-cols-2 max-w-[400px] w-full">
                  <TabsTrigger value="available" className="flex items-center gap-2">
                    <Unlock className="h-4 w-4" />
                    Available ({backendData.available_tools.length})
                  </TabsTrigger>
                  <TabsTrigger value="restricted" className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Restricted ({backendData.unavailable_tools.length})
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="available" className="mt-8">
                <div className="mb-8 text-center">
                  <h3 className="text-2xl font-semibold mb-2">Available Tools</h3>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Tools you have access to and can add to your workspace.
                  </p>
                </div>
                
                {backendData.available_tools.length === 0 ? (
                  <div className="max-w-md mx-auto">
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center py-16">
                        <Unlock className="h-16 w-16 text-muted-foreground mb-6" />
                        <h3 className="text-xl font-semibold mb-3">No Available Tools</h3>
                        <p className="text-sm text-muted-foreground text-center">
                          There are no tools currently available to you. Contact your administrator for access.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {backendData.available_tools.map((tool) => (
                      <ToolCard
                        key={tool.id}
                        tool={tool}
                        isAvailable={true}
                        theme={theme}
                        onAddTool={handleAddTool}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="restricted" className="mt-8">
                <div className="mb-8 text-center">
                  <h3 className="text-2xl font-semibold mb-2">Restricted Tools</h3>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Tools that require additional permissions or access rights.
                  </p>
                </div>
                
                {backendData.unavailable_tools.length === 0 ? (
                  <div className="max-w-md mx-auto">
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center py-16">
                        <Shield className="h-16 w-16 text-muted-foreground mb-6" />
                        <h3 className="text-xl font-semibold mb-3">All Tools Available</h3>
                        <p className="text-sm text-muted-foreground text-center">
                          You have access to all available tools in the system.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {backendData.unavailable_tools.map((tool) => (
                      <ToolCard
                        key={tool.id}
                        tool={tool}
                        isAvailable={false}
                        theme={theme}
                        onAddTool={handleAddTool}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ToolsPage;