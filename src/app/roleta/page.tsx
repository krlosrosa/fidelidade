"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const Wheel = dynamic(
  () => import("react-custom-roulette").then((mod) => mod.Wheel),
  { ssr: false }
);

const data = [
  { option: 'Corte Grátis', style: { backgroundColor: '#3B3B3B', textColor: '#FFD700' } },
  { option: 'Barba + Hidratação', style: { backgroundColor: '#5A2D0C', textColor: '#FFFFFF' } },
  { option: '50% Desconto', style: { backgroundColor: '#2C2C2C', textColor: '#FFD700' } },
  { option: 'Pomada Grátis', style: { backgroundColor: '#7B3F00', textColor: '#FFFFFF' } },
  { option: 'Toalha Quente', style: { backgroundColor: '#4B4B4B', textColor: '#FFD700' } },
  { option: 'Vale R$30', style: { backgroundColor: '#2F2F2F', textColor: '#FFD700' } },
  { option: 'Sobrancelha', style: { backgroundColor: '#5A2D0C', textColor: '#FFFFFF' } },
  { option: 'Brinde Surpresa', style: { backgroundColor: '#3B3B3B', textColor: '#FFD700' } },
];

export default function RouletteWheel() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [showPrize, setShowPrize] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  const handleReset = () => {
    setMustSpin(false);
    setShowPrize(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center justify-center gap-8 py-10"
    >
      {isClient && (
        <motion.div
          animate={mustSpin ? { scale: 1.05 } : { scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
<Wheel
  mustStartSpinning={mustSpin}
  prizeNumber={prizeNumber}
  data={data}
  onStopSpinning={() => setShowPrize(true)}
  backgroundColors={['#1F1F1F', '#292929']}
  textColors={['#ffffff']}
  outerBorderColor="#FFD700"
  outerBorderWidth={10}
  innerRadius={30} // aumentei pra deixar as fatias menores e dar espaço
  radiusLineColor="#FFD700"
  radiusLineWidth={2}
  fontSize={12} // diminui um pouco a fonte
  perpendicularText={false} // deixa o texto acompanhando o círculo
  spinDuration={0.7}
/>
        </motion.div>
      )}

      <div className="flex gap-4">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button onClick={handleSpinClick} disabled={mustSpin}>
            Girar Roleta
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="secondary" onClick={handleReset}>
            Resetar
          </Button>
        </motion.div>
      </div>

      <AnimatePresence>
        {showPrize && (
          <Dialog open={showPrize} onOpenChange={setShowPrize}>
            <DialogContent className="text-center">
              <DialogHeader>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <DialogTitle>🎉 Parabéns! 🎉</DialogTitle>
                  <DialogDescription className="mt-2">
                    Você ganhou: <strong>{data[prizeNumber].option}</strong>
                  </DialogDescription>
                </motion.div>
              </DialogHeader>
              <Button onClick={() => setShowPrize(false)} className="mt-4">
                Fechar
              </Button>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
