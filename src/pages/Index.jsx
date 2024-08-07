import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cat, Heart, Info, Paw, Moon, Sun, Sparkles, Camera, Share2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const Index = () => {
  const [likeCount, setLikeCount] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [catFact, setCatFact] = useState("");
  const [catFactLoading, setCatFactLoading] = useState(false);
  const [catLoverLevel, setCatLoverLevel] = useState(0);
  const [catImages, setCatImages] = useState([]);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchCatFact();
    fetchCatImages();
  }, []);

  useEffect(() => {
    const newLevel = Math.min(Math.floor(likeCount / 10), 5);
    setCatLoverLevel(newLevel);
  }, [likeCount]);

  const fetchCatFact = async () => {
    setCatFactLoading(true);
    try {
      const response = await fetch("https://catfact.ninja/fact");
      const data = await response.json();
      setCatFact(data.fact);
    } catch (error) {
      console.error("Error fetching cat fact:", error);
      toast({
        title: "Error",
        description: "Failed to fetch a cat fact. Please try again.",
        variant: "destructive",
      });
    } finally {
      setCatFactLoading(false);
    }
  };

  const fetchCatImages = async () => {
    try {
      const response = await fetch("https://api.thecatapi.com/v1/images/search?limit=5");
      const data = await response.json();
      setCatImages(data.map(img => img.url));
    } catch (error) {
      console.error("Error fetching cat images:", error);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const catLoverTitles = [
    "Curious Kitten",
    "Playful Paw",
    "Feline Friend",
    "Cat Connoisseur",
    "Whisker Wizard",
    "Legendary Cat Lover",
  ];

  const handleShare = () => {
    // Implement sharing functionality here
    toast({
      title: "Shared!",
      description: "Your love for cats has been shared with the world!",
    });
    setIsShareDialogOpen(false);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-b from-purple-200 via-pink-200 to-blue-200'}`}>
      {/* Header */}
      <header className="p-4 flex justify-between items-center backdrop-blur-md bg-white/30 dark:bg-gray-800/30 sticky top-0 z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold flex items-center">
            <Paw className="mr-2" /> Feline Fascination
          </h1>
        </motion.div>
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="text-sm">
            {catLoverTitles[catLoverLevel]} <Sparkles className="ml-1 h-3 w-3" />
          </Badge>
          <Button onClick={toggleDarkMode} variant="outline" size="icon">
            {isDarkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative h-[80vh] bg-cover bg-center" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")'}}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white max-w-4xl px-4"
          >
            <motion.h2 
              className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Discover the Wonderful World of Cats
            </motion.h2>
            <motion.p 
              className="text-xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Explore, learn, and fall in love with our feline friends
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="space-x-4"
            >
              <Button 
                onClick={fetchCatFact} 
                size="lg" 
                className="bg-purple-600 hover:bg-purple-700 transition-all duration-300 transform hover:scale-105"
                disabled={catFactLoading}
              >
                {catFactLoading ? "Fetching..." : "Get a Cat Fact"}
              </Button>
              <Button
                onClick={() => setIsShareDialogOpen(true)}
                size="lg"
                variant="outline"
                className="bg-white/20 hover:bg-white/30 text-white transition-all duration-300 transform hover:scale-105"
              >
                <Share2 className="mr-2 h-5 w-5" /> Share Your Love
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Cat Image Carousel */}
      <div className="max-w-4xl mx-auto mt-12 px-4">
        <h3 className="text-2xl font-semibold mb-4 text-center">Adorable Cat Gallery</h3>
        <Carousel className="w-full max-w-xs mx-auto">
          <CarouselContent>
            {catImages.map((image, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <img src={image} alt={`Cat ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      {/* Cat Fact Section */}
      <AnimatePresence>
        {catFact && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-3xl mx-auto mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
          >
            <h3 className="text-2xl font-semibold mb-4 flex items-center">
              <Info className="mr-2" /> Did You Know?
            </h3>
            <p className="text-lg">{catFact}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold mb-4">Your Cat Lover Journey</h2>
          <Progress value={(catLoverLevel / 5) * 100} className="w-full h-2" />
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Level {catLoverLevel + 1}: {catLoverTitles[catLoverLevel]}
          </p>
        </motion.div>
        <Tabs defaultValue="characteristics" className="mb-12">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="characteristics">Cat Characteristics</TabsTrigger>
            <TabsTrigger value="breeds">Popular Breeds</TabsTrigger>
          </TabsList>
          <TabsContent value="characteristics">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center"><Info className="mr-2" /> Characteristics of Cats</CardTitle>
                  <CardDescription>What makes cats unique and lovable?</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Independent nature with a touch of affection</li>
                    <li>Excellent hunters with sharp claws and keen senses</li>
                    <li>Flexible bodies capable of impressive acrobatics</li>
                    <li>Masters of communication through various means</li>
                    <li>Curious explorers with a love for cozy spaces</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
          <TabsContent value="breeds">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center"><Cat className="mr-2" /> Popular Cat Breeds</CardTitle>
                  <CardDescription>Explore some well-known cat breeds from around the world</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <li className="flex items-center"><img src="https://placekitten.com/100/100" alt="Siamese" className="w-10 h-10 rounded-full mr-2" /> Siamese</li>
                    <li className="flex items-center"><img src="https://placekitten.com/101/101" alt="Persian" className="w-10 h-10 rounded-full mr-2" /> Persian</li>
                    <li className="flex items-center"><img src="https://placekitten.com/102/102" alt="Maine Coon" className="w-10 h-10 rounded-full mr-2" /> Maine Coon</li>
                    <li className="flex items-center"><img src="https://placekitten.com/103/103" alt="Bengal" className="w-10 h-10 rounded-full mr-2" /> Bengal</li>
                    <li className="flex items-center"><img src="https://placekitten.com/104/104" alt="Scottish Fold" className="w-10 h-10 rounded-full mr-2" /> Scottish Fold</li>
                    <li className="flex items-center"><img src="https://placekitten.com/105/105" alt="Sphynx" className="w-10 h-10 rounded-full mr-2" /> Sphynx</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>

        {/* Interactive Elements */}
        <div className="text-center space-y-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              onClick={() => {
                setLikeCount(prev => prev + 1);
                toast({
                  title: "Thanks for your love!",
                  description: `You've liked cats ${likeCount + 1} times.`,
                });
              }}
              className="group text-lg px-6 py-3"
              variant="outline"
            >
              <Heart className="mr-2 h-5 w-5 group-hover:text-red-500 transition-colors" />
              Like Cats ({likeCount})
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              onClick={fetchCatFact} 
              variant="default"
              className="text-lg px-6 py-3"
              disabled={catFactLoading}
            >
              {catFactLoading ? "Fetching..." : "Get Another Cat Fact"}
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => fetchCatImages()}
              variant="secondary"
              className="text-lg px-6 py-3"
            >
              <Camera className="mr-2 h-5 w-5" /> Refresh Cat Gallery
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Share Dialog */}
      <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Your Love for Cats</DialogTitle>
            <DialogDescription>
              Spread the joy of cats with your friends and family!
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Input id="name" placeholder="Your name" className="col-span-4" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Input id="message" placeholder="Your message" className="col-span-4" />
            </div>
          </div>
          <Button onClick={handleShare}>Share Now</Button>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-800 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            © 2023 Feline Fascination. All rights reserved.
          </p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
            Made with <Heart className="inline-block h-4 w-4 text-red-500" /> by cat lovers, for cat lovers.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
