import React from 'react';
import PostFeed from '../Posts/PostFeed';

const Home: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PostFeed />
    </div>
  );
};

export default Home;