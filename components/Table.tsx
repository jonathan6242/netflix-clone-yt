import { CheckIcon } from "@heroicons/react/solid";
import { Product } from "@stripe/firestore-stripe-payments";

interface Props {
  products: Product[];
  selectedPlan: Product | null;
}

function Table({ products, selectedPlan }: Props) {
  return (
    <table>
      <tbody className="divide-y divide-[gray]">
        <tr className="table__row">
          <td className="table__data--title">Monthly price</td>
          {products.map((product) => (
            <td
              key={product.id}
              className={`table__data--feature ${
                selectedPlan?.id === product.id
                  ? "text-[#e50914]"
                  : "text-[gray]"
              }`}
            >
              ${product.prices[0].unit_amount! / 100}
            </td>
          ))}
        </tr>
        <tr className="table__row">
          <td className="table__data--title">Video quality</td>
          {products.map((product) => (
            <td
              key={product.id}
              className={`table__data--feature ${
                selectedPlan?.id === product.id
                  ? "text-[#e50914]"
                  : "text-[gray]"
              }`}
            >
              {product.metadata.videoQuality}
            </td>
          ))}
        </tr>
        <tr className="table__row">
          <td className="table__data--title">Resolution</td>
          {products.map((product) => (
            <td
              key={product.id}
              className={`table__data--feature ${
                selectedPlan?.id === product.id
                  ? "text-[#e50914]"
                  : "text-[gray]"
              }`}
            >
              {product.metadata.resolution}
            </td>
          ))}
        </tr>
        <tr className="table__row">
          <td className="table__data--title">
            Watch on your TV, computer, mobile phone and tablet
          </td>
          {products.map((product) => (
            <td
              className={`table__data--feature ${
                selectedPlan?.id === product.id
                  ? 'text-[#E50914]'
                  : 'text-[gray]'
              }`}
              key={product.id}
            >
              {product.metadata.portability === 'true' && (
                <CheckIcon className="inline-block h-8 w-8" />
              )}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}
export default Table;
