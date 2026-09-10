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
- WebRTC/Realtime connection code path
- Endpoint default: https://alaska-ice-crystals-living-site.vercel.app/api/skie-session

## Important recovery finding — 2026-09-10
Inspection of the preserved APK found that the existing client already disables the microphone track until the PTT button is held, and it changes TX/RX display states. However, when the PTT button is released, the embedded client only disables the microphone track and updates the status message. It does not explicitly send the Realtime push-to-talk events that commit the audio turn and request SKIE's response.

Current OpenAI Realtime documentation says WebRTC push-to-talk should disable VAD, clear the input audio buffer when PTT begins, then on release commit the input audio buffer and send `response.create`. If a response is already playing when a new PTT begins, it can be cancelled and the unplayed output cleared.

## Safe test implementation added — 2026-09-10
The V11 baseline and the original `api/skie-session.js` remain untouched.

Added:
- `api/skie-session-ptt.js`
  - separate safe test session endpoint
  - uses `gpt-realtime-2.1`
  - keeps the standard API key server-side only
  - configures `session.audio.input.turn_detection` to `null` for real push-to-talk control
- `TEST/skie-cb-ch27-ptt-test.html`
  - separate CH 27 browser test client
  - mic starts disabled
  - PTT down: clear previous input, cancel/clear any active SKIE response, enable mic, TX active
  - PTT release: disable mic, commit input audio buffer, send `response.create`, wait for SKIE
  - response begins/audio arrives: RX active and CH 27 display changes state
  - response done: return to ready
  - disconnect: close mic, data channel and WebRTC connection cleanly

Commits:
- PTT endpoint: `7f770fac38bea8fd4aa7728236935f0916eb653a`
- PTT test client: `34563eee750d5a262d8bfed0bf52dd1ed65743d1`

## Finish requirements
1. CONNECT SKIE obtains a short-lived Realtime client secret from the secure server endpoint.
2. No standard OpenAI API key is stored in the Android launcher or typed into the phone UI.
3. Push-to-talk behavior:
   - press/hold = microphone transmits, TX goes active, RX clears
   - release = microphone stops transmitting, audio turn is committed, response is requested
   - SKIE audio starts = RX goes active
   - SKIE audio ends = RX clears and returns to ready
4. CH 27 display visibly reacts to radio state without changing the approved layout.
5. Clear states: disconnected, connecting, ready, transmitting, receiving, error.
6. Disconnect closes tracks/connections and resets the UI cleanly.
7. Test repeated connect/disconnect and repeated PTT cycles.

## Remaining work / blocker
- Phone-test the safe browser PTT path after the hosting deployment sees the new endpoint.
- Confirm the server hosting account has `OPENAI_API_KEY` configured. Do not put that key in the phone or repository.
- The Android launcher source/signing private key has not yet been recovered from the repository/Library. Do not fake an APK update or resign it with a different key. Once the exact Android source/signing setup is recovered, port the tested PTT logic into the launcher and build the next test APK while preserving V11.

## Later, not part of this fix
- Small/free local AI for faster voice understanding/routing.
- Whole-Living-Layover voice routing.
- Website voice control.
- Robot voice/control integration.

## Handoff rule
Every working change must record: file/version changed, reason, test result, known-good rollback point, server dependency, and anything that must not be changed.
