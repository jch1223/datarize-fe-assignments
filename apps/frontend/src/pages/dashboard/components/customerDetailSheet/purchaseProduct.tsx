import { format } from 'date-fns'

interface PurchaseProductProps {
  date: string
  product: string
  price: number
  quantity: number
  imgSrc: string
}

export const PurchaseProduct = ({ date, product, price, quantity, imgSrc }: PurchaseProductProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="font-bold">{format(date, 'yyyy년 MM월 dd일')}</div>

      <div className="flex gap-4">
        <div className="w-40 h-40 rounded-md overflow-hidden">
          <img className="w-full h-full object-cover" src={imgSrc} alt={product} />
        </div>

        <div className="flex flex-col gap-2 flex-1">
          <div className="flex justify-between">
            <span className="font-bold">상품명</span>
            {product}
          </div>
          <div className="flex justify-between">
            <span className="font-bold">가격</span>
            {price.toLocaleString()}원
          </div>
          <div className="flex justify-between">
            <span className="font-bold">수량</span>
            {quantity}개
          </div>
        </div>
      </div>
    </div>
  )
}
