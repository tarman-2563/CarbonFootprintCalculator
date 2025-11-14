import { useState, useEffect } from 'react';
import { getActivities } from '../services/api';
import './ActivityList.css';

const ActivityList = ({ refreshTrigger }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchActivities();
  }, [filter, refreshTrigger]);

  const fetchActivities = async () => {
    setLoading(true);
    setError('');
    try {
      const params = {};
      if (filter !== 'all') {
        params.activityType = filter;
      }
      const response = await getActivities(params);
      setActivities(response.activities || []);
    } catch (err) {
      setError('Failed to load activities');
      console.error('Error fetching activities:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'commute':
        return '🚗';
      case 'food':
        return '🍽️';
      case 'electricity':
        return '⚡';
      default:
        return '📊';
    }
  };

  const getActivityDetails = (activity) => {
    switch (activity.activityType) {
      case 'commute':
        return `${activity.distance} km by ${activity.transportMode}`;
      case 'food':
        return `${activity.quantity} ${activity.unit} of ${activity.foodType}`;
      case 'electricity':
        return `${activity.energyConsumed} ${activity.energyUnit}`;
      default:
        return '';
    }
  };

  if (loading) {
    return (
      <div className="activity-list-container">
        <div className="loading">Loading activities...</div>
      </div>
    );
  }

  return (
    <div className="activity-list-container">
      <div className="activity-list-header">
        <h2>Recent Activities</h2>
        <div className="filter-buttons">
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={filter === 'commute' ? 'active' : ''}
            onClick={() => setFilter('commute')}
          >
            Commute
          </button>
          <button
            className={filter === 'food' ? 'active' : ''}
            onClick={() => setFilter('food')}
          >
            Food
          </button>
          <button
            className={filter === 'electricity' ? 'active' : ''}
            onClick={() => setFilter('electricity')}
          >
            Electricity
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {activities.length === 0 ? (
        <div className="empty-state">
          <p>No activities found. Add your first activity to get started!</p>
        </div>
      ) : (
        <div className="activities-grid">
          {activities.map((activity) => (
            <div key={activity.id} className="activity-card">
              <div className="activity-header">
                <span className="activity-icon">{getActivityIcon(activity.activityType)}</span>
                <div className="activity-type">
                  <h3>{activity.activityType.charAt(0).toUpperCase() + activity.activityType.slice(1)}</h3>
                  <p className="activity-date">{formatDate(activity.date)}</p>
                </div>
              </div>
              <div className="activity-details">
                <p>{getActivityDetails(activity)}</p>
                {activity.notes && (
                  <p className="activity-notes">{activity.notes}</p>
                )}
              </div>
              <div className="activity-footer">
                <span className="co2e-badge">
                  {activity.co2e.toFixed(2)} kg CO₂e
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivityList;

