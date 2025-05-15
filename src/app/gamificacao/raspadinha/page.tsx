'use client';

import { useState, useRef, useEffect } from 'react';
import { Sparkles, Award } from 'lucide-react';

// Tipos para as coordenadas do mouse/toque
type Position = {
  x: number;
  y: number;
};

export default function ScratchCard() {
  const [isScratched, setIsScratched] = useState(false);
  const [scratchPercentage, setScratchPercentage] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [prize, setPrize] = useState('');
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Lista de possíveis prêmios
  const prizes = [
    "Desconto de 20%",
    "Frete Grátis",
    "Cupom de R$ 50,00",
    "Produto Grátis",
    "Assinatura Premium"
  ];
  
  // Configuração inicial do canvas quando o componente é montado
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    
    if (!canvas || !container) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Configura o tamanho do canvas para corresponder ao contêiner
    const updateCanvasSize = () => {
      if (container && canvas) {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
        
        // Preenche o canvas com a cor cinza (área a ser raspada)
        ctx.fillStyle = '#374151'; // gray-700
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    };
    
    // Seleciona um prêmio aleatório
    setPrize(prizes[Math.floor(Math.random() * prizes.length)]);
    
    // Atualiza o tamanho do canvas inicialmente e ao redimensionar
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, []);
  
  // Função para calcular a porcentagem raspada
  const calculateScratchPercentage = () => {
    const canvas = canvasRef.current as HTMLCanvasElement 
    const ctx = canvas?.getContext('2d');
    
    if (!ctx) return;
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentPixels = 0;
    
    // Conta pixels com transparência (raspados)
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] < 10) { // Se o pixel for quase ou totalmente transparente
        transparentPixels++;
      }
    }
    
    const totalPixels = (canvas.width * canvas.height);
    const percentage = (transparentPixels / totalPixels) * 100;
    
    setScratchPercentage(percentage);
    
    // Se a pessoa raspou mais de 70% da área, revela completamente
    if (percentage > 70 && !isScratched) {
      setIsScratched(true);
      setTimeout(() => {
        setShowCongrats(true);
      }, 500);
    }
  };
  
  // Função para lidar com o movimento do mouse/toque
  const handleMove = (position: Position) => {
    if (!isDragging) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = position.x - rect.left;
    const y = position.y - rect.top;
    
    // Configura para "apagar" no canvas (cria o efeito de raspagem)
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2); // Tamanho da área raspada por movimento
    ctx.fill();
    
    calculateScratchPercentage();
  };
  
  // Manipuladores de eventos para mouse
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleMove({ x: e.clientX, y: e.clientY });
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove({ x: e.clientX, y: e.clientY });
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  // Manipuladores de eventos para toque (mobile)
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    handleMove({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };
  
  const handleTouchEnd = () => {
    setIsDragging(false);
  };
  
  // Função para limpar completamente o cartão quando o prêmio é revelado
  const revealCompletely = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setIsScratched(true);
    setScratchPercentage(100);
    setShowCongrats(true);
  };
  
  // Função para reiniciar o jogo
  const resetGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Resetar o canvas
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = '#374151';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Resetar todos os estados
    setIsScratched(false);
    setScratchPercentage(0);
    setShowCongrats(false);
    setPrize(prizes[Math.floor(Math.random() * prizes.length)]);
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Raspadinha Premiada</h1>
      
      <div className="w-full max-w-md">
        <div
          className="relative overflow-hidden rounded-lg shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 h-64"
          ref={containerRef}
        >
          {/* Área do prêmio */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
            <Award className="w-16 h-16 text-yellow-400 mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">
              Parabéns! Você ganhou:
            </h2>
            <p className="text-3xl font-extrabold text-yellow-300">
              {prize}
            </p>
          </div>
          
          {/* Canvas para raspar */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full cursor-pointer"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ opacity: isScratched ? 0 : 1, transition: 'opacity 0.5s ease' }}
          />
          
          {/* Instruções */}
          {!isScratched && scratchPercentage < 5 && (
            <div className="absolute inset-0 flex items-center justify-center text-center pointer-events-none">
              <p className="font-bold text-gray-200 bg-gray-800 bg-opacity-50 p-2 rounded">
                ✨ Raspe para revelar seu prêmio! ✨
              </p>
            </div>
          )}
        </div>
        
        {/* Barra de progresso */}
        <div className="mt-4 bg-gray-200 rounded-full h-4 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-green-400 to-blue-500 h-full transition-all duration-300"
            style={{ width: `${scratchPercentage}%` }} 
          />
        </div>
        
        <div className="mt-2 text-sm text-gray-600 text-center">
          {scratchPercentage.toFixed(0)}% raspado
        </div>
        
        {/* Botões de ação */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={revealCompletely}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            Revelar Tudo
          </button>
          
          <button
            onClick={resetGame}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
          >
            Nova Raspadinha
          </button>
        </div>
      </div>
      
      {/* Modal de parabéns */}
      {showCongrats && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm mx-4 animate-bounce">
            <div className="flex flex-col items-center text-center">
              <Sparkles className="w-12 h-12 text-yellow-500 mb-2" />
              <h3 className="text-2xl font-bold text-gray-800">Parabéns!</h3>
              <p className="text-lg text-gray-700 mt-2">
                Você ganhou: <span className="font-bold text-purple-600">{prize}</span>
              </p>
              <p className="text-sm text-gray-500 mt-4">
                Use seu prêmio na próxima compra!
              </p>
              
              <button
                onClick={() => setShowCongrats(false)}
                className="mt-6 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}