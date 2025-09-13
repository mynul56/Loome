import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[60vh] flex items-center justify-center animate-fade-in" aria-label="404 Page Not Found">
        <div className="text-center space-y-6">
          <h1 className="text-6xl font-heading font-light text-muted-foreground">404</h1>
          <div className="space-y-4">
            <h2 className="text-3xl font-heading font-medium">Page Not Found</h2>
            <p className="text-lg text-muted-foreground max-w-md mx-auto text-balance">
              The page you're looking for seems to have wandered off. 
              Let us guide you back to elegance.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <a href="/">Return Home</a>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-accent text-accent hover:bg-accent/10">
              <a href="/shop">Browse Collection</a>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
