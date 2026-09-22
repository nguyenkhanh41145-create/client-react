import React, { useState, useEffect } from 'react';
import './App.css';

const TREE_STAGES = [
  { minWater: 0, stage: 'Sleeping Seedling', img: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f331.svg' },
  { minWater: 3, stage: 'Growing Sprout', img: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f33e.svg' },
  { minWater: 6, stage: 'Blooming Flower', img: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f33b.svg' },
  { minWater: 10, stage: 'Majestic Ancient Tree!', img: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f333.svg' }
];

function App() {
  const [gardenData, setGardenData] = useState(null);
  const [waterCount, setWaterCount] = useState(0);

  useEffect(() => {
    fetch('https://server-api-1-4i16.onrender.com/')
      .then((res) => res.json())
      .then((data) => setGardenData(data))
      .catch((err) => console.error('Failed to load garden data:', err));
  }, []);

  const currentTree = [...TREE_STAGES].reverse().find(t => waterCount >= t.minWater) || TREE_STAGES[0];

  return (
    <div className="garden-overlay">
      <div className="garden-app">
        {/* Header */}
        <header className="glass-card garden-header">
          <span className="sun-icon">☀️</span>
          <h1>{gardenData ? gardenData.gardenName : 'Planting the seeds...'}</h1>
          <p className="quote">{gardenData?.dailyQuote}</p>
          <span className="server-badge">{gardenData?.serverStatus || 'Connecting to cloud server...'}</span>
        </header>

        {/* Chăm sóc cây mini game */}
        <section className="glass-card plant-care-zone">
          <h2>Grow Your Tree Together 🌿</h2>
          <div className="tree-avatar-box">
            <img src={currentTree.img} alt="Tree Stage" className="tree-avatar bounce" />
          </div>
          <p className="stage-name">{currentTree.stage}</p>
          <p className="water-stats">Watered: <strong>{waterCount}</strong> drops 💧</p>

          <div className="action-btns">
            <button className="water-btn" onClick={() => setWaterCount(waterCount + 1)}>
              💧 Water Me
            </button>
            {waterCount > 0 && (
              <button className="reset-btn" onClick={() => setWaterCount(0)}>
                Plant a New Seed 🌱
              </button>
            )}
          </div>
        </section>

        {/* Danh sách cây từ API */}
        <section className="friends-zone">
          <h3 className="section-title">Meet the Garden Friends</h3>
          <div className="plant-grid">
            {gardenData?.plants?.map((plant, index) => (
              <div key={index} className="glass-card plant-card">
                <img src={plant.image} alt={plant.name} className="card-plant-img" />
                <h4>{plant.name}</h4>
                <span className="plant-role">{plant.role}</span>
                <p>{plant.bio}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;