import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Moon, Sun, Plus, Settings, Shield, Unlock, Lock, Search, Filter, X, Check, Server } from 'lucide-react';
import Cookies from 'js-cookie';
import { toast, Toaster } from 'sonner';

// TypeScript interfaces
interface Tool {
  id: string;
  name: string;
  description?: string;
}

interface BackendResponse {
  available_tools: Tool[];
  unavailable_tools: Tool[];
}

interface Theme {
  isDark: boolean;
}

interface ToolCardProps {
  tool: Tool;
  isAvailable: boolean;
  theme: Theme;
  isSelected: boolean;
  onToggleTool: (toolId: string, isAdding: boolean) => void;
}

// Mock backend response
const mockBackendData: BackendResponse = {
  available_tools: [
    { id: '1', name: 'fetch_marks_of_all_students', description: 'Retrieve academic records for all enrolled students' },
    { id: '2', name: 'create_a_student', description: 'Add new student to the system' },
    { id: '3', name: 'delete_student_record', description: 'Remove student data from database' },
    { id: '4', name: 'send_notification_to_parents', description: 'Send automated messages to parent contacts' },
    { id: '5', name: 'export_student_data', description: 'Generate downloadable student reports' },
  ],
  unavailable_tools: [
    { id: '6', name: 'update_student_details', description: 'Modify existing student information' },
    { id: '7', name: 'generate_report_card', description: 'Create comprehensive academic reports' },
    { id: '8', name: 'calculate_grade_averages', description: 'Compute statistical grade analysis' },
    { id: '9', name: 'backup_database', description: 'Create system backup copies' },
    { id: '10', name: 'schedule_exam_reminder', description: 'Automate examination notifications' },
  ]
};

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
const ToolCard: React.FC<ToolCardProps> = ({ tool, isAvailable, theme, isSelected, onToggleTool }) => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleToggleTool = async (): Promise<void> => {
    if (!isAvailable) return;

    setIsProcessing(true);
    try {
      await new Promise<void>(resolve => setTimeout(resolve, 800));
      onToggleTool(tool.id, !isSelected);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className={`group transition-all duration-200 hover:shadow-md border-border/50 flex flex-col h-full ${
      isSelected ? 'ring-2 ring-primary' : ''
    }`}>
      <CardHeader className="pb-3 flex-1">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div>
              {isSelected && (
                <Badge className="bg-primary text-primary-foreground mb-2">
                  <Check className="w-3 h-3 mr-1" />
                  Selected
                </Badge>
              )}
            </div>
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
          onClick={handleToggleTool}
          disabled={!isAvailable || isProcessing}
          size="sm"
          variant={isSelected ? "destructive" : (isAvailable ? "default" : "secondary")}
          className="w-full text-xs"
        >
          {isProcessing ? (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
              {isSelected ? 'Removing...' : 'Adding...'}
            </div>
          ) : (
            isAvailable
              ? (isSelected ? 'Remove Tool' : 'Add This Tool')
              : 'Access Denied'
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

// MCP Server Creation Modal
interface MCPServerModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTools: Tool[];
  onConfirm: () => void;
}

const MCPServerModal: React.FC<MCPServerModalProps> = ({ isOpen, onClose, selectedTools, onConfirm }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            Create MCP Server
          </DialogTitle>
          <DialogDescription>
            Review the selected tools that will be included in your MCP server configuration.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {selectedTools.length === 0 ? (
            <div className="text-center py-8">
              <Server className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No Tools Selected</h3>
              <p className="text-sm text-muted-foreground">
                Please select at least one tool to create an MCP server.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">
                  Selected Tools ({selectedTools.length})
                </h4>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {selectedTools.map((tool) => (
                    <Card key={tool.id} className="p-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-mono font-medium">{tool.name}</p>
                          {tool.description && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {tool.description}
                            </p>
                          )}
                        </div>
                        <Badge variant="secondary" className="ml-2">
                          <Check className="w-3 h-3 mr-1" />
                          Selected
                        </Badge>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <h5 className="text-sm font-medium mb-2">Server Configuration</h5>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p>• Tools will be configured with proper access controls</p>
                  <p>• Server will be created with default security settings</p>
                  <p>• You can modify the configuration after creation</p>
                </div>
              </div>
            </>
          )}
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={selectedTools.length === 0}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create Server
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Main tools page component
const ToolsPage: React.FC = () => {
  const [backendData, setBackendData] = useState<BackendResponse>(mockBackendData);
  const [theme, toggleTheme] = useTheme();
  const [isCreatingServer, setIsCreatingServer] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("search");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedToolIds, setSelectedToolIds] = useState<string[]>([]);
  const [showMCPModal, setShowMCPModal] = useState<boolean>(false);
  const session = Cookies.get('session');

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

        if(data.err){
          toast.error(data.err);
        }
        else{
          setBackendData(data);
        }
      } catch (error : any) {
        alert(error)
        console.log( JSON.stringify(error))
      }
    };
    loadData();
  }, []);

  // Combine all tools for search
  const allTools = useMemo(() => {
    const availableWithStatus = backendData.available_tools.map(tool => ({ ...tool, isAvailable: true }));
    const restrictedWithStatus = backendData.unavailable_tools.map(tool => ({ ...tool, isAvailable: false }));
    return [...availableWithStatus, ...restrictedWithStatus];
  }, [backendData]);

  // Get selected tools
  const selectedTools = useMemo(() => {
    return allTools.filter(tool => selectedToolIds.includes(tool.id));
  }, [allTools, selectedToolIds]);

  // Filter and search tools
  const filteredTools = useMemo(() => {
    let filtered = allTools;

    // Apply status filter
    if (statusFilter === "available") {
      filtered = filtered.filter(tool => tool.isAvailable);
    } else if (statusFilter === "restricted") {
      filtered = filtered.filter(tool => !tool.isAvailable);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(tool =>
        tool.name.toLowerCase().includes(query) ||
        (tool.description && tool.description.toLowerCase().includes(query)) ||
        (tool.isAvailable ? "available" : "restricted").includes(query)
      );
    }

    return filtered;
  }, [allTools, searchQuery, statusFilter]);

  const handleToggleTool = (toolId: string, isAdding: boolean): void => {
    if (isAdding) {
      setSelectedToolIds(prev => [...prev, toolId]);
      toast.success('Tool added to selection!');
    } else {
      setSelectedToolIds(prev => prev.filter(id => id !== toolId));
      toast.success('Tool removed from selection!');
    }
  };

  const handleCreateMCPServer = (): void => {
    setShowMCPModal(true);
  };

  const handleConfirmServerCreation = async (): Promise<void> => {
    setShowMCPModal(false);
    setIsCreatingServer(true);
    try {
      await new Promise<void>(resolve => setTimeout(resolve, 2000));
      toast.success(`MCP Server created successfully with ${selectedTools.length} tools!`);
      console.log('MCP Server creation initiated with tools:', selectedTools);
      // Reset selected tools after successful creation
      setSelectedToolIds([]);
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
      <Toaster />
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
                      {selectedToolIds.length > 0 && (
                        <Badge className="ml-2 bg-primary-foreground text-primary">
                          {selectedToolIds.length}
                        </Badge>
                      )}
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
          <div className="grid gap-6 md:grid-cols-4 mb-12 max-w-5xl mx-auto">
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
            <StatsCard
              title="Selected"
              count={selectedToolIds.length}
              icon={<Check className="h-4 w-4 text-blue-500" />}
              description="Tools ready for server"
            />
          </div>

          {/* Create Server Button - Prominent placement */}
          {selectedToolIds.length > 0 && (
            <div className="max-w-4xl mx-auto mb-8">
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Ready to Create MCP Server</h3>
                      <p className="text-sm text-muted-foreground">
                        You have selected {selectedToolIds.length} tool{selectedToolIds.length !== 1 ? 's' : ''} for your MCP server configuration.
                      </p>
                    </div>
                    <Button
                      onClick={handleCreateMCPServer}
                      disabled={isCreatingServer}
                      size="lg"
                      className="flex items-center gap-2"
                    >
                      <Server className="h-4 w-4" />
                      Create Server
                      <Badge className="ml-1 bg-primary-foreground text-primary">
                        {selectedToolIds.length}
                      </Badge>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="max-w-4xl mx-auto">
            <Separator className="mb-12" />

            {/* Tools Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsContent value="search" className="mt-8">
                <div className="mb-8 text-center">
                  <h3 className="text-2xl font-semibold mb-2">All Tools</h3>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Search and filter through all available and restricted tools. Select tools to add them to your MCP server.
                  </p>
                </div>

                {/* Search and Filter Controls */}
                <div className="max-w-2xl mx-auto mb-8">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search tools by name, description, or status..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4 text-muted-foreground" />
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[140px]">
                          <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="available">Available</SelectItem>
                          <SelectItem value="restricted">Restricted</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Search Results */}
                {filteredTools.length === 0 ? (
                  <div className="max-w-md mx-auto">
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center py-16">
                        <Search className="h-16 w-16 text-muted-foreground mb-6" />
                        <h3 className="text-xl font-semibold mb-3">No Tools Found</h3>
                        <p className="text-sm text-muted-foreground text-center">
                          {searchQuery.trim() || statusFilter !== "all"
                            ? "Try adjusting your search terms or filters."
                            : "No tools are currently available in the system."}
                        </p>
                        {(searchQuery.trim() || statusFilter !== "all") && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-4"
                            onClick={() => {
                              setSearchQuery("");
                              setStatusFilter("all");
                            }}
                          >
                            Clear Filters
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <>
                    <div className="text-center mb-6">
                      <p className="text-sm text-muted-foreground">
                        Showing {filteredTools.length} of {totalTools} tools
                        {searchQuery.trim() && (
                          <span className="ml-1">
                            for "<span className="font-medium">{searchQuery}</span>"
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {filteredTools.map((tool) => (
                        <ToolCard
                          key={tool.id}
                          tool={tool}
                          isAvailable={tool.isAvailable}
                          theme={theme}
                          isSelected={selectedToolIds.includes(tool.id)}
                          onToggleTool={handleToggleTool}
                        />
                      ))}
                    </div>
                  </>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </main>

        {/* MCP Server Creation Modal */}
        <MCPServerModal
          isOpen={showMCPModal}
          onClose={() => setShowMCPModal(false)}
          selectedTools={selectedTools}
          onConfirm={handleConfirmServerCreation}
        />
      </div>
    </div>
  );
};

export default ToolsPage;