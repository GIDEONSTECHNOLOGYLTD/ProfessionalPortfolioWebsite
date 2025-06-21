import React, { useState } from 'react';
import { FaUserPlus, FaUserEdit, FaUserTimes, FaChartBar, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import './SaaSDemo.css';

const initialUsers = [
  { name: 'Alice', plan: 'Free', active: true },
  { name: 'Bob', plan: 'Pro', active: true },
  { name: 'Carol', plan: 'Free', active: false },
];

function SaaSDemo() {
  const [users, setUsers] = useState(initialUsers);
  const [newName, setNewName] = useState('');

  // Add user
  const addUser = () => {
    if (newName.trim()) {
      setUsers([...users, { name: newName, plan: 'Free', active: true }]);
      setNewName('');
    }
  };
  // Remove user
  const removeUser = idx => {
    setUsers(users.filter((_, i) => i !== idx));
  };
  // Toggle plan
  const togglePlan = idx => {
    setUsers(users.map((u, i) => i===idx ? { ...u, plan: u.plan==='Free' ? 'Pro' : 'Free' } : u));
  };
  // Toggle active status
  const toggleActive = idx => {
    setUsers(users.map((u, i) => i===idx ? { ...u, active: !u.active } : u));
  };

  // Usage analytics
  const total = users.length;
  const pro = users.filter(u => u.plan==='Pro').length;
  const free = users.filter(u => u.plan==='Free').length;
  const active = users.filter(u => u.active).length;

  return (
    <div className="saas-demo">
      <h3><FaChartBar style={{marginRight:6}}/> SaaS User Management Demo</h3>
      <div className="saas-analytics">
        <div><strong>Total Users:</strong> {total}</div>
        <div><strong>Pro:</strong> {pro}</div>
        <div><strong>Free:</strong> {free}</div>
        <div><strong>Active:</strong> {active}</div>
      </div>
      <div className="saas-users">
        {users.map((user, idx) => (
          <div key={idx} className={`saas-user-card${user.active ? '' : ' inactive'}`}>
            <span className="saas-user-name">{user.name}</span>
            <button className="saas-btn" title="Toggle Plan" onClick={()=>togglePlan(idx)}>
              {user.plan} {user.plan==='Pro' ? <FaToggleOn color="#1a73e8"/> : <FaToggleOff color="#b3c7e6"/>}
            </button>
            <button className="saas-btn" title="Toggle Active" onClick={()=>toggleActive(idx)}>
              {user.active ? <FaUserEdit color="#188038"/> : <FaUserTimes color="#e53935"/>}
            </button>
            <button className="saas-btn" title="Remove User" onClick={()=>removeUser(idx)}><FaUserTimes/></button>
          </div>
        ))}
      </div>
      <div className="saas-add-user">
        <input value={newName} onChange={e=>setNewName(e.target.value)} placeholder="Add user..." />
        <button className="saas-btn" onClick={addUser}><FaUserPlus/> Add</button>
      </div>
    </div>
  );
}

export default SaaSDemo;
