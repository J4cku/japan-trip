export function LuggageTag({
  city,
  code,
  date,
  style,
}: {
  city: string;
  code: string;
  date?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className="luggage-tag" style={style}>
      <div className="luggage-tag-inner">
        <div className="luggage-tag-city">{city}</div>
        <div className="luggage-tag-code">{code}</div>
        {date && <div className="luggage-tag-date">{date}</div>}
      </div>
    </div>
  );
}
