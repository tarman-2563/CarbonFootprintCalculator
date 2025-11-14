/*import { useState } from 'react';
import ActivityForm from './components/ActivityForm';
import Dashboard from './components/Dashboard';
import ActivityList from './components/ActivityList';
import OffsetSuggestions from './components/OffsetSuggestions';
import './App.css';

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleActivityAdded = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>🌱 Carbon Footprint Tracker</h1>
          <p className="subtitle">Track and visualize your daily carbon emissions</p>
        </div>
      </header>

      <nav className="app-nav">
        <button
          className={activeTab === 'dashboard' ? 'active' : ''}
          onClick={() => setActiveTab('dashboard')}
        >
          📊 Dashboard
        </button>
        <button
          className={activeTab === 'add' ? 'active' : ''}
          onClick={() => setActiveTab('add')}
        >
          ➕ Add Activity
        </button>
        <button
          className={activeTab === 'activities' ? 'active' : ''}
          onClick={() => setActiveTab('activities')}
        >
          📋 Activities
        </button>
        <button
          className={activeTab === 'offsets' ? 'active' : ''}
          onClick={() => setActiveTab('offsets')}
        >
          🌳 Offsets
        </button>
      </nav>

      <main className="app-main">
        {activeTab === 'dashboard' && <Dashboard key={refreshTrigger} />}
        {activeTab === 'add' && (
          <ActivityForm onActivityAdded={handleActivityAdded} />
        )}
        {activeTab === 'activities' && (
          <ActivityList refreshTrigger={refreshTrigger} />
        )}
        {activeTab === 'offsets' && <OffsetSuggestions key={refreshTrigger} />}
      </main>

    </div>
  );
}

export default App;
*/


// File: App.jsx
import { useState } from 'react';
import ActivityForm from './components/ActivityForm';
import Dashboard from './components/Dashboard';
import ActivityList from './components/ActivityList';
import OffsetSuggestions from './components/OffsetSuggestions';
import './App.css';

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleActivityAdded = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="brand">
          {/* Leaf SVG logo */}
          <svg className="leaf" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M12 2C7 2 4 8 4 12s3 8 8 8 8-3 8-8S17 2 12 2z" fill="currentColor" />
            <path d="M8.5 9.5c1-1 3-2 5.5-2.5-1 2-2 4-4 5.5-1 1-2.5.5-3.5-1s-.2-2.5 2.5-2" fill="#fff" opacity="0.06" />
          </svg>

          <h1 className="title">CarbonTrack</h1>
        </div>

        <nav className="header-nav" role="navigation" aria-label="Primary">
          <button
            className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
            aria-pressed={activeTab === 'dashboard'}
          >
            📊 Dashboard
          </button>

          <button
            className={`nav-btn ${activeTab === 'add' ? 'active' : ''}`}
            onClick={() => setActiveTab('add')}
            aria-pressed={activeTab === 'add'}
          >
            ➕ Add Activity
          </button>

          <button
            className={`nav-btn ${activeTab === 'activities' ? 'active' : ''}`}
            onClick={() => setActiveTab('activities')}
            aria-pressed={activeTab === 'activities'}
          >
            📋 Activities
          </button>

          <button
            className={`nav-btn ${activeTab === 'offsets' ? 'active' : ''}`}
            onClick={() => setActiveTab('offsets')}
            aria-pressed={activeTab === 'offsets'}
          >
            🌳 Offsets
          </button>
        </nav>
      </header>

      <main className="app-main">
        {activeTab === 'dashboard' && <Dashboard key={refreshTrigger} />}
        {activeTab === 'add' && (
          <ActivityForm onActivityAdded={handleActivityAdded} />
        )}
        {activeTab === 'activities' && (
          <ActivityList refreshTrigger={refreshTrigger} />
        )}
        {activeTab === 'offsets' && <OffsetSuggestions key={refreshTrigger} />}
      </main>
    </div>
  );
}

export default App;


/*
File: App.css
Place this alongside your App.jsx as ./App.css
Theme: green & white with subtle hover effects
*/
