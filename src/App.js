import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://jnnhyrmalmsdepvzjhfa.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impubmh5cm1hbG1zZGVwdnpqaGZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwNTA2OTgsImV4cCI6MjA5NDYyNjY5OH0.09K8Es_SMn9PrnU-pBrGq954k8NFkAi93yVCYGfTckA"
);


// ─── Estrellas ────────────────────────────────────────────────────────────────
function StarField() {
  const stars = Array.from({ length: 90 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 1.8 + 0.4,
    opacity: Math.random() * 0.5 + 0.1,
    duration: Math.random() * 5 + 3,
    delay: Math.random() * 6,
  }));
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
      {stars.map(s => (
        <div key={s.id} style={{
          position: 'absolute',
          left: `${s.x}%`, top: `${s.y}%`,
          width: `${s.size}px`, height: `${s.size}px`,
          borderRadius: '50%',
          background: '#fff',
          opacity: s.opacity,
          animation: `twinkle ${s.duration}s ${s.delay}s infinite alternate`,
        }} />
      ))}
    </div>
  );
}

// ─── Modal contacto ───────────────────────────────────────────────────────────
function ContactModal({ onClose }) {
  useEffect(() => {
    const h = e => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: 'linear-gradient(135deg, #1a1535 0%, #0f0f1e 100%)',
        border: '1px solid rgba(180,140,80,0.4)',
        borderRadius: 16, padding: '2.5rem', maxWidth: 380, width: '90%',
        textAlign: 'center', position: 'relative',
      }}>
        <div style={{ fontSize: 28, color: '#c9a84c', marginBottom: 8 }}>✦</div>
        <h2 style={{ fontFamily: '"Cinzel Decorative", serif', color: '#e8d5a0', fontSize: '1.2rem', marginBottom: 4 }}>Despertar</h2>
        <p style={{ color: '#8a7a9a', fontSize: '0.85rem', marginBottom: 16 }}>No es lo que esperabas</p>
        <div style={{ height: 1, background: 'rgba(180,140,80,0.2)', margin: '1rem 0' }} />
        <p style={{ color: '#c4b0d8', fontSize: '0.9rem', marginBottom: 12 }}>¿Algo resonó en ti? ¿Quieres ir más profundo?</p>
        <a href="mailto:despertarnoescomoloesperabas@gmail.com" style={{
          color: '#00C9A7', fontSize: '0.85rem', textDecoration: 'none',
        }}>despertarnoescomoloesperabas@gmail.com</a>
        <button onClick={onClose} style={{
          position: 'absolute', top: 12, right: 16,
          background: 'none', border: 'none', color: '#6a5a7a',
          fontSize: '1.2rem', cursor: 'pointer',
        }}>✕</button>
      </div>
    </div>
  );
}

// ─── Líneas de mano SVG decorativas ──────────────────────────────────────────
function PalmLines() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" style={{ opacity: 0.25 }}>
      <path d="M 30,100 Q 28,60 35,30 Q 40,15 50,12" fill="none" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 20,55 Q 45,45 90,50" fill="none" stroke="#9b6dca" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M 25,70 Q 50,58 95,65" fill="none" stroke="#4db88a" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M 60,100 Q 62,75 65,50 Q 67,30 70,20" fill="none" stroke="#c9a84c" strokeWidth="1" strokeLinecap="round" strokeDasharray="3 3" />
      <circle cx="40" cy="25" r="3" fill="none" stroke="#c9a84c" strokeWidth="0.8" />
      <circle cx="75" cy="20" r="2.5" fill="none" stroke="#9b6dca" strokeWidth="0.8" />
    </svg>
  );
}

// ─── Bienvenida ───────────────────────────────────────────────────────────────
function Bienvenida({ onStart }) {
  return (
    <div style={{ textAlign: 'center', padding: '2rem 1rem', animation: 'fadeIn 1s ease' }}>
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
        <PalmLines />
      </div>
      <p style={{
        fontFamily: '"Lora", serif', color: '#c4b0d8',
        fontSize: '1.05rem', lineHeight: 1.7, maxWidth: 420, margin: '0 auto 2rem',
      }}>
        La mano no miente porque no sabe mentir.<br />
        Es el mapa más honesto que existe.
      </p>
      <button onClick={onStart} style={{
        background: 'linear-gradient(135deg, rgba(180,140,80,0.15), rgba(180,140,80,0.05))',
        border: '1px solid rgba(180,140,80,0.5)',
        color: '#e8d5a0', fontFamily: '"Cinzel Decorative", serif',
        fontSize: '0.85rem', letterSpacing: 2, padding: '0.9rem 2.5rem',
        borderRadius: 8, cursor: 'pointer', transition: 'all 0.3s',
      }}
        onMouseEnter={e => e.target.style.borderColor = 'rgba(180,140,80,0.9)'}
        onMouseLeave={e => e.target.style.borderColor = 'rgba(180,140,80,0.5)'}
      >
        Abrir mi mano
      </button>
    </div>
  );
}

// ─── Upload de imagen ─────────────────────────────────────────────────────────
function SubirMano({ onImageReady }) {
  const [preview, setPreview] = useState(null);
  const [base64, setBase64] = useState(null);
  const [mano, setMano] = useState('derecha');
  const inputRef = useRef();

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
      setBase64(e.target.result.split(',')[1]);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  const continuar = () => {
    if (base64) onImageReady({ base64, mano, preview });
  };

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: '1rem', animation: 'fadeIn 0.6s ease' }}>
      {/* Selector mano */}
      <div style={{ display: 'flex', gap: 12, marginBottom: '1.5rem', justifyContent: 'center' }}>
        {['derecha', 'izquierda'].map(m => (
          <button key={m} onClick={() => setMano(m)} style={{
            background: mano === m ? 'rgba(180,140,80,0.2)' : 'transparent',
            border: `1px solid ${mano === m ? 'rgba(180,140,80,0.7)' : 'rgba(180,140,80,0.25)'}`,
            color: mano === m ? '#e8d5a0' : '#8a7a9a',
            fontFamily: '"Lora", serif', fontSize: '0.85rem',
            padding: '0.5rem 1.5rem', borderRadius: 6, cursor: 'pointer',
            transition: 'all 0.25s',
          }}>
            Mano {m}
          </button>
        ))}
      </div>

      {/* Zona drop */}
      <div
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
        onClick={() => inputRef.current?.click()}
        style={{
          border: `2px dashed ${preview ? 'rgba(180,140,80,0.5)' : 'rgba(155,109,202,0.4)'}`,
          borderRadius: 12, padding: preview ? 0 : '3rem 1rem',
          cursor: 'pointer', transition: 'all 0.3s', overflow: 'hidden',
          background: 'rgba(15,15,30,0.6)', minHeight: preview ? 0 : 180,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexDirection: 'column', gap: 12,
        }}
      >
        {preview ? (
          <img src={preview} alt="Tu mano" style={{
            width: '100%', maxHeight: 320, objectFit: 'cover', display: 'block',
          }} />
        ) : (
          <>
            <div style={{ fontSize: 40, opacity: 0.4 }}>✋</div>
            <p style={{ color: '#8a7a9a', fontFamily: '"Lora", serif', fontSize: '0.9rem', textAlign: 'center', margin: 0 }}>
              Toca para subir una foto<br />
              <span style={{ fontSize: '0.78rem', opacity: 0.7 }}>Palma abierta · buena luz · foto clara</span>
            </p>
          </>
        )}
      </div>
      <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }}
        onChange={e => handleFile(e.target.files[0])} />

      {preview && (
        <div style={{ marginTop: '0.75rem', display: 'flex', gap: 10 }}>
          <button onClick={() => { setPreview(null); setBase64(null); }} style={{
            flex: 1, background: 'transparent',
            border: '1px solid rgba(155,109,202,0.3)',
            color: '#8a7a9a', fontFamily: '"Lora", serif',
            fontSize: '0.8rem', padding: '0.6rem', borderRadius: 6, cursor: 'pointer',
          }}>
            Cambiar foto
          </button>
          <button onClick={continuar} style={{
            flex: 2,
            background: 'linear-gradient(135deg, rgba(180,140,80,0.2), rgba(180,140,80,0.08))',
            border: '1px solid rgba(180,140,80,0.6)',
            color: '#e8d5a0', fontFamily: '"Cinzel Decorative", serif',
            fontSize: '0.75rem', letterSpacing: 1.5,
            padding: '0.7rem', borderRadius: 6, cursor: 'pointer',
          }}>
            ✦ Leer mi mano ✦
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Lectura ──────────────────────────────────────────────────────────────────
function Lectura({ imagenData, onNueva }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const endRef = useRef();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const llamarAPI = useCallback(async (historial) => {
    setLoading(true);
    setError('');
    try {
      // Verificar contador de consultas
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const contador = await fetch('https://cumpleanos-app.onrender.com/api/consulta', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-secret': process.env.REACT_APP_API_SECRET,
          },
          body: JSON.stringify({
            user_id: session.user.id,
            email: session.user.email,
          }),
        });
        const contadorData = await contador.json();
        if (!contadorData.permitido) {
          setError('Has usado tus 3 consultas gratuitas. Visita el Universo Despertar para continuar.');
          setLoading(false);
          return;
        }
      }

      const response = await fetch('https://cumpleanos-app.onrender.com/api/quiromante', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-secret': process.env.REACT_APP_API_SECRET,
        },
        body: JSON.stringify({ messages: historial }),
      });

      if (!response.ok) throw new Error('La Quiromante no pudo hablar en este momento');
      const data = await response.json();
      const texto = data.respuesta;
      setMessages(prev => [...prev, { role: 'assistant', content: texto }]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Primera lectura con imagen
  useEffect(() => {
    const primerMensaje = {
      role: 'user',
      content: [
        {
          type: 'image',
          source: {
            type: 'base64',
            media_type: 'image/jpeg',
            data: imagenData.base64,
          },
        },
        {
          type: 'text',
          text: `Esta es mi mano ${imagenData.mano}. Lee lo que ves.`,
        },
      ],
    };
    setMessages([{ role: 'user', content: `[Foto de mano ${imagenData.mano}]`, _display: true }]);
    llamarAPI([primerMensaje]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEnviar = async () => {
    const texto = input.trim();
    if (!texto || loading) return;
    setInput('');

    // Construir historial para API — primer mensaje siempre con imagen
    const primerMensajeAPI = {
      role: 'user',
      content: [
        {
          type: 'image',
          source: { type: 'base64', media_type: 'image/jpeg', data: imagenData.base64 },
        },
        { type: 'text', text: `Esta es mi mano ${imagenData.mano}. Lee lo que ves.` },
      ],
    };

    // Historial de display → historial API
    const historialAPI = [primerMensajeAPI];
    const mensajesReales = messages.filter(m => !m._display);
    for (const m of mensajesReales) {
      historialAPI.push({ role: m.role, content: m.content });
    }
    historialAPI.push({ role: 'user', content: texto });

    setMessages(prev => [...prev, { role: 'user', content: texto }]);
    await llamarAPI(historialAPI);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleEnviar(); }
  };

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: '0 1rem', animation: 'fadeIn 0.6s ease' }}>
      {/* Preview pequeño */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.5rem',
        padding: '0.75rem 1rem', background: 'rgba(180,140,80,0.06)',
        border: '1px solid rgba(180,140,80,0.15)', borderRadius: 8 }}>
        <img src={imagenData.preview} alt="Tu mano" style={{
          width: 52, height: 52, objectFit: 'cover', borderRadius: 6,
          border: '1px solid rgba(180,140,80,0.3)',
        }} />
        <div>
          <p style={{ color: '#c9a84c', fontFamily: '"Cinzel Decorative", serif',
            fontSize: '0.7rem', letterSpacing: 1, margin: 0 }}>
            MANO {imagenData.mano.toUpperCase()}
          </p>
          <p style={{ color: '#6a5a7a', fontSize: '0.75rem', margin: '2px 0 0',
            fontFamily: '"Lora", serif' }}>
            La Quiromante está leyendo tu mano
          </p>
        </div>
      </div>

      {/* Conversación */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {messages.filter(m => !m._display).map((msg, i) => (
          <div key={i} style={{
            display: 'flex', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
            gap: 10, alignItems: 'flex-start',
          }}>
            {msg.role === 'assistant' && (
              <div style={{
                width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                background: 'rgba(180,140,80,0.1)', border: '1px solid rgba(180,140,80,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#c9a84c', fontSize: 14, marginTop: 2,
              }}>☽</div>
            )}
            <div style={{
              background: msg.role === 'assistant'
                ? 'rgba(25,20,45,0.8)'
                : 'rgba(180,140,80,0.08)',
              border: `1px solid ${msg.role === 'assistant' ? 'rgba(155,109,202,0.2)' : 'rgba(180,140,80,0.2)'}`,
              borderRadius: msg.role === 'assistant' ? '4px 12px 12px 12px' : '12px 4px 12px 12px',
              padding: '1rem 1.2rem', maxWidth: '88%',
            }}>
              <p style={{
                fontFamily: '"Lora", serif',
                color: msg.role === 'assistant' ? '#d4c8e8' : '#c9a84c',
                fontSize: '0.95rem', lineHeight: 1.8, margin: 0,
                whiteSpace: 'pre-wrap',
              }}>{msg.content}</p>
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: 'rgba(180,140,80,0.1)', border: '1px solid rgba(180,140,80,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#c9a84c', fontSize: 14,
            }}>☽</div>
            <div style={{ display: 'flex', gap: 6 }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{
                  width: 7, height: 7, borderRadius: '50%',
                  background: '#c9a84c', opacity: 0.5,
                  animation: `pulse 1.2s ${i * 0.2}s infinite`,
                }} />
              ))}
            </div>
          </div>
        )}

        {error && (
          <div style={{
            background: 'rgba(180,60,60,0.1)', border: '1px solid rgba(180,60,60,0.3)',
            borderRadius: 8, padding: '0.75rem 1rem',
            color: '#d4806a', fontFamily: '"Lora", serif', fontSize: '0.85rem',
          }}>⚠ {error}</div>
        )}
        <div ref={endRef} />
      </div>

      {/* Input */}
      {messages.length > 0 && (
        <div style={{ marginTop: '1.5rem', display: 'flex', gap: 8 }}>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Pregunta algo sobre tu lectura..."
            rows={2}
            disabled={loading}
            style={{
              flex: 1, background: 'rgba(15,15,30,0.8)',
              border: '1px solid rgba(155,109,202,0.3)',
              borderRadius: 8, padding: '0.75rem 1rem',
              color: '#d4c8e8', fontFamily: '"Lora", serif',
              fontSize: '0.9rem', resize: 'none', outline: 'none',
            }}
          />
          <button onClick={handleEnviar} disabled={loading || !input.trim()} style={{
            width: 44, background: loading ? 'rgba(180,140,80,0.05)' : 'rgba(180,140,80,0.15)',
            border: '1px solid rgba(180,140,80,0.4)',
            borderRadius: 8, color: '#c9a84c', fontSize: '1.1rem',
            cursor: loading ? 'not-allowed' : 'pointer', flexShrink: 0,
          }}>✦</button>
        </div>
      )}

      {messages.length > 0 && !loading && (
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <button onClick={onNueva} style={{
            background: 'transparent', border: '1px solid rgba(155,109,202,0.3)',
            color: '#8a7a9a', fontFamily: '"Lora", serif',
            fontSize: '0.8rem', padding: '0.5rem 1.5rem',
            borderRadius: 6, cursor: 'pointer',
          }}>Nueva lectura</button>
        </div>
      )}
    </div>
  );
}

// ─── App principal ────────────────────────────────────────────────────────────
export default function App() {
  const [fase, setFase] = useState('bienvenida');
  const [imagenData, setImagenData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      supabase.auth.setSession({ access_token: token, refresh_token: token })
        .then(({ error }) => {
          if (error) window.location.href = "https://universo-portal-art.vercel.app";
        });
    } else {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (!session) window.location.href = "https://universo-portal-art.vercel.app";
      });
    }
  }, []);

  const handleImageReady = (data) => {
    setImagenData(data);
    setFase('lectura');
  };

  const reiniciar = () => {
    setFase('bienvenida');
    setImagenData(null);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0f0f1e', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Lora:ital,wght@0,400;0,500;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0f0f1e; }
        @keyframes twinkle { from { opacity: 0.1; } to { opacity: 0.7; } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { opacity: 0.3; transform: scale(0.8); } 50% { opacity: 1; transform: scale(1.2); } }
        @keyframes glowPulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.7; } }
        textarea:focus { border-color: rgba(180,140,80,0.5) !important; }
        textarea::placeholder { color: #4a3a5a; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0f0f1e; }
        ::-webkit-scrollbar-thumb { background: rgba(155,109,202,0.3); border-radius: 2px; }
      `}</style>

      <StarField />

      {/* Ambient glows */}
      <div style={{
        position: 'fixed', top: '-20%', left: '-10%',
        width: '50%', height: '50%', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(155,109,202,0.06) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
        animation: 'glowPulse 8s infinite',
      }} />
      <div style={{
        position: 'fixed', bottom: '-20%', right: '-10%',
        width: '50%', height: '50%', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(180,140,80,0.05) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
        animation: 'glowPulse 10s 2s infinite',
      }} />

      <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh',
        display: 'flex', flexDirection: 'column' }}>

        {/* Header */}
        <header style={{ textAlign: 'center', padding: '2.5rem 1rem 1.5rem' }}>
          <p style={{
            fontFamily: '"Cinzel Decorative", serif',
            color: '#c9a84c', fontSize: '0.65rem', letterSpacing: 4,
            marginBottom: '0.75rem', opacity: 0.8,
          }}>✦ UNIVERSO DESPERTAR ✦</p>
          <h1 style={{
            fontFamily: '"Cinzel Decorative", serif',
            color: '#e8d5a0', fontSize: 'clamp(1.6rem, 5vw, 2.4rem)',
            letterSpacing: 3, fontWeight: 400, marginBottom: '0.5rem',
            textShadow: '0 0 40px rgba(180,140,80,0.3)',
          }}>La Quiromante</h1>
          <p style={{
            fontFamily: '"Lora", serif', fontStyle: 'italic',
            color: '#8a7a9a', fontSize: '0.95rem',
          }}>La mano ya lo sabe. Solo hay que leerla.</p>
          <div style={{
            width: 60, height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(180,140,80,0.5), transparent)',
            margin: '1rem auto 0',
          }} />
        </header>

        {/* Main */}
        <main style={{ flex: 1, padding: '1rem 1rem 2rem' }}>
          {fase === 'bienvenida' && <Bienvenida onStart={() => setFase('subir')} />}
          {fase === 'subir' && <SubirMano onImageReady={handleImageReady} />}
          {fase === 'lectura' && imagenData && (
            <Lectura imagenData={imagenData} onNueva={reiniciar} />
          )}
        </main>

        {/* Footer */}
        <footer style={{ textAlign: 'center', padding: '1.5rem 1rem 2rem' }}>
          <a
            href="https://www.lulu.com/shop/arturo-moreno/despertar-no-es-como-lo-esperabas/paperback/product-p6w9jnk.html"
            target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-block', marginBottom: '0.75rem',
              color: '#c9a84c', fontFamily: '"Cinzel Decorative", serif',
              fontSize: '0.65rem', letterSpacing: 2, textDecoration: 'none',
              border: '1px solid rgba(180,140,80,0.25)',
              padding: '0.4rem 1.2rem', borderRadius: 4,
              transition: 'all 0.3s',
            }}
          >✦ Consigue el Libro ✦</a>
          <br />
          <button onClick={() => setShowModal(true)} style={{
            background: 'none', border: 'none',
            color: '#00C9A7', fontFamily: 'monospace',
            fontSize: '0.85rem', cursor: 'pointer', letterSpacing: 1,
          }}>-=ArtMoreno=-</button>
        </footer>
      </div>

      {showModal && <ContactModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
