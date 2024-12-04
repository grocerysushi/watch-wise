import AdSense from 'react-adsense';

interface AdComponentProps {
  slot: string;
  format?: 'auto' | 'fluid';
  style?: React.CSSProperties;
}

export function AdComponent({ slot, format = 'auto', style }: AdComponentProps) {
  return (
    <div className="my-4">
      <AdSense.Google
        client="YOUR-CLIENT-ID"
        slot={slot}
        style={style || { display: 'block' }}
        format={format}
        responsive="true"
      />
    </div>
  );
}