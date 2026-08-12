# ALASKA ICE CRYSTALS — LIVE OCEAN-SIDE CARNIVAL BUILD PLAN

## Purpose
Build a real, interactive carnival area inside the Alaska Ice Crystals living website. This is not a flat image and not a decorative mockup. Every ride, booth, path, light, entrance, game, and food stand is to exist as a separate coded component that can later be upgraded, replaced, moved, animated, or connected to Osko's detailed building plans.

## Placement rule
The carnival belongs on usable land beside the ocean-side area, not in the water. Preserve open-world expansion and do not force the carnival into a fixed outer boundary.

## First complete functional set
- Entry gate and main midway
- Ticket booth / ticket system shell
- Ferris wheel with working rotation and ride interaction state
- Carousel with working rotation and ride interaction state
- Swing ride
- Scrambler/spinner ride
- Pirate ship ride
- Drop-tower style ride
- Giant slide
- Kiddie ride zone
- Midway skill-game booths: ring toss, balloon game, water race, whack-a-mole style game, roll-a-ball
- Food stands: popcorn, cotton candy, funnel cake, pretzels, burgers/hot dogs, drinks
- Prize/redemption booth
- Rest/seating area
- Lighting and night-mode hooks
- Navigation/walkable paths and collision/interaction zones
- Mobile touch controls and desktop pointer/keyboard hooks

## Architecture rule
Do not draw the carnival into one bitmap. Use separate semantic DOM/SVG/CSS/JS components or equivalent project-native modules. Each component gets a stable id/data attribute and its own interaction state so Osko's future building plans can replace visuals without breaking behavior.

## Real-world reference notes
The initial attraction mix follows common seaside and traveling-carnival patterns: Ferris wheel, carousel, family/kiddie rides, thrill rides, midway games, food, ticketing, and prize areas. Pacific Park's seaside layout uses rides, a midway of skill games, dining, and ticket booths, while major fairs separate family/kiddie and thrill attractions and use ticket plazas.

## Safety / scope
This is a website simulation/interactive world, not engineering guidance for real amusement-ride machinery. Ride motion is visual/interactive only.

## Build sequence
1. Preserve current site on separate feature branch.
2. Add carnival land parcel and main midway paths.
3. Add component registry and interaction system.
4. Add working rides one by one.
5. Add games and booths.
6. Add food/tickets/prizes.
7. Tune mobile controls and performance.
8. Keep all carnival pieces replaceable for Osko's future custom building designs.
