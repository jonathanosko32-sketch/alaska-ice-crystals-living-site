from pathlib import Path

path = Path('app/src/main/java/com/osko/launcher/SkieCbActivity.kt')
text = path.read_text()

text = text.replace('getString("skie_token_endpoint", "") ?: ""', 'getString("skie_token_endpoint", "https://alaska-ice-crystals-living-site.vercel.app/api/skie-session") ?: "https://alaska-ice-crystals-living-site.vercel.app/api/skie-session"', 1)
text = text.replace('<div class="plate"><div class="ch">CH 19</div>', '<div class="plate"><div class="ch">CH 27</div>', 1)
text = text.replace('CB is inside the launcher. Connect Skie, then hold the mic while you talk.', 'SKIE is on Channel 27. Tap CONNECT SKIE, then hold the mic while you talk.', 1)
text = text.replace('placeholder="https://your-secure-site.example/skiesession"', 'placeholder="https://alaska-ice-crystals-living-site.vercel.app/api/skie-session"', 1)

old = """  dc.onopen=()=>{\n    const instructions='You are Skie, the voice assistant inside the OSKO Alaska Ice Crystals CB radio. Speak naturally, clearly, and practically. Keep responses concise unless Osko asks for detail. You are helping build and operate the Alaska Ice Crystals ecosystem. Do not claim access to this ChatGPT chat history unless context was actually supplied to you.';\n    dc.send(JSON.stringify({type:'session.update',session:{type:'realtime',instructions:instructions,output_modalities:['audio'],audio:{output:{voice:'marin'}},turn_detection:{type:'server_vad',create_response:true,interrupt_response:true}}}));\n  };"""
new = """  dc.onopen=()=>{ status('SKIE Channel 27 connected. Hold the mic to talk.'); };"""
if old not in text:
    raise SystemExit('Could not find old SKIE session.update block')
text = text.replace(old, new, 1)

old = """  const offer=await pc.createOffer(); await pc.setLocalDescription(offer);\n  const fd=new FormData(); fd.append('sdp',new Blob([offer.sdp],{type:'application/sdp'}),'offer.sdp'); fd.append('session',new Blob([JSON.stringify({type:'realtime',model:'gpt-realtime'})],{type:'application/json'}),'session.json');\n  const resp=await fetch('https://api.openai.com/v1/realtime/calls',{method:'POST',headers:{Authorization:'Bearer '+secret},body:fd});"""
new = """  const offer=await pc.createOffer(); await pc.setLocalDescription(offer);\n  const resp=await fetch('https://api.openai.com/v1/realtime/calls',{method:'POST',headers:{Authorization:'Bearer '+secret,'Content-Type':'application/sdp'},body:offer.sdp});"""
if old not in text:
    raise SystemExit('Could not find old realtime calls block')
text = text.replace(old, new, 1)

path.write_text(text)
print('Applied v11 SKIE CB: CH27, built-in secure endpoint, current WebRTC SDP flow')
