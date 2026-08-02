/**
 * Custom plumbing service icons mapped directly from the screenshot sprite sheet.
 * The sprite sheet is at public/all-icons.png (1500 x 1000 pixels).
 * 
 * We zoom in tighter (scale factor based on 170px diameter instead of 200px) 
 * to crop only the inner blue graphic and completely hide the text underneath.
 */

interface IconProps {
  size?: number;
}

// Utility component to crop a cell using custom coordinates
function CropIcon({ targetX, targetY, size = 80 }: { targetX: number; targetY: number; size?: number }) {
  // Zoom in tighter (using 170px base diameter instead of 200px) to cut off the bottom labels
  const scale = size / 170;
  const bgWidth = 1500 * scale;
  const bgHeight = 1000 * scale;
  
  // Center target coordinates inside the circle container
  // We shift the targetY center up slightly (-10px) to move the text out of the frame
  const posX = -(targetX * scale) + (size / 2);
  const posY = -((targetY - 10) * scale) + (size / 2);

  return (
    <div 
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundImage: 'url("/all-icons.png")',
        backgroundPosition: `${posX}px ${posY}px`,
        backgroundSize: `${bgWidth}px ${bgHeight}px`,
        backgroundRepeat: 'no-repeat',
        display: 'inline-block'
      }}
    />
  );
}

/** 
 * CALIBRATED COORDINATES:
 * Each coordinate represents the exact (X, Y) center of the blue icon circle on the 1500x1000 screenshot.
 */

// Row 1 (y ≈ 128)
export function TapIcon({ size }: IconProps) { return <CropIcon targetX={156} targetY={128} size={size} />; }
export function ShowerIcon({ size }: IconProps) { return <CropIcon targetX={454} targetY={128} size={size} />; }
export function ToiletIcon({ size }: IconProps) { return <CropIcon targetX={702} targetY={128} size={size} />; }
export function WashBasinIcon({ size }: IconProps) { return <CropIcon targetX={1000} targetY={128} size={size} />; }
export function KitchenSinkIcon({ size }: IconProps) { return <CropIcon targetX={1296} targetY={128} size={size} />; }

// Row 2 (y ≈ 452)
export function PipeLeakIcon({ size }: IconProps) { return <CropIcon targetX={156} targetY={452} size={size} />; }
export function PipeInstallIcon({ size }: IconProps) { return <CropIcon targetX={454} targetY={452} size={size} />; }
export function DrainIcon({ size }: IconProps) { return <CropIcon targetX={702} targetY={452} size={size} />; }
export function WaterTankIcon({ size }: IconProps) { return <CropIcon targetX={1000} targetY={452} size={size} />; }
export function GeyserIcon({ size }: IconProps) { return <CropIcon targetX={1296} targetY={452} size={size} />; }

// Row 3 (y ≈ 774)
export function BathroomIcon({ size }: IconProps) { return <CropIcon targetX={156} targetY={774} size={size} />; }
export function EmergencyIcon({ size }: IconProps) { return <CropIcon targetX={454} targetY={774} size={size} />; }
