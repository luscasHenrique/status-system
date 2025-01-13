import React from 'react';
import {
  visa,
  master,
  hiper,
  elo,
  american,
  boleto,
  pix,
} from '../../../../assets/images/payments-img';

interface ListMethodsPaymentsProps {
  methods?: { name: string; image: string }[];
}

export const ListMethodsPayments: React.FC<ListMethodsPaymentsProps> = () => {
  const methods = [
    { name: 'Visa', image: visa },
    { name: 'MasterCard', image: master },
    { name: 'Hipercard', image: hiper },
    { name: 'Elo', image: elo },
    { name: 'American Express', image: american },
    { name: 'Boleto', image: boleto },
    { name: 'Pix', image: pix },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {methods.map((method) => (
        <div key={method.name} className="flex items-center justify-center ">
          <img
            src={method.image}
            alt={method.name}
            className="w-16 h-16 object-contain"
          />
        </div>
      ))}
    </div>
  );
};
