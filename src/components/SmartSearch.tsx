import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, Sparkles, FileText, School, Zap, Loader2 } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface SearchResult {
  type: "page" | "school" | "feature";
  title: string;
  description: string;
  path?: string;
  relevance: number;
}

interface SmartSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const SmartSearch = ({ isOpen, onClose }: SmartSearchProps) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [suggestion, setSuggestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("recentSearches");
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Debounced search
  const performSearch = useCallback(async (searchQuery: string) => {
    if (searchQuery.trim().length < 2) {
      setResults([]);
      setSuggestion("");
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("smart-search", {
        body: { query: searchQuery },
      });

      if (error) {
        console.error("Search error:", error);
        toast.error("حدث خطأ في البحث");
        return;
      }

      if (data.error) {
        toast.error(data.error);
        return;
      }

      setResults(data.results || []);
      setSuggestion(data.suggestion || "");
    } catch (err) {
      console.error("Search error:", err);
      toast.error("حدث خطأ في البحث");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        performSearch(query);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query, performSearch]);

  const handleResultClick = (result: SearchResult) => {
    // Save to recent searches
    const newRecent = [query, ...recentSearches.filter((s) => s !== query)].slice(0, 5);
    setRecentSearches(newRecent);
    localStorage.setItem("recentSearches", JSON.stringify(newRecent));

    if (result.path) {
      navigate(result.path);
      onClose();
    }
  };

  const handleRecentSearch = (search: string) => {
    setQuery(search);
    performSearch(search);
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setSuggestion("");
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "page":
        return <FileText className="w-4 h-4" />;
      case "school":
        return <School className="w-4 h-4" />;
      case "feature":
        return <Zap className="w-4 h-4" />;
      default:
        return <Search className="w-4 h-4" />;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "page":
        return <Badge variant="secondary">صفحة</Badge>;
      case "school":
        return <Badge className="bg-primary/10 text-primary">مدرسة</Badge>;
      case "feature":
        return <Badge className="bg-accent/10 text-accent-foreground">ميزة</Badge>;
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0 gap-0 overflow-hidden">
        {/* Search Header */}
        <div className="flex items-center gap-3 p-4 border-b border-border">
          <div className="flex items-center gap-2 text-primary">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-medium">بحث ذكي</span>
          </div>
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث في كل محتوى التطبيق..."
              className="pr-10 pl-10 bg-muted/50 border-none focus-visible:ring-1"
              autoFocus
            />
            {query && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-1 top-1/2 -translate-y-1/2 h-7 w-7"
                onClick={clearSearch}
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Search Results */}
        <div className="max-h-[400px] overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
              <span className="mr-2 text-muted-foreground">جاري البحث بالذكاء الاصطناعي...</span>
            </div>
          ) : results.length > 0 ? (
            <div className="p-2">
              {results.map((result, index) => (
                <button
                  key={index}
                  onClick={() => handleResultClick(result)}
                  className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors text-right"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    {getTypeIcon(result.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{result.title}</span>
                      {getTypeBadge(result.type)}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {result.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <Badge variant="outline" className="text-xs">
                      {result.relevance}%
                    </Badge>
                  </div>
                </button>
              ))}

              {/* AI Suggestion */}
              {suggestion && (
                <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="flex items-center gap-2 text-primary mb-1">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-sm font-medium">اقتراح ذكي</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{suggestion}</p>
                </div>
              )}
            </div>
          ) : query.length >= 2 ? (
            <div className="py-12 text-center">
              <Search className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
              <p className="text-muted-foreground">لم يتم العثور على نتائج</p>
              <p className="text-sm text-muted-foreground/70 mt-1">جرب البحث بكلمات مختلفة</p>
            </div>
          ) : (
            <div className="p-4">
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">عمليات البحث الأخيرة</h4>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((search, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleRecentSearch(search)}
                        className="text-xs"
                      >
                        {search}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">اقتراحات سريعة</h4>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "الجدول الدراسي", path: "/schedule" },
                    { label: "الحضور والغياب", path: "/attendance" },
                    { label: "الواجبات", path: "/homework" },
                    { label: "الرسوم الدراسية", path: "/fees" },
                  ].map((item) => (
                    <Button
                      key={item.path}
                      variant="ghost"
                      size="sm"
                      className="justify-start"
                      onClick={() => {
                        navigate(item.path);
                        onClose();
                      }}
                    >
                      <FileText className="w-4 h-4 ml-2" />
                      {item.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-border bg-muted/30 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>مدعوم بالذكاء الاصطناعي</span>
          </div>
          <div className="flex items-center gap-2">
            <kbd className="px-2 py-0.5 bg-background rounded border text-xs">ESC</kbd>
            <span>للإغلاق</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SmartSearch;
