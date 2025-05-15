'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      // Você pode registrar a compra no seu sistema aqui
      console.log('Successful payment with session:', sessionId);
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle2 className="h-12 w-12 text-green-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Pagamento realizado com sucesso!</h1>
        <p className="text-gray-600 mb-6">
          Obrigado por assinar nosso serviço. Seu pagamento foi processado com sucesso.
        </p>
        <Button
          onClick={() => window.location.href = '/dashboard'}
          className="w-full"
        >
          Acessar Dashboard
        </Button>
      </div>
    </div>
  );
}