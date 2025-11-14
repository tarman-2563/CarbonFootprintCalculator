// Updated ActivityForm.jsx with improved UI (green + white theme)
import { useState } from 'react';
import { createActivity } from '../services/api';
import './ActivityForm.css';

const ActivityForm = ({ onActivityAdded }) => {
  const [activityType, setActivityType] = useState('commute');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const [distance, setDistance] = useState('');
  const [transportMode, setTransportMode] = useState('car');

  const [foodType, setFoodType] = useState('vegetables');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('kg');

  const [energyConsumed, setEnergyConsumed] = useState('');
  const [energyUnit, setEnergyUnit] = useState('kwh');

  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const activityData = { activityType, date, notes };

      if (activityType === 'commute') {
        activityData.distance = parseFloat(distance);
        activityData.transportMode = transportMode;
      } else if (activityType === 'food') {
        activityData.foodType = foodType;
        activityData.quantity = parseFloat(quantity);
        activityData.unit = unit;
      } else if (activityType === 'electricity') {
        activityData.energyConsumed = parseFloat(energyConsumed);
        activityData.energyUnit = energyUnit;
      }

      const result = await createActivity(activityData);
      setMessage(`Activity added! CO₂e: ${result.activity.co2e.toFixed(2)} kg`);

      setDistance('');
      setQuantity('');
      setEnergyConsumed('');
      setNotes('');
      setDate(new Date().toISOString().split('T')[0]);

      if (onActivityAdded) onActivityAdded();
    } catch (error) {
      setMessage(error.response?.data?.error || error.message || 'Failed to add activity');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="activity-form-container">
      <h2 className="form-title">Add New Activity</h2>

      <form onSubmit={handleSubmit} className="activity-form card">
        <div className="form-group">
          <label>Activity Type *</label>
          <select value={activityType} onChange={(e) => setActivityType(e.target.value)} required>
            <option value="commute">Commute</option>
            <option value="food">Food</option>
            <option value="electricity">Electricity</option>
          </select>
        </div>

        {activityType === 'commute' && (
          <>
            <div className="form-group">
              <label>Distance (km) *</label>
              <input type="number" value={distance} onChange={(e) => setDistance(e.target.value)} step="0.1" min="0" required/>            </div>

            <div className="form-group">
              <label>Transport Mode *</label>
              <select value={transportMode} onChange={(e) => setTransportMode(e.target.value)} required>
                <option value="car">Car</option>
                <option value="bus">Bus</option>
                <option value="train">Train</option>
                <option value="plane">Plane</option>
                <option value="motorcycle">Motorcycle</option>
                <option value="bicycle">Bicycle</option>
                <option value="walking">Walking</option>
              </select>
            </div>
          </>
        )}

        {activityType === 'food' && (
          <>
            <div className="form-group">
              <label>Food Type *</label>
              <select value={foodType} onChange={(e) => setFoodType(e.target.value)} required>
                <option value="vegetables">Vegetables</option>
                <option value="fruits">Fruits</option>
                <option value="grains">Grains</option>
                <option value="chicken">Chicken</option>
                <option value="fish">Fish</option>
                <option value="dairy">Dairy</option>
                <option value="pork">Pork</option>
                <option value="beef">Beef</option>
              </select>
            </div>

            <div className="form-group">
              <label>Quantity *</label>
              <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} step="0.1" min="0" required/>
            </div>

            <div className="form-group">
              <label>Unit *</label>
              <select value={unit} onChange={(e) => setUnit(e.target.value)} required>
                <option value="kg">kg</option>
                <option value="g">g</option>
                <option value="lb">lb</option>
              </select>
            </div>
          </>
        )}

        {activityType === 'electricity' && (
          <>
            <div className="form-group">
              <label>Energy Consumed *</label>
              <input type="number" value={energyConsumed} onChange={(e) => setEnergyConsumed(e.target.value)} step="0.1" min="0" required />
            </div>

            <div className="form-group">
              <label>Unit *</label>
              <select value={energyUnit} onChange={(e) => setEnergyUnit(e.target.value)} required>
                <option value="kwh">kWh</option>
                <option value="mwh">MWh</option>
              </select>
            </div>
          </>
        )}

        <div className="form-group">
          <label>Date *</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Notes</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows="3" placeholder="Add any notes..." />
        </div>

        {message && <div className={`message ${message.includes('CO₂e') ? 'success' : 'error'}`}>{message}</div>}

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Adding...' : 'Add Activity'}
        </button>
      </form>
    </div>
  );
};

export default ActivityForm;


