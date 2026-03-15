// import React, { useEffect } from 'react';
// import {
//   Box,
//   Typography,
//   FormGroup,
//   FormControlLabel,
//   Checkbox,
//   Slider,
//   Button,
//   Divider,
//   Paper,
// } from '@mui/material';
// import { FilterList, Star } from '@mui/icons-material';
// import { formatPrice } from '../../utils/helpers';

// // ─────────────────────────────────────────────────────────────────────────────
// // FilterPanel
// //
// // Props
// //   filters        – current filter state (from parent)
// //   onFilterChange – (newFilters) => void
// //   onReset        – () => void
// //   category       – 'TV' | 'Washing Machine' | 'Dishwashers' | 'LG Audio'
// //   products       – product array (used to derive available filter values)
// //   priceMin       – (optional) dynamic minimum for the price slider
// //   priceMax       – (optional) dynamic maximum for the price slider
// // ─────────────────────────────────────────────────────────────────────────────
// const FilterPanel = ({
//   filters,
//   onFilterChange,
//   onReset,
//   category,
//   products = [],
//   priceMin: priceMinProp,
//   priceMax: priceMaxProp,
// }) => {

//   // ── SHARED: Dynamic price range ────────────────────────────────────────────
//   // TV computes its own range from variants internally.
//   // WM, Dishwashers, LG Audio all receive live priceMin/priceMax props from
//   // the parent, which recomputes them every time other filters change.
//   const computedPrices = (() => {
//     if (category === 'TV') {
//       return products.flatMap(p =>
//         p.variants?.map(v => v.mrp) ?? (p.mrp > 0 ? [p.mrp] : [])
//       ).filter(p => p > 0);
//     }
//     return products.map(p => p.mrp ?? p.price ?? 0).filter(v => v > 0);
//   })();

//   const minPrice = priceMinProp ?? 0;
//   const maxPrice = priceMaxProp ?? (() => {
//     if (computedPrices.length > 0) {
//       const raw = Math.max(...computedPrices);
//       return Math.ceil(raw / 100000) * 100000;
//     }
//     if (category === 'TV') return 600000;
//     if (category === 'Dishwashers') return 150000;
//     if (category === 'LG Audio') return 100000;
//     if (category === 'Microwave Ovens') return 50000;
//     if (category === 'AC') return 100000;
//     return 300000;
//   })();

//   const sliderStep = maxPrice <= 25000 ? 1000 : maxPrice <= 200000 ? 5000 : maxPrice <= 1000000 ? 25000 : 50000;

//   // ── Current slider values (clamped so thumbs never go outside dynamic range) ─
//   const sliderMin = Math.max(filters.minPrice ?? minPrice, minPrice);
//   const sliderMax = Math.min(filters.maxPrice ?? maxPrice, maxPrice);

//   useEffect(() => {
//     if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
//       onFilterChange({ ...filters, minPrice: undefined, maxPrice: undefined });
//     }
//   }, [minPrice, maxPrice]);

//   // ── TV-SPECIFIC: Derive filters dynamically ─────────────────────────────────
//   const availableScreenSizes = category === 'TV'
//     ? [...new Set(
//       products.flatMap(p => p.variants?.map(v => v.screenSize) ?? [])
//     )].filter(Boolean).sort((a, b) => a - b)
//     : [];

//   const availableTechnologies = category === 'TV'
//     ? [...new Set(products.map(p => {
//       const display = p.specifications?.['Display Type'] ?? '';
//       if (display.toLowerCase().includes('oled evo')) return 'OLED evo';
//       if (display.toLowerCase().includes('oled')) return 'OLED';
//       if (display.toLowerCase().includes('qned')) return 'QNED';
//       if (display.toLowerCase().includes('nanocell')) return 'NanoCell';
//       const resolution = p.specifications?.['Resolution'] ?? '';
//       if (resolution.includes('1080')) return 'FHD';
//       return 'UHD';
//     }))].filter(Boolean)
//     : [];

//   // ── WASHING MACHINE-SPECIFIC: Derive filters dynamically ───────────────────
//   const availableWashTypes = category === 'Washing Machine'
//     ? [...new Set(products.map(p => p.specifications?.['Type']).filter(Boolean))].sort()
//     : [];

//   const availableCapacities = category === 'Washing Machine'
//     ? [...new Set(
//       products.map(p => {
//         const cap = p.specifications?.['Capacity'] ?? '';
//         const match = cap.match(/^(\d+(?:\.\d+)?)/);
//         return match ? parseFloat(match[1]) : null;
//       }).filter(Boolean)
//     )].sort((a, b) => a - b)
//     : [];

//   const availableMotors = category === 'Washing Machine'
//     ? [...new Set(products.map(p => {
//       const motor = p.specifications?.['Motor Type'] ?? '';
//       if (motor.includes('AI Direct Drive')) return 'AI Direct Drive';
//       if (motor.includes('Smart Inverter')) return 'Smart Inverter';
//       if (motor.includes('Inverter Direct Drive')) return 'Inverter Direct Drive';
//       return motor || null;
//     }).filter(Boolean))].sort()
//     : [];

//   const availableEnergyRatings = category === 'Washing Machine'
//     ? [...new Set(products.map(p => p.energyRating).filter(Boolean))].sort((a, b) =>
//       parseInt(b) - parseInt(a)
//     )
//     : [];

//   const wmFeatureFlags = category === 'Washing Machine'
//     ? [
//       {
//         key: 'hasWifi',
//         label: 'Wi-Fi / ThinQ',
//         check: p =>
//           p.specifications?.['WiFi']?.toLowerCase().includes('yes') ||
//           p.tags?.includes('Wi-Fi'),
//       },
//       {
//         key: 'hasHeater',
//         label: 'In-built Heater',
//         check: p =>
//           p.specifications?.['In-built Heater'] === 'Yes' ||
//           p.tags?.includes('In-built Heater'),
//       },
//       {
//         key: 'hasSteam',
//         label: 'Steam+',
//         check: p =>
//           p.features?.some(f => f.toLowerCase().includes('steam')) ||
//           p.tags?.some(t => t.toLowerCase().includes('steam')),
//       },
//       {
//         key: 'hasTurboWash',
//         label: 'TurboWash 360°',
//         check: p =>
//           p.tags?.includes('TurboWash') ||
//           p.features?.some(f => f.toLowerCase().includes('turbowash')),
//       },
//     ].filter(flag => products.some(p => flag.check(p)))
//     : [];

//   // ── DISHWASHER-SPECIFIC: Derive filters dynamically ─────────────────────────
//   const availableDwTypes = category === 'Dishwashers'
//     ? [...new Set(products.map(p => p.specifications?.['Type']).filter(Boolean))].sort()
//     : [];

//   const availablePlaceSettings = category === 'Dishwashers'
//     ? [...new Set(
//       products.map(p => {
//         const ps = parseInt(p.specifications?.['Place Settings'] ?? '0');
//         return ps > 0 ? ps : null;
//       }).filter(Boolean)
//     )].sort((a, b) => a - b)
//     : [];

//   const dwFeatureFlags = category === 'Dishwashers'
//     ? [
//       {
//         key: 'hasTrueSteam',
//         label: 'TrueSteam™',
//         check: p =>
//           p.tags?.includes('TrueSteam') ||
//           p.features?.some(f => f.toLowerCase().includes('truesteam')),
//       },
//       {
//         key: 'hasQuadWash',
//         label: 'QuadWash™',
//         check: p =>
//           p.tags?.includes('QuadWash') ||
//           p.features?.some(f => f.toLowerCase().includes('quadwash')),
//       },
//       {
//         key: 'hasAutoOpenDoor',
//         label: 'Auto Open Door',
//         check: p =>
//           p.specifications?.['Auto Open Door'] === 'Yes' ||
//           p.tags?.includes('Auto Open Door'),
//       },
//       {
//         key: 'hasWifi',
//         label: 'Wi-Fi / ThinQ',
//         check: p =>
//           p.specifications?.['WiFi']?.toLowerCase().includes('yes') ||
//           p.tags?.includes('Wi-Fi'),
//       },
//     ].filter(flag => products.some(p => flag.check(p)))
//     : [];

//   // ── LG AUDIO-SPECIFIC: Derive filters dynamically ───────────────────────────
//   // Series = 'Sound Bar' | 'XBOOM'  (from specifications.Series)
//   const availableAudioSeries = category === 'LG Audio'
//     ? [...new Set(products.map(p => p.specifications?.['Series']).filter(Boolean))].sort()
//     : [];

//   // Product Type within a series (Soundbar, Party Speaker, Portable Speaker, Rear Speaker Kit)
//   const availableAudioTypes = category === 'LG Audio'
//     ? [...new Set(products.map(p => p.specifications?.['Type']).filter(Boolean))].sort()
//     : [];

//   // Channels — exclude non-standard values like 'Mono' and '360° Omnidirectional'
//   const availableChannels = category === 'LG Audio'
//     ? [...new Set(
//       products
//         .map(p => p.specifications?.['Channels'])
//         .filter(c => c && c !== 'Mono' && c !== '360° Omnidirectional')
//     )].sort((a, b) => {
//       const primaryA = parseFloat(a.split('.')[0]);
//       const primaryB = parseFloat(b.split('.')[0]);
//       return primaryA - primaryB || a.localeCompare(b);
//     })
//     : [];

//   const audioFeatureFlags = category === 'LG Audio'
//     ? [
//       {
//         key: 'hasDolbyAtmos',
//         label: 'Dolby Atmos',
//         check: p =>
//           p.specifications?.['Dolby Atmos'] === 'Yes' ||
//           p.tags?.includes('Dolby Atmos'),
//       },
//       {
//         key: 'hasDTSX',
//         label: 'DTS:X',
//         check: p =>
//           p.specifications?.['DTS:X'] === 'Yes' ||
//           p.tags?.includes('DTS:X'),
//       },
//       {
//         key: 'hasWifi',
//         label: 'Wi-Fi / Smart',
//         check: p =>
//           p.specifications?.['WiFi'] === 'Yes' ||
//           p.tags?.includes('Wi-Fi'),
//       },
//       {
//         key: 'hasWowOrchestra',
//         label: 'WOW Orchestra',
//         check: p =>
//           p.specifications?.['WOW Orchestra'] === 'Yes' ||
//           p.tags?.includes('WOW Orchestra'),
//       },
//       {
//         key: 'hasWowcast',
//         label: 'WOWCAST',
//         check: p =>
//           p.specifications?.['WOWCAST'] === 'Yes' ||
//           p.tags?.includes('WOWCAST'),
//       },
//       {
//         key: 'hasRearSpeakers',
//         label: 'Rear Speakers Included',
//         check: p =>
//           p.specifications?.['Rear Speakers']?.startsWith('Yes') ||
//           p.tags?.includes('Rear Speakers') ||
//           p.specifications?.['Type'] === 'Rear Speaker Kit',
//       },
//       {
//         key: 'hasKaraoke',
//         label: 'Karaoke',
//         check: p =>
//           p.specifications?.['Karaoke'] === 'Yes' ||
//           p.tags?.includes('Karaoke'),
//       },
//       {
//         key: 'hasWirelessPartyLink',
//         label: 'Wireless Party Link',
//         check: p =>
//           p.specifications?.['Wireless Party Link']?.startsWith('Yes') ||
//           p.tags?.includes('Wireless Party Link'),
//       },
//     ].filter(flag => products.some(p => flag.check(p)))
//     : [];

//   // ── MICROWAVE OVEN-SPECIFIC: Derive filters dynamically ────────────────────
//   const availableMwoTypes = category === 'Microwave Ovens'
//     ? [...new Set(products.map(p => p.specifications?.['Type']).filter(Boolean))].sort()
//     : [];

//   const availableMwoCapacities = category === 'Microwave Ovens'
//     ? [...new Set(products.map(p => p.specifications?.['Capacity']).filter(Boolean))].sort((a, b) => {
//       const numA = parseInt(a);
//       const numB = parseInt(b);
//       return numA - numB;
//     })
//     : [];

//   const mwoFeatureFlags = category === 'Microwave Ovens'
//     ? [
//       {
//         key: 'hasWifi',
//         label: 'Wi-Fi / Scan-To-Cook',
//         check: p =>
//           p.specifications?.['WiFi']?.toLowerCase().startsWith('yes') ||
//           p.tags?.includes('Wi-Fi'),
//       },
//       {
//         key: 'hasCharcoalHeater',
//         label: 'Charcoal Heater',
//         check: p =>
//           p.specifications?.['Charcoal Heater']?.toLowerCase().startsWith('yes') ||
//           p.tags?.includes('Charcoal Convection'),
//       },
//       {
//         key: 'hasRotisserie',
//         label: 'Motorised Rotisserie',
//         check: p =>
//           p.specifications?.['Motorised Rotisserie']?.toLowerCase().startsWith('yes') ||
//           p.tags?.includes('Rotisserie'),
//       },
//       {
//         key: 'hasDietFry',
//         label: 'Diet Fry',
//         check: p =>
//           p.specifications?.['Diet Fry'] === 'Yes' ||
//           p.tags?.includes('Diet Fry'),
//       },
//       {
//         key: 'hasAirFryer',
//         label: 'Air Fryer',
//         check: p =>
//           p.specifications?.['Air Fryer'] === 'Yes' ||
//           p.tags?.includes('Air Fryer'),
//       },
//     ].filter(flag => products.some(p => flag.check(p)))
//     : [];

//   // ── AC-SPECIFIC: Derive filters dynamically ────────────────────────────────
//   const availableAcTypes = category === 'AC'
//     ? [...new Set(products.map(p => p.specifications?.['AC Type']).filter(Boolean))].sort()
//     : [];

//   const availableAcCapacities = category === 'AC'
//     ? [...new Set(products.map(p => p.specifications?.['Capacity']).filter(Boolean))].sort((a, b) => {
//       return parseFloat(a) - parseFloat(b);
//     })
//     : [];

//   const availableConvertibles = category === 'AC'
//     ? [...new Set(products.map(p => {
//       const conv = p.specifications?.['AI Convertible'] ?? '';
//       if (conv.includes('6-in-1')) return '6-in-1';
//       if (conv.includes('5-in-1')) return '5-in-1';
//       if (conv.includes('4-in-1')) return '4-in-1';
//       return null;
//     }).filter(Boolean))].sort().reverse()  // 6-in-1 first
//     : [];

//   const availableStarRatings = category === 'AC'
//     ? [...new Set(products.map(p => p.specifications?.['Star Rating']).filter(Boolean))].sort((a, b) => {
//       return parseInt(a) - parseInt(b);
//     })
//     : [];

//   const acFeatureFlags = category === 'AC'
//     ? [
//       {
//         key: 'hasWifi',
//         label: 'Wi-Fi / ThinQ',
//         check: p =>
//           p.specifications?.['WiFi']?.toLowerCase().startsWith('yes') ||
//           p.tags?.includes('Wi-Fi'),
//       },
//       {
//         key: 'isHotCold',
//         label: 'Hot & Cold',
//         check: p =>
//           p.specifications?.['Hot & Cold'] === 'Yes' ||
//           p.tags?.includes('Hot & Cold'),
//       },
//       {
//         key: 'hasDietMode',
//         label: 'Diet Mode+',
//         check: p =>
//           p.specifications?.['Diet Mode+'] === 'Yes' ||
//           p.tags?.includes('Diet Mode'),
//       },
//       {
//         key: 'hasViraatMode',
//         label: 'Viraat Mode',
//         check: p =>
//           p.specifications?.['Viraat Mode'] === 'Yes' ||
//           p.tags?.includes('Viraat Mode'),
//       },
//       {
//         key: 'hasGoldFin',
//         label: 'Gold Fin+',
//         check: p =>
//           p.specifications?.['Gold Fin+'] === 'Yes' ||
//           p.tags?.includes('Gold Fin'),
//       },
//       {
//         key: 'hasADCSensor',
//         label: 'ADC Sensor',
//         check: p =>
//           p.specifications?.['ADC Sensor'] === 'Yes' ||
//           p.tags?.includes('ADC Sensor'),
//       },
//     ].filter(flag => products.some(p => flag.check(p)))
//     : [];

//   // ── HANDLERS ────────────────────────────────────────────────────────────────
//   const handlePriceChange = (event, newValue) => {
//     onFilterChange({
//       ...filters,
//       minPrice: newValue[0] === minPrice ? undefined : newValue[0],
//       maxPrice: newValue[1] === maxPrice ? undefined : newValue[1],
//     });
//   };

//   const handleStockChange = (event) => {
//     onFilterChange({ ...filters, inStock: event.target.checked ? true : undefined });
//   };

//   // TV handlers
//   const handleScreenSizeChange = (size) => {
//     onFilterChange({ ...filters, screenSize: filters.screenSize === size ? undefined : size });
//   };

//   const handleTechnologyChange = (tech) => {
//     onFilterChange({ ...filters, technology: filters.technology === tech ? undefined : tech });
//   };

//   // Shared multi-select toggle — used by WM, Dishwashers, and LG Audio
//   const toggleMulti = (key, value) => {
//     const current = filters[key] || [];
//     const updated = current.includes(value)
//       ? current.filter(v => v !== value)
//       : [...current, value];
//     onFilterChange({ ...filters, [key]: updated.length ? updated : undefined });
//   };

//   // Shared boolean feature flag toggle — used by WM, Dishwashers, and LG Audio
//   const handleFeatureFlagChange = (key) => {
//     onFilterChange({ ...filters, [key]: filters[key] ? undefined : true });
//   };

//   // ── STAR RATING HELPER ───────────────────────────────────────────────────────
//   const renderStars = (ratingStr) => {
//     const num = parseInt(ratingStr);
//     return (
//       <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
//         {Array.from({ length: 5 }).map((_, i) => (
//           <Star key={i} sx={{ fontSize: 13, color: i < num ? '#FFC107' : 'text.disabled' }} />
//         ))}
//         <Typography variant="caption" sx={{ ml: 0.5 }}>{ratingStr}</Typography>
//       </Box>
//     );
//   };

//   // ── SHARED BUTTON STYLE ──────────────────────────────────────────────────────
//   const filterBtnSx = {
//     minWidth: 'auto',
//     px: 1.5,
//     py: 0.5,
//     fontSize: '0.75rem',
//     textTransform: 'none',
//     borderRadius: 2,
//   };

//   return (
//     <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>

//       {/* Header */}
//       <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
//         <FilterList color="primary" />
//         <Typography variant="h6" fontWeight={600}>Filters</Typography>
//       </Box>

//       <Divider sx={{ mb: 3 }} />

//       {/* ── Price Range (shared by all categories) ── */}
//       <Box sx={{ mb: 3 }}>
//         <Typography variant="subtitle2" gutterBottom fontWeight={600}>Price Range</Typography>
//         <Slider
//           value={[sliderMin, sliderMax]}
//           onChange={handlePriceChange}
//           valueLabelDisplay="auto"
//           min={minPrice}
//           max={maxPrice}
//           step={sliderStep}
//           valueLabelFormat={(value) => formatPrice(value)}
//           sx={{ mt: 2 }}
//         />
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
//           <Typography variant="body2" color="text.secondary">{formatPrice(sliderMin)}</Typography>
//           <Typography variant="body2" color="text.secondary">{formatPrice(sliderMax)}</Typography>
//         </Box>
//       </Box>

//       <Divider sx={{ mb: 3 }} />

//       {/* ── Availability (shared by all categories) ── */}
//       <Box sx={{ mb: 3 }}>
//         <Typography variant="subtitle2" gutterBottom fontWeight={600}>Availability</Typography>
//         <FormGroup>
//           <FormControlLabel
//             control={
//               <Checkbox
//                 checked={filters.inStock === true}
//                 onChange={handleStockChange}
//                 size="small"
//               />
//             }
//             label={<Typography variant="body2">In Stock Only</Typography>}
//           />
//         </FormGroup>
//       </Box>

//       {/* ════════════════════════════════════════════════
//           TV-SPECIFIC FILTERS
//       ════════════════════════════════════════════════ */}
//       {category === 'TV' && (
//         <>
//           {availableScreenSizes.length > 0 && (
//             <>
//               <Divider sx={{ mb: 3 }} />
//               <Box sx={{ mb: 3 }}>
//                 <Typography variant="subtitle2" gutterBottom fontWeight={600}>Screen Size (inches)</Typography>
//                 <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
//                   {availableScreenSizes.map((size) => (
//                     <Button
//                       key={size}
//                       size="small"
//                       variant={filters.screenSize === size ? 'contained' : 'outlined'}
//                       onClick={() => handleScreenSizeChange(size)}
//                       sx={filterBtnSx}
//                     >
//                       {size}"
//                     </Button>
//                   ))}
//                 </Box>
//               </Box>
//             </>
//           )}

//           {availableTechnologies.length > 0 && (
//             <>
//               <Divider sx={{ mb: 3 }} />
//               <Box sx={{ mb: 3 }}>
//                 <Typography variant="subtitle2" gutterBottom fontWeight={600}>Display Technology</Typography>
//                 <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
//                   {availableTechnologies.map((tech) => (
//                     <Button
//                       key={tech}
//                       size="small"
//                       variant={filters.technology === tech ? 'contained' : 'outlined'}
//                       onClick={() => handleTechnologyChange(tech)}
//                       sx={filterBtnSx}
//                     >
//                       {tech}
//                     </Button>
//                   ))}
//                 </Box>
//               </Box>
//             </>
//           )}
//         </>
//       )}

//       {/* ════════════════════════════════════════════════
//           WASHING MACHINE-SPECIFIC FILTERS
//       ════════════════════════════════════════════════ */}
//       {category === 'Washing Machine' && (
//         <>
//           {availableWashTypes.length > 0 && (
//             <>
//               <Divider sx={{ mb: 3 }} />
//               <Box sx={{ mb: 3 }}>
//                 <Typography variant="subtitle2" gutterBottom fontWeight={600}>Machine Type</Typography>
//                 <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
//                   {availableWashTypes.map((type) => (
//                     <Button
//                       key={type}
//                       size="small"
//                       variant={(filters.washType || []).includes(type) ? 'contained' : 'outlined'}
//                       onClick={() => toggleMulti('washType', type)}
//                       sx={filterBtnSx}
//                     >
//                       {type}
//                     </Button>
//                   ))}
//                 </Box>
//               </Box>
//             </>
//           )}

//           {availableCapacities.length > 0 && (
//             <>
//               <Divider sx={{ mb: 3 }} />
//               <Box sx={{ mb: 3 }}>
//                 <Typography variant="subtitle2" gutterBottom fontWeight={600}>Capacity (Kg)</Typography>
//                 <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
//                   {availableCapacities.map((cap) => (
//                     <Button
//                       key={cap}
//                       size="small"
//                       variant={(filters.capacity || []).includes(cap) ? 'contained' : 'outlined'}
//                       onClick={() => toggleMulti('capacity', cap)}
//                       sx={{ ...filterBtnSx, minWidth: 52 }}
//                     >
//                       {cap} Kg
//                     </Button>
//                   ))}
//                 </Box>
//               </Box>
//             </>
//           )}

//           {availableMotors.length > 0 && (
//             <>
//               <Divider sx={{ mb: 3 }} />
//               <Box sx={{ mb: 3 }}>
//                 <Typography variant="subtitle2" gutterBottom fontWeight={600}>Drive Technology</Typography>
//                 <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
//                   {availableMotors.map((motor) => (
//                     <Button
//                       key={motor}
//                       size="small"
//                       variant={(filters.motor || []).includes(motor) ? 'contained' : 'outlined'}
//                       onClick={() => toggleMulti('motor', motor)}
//                       sx={filterBtnSx}
//                     >
//                       {motor}
//                     </Button>
//                   ))}
//                 </Box>
//               </Box>
//             </>
//           )}

//           {availableEnergyRatings.length > 0 && (
//             <>
//               <Divider sx={{ mb: 3 }} />
//               <Box sx={{ mb: 3 }}>
//                 <Typography variant="subtitle2" gutterBottom fontWeight={600}>Energy Rating</Typography>
//                 <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
//                   {availableEnergyRatings.map((rating) => (
//                     <Button
//                       key={rating}
//                       size="small"
//                       variant={(filters.energyRating || []).includes(rating) ? 'contained' : 'outlined'}
//                       onClick={() => toggleMulti('energyRating', rating)}
//                       sx={filterBtnSx}
//                     >
//                       {renderStars(rating)}
//                     </Button>
//                   ))}
//                 </Box>
//               </Box>
//             </>
//           )}

//           {wmFeatureFlags.length > 0 && (
//             <>
//               <Divider sx={{ mb: 3 }} />
//               <Box sx={{ mb: 3 }}>
//                 <Typography variant="subtitle2" gutterBottom fontWeight={600}>Features</Typography>
//                 <FormGroup>
//                   {wmFeatureFlags.map(({ key, label }) => (
//                     <FormControlLabel
//                       key={key}
//                       control={
//                         <Checkbox
//                           checked={!!filters[key]}
//                           onChange={() => handleFeatureFlagChange(key)}
//                           size="small"
//                         />
//                       }
//                       label={<Typography variant="body2">{label}</Typography>}
//                     />
//                   ))}
//                 </FormGroup>
//               </Box>
//             </>
//           )}
//         </>
//       )}

//       {/* ════════════════════════════════════════════════
//           DISHWASHER-SPECIFIC FILTERS
//       ════════════════════════════════════════════════ */}
//       {category === 'Dishwashers' && (
//         <>
//           {availableDwTypes.length > 0 && (
//             <>
//               <Divider sx={{ mb: 3 }} />
//               <Box sx={{ mb: 3 }}>
//                 <Typography variant="subtitle2" gutterBottom fontWeight={600}>Type</Typography>
//                 <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
//                   {availableDwTypes.map((type) => (
//                     <Button
//                       key={type}
//                       size="small"
//                       variant={(filters.dwType || []).includes(type) ? 'contained' : 'outlined'}
//                       onClick={() => toggleMulti('dwType', type)}
//                       sx={filterBtnSx}
//                     >
//                       {type}
//                     </Button>
//                   ))}
//                 </Box>
//               </Box>
//             </>
//           )}

//           {availablePlaceSettings.length > 0 && (
//             <>
//               <Divider sx={{ mb: 3 }} />
//               <Box sx={{ mb: 3 }}>
//                 <Typography variant="subtitle2" gutterBottom fontWeight={600}>Place Settings</Typography>
//                 <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
//                   {availablePlaceSettings.map((ps) => (
//                     <Button
//                       key={ps}
//                       size="small"
//                       variant={(filters.placeSettings || []).includes(ps) ? 'contained' : 'outlined'}
//                       onClick={() => toggleMulti('placeSettings', ps)}
//                       sx={{ ...filterBtnSx, minWidth: 52 }}
//                     >
//                       {ps} Place
//                     </Button>
//                   ))}
//                 </Box>
//               </Box>
//             </>
//           )}

//           {dwFeatureFlags.length > 0 && (
//             <>
//               <Divider sx={{ mb: 3 }} />
//               <Box sx={{ mb: 3 }}>
//                 <Typography variant="subtitle2" gutterBottom fontWeight={600}>Features</Typography>
//                 <FormGroup>
//                   {dwFeatureFlags.map(({ key, label }) => (
//                     <FormControlLabel
//                       key={key}
//                       control={
//                         <Checkbox
//                           checked={!!filters[key]}
//                           onChange={() => handleFeatureFlagChange(key)}
//                           size="small"
//                         />
//                       }
//                       label={<Typography variant="body2">{label}</Typography>}
//                     />
//                   ))}
//                 </FormGroup>
//               </Box>
//             </>
//           )}
//         </>
//       )}

//       {/* ════════════════════════════════════════════════
//           LG AUDIO-SPECIFIC FILTERS
//       ════════════════════════════════════════════════ */}
//       {category === 'LG Audio' && (
//         <>
//           {/* Series: Sound Bar / XBOOM */}
//           {availableAudioSeries.length > 0 && (
//             <>
//               <Divider sx={{ mb: 3 }} />
//               <Box sx={{ mb: 3 }}>
//                 <Typography variant="subtitle2" gutterBottom fontWeight={600}>Series</Typography>
//                 <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
//                   {availableAudioSeries.map((series) => (
//                     <Button
//                       key={series}
//                       size="small"
//                       variant={(filters.audioSeries || []).includes(series) ? 'contained' : 'outlined'}
//                       onClick={() => toggleMulti('audioSeries', series)}
//                       sx={filterBtnSx}
//                     >
//                       {series}
//                     </Button>
//                   ))}
//                 </Box>
//               </Box>
//             </>
//           )}

//           {/* Product Type */}
//           {availableAudioTypes.length > 0 && (
//             <>
//               <Divider sx={{ mb: 3 }} />
//               <Box sx={{ mb: 3 }}>
//                 <Typography variant="subtitle2" gutterBottom fontWeight={600}>Type</Typography>
//                 <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
//                   {availableAudioTypes.map((type) => (
//                     <Button
//                       key={type}
//                       size="small"
//                       variant={(filters.audioType || []).includes(type) ? 'contained' : 'outlined'}
//                       onClick={() => toggleMulti('audioType', type)}
//                       sx={filterBtnSx}
//                     >
//                       {type}
//                     </Button>
//                   ))}
//                 </Box>
//               </Box>
//             </>
//           )}

//           {/* Channels (Soundbar only – hidden when only XBOOM selected) */}
//           {availableChannels.length > 0 && (
//             <>
//               <Divider sx={{ mb: 3 }} />
//               <Box sx={{ mb: 3 }}>
//                 <Typography variant="subtitle2" gutterBottom fontWeight={600}>Channels</Typography>
//                 <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
//                   {availableChannels.map((ch) => (
//                     <Button
//                       key={ch}
//                       size="small"
//                       variant={(filters.channels || []).includes(ch) ? 'contained' : 'outlined'}
//                       onClick={() => toggleMulti('channels', ch)}
//                       sx={{ ...filterBtnSx, minWidth: 44 }}
//                     >
//                       {ch}
//                     </Button>
//                   ))}
//                 </Box>
//               </Box>
//             </>
//           )}

//           {/* Feature Flags */}
//           {audioFeatureFlags.length > 0 && (
//             <>
//               <Divider sx={{ mb: 3 }} />
//               <Box sx={{ mb: 3 }}>
//                 <Typography variant="subtitle2" gutterBottom fontWeight={600}>Features</Typography>
//                 <FormGroup>
//                   {audioFeatureFlags.map(({ key, label }) => (
//                     <FormControlLabel
//                       key={key}
//                       control={
//                         <Checkbox
//                           checked={!!filters[key]}
//                           onChange={() => handleFeatureFlagChange(key)}
//                           size="small"
//                         />
//                       }
//                       label={<Typography variant="body2">{label}</Typography>}
//                     />
//                   ))}
//                 </FormGroup>
//               </Box>
//             </>
//           )}
//         </>
//       )}

//       {/* ════════════════════════════════════════════════
//           MICROWAVE OVEN-SPECIFIC FILTERS
//       ════════════════════════════════════════════════ */}
//       {category === 'Microwave Ovens' && (
//         <>
//           {/* Oven Type */}
//           {availableMwoTypes.length > 0 && (
//             <>
//               <Divider sx={{ mb: 3 }} />
//               <Box sx={{ mb: 3 }}>
//                 <Typography variant="subtitle2" gutterBottom fontWeight={600}>Oven Type</Typography>
//                 <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
//                   {availableMwoTypes.map((type) => (
//                     <Button
//                       key={type}
//                       size="small"
//                       variant={(filters.mwoType || []).includes(type) ? 'contained' : 'outlined'}
//                       onClick={() => toggleMulti('mwoType', type)}
//                       sx={filterBtnSx}
//                     >
//                       {type}
//                     </Button>
//                   ))}
//                 </Box>
//               </Box>
//             </>
//           )}

//           {/* Capacity */}
//           {availableMwoCapacities.length > 0 && (
//             <>
//               <Divider sx={{ mb: 3 }} />
//               <Box sx={{ mb: 3 }}>
//                 <Typography variant="subtitle2" gutterBottom fontWeight={600}>Capacity</Typography>
//                 <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
//                   {availableMwoCapacities.map((cap) => (
//                     <Button
//                       key={cap}
//                       size="small"
//                       variant={(filters.capacity || []).includes(cap) ? 'contained' : 'outlined'}
//                       onClick={() => toggleMulti('capacity', cap)}
//                       sx={{ ...filterBtnSx, minWidth: 52 }}
//                     >
//                       {cap}
//                     </Button>
//                   ))}
//                 </Box>
//               </Box>
//             </>
//           )}

//           {/* Feature Flags */}
//           {mwoFeatureFlags.length > 0 && (
//             <>
//               <Divider sx={{ mb: 3 }} />
//               <Box sx={{ mb: 3 }}>
//                 <Typography variant="subtitle2" gutterBottom fontWeight={600}>Features</Typography>
//                 <FormGroup>
//                   {mwoFeatureFlags.map(({ key, label }) => (
//                     <FormControlLabel
//                       key={key}
//                       control={
//                         <Checkbox
//                           checked={!!filters[key]}
//                           onChange={() => handleFeatureFlagChange(key)}
//                           size="small"
//                         />
//                       }
//                       label={<Typography variant="body2">{label}</Typography>}
//                     />
//                   ))}
//                 </FormGroup>
//               </Box>
//             </>
//           )}
//         </>
//       )}

//       {/* ════════════════════════════════════════════════
//           AC-SPECIFIC FILTERS
//       ════════════════════════════════════════════════ */}
//       {category === 'AC' && (
//         <>
//           {/* AC Type: Split / Window */}
//           {availableAcTypes.length > 0 && (
//             <>
//               <Divider sx={{ mb: 3 }} />
//               <Box sx={{ mb: 3 }}>
//                 <Typography variant="subtitle2" gutterBottom fontWeight={600}>AC Type</Typography>
//                 <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
//                   {availableAcTypes.map((type) => (
//                     <Button
//                       key={type}
//                       size="small"
//                       variant={(filters.acType || []).includes(type) ? 'contained' : 'outlined'}
//                       onClick={() => toggleMulti('acType', type)}
//                       sx={filterBtnSx}
//                     >
//                       {type}
//                     </Button>
//                   ))}
//                 </Box>
//               </Box>
//             </>
//           )}

//           {/* Capacity */}
//           {availableAcCapacities.length > 0 && (
//             <>
//               <Divider sx={{ mb: 3 }} />
//               <Box sx={{ mb: 3 }}>
//                 <Typography variant="subtitle2" gutterBottom fontWeight={600}>Capacity</Typography>
//                 <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
//                   {availableAcCapacities.map((cap) => (
//                     <Button
//                       key={cap}
//                       size="small"
//                       variant={(filters.capacity || []).includes(cap) ? 'contained' : 'outlined'}
//                       onClick={() => toggleMulti('capacity', cap)}
//                       sx={{ ...filterBtnSx, minWidth: 60 }}
//                     >
//                       {cap}
//                     </Button>
//                   ))}
//                 </Box>
//               </Box>
//             </>
//           )}

//           {/* Star Rating */}
//           {availableStarRatings.length > 0 && (
//             <>
//               <Divider sx={{ mb: 3 }} />
//               <Box sx={{ mb: 3 }}>
//                 <Typography variant="subtitle2" gutterBottom fontWeight={600}>Star Rating</Typography>
//                 <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
//                   {availableStarRatings.map((rating) => (
//                     <Button
//                       key={rating}
//                       size="small"
//                       variant={(filters.starRating || []).includes(rating) ? 'contained' : 'outlined'}
//                       onClick={() => toggleMulti('starRating', rating)}
//                       sx={{ ...filterBtnSx, minWidth: 60 }}
//                     >
//                       {renderStars(rating)}
//                     </Button>
//                   ))}
//                 </Box>
//               </Box>
//             </>
//           )}

//           {/* Convertible Mode */}
//           {availableConvertibles.length > 0 && (
//             <>
//               <Divider sx={{ mb: 3 }} />
//               <Box sx={{ mb: 3 }}>
//                 <Typography variant="subtitle2" gutterBottom fontWeight={600}>Convertible Mode</Typography>
//                 <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
//                   {availableConvertibles.map((conv) => (
//                     <Button
//                       key={conv}
//                       size="small"
//                       variant={(filters.convertible || []).includes(conv) ? 'contained' : 'outlined'}
//                       onClick={() => toggleMulti('convertible', conv)}
//                       sx={{ ...filterBtnSx, minWidth: 52 }}
//                     >
//                       {conv}
//                     </Button>
//                   ))}
//                 </Box>
//               </Box>
//             </>
//           )}

//           {/* Feature Flags */}
//           {acFeatureFlags.length > 0 && (
//             <>
//               <Divider sx={{ mb: 3 }} />
//               <Box sx={{ mb: 3 }}>
//                 <Typography variant="subtitle2" gutterBottom fontWeight={600}>Features</Typography>
//                 <FormGroup>
//                   {acFeatureFlags.map(({ key, label }) => (
//                     <FormControlLabel
//                       key={key}
//                       control={
//                         <Checkbox
//                           checked={!!filters[key]}
//                           onChange={() => handleFeatureFlagChange(key)}
//                           size="small"
//                         />
//                       }
//                       label={<Typography variant="body2">{label}</Typography>}
//                     />
//                   ))}
//                 </FormGroup>
//               </Box>
//             </>
//           )}
//         </>
//       )}

//       {/* Reset */}
//       <Button fullWidth variant="outlined" onClick={onReset} sx={{ mt: 2 }}>
//         Reset Filters
//       </Button>
//     </Paper>
//   );
// };

// export default FilterPanel;





import React, { useEffect } from 'react';
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Slider,
  Button,
  Divider,
  Paper,
} from '@mui/material';
import { FilterList, Star } from '@mui/icons-material';
import { formatPrice } from '../../utils/helpers';

// ─────────────────────────────────────────────────────────────────────────────
// FilterPanel
//
// Props
//   filters        – current filter state (from parent)
//   onFilterChange – (newFilters) => void
//   onReset        – () => void
//   category       – 'TV' | 'Washing Machine' | 'Dishwashers' | 'LG Audio'
//   products       – product array (used to derive available filter values)
//   priceMin       – (optional) dynamic minimum for the price slider
//   priceMax       – (optional) dynamic maximum for the price slider
// ─────────────────────────────────────────────────────────────────────────────
const FilterPanel = ({
  filters,
  onFilterChange,
  onReset,
  category,
  products = [],
  priceMin: priceMinProp,
  priceMax: priceMaxProp,
}) => {

  // ── SHARED: Dynamic price range ────────────────────────────────────────────
  // TV computes its own range from variants internally.
  // WM, Dishwashers, LG Audio all receive live priceMin/priceMax props from
  // the parent, which recomputes them every time other filters change.
  const computedPrices = (() => {
    if (category === 'TV') {
      return products.flatMap(p =>
        p.variants?.map(v => v.mrp) ?? (p.mrp > 0 ? [p.mrp] : [])
      ).filter(p => p > 0);
    }
    return products.map(p => p.mrp ?? p.price ?? 0).filter(v => v > 0);
  })();

  const minPrice = priceMinProp ?? 0;
  const maxPrice = priceMaxProp ?? (() => {
    if (computedPrices.length > 0) {
      const raw = Math.max(...computedPrices);
      return Math.ceil(raw / 100000) * 100000;
    }
    if (category === 'TV') return 600000;
    if (category === 'Dishwashers') return 150000;
    if (category === 'LG Audio') return 100000;
    if (category === 'Microwave Ovens') return 50000;
    if (category === 'AC') return 100000;
    if (category === 'Water Purifier') return 50000;
    return 300000;
  })();

  const sliderStep = maxPrice <= 25000 ? 1000 : maxPrice <= 200000 ? 5000 : maxPrice <= 1000000 ? 25000 : 50000;

  // ── Current slider values (clamped so thumbs never go outside dynamic range) ─
  const sliderMin = Math.max(filters.minPrice ?? minPrice, minPrice);
  const sliderMax = Math.min(filters.maxPrice ?? maxPrice, maxPrice);

  useEffect(() => {
    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      onFilterChange({ ...filters, minPrice: undefined, maxPrice: undefined });
    }
  }, [minPrice, maxPrice]);

  // ── TV-SPECIFIC: Derive filters dynamically ─────────────────────────────────
  const availableScreenSizes = category === 'TV'
    ? [...new Set(
      products.flatMap(p => p.variants?.map(v => v.screenSize) ?? [])
    )].filter(Boolean).sort((a, b) => a - b)
    : [];

  const availableTechnologies = category === 'TV'
    ? [...new Set(products.map(p => {
      const display = p.specifications?.['Display Type'] ?? '';
      if (display.toLowerCase().includes('oled evo')) return 'OLED evo';
      if (display.toLowerCase().includes('oled')) return 'OLED';
      if (display.toLowerCase().includes('qned')) return 'QNED';
      if (display.toLowerCase().includes('nanocell')) return 'NanoCell';
      const resolution = p.specifications?.['Resolution'] ?? '';
      if (resolution.includes('1080')) return 'FHD';
      return 'UHD';
    }))].filter(Boolean)
    : [];

  // ── WASHING MACHINE-SPECIFIC: Derive filters dynamically ───────────────────
  const availableWashTypes = category === 'Washing Machine'
    ? [...new Set(products.map(p => p.specifications?.['Type']).filter(Boolean))].sort()
    : [];

  const availableCapacities = category === 'Washing Machine'
    ? [...new Set(
      products.map(p => {
        const cap = p.specifications?.['Capacity'] ?? '';
        const match = cap.match(/^(\d+(?:\.\d+)?)/);
        return match ? parseFloat(match[1]) : null;
      }).filter(Boolean)
    )].sort((a, b) => a - b)
    : [];

  const availableMotors = category === 'Washing Machine'
    ? [...new Set(products.map(p => {
      const motor = p.specifications?.['Motor Type'] ?? '';
      if (motor.includes('AI Direct Drive')) return 'AI Direct Drive';
      if (motor.includes('Smart Inverter')) return 'Smart Inverter';
      if (motor.includes('Inverter Direct Drive')) return 'Inverter Direct Drive';
      return motor || null;
    }).filter(Boolean))].sort()
    : [];

  const availableEnergyRatings = category === 'Washing Machine'
    ? [...new Set(products.map(p => p.energyRating).filter(Boolean))].sort((a, b) =>
      parseInt(b) - parseInt(a)
    )
    : [];

  const wmFeatureFlags = category === 'Washing Machine'
    ? [
      {
        key: 'hasWifi',
        label: 'Wi-Fi / ThinQ',
        check: p =>
          p.specifications?.['WiFi']?.toLowerCase().includes('yes') ||
          p.tags?.includes('Wi-Fi'),
      },
      {
        key: 'hasHeater',
        label: 'In-built Heater',
        check: p =>
          p.specifications?.['In-built Heater'] === 'Yes' ||
          p.tags?.includes('In-built Heater'),
      },
      {
        key: 'hasSteam',
        label: 'Steam+',
        check: p =>
          p.features?.some(f => f.toLowerCase().includes('steam')) ||
          p.tags?.some(t => t.toLowerCase().includes('steam')),
      },
      {
        key: 'hasTurboWash',
        label: 'TurboWash 360°',
        check: p =>
          p.tags?.includes('TurboWash') ||
          p.features?.some(f => f.toLowerCase().includes('turbowash')),
      },
    ].filter(flag => products.some(p => flag.check(p)))
    : [];

  // ── DISHWASHER-SPECIFIC: Derive filters dynamically ─────────────────────────
  const availableDwTypes = category === 'Dishwashers'
    ? [...new Set(products.map(p => p.specifications?.['Type']).filter(Boolean))].sort()
    : [];

  const availablePlaceSettings = category === 'Dishwashers'
    ? [...new Set(
      products.map(p => {
        const ps = parseInt(p.specifications?.['Place Settings'] ?? '0');
        return ps > 0 ? ps : null;
      }).filter(Boolean)
    )].sort((a, b) => a - b)
    : [];

  const dwFeatureFlags = category === 'Dishwashers'
    ? [
      {
        key: 'hasTrueSteam',
        label: 'TrueSteam™',
        check: p =>
          p.tags?.includes('TrueSteam') ||
          p.features?.some(f => f.toLowerCase().includes('truesteam')),
      },
      {
        key: 'hasQuadWash',
        label: 'QuadWash™',
        check: p =>
          p.tags?.includes('QuadWash') ||
          p.features?.some(f => f.toLowerCase().includes('quadwash')),
      },
      {
        key: 'hasAutoOpenDoor',
        label: 'Auto Open Door',
        check: p =>
          p.specifications?.['Auto Open Door'] === 'Yes' ||
          p.tags?.includes('Auto Open Door'),
      },
      {
        key: 'hasWifi',
        label: 'Wi-Fi / ThinQ',
        check: p =>
          p.specifications?.['WiFi']?.toLowerCase().includes('yes') ||
          p.tags?.includes('Wi-Fi'),
      },
    ].filter(flag => products.some(p => flag.check(p)))
    : [];

  // ── LG AUDIO-SPECIFIC: Derive filters dynamically ───────────────────────────
  // Series = 'Sound Bar' | 'XBOOM'  (from specifications.Series)
  const availableAudioSeries = category === 'LG Audio'
    ? [...new Set(products.map(p => p.specifications?.['Series']).filter(Boolean))].sort()
    : [];

  // Product Type within a series (Soundbar, Party Speaker, Portable Speaker, Rear Speaker Kit)
  const availableAudioTypes = category === 'LG Audio'
    ? [...new Set(products.map(p => p.specifications?.['Type']).filter(Boolean))].sort()
    : [];

  // Channels — exclude non-standard values like 'Mono' and '360° Omnidirectional'
  const availableChannels = category === 'LG Audio'
    ? [...new Set(
      products
        .map(p => p.specifications?.['Channels'])
        .filter(c => c && c !== 'Mono' && c !== '360° Omnidirectional')
    )].sort((a, b) => {
      const primaryA = parseFloat(a.split('.')[0]);
      const primaryB = parseFloat(b.split('.')[0]);
      return primaryA - primaryB || a.localeCompare(b);
    })
    : [];

  const audioFeatureFlags = category === 'LG Audio'
    ? [
      {
        key: 'hasDolbyAtmos',
        label: 'Dolby Atmos',
        check: p =>
          p.specifications?.['Dolby Atmos'] === 'Yes' ||
          p.tags?.includes('Dolby Atmos'),
      },
      {
        key: 'hasDTSX',
        label: 'DTS:X',
        check: p =>
          p.specifications?.['DTS:X'] === 'Yes' ||
          p.tags?.includes('DTS:X'),
      },
      {
        key: 'hasWifi',
        label: 'Wi-Fi / Smart',
        check: p =>
          p.specifications?.['WiFi'] === 'Yes' ||
          p.tags?.includes('Wi-Fi'),
      },
      {
        key: 'hasWowOrchestra',
        label: 'WOW Orchestra',
        check: p =>
          p.specifications?.['WOW Orchestra'] === 'Yes' ||
          p.tags?.includes('WOW Orchestra'),
      },
      {
        key: 'hasWowcast',
        label: 'WOWCAST',
        check: p =>
          p.specifications?.['WOWCAST'] === 'Yes' ||
          p.tags?.includes('WOWCAST'),
      },
      {
        key: 'hasRearSpeakers',
        label: 'Rear Speakers Included',
        check: p =>
          p.specifications?.['Rear Speakers']?.startsWith('Yes') ||
          p.tags?.includes('Rear Speakers') ||
          p.specifications?.['Type'] === 'Rear Speaker Kit',
      },
      {
        key: 'hasKaraoke',
        label: 'Karaoke',
        check: p =>
          p.specifications?.['Karaoke'] === 'Yes' ||
          p.tags?.includes('Karaoke'),
      },
      {
        key: 'hasWirelessPartyLink',
        label: 'Wireless Party Link',
        check: p =>
          p.specifications?.['Wireless Party Link']?.startsWith('Yes') ||
          p.tags?.includes('Wireless Party Link'),
      },
    ].filter(flag => products.some(p => flag.check(p)))
    : [];

  // ── MICROWAVE OVEN-SPECIFIC: Derive filters dynamically ────────────────────
  const availableMwoTypes = category === 'Microwave Ovens'
    ? [...new Set(products.map(p => p.specifications?.['Type']).filter(Boolean))].sort()
    : [];

  const availableMwoCapacities = category === 'Microwave Ovens'
    ? [...new Set(products.map(p => p.specifications?.['Capacity']).filter(Boolean))].sort((a, b) => {
      const numA = parseInt(a);
      const numB = parseInt(b);
      return numA - numB;
    })
    : [];

  const mwoFeatureFlags = category === 'Microwave Ovens'
    ? [
      {
        key: 'hasWifi',
        label: 'Wi-Fi / Scan-To-Cook',
        check: p =>
          p.specifications?.['WiFi']?.toLowerCase().startsWith('yes') ||
          p.tags?.includes('Wi-Fi'),
      },
      {
        key: 'hasCharcoalHeater',
        label: 'Charcoal Heater',
        check: p =>
          p.specifications?.['Charcoal Heater']?.toLowerCase().startsWith('yes') ||
          p.tags?.includes('Charcoal Convection'),
      },
      {
        key: 'hasRotisserie',
        label: 'Motorised Rotisserie',
        check: p =>
          p.specifications?.['Motorised Rotisserie']?.toLowerCase().startsWith('yes') ||
          p.tags?.includes('Rotisserie'),
      },
      {
        key: 'hasDietFry',
        label: 'Diet Fry',
        check: p =>
          p.specifications?.['Diet Fry'] === 'Yes' ||
          p.tags?.includes('Diet Fry'),
      },
      {
        key: 'hasAirFryer',
        label: 'Air Fryer',
        check: p =>
          p.specifications?.['Air Fryer'] === 'Yes' ||
          p.tags?.includes('Air Fryer'),
      },
    ].filter(flag => products.some(p => flag.check(p)))
    : [];

  // ── AC-SPECIFIC: Derive filters dynamically ────────────────────────────────
  const availableAcTypes = category === 'AC'
    ? [...new Set(products.map(p => p.specifications?.['AC Type']).filter(Boolean))].sort()
    : [];

  const availableAcCapacities = category === 'AC'
    ? [...new Set(products.map(p => p.specifications?.['Capacity']).filter(Boolean))].sort((a, b) => {
      return parseFloat(a) - parseFloat(b);
    })
    : [];

  const availableStarRatings = category === 'AC'
    ? [...new Set(products.map(p => p.specifications?.['Star Rating']).filter(Boolean))].sort((a, b) => {
      return parseInt(a) - parseInt(b);
    })
    : [];

  const acFeatureFlags = category === 'AC'
    ? [
      {
        key: 'hasWifi',
        label: 'Wi-Fi / ThinQ',
        check: p =>
          p.specifications?.['WiFi']?.toLowerCase().startsWith('yes') ||
          p.tags?.includes('Wi-Fi'),
      },
      {
        key: 'isHotCold',
        label: 'Hot & Cold',
        check: p =>
          p.specifications?.['Hot & Cold'] === 'Yes' ||
          p.tags?.includes('Hot & Cold'),
      },
      {
        key: 'hasDietMode',
        label: 'Diet Mode+',
        check: p =>
          p.specifications?.['Diet Mode+'] === 'Yes' ||
          p.tags?.includes('Diet Mode'),
      },
      {
        key: 'hasViraatMode',
        label: 'Viraat Mode',
        check: p =>
          p.specifications?.['Viraat Mode'] === 'Yes' ||
          p.tags?.includes('Viraat Mode'),
      },
      {
        key: 'hasGoldFin',
        label: 'Gold Fin+',
        check: p =>
          p.specifications?.['Gold Fin+'] === 'Yes' ||
          p.tags?.includes('Gold Fin'),
      },
      {
        key: 'hasADCSensor',
        label: 'ADC Sensor',
        check: p =>
          p.specifications?.['ADC Sensor'] === 'Yes' ||
          p.tags?.includes('ADC Sensor'),
      },
    ].filter(flag => products.some(p => flag.check(p)))
    : [];

  // ── WATER PURIFIER-SPECIFIC: Derive filters dynamically ────────────────────
  const availableWprTechnologies = category === 'Water Purifier'
    ? [...new Set(products.map(p => p.specifications?.['Purification Technology']).filter(Boolean))].sort()
    : [];

  const wprFeatureFlags = category === 'Water Purifier'
    ? [
      {
        key: 'hasRO',
        label: 'RO (Reverse Osmosis)',
        check: p =>
          p.specifications?.['RO Membrane'] === 'Yes' || p.tags?.includes('RO'),
      },
      {
        key: 'hasUV',
        label: 'UV Purification',
        check: p =>
          p.specifications?.['UV Purification'] === 'Yes' || p.tags?.includes('UV'),
      },
      {
        key: 'hasUF',
        label: 'UF Purification',
        check: p =>
          p.specifications?.['UF Purification'] === 'Yes' || p.tags?.includes('UF'),
      },
      {
        key: 'hasMineralBooster',
        label: 'Mineral Booster',
        check: p =>
          p.specifications?.['Mineral Booster'] === 'Yes' ||
          p.tags?.includes('Mineral Booster'),
      },
      {
        key: 'hasHMR',
        label: 'Heavy Metal Removal',
        check: p =>
          p.specifications?.['Heavy Metal Removal'] === 'Yes' ||
          p.tags?.includes('HMR'),
      },
      {
        key: 'hasUVinTank',
        label: 'UV in Tank',
        check: p =>
          p.specifications?.['UV in Tank'] === 'Yes' ||
          p.tags?.includes('UV in Tank'),
      },
      {
        key: 'hasDigitalSterilizing',
        label: 'Digital Sterilizing Care',
        check: p =>
          p.specifications?.['Digital Sterilizing Care'] === 'Yes' ||
          p.tags?.includes('Digital Sterilizing Care'),
      },
      {
        key: 'hasTrueMaintenance',
        label: 'True Maintenance Package',
        check: p =>
          p.specifications?.['True Maintenance'] === 'Yes' ||
          p.tags?.includes('True Maintenance'),
      },
      {
        key: 'hasGlassTouch',
        label: 'Glass Touch Display',
        check: p =>
          p.specifications?.['Glass Touch Display'] === 'Yes' ||
          p.tags?.includes('Glass Touch Display'),
      },
      {
        key: 'isNonElectric',
        label: 'Non-Electric (Zero Wastage)',
        check: p => p.specifications?.['Electricity Required'] === 'No',
      },
    ].filter(flag => products.some(p => flag.check(p)))
    : [];

  // ── HANDLERS ────────────────────────────────────────────────────────────────
  const handlePriceChange = (event, newValue) => {
    onFilterChange({
      ...filters,
      minPrice: newValue[0] === minPrice ? undefined : newValue[0],
      maxPrice: newValue[1] === maxPrice ? undefined : newValue[1],
    });
  };

  const handleStockChange = (event) => {
    onFilterChange({ ...filters, inStock: event.target.checked ? true : undefined });
  };

  // TV handlers
  const handleScreenSizeChange = (size) => {
    onFilterChange({ ...filters, screenSize: filters.screenSize === size ? undefined : size });
  };

  const handleTechnologyChange = (tech) => {
    onFilterChange({ ...filters, technology: filters.technology === tech ? undefined : tech });
  };

  // Shared multi-select toggle — used by WM, Dishwashers, and LG Audio
  const toggleMulti = (key, value) => {
    const current = filters[key] || [];
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    onFilterChange({ ...filters, [key]: updated.length ? updated : undefined });
  };

  // Shared boolean feature flag toggle — used by WM, Dishwashers, and LG Audio
  const handleFeatureFlagChange = (key) => {
    onFilterChange({ ...filters, [key]: filters[key] ? undefined : true });
  };

  // ── STAR RATING HELPER ───────────────────────────────────────────────────────
  const renderStars = (ratingStr) => {
    const num = parseInt(ratingStr);
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} sx={{ fontSize: 13, color: i < num ? '#FFC107' : 'text.disabled' }} />
        ))}
        <Typography variant="caption" sx={{ ml: 0.5 }}>{ratingStr}</Typography>
      </Box>
    );
  };

  // ── SHARED BUTTON STYLE ──────────────────────────────────────────────────────
  const filterBtnSx = {
    minWidth: 'auto',
    px: 1.5,
    py: 0.5,
    fontSize: '0.75rem',
    textTransform: 'none',
    borderRadius: 2,
  };

  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>

      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <FilterList color="primary" />
        <Typography variant="h6" fontWeight={600}>Filters</Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* ── Price Range (shared by all categories) ── */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom fontWeight={600}>Price Range</Typography>
        <Slider
          value={[sliderMin, sliderMax]}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={minPrice}
          max={maxPrice}
          step={sliderStep}
          valueLabelFormat={(value) => formatPrice(value)}
          sx={{ mt: 2 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant="body2" color="text.secondary">{formatPrice(sliderMin)}</Typography>
          <Typography variant="body2" color="text.secondary">{formatPrice(sliderMax)}</Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* ── Availability (shared by all categories) ── */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom fontWeight={600}>Availability</Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.inStock === true}
                onChange={handleStockChange}
                size="small"
              />
            }
            label={<Typography variant="body2">In Stock Only</Typography>}
          />
        </FormGroup>
      </Box>

      {/* ════════════════════════════════════════════════
          TV-SPECIFIC FILTERS
      ════════════════════════════════════════════════ */}
      {category === 'TV' && (
        <>
          {availableScreenSizes.length > 0 && (
            <>
              <Divider sx={{ mb: 3 }} />
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom fontWeight={600}>Screen Size (inches)</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                  {availableScreenSizes.map((size) => (
                    <Button
                      key={size}
                      size="small"
                      variant={filters.screenSize === size ? 'contained' : 'outlined'}
                      onClick={() => handleScreenSizeChange(size)}
                      sx={filterBtnSx}
                    >
                      {size}"
                    </Button>
                  ))}
                </Box>
              </Box>
            </>
          )}

          {availableTechnologies.length > 0 && (
            <>
              <Divider sx={{ mb: 3 }} />
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom fontWeight={600}>Display Technology</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                  {availableTechnologies.map((tech) => (
                    <Button
                      key={tech}
                      size="small"
                      variant={filters.technology === tech ? 'contained' : 'outlined'}
                      onClick={() => handleTechnologyChange(tech)}
                      sx={filterBtnSx}
                    >
                      {tech}
                    </Button>
                  ))}
                </Box>
              </Box>
            </>
          )}
        </>
      )}

      {/* ════════════════════════════════════════════════
          WASHING MACHINE-SPECIFIC FILTERS
      ════════════════════════════════════════════════ */}
      {category === 'Washing Machine' && (
        <>
          {availableWashTypes.length > 0 && (
            <>
              <Divider sx={{ mb: 3 }} />
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom fontWeight={600}>Machine Type</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                  {availableWashTypes.map((type) => (
                    <Button
                      key={type}
                      size="small"
                      variant={(filters.washType || []).includes(type) ? 'contained' : 'outlined'}
                      onClick={() => toggleMulti('washType', type)}
                      sx={filterBtnSx}
                    >
                      {type}
                    </Button>
                  ))}
                </Box>
              </Box>
            </>
          )}

          {availableCapacities.length > 0 && (
            <>
              <Divider sx={{ mb: 3 }} />
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom fontWeight={600}>Capacity (Kg)</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                  {availableCapacities.map((cap) => (
                    <Button
                      key={cap}
                      size="small"
                      variant={(filters.capacity || []).includes(cap) ? 'contained' : 'outlined'}
                      onClick={() => toggleMulti('capacity', cap)}
                      sx={{ ...filterBtnSx, minWidth: 52 }}
                    >
                      {cap} Kg
                    </Button>
                  ))}
                </Box>
              </Box>
            </>
          )}

          {availableMotors.length > 0 && (
            <>
              <Divider sx={{ mb: 3 }} />
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom fontWeight={600}>Drive Technology</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                  {availableMotors.map((motor) => (
                    <Button
                      key={motor}
                      size="small"
                      variant={(filters.motor || []).includes(motor) ? 'contained' : 'outlined'}
                      onClick={() => toggleMulti('motor', motor)}
                      sx={filterBtnSx}
                    >
                      {motor}
                    </Button>
                  ))}
                </Box>
              </Box>
            </>
          )}

          {availableEnergyRatings.length > 0 && (
            <>
              <Divider sx={{ mb: 3 }} />
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom fontWeight={600}>Energy Rating</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                  {availableEnergyRatings.map((rating) => (
                    <Button
                      key={rating}
                      size="small"
                      variant={(filters.energyRating || []).includes(rating) ? 'contained' : 'outlined'}
                      onClick={() => toggleMulti('energyRating', rating)}
                      sx={filterBtnSx}
                    >
                      {renderStars(rating)}
                    </Button>
                  ))}
                </Box>
              </Box>
            </>
          )}

          {wmFeatureFlags.length > 0 && (
            <>
              <Divider sx={{ mb: 3 }} />
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom fontWeight={600}>Features</Typography>
                <FormGroup>
                  {wmFeatureFlags.map(({ key, label }) => (
                    <FormControlLabel
                      key={key}
                      control={
                        <Checkbox
                          checked={!!filters[key]}
                          onChange={() => handleFeatureFlagChange(key)}
                          size="small"
                        />
                      }
                      label={<Typography variant="body2">{label}</Typography>}
                    />
                  ))}
                </FormGroup>
              </Box>
            </>
          )}
        </>
      )}

      {/* ════════════════════════════════════════════════
          DISHWASHER-SPECIFIC FILTERS
      ════════════════════════════════════════════════ */}
      {category === 'Dishwashers' && (
        <>
          {availableDwTypes.length > 0 && (
            <>
              <Divider sx={{ mb: 3 }} />
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom fontWeight={600}>Type</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                  {availableDwTypes.map((type) => (
                    <Button
                      key={type}
                      size="small"
                      variant={(filters.dwType || []).includes(type) ? 'contained' : 'outlined'}
                      onClick={() => toggleMulti('dwType', type)}
                      sx={filterBtnSx}
                    >
                      {type}
                    </Button>
                  ))}
                </Box>
              </Box>
            </>
          )}

          {availablePlaceSettings.length > 0 && (
            <>
              <Divider sx={{ mb: 3 }} />
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom fontWeight={600}>Place Settings</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                  {availablePlaceSettings.map((ps) => (
                    <Button
                      key={ps}
                      size="small"
                      variant={(filters.placeSettings || []).includes(ps) ? 'contained' : 'outlined'}
                      onClick={() => toggleMulti('placeSettings', ps)}
                      sx={{ ...filterBtnSx, minWidth: 52 }}
                    >
                      {ps} Place
                    </Button>
                  ))}
                </Box>
              </Box>
            </>
          )}

          {dwFeatureFlags.length > 0 && (
            <>
              <Divider sx={{ mb: 3 }} />
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom fontWeight={600}>Features</Typography>
                <FormGroup>
                  {dwFeatureFlags.map(({ key, label }) => (
                    <FormControlLabel
                      key={key}
                      control={
                        <Checkbox
                          checked={!!filters[key]}
                          onChange={() => handleFeatureFlagChange(key)}
                          size="small"
                        />
                      }
                      label={<Typography variant="body2">{label}</Typography>}
                    />
                  ))}
                </FormGroup>
              </Box>
            </>
          )}
        </>
      )}

      {/* ════════════════════════════════════════════════
          LG AUDIO-SPECIFIC FILTERS
      ════════════════════════════════════════════════ */}
      {category === 'LG Audio' && (
        <>
          {/* Series: Sound Bar / XBOOM */}
          {availableAudioSeries.length > 0 && (
            <>
              <Divider sx={{ mb: 3 }} />
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom fontWeight={600}>Series</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                  {availableAudioSeries.map((series) => (
                    <Button
                      key={series}
                      size="small"
                      variant={(filters.audioSeries || []).includes(series) ? 'contained' : 'outlined'}
                      onClick={() => toggleMulti('audioSeries', series)}
                      sx={filterBtnSx}
                    >
                      {series}
                    </Button>
                  ))}
                </Box>
              </Box>
            </>
          )}

          {/* Product Type */}
          {availableAudioTypes.length > 0 && (
            <>
              <Divider sx={{ mb: 3 }} />
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom fontWeight={600}>Type</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                  {availableAudioTypes.map((type) => (
                    <Button
                      key={type}
                      size="small"
                      variant={(filters.audioType || []).includes(type) ? 'contained' : 'outlined'}
                      onClick={() => toggleMulti('audioType', type)}
                      sx={filterBtnSx}
                    >
                      {type}
                    </Button>
                  ))}
                </Box>
              </Box>
            </>
          )}

          {/* Channels (Soundbar only – hidden when only XBOOM selected) */}
          {availableChannels.length > 0 && (
            <>
              <Divider sx={{ mb: 3 }} />
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom fontWeight={600}>Channels</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                  {availableChannels.map((ch) => (
                    <Button
                      key={ch}
                      size="small"
                      variant={(filters.channels || []).includes(ch) ? 'contained' : 'outlined'}
                      onClick={() => toggleMulti('channels', ch)}
                      sx={{ ...filterBtnSx, minWidth: 44 }}
                    >
                      {ch}
                    </Button>
                  ))}
                </Box>
              </Box>
            </>
          )}

          {/* Feature Flags */}
          {audioFeatureFlags.length > 0 && (
            <>
              <Divider sx={{ mb: 3 }} />
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom fontWeight={600}>Features</Typography>
                <FormGroup>
                  {audioFeatureFlags.map(({ key, label }) => (
                    <FormControlLabel
                      key={key}
                      control={
                        <Checkbox
                          checked={!!filters[key]}
                          onChange={() => handleFeatureFlagChange(key)}
                          size="small"
                        />
                      }
                      label={<Typography variant="body2">{label}</Typography>}
                    />
                  ))}
                </FormGroup>
              </Box>
            </>
          )}
        </>
      )}

      {/* ════════════════════════════════════════════════
          MICROWAVE OVEN-SPECIFIC FILTERS
      ════════════════════════════════════════════════ */}
      {category === 'Microwave Ovens' && (
        <>
          {/* Oven Type */}
          {availableMwoTypes.length > 0 && (
            <>
              <Divider sx={{ mb: 3 }} />
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom fontWeight={600}>Oven Type</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                  {availableMwoTypes.map((type) => (
                    <Button
                      key={type}
                      size="small"
                      variant={(filters.mwoType || []).includes(type) ? 'contained' : 'outlined'}
                      onClick={() => toggleMulti('mwoType', type)}
                      sx={filterBtnSx}
                    >
                      {type}
                    </Button>
                  ))}
                </Box>
              </Box>
            </>
          )}

          {/* Capacity */}
          {availableMwoCapacities.length > 0 && (
            <>
              <Divider sx={{ mb: 3 }} />
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom fontWeight={600}>Capacity</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                  {availableMwoCapacities.map((cap) => (
                    <Button
                      key={cap}
                      size="small"
                      variant={(filters.capacity || []).includes(cap) ? 'contained' : 'outlined'}
                      onClick={() => toggleMulti('capacity', cap)}
                      sx={{ ...filterBtnSx, minWidth: 52 }}
                    >
                      {cap}
                    </Button>
                  ))}
                </Box>
              </Box>
            </>
          )}

          {/* Feature Flags */}
          {mwoFeatureFlags.length > 0 && (
            <>
              <Divider sx={{ mb: 3 }} />
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom fontWeight={600}>Features</Typography>
                <FormGroup>
                  {mwoFeatureFlags.map(({ key, label }) => (
                    <FormControlLabel
                      key={key}
                      control={
                        <Checkbox
                          checked={!!filters[key]}
                          onChange={() => handleFeatureFlagChange(key)}
                          size="small"
                        />
                      }
                      label={<Typography variant="body2">{label}</Typography>}
                    />
                  ))}
                </FormGroup>
              </Box>
            </>
          )}
        </>
      )}

      {/* ════════════════════════════════════════════════
          AC-SPECIFIC FILTERS
      ════════════════════════════════════════════════ */}
      {category === 'AC' && (
        <>
          {/* AC Type: Split / Window */}
          {availableAcTypes.length > 0 && (
            <>
              <Divider sx={{ mb: 3 }} />
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom fontWeight={600}>AC Type</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                  {availableAcTypes.map((type) => (
                    <Button
                      key={type}
                      size="small"
                      variant={(filters.acType || []).includes(type) ? 'contained' : 'outlined'}
                      onClick={() => toggleMulti('acType', type)}
                      sx={filterBtnSx}
                    >
                      {type}
                    </Button>
                  ))}
                </Box>
              </Box>
            </>
          )}

          {/* Capacity */}
          {availableAcCapacities.length > 0 && (
            <>
              <Divider sx={{ mb: 3 }} />
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom fontWeight={600}>Capacity</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                  {availableAcCapacities.map((cap) => (
                    <Button
                      key={cap}
                      size="small"
                      variant={(filters.capacity || []).includes(cap) ? 'contained' : 'outlined'}
                      onClick={() => toggleMulti('capacity', cap)}
                      sx={{ ...filterBtnSx, minWidth: 60 }}
                    >
                      {cap}
                    </Button>
                  ))}
                </Box>
              </Box>
            </>
          )}

          {/* Star Rating */}
          {availableStarRatings.length > 0 && (
            <>
              <Divider sx={{ mb: 3 }} />
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom fontWeight={600}>Star Rating</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                  {availableStarRatings.map((rating) => (
                    <Button
                      key={rating}
                      size="small"
                      variant={(filters.starRating || []).includes(rating) ? 'contained' : 'outlined'}
                      onClick={() => toggleMulti('starRating', rating)}
                      sx={{ ...filterBtnSx, minWidth: 60 }}
                    >
                      {rating}
                    </Button>
                  ))}
                </Box>
              </Box>
            </>
          )}

          {/* Feature Flags */}
          {acFeatureFlags.length > 0 && (
            <>
              <Divider sx={{ mb: 3 }} />
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom fontWeight={600}>Features</Typography>
                <FormGroup>
                  {acFeatureFlags.map(({ key, label }) => (
                    <FormControlLabel
                      key={key}
                      control={
                        <Checkbox
                          checked={!!filters[key]}
                          onChange={() => handleFeatureFlagChange(key)}
                          size="small"
                        />
                      }
                      label={<Typography variant="body2">{label}</Typography>}
                    />
                  ))}
                </FormGroup>
              </Box>
            </>
          )}
        </>
      )}

      {/* ════════════════════════════════════════════════
          WATER PURIFIER-SPECIFIC FILTERS
      ════════════════════════════════════════════════ */}
      {category === 'Water Purifier' && (
        <>
          {/* Purification Technology */}
          {availableWprTechnologies.length > 0 && (
            <>
              <Divider sx={{ mb: 3 }} />
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom fontWeight={600}>Purification Technology</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                  {availableWprTechnologies.map((tech) => (
                    <Button
                      key={tech}
                      size="small"
                      variant={(filters.purificationTech || []).includes(tech) ? 'contained' : 'outlined'}
                      onClick={() => toggleMulti('purificationTech', tech)}
                      sx={filterBtnSx}
                    >
                      {tech}
                    </Button>
                  ))}
                </Box>
              </Box>
            </>
          )}

          {/* Feature Flags */}
          {wprFeatureFlags.length > 0 && (
            <>
              <Divider sx={{ mb: 3 }} />
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom fontWeight={600}>Features</Typography>
                <FormGroup>
                  {wprFeatureFlags.map(({ key, label }) => (
                    <FormControlLabel
                      key={key}
                      control={
                        <Checkbox
                          checked={!!filters[key]}
                          onChange={() => handleFeatureFlagChange(key)}
                          size="small"
                        />
                      }
                      label={<Typography variant="body2">{label}</Typography>}
                    />
                  ))}
                </FormGroup>
              </Box>
            </>
          )}
        </>
      )}

      {/* Reset */}
      <Button fullWidth variant="outlined" onClick={onReset} sx={{ mt: 2 }}>
        Reset Filters
      </Button>
    </Paper>
  );
};

export default FilterPanel;