import React, { useState } from 'react';
import { FaTerminal, FaRobot, FaTools, FaPlayCircle, FaShieldAlt, FaInfoCircle } from 'react-icons/fa';
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
      <div className="skill-intro">
        <FaInfoCircle style={{color:'#1a73e8', marginRight:8}} />
        Try these interactive demos to see my top technical skills in action. Swipe or scroll on mobile!
      </div>
      <div className="highlight-carousel">
        {/* 1. Network Troubleshooting */}
        <div className="highlight-card step1">
          <div className="card-header" style={{background:'#e3f2fd'}}>
            <span className="step-label">1</span> <FaTerminal className="highlight-icon" /> Network Troubleshooting
          </div>
          <div className="card-body">
            <p>Simulate a network ping test for connectivity checks.</p>
            <button className="big-btn" onClick={handlePing}>Ping 8.8.8.8</button>
            {pingResult && <div className="highlight-result">{pingResult}</div>}
          </div>
        </div>
        {/* 2. AI Chatbot Demo */}
        <div className="highlight-card step2">
          <div className="card-header" style={{background:'#f3e5f5'}}>
            <span className="step-label">2</span> <FaRobot className="highlight-icon" /> AI Chatbot Demo
          </div>
          <div className="card-body">
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
        </div>
        {/* 3. Device Diagnostic Simulator */}
        <div className="highlight-card step3">
          <div className="card-header" style={{background:'#e8f5e9'}}>
            <span className="step-label">3</span> <FaTools className="highlight-icon" /> Device Diagnostic
          </div>
          <div className="card-body">
            <p>View a sample diagnostic report for different devices.</p>
            <select value={diagDevice} onChange={e => setDiagDevice(e.target.value)}>
              <option>Laptop</option>
              <option>Phone</option>
              <option>Router</option>
            </select>
            <pre className="highlight-result">{diagnostics[diagDevice]}</pre>
          </div>
        </div>
        {/* 4. Automation Script Preview */}
        <div className="highlight-card step4">
          <div className="card-header" style={{background:'#fffde7'}}>
            <span className="step-label">4</span> <FaPlayCircle className="highlight-icon" /> Automation Script
          </div>
          <div className="card-body">
            <p>Preview an automation—e.g., auto-backup user files.</p>
            <button className="big-btn" onClick={runAutomation} disabled={autoStatus==='running'}>
              {autoStatus==='idle' ? 'Run Script' : autoStatus==='running' ? 'Running...' : 'Done!'}
            </button>
          </div>
        </div>
        {/* 5. Security Scan Indicator */}
        <div className="highlight-card step5">
          <div className="card-header" style={{background:'#e3fcec'}}>
            <span className="step-label">5</span> <FaShieldAlt className="highlight-icon" /> Security Scan
          </div>
          <div className="card-body">
            <p>Visualize a security scan and result.</p>
            <button className="big-btn" onClick={runScan} disabled={scanStatus==='scanning'}>
              {scanStatus==='idle' ? 'Start Scan' : scanStatus==='scanning' ? 'Scanning...' : 'No threats found!'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SkillHighlights;
