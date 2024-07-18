import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="container mx-auto">
      <header className="py-5">
        <h1 className="text-4xl font-bold">Header</h1>
      </header>
      <main className="py-5">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-2xl">Main Section</h2>
          {/* Add more sections and styling here */}
        </motion.div>
      </main>
      <footer className="py-5">
        <p>Footer</p>
      </footer>
    </div>
  );
};

export default Home;
