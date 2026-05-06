type Point = {
    city: string;
    x: number;
    y: number;
    year: number;
  };
  
  type Props = {
    points: Point[];
    onSelect?: (p: Point) => void;
  };
  
  export const LuxuryMap = ({ points, onSelect }: Props) => {
    // линия маршрута
    const path = points
      .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
      .join(" ");
  
    return (
      <svg viewBox="0 0 800 400" style={{ width: "100%" }}>
        
        {/* фон */}
        <rect width="800" height="400" fill="#1a001f" />
  
        {/* золотая линия */}
        <path
          d={path}
          stroke="url(#gold)"
          strokeWidth="3"
          fill="none"
        />
  
        {/* точки */}
        {points.map((p, i) => (
          <g key={i} onClick={() => onSelect?.(p)} style={{ cursor: "pointer" }}>
            
            {/* glow */}
            <circle cx={p.x} cy={p.y} r="10" fill="#ff1744" opacity="0.3" />
            
            {/* камень */}
            <circle cx={p.x} cy={p.y} r="5" fill="#ff9100" />
  
            {/* подпись */}
            <text
              x={p.x}
              y={p.y - 12}
              textAnchor="middle"
              fill="#fff"
              fontSize="10"
            >
              {p.city}
            </text>
          </g>
        ))}
  
        {/* градиент */}
        <defs>
          <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff9100" />
            <stop offset="100%" stopColor="#ff1744" />
          </linearGradient>
        </defs>
      </svg>
    );
  };