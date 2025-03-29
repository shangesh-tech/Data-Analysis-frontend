
import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { 
  Send, 
  Bot, 
  User,
  PlusCircle,
  FileText,
  MessageSquare,
  Calendar,
  Clock,
  Trash2,
  Sparkle
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
}

interface Conversation {
  id: string;
  title: string;
  date: Date;
  messages: Message[];
}

interface Document {
  id: string;
  name: string;
  type: string;
  date: Date;
}

const AIInsights = () => {
  const location = useLocation();
  const [projectName, setProjectName] = useState("AI Insights");
  const [thinking, setThinking] = useState(false);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "conv1",
      title: "Sales Performance Analysis",
      date: new Date(Date.now() - 86400000 * 2),
      messages: [
        { role: "user", content: "What are the key factors affecting our sales performance?", timestamp: new Date(Date.now() - 86400000 * 2) },
        { role: "assistant", content: "Based on the analysis of your sales data, the key factors affecting your performance include: seasonal trends with Q4 showing 28% higher conversion rates, price sensitivity in the mid-tier product range, and underperforming marketing channels like social media ads (12% lower ROI compared to email).", timestamp: new Date(Date.now() - 86400000 * 2) }
      ]
    },
    {
      id: "conv2",
      title: "Customer Segment Analysis",
      date: new Date(Date.now() - 86400000 * 5),
      messages: [
        { role: "user", content: "Can you analyze our customer segments?", timestamp: new Date(Date.now() - 86400000 * 5) },
        { role: "assistant", content: "Your customer base is divided into 4 main segments: Enterprise (15% of customers, 42% of revenue), SMB (35% of customers, 30% of revenue), Individual Professional (40% of customers, 25% of revenue), and Educational (10% of customers, 3% of revenue). The Enterprise segment shows the highest growth potential with a 22% year-over-year increase in average order value.", timestamp: new Date(Date.now() - 86400000 * 5) }
      ]
    }
  ]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("conversations");
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const [documents, setDocuments] = useState<Document[]>([
    { id: "doc1", name: "Q1_Sales_Report.xlsx", type: "Excel", date: new Date(Date.now() - 86400000 * 3) },
    { id: "doc2", name: "Customer_Data_2023.csv", type: "CSV", date: new Date(Date.now() - 86400000 * 10) },
    { id: "doc3", name: "Marketing_Campaign_Results.pdf", type: "PDF", date: new Date(Date.now() - 86400000 * 20) }
  ]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [showSelectionScreen, setShowSelectionScreen] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const mockResponses = [
    "Based on the sales data, I can see that your highest performing product category is Electronics, with a 28% contribution to overall revenue. However, the Fashion category has shown the strongest growth at 15.3% year-over-year.",
    "Looking at your customer segmentation data, the Enterprise segment represents only 12% of your customer base but contributes to 35% of your total revenue. This suggests an opportunity to focus more marketing efforts on this high-value segment.",
    "Your sales data indicates a clear seasonal pattern with peaks in November-December and a smaller peak in July-August. This suggests you should plan inventory and marketing campaigns around these peak periods.",
    "I've analyzed your regional performance and found that the North America region has the highest average order value at $156, while the Asia-Pacific region shows the fastest growth rate at 22.5% year-over-year.",
    "Based on your conversion funnel data, I can see that the cart abandonment rate is 68%, which is above industry average. The biggest drop-off happens at the payment information stage, suggesting a potential usability issue."
  ];

  // Scroll to bottom of chat on new message
  useEffect(() => {
    if (messagesEndRef.current) {
      scrollToBottom();
    }
  }, [messages]);

  useEffect(() => {
    // Get project information from URL parameters if available
    const params = new URLSearchParams(location.search);
    const name = params.get('name');
    
    if (name) {
      setProjectName(`${name} - AI Insights`);
    }
  }, [location.search]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const startNewChat = () => {
    setSelectedConversation(null);
    setSelectedDocument(null);
    setMessages([]);
    setShowSelectionScreen(true);
  };

  const selectConversation = (id: string) => {
    const conversation = conversations.find(conv => conv.id === id);
    if (conversation) {
      setSelectedConversation(id);
      setSelectedDocument(null);
      setMessages(conversation.messages);
      setShowSelectionScreen(false);
    }
  };

  const selectDocument = (id: string) => {
    const document = documents.find(doc => doc.id === id);
    if (document) {
      setSelectedDocument(id);
      setSelectedConversation(null);
      toast.success(`Selected document: ${document.name}`);
      
      // Add a system message about the selected document
      setMessages([{ 
        role: "system", 
        content: `I've loaded the document "${document.name}". What would you like to know about this data?`, 
        timestamp: new Date() 
      }]);
      
      setShowSelectionScreen(false);
      
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add user message to chat
    const newMessage: Message = {
      role: "user",
      content: message,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setMessage("");
    setThinking(true);
    
    // Simulate AI response
    setTimeout(() => {
      // Choose a random response from the mock responses
      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      
      const aiResponse: Message = {
        role: "assistant",
        content: randomResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setThinking(false);
      
      // Save to conversation history if it's a new conversation
      if (!selectedConversation) {
        const newConversationId = `conv-${Date.now()}`;
        const newTitle = message.length > 30 ? `${message.substring(0, 30)}...` : message;
        
        const newConversation = {
          id: newConversationId,
          title: newTitle,
          date: new Date(),
          messages: [newMessage, aiResponse]
        };
        
        setConversations(prev => [newConversation, ...prev]);
        setSelectedConversation(newConversationId);
      } else {
        // Update existing conversation
        setConversations(prev => 
          prev.map(conv => 
            conv.id === selectedConversation 
              ? { ...conv, messages: [...conv.messages, newMessage, aiResponse] } 
              : conv
          )
        );
      }
    }, 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const deleteConversation = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setConversations(prev => prev.filter(conv => conv.id !== id));
    if (selectedConversation === id) {
      setSelectedConversation(null);
      setMessages([]);
      setShowSelectionScreen(true);
    }
  };

  const getSamplePrompts = () => [
    "What are my top-performing products this quarter?",
    "Analyze our customer churn rate and suggest improvements",
    "Show me sales trends for the last 6 months",
    "Identify underperforming marketing channels"
  ];

  // Selection screen component
  const SelectionScreen = () => (
    <div className="container mx-auto max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">AI Insights Assistant</h1>
        <Button 
          onClick={startNewChat} 
          className="bg-gradient-to-r from-dashboard-blue to-dashboard-purple hover:from-dashboard-purple hover:to-dashboard-blue"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          <span>New Chat</span>
        </Button>
      </div>
      
      <Tabs defaultValue="conversations" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 mx-auto mb-8">
          <TabsTrigger value="conversations">Recent Conversations</TabsTrigger>
          <TabsTrigger value="documents">Available Documents</TabsTrigger>
        </TabsList>
        
        <TabsContent value="conversations" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card 
              className="cursor-pointer hover:shadow-md transition-shadow border-primary/20 hover:border-primary/50"
              onClick={() => {
                setSelectedDocument(null);
                setSelectedConversation(null);
                setMessages([]);
                setShowSelectionScreen(false);
              }}
            >
              <CardContent className="flex flex-col items-center justify-center p-6 h-full min-h-[200px]">
                <div className="w-12 h-12 bg-gradient-to-r from-dashboard-blue to-dashboard-purple rounded-full flex items-center justify-center mb-4">
                  <PlusCircle className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-medium text-lg mb-2">Start New Conversation</h3>
                <p className="text-muted-foreground text-center text-sm">
                  Ask questions about your business data
                </p>
              </CardContent>
            </Card>
            
            {conversations.map(conversation => (
              <Card 
                key={conversation.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => selectConversation(conversation.id)}
              >
                <CardHeader className="pb-2 relative group">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => deleteConversation(conversation.id, e)}
                  >
                    <Trash2 className="h-3 w-3 text-muted-foreground" />
                  </Button>
                  <CardTitle className="text-base truncate pr-6">
                    {conversation.title}
                  </CardTitle>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{formatDate(conversation.date)}</span>
                  </div>
                </CardHeader>
                <CardContent className="pb-4">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {conversation.messages[conversation.messages.length - 1].content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="documents" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {documents.map(document => (
              <Card 
                key={document.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => selectDocument(document.id)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center">
                    <div className="bg-primary/10 p-2 rounded mr-2">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base truncate">
                        {document.name}
                      </CardTitle>
                      <div className="flex items-center justify-between mt-1">
                        <Badge variant="outline">{document.type}</Badge>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{formatDate(document.date)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-4">
                  <p className="text-sm text-muted-foreground">
                    Click to analyze this document with AI
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-8">
        <h2 className="text-xl font-medium mb-4">Sample Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {getSamplePrompts().map((prompt, i) => (
            <Button 
              key={i} 
              variant="outline" 
              className="justify-start text-left h-auto py-3 px-4"
              onClick={() => {
                setSelectedDocument(null);
                setSelectedConversation(null);
                setMessages([]);
                setShowSelectionScreen(false);
                setTimeout(() => {
                  setMessage(prompt);
                  setTimeout(() => {
                    handleSendMessage();
                  }, 100);
                }, 100);
              }}
            >
              <MessageSquare className="h-4 w-4 mr-2 flex-shrink-0 text-primary" />
              <span>{prompt}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );

  // Chat interface component
  const ChatInterface = () => (
    <div className="flex flex-col h-[calc(100vh-12rem)]">
      <div className="flex items-center justify-between pb-4 border-b mb-4">
        <div className="flex items-center">
          <Avatar className="h-8 w-8 mr-3">
            <AvatarFallback className="bg-gradient-to-r from-dashboard-blue to-dashboard-purple text-white">
              <Bot className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-medium">AI Data Assistant</h2>
            {selectedDocument && (
              <div className="flex items-center text-xs text-muted-foreground">
                <span>Analyzing: </span>
                <Badge variant="outline" className="ml-1 text-xs font-normal">
                  {documents.find(d => d.id === selectedDocument)?.name}
                </Badge>
              </div>
            )}
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={startNewChat}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          New Chat
        </Button>
      </div>
      
      <ScrollArea className="flex-1 pr-4">
        <div className="space-y-6">
          {messages.map((msg, index) => (
            <div key={index} className={`mb-6 ${msg.role === 'system' ? 'mx-auto max-w-3xl' : ''}`}>
              {msg.role === 'system' ? (
                <div className="flex items-center p-4 bg-muted/50 rounded-lg">
                  <div className="bg-primary/10 p-2 rounded-full mr-4">
                    <Bot className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{msg.content}</p>
                  </div>
                </div>
              ) : (
                <div className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <Avatar className={`h-8 w-8 flex-shrink-0 ${msg.role === 'user' ? 'ml-3' : 'mr-3'}`}>
                      {msg.role === 'user' ? (
                        <AvatarFallback className="bg-primary/10 text-primary">
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      ) : (
                        <AvatarFallback className="bg-gradient-to-r from-dashboard-blue to-dashboard-purple text-white">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <div className={`px-4 py-3 rounded-lg ${
                        msg.role === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                      }`}>
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                      </div>
                      <div className={`text-xs text-muted-foreground mt-1 flex items-center ${
                        msg.role === 'user' ? 'justify-end' : ''
                      }`}>
                        <Clock className="h-3 w-3 mr-1" />
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {thinking && (
            <div className="flex justify-start mb-6">
              <div className="flex max-w-[80%]">
                <Avatar className="h-8 w-8 mr-3">
                  <AvatarFallback className="bg-gradient-to-r from-dashboard-blue to-dashboard-purple text-white">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="px-4 py-3 rounded-lg bg-muted flex items-center">
                    <div className="flex space-x-1 items-center">
                      <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                      <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                      <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      <div className="pt-4 border-t mt-4">
        <form 
          className="flex items-center w-full gap-2" 
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
        >
          <div className="relative flex-1">
            <Input 
              placeholder="Ask me about your business data..." 
              value={message}
              ref={inputRef}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pr-10 py-6 rounded-full"
              disabled={thinking}
            />
            <Button 
              type="submit"
              size="icon" 
              className="absolute right-1 top-1 h-8 w-8 rounded-full"
              disabled={!message.trim() || thinking}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <DashboardLayout title={projectName}>
      {showSelectionScreen ? (
        <SelectionScreen />
      ) : (
        <ChatInterface />
      )}
    </DashboardLayout>
  );
};

export default AIInsights;
