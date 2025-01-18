// CommandList.jsx
import React from 'react';

const CommandList = ({ items, command }) => {
  return (
    <div className="command-list">
      {items.map((item, index) => (
        <div key={index} className="command-item" onClick={() => command(item)}>
          {item.title}
        </div>
      ))}
    </div>
  );
};

export default CommandList;
