import React from 'react';

const LeyendaMapa = ({ colors, minValue, maxValue, unidades }) => {
  const interval = (maxValue - minValue) / colors.length;
  const intervals = [];

  for (let i = 0; i < colors.length; i++) {
    intervals.push(minValue + i * interval);
  }

  return (
    <div className="flex flex-col border border-gray-300 p-1 rounded">
      <div className="text-xs flex items-center justify-center">{minValue.toFixed(1)} {unidades}</div>
      {colors.map((color, index) => (
        <div key={index} className="flex items-center justify-center">
          <div
            className="w-4 h-2"
            style={{ backgroundColor: color }}
          >
          </div>
          {/* <span className="text-sm">{intervals[index].toFixed(2)}</span> */}
        </div>
      ))}
      <div className="flex items-center">
        <span className="text-xs">{maxValue.toFixed(1)} {unidades}</span>
      </div>
    </div>
  );
};

export { LeyendaMapa };
