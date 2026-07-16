import React, { useEffect, useRef } from 'react';

interface HelloSignatureProps {
  className?: string;
  duration?: number;
  delay?: number;
}

export const HelloSignature: React.FC<HelloSignatureProps> = ({
  className = '',
  duration = 2.6,
  delay = 0.4,
}) => {
  const path1Ref = useRef<SVGPathElement>(null);
  const path2Ref = useRef<SVGPathElement>(null);

  useEffect(() => {
    const p1 = path1Ref.current;
    const p2 = path2Ref.current;
    if (!p1 || !p2) return;

    const len1 = p1.getTotalLength();
    const len2 = p2.getTotalLength();
    const total = len1 + len2;

    p1.style.strokeDasharray = `${len1}`;
    p1.style.strokeDashoffset = `${len1}`;
    p2.style.strokeDasharray = `${len2}`;
    p2.style.strokeDashoffset = `${len2}`;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      p1.style.strokeDashoffset = '0';
      p2.style.strokeDashoffset = '0';
      return;
    }

    const duration1 = 1000 * duration * (len1 / total);
    const duration2 = 1000 * duration * (len2 / total);
    const easing = 'cubic-bezier(0.5, 0, 0.5, 1)';

    const anim1 = p1.animate(
      [{ strokeDashoffset: len1 }, { strokeDashoffset: 0 }],
      {
        duration: duration1,
        delay: 1000 * delay,
        easing,
        fill: 'forwards',
      }
    );

    const anim2 = p2.animate(
      [{ strokeDashoffset: len2 }, { strokeDashoffset: 0 }],
      {
        duration: duration2,
        delay: 1000 * delay + duration1,
        easing,
        fill: 'forwards',
      }
    );

    return () => {
      anim1.cancel();
      anim2.cancel();
    };
  }, [duration, delay]);

  return (
    <svg
      viewBox="-149.06069946289062 -49 2584.0606994628906 826.156005859375"
      className={className}
      role="img"
      aria-label="hello"
      fill="none"
    >
      <g transform="scale(1, -1) translate(0, -728.156005859375)">
        <path
          ref={path1Ref}
          d="M-109.06069946289062,95.92639923095703 C1.9544999599456787,157.6403045654297 103.11389923095703,236.9969940185547 217.881103515625,372.07550048828125 C296,464.2846984863281 337.9999084472656,569.5725708007812 340,642.1939697265625 C341,696.1920166015625 314.6702880859375,737.156005859375 266,737.156005859375 C212,737.156005859375 178,696.1920166015625 157,602.1610107421875 C134,498.82000732421875 117,380.239990234375 74,0"
          stroke="white"
          strokeWidth={60}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ strokeDasharray: 99999, strokeDashoffset: 99999 }}
        />
        <path
          ref={path2Ref}
          d="M78.21453094482422,37.160953521728516 C100.22924041748047,230.68260192871094 184,372 291,372 C355,372 395.6745910644531,321 384.1253967285156,248 C377.6238098144531,205 370.0873107910156,161 361.3063049316406,110 C351.0714111328125,46 380.3254089355469,-4 468.96173095703125,-4 C598.2246704101562,-4 739.2435302734375,67.83381652832031 811.4124145507812,179.0941619873047 C836,217 846,251 847,284 C848,344 814,389 754,389 C678,389 620,303 620,193 C620,75 684,-8 819.9180908203125,-8 C1004.7244873046875,-8 1209.4246826171875,213.84754943847656 1303.4808349609375,461.42327880859375 C1330.037353515625,531.3258056640625 1340,596.2349243164062 1340,641.593994140625 C1340,695.3764038085938 1323,736.673583984375 1275,736.673583984375 C1228,736.673583984375 1197,700.1784057617188 1169,642.5543823242188 C1136.1939697265625,575.7216186523438 1111.927734375,479.32598876953125 1102,370.3599853515625 C1077,96.94000244140625 1133,-4 1266.152099609375,-4 C1427.6083984375,-4 1607.1151123046875,220.92921447753906 1698.771728515625,462.18878173828125 C1725.037353515625,531.3258056640625 1735,596.2349243164062 1735,641.593994140625 C1735,695.3764038085938 1718,736.673583984375 1670,736.673583984375 C1623,736.673583984375 1592,700.1784057617188 1564,642.5543823242188 C1531.1939697265625,575.7216186523438 1506.927734375,479.32598876953125 1497,370.3599853515625 C1472,96.94000244140625 1528,-4 1646.906005859375,-4 C1765.623779296875,-4 1830.114990234375,99.48485565185547 1868.77880859375,209.3712158203125 C1907,318 1954,385 2052,385 C2133,385 2197,325 2197,212 C2197,87 2115.90087890625,-7 2013.41845703125,-8 C1923.234130859375,-9 1864,64 1870,174 C1877,296 1951,385 2048,385 C2104,385 2151.03564453125,360.1071472167969 2188,333 C2288.21435546875,259.8928527832031 2365.4287109375,305.0714416503906 2395,377.3571472167969"
          stroke="white"
          strokeWidth={60}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ strokeDasharray: 99999, strokeDashoffset: 99999 }}
        />
      </g>
    </svg>
  );
};
