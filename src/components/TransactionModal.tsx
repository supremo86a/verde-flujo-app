
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, ArrowUpRight, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'add' | 'transfer';
  onSubmit: (data: { amount: number; description: string; recipient?: string }) => void;
}

const TransactionModal = ({ isOpen, onClose, type, onSubmit }: TransactionModalProps) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [recipient, setRecipient] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const numAmount = parseFloat(amount);
    if (!numAmount || numAmount <= 0) {
      toast({
        title: "Error ❌",
        description: "Ingresa un monto válido",
        variant: "destructive",
      });
      return;
    }

    if (!description.trim()) {
      toast({
        title: "Error ❌", 
        description: "Agrega una descripción",
        variant: "destructive",
      });
      return;
    }

    if (type === 'transfer' && !recipient.trim()) {
      toast({
        title: "Error ❌",
        description: "Ingresa el destinatario",
        variant: "destructive",
      });
      return;
    }

    onSubmit({
      amount: numAmount,
      description: description.trim(),
      recipient: type === 'transfer' ? recipient.trim() : undefined,
    });

    toast({
      title: "¡Éxito! ✅",
      description: type === 'add' ? "Saldo agregado correctamente" : "Transferencia realizada",
    });

    // Reset form
    setAmount('');
    setDescription('');
    setRecipient('');
    onClose();
  };

  const isTransfer = type === 'transfer';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="mobile-container p-0 max-w-sm">
        <div className="relative p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors"
          >
            <X size={20} />
          </button>

          <DialogHeader className="text-left mb-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                isTransfer ? 'bg-mexlucky-dark' : 'bg-mexlucky-green'
              }`}>
                {isTransfer ? (
                  <ArrowUpRight size={24} className="text-white" />
                ) : (
                  <Plus size={24} className="text-white" />
                )}
              </div>
              <div>
                <DialogTitle className="text-xl font-bold">
                  {isTransfer ? 'Transferir Saldo' : 'Agregar Saldo'}
                </DialogTitle>
                <p className="text-sm text-muted-foreground">
                  {isTransfer ? 'Envía dinero a otra persona' : 'Incrementa tu saldo disponible'}
                </p>
              </div>
            </div>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-sm font-medium">
                Monto (MXN) *
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                  $
                </span>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="pl-8 text-lg font-semibold"
                  autoFocus
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">
                Descripción *
              </Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={isTransfer ? "Concepto de transferencia" : "¿Por qué agregas este saldo?"}
                maxLength={50}
              />
            </div>

            {isTransfer && (
              <div className="space-y-2">
                <Label htmlFor="recipient" className="text-sm font-medium">
                  Destinatario *
                </Label>
                <Input
                  id="recipient"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="Nombre del destinatario"
                  maxLength={30}
                />
              </div>
            )}

            <div className="flex space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className={`flex-1 ${
                  isTransfer 
                    ? 'bg-mexlucky-dark hover:bg-mexlucky-dark/90' 
                    : 'bg-mexlucky-green hover:bg-mexlucky-green/90'
                } text-white`}
              >
                {isTransfer ? 'Transferir' : 'Agregar'}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionModal;
