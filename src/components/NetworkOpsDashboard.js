import React, { useState } from 'react';
import { FaNetworkWired, FaChartBar, FaPlusCircle } from 'react-icons/fa';
import './NetworkOpsDashboard.css';

// Mock device types
const DEVICE_TYPES = [
  { type: 'Router', icon: <FaNetworkWired color="#1a73e8" /> },
  { type: 'Switch', icon: <FaNetworkWired color="#1761c7" /> },
  { type: 'PC', icon: <FaNetworkWired color="#34a853" /> }
];

// Initial mock devices
const INITIAL_DEVICES = [
  { id: 1, type: 'Router', name: 'Router 1', status: 'online', ip: '192.168.1.1' },
  { id: 2, type: 'Switch', name: 'Switch 1', status: 'online', ip: '192.168.1.2' },
  { id: 3, type: 'PC', name: 'PC 1', status: 'offline', ip: '192.168.1.100' }
];

function NetworkOpsDashboard() {
  const [devices, setDevices] = useState(INITIAL_DEVICES);
  const [name, setName] = useState('');
  const [type, setType] = useState('Router');
  const [ip, setIp] = useState('');

  // Add a new device
  const addDevice = e => {
    e.preventDefault();
    if (!name || !ip) return;
    setDevices([
      ...devices,
      {
        id: devices.length + 1,
        type,
        name,
        status: 'online',
        ip
      }
    ]);
    setName('');
    setIp('');
  };

  // Simulate ping (random online/offline)
  const pingDevice = id => {
    setDevices(devices.map(d =>
      d.id === id ? { ...d, status: Math.random() > 0.2 ? 'online' : 'offline' } : d
    ));
  };

  // Calculate online/offline stats
  const onlineCount = devices.filter(d => d.status === 'online').length;
  const offlineCount = devices.length - onlineCount;

  return (
    <section className="network-ops-dashboard">
      <h2><FaChartBar /> Network Operations Dashboard</h2>
      <div className="dashboard-grid">
        {/* Topology Visualizer */}
        <div className="topology-section">
          <h3>Network Topology</h3>
          <div className="topology-list">
            {devices.map(device => (
              <div key={device.id} className={`device-card ${device.status}`}>
                <div className="device-icon">
                  {DEVICE_TYPES.find(dt => dt.type === device.type).icon}
                </div>
                <div>
                  <strong>{device.name}</strong><br />
                  <span>{device.type}</span><br />
                  <span>IP: {device.ip}</span><br />
                  <span>Status: <span className={device.status}>{device.status}</span></span><br />
                  <button onClick={() => pingDevice(device.id)}>Ping</button>
                </div>
              </div>
            ))}
          </div>
          <form className="add-device-form" onSubmit={addDevice}>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Device Name" required />
            <select value={type} onChange={e => setType(e.target.value)}>
              {DEVICE_TYPES.map(dt => (
                <option key={dt.type} value={dt.type}>{dt.type}</option>
              ))}
            </select>
            <input value={ip} onChange={e => setIp(e.target.value)} placeholder="IP Address" required />
            <button type="submit"><FaPlusCircle /> Add Device</button>
          </form>
        </div>
        {/* DSS Analytics */}
        <div className="dss-section">
          <h3>Network Analytics & DSS</h3>
          <div className="analytics-cards">
            <div className="analytics-card online">
              <span>Online Devices</span>
              <strong>{onlineCount}</strong>
            </div>
            <div className="analytics-card offline">
              <span>Offline Devices</span>
              <strong>{offlineCount}</strong>
            </div>
          </div>
          <div className="dss-alerts">
            <h4>Decision Support</h4>
            {offlineCount > 0 ? (
              <div className="alert alert-warning">
                <strong>Attention:</strong> {offlineCount} device(s) are offline. Consider troubleshooting or maintenance.
              </div>
            ) : (
              <div className="alert alert-success">All devices are online. Network is healthy.</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default NetworkOpsDashboard;
