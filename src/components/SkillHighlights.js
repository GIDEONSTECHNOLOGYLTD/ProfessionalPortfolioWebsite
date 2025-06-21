import React, { useState } from 'react';
import { FaTerminal, FaRobot, FaTools, FaPlayCircle, FaShieldAlt } from 'react-icons/fa';
import './SkillHighlights.css';

function SkillHighlights() {
  // 1. Network Troubleshooting Tool
  const [pingResult, setPingResult] = useState(null);
  const handlePing = () => {
    setPingResult(Math.random() > 0.2 ? 'Ping successful! (20ms)' : 'Request timed out.');
  };

  // 2. AI Chatbot Demo
  const [chatInput, setChatInput] = useState('');
  const [chatLog, setChatLog] = useState([
    { sender: 'bot', text: 'Hi! How can I help you with your device today?' }
  ]);
  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    setChatLog([...chatLog, { sender: 'user', text: chatInput }]);
    // Mock AI reply
    setTimeout(() => {
      setChatLog(log => [...log, { sender: 'bot', text: 'This is a sample automated response. (Try asking about battery or network!)' }]);
    }, 700);
    setChatInput('');
  };

  // 3. Device Diagnostic Simulator
  const [diagDevice, setDiagDevice] = useState('Laptop');
  const diagnostics = {
    Laptop: 'Battery: Good\nStorage: 80% free\nCPU Temp: 45°C',
    Phone: 'Battery: 92%\nStorage: 60% free\nSignal: Strong',
    Router: 'Uptime: 14 days\nFirmware: Up to date\nSignal: Excellent'
  };

  // 4. Automation Script Preview
  const [autoStatus, setAutoStatus] = useState('idle');
  const runAutomation = () => {
    setAutoStatus('running');
    setTimeout(() => setAutoStatus('done'), 1200);
  };

  // 5. Security Scan Indicator
  const [scanStatus, setScanStatus] = useState('idle');
  const runScan = () => {
    setScanStatus('scanning');
    setTimeout(() => setScanStatus('done'), 1500);
  };

  return (
    <section className="skill-highlights">
      <h2>Skill Highlights</h2>
      <div className="highlight-grid">
        {/* 1. Network Troubleshooting */}
        <div className="highlight-card">
          <FaTerminal className="highlight-icon" />
          <h3>Network Troubleshooting</h3>
          <p>Simulate a network ping test for connectivity checks.</p>
          <button onClick={handlePing}>Ping 8.8.8.8</button>
          {pingResult && <div className="highlight-result">{pingResult}</div>}
        </div>
        {/* 2. AI Chatbot Demo */}
        <div className="highlight-card">
          <FaRobot className="highlight-icon" />
          <h3>AI Chatbot Demo</h3>
          <p>Sample AI assistant for tech support questions.</p>
          <div className="chatbot-box">
            <div className="chat-log">
              {chatLog.map((msg, i) => (
                <div key={i} className={msg.sender}>{msg.text}</div>
              ))}
            </div>
            <div className="chat-input-row">
              <input value={chatInput} onChange={e => setChatInput(e.target.value)} placeholder="Ask a question..." />
              <button onClick={handleChatSend}>Send</button>
            </div>
          </div>
        </div>
        {/* 3. Device Diagnostic Simulator */}
        <div className="highlight-card">
          <FaTools className="highlight-icon" />
          <h3>Device Diagnostic</h3>
          <p>View a sample diagnostic report for different devices.</p>
          <select value={diagDevice} onChange={e => setDiagDevice(e.target.value)}>
            <option>Laptop</option>
            <option>Phone</option>
            <option>Router</option>
          </select>
          <pre className="highlight-result">{diagnostics[diagDevice]}</pre>
        </div>
        {/* 4. Automation Script Preview */}
        <div className="highlight-card">
          <FaPlayCircle className="highlight-icon" />
          <h3>Automation Script</h3>
          <p>Preview an automation—e.g., auto-backup user files.</p>
          <button onClick={runAutomation} disabled={autoStatus==='running'}>
            {autoStatus==='idle' ? 'Run Script' : autoStatus==='running' ? 'Running...' : 'Done!'}
          </button>
        </div>
        {/* 5. Security Scan Indicator */}
        <div className="highlight-card">
          <FaShieldAlt className="highlight-icon" />
          <h3>Security Scan</h3>
          <p>Visualize a security scan and result.</p>
          <button onClick={runScan} disabled={scanStatus==='scanning'}>
            {scanStatus==='idle' ? 'Start Scan' : scanStatus==='scanning' ? 'Scanning...' : 'No threats found!'}
          </button>
        </div>
      </div>
    </section>
  );
}

export default SkillHighlights;
