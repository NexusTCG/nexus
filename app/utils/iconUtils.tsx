// import React from 'react';
// import { energyIcons, gradeIcons } from '../constants/iconData';
// import { EnergyIconKey, GradeIconKey } from '../types/types';

// export const renderEnergyIconSelection = (selected: EnergyIconKey[]) => {
//     return (
//         <div style={{ display: 'flex', gap: '5px' }}>
//             {selected.map((key) => {
//                 const IconComponent = energyIcons[key].icon;
//                 return IconComponent ? (
//                     <IconComponent key={key} style={{ width: 24, height: 24 }} className={energyIcons[key].tailwindClass} />
//                 ) : (
//                     <span key={key}>{key}</span>
//                 );
//             })}
//         </div>
//     );
// };

// export const renderGradeIconSelection = (value: GradeIconKey | GradeIconKey[]) => {
//     const icon = gradeIcons[value as GradeIconKey];
//     return (
//       <div style={{ display: 'flex', gap: '4px' }}>
//         {icon ? (
//           <img
//             key={icon.value}
//             src={icon.imagePath}
//             alt={icon.value}
//             style={{ width: 24 }}
//           />
//         ) : (
//           <span>{value}</span>
//         )}
//       </div>
//     );
//   };