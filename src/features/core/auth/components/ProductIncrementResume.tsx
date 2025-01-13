import { Trash } from 'src/assets/icons';
import { toCurrency } from 'src/helpers/currency/toCurrency';

interface ProductIncrementResumeProps {
  index: number;
  eventId: string;
  groupId: string;
  name: string;
  count: number;
  quantity: number;
  unitValue: number;
  fee: number;
  increment(eventId: string, groupId: string, index: number): void;
  decrement(eventId: string, groupId: string, index: number): void;
}

export function ProductIncrementResume({
  index,
  eventId,
  groupId,
  name,
  count,
  quantity,
  unitValue,
  fee,
  increment,
  decrement,
}: ProductIncrementResumeProps) {

  const mountText = (
    productQuantity: number,
    productValue: number,
    productFee: number
  ): string => {
    let s = '';
    if (productFee && productFee > 0) {
      s = ` + Taxa: ${toCurrency(
        productQuantity * productValue * productFee -
          productQuantity * productValue
      )}`;
    }
    return s;
  };

  return (
    <div className="flex justify-between py-4">
      <div className="text-left">
        <div className="font-dmsans font-normal text-[21px] leading-[27px] text-neutro-b-400">
          {name}
        </div>
        <div className="font-dmsans text-base font-normal text-neutro-w-600">
          <span>{`${toCurrency(quantity * unitValue)}${mountText(
            quantity,
            unitValue,
            fee
          )}`}</span>
        </div>
      </div>
      <div className="flex justify-center items-center">
        {quantity >= 2 ? (
          <button
            onClick={() => decrement(eventId, groupId, index)}
            disabled={quantity == 0}
            className="disabled:border-[#ECECEC] disabled:text-[#ECECEC] disabled:cursor-not-allowed border border-[#C4C4C4] rounded-[5px] w-[18px] h-[18px] flex justify-center items-center text-sm leading-[18px] text-placeholder"
          >
            -
          </button>
        ) : (
          ''
        )}

        {quantity <= 1 ? (
          <button
            onClick={() => decrement(eventId, groupId, index)}
            disabled={quantity == 0}
            className="w-[18px] h-[18px] flex justify-center items-center"
          >
            <img src={Trash} className="fill-cyan-500" alt="Remover produto" />
          </button>
        ) : (
          ''
        )}

        <div className="font-dmsans text-base text-heading px-[15px]">
          {quantity}
        </div>
        <button
          onClick={() => increment(eventId, groupId, index)}
          disabled={count === quantity}
          className="disabled:border-[#ECECEC] disabled:text-[#ECECEC] disabled:cursor-not-allowed border border-[#C4C4C4] rounded-[5px] w-[18px] h-[18px] flex justify-center items-center text-sm leading-[18px] text-placeholder"
        >
          +
        </button>
      </div>
    </div>
  );
}
