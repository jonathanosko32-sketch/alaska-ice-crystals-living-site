# SKIE CB — Recovery / Finish Plan

Status: active work

## Preserve-first rule
- Do not overwrite or simplify the known-good V11 Living Layover baseline.
- Finish and test the CB in a separate working copy/version first.
- Keep CH 27 and the approved CB layout.

## What already exists in the preserved V11 APK
- SKIE CB RADIO screen
- CH 27 display
- CONNECT SKIE
- RADIO SETUP
- BACK TO HOME
- DISCONNECT
- HOLD TO TALK TO SKIE push-to-talk control
- RX and TX visual lamps
- Secure session endpoint field
- WebRTC/Reatime connection code path
- Endpoint default: https://alaska-ice-crystals-living-site.vercel.app/api/skie-session

## Finish requirements
1. CONNECT SKIE obtains a short-lived Realtime client secret from the secure server endpoint.
2. No standard OpenAI API key is stored in the Android launcher or typed into the phone UI.
3. Push-to-talk behavior:
   - press/hold = microphone transmits, TX goes active, RX clears
   - release = microphone stops transmitting, TX clears, wait for SKIE
   - SKIE audio starts = RX goes active
   - SKIE audio ends = RX clears and returns to ready
4. CH 27 display should visibly react to radio state without changing the approved layout.
5. Clear states: disconnected, connecting, ready, transmitting, receiving, error.
6. Disconnect must close tracks/connections and reset the UI cleanly.
7. Test repeated connect/disconnect and repeated PTT cycles.

## Later, not part of this fix
- Small/free local AI for faster voice understanding/routing.
- Whole-Living-Layover voice routing.
- Website voice control.
- Robot voice/control integration.

## Handoff rule
Every working change must record: file/version changed, reason, test result, known-good rollback point, server dependency, and anything that must not be changed.