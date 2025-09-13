import React from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in" aria-label="About Loomé">
        {/* Hero */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-heading font-medium mb-6">About Loomé</h1>
          <p className="text-xl text-muted-foreground text-balance leading-relaxed">
            Where timeless elegance meets contemporary sophistication. 
            A brand rooted in the old money aesthetic, celebrating the art of understated luxury.
          </p>
        </section>

        {/* Brand Story */}
        <section className="mb-16">
          <h2 className="text-3xl font-heading font-medium mb-8 text-center">Our Story</h2>
          
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
            <p className="text-lg leading-relaxed">
              Loomé was born from a simple yet profound belief: true elegance is timeless. 
              In a world of fast fashion and fleeting trends, we choose to honor the traditions 
              of fine craftsmanship and enduring style.
            </p>
            
            <p className="text-lg leading-relaxed">
              Our name, <em>Loomé</em>, pays homage to the loom—the fundamental tool that has woven 
              together human civilization and sartorial expression for millennia. It represents 
              our commitment to the artisanal process, where every thread matters and every 
              detail serves a purpose.
            </p>
            
            <p className="text-lg leading-relaxed">
              Drawing inspiration from the old money aesthetic, we create pieces that transcend 
              seasonal trends. Our philosophy is simple: <strong>Minimal. Classic. Eternal.</strong> 
              Each garment is designed to be a lifetime companion, growing more beautiful with age 
              and wear.
            </p>
          </div>
        </section>

        {/* Philosophy */}
        <section className="mb-16 bg-accent/5 rounded-lg p-8">
          <h2 className="text-3xl font-heading font-medium mb-8 text-center">Our Philosophy</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-accent font-heading font-bold">M</span>
              </div>
              <h3 className="font-heading font-medium mb-3">Minimal</h3>
              <p className="text-sm text-muted-foreground">
                Embracing the power of simplicity. Every element serves a purpose, 
                every line has meaning.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-accent font-heading font-bold">C</span>
              </div>
              <h3 className="font-heading font-medium mb-3">Classic</h3>
              <p className="text-sm text-muted-foreground">
                Rooted in timeless design principles that have defined elegance 
                across generations.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-accent font-heading font-bold">E</span>
              </div>
              <h3 className="font-heading font-medium mb-3">Eternal</h3>
              <p className="text-sm text-muted-foreground">
                Creating pieces that transcend time, becoming more precious 
                with each passing year.
              </p>
            </div>
          </div>
        </section>

        {/* Craftsmanship */}
        <section className="mb-16">
          <h2 className="text-3xl font-heading font-medium mb-8 text-center">Craftsmanship Excellence</h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-xl font-heading font-medium mb-4">Premium Materials</h3>
              <p className="text-muted-foreground mb-6">
                We source the finest fabrics from renowned mills, selecting only materials 
                that meet our exacting standards for quality, durability, and comfort.
              </p>
              
              <h3 className="text-xl font-heading font-medium mb-4">Artisanal Techniques</h3>
              <p className="text-muted-foreground mb-6">
                Every garment is crafted using time-honored tailoring techniques, 
                combining traditional methods with modern precision for unparalleled quality.
              </p>
              
              <h3 className="text-xl font-heading font-medium mb-4">Sustainable Approach</h3>
              <p className="text-muted-foreground">
                We believe in responsible luxury, choosing sustainable practices and 
                creating pieces designed to last generations, not seasons.
              </p>
            </div>
            
            <div className="bg-secondary/20 rounded-lg p-8 text-center">
              <div className="text-4xl font-heading font-light mb-4 text-accent">100%</div>
              <p className="text-sm text-muted-foreground mb-6">
                Premium quality materials sourced from the world's finest textile mills
              </p>
              
              <div className="text-4xl font-heading font-light mb-4 text-accent">∞</div>
              <p className="text-sm text-muted-foreground">
                Timeless design philosophy that transcends fleeting fashion trends
              </p>
            </div>
          </div>
        </section>

        {/* Legacy */}
        <section className="text-center bg-primary/5 rounded-lg p-12">
          <h2 className="text-3xl font-heading font-medium mb-6">Building a Legacy</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto text-balance">
            Loomé is more than clothing—it's a statement of values. We're building a legacy 
            of conscious luxury, where style, substance, and sustainability converge to create 
            something truly extraordinary.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/shop">Explore Collection</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-accent text-accent hover:bg-accent/10">
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default About;