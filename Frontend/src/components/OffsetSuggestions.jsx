import { useState, useEffect } from 'react';
import { getTotalEmissions, getOffsetSuggestions } from '../services/api';
import './OffsetSuggestions.css';

const OffsetSuggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [totalEmissions, setTotalEmissions] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const fetchSuggestions = async () => {
    setLoading(true);
    try {
      const totalResponse = await getTotalEmissions();
      const total = totalResponse.totalCo2e || 0;
      setTotalEmissions(total);

      if (total > 0) {
        const offsetData = await getOffsetSuggestions(total);
        setSuggestions(offsetData.projects || []);
      }
    } catch (error) {
      console.error('Error fetching offset suggestions:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="offset-suggestions-container">
        <div className="loading">Loading offset suggestions...</div>
      </div>
    );
  }

  if (totalEmissions === 0) {
    return (
      <div className="offset-suggestions-container">
        <h2>Carbon Offset Suggestions</h2>
        <p className="no-emissions">
          Start tracking your activities to see offset suggestions!
        </p>
      </div>
    );
  }

  return (
    <div className="offset-suggestions-container">
      <h2>Carbon Offset Suggestions</h2>
      <div className="offset-header">
        <p className="offset-intro">
          Your total carbon footprint is <strong>{totalEmissions.toFixed(2)} kg CO₂e</strong>.
          Consider offsetting your emissions by supporting these verified projects:
        </p>
      </div>

      <div className="suggestions-grid">
        {suggestions.map((project) => (
          <div key={project.id} className="offset-card">
            <div className="offset-card-header">
              <h3>{project.name}</h3>
              <span className="location-badge">{project.location}</span>
            </div>
            <p className="offset-description">{project.description}</p>
            <div className="offset-stats">
              <div className="offset-stat">
                <span className="stat-label">Can Offset</span>
                <span className="stat-value">
                  {project.co2eOffset.toFixed(2)} kg CO₂e
                </span>
              </div>
              <div className="offset-stat">
                <span className="stat-label">Estimated Cost</span>
                <span className="stat-value">${project.cost.toFixed(2)}</span>
              </div>
            </div>
            <button className="offset-btn">Learn More</button>
          </div>
        ))}
      </div>

    </div>
  );
};

export default OffsetSuggestions;

